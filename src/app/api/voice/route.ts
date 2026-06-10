import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { rateLimit, getClientIp, tooLarge } from "@/lib/ratelimit";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

// ~5MB of audio as base64 (~6.7M chars); voice requests fan out to up to
// three paid API calls (STT -> LLM -> TTS), so caps are tight
const MAX_BODY_BYTES = 8_000_000;
const MAX_AUDIO_BASE64_CHARS = 6_700_000;
const MAX_TTS_CHARS = 600;
const MAX_HISTORY_MESSAGES = 12;
const MAX_HISTORY_CONTENT_CHARS = 2_000;

interface VoiceRequest {
  audio?: string; // base64 audio for speech-to-text
  text?: string;  // text for text-to-speech
  action: "stt" | "tts" | "chat"; // what to do
  history?: Array<{ role: string; content: string }>;
}

// Speech to Text using Deepgram
async function speechToText(audioBase64: string): Promise<string> {
  const audioBuffer = Buffer.from(audioBase64, "base64");

  const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&detect_language=true", {
    method: "POST",
    headers: {
      "Authorization": `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "audio/webm",
    },
    body: audioBuffer,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Deepgram STT error:", error);
    throw new Error("Speech recognition failed");
  }

  const data = await response.json();
  return data.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";
}

// Text to Speech using Deepgram
async function textToSpeech(text: string): Promise<string> {
  const response = await fetch("https://api.deepgram.com/v1/speak?model=aura-asteria-en", {
    method: "POST",
    headers: {
      "Authorization": `Token ${DEEPGRAM_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Deepgram TTS error:", error);
    throw new Error("Text to speech failed");
  }

  const audioBuffer = await response.arrayBuffer();
  return Buffer.from(audioBuffer).toString("base64");
}

// Generate chat response
async function generateResponse(
  userMessage: string,
  history: Array<{ role: string; content: string }>
): Promise<string> {
  const systemPrompt = `You are a friendly assistant for shodh-memory.
Always respond in English only, regardless of what language the user speaks.
Keep responses concise (2-3 sentences) since this will be spoken aloud.
Be helpful and conversational.`;

  const messages = [
    { role: "system" as const, content: systemPrompt },
    ...history.slice(-6).map(m => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    })),
    { role: "user" as const, content: userMessage },
  ];

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages,
    temperature: 0.7,
    max_tokens: 150, // Short for voice
  });

  return completion.choices[0]?.message?.content || "Sorry, I could not generate a response.";
}

export async function POST(request: NextRequest) {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const ip = getClientIp(request.headers);

  if (tooLarge(request.headers, MAX_BODY_BYTES)) {
    return NextResponse.json(
      { error: "Request too large" },
      { status: 413, headers: corsHeaders }
    );
  }

  const burst = rateLimit(`voice:b:${ip}`, 6, 60_000);
  const hourly = rateLimit(`voice:h:${ip}`, 30, 3_600_000);
  if (!burst.allowed || !hourly.allowed) {
    const retryAfterSec = Math.max(burst.retryAfterSec, hourly.retryAfterSec);
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429, headers: { ...corsHeaders, "Retry-After": String(retryAfterSec) } }
    );
  }

  try {
    const body: VoiceRequest = await request.json();
    const { audio, text, action } = body;

    if (action !== "stt" && action !== "tts" && action !== "chat") {
      return NextResponse.json(
        { error: "Invalid action" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (audio && (typeof audio !== "string" || audio.length > MAX_AUDIO_BASE64_CHARS)) {
      return NextResponse.json(
        { error: "Audio too large" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (text && (typeof text !== "string" || text.length > MAX_TTS_CHARS)) {
      return NextResponse.json(
        { error: `Text too long (max ${MAX_TTS_CHARS} characters)` },
        { status: 400, headers: corsHeaders }
      );
    }
    const history = Array.isArray(body.history)
      ? body.history
          .filter(
            (m) =>
              !!m &&
              typeof m === "object" &&
              (m.role === "user" || m.role === "assistant") &&
              typeof m.content === "string"
          )
          .slice(-MAX_HISTORY_MESSAGES)
          .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_HISTORY_CONTENT_CHARS) }))
      : [];

    // Speech to Text only
    if (action === "stt" && audio) {
      const transcription = await speechToText(audio);
      return NextResponse.json({ text: transcription }, { headers: corsHeaders });
    }

    // Text to Speech only
    if (action === "tts" && text) {
      const audioBase64 = await textToSpeech(text);
      return NextResponse.json({ audio: audioBase64 }, { headers: corsHeaders });
    }

    // Full voice chat: STT → LLM → TTS
    if (action === "chat" && audio) {
      // 1. Transcribe user's voice
      const userMessage = await speechToText(audio);
      if (!userMessage) {
        return NextResponse.json(
          { error: "Could not understand audio" },
          { status: 400, headers: corsHeaders }
        );
      }

      // 2. Generate response
      const responseText = await generateResponse(userMessage, history);

      // 3. Convert to speech
      const responseAudio = await textToSpeech(responseText);

      return NextResponse.json({
        userText: userMessage,
        responseText: responseText,
        responseAudio: responseAudio,
      }, { headers: corsHeaders });
    }

    return NextResponse.json(
      { error: "Invalid request. Provide audio+action or text+action" },
      { status: 400, headers: corsHeaders }
    );

  } catch (error) {
    console.error("Voice API error:", error);
    return NextResponse.json(
      { error: "Voice processing failed" },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

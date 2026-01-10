import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const DEEPGRAM_API_KEY = process.env.DEEPGRAM_API_KEY;

interface VoiceRequest {
  audio?: string; // base64 audio for speech-to-text
  text?: string;  // text for text-to-speech
  action: "stt" | "tts" | "chat"; // what to do
  history?: Array<{ role: string; content: string }>;
}

// Speech to Text using Deepgram
async function speechToText(audioBase64: string): Promise<string> {
  const audioBuffer = Buffer.from(audioBase64, "base64");

  const response = await fetch("https://api.deepgram.com/v1/listen?model=nova-2&language=hi&detect_language=true", {
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
You can respond in Hindi or English based on what the user speaks.
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

  try {
    const body: VoiceRequest = await request.json();
    const { audio, text, action, history = [] } = body;

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

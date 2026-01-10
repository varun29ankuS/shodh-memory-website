import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Bhashini API config
const BHASHINI_API_URL = "https://dhruva-api.bhashini.gov.in/services/inference/pipeline";
const BHASHINI_API_KEY = process.env.BHASHINI_API_KEY;
const BHASHINI_USER_ID = process.env.BHASHINI_USER_ID;

// Service IDs for Hindi (you get these from pipeline config call)
const ASR_SERVICE_ID = process.env.BHASHINI_ASR_SERVICE_ID || "ai4bharat/conformer-hi-gpu--t4";
const TTS_SERVICE_ID = process.env.BHASHINI_TTS_SERVICE_ID || "ai4bharat/indic-tts-coqui-hindi-gpu--t4";

interface VoiceRequest {
  audio?: string; // base64 audio for speech-to-text
  text?: string;  // text for text-to-speech
  action: "stt" | "tts" | "chat"; // what to do
  history?: Array<{ role: string; content: string }>;
}

// Speech to Text using Bhashini
async function speechToText(audioBase64: string): Promise<string> {
  const response = await fetch(BHASHINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": BHASHINI_API_KEY || "",
    },
    body: JSON.stringify({
      pipelineTasks: [{
        taskType: "asr",
        config: {
          language: { sourceLanguage: "hi" },
          serviceId: ASR_SERVICE_ID,
          audioFormat: "wav",
          samplingRate: 16000,
        },
      }],
      inputData: {
        audio: [{ audioContent: audioBase64 }],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Bhashini ASR error:", error);
    throw new Error("Speech recognition failed");
  }

  const data = await response.json();
  return data.pipelineResponse?.[0]?.output?.[0]?.source || "";
}

// Text to Speech using Bhashini
async function textToSpeech(text: string): Promise<string> {
  const response = await fetch(BHASHINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": BHASHINI_API_KEY || "",
    },
    body: JSON.stringify({
      pipelineTasks: [{
        taskType: "tts",
        config: {
          language: { sourceLanguage: "hi" },
          serviceId: TTS_SERVICE_ID,
          gender: "female",
          samplingRate: 22050,
        },
      }],
      inputData: {
        input: [{ source: text }],
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Bhashini TTS error:", error);
    throw new Error("Text to speech failed");
  }

  const data = await response.json();
  return data.pipelineResponse?.[0]?.audio?.[0]?.audioContent || "";
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

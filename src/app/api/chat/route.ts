import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { rateLimit, getClientIp, isValidIp, sanitizeLine, tooLarge } from "@/lib/ratelimit";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MAX_BODY_BYTES = 200_000;
const MAX_MESSAGE_CHARS = 2_000;
const MAX_HISTORY_MESSAGES = 12;
const MAX_HISTORY_CONTENT_CHARS = 4_000;

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Send message to Telegram
async function sendToTelegram(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
    console.log("Telegram credentials missing");
    return;
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
      }),
    });
    const data = await res.json();
    if (!data.ok) {
      console.error("Telegram API error:", data);
    }
  } catch (error) {
    console.error("Telegram send error:", error);
  }
}

// Generate conversation summary
async function summarizeConversation(messages: ChatMessage[]): Promise<string> {
  if (messages.length < 2) return "";

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "Summarize this customer conversation in 2-3 bullet points. Include: what they asked about, any contact info shared, and if they showed buying intent. Be concise.",
        },
        {
          role: "user",
          content: messages.map(m => `${m.role}: ${m.content}`).join("\n"),
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });
    return completion.choices[0]?.message?.content || "";
  } catch {
    return "";
  }
}

// Client configurations - in production, move to database/KV
const CLIENT_CONFIGS: Record<string, { name: string; systemPrompt: string }> = {
  "msi-laptop": {
    name: "MSI Laptop Service Center",
    systemPrompt: `You are the AI assistant for MSI Laptop Service Center in Gurugram. Be helpful, professional, and concise.

## BUSINESS INFO

**Contact:**
- Phone: +91 9324751668 / +91 95289 84703
- Email: info@msilaptopservicecenter.in
- WhatsApp: +91 9324751668

**Address:**
Shop No 3, Pillar No. 52, Sikanderpur Rd, near Binda Electronics, Sikanderpur Market, DLF Phase 1, Sector 26, Gurugram, Haryana 122001

**Working Hours:** Monday-Saturday, 10 AM - 7 PM (Closed Sundays)

## SERVICES & TYPICAL PRICING

| Service | Price Range |
|---------|-------------|
| Battery Replacement | Rs.2,500 - Rs.6,000 |
| Keyboard Replacement | Rs.1,500 - Rs.4,500 |
| Screen Replacement | Rs.5,000 - Rs.18,000 |
| Motherboard Repair | Rs.3,000 - Rs.15,000 |
| SSD Upgrade (256GB) | Rs.2,500 - Rs.3,500 |
| RAM Upgrade (8GB) | Rs.2,000 - Rs.3,000 |
| Fan Cleaning/Replacement | Rs.500 - Rs.2,000 |
| DC Jack Repair | Rs.1,000 - Rs.2,500 |
| Chip-level Repair | Rs.2,000 - Rs.8,000 |

Note: Prices vary by MSI model. Always say "approximate" and recommend calling for exact quote.

## KEY SELLING POINTS
- FREE doorstep pickup & drop across Gurugram and Delhi NCR
- FREE initial diagnosis
- 10,000+ MSI laptops repaired
- OEM-quality genuine parts
- 3-6 month warranty on repairs
- 24-72 hour typical turnaround

## MSI MODELS WE SERVICE
GF63, GF65, GL65, Katana GF66/GF76, Modern 14/15, Summit E13/E14/E15, Prestige 14/15, Stealth GS66/GS77, Raider GE66/GE76, Creator Z16/Z17, Alpha 15/17, Bravo 15/17, Cyborg 15, Thin GF63/A15

## COVERAGE AREAS
**Gurugram:** Sectors 14, 26, 29, 31, 45, 56, DLF Cyber City, Golf Course Road, MG Road, Udyog Vihar, Sohna Road, Sushant Lok, South City
**Delhi NCR:** All areas with free pickup

## COMMON ISSUES & QUICK ANSWERS

**"Laptop not turning on"**
-> Could be battery, adapter, DC jack, or motherboard. We offer FREE diagnosis. Book a pickup!

**"Laptop overheating"**
-> Usually dust buildup or thermal paste dried out. Fan cleaning starts at Rs.500.

**"Screen flickering/broken"**
-> Screen replacement Rs.5,000-Rs.18,000 depending on model. We use OEM-quality panels.

**"Keyboard not working"**
-> Keyboard replacement Rs.1,500-Rs.4,500. We have stock for most MSI models.

**"Slow performance"**
-> SSD upgrade recommended. 256GB SSD upgrade around Rs.2,500-Rs.3,500.

## RESPONSE GUIDELINES
1. Always be helpful and professional
2. For pricing, give ranges and say "approximate - call for exact quote"
3. Push for booking: "Would you like to schedule a free pickup?"
4. For complex issues, recommend calling: +91 9324751668
5. If asked about non-MSI brands, mention we also service Dell, HP, Lenovo, Asus, Acer
6. Never make up information not provided above
7. Keep responses concise (2-4 sentences unless detailed explanation needed)

## DISCLAIMER
We are a third-party service provider, not affiliated with MSI officially.`,
  },

  // Demo client for shodh-memory website
  "shodh-demo": {
    name: "Shodh Memory Demo",
    systemPrompt: `You're a friendly human from the shodh team chatting with a visitor. Talk like a real person - casual, warm, helpful.

Keep it SHORT (1-2 sentences). Ask follow-up questions to understand what they need.

What we built:
- Memory system for AI agents that actually learns (like how your brain works)
- Runs completely offline, ~30MB, works on Raspberry Pi
- Super fast - under 50ms

If they seem interested in enterprise/pricing, mention they can email enterprise@shodh-memory.com or you can connect them.

DON'T: Use bullet points, sound corporate, give long explanations, use "I'm an AI" disclaimers.
DO: Be curious about their use case, be genuinely helpful, use contractions (I'm, we've, that's), ask questions back.`,
  },
};

// Default fallback prompt
const DEFAULT_PROMPT = `You are a helpful AI assistant. Answer questions concisely and professionally.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface LeadInfo {
  name: string;
  email: string;
  company?: string;
}

interface BehaviorData {
  timestamp: string;
  page: string;
  timeOnPageSec: number;
  timeInChatSec: number;
  messageCount: number;
  filledForm: boolean;
  userAgent: string;
  referrer: string;
  ip?: string;
  location?: string;
}

interface ChatRequest {
  message: string;
  clientId?: string;
  history?: ChatMessage[];
  leadInfo?: LeadInfo;
  sessionEnd?: boolean;
  behavior?: BehaviorData;
}

// Get location from IP — validated input, cached per instance so repeated
// requests can't be used to exhaust ipapi.co quota
const locationCache = new Map<string, { value: string; expiresAt: number }>();
const LOCATION_TTL_MS = 24 * 60 * 60 * 1000;

async function getLocationFromIP(ip: string): Promise<string> {
  if (!isValidIp(ip)) return "Unknown";

  const cached = locationCache.get(ip);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`);
    const data = await res.json();
    const value =
      data.city && data.country_name
        ? `${data.city}, ${data.country_name}`
        : data.country_name || "Unknown";
    if (locationCache.size > 5_000) locationCache.clear();
    locationCache.set(ip, { value, expiresAt: Date.now() + LOCATION_TTL_MS });
    return value;
  } catch {
    return "Unknown";
  }
}

// Keep only well-formed user/assistant turns with bounded content
function validateHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) return [];
  return history
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        typeof m === "object" &&
        ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "assistant") &&
        typeof (m as ChatMessage).content === "string"
    )
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_HISTORY_CONTENT_CHARS) }));
}

export async function POST(request: NextRequest) {
  // CORS headers for cross-origin widget requests
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

  // Per-IP limits: burst + hourly. Each request costs a Groq call.
  const burst = rateLimit(`chat:b:${ip}`, 8, 60_000);
  const hourly = rateLimit(`chat:h:${ip}`, 60, 3_600_000);
  if (!burst.allowed || !hourly.allowed) {
    const retryAfterSec = Math.max(burst.retryAfterSec, hourly.retryAfterSec);
    return NextResponse.json(
      { error: "Too many requests" },
      {
        status: 429,
        headers: { ...corsHeaders, "Retry-After": String(retryAfterSec) },
      }
    );
  }

  try {
    const body: ChatRequest = await request.json();
    const { message, leadInfo, sessionEnd, behavior } = body;
    const rawClientId = typeof body.clientId === "string" ? body.clientId : "shodh-demo";
    const clientId = /^[a-z0-9_-]{1,40}$/i.test(rawClientId) ? rawClientId : "shodh-demo";
    const history = validateHistory(body.history);

    // Handle session end - send summary to Telegram
    if (sessionEnd && history.length > 0) {
      // Telegram messages are the scarce resource here — tighter cap
      const sessionLimit = rateLimit(`chat:s:${ip}`, 4, 3_600_000);
      if (!sessionLimit.allowed) {
        return NextResponse.json({ success: true }, { headers: corsHeaders });
      }

      console.log("Session end received:", { historyLength: history.length });
      const location = await getLocationFromIP(ip);

      const safeName = sanitizeLine(leadInfo?.name, 100);
      const safeEmail = sanitizeLine(leadInfo?.email, 254);
      const safeCompany = sanitizeLine(leadInfo?.company, 100);
      const leadStr = safeName && safeName !== "Anonymous"
        ? `\n\n👤 Lead:\nName: ${safeName}\nEmail: ${safeEmail}${safeCompany ? `\nCompany: ${safeCompany}` : ""}`
        : "\n\n👤 Anonymous user";

      // Format behavior data
      const formatTime = (sec: number) => {
        if (sec < 60) return `${sec}s`;
        const min = Math.floor(sec / 60);
        const s = sec % 60;
        return `${min}m ${s}s`;
      };

      const device = behavior?.userAgent?.includes("Mobile") ? "📱 Mobile" : "💻 Desktop";
      const locationStr = `\n🌍 Location: ${location}${ip !== "unknown" ? ` (${ip})` : ""}`;
      const safeTimestamp = sanitizeLine(behavior?.timestamp, 40);
      const safePage = sanitizeLine(behavior?.page, 200);
      const safeReferrer = sanitizeLine(behavior?.referrer, 300);
      const behaviorStr = behavior
        ? `\n\n📊 Behavior:\n⏰ ${safeTimestamp}${locationStr}\n📍 Page: ${safePage}\n⏱️ Time on page: ${formatTime(Math.max(0, Number(behavior.timeOnPageSec) || 0))}\n💬 Time in chat: ${formatTime(Math.max(0, Number(behavior.timeInChatSec) || 0))}\n📝 Messages: ${Math.max(0, Number(behavior.messageCount) || 0)}\n📋 Filled form: ${behavior.filledForm ? "Yes" : "No"}\n${device}${safeReferrer ? `\n🔗 Referrer: ${safeReferrer}` : ""}`
        : `\n\n📊 Info:${locationStr}`;

      const convoStr = history
        .map((m) => `${m.role}: ${sanitizeLine(m.content, 500)}`)
        .join("\n");
      const summary = await summarizeConversation(history);

      // Telegram hard limit is 4096 chars per message
      const fullMessage = `🗨️ Chat Session Ended${leadStr}${behaviorStr}\n\n📋 Summary:\n${summary || "Could not generate summary"}\n\n--- Conversation ---\n${convoStr}`.slice(0, 4000);
      await sendToTelegram(fullMessage);

      return NextResponse.json({ success: true }, { headers: corsHeaders });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400, headers: corsHeaders }
      );
    }
    if (message.length > MAX_MESSAGE_CHARS) {
      return NextResponse.json(
        { error: `Message too long (max ${MAX_MESSAGE_CHARS} characters)` },
        { status: 400, headers: corsHeaders }
      );
    }

    // Get client config or use default
    const config = CLIENT_CONFIGS[clientId];
    const systemPrompt = config?.systemPrompt || DEFAULT_PROMPT;

    // Build messages array
    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      // Include last 6 messages from history for context
      ...history.slice(-6),
      { role: "user", content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
      temperature: 0.8,
      max_tokens: 250,
    });

    const response = completion.choices[0]?.message?.content || "Sorry, I could not generate a response.";

    return NextResponse.json({ response }, { headers: corsHeaders });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
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

import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
    systemPrompt: `You are a demo assistant showcasing shodh-memory's chat widget capabilities.

You help visitors understand:
- How the widget works (embeddable JS, calls Groq LLM)
- What shodh-memory does (cognitive memory for AI agents)
- How businesses can use this widget on their sites

Be friendly, concise, and encourage visitors to try shodh-memory for their AI projects.

Key points about shodh-memory:
- Persistent cognitive memory for AI agents
- Hebbian learning - connections that fire together wire together
- Runs offline, single ~30MB binary
- Works on edge devices (Raspberry Pi, Jetson)
- Sub-50ms retrieval, <1 microsecond graph lookup

This widget demo shows how businesses can add AI chat to their websites using shodh-memory's infrastructure.`,
  },
};

// Default fallback prompt
const DEFAULT_PROMPT = `You are a helpful AI assistant. Answer questions concisely and professionally.`;

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

interface ChatRequest {
  message: string;
  clientId?: string;
  history?: ChatMessage[];
}

export async function POST(request: NextRequest) {
  // CORS headers for cross-origin widget requests
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  try {
    const body: ChatRequest = await request.json();
    const { message, clientId = "shodh-demo", history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
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
      temperature: 0.7,
      max_tokens: 500,
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

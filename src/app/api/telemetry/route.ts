import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

interface TelemetryPayload {
  instance_id: string;
  version: string;
  os: string;
  arch: string;
  uptime_secs: number;
  user_count: number;
  total_memories: number;
  storage_mb: number;
  features: {
    backups: boolean;
    production: boolean;
    zenoh: boolean;
  };
}

async function sendToTelegram(message: string) {
  if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) return;

  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      }
    );
  } catch {
    // Non-fatal — don't let Telegram failures break telemetry ingestion
  }
}

function formatUptime(secs: number): string {
  const days = Math.floor(secs / 86400);
  const hours = Math.floor((secs % 86400) / 3600);
  if (days > 0) return `${days}d ${hours}h`;
  const mins = Math.floor((secs % 3600) / 60);
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
}

export async function POST(req: NextRequest) {
  try {
    const payload: TelemetryPayload = await req.json();

    // Validate required fields
    if (!payload.instance_id || !payload.version) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Sanitize: cap string lengths to prevent abuse
    const instanceId = String(payload.instance_id).slice(0, 64);
    const version = String(payload.version).slice(0, 32);
    const os = String(payload.os || "unknown").slice(0, 32);
    const arch = String(payload.arch || "unknown").slice(0, 32);
    const uptimeSecs = Math.max(0, Number(payload.uptime_secs) || 0);
    const userCount = Math.max(0, Number(payload.user_count) || 0);
    const totalMemories = Math.max(0, Number(payload.total_memories) || 0);
    const storageMb = Math.max(0, Number(payload.storage_mb) || 0);

    const features = payload.features || {};
    const featureList = [
      features.production && "production",
      features.backups && "backups",
      features.zenoh && "zenoh",
    ]
      .filter(Boolean)
      .join(", ") || "none";

    // Log for Vercel logs (queryable)
    console.log(
      JSON.stringify({
        type: "telemetry_heartbeat",
        instance_id: instanceId,
        version,
        os,
        arch,
        uptime_secs: uptimeSecs,
        user_count: userCount,
        total_memories: totalMemories,
        storage_mb: storageMb,
        features: featureList,
        timestamp: new Date().toISOString(),
      })
    );

    // Notify via Telegram (useful for tracking active instances)
    const msg =
      `📡 *Shodh Heartbeat*\n` +
      `Instance: \`${instanceId.slice(0, 8)}…\`\n` +
      `Version: ${version} (${os}/${arch})\n` +
      `Uptime: ${formatUptime(uptimeSecs)}\n` +
      `Users: ${userCount} | Memories: ${totalMemories.toLocaleString()}\n` +
      `Storage: ${storageMb} MB | Features: ${featureList}`;

    await sendToTelegram(msg);

    return NextResponse.json({ status: "ok" });
  } catch {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }
}

// Health check for the telemetry endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "telemetry",
    accepts: "POST",
  });
}

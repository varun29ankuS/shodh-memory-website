/**
 * In-memory fixed-window rate limiter for API routes.
 *
 * Scope: per serverless instance. A determined distributed attacker can spread
 * load across instances, but this stops the realistic abuse case — a single
 * client hammering an endpoint to burn LLM/STT credits or spam Telegram.
 * Input-size caps in the routes bound the per-request cost independently.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const MAX_BUCKETS = 10_000;

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSec: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();

  if (buckets.size >= MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
    // Pathological case: still full after sweeping — reset rather than grow unbounded
    if (buckets.size >= MAX_BUCKETS) buckets.clear();
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSec: 0 };
  }
  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)) };
  }
  bucket.count += 1;
  return { allowed: true, retryAfterSec: 0 };
}

const IPV4 = /^(\d{1,3})(\.\d{1,3}){3}$/;
const IPV6 = /^[0-9a-f:]{2,45}$/i;

export function isValidIp(ip: string): boolean {
  if (!ip || ip.length > 45) return false;
  if (IPV4.test(ip)) {
    return ip.split(".").every((octet) => Number(octet) <= 255);
  }
  return ip.includes(":") && IPV6.test(ip);
}

/** Client IP from proxy headers; "unknown" unless it parses as a real IP. */
export function getClientIp(headers: Headers): string {
  const candidate =
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headers.get("x-real-ip")?.trim() ||
    "";
  return isValidIp(candidate) ? candidate : "unknown";
}

/**
 * Flatten untrusted text to a single safe line: strips control characters and
 * newlines (prevents structure injection into Telegram messages and logs),
 * and caps length.
 */
export function sanitizeLine(value: unknown, maxLen: number): string {
  return String(value ?? "")
    .replace(/[\r\n\t]+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, maxLen);
}

export function tooLarge(headers: Headers, maxBytes: number): boolean {
  const len = Number(headers.get("content-length") || 0);
  return len > maxBytes;
}

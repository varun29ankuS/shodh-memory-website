import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Security",
  description:
    "Shodh-memory security practices. Local-first architecture, no cloud dependency, no data transmission. Your memories never leave your machine.",
  openGraph: {
    title: "Security | shodh-memory",
    description:
      "Shodh-memory security practices. Local-first architecture, no cloud dependency, no data transmission.",
    url: "https://www.shodh-memory.com/security",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/security",
  },
};

export default function Security() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--term-orange)" }}
        >
          security
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--term-text-dim)" }}
        >
          Last updated: April 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section
            className="p-4 mb-6"
            style={{ border: "1px solid var(--term-green)", background: "rgba(0,255,0,0.03)" }}
          >
            <p style={{ color: "var(--term-green)" }} className="font-semibold mb-1">
              // core principle
            </p>
            <p style={{ color: "var(--term-text)" }}>
              Shodh-memory is designed so that your data never leaves your machine. There is no
              cloud component, no telemetry, no phone-home behavior. Everything runs locally.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // architecture
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>Single Rust binary — no external runtime, no Docker, no interpreter</li>
              <li>All storage is local RocksDB on your filesystem</li>
              <li>Embeddings computed locally via ONNX Runtime (MiniLM-L6-v2, 384-dim)</li>
              <li>Entity extraction runs locally via a bundled NER model</li>
              <li>No network calls are made during normal operation</li>
              <li>The only network activity is model downloads on first run (from HuggingFace, with checksum verification)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // data isolation
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>Each user gets a separate storage directory with isolated RocksDB instances</li>
              <li>Multi-user mode uses per-user column families — no cross-user data access</li>
              <li>API endpoints are scoped by user ID — one user cannot access another&apos;s memories</li>
              <li>The MCP server runs on localhost by default — not exposed to the network</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // network exposure
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>The REST API binds to <code className="px-1 py-0.5 bg-[var(--term-bg-secondary)] text-[var(--term-cyan)] text-xs rounded">127.0.0.1:3030</code> by default (localhost only)</li>
              <li>WebSocket endpoint (<code className="px-1 py-0.5 bg-[var(--term-bg-secondary)] text-[var(--term-cyan)] text-xs rounded">/api/stream</code>) has no authentication — acceptable for localhost, not recommended for network exposure</li>
              <li>If you expose the API to a network, use a reverse proxy with authentication (nginx, Caddy, etc.)</li>
              <li>The MCP server communicates over stdio — no network sockets involved</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // supply chain
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>Model URLs are pinned to immutable HuggingFace commits</li>
              <li>All model downloads are verified with SHA-256 checksums</li>
              <li>Binary releases are built via GitHub Actions CI with reproducible builds</li>
              <li>Dependencies are audited — see <code className="px-1 py-0.5 bg-[var(--term-bg-secondary)] text-[var(--term-cyan)] text-xs rounded">cargo audit</code> in CI</li>
              <li>Published on crates.io, npm, and PyPI with standard package verification</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // memory safety
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>Core written in Rust — memory-safe by design, no buffer overflows or use-after-free</li>
              <li>1089 tests covering storage, retrieval, graph operations, and edge cases</li>
              <li>CI runs <code className="px-1 py-0.5 bg-[var(--term-bg-secondary)] text-[var(--term-cyan)] text-xs rounded">cargo clippy</code> with strict warnings on every PR</li>
              <li>OOM protection: deserialization has 10MB size limits to prevent allocation attacks</li>
              <li>ONNX Runtime configured with thread limits and lock timeouts to prevent deadlocks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // backup & recovery
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>Built-in backup system with SHA-256 checksum verification</li>
              <li>Backups cover all data: memories, todos, reminders, facts, knowledge graph, feedback, audit logs</li>
              <li>Point-in-time restore with integrity verification before restore</li>
              <li>Backup purging to manage disk space (configurable retention count)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // responsible disclosure
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              If you discover a security vulnerability, please report it responsibly:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>
                Email:{" "}
                <a
                  href="mailto:enterprise@shodh-memory.com"
                  style={{ color: "var(--term-orange)" }}
                >
                  enterprise@shodh-memory.com
                </a>
                {" "}with subject &quot;SECURITY&quot;
              </li>
              <li>Do not open a public GitHub issue for security vulnerabilities</li>
              <li>We will acknowledge receipt within 48 hours</li>
              <li>We will provide a fix timeline within 7 days</li>
              <li>We credit all responsible disclosures (unless you prefer anonymity)</li>
            </ul>
          </section>

          <section
            className="mt-10 p-4"
            style={{ border: "1px dotted var(--term-border)" }}
          >
            <p style={{ color: "var(--term-text-dim)" }}>
              <span style={{ color: "var(--term-orange)" }}>tl;dr →</span> Everything runs locally.
              No cloud, no telemetry, no network calls. Rust for memory safety. SHA-256 for supply chain.
              Report vulnerabilities to enterprise@shodh-memory.com.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

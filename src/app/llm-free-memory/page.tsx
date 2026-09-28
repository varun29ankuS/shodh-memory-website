import type { Metadata } from "next";
import { JsonLd, breadcrumbs } from "@/components/JsonLd";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "LLM-Free Memory for AI Agents",
  description:
    "Agent memory that forms, stores, and retrieves without an LLM in the loop. Deterministic, auditable, on-device — memory that never fabricates what it stores and never leaves the machine.",
  keywords: [
    "LLM-free agent memory",
    "no LLM memory",
    "local memory for AI agents",
    "private AI memory",
    "on-device agent memory",
    "deterministic AI memory",
    "auditable AI memory",
    "memory without API",
    "no-cloud agent memory",
    "memory poisoning",
    "agent memory provenance",
  ],
  openGraph: {
    title: "LLM-Free Memory for AI Agents | shodh-memory",
    description:
      "Memory that forms, stores, and retrieves with zero LLM in the loop. Deterministic, auditable, on-device — it never invents what it stores and nothing leaves the machine.",
    url: "https://www.shodh-memory.com/llm-free-memory",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/llm-free-memory",
  },
};

interface Claim {
  prefix: string;
  title: string;
  body: string;
}

// Stated as architectural facts — what is true by construction. The reader
// draws the higher-stakes conclusions; we never assert a domain we don't own.
const CLAIMS: Claim[] = [
  {
    prefix: "01",
    title: "Nothing is fabricated into storage",
    body:
      "A system that uses an LLM to extract memories can write down things that were never said — a hallucination, stored as if it were ground truth. shodh-memory does not generate; it records. Every memory traces back to the source it came from, so you can always check where a belief originated.",
  },
  {
    prefix: "02",
    title: "Deterministic and auditable",
    body:
      "What gets stored, strengthened, or surfaced is decided by inspectable rules with documented constants — not a model's opaque judgement. The same input produces the same memory every time, so you can audit exactly why anything surfaced, and reproduce it.",
  },
  {
    prefix: "03",
    title: "Nothing leaves the device",
    body:
      "No cloud, no API keys, no external calls. Memory is formed and queried entirely on the machine. Nothing is transmitted to, cached by, or retained by a third party — there is no remote copy to lose.",
  },
  {
    prefix: "04",
    title: "No extraction attack surface",
    body:
      "When an LLM reads untrusted text to build memory, that text can steer what gets stored — a poisoning vector hidden in ordinary input. Deterministic extraction has no prompt to hijack, so a whole class of memory-poisoning attacks simply has nowhere to land.",
  },
];

interface Context {
  title: string;
  body: string;
}

// Contexts named as observations, not as expertise claims or product pitches.
// The cue is enough; the reader supplies the verdict.
const CONTEXTS: Context[] = [
  {
    title: "Regulated & audited environments",
    body:
      "When you have to answer “why does the system believe this?”, memory with provenance and reproducible behaviour is auditable by construction, rather than after the fact.",
  },
  {
    title: "Air-gapped & edge deployments",
    body:
      "Where there is no network — or none is permitted — memory that forms and recalls entirely on-device keeps working through disconnection and restarts.",
  },
  {
    title: "Security-sensitive agents",
    body:
      "When the text an agent ingests cannot be trusted, an extraction path with no LLM to hijack removes the prompt-injection route into long-term memory.",
  },
  {
    title: "Personal & on-device assistants",
    body:
      "When memory holds personal or health data, keeping it on the machine means it is never somewhere else to be exposed.",
  },
];

const RELATED: { href: string; label: string }[] = [
  { href: "/blog/shodh-memory-vs-mem0-vs-zep-vs-memgpt", label: "shodh-memory vs mem0 vs Zep vs MemGPT" },
  { href: "/blog/sovereign-ai-memory-no-cloud-dependency", label: "Sovereign AI memory: no foreign cloud dependency" },
  { href: "/compare", label: "Compare shodh-memory to alternatives" },
  { href: "/use-cases", label: "Edge & robotics deployments" },
  { href: "/research", label: "The research behind the architecture" },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does shodh-memory use an LLM?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "No. Memory extraction, storage, ranking, and retrieval are deterministic. Small, frozen embedding and named-entity models handle perception only; no generative language model is anywhere in the loop.",
      },
    },
    {
      "@type": "Question",
      name: "Why does having no LLM in the loop matter?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "An LLM that forms memories can fabricate facts that were never present, and its storage decisions are opaque. Deterministic memory never invents what it stores, traces every memory back to its source, and behaves reproducibly — so it can be audited and trusted.",
      },
    },
    {
      "@type": "Question",
      name: "Where does the memory run?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Entirely on the device. There is no cloud, no API key, and no external call — nothing leaves the machine.",
      },
    },
    {
      "@type": "Question",
      name: "Can the memory be poisoned through the data an agent reads?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "When an LLM extracts memories from untrusted text, that text can steer what gets stored. shodh-memory's extraction is deterministic and has no prompt to hijack, removing that injection route into long-term memory.",
      },
    },
  ],
};

export default function LlmFreeMemory() {
  return (
    <div className="min-h-screen">
      <Header />
      <JsonLd data={breadcrumbs("LLM-Free Memory", "/llm-free-memory")} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "LLM-Free Memory for AI Agents",
          url: "https://www.shodh-memory.com/llm-free-memory",
          description:
            "Agent memory that forms, stores, and retrieves with zero LLM in the loop: deterministic, auditable, on-device.",
        }}
      />
      <JsonLd data={FAQ_JSONLD} />

      <main className="pt-28 pb-24 px-6 md:pt-36 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[llm-free]</span>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--term-text)]">
                Agent memory with zero LLM in the loop
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg leading-relaxed">
              shodh-memory forms, stores, and retrieves memories without a large language model
              anywhere in the loop. Extraction, ranking, and recall are deterministic code; small
              frozen models handle perception only. The result is memory you can audit, that never
              invents what it stores, and that never leaves the machine.
            </p>
          </div>

          {/* What it actually means */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[00]</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                What &quot;no LLM in the loop&quot; actually means
              </h2>
            </div>
            <p className="text-[var(--term-text-dim)] pl-12 mb-8 max-w-3xl">
              It is a precise claim, not a slogan. The difference is where the language model sits —
              and whether it is allowed to decide what you remember.
            </p>
            <div className="shadow-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-[var(--term-text-dim)] text-sm">where-the-llm-sits.md</span>
              </div>
              <div className="terminal-body">
                <pre className="text-sm text-[var(--term-text)] whitespace-pre-wrap">{`# Most memory systems put an LLM inside the loop

  ingest -> [ LLM extracts "facts" ] -> store -> [ LLM decides recall ] -> agent
              ^ can fabricate                       ^ opaque, unauditable

  whatever the model invents or distorts is baked into storage as ground truth.

# shodh-memory keeps the loop deterministic

  ingest -> [ rules + frozen NER / embeddings ] -> store (with provenance)
              ^ perception only, no generation      ^ every memory -> a source
        -> [ deterministic ranking + decay ] -> agent
              ^ inspectable, reproducible

  the language model, if any, lives in the agent on top -- never in the memory.`}</pre>
              </div>
            </div>
          </div>

          {/* Why it matters — the architectural facts */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[var(--term-orange)] font-mono text-sm">[01..04]</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                Why it matters
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {CLAIMS.map((claim) => (
                <div key={claim.prefix} className="shadow-box p-6 rounded">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-[var(--term-orange)] font-mono text-sm">{claim.prefix}</span>
                    <h3 className="text-lg font-medium text-[var(--term-text)]">{claim.title}</h3>
                  </div>
                  <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">{claim.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Where this matters — inference cues, not claims */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[where]</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                Where these properties tend to matter
              </h2>
            </div>
            <p className="text-[var(--term-text-dim)] pl-12 mb-8 max-w-3xl">
              We build the memory layer. Whether these properties are decisive for your system is
              your call — but they tend to matter most in places like these.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {CONTEXTS.map((context) => (
                <div key={context.title} className="shadow-box p-6 rounded">
                  <h3 className="text-base font-medium text-[var(--term-orange)] mb-2">
                    {context.title}
                  </h3>
                  <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">{context.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Go deeper — hub links */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[var(--term-orange)] font-mono text-sm">[next]</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                Go deeper
              </h2>
            </div>
            <div className="shadow-callout p-6">
              <ul className="space-y-3">
                {RELATED.map((item) => (
                  <li key={item.href} className="text-sm">
                    <Link
                      href={item.href}
                      className="text-[var(--term-orange)] hover:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Close */}
          <div className="text-center">
            <p className="text-[var(--term-text)] text-lg mb-2">
              Memory the agent can use — without handing the agent control over what it remembers.
            </p>
            <p className="text-[var(--term-text-dim)] mb-6">One binary, one command, no LLM in the loop.</p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/#install" className="shadow-btn shadow-btn-primary px-6 py-2">
                $ npm install
              </Link>
              <a
                href="https://github.com/varun29ankuS/shodh-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-btn px-6 py-2"
              >
                View Source
              </a>
              <Link href="/docs" className="shadow-btn px-6 py-2">
                Read the docs
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

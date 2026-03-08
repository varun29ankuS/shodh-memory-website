import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Compare — shodh-memory vs Alternatives",
  description:
    "Compare shodh-memory vs mem0, Zep, Cognee, and Letta. Feature-by-feature comparison of AI memory systems — architecture, privacy, performance, and cognitive capabilities.",
  keywords: [
    "shodh vs mem0",
    "shodh vs zep",
    "shodh vs cognee",
    "shodh vs letta",
    "shodh-memory comparison",
    "ai memory comparison",
    "mem0 alternative",
    "zep alternative",
    "cognee alternative",
    "letta alternative",
    "best ai memory system",
    "local ai memory",
    "ai agent memory comparison",
    "cognitive memory system",
  ],
  openGraph: {
    title: "Compare — shodh-memory vs mem0 vs Zep vs Cognee vs Letta",
    description:
      "Feature-by-feature comparison of AI memory systems. See how shodh-memory stacks up against mem0, Zep, Cognee, and Letta.",
    url: "https://www.shodh-memory.com/compare",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/compare",
  },
};

interface Feature {
  name: string;
  shodh: string;
  mem0: string;
  zep: string;
  cognee: string;
  letta: string;
}

const FEATURES: Feature[] = [
  {
    name: "Architecture",
    shodh: "Rust native",
    mem0: "Python",
    zep: "Go",
    cognee: "Python",
    letta: "Python",
  },
  {
    name: "Local-first (no cloud required)",
    shodh: "\u2713",
    mem0: "~",
    zep: "\u2717",
    cognee: "~",
    letta: "~",
  },
  {
    name: "Single binary, zero dependencies",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Hebbian learning (memory strengthens with use)",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Knowledge graph built-in",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2713",
    cognee: "\u2713",
    letta: "\u2717",
  },
  {
    name: "3-tier memory (working\u2192session\u2192long-term)",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Memory decay (forgetting curves)",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "MCP server included",
    shodh: "\u2713",
    mem0: "\u2713",
    zep: "\u2713",
    cognee: "\u2713",
    letta: "\u2717",
  },
  {
    name: "Edge/embedded device support",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Sub-millisecond entity lookup",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Offline operation",
    shodh: "\u2713",
    mem0: "~",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Open source",
    shodh: "\u2713 Apache 2.0",
    mem0: "\u2713 Apache 2.0",
    zep: "\u2713 MIT",
    cognee: "\u2713 Apache 2.0",
    letta: "\u2713 Apache 2.0",
  },
  {
    name: "Self-hosted embeddings (no API keys)",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "GTD todo system",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
  {
    name: "Causal lineage tracking",
    shodh: "\u2713",
    mem0: "\u2717",
    zep: "\u2717",
    cognee: "\u2717",
    letta: "\u2717",
  },
];

interface Comparison {
  slug: string;
  name: string;
  filename: string;
  paragraphs: string[];
}

const COMPARISONS: Comparison[] = [
  {
    slug: "mem0",
    name: "mem0",
    filename: "shodh-vs-mem0.md",
    paragraphs: [
      "mem0 is a popular Python-based memory layer for AI applications. It provides a straightforward API for storing and retrieving memories and recently added graph-based memory features. However, mem0 relies on external services for embeddings (OpenAI, Cohere) and vector storage (Qdrant, Pinecone), meaning your data leaves your infrastructure and you accumulate API costs with every operation.",
      "shodh-memory takes a fundamentally different approach. Written in Rust with zero external dependencies, it bundles its own embedding model (MiniLM-L6-v2 via ONNX Runtime), its own vector index (Vamana/SPANN), and its own knowledge graph with Hebbian learning. There are no API keys to manage, no cloud services to configure, and no data leaving your machine. A single binary handles everything.",
      "Beyond architecture, shodh-memory implements cognitive features that mem0 does not offer: biologically-inspired memory decay based on Wixted's forgetting curves, three-tier memory promotion (working to session to long-term), causal lineage tracking across memories, and a built-in GTD task system. These features make shodh-memory behave less like a database and more like an actual memory system.",
    ],
  },
  {
    slug: "zep",
    name: "Zep",
    filename: "shodh-vs-zep.md",
    paragraphs: [
      "Zep is a cloud-first memory service written in Go with a managed platform. It offers knowledge graphs, temporal awareness, and a polished developer experience. However, Zep requires a cloud account, sends data to external servers, and operates as a SaaS dependency in your stack. Self-hosting is possible but requires significant infrastructure (PostgreSQL, Redis, embedding services).",
      "shodh-memory is the opposite: local-first, single binary, zero infrastructure. Where Zep needs a cloud connection or a multi-service deployment, shodh-memory runs on a Raspberry Pi with no network at all. Both offer knowledge graphs, but shodh-memory's graph uses Hebbian learning with synaptic plasticity\u2014edges strengthen when accessed together and decay when unused, mimicking how biological memory works.",
      "For teams that need air-gapped deployments, edge devices, or simply want to avoid cloud vendor lock-in, shodh-memory provides capabilities that Zep's architecture cannot support. The trade-off is that Zep offers a managed service with less operational overhead for cloud-native teams, while shodh-memory gives you complete sovereignty over your data and infrastructure.",
    ],
  },
  {
    slug: "cognee",
    name: "Cognee",
    filename: "shodh-vs-cognee.md",
    paragraphs: [
      "Cognee focuses on building knowledge graphs from unstructured data using LLM-powered extraction pipelines. It excels at turning documents into structured knowledge and offers good integration with graph databases like Neo4j. However, Cognee depends on external LLM APIs for entity extraction and relationship inference, making it expensive at scale and impossible to run offline.",
      "shodh-memory builds its knowledge graph using local NER (Named Entity Recognition) with rule-based extraction, requiring no external API calls. While this means less sophisticated extraction than Cognee's LLM-powered approach, it enables true offline operation and deterministic performance. shodh-memory's graph also implements spreading activation and Hebbian learning\u2014features designed for runtime memory retrieval rather than static knowledge storage.",
      "The key distinction is purpose: Cognee is a knowledge engineering tool that builds graphs from documents, while shodh-memory is a cognitive memory system that builds graphs from lived experience. If you need to process a corpus of documents into a knowledge base, Cognee is strong. If you need an AI agent that remembers, learns, and forgets like a brain, shodh-memory is built for that.",
    ],
  },
  {
    slug: "letta",
    name: "Letta",
    filename: "shodh-vs-letta.md",
    paragraphs: [
      "Letta (formerly MemGPT) pioneered the concept of virtual context management\u2014using an LLM to decide what to page in and out of its own context window. It is an agent framework first and a memory system second, providing tool-use, multi-agent orchestration, and memory as part of a broader platform. Its memory relies on external vector databases and LLM calls for management decisions.",
      "shodh-memory is a dedicated memory system, not an agent framework. It does one thing deeply: provide biologically-inspired persistent memory with sub-millisecond retrieval. Where Letta uses LLM calls to manage memory (expensive, slow, non-deterministic), shodh-memory uses algorithmic approaches\u2014decay curves, Hebbian learning, spreading activation\u2014that are fast, predictable, and free.",
      "The two can be complementary: Letta as the agent orchestration layer, shodh-memory as the memory backend. But for teams that already have an agent framework and just need memory, shodh-memory provides a more focused, performant, and cost-effective solution without the overhead of an entire agent platform.",
    ],
  },
];

function CellValue({ value }: { value: string }) {
  if (value === "\u2713" || value.startsWith("\u2713 ")) {
    return <span className="text-[var(--term-green)]">{value}</span>;
  }
  if (value === "\u2717") {
    return <span className="text-red-500">{value}</span>;
  }
  if (value === "~") {
    return <span className="text-yellow-500">{value}</span>;
  }
  return <span className="text-[var(--term-text-dim)]">{value}</span>;
}

export default function Compare() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">
                [compare]
              </span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                How shodh-memory compares
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg max-w-3xl">
              Choosing a memory system for your AI agents is a critical
              architectural decision. Here is an honest, feature-by-feature
              comparison to help you make an informed choice.
            </p>
          </div>

          {/* Feature Comparison Table */}
          <div className="shadow-window mb-16">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                comparison-matrix.tsv
              </span>
            </div>
            <div className="terminal-body overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--term-border)]">
                    <th className="text-left py-3 pr-4 text-[var(--term-text)] font-medium min-w-[240px]">
                      Feature
                    </th>
                    <th className="text-center py-3 px-3 text-[var(--term-orange)] font-bold min-w-[100px]">
                      shodh
                    </th>
                    <th className="text-center py-3 px-3 text-[var(--term-text-dim)] font-medium min-w-[100px]">
                      mem0
                    </th>
                    <th className="text-center py-3 px-3 text-[var(--term-text-dim)] font-medium min-w-[100px]">
                      Zep
                    </th>
                    <th className="text-center py-3 px-3 text-[var(--term-text-dim)] font-medium min-w-[100px]">
                      Cognee
                    </th>
                    <th className="text-center py-3 px-3 text-[var(--term-text-dim)] font-medium min-w-[100px]">
                      Letta
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((feature, i) => (
                    <tr
                      key={i}
                      className="border-b border-[var(--term-border)] border-opacity-30 hover:bg-[var(--term-border)] hover:bg-opacity-10 transition-colors"
                    >
                      <td className="py-2.5 pr-4 text-[var(--term-text)]">
                        {feature.name}
                      </td>
                      <td className="py-2.5 px-3 text-center font-medium">
                        <CellValue value={feature.shodh} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <CellValue value={feature.mem0} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <CellValue value={feature.zep} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <CellValue value={feature.cognee} />
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <CellValue value={feature.letta} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-4 pt-3 border-t border-[var(--term-border)] text-xs text-[var(--term-text-dim)]">
                <span className="text-[var(--term-green)] mr-1">{"\u2713"}</span>{" "}
                = fully supported &nbsp;&nbsp;
                <span className="text-yellow-500 mr-1">~</span> = partial /
                limited &nbsp;&nbsp;
                <span className="text-red-500 mr-1">{"\u2717"}</span> = not
                supported
              </div>
            </div>
          </div>

          {/* Individual Comparisons */}
          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-[var(--term-text)] mb-8">
              Detailed Comparisons
            </h2>
            <div className="space-y-8">
              {COMPARISONS.map((comp) => (
                <div key={comp.slug} id={`vs-${comp.slug}`} className="shadow-window">
                  <div className="terminal-header">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                    <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                      {comp.filename}
                    </span>
                  </div>
                  <div className="terminal-body">
                    <h3 className="text-lg font-medium text-[var(--term-orange)] mb-4">
                      shodh-memory vs {comp.name}
                    </h3>
                    {comp.paragraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[var(--term-text-dim)] text-sm leading-relaxed mb-4 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[var(--term-text-dim)] mb-4">
              Ready to give your AI agents real memory?
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link
                href="/docs"
                className="shadow-btn shadow-btn-primary px-6 py-2"
              >
                Try shodh-memory
              </Link>
              <a
                href="https://github.com/varun29ankuS/shodh-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-btn px-6 py-2"
              >
                View Source
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

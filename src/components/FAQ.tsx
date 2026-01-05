"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "How is this different from just using a vector database?",
    a: "Vector databases give you similarity search. Shodh-memory gives you cognition—memories strengthen when accessed together (Hebbian learning), decay naturally over time (power-law forgetting), and form associative networks. It's the difference between storage and memory.",
  },
  {
    q: "Does it require an internet connection?",
    a: "No. Shodh-memory runs 100% offline. The embeddings, vector index, knowledge graph—everything runs locally. Perfect for edge devices, air-gapped systems, or anywhere you need data privacy.",
  },
  {
    q: "What's the memory overhead?",
    a: "The binary is ~15MB. Each memory entry uses roughly 2-5KB (content + 384-dim embeddings + metadata). A system with 10,000 memories uses approximately 50MB of storage.",
  },
  {
    q: "Can it run on a Raspberry Pi?",
    a: "Yes. Shodh-memory is designed for edge deployment. It runs on Raspberry Pi Zero, Jetson Nano, industrial PCs, and other resource-constrained devices. Graph lookups are <1μs.",
  },
  {
    q: "How does memory decay work?",
    a: "We use a hybrid model: exponential decay for the first 3 days (consolidation phase), then power-law decay for long-term retention. Memories accessed 10+ times become 'potentiated' and decay 10x slower. Based on Wixted & Ebbesen (1991).",
  },
  {
    q: "What's Hebbian learning?",
    a: "\"Cells that fire together, wire together.\" When memories are accessed together, their connection strengthens. When memories compete, interference effects occur. It's how biological brains work, now in your AI agent.",
  },
  {
    q: "Is there a cloud version?",
    a: "No, and that's intentional. Shodh-memory is built for local-first, privacy-preserving AI. Your agent's memories stay on your hardware. If you need multi-device sync, you can replicate the RocksDB storage yourself.",
  },
  {
    q: "What languages/frameworks are supported?",
    a: "The core is Rust. We provide: MCP server (for Claude, Cursor), Python bindings (via PyO3/maturin), and a REST API. The Rust crate can be embedded directly in your application.",
  },
  {
    q: "How do I contribute?",
    a: "Check out github.com/varun29ankuS/shodh-memory. Open issues, submit PRs, or join discussions. The codebase is well-documented with 688+ tests. All constants have neuroscience citations.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 px-4 border-t border-[var(--term-border)]">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[var(--term-orange)] font-mono text-sm">[06]</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
              FAQ
            </h2>
          </div>
          <p className="text-[var(--term-text-dim)] pl-12">
            Frequently asked questions about shodh-memory
          </p>
        </div>

        <div className="space-y-2">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border border-[var(--term-border)] rounded overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 text-left flex items-start gap-3 hover:bg-[var(--term-bg-secondary)] transition-colors"
              >
                <span className="text-[var(--term-orange)] font-mono shrink-0">
                  {openIndex === index ? "[-]" : "[+]"}
                </span>
                <span className="text-[var(--term-text)] font-medium">
                  {faq.q}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 pl-12">
                  <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-[var(--term-text-dim)] text-sm">
            More questions?{" "}
            <a
              href="https://github.com/varun29ankuS/shodh-memory/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--term-orange)] hover:underline"
            >
              Ask on GitHub Discussions
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

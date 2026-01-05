"use client";

const DIFFERENTIATORS = [
  {
    title: "Not another vector database",
    description:
      "Most \"memory\" solutions are just vector search with a wrapper. Shodh-memory has a knowledge graph, temporal indices, and hybrid ranking. Connections between memories strengthen when accessed together—like biological synapses.",
    icon: "⚡",
  },
  {
    title: "No cloud required",
    description:
      "Mem0, Zep, and others are cloud-first. Shodh-memory is a single ~15MB binary. No API keys, no Docker, no external dependencies. Your agent's memory runs on your hardware.",
    icon: "🔒",
  },
  {
    title: "Memory that gets smarter",
    description:
      "Static storage forgets nothing and learns nothing. Shodh-memory uses Hebbian learning—frequently co-accessed memories form stronger bonds. Rarely used knowledge decays naturally. Just like your brain.",
    icon: "🧠",
  },
  {
    title: "Edge-first architecture",
    description:
      "Designed for robots, IoT, air-gapped systems. Runs on Raspberry Pi Zero. Sub-microsecond graph lookups. Your drone doesn't need WiFi to remember.",
    icon: "📡",
  },
];

const COMPARISON = [
  { feature: "Runs fully offline", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Single binary, no Docker", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Hebbian learning", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Knowledge graph", shodh: true, mem0: false, zep: true, cognee: true },
  { feature: "Memory decay model", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Runs on Raspberry Pi", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Sub-millisecond lookup", shodh: true, mem0: false, zep: false, cognee: false },
  { feature: "Open source", shodh: true, mem0: true, zep: true, cognee: true },
];

export function WhyShodh() {
  return (
    <section className="py-16 px-4 border-t border-[var(--term-border)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[var(--term-orange)] font-mono text-sm">[02]</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
              Why shodh-memory?
            </h2>
          </div>
          <p className="text-[var(--term-text-dim)] pl-12">
            What makes this different from mem0, zep, cognee, and other memory solutions
          </p>
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {DIFFERENTIATORS.map((item, i) => (
            <div
              key={i}
              className="border border-[var(--term-border)] p-6 rounded hover:border-[var(--term-orange)] transition-colors"
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h3 className="text-[var(--term-text)] font-medium mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-2 text-[var(--term-text-dim)] text-sm">comparison.md</span>
          </div>
          <div className="terminal-body overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--term-border)]">
                  <th className="text-left py-3 px-4 text-[var(--term-text)]">Feature</th>
                  <th className="text-center py-3 px-4 text-[var(--term-orange)]">shodh</th>
                  <th className="text-center py-3 px-4 text-[var(--term-text-dim)]">mem0</th>
                  <th className="text-center py-3 px-4 text-[var(--term-text-dim)]">zep</th>
                  <th className="text-center py-3 px-4 text-[var(--term-text-dim)]">cognee</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr key={i} className="border-b border-[var(--term-border)]/50">
                    <td className="py-3 px-4 text-[var(--term-text-dim)]">{row.feature}</td>
                    <td className="text-center py-3 px-4">
                      {row.shodh ? (
                        <span className="text-[var(--term-green)]">✓</span>
                      ) : (
                        <span className="text-[var(--term-text-dim)]">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.mem0 ? (
                        <span className="text-[var(--term-green)]">✓</span>
                      ) : (
                        <span className="text-[var(--term-text-dim)]">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.zep ? (
                        <span className="text-[var(--term-green)]">✓</span>
                      ) : (
                        <span className="text-[var(--term-text-dim)]">—</span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      {row.cognee ? (
                        <span className="text-[var(--term-green)]">✓</span>
                      ) : (
                        <span className="text-[var(--term-text-dim)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 text-center">
          <p className="text-[var(--term-text-dim)] text-sm">
            Others give you storage. We give you{" "}
            <span className="text-[var(--term-orange)]">cognition</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

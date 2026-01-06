"use client";

const RETENTION_DATA = [
  { time: "Day 1", normal: "50%", potentiated: "70%" },
  { time: "Day 7", normal: "35%", potentiated: "55%" },
  { time: "Day 30", normal: "18%", potentiated: "40%" },
  { time: "Day 90", normal: "10%", potentiated: "28%" },
  { time: "Day 365", normal: ">1%", potentiated: ">5%" },
];

const DURABILITY_FEATURES = [
  {
    title: "Hybrid Decay Model",
    description:
      "Exponential decay for the first 3 days (consolidation phase), then power-law for long-term retention. Memories never truly hit zero.",
    citation: "Wixted & Ebbesen (1991)",
  },
  {
    title: "Long-Term Potentiation",
    description:
      "Memories accessed 10+ times become \"potentiated\" and decay 10x slower. Effective half-life jumps from 14 days to ~140 days.",
    citation: "Bi & Poo (1998)",
  },
  {
    title: "Hebbian Strengthening",
    description:
      "Co-accessed memories form stronger bonds. Fire together, wire together. Associations strengthen with use, weaken with neglect.",
    citation: "Anderson & Pirolli (1984)",
  },
  {
    title: "Memory Replay",
    description:
      "During maintenance cycles, important memories are replayed and strengthened—mimicking hippocampal replay during sleep.",
    citation: "Rasch & Born (2013)",
  },
];

export function Durability() {
  return (
    <section className="py-16 px-4 border-t border-[var(--term-border)] bg-[var(--term-bg-secondary)]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-[var(--term-orange)] font-mono text-sm">[03]</span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
              Context Durability
            </h2>
          </div>
          <p className="text-[var(--term-text-dim)] pl-12">
            How long do memories actually last? Here&apos;s the science.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Retention Curve Table */}
          <div className="shadow-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">retention_curve.rs</span>
            </div>
            <div className="terminal-body">
              <div className="text-[var(--term-text-dim)] text-xs mb-4 font-mono">
                // Power-law decay: memories never truly hit zero
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--term-border)]">
                    <th className="text-left py-2 px-3 text-[var(--term-text)]">Time</th>
                    <th className="text-right py-2 px-3 text-[var(--term-text-dim)]">Normal</th>
                    <th className="text-right py-2 px-3 text-[var(--term-orange)]">Potentiated</th>
                  </tr>
                </thead>
                <tbody>
                  {RETENTION_DATA.map((row, i) => (
                    <tr key={i} className="border-b border-[var(--term-border)]/30">
                      <td className="py-2 px-3 text-[var(--term-text)] font-mono">{row.time}</td>
                      <td className="text-right py-2 px-3 text-[var(--term-text-dim)] font-mono">
                        {row.normal}
                      </td>
                      <td className="text-right py-2 px-3 text-[var(--term-orange)] font-mono">
                        {row.potentiated}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 pt-4 border-t border-[var(--term-border)]/30">
                <div className="text-xs text-[var(--term-text-dim)]">
                  <span className="text-[var(--term-green)]">Potentiated</span> = accessed 10+ times
                </div>
              </div>
            </div>
          </div>

          {/* Visual representation */}
          <div className="shadow-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">decay_model.txt</span>
            </div>
            <div className="terminal-body font-mono text-xs leading-relaxed">
              <pre className="text-[var(--term-text-dim)] whitespace-pre overflow-x-auto">{`
Strength
  100% |*
       | *
   70% |  *  <- Potentiated (10+ accesses)
       |   *____
   50% |    *   \\____
       |         *   \\________
   30% |              *       \\___________
       |                                  \\____
   10% |----------------------------------------\\__
       |  Normal decay                            *
    1% |--------------------------------------------*-
       +----+----+----+----+----+----+----+----+----+->
           3d   7d   14d  30d  60d  90d  180d 365d
                        Time

  [====] Exponential   [----] Power-law (heavy tail)
         (0-3 days)           (3+ days)
`}</pre>
            </div>
          </div>
        </div>

        {/* Durability Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {DURABILITY_FEATURES.map((item, i) => (
            <div
              key={i}
              className="shadow-box p-5 rounded"
            >
              <h3 className="text-[var(--term-text)] font-medium mb-2">{item.title}</h3>
              <p className="text-[var(--term-text-dim)] text-sm leading-relaxed mb-3">
                {item.description}
              </p>
              <div className="text-xs">
                <span className="text-[var(--term-text-dim)]">Based on: </span>
                <a
                  href="/research"
                  className="text-[var(--term-orange)] hover:underline"
                >
                  {item.citation}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom callout */}
        <div className="shadow-callout p-6 text-center">
          <p className="text-[var(--term-text)] mb-2">
            Memories accessed <span className="text-[var(--term-orange)] font-semibold">10+ times</span> become permanent.
          </p>
          <p className="text-[var(--term-text-dim)] text-sm">
            Even rarely-accessed memories retain {">"}1% strength after a year due to power-law decay.
          </p>
          <a
            href="/research"
            className="inline-block mt-4 text-sm text-[var(--term-orange)] hover:underline"
          >
            See the research behind our memory model →
          </a>
        </div>
      </div>
    </section>
  );
}

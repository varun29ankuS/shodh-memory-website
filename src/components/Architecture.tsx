const TIERS = [
  {
    name: "Sensory Buffer",
    icon: "👁",
    capacity: "~7 items",
    decay: "< 1 second",
    description: "Immediate context window. Raw input before processing.",
    color: "var(--term-yellow)",
  },
  {
    name: "Working Memory",
    icon: "💭",
    capacity: "~4 chunks",
    decay: "Minutes",
    description: "Active manipulation space. Current task context and associations.",
    color: "var(--term-orange)",
  },
  {
    name: "Long-Term Memory",
    icon: "🧠",
    capacity: "Unlimited",
    decay: "Power-law",
    description: "Persistent storage. Episodic + semantic with Hebbian strengthening.",
    color: "var(--term-purple)",
  },
];

const COMPONENTS = [
  { name: "Vector Index", desc: "Vamana graph, auto-scales to SPANN at 100K+" },
  { name: "Knowledge Graph", desc: "Entities + relationships + spreading activation" },
  { name: "Temporal Index", desc: "Time-based retrieval and decay" },
  { name: "Episode Manager", desc: "Conversation threading and context" },
];

export function Architecture() {
  return (
    <section id="architecture" className="py-20 md:py-28 px-6 border-t border-[var(--term-border)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          prefix="03"
          title="Under the hood"
          subtitle="Cowan's three-tier working memory model, implemented in Rust"
        />

        {/* 3-Tier Visualization */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {TIERS.map((tier, i) => (
            <div key={i} className="relative">
              {/* Connection line */}
              {i < TIERS.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 border-t border-dashed border-[var(--term-border)]" />
              )}

              <div
                className="shadow-box p-6 rounded h-full"
                style={{ borderColor: tier.color }}
              >
                <div className="text-3xl mb-3">{tier.icon}</div>
                <h3 className="text-lg font-medium mb-2" style={{ color: tier.color }}>
                  {tier.name}
                </h3>
                <div className="text-sm text-[var(--term-text-dim)] space-y-1 mb-3">
                  <div>Capacity: <span className="text-[var(--term-text)]">{tier.capacity}</span></div>
                  <div>Decay: <span className="text-[var(--term-text)]">{tier.decay}</span></div>
                </div>
                <p className="text-sm text-[var(--term-text-dim)]">{tier.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ASCII Architecture Blueprint — renders in self-hosted JetBrains Mono,
            which covers the full box-drawing range (see layout.tsx) */}
        <div className="shadow-window mb-8">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-2 text-[var(--term-text-dim)] text-sm">architecture.rs</span>
          </div>
          <div className="terminal-body overflow-x-auto">
            <pre className="w-fit mx-auto text-[10px] sm:text-xs md:text-sm leading-snug font-mono text-[var(--term-text-dim)]">{`
                    ┌─────────────────────────────────┐
                    │         MCP / API Layer         │
                    │  remember  recall  forget  ...  │
                    └───────────────┬─────────────────┘
                                    │
                                    ▼
┌───────────────────────────────────────────────────────────────────┐
│                        MEMORY CORE (Rust)                         │
│                                                                   │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────────────────┐  │
│  │   SENSORY   │   │   WORKING   │   │       LONG-TERM         │  │
│  │   BUFFER    │──▶│   MEMORY    │──▶│        MEMORY           │  │
│  │   ~7 items  │   │  ~4 chunks  │   │      unlimited          │  │
│  │  decay:<1s  │   │  decay:mins │   │    decay:power-law      │  │
│  └─────────────┘   └─────────────┘   └─────────────────────────┘  │
│         │                 │                      │                │
│         └────attention────┴────consolidation─────┘                │
│                                  │                                │
│                                  ▼                                │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                    RETRIEVAL SUBSYSTEM                     │   │
│  │                                                            │   │
│  │   VECTOR INDEX      KNOWLEDGE GRAPH      TEMPORAL INDEX    │   │
│  │     (Vamana)         (Hebbian)            (decay)          │   │
│  │                                                            │   │
│  │        │                  │                   │            │   │
│  │        └──────────────────┼───────────────────┘            │   │
│  │                           ▼                                │   │
│  │                    HYBRID RANKING                          │   │
│  │               vector + graph + time                        │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                  │                                │
│                                  ▼                                │
│  ┌────────────────────────────────────────────────────────────┐   │
│  │                         RocksDB                            │   │
│  │         memories | graph | vectors | episodes              │   │
│  └────────────────────────────────────────────────────────────┘   │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
                                    │
              ┌─────────────────────┴─────────────────────┐
              ▼                                           ▼
┌──────────────────────────┐            ┌───────────────────────────┐
│  HEBBIAN CONSOLIDATION   │◀──────────▶│   INTERFERENCE ENGINE     │
│                          │            │                           │
│co-activation strengthens │            │  similar memories compete │
│  edge.weight += η·Δw     │            │  old decays when new fits │
└──────────────────────────┘            └───────────────────────────┘
`}</pre>
          </div>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {COMPONENTS.map((comp, i) => (
            <div key={i} className="shadow-card p-4 rounded">
              <div className="text-[var(--term-orange)] text-sm font-medium mb-1">{comp.name}</div>
              <div className="text-[var(--term-text-dim)] text-xs">{comp.desc}</div>
            </div>
          ))}
        </div>

        {/* Research link */}
        <div className="mt-8 text-center">
          <a
            href="/research"
            className="text-[var(--term-text-dim)] text-sm hover:text-[var(--term-orange)] transition-colors"
          >
            Based on 18+ peer-reviewed papers →
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ prefix, title, subtitle }: { prefix: string; title: string; subtitle: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-[var(--term-orange)] font-mono text-sm">[{prefix}]</span>
        <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
          {title}
        </h2>
      </div>
      <p className="text-[var(--term-text-dim)] pl-12">{subtitle}</p>
    </div>
  );
}

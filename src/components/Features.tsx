const FEATURES = [
  {
    icon: "🧠",
    title: "Hebbian Learning",
    description: "Connections that fire together wire together. Frequently accessed associations become permanent through Long-Term Potentiation.",
    color: "var(--term-purple)",
  },
  {
    icon: "🔌",
    title: "Runs Offline",
    description: "Single ~15MB binary with no cloud dependency. Works on Raspberry Pi, Jetson, industrial PCs, air-gapped systems.",
    color: "var(--term-green)",
  },
  {
    icon: "⚡",
    title: "Sub-Millisecond",
    description: "Graph lookups in <1μs. Semantic search in 34-58ms. Fast enough for real-time agent decision making.",
    color: "var(--term-yellow)",
  },
  {
    icon: "🔬",
    title: "Neuroscience-Grounded",
    description: "3-tier architecture based on Cowan's working memory model. Hybrid decay (exponential + power-law) from cognitive research.",
    color: "var(--term-orange)",
  },
  {
    icon: "🌐",
    title: "Knowledge Graph",
    description: "Not just vector search—includes spreading activation, interference detection, and memory replay during consolidation.",
    color: "var(--term-orange)",
  },
  {
    icon: "🔧",
    title: "MCP Integration",
    description: "First-class Model Context Protocol support. Works with Claude Code, Cursor, and any MCP-compatible agent.",
    color: "var(--term-red)",
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 px-4 border-t border-[var(--term-border)]">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          prefix="01"
          title="Features"
          subtitle="What makes shodh-memory different"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={i} {...feature} index={i} />
          ))}
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

function FeatureCard({ 
  icon, 
  title, 
  description, 
  color, 
  index 
}: { 
  icon: string; 
  title: string; 
  description: string; 
  color: string;
  index: number;
}) {
  const delay = index * 0.1;
  return (
    <div 
      className="terminal-window group hover:border-[var(--term-orange)] transition-colors"
      style={{ animationDelay: delay + "s" }}
    >
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-[var(--term-text-dim)] text-sm">{title.toLowerCase().replace(/\s/g, "-")}.rs</span>
      </div>
      <div className="terminal-body">
        <div className="text-3xl mb-3" style={{ filter: "drop-shadow(0 0 8px " + color + ")" }}>
          {icon}
        </div>
        <h3 className="text-lg font-medium text-[var(--term-text)] mb-2 group-hover:text-[var(--term-orange)] transition-colors">
          {title}
        </h3>
        <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

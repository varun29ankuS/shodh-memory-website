import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const BLOG_POSTS = [
  {
    slug: "rag-is-not-memory",
    title: "RAG Is Not Memory: Why Your AI Still Has Amnesia",
    date: "2026-01-10",
    readTime: "8 min",
    tags: ["rag", "architecture", "memory"],
    excerpt: "Everyone thinks RAG solves the memory problem. It doesn't. Retrieval is not remembering. Here's the difference—and why it matters.",
  },
  {
    slug: "agentic-shift-2026",
    title: "The Agentic Shift: Why 2026 Is the Year AI Stops Waiting for Prompts",
    date: "2026-01-10",
    readTime: "9 min",
    tags: ["trends", "agentic-ai", "2026"],
    excerpt: "We're witnessing the biggest shift in AI since ChatGPT. Agents that act, remember, and learn—not chatbots that wait. Here's what's actually changing.",
  },
  {
    slug: "memory-architecture-autonomous-agents",
    title: "Memory Architecture for Autonomous Agents: Why Your AI Needs a Brain, Not a Database",
    date: "2026-01-07",
    readTime: "10 min",
    tags: ["agentic-ai", "architecture", "autonomous-agents"],
    excerpt: "Autonomous agents are everywhere—coding assistants, research bots, robotic systems. But most are goldfish. Here's how to give your agent a real brain.",
  },
  {
    slug: "hebbian-learning-ai-agents",
    title: "Hebbian Learning for AI Agents: Neurons That Fire Together Wire Together",
    date: "2026-01-03",
    readTime: "8 min",
    tags: ["neuroscience", "learning", "architecture"],
    excerpt: "How we implemented biological learning principles in shodh-memory. When memories are accessed together, their connection strengthens—just like synapses in the brain.",
  },
  {
    slug: "edge-ai-memory-raspberry-pi",
    title: "Running AI Memory on a Raspberry Pi: A Practical Guide",
    date: "2026-01-01",
    readTime: "12 min",
    tags: ["edge", "raspberry-pi", "tutorial"],
    excerpt: "Step-by-step guide to deploying shodh-memory on resource-constrained devices. Achieve sub-100ms semantic search on a $35 computer.",
  },
  {
    slug: "three-tier-memory-architecture",
    title: "The Three-Tier Memory Architecture: From Cowan to Code",
    date: "2025-12-28",
    readTime: "10 min",
    tags: ["architecture", "neuroscience", "design"],
    excerpt: "Deep dive into our sensory buffer, working memory, and long-term memory tiers. Based on Nelson Cowan's embedded-processes model.",
  },
  {
    slug: "why-not-just-vector-search",
    title: "Why Vector Search Alone Isn't Enough for Agent Memory",
    date: "2025-12-25",
    readTime: "7 min",
    tags: ["architecture", "vector-search", "graphs"],
    excerpt: "Vector similarity is great, but agents need more. We explain why shodh-memory combines vectors with knowledge graphs and temporal indices.",
  },
  {
    slug: "memory-decay-forgetting-curves",
    title: "Memory Decay and Forgetting Curves: The Math Behind Remembering",
    date: "2025-12-22",
    readTime: "9 min",
    tags: ["neuroscience", "algorithms", "research"],
    excerpt: "Ebbinghaus showed us forgetting is predictable. We implement hybrid exponential + power-law decay for realistic memory behavior.",
  },
  {
    slug: "mcp-integration-claude-cursor",
    title: "Integrating shodh-memory with Claude Code and Cursor via MCP",
    date: "2025-12-20",
    readTime: "6 min",
    tags: ["mcp", "integration", "tutorial"],
    excerpt: "Complete guide to adding persistent memory to your AI coding assistant. One command to remember everything across sessions.",
  },
  {
    slug: "knowledge-graph-spreading-activation",
    title: "Knowledge Graphs and Spreading Activation: How Context Surfaces",
    date: "2025-12-18",
    readTime: "11 min",
    tags: ["graphs", "algorithms", "architecture"],
    excerpt: "When you access one memory, related concepts activate too. We implement spreading activation for proactive context retrieval.",
  },
  {
    slug: "benchmarking-memory-systems",
    title: "Benchmarking AI Memory Systems: Latency, Accuracy, and Scale",
    date: "2025-12-15",
    readTime: "8 min",
    tags: ["benchmarks", "performance", "comparison"],
    excerpt: "How does shodh-memory compare to alternatives? We share our benchmarking methodology and results across key metrics.",
  },
  {
    slug: "robotics-memory-real-world",
    title: "Memory for Robots: Learning from the Real World",
    date: "2025-12-12",
    readTime: "10 min",
    tags: ["robotics", "edge", "case-study"],
    excerpt: "Case study: how a pick-and-place robot uses shodh-memory to learn object positions and adapt to warehouse changes.",
  },
  {
    slug: "privacy-first-ai-memory",
    title: "Privacy-First AI Memory: Why Your Data Should Stay Local",
    date: "2025-12-10",
    readTime: "5 min",
    tags: ["privacy", "edge", "philosophy"],
    excerpt: "In an age of cloud AI, we argue for local-first memory. Your agent's knowledge is valuable—keep it on your hardware.",
  },
  {
    slug: "long-term-potentiation-code",
    title: "Long-Term Potentiation in Code: Making Memories Permanent",
    date: "2025-12-08",
    readTime: "7 min",
    tags: ["neuroscience", "algorithms", "learning"],
    excerpt: "In the brain, repeated activation makes synapses permanent. We implement LTP so frequently-used knowledge resists decay.",
  },
];

export default function Blog() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[blog]</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">Engineering Memory</h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg">
              Technical deep-dives into neuroscience, edge computing, and AI agent architecture.
            </p>
          </div>

          <div className="space-y-8">
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={i}
                href={"/blog/" + post.slug}
                className="block shadow-window group"
              >
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-2 text-[var(--term-text-dim)] text-sm">{post.slug}.md</span>
                  <span className="ml-auto text-[var(--term-text-dim)] text-xs">{post.date}</span>
                </div>
                <div className="terminal-body">
                  <h2 className="text-lg font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-[var(--term-text-dim)] text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-[var(--term-text-dim)]">{post.readTime} read</span>
                    <div className="flex gap-2">
                      {post.tags.map((tag, j) => (
                        <span key={j} className="px-2 py-0.5 border border-[var(--term-border)] text-[var(--term-text-dim)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

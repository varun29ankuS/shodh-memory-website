import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog — Engineering Memory",
  description:
    "Technical deep-dives into AI memory architecture, Hebbian learning, edge computing, knowledge graphs, and neuroscience-inspired agent design.",
  openGraph: {
    title: "Blog — Engineering Memory | shodh-memory",
    description:
      "Technical deep-dives into AI memory architecture, Hebbian learning, edge computing, knowledge graphs, and neuroscience-inspired agent design.",
    url: "https://www.shodh-memory.com/blog",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/blog",
  },
};

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
  {
    slug: "building-ai-agents-that-learn",
    title: "Building AI Agents That Actually Learn: Beyond Prompt Engineering",
    date: "2026-02-10",
    readTime: "9 min",
    tags: ["agentic-ai", "learning", "cognition"],
    excerpt: "Most AI agents are stateless wrappers around LLMs. They don't learn — they restart. Here's what it takes to build agents with genuine cognitive continuity.",
  },
  {
    slug: "mcp-protocol-future-ai-tools",
    title: "MCP: The Protocol That Will Define How AI Tools Communicate",
    date: "2026-02-08",
    readTime: "8 min",
    tags: ["mcp", "architecture", "standards"],
    excerpt: "Model Context Protocol is to AI tools what HTTP was to the web. A deep dive into the protocol, its design, and why memory is its killer app.",
  },
  {
    slug: "rust-for-ai-infrastructure",
    title: "Why We Chose Rust for AI Infrastructure (And When You Shouldn't)",
    date: "2026-02-05",
    readTime: "8 min",
    tags: ["rust", "engineering", "performance"],
    excerpt: "An honest take on Rust for AI systems. The wins: memory safety, zero-cost abstractions, cross-compilation to ARM. The costs: iteration speed, ecosystem gaps.",
  },
  {
    slug: "vector-search-beyond-cosine",
    title: "Vector Search Beyond Cosine Similarity: Graph-Based Approaches",
    date: "2026-02-02",
    readTime: "10 min",
    tags: ["vector-search", "algorithms", "performance"],
    excerpt: "Cosine similarity is chapter one. Graph-based search (Vamana, DiskANN) is chapter two. How shodh-memory auto-scales from HNSW to SPANN at 100K vectors.",
  },
  {
    slug: "cognitive-architecture-ai-systems",
    title: "Cognitive Architecture for AI Systems: What Neuroscience Actually Teaches Us",
    date: "2026-01-28",
    readTime: "11 min",
    tags: ["neuroscience", "cognition", "architecture"],
    excerpt: "Baddeley's working memory. Cowan's embedded processes. Ebbinghaus forgetting curves. Hebb's rule. How each maps to engineering decisions in a real system.",
  },
  {
    slug: "memory-for-coding-assistants",
    title: "Why Your Coding Assistant Forgets Everything: Fixing AI Memory for Developers",
    date: "2026-01-25",
    readTime: "7 min",
    tags: ["developer-tools", "mcp", "tutorial"],
    excerpt: "You've explained your project structure 47 times this month. Your AI assistant has the memory of a goldfish. Here's how to fix that.",
  },
  {
    slug: "rocksdb-for-ai-workloads",
    title: "RocksDB for AI Workloads: Lessons from Building a Memory Engine",
    date: "2026-01-22",
    readTime: "9 min",
    tags: ["storage", "engineering", "rocksdb"],
    excerpt: "Why we chose RocksDB over SQLite and Postgres. Column families, prefix iterators, write-ahead logging, and the compaction strategies that actually matter.",
  },
  {
    slug: "multi-agent-memory-coordination",
    title: "Memory in Multi-Agent Systems: When AI Agents Share a Brain",
    date: "2026-01-18",
    readTime: "8 min",
    tags: ["multi-agent", "architecture", "cognition"],
    excerpt: "When multiple agents share memory, you get emergent coordination. When they don't, you get chaos. The architecture of shared cognitive systems.",
  },
  {
    slug: "embedding-models-edge-devices",
    title: "Running Embedding Models on Edge Devices: ONNX, Quantization, and Reality",
    date: "2026-01-15",
    readTime: "10 min",
    tags: ["embeddings", "edge", "performance"],
    excerpt: "Getting MiniLM-L6-v2 to run on a Raspberry Pi at 34ms per embedding. ONNX Runtime, model quantization, batch processing, and the circuit breaker that saved us.",
  },
  {
    slug: "the-memory-layer",
    title: "The Memory Layer: Why Every AI System Will Have One by 2027",
    date: "2026-01-12",
    readTime: "9 min",
    tags: ["trends", "cognition", "vision"],
    excerpt: "Compute has a layer. Storage has a layer. Networking has a layer. Memory is the missing layer in AI infrastructure — and it's arriving now.",
  },
];

const TOPICS: Record<string, { label: string; description: string; tags: string[] }> = {
  cognition: {
    label: "Cognition & Neuroscience",
    description: "How the brain remembers — and how we translated decades of cognitive science into code",
    tags: ["neuroscience", "cognition", "learning", "algorithms", "research"],
  },
  architecture: {
    label: "Architecture & Engineering",
    description: "System design decisions, storage engines, and the infrastructure of memory",
    tags: ["architecture", "engineering", "storage", "rocksdb", "rust", "performance"],
  },
  agents: {
    label: "AI Agents & MCP",
    description: "Building agents that remember, learn, and coordinate through shared cognitive systems",
    tags: ["agentic-ai", "mcp", "multi-agent", "developer-tools", "standards"],
  },
  edge: {
    label: "Edge & Robotics",
    description: "Running cognitive memory on Raspberry Pis, robots, and air-gapped systems",
    tags: ["edge", "robotics", "embeddings", "raspberry-pi", "tutorial"],
  },
  vision: {
    label: "Trends & Vision",
    description: "Where AI memory is heading — the memory layer, the agentic shift, and what comes next",
    tags: ["trends", "vision", "2026", "comparison", "philosophy"],
  },
};

function getTopicForPost(post: typeof BLOG_POSTS[number]): string {
  for (const [key, topic] of Object.entries(TOPICS)) {
    if (post.tags.some((t) => topic.tags.includes(t))) return key;
  }
  return "architecture";
}

const sortedPosts = [...BLOG_POSTS].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function Blog() {
  const featured = sortedPosts[0];
  const rest = sortedPosts.slice(1);

  const grouped: Record<string, typeof BLOG_POSTS> = {};
  for (const post of rest) {
    const topic = getTopicForPost(post);
    if (!grouped[topic]) grouped[topic] = [];
    grouped[topic].push(post);
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[blog]</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">Engineering Memory</h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg max-w-2xl mb-2">
              Where cognitive science meets systems engineering.
            </p>
            <p className="text-[var(--term-text-dim)] text-sm max-w-3xl">
              Deep-dives into how memory actually works — in brains and in machines. Hebbian learning,
              forgetting curves, spreading activation, knowledge graphs, and the engineering required
              to make AI agents that genuinely remember.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="text-xs text-[var(--term-orange)] font-mono mb-3 tracking-wider uppercase">Latest Post</div>
            <Link href={"/blog/" + featured.slug} className="block shadow-window group">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-[var(--term-text-dim)] text-sm">{featured.slug}.md</span>
                <span className="ml-auto text-[var(--term-text-dim)] text-xs">{featured.date}</span>
              </div>
              <div className="terminal-body p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-semibold text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-3">
                  {featured.title}
                </h2>
                <p className="text-[var(--term-text-dim)] mb-4 max-w-2xl">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs">
                  <span className="text-[var(--term-text-dim)]">{featured.readTime} read</span>
                  <div className="flex gap-2">
                    {featured.tags.map((tag, j) => (
                      <span key={j} className="px-2 py-0.5 border border-[var(--term-border)] text-[var(--term-text-dim)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Topic Sections */}
          {Object.entries(TOPICS).map(([key, topic]) => {
            const posts = grouped[key];
            if (!posts || posts.length === 0) return null;
            return (
              <section key={key} className="mb-14">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-[var(--term-orange)] mb-1">{topic.label}</h2>
                  <p className="text-[var(--term-text-dim)] text-sm">{topic.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {posts.map((post, i) => (
                    <Link
                      key={i}
                      href={"/blog/" + post.slug}
                      className="block shadow-box rounded p-5 group hover:border-[var(--term-orange)] transition-colors"
                    >
                      <h3 className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-2 leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-[var(--term-text-dim)] text-xs mb-3 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-[var(--term-text-dim)]">
                        <span>{post.date}</span>
                        <span className="text-[var(--term-border)]">|</span>
                        <span>{post.readTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}

          {/* Post Count */}
          <div className="text-center pt-8 border-t border-[var(--term-border)]">
            <p className="text-[var(--term-text-dim)] text-sm">
              {BLOG_POSTS.length} posts on cognition, memory architecture, and AI systems
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

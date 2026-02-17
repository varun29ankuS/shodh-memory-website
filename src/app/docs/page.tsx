import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Complete guide to installing, configuring, and using shodh-memory. MCP setup for Claude and Cursor, REST API reference, and first-memory tutorial.",
  openGraph: {
    title: "Documentation | shodh-memory",
    description:
      "Complete guide to installing, configuring, and using shodh-memory. MCP setup for Claude and Cursor, REST API reference, and first-memory tutorial.",
    url: "https://www.shodh-memory.com/docs",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/docs",
  },
};

const NAV_SECTIONS = [
  { id: "quickstart", label: "Quick Start" },
  { id: "installation", label: "Installation" },
  { id: "mcp-setup", label: "MCP Setup" },
  { id: "configuration", label: "Configuration" },
  { id: "first-memory", label: "First Memory" },
  { id: "mcp-tools", label: "MCP Tools" },
  { id: "api-reference", label: "API Reference" },
  { id: "hooks", label: "Hooks" },
];

function CodeBlock({ title, children }: { title: string; children: string }) {
  return (
    <div className="shadow-window my-4">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-[var(--term-text-dim)] text-sm">{title}</span>
      </div>
      <div className="terminal-body">
        <pre className="text-sm leading-relaxed overflow-x-auto">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}

function SectionHeader({ index, title, id }: { index: number; title: string; id: string }) {
  return (
    <div id={id} className="flex items-center gap-3 mb-2 scroll-mt-24">
      <span className="text-[var(--term-orange)] font-mono text-sm">
        [{String(index).padStart(2, "0")}]
      </span>
      <h2 className="text-xl font-semibold text-[var(--term-text)]">{title}</h2>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Page Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-green)] font-mono">$</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                Documentation
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] leading-relaxed">
              Everything you need to install, configure, and use shodh-memory.
              From one-command setup to full API reference.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="shadow-card rounded p-4 mb-12 overflow-x-auto">
            <div className="flex flex-wrap gap-3">
              {NAV_SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-[var(--term-text-dim)] hover:text-[var(--term-orange)] transition-colors whitespace-nowrap"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* ============================================================ */}
          {/* [01] Quick Start */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={1} title="Quick Start" id="quickstart" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              Get shodh-memory running with a single command.
            </p>

            <div className="shadow-callout p-6 mb-6">
              <h3 className="text-[var(--term-text)] font-medium mb-2">Claude Code (recommended)</h3>
              <p className="text-[var(--term-text-dim)] text-sm mb-3">
                One command. No server to run. MCP handles everything.
              </p>
              <CodeBlock title="terminal">
{`claude mcp add shodh-memory -- npx -y @shodh/memory-mcp`}
              </CodeBlock>
            </div>

            <div className="shadow-box rounded p-5 mb-4">
              <h3 className="text-[var(--term-text)] font-medium mb-2">Cursor</h3>
              <p className="text-[var(--term-text-dim)] text-sm mb-3">
                Add to your MCP configuration file at <code className="text-[var(--term-cyan)]">~/.cursor/mcp.json</code>:
              </p>
              <CodeBlock title="mcp.json">
{`{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "@shodh/memory-mcp"]
    }
  }
}`}
              </CodeBlock>
            </div>

            <div className="shadow-box rounded p-5">
              <h3 className="text-[var(--term-text)] font-medium mb-2">Python</h3>
              <CodeBlock title="terminal">
{`pip install shodh-memory`}
              </CodeBlock>
              <p className="text-[var(--term-text-dim)] text-sm">
                Models and ONNX runtime bundled. Works on Windows, macOS, and Linux.
              </p>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [02] Installation */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={2} title="Installation" id="installation" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              All platforms and package managers.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-2">npm (MCP Server)</h3>
                <CodeBlock title="terminal">
{`npx -y @shodh/memory-mcp

# Or install globally
npm install -g @shodh/memory-mcp`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-2">Python (PyPI)</h3>
                <CodeBlock title="terminal">
{`pip install shodh-memory`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-2">Rust (crates.io)</h3>
                <CodeBlock title="Cargo.toml">
{`[dependencies]
shodh-memory = "0.1"`}
                </CodeBlock>
                <p className="text-[var(--term-text-dim)] text-sm mt-2">
                  Models auto-download on first use to <code className="text-[var(--term-cyan)]">~/.cache/shodh-memory/</code> (~37MB).
                </p>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-2">Docker</h3>
                <CodeBlock title="terminal">
{`docker run -d -p 3030:3030 \\
  -e SHODH_HOST=0.0.0.0 \\
  -v shodh-data:/data \\
  roshera/shodh-memory`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-2">Binary (Linux / macOS)</h3>
                <CodeBlock title="terminal">
{`# Linux x64
curl -L https://github.com/varun29ankuS/shodh-memory/releases/latest/download/shodh-memory-x86_64-linux -o shodh-memory
chmod +x shodh-memory
./shodh-memory

# macOS ARM64 (Apple Silicon)
curl -L https://github.com/varun29ankuS/shodh-memory/releases/latest/download/shodh-memory-aarch64-darwin -o shodh-memory
chmod +x shodh-memory
./shodh-memory`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Platform Support</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Platform</th>
                      <th className="text-left pb-2">Architecture</th>
                      <th className="text-left pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1">Linux</td><td>x86_64</td><td className="text-[var(--term-green)]">Supported</td></tr>
                    <tr><td className="py-1">Linux</td><td>ARM64</td><td className="text-[var(--term-green)]">Supported</td></tr>
                    <tr><td className="py-1">macOS</td><td>x86_64 (Intel)</td><td className="text-[var(--term-green)]">Supported</td></tr>
                    <tr><td className="py-1">macOS</td><td>ARM64 (Apple Silicon)</td><td className="text-[var(--term-green)]">Supported</td></tr>
                    <tr><td className="py-1">Windows</td><td>x86_64</td><td className="text-[var(--term-green)]">Supported</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [03] MCP Setup */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={3} title="MCP Setup" id="mcp-setup" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              Step-by-step setup for Claude Code, Claude Desktop, and Cursor.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Claude Code (CLI)</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  Single command — no config files needed.
                </p>
                <CodeBlock title="terminal">
{`claude mcp add shodh-memory -- npx -y @shodh/memory-mcp`}
                </CodeBlock>
                <p className="text-[var(--term-text-dim)] text-sm">
                  This registers shodh-memory as an MCP server. All 45 tools become
                  available in your Claude Code sessions immediately.
                </p>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Claude Desktop</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  Add to your Claude Desktop config file:
                </p>
                <table className="w-full text-sm mb-4">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">OS</th>
                      <th className="text-left pb-2">Config Path</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1">macOS</td><td><code className="text-[var(--term-cyan)]">~/Library/Application Support/Claude/claude_desktop_config.json</code></td></tr>
                    <tr><td className="py-1">Windows</td><td><code className="text-[var(--term-cyan)]">%APPDATA%\Claude\claude_desktop_config.json</code></td></tr>
                    <tr><td className="py-1">Linux</td><td><code className="text-[var(--term-cyan)]">~/.config/Claude/claude_desktop_config.json</code></td></tr>
                  </tbody>
                </table>
                <CodeBlock title="claude_desktop_config.json">
{`{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "@shodh/memory-mcp"],
      "env": {
        "SHODH_API_KEY": "your-api-key"
      }
    }
  }
}`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Cursor</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  Add to <code className="text-[var(--term-cyan)]">~/.cursor/mcp.json</code>:
                </p>
                <CodeBlock title="~/.cursor/mcp.json">
{`{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "@shodh/memory-mcp"],
      "env": {
        "SHODH_API_KEY": "your-api-key"
      }
    }
  }
}`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Verify Connection</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  If running the standalone server, check it&apos;s healthy:
                </p>
                <CodeBlock title="terminal">
{`curl http://localhost:3030/health
# {"status":"ok"}`}
                </CodeBlock>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [04] Configuration */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={4} title="Configuration" id="configuration" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              Environment variables for the standalone server.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Authentication</h3>
                <CodeBlock title=".env">
{`# Production: multiple API keys (comma-separated)
SHODH_API_KEYS=sk-key-1,sk-key-2

# Development: single key (fallback if SHODH_API_KEYS not set)
SHODH_DEV_API_KEY=sk-shodh-dev-change-me

# Client-side: must match one of the server's accepted keys
SHODH_API_KEY=sk-shodh-dev-change-me`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Server</h3>
                <CodeBlock title=".env">
{`# Bind address (default: 127.0.0.1)
# Use 0.0.0.0 only behind authenticated reverse proxy
SHODH_HOST=127.0.0.1

# Port (default: 3030)
SHODH_PORT=3030

# Storage directory
SHODH_MEMORY_PATH=./shodh_memory_data

# Environment mode
SHODH_ENV=production

# Logging level
RUST_LOG=info`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Rate Limiting</h3>
                <CodeBlock title=".env">
{`SHODH_RATE_LIMIT=4000
SHODH_RATE_BURST=8000
SHODH_MAX_CONCURRENT=200`}
                </CodeBlock>
                <p className="text-[var(--term-text-dim)] text-sm mt-2">
                  Defaults are high intentionally — shodh-memory is designed for LLM workloads
                  with rapid-fire tool calls.
                </p>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">CORS (optional)</h3>
                <CodeBlock title=".env">
{`SHODH_CORS_ORIGINS=https://your-frontend.com
SHODH_CORS_CREDENTIALS=false`}
                </CodeBlock>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [05] Your First Memory */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={5} title="Your First Memory" id="first-memory" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              Store and retrieve memories using the REST API, Python, or Rust.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">REST API</h3>
                <CodeBlock title="store a memory">
{`curl -X POST http://localhost:3030/api/remember \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "user_id": "user-1",
    "content": "User prefers dark mode",
    "memory_type": "Decision",
    "tags": ["preferences", "ui"]
  }'`}
                </CodeBlock>
                <CodeBlock title="search memories">
{`curl -X POST http://localhost:3030/api/recall \\
  -H "Content-Type: application/json" \\
  -H "X-API-Key: your-api-key" \\
  -d '{
    "user_id": "user-1",
    "query": "user preferences",
    "limit": 5
  }'`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Python</h3>
                <CodeBlock title="example.py">
{`from shodh_memory import Memory

memory = Memory(storage_path="./my_agent_data")

# Store with types for prioritization
memory.remember("User prefers dark mode", memory_type="Decision")
memory.remember("JWT tokens expire after 24h", memory_type="Learning")
memory.remember("Deploy failed: missing env var", memory_type="Error")

# Semantic search
results = memory.recall("user preferences", limit=5)
for r in results:
    print(f"{r['content']} (importance: {r['importance']:.2f})")

# Context summary for LLM bootstrap
summary = memory.context_summary()
print(summary["decisions"])
print(summary["learnings"])`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Rust</h3>
                <CodeBlock title="main.rs">
{`use shodh_memory::memory::{MemorySystem, MemoryConfig, Experience, ExperienceType, Query};

fn main() -> anyhow::Result<()> {
    let config = MemoryConfig {
        storage_path: "./my_agent_data".into(),
        ..Default::default()
    };
    let memory = MemorySystem::new(config)?;

    let experience = Experience {
        content: "User prefers dark mode".to_string(),
        experience_type: ExperienceType::Decision,
        ..Default::default()
    };
    memory.remember(experience, None)?;

    let query = Query::builder()
        .query_text("user preferences")
        .max_results(5)
        .build();
    let results = memory.recall(&query)?;

    for mem in results {
        println!("{}", mem.experience.content);
    }
    Ok(())
}`}
                </CodeBlock>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Memory Types</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  Types affect importance scoring and decay rates:
                </p>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Type</th>
                      <th className="text-left pb-2">Weight</th>
                      <th className="text-left pb-2">Use For</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-text)]">Decision</td><td>+0.30</td><td>Choices, preferences, conclusions</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Learning</td><td>+0.25</td><td>New knowledge acquired</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Error</td><td>+0.25</td><td>Mistakes to avoid</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Discovery</td><td>+0.20</td><td>Findings, insights</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Pattern</td><td>+0.20</td><td>Recurring behaviors</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Task</td><td>+0.15</td><td>Work items</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Context</td><td>+0.10</td><td>General information</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Conversation</td><td>+0.10</td><td>Chat history</td></tr>
                    <tr><td className="py-1 text-[var(--term-text)]">Observation</td><td>+0.05</td><td>Low-priority notes (default)</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [06] MCP Tools */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={6} title="MCP Tools" id="mcp-tools" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              45 tools available via the Model Context Protocol.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Core Memory</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Tool</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">remember</td><td>Store a memory with type, tags, and metadata</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">recall</td><td>Semantic search across all memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">proactive_context</td><td>Auto-surface relevant memories for current context</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">context_summary</td><td>Categorized overview (decisions, learnings, context)</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">list_memories</td><td>List all stored memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">read_memory</td><td>Read full content of a specific memory</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">forget</td><td>Delete a memory by ID</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">memory_stats</td><td>Storage and index statistics</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Todo / GTD</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Tool</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">add_todo</td><td>Create task with project, context, priority, due date</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">list_todos</td><td>Filter by status, project, context, due date</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">update_todo</td><td>Update task properties</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">complete_todo</td><td>Mark done (auto-advances recurring tasks)</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">delete_todo</td><td>Remove a task</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">add_project</td><td>Create project for grouping todos</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">list_projects</td><td>List all projects with stats</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">todo_stats</td><td>Counts by status, overdue items</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Reminders</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Tool</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">set_reminder</td><td>Time-based, duration-based, or context-triggered</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">list_reminders</td><td>View pending, triggered, or all reminders</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">dismiss_reminder</td><td>Acknowledge a triggered reminder</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Maintenance</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Tool</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">verify_index</td><td>Check vector index health for orphaned memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">repair_index</td><td>Re-index orphaned memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">backup_create</td><td>Create full backup with checksum</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">backup_list</td><td>List available backups</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">backup_verify</td><td>Verify backup integrity</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">backup_purge</td><td>Purge old backups, keep recent N</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">consolidation_report</td><td>View memory consolidation activity</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">token_status</td><td>Check context window token usage</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">reset_token_session</td><td>Reset token counter for new session</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [07] API Reference */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={7} title="API Reference" id="api-reference" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              REST endpoints on <code className="text-[var(--term-cyan)]">localhost:3030</code>. All requests require <code className="text-[var(--term-cyan)]">X-API-Key</code> header.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Core Memory</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Method</th>
                      <th className="text-left pb-2">Endpoint</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-green)]">POST</td><td>/api/remember</td><td>Store a memory</td></tr>
                    <tr><td className="py-1 text-[var(--term-green)]">POST</td><td>/api/remember/batch</td><td>Store multiple memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/recall</td><td>Semantic search</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/recall/tags</td><td>Search by tags</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/recall/date</td><td>Search by date range</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/api/memory/&#123;id&#125;</td><td>Get memory by ID</td></tr>
                    <tr><td className="py-1 text-[var(--term-red)]">DELETE</td><td>/api/memory/&#123;id&#125;</td><td>Delete memory</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/memories</td><td>List with filters</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/proactive_context</td><td>Context-aware retrieval</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/context_summary</td><td>Categorized summary</td></tr>
                    <tr><td className="py-1 text-[var(--term-green)]">POST</td><td>/api/reinforce</td><td>Hebbian feedback</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Todos & Projects</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Method</th>
                      <th className="text-left pb-2">Endpoint</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/todos</td><td>List todos</td></tr>
                    <tr><td className="py-1 text-[var(--term-green)]">POST</td><td>/api/todos/add</td><td>Create todo</td></tr>
                    <tr><td className="py-1 text-[var(--term-yellow)]">POST</td><td>/api/todos/update</td><td>Update todo</td></tr>
                    <tr><td className="py-1 text-[var(--term-green)]">POST</td><td>/api/todos/complete</td><td>Mark complete</td></tr>
                    <tr><td className="py-1 text-[var(--term-red)]">POST</td><td>/api/todos/delete</td><td>Delete todo</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/api/todos/&#123;id&#125;</td><td>Get todo</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/api/todos/&#123;id&#125;/subtasks</td><td>List subtasks</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">POST</td><td>/api/todos/stats</td><td>Statistics</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Health & Metrics</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Method</th>
                      <th className="text-left pb-2">Endpoint</th>
                      <th className="text-left pb-2">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/health</td><td>Health check</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/metrics</td><td>Prometheus metrics</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">GET</td><td>/api/context/status</td><td>Context window status</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Performance</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Operation</th>
                      <th className="text-left pb-2">Latency</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1">Store memory</td><td className="text-[var(--term-green)]">55-60ms</td></tr>
                    <tr><td className="py-1">Semantic search</td><td className="text-[var(--term-green)]">34-58ms</td></tr>
                    <tr><td className="py-1">Tag search</td><td className="text-[var(--term-green)]">~1ms</td></tr>
                    <tr><td className="py-1">Entity lookup</td><td className="text-[var(--term-green)]">763ns</td></tr>
                    <tr><td className="py-1">Graph traversal (3-hop)</td><td className="text-[var(--term-green)]">30us</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ============================================================ */}
          {/* [08] Hooks & Automation */}
          {/* ============================================================ */}
          <section className="mb-16">
            <SectionHeader index={8} title="Hooks & Automation" id="hooks" />
            <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">
              Automatic memory capture via Claude Code hooks. Memories are recorded
              without manual tool calls.
            </p>

            <div className="space-y-4">
              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">How Hooks Work</h3>
                <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
                  Claude Code fires events at key moments: session start, user prompt,
                  before/after tool use. The shodh-memory hook script intercepts these
                  events and streams context to the memory server automatically. You get
                  persistent memory without changing your workflow.
                </p>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Supported Events</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left pb-2">Event</th>
                      <th className="text-left pb-2">Triggers On</th>
                      <th className="text-left pb-2">Captures</th>
                    </tr>
                  </thead>
                  <tbody className="text-[var(--term-text-dim)]">
                    <tr><td className="py-1 text-[var(--term-cyan)]">SessionStart</td><td>New Claude Code session</td><td>Surfaces relevant past memories</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">UserPromptSubmit</td><td>User sends a message</td><td>Records conversation context</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">PreToolUse</td><td>Before Edit, Write, Bash</td><td>Records intent and patterns</td></tr>
                    <tr><td className="py-1 text-[var(--term-cyan)]">PostToolUse</td><td>After Edit, Write, Bash, Read</td><td>Records outcomes and file access</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="shadow-box rounded p-5">
                <h3 className="text-[var(--term-text)] font-medium mb-3">Setup</h3>
                <p className="text-[var(--term-text-dim)] text-sm mb-3">
                  Add to your Claude Code settings (<code className="text-[var(--term-cyan)]">~/.claude/settings.json</code>):
                </p>
                <CodeBlock title="settings.json (hooks section)">
{`{
  "hooks": {
    "SessionStart": [{
      "hooks": [{
        "type": "command",
        "command": "bun run $SHODH_HOOKS_DIR/memory-hook.ts SessionStart"
      }]
    }],
    "UserPromptSubmit": [{
      "hooks": [{
        "type": "command",
        "command": "bun run $SHODH_HOOKS_DIR/memory-hook.ts UserPromptSubmit"
      }]
    }],
    "PreToolUse": [{
      "matcher": { "tool_name": ["Edit", "Write", "Bash"] },
      "hooks": [{
        "type": "command",
        "command": "bun run $SHODH_HOOKS_DIR/memory-hook.ts PreToolUse"
      }]
    }],
    "PostToolUse": [{
      "matcher": { "tool_name": ["Edit", "Write", "Bash", "Read"] },
      "hooks": [{
        "type": "command",
        "command": "bun run $SHODH_HOOKS_DIR/memory-hook.ts PostToolUse"
      }]
    }]
  }
}`}
                </CodeBlock>
                <p className="text-[var(--term-text-dim)] text-sm mt-2">
                  Set <code className="text-[var(--term-cyan)]">SHODH_HOOKS_DIR</code> to the
                  path where you cloned the shodh-memory hooks directory.
                </p>
              </div>
            </div>
          </section>

          {/* Need Help? */}
          <div className="shadow-callout p-6">
            <h3 className="text-[var(--term-text)] font-medium mb-2">Need Help?</h3>
            <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
              Open an{" "}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--term-orange)] hover:underline"
              >
                issue on GitHub
              </a>{" "}
              or join the{" "}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--term-orange)] hover:underline"
              >
                discussions
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

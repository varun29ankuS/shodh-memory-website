import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Integrations — Connect shodh-memory to Your Tools",
  description:
    "Set up shodh-memory with Claude Code, Cursor, Windsurf, Claude Desktop, VS Code Continue, and Docker. One-command MCP integration for persistent AI memory in your coding workflow.",
  keywords: [
    "shodh memory cursor",
    "shodh memory claude code",
    "shodh memory windsurf",
    "shodh memory claude desktop",
    "shodh memory continue",
    "shodh memory docker",
    "MCP server setup",
    "AI memory integration",
    "cursor MCP",
    "windsurf MCP",
    "claude code MCP",
  ],
  openGraph: {
    title: "Integrations | shodh-memory",
    description:
      "Connect shodh-memory to Claude Code, Cursor, Windsurf, Claude Desktop, and more. One-command setup via MCP protocol.",
    url: "https://www.shodh-memory.com/integrations",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/integrations",
  },
};

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

const INTEGRATIONS = [
  {
    id: "claude-code",
    label: "[claude-code]",
    name: "Claude Code",
    description:
      "The fastest way to get started. One CLI command registers shodh-memory as an MCP server with all 45 tools. Pair with hooks for fully automatic memory capture across sessions.",
    steps: [
      "Run the command below in your terminal",
      "All 45 MCP tools are available immediately",
      "Add hooks for automatic memory (see note below)",
    ],
    configTitle: "terminal",
    config: `claude mcp add shodh-memory -- npx -y shodh-memory`,
    note: "Works with Claude Code hooks for automatic memory capture. Add hook configuration to ~/.claude/settings.json to record context from every session, tool use, and prompt without manual tool calls.",
  },
  {
    id: "cursor",
    label: "[cursor]",
    name: "Cursor",
    description:
      "Add persistent memory to Cursor&apos;s AI assistant. Memories persist across chat sessions, composer threads, and projects.",
    steps: [
      "Open Cursor Settings (Cmd/Ctrl + ,)",
      "Navigate to MCP section",
      "Click \"Add new MCP server\"",
      "Paste the JSON config below",
    ],
    configTitle: "~/.cursor/mcp.json",
    config: `{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "shodh-memory"]
    }
  }
}`,
    note: null,
  },
  {
    id: "windsurf",
    label: "[windsurf]",
    name: "Windsurf",
    description:
      "Give Windsurf&apos;s Cascade AI long-term memory. Remembers decisions, patterns, and context across coding sessions.",
    steps: [
      "Open Windsurf Settings",
      "Navigate to MCP Servers",
      "Click \"Add Server\"",
      "Paste the JSON config below",
    ],
    configTitle: "mcp_config.json",
    config: `{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "shodh-memory"]
    }
  }
}`,
    note: null,
  },
  {
    id: "claude-desktop",
    label: "[claude-desktop]",
    name: "Claude Desktop",
    description:
      "Add persistent memory to the Claude Desktop app. Memories carry across conversations so Claude remembers your preferences and project context.",
    steps: [
      "Locate your Claude Desktop config file (see paths below)",
      "Add the shodh-memory server config",
      "Restart Claude Desktop",
    ],
    configTitle: "claude_desktop_config.json",
    config: `{
  "mcpServers": {
    "shodh-memory": {
      "command": "npx",
      "args": ["-y", "shodh-memory"]
    }
  }
}`,
    note: "Config file locations: macOS ~/Library/Application Support/Claude/claude_desktop_config.json | Windows %APPDATA%\\Claude\\claude_desktop_config.json | Linux ~/.config/Claude/claude_desktop_config.json",
  },
  {
    id: "continue",
    label: "[continue]",
    name: "VS Code + Continue",
    description:
      "Use shodh-memory with the Continue extension in VS Code. Gives your open-source AI assistant persistent memory across sessions.",
    steps: [
      "Install the Continue extension in VS Code",
      "Open Continue settings (continue/config.json)",
      "Add shodh-memory to the MCP servers section",
      "Reload VS Code",
    ],
    configTitle: "~/.continue/config.json",
    config: `{
  "mcpServers": [
    {
      "name": "shodh-memory",
      "command": "npx",
      "args": ["-y", "shodh-memory"]
    }
  ]
}`,
    note: null,
  },
  {
    id: "docker",
    label: "[docker]",
    name: "Docker",
    description:
      "Run shodh-memory as a standalone server for self-hosted deployments, CI/CD pipelines, team-shared memory, or multi-agent architectures.",
    steps: [
      "Pull and run the Docker image",
      "Memory data persists in the shodh-data volume",
      "Access the REST API at http://localhost:3030",
      "Point any MCP client at the running server",
    ],
    configTitle: "terminal",
    config: `docker run -d -p 3030:3030 \\
  -v shodh-data:/data \\
  ghcr.io/varun29ankus/shodh-memory:latest`,
    note: "For CI/CD: mount a persistent volume so memory survives container restarts. Set SHODH_HOST=0.0.0.0 to accept connections from other containers on the same network.",
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-5xl">
          {/* Hero */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[integrations]</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                Integrations
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg max-w-3xl">
              Connect shodh-memory to your favorite AI coding tools.
              One config, persistent memory across every session.
            </p>
          </div>

          {/* Integration Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {INTEGRATIONS.map((integration) => (
              <div key={integration.id} id={integration.id} className="shadow-window scroll-mt-24">
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                    {integration.id}.config
                  </span>
                </div>
                <div className="terminal-body">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[var(--term-cyan)] font-mono text-sm">
                      {integration.label}
                    </span>
                    <h2 className="text-lg font-medium text-[var(--term-text)]">
                      {integration.name}
                    </h2>
                  </div>

                  <p className="text-[var(--term-text-dim)] text-sm mb-4">
                    {integration.description}
                  </p>

                  {/* Setup Steps */}
                  <div className="mb-4">
                    <span className="text-[var(--term-orange)] text-xs font-mono mb-2 block">
                      # setup
                    </span>
                    <ol className="space-y-1">
                      {integration.steps.map((step, i) => (
                        <li key={i} className="text-sm text-[var(--term-text-dim)] flex items-start gap-2">
                          <span className="text-[var(--term-green)] font-mono shrink-0">
                            {String(i + 1).padStart(2, "0")}.
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  {/* Config Block */}
                  <CodeBlock title={integration.configTitle}>
                    {integration.config}
                  </CodeBlock>

                  {/* Note */}
                  {integration.note && (
                    <div className="mt-3 text-xs text-[var(--term-text-dim)] border-l-2 border-[var(--term-orange)] pl-3">
                      {integration.note}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MCP Protocol Section */}
          <div className="shadow-window mb-16">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">compatibility.md</span>
            </div>
            <div className="terminal-body">
              <h2 className="text-xl font-semibold text-[var(--term-text)] mb-3">
                Works with any MCP client
              </h2>
              <p className="text-[var(--term-text-dim)] text-sm leading-relaxed mb-4">
                shodh-memory implements the{" "}
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--term-orange)] hover:underline"
                >
                  Model Context Protocol
                </a>{" "}
                (MCP) standard. Any MCP-compatible client can connect to shodh-memory
                out of the box — no custom adapters, no vendor lock-in.
              </p>
              <pre className="text-sm text-[var(--term-text)] whitespace-pre-wrap">{`# The universal pattern — works with any MCP client:
#
#   command:  npx
#   args:     ["-y", "shodh-memory"]
#
# That's it. 45 tools. Zero configuration.
# Memory that learns with use, runs locally, never phones home.`}</pre>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-[var(--term-text-dim)] mb-4">
              Pick your tool, paste the config, and start building with memory.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="/docs"
                className="shadow-btn shadow-btn-primary px-6 py-2"
              >
                Get Started
              </a>
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

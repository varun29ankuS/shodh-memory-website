"use client";

import { useState } from "react";

type InstallMethod = "mcp" | "rust" | "python";

const INSTALL_COMMANDS: Record<InstallMethod, { label: string; commands: { cmd: string; comment?: string }[] }> = {
  mcp: {
    label: "MCP Server",
    commands: [
      { cmd: "npx -y @shodh/memory-mcp", comment: "# Run with npx (recommended)" },
      { cmd: "", comment: "" },
      { cmd: "# Or add to Claude Code:" },
      { cmd: "claude mcp add shodh-memory npx -y @shodh/memory-mcp" },
    ],
  },
  rust: {
    label: "Rust Crate",
    commands: [
      { cmd: "cargo add shodh-memory", comment: "# Add to your project" },
      { cmd: "", comment: "" },
      { cmd: "# In your code:" },
      { cmd: "use shodh_memory::Memory;" },
      { cmd: "let mem = Memory::new(\"./data\")?;" },
      { cmd: "mem.remember(\"User prefers dark mode\", &[\"preference\"])?;" },
    ],
  },
  python: {
    label: "Python",
    commands: [
      { cmd: "pip install shodh-memory", comment: "# Install from PyPI" },
      { cmd: "", comment: "" },
      { cmd: "# In your code:" },
      { cmd: "from shodh_memory import Memory" },
      { cmd: "mem = Memory(\"./data\")" },
      { cmd: "mem.remember(\"User prefers dark mode\", tags=[\"preference\"])" },
    ],
  },
};

export function Installation() {
  const [method, setMethod] = useState<InstallMethod>("mcp");

  return (
    <section id="install" className="py-16 px-4 border-t border-[var(--term-border)] bg-[var(--term-bg-secondary)]">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          prefix="04"
          title="Installation"
          subtitle="Get started in seconds"
        />

        {/* Tab buttons */}
        <div className="flex gap-2 mb-6">
          {(Object.keys(INSTALL_COMMANDS) as InstallMethod[]).map((key) => (
            <button
              key={key}
              onClick={() => setMethod(key)}
              className={
                "px-4 py-2 text-sm border transition-all " +
                (method === key
                  ? "border-[var(--term-orange)] text-[var(--term-orange)] bg-[var(--term-orange)]/10"
                  : "border-[var(--term-border)] text-[var(--term-text-dim)] hover:border-[var(--term-text-dim)]")
              }
            >
              {INSTALL_COMMANDS[key].label}
            </button>
          ))}
        </div>

        {/* Terminal window */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-2 text-[var(--term-text-dim)] text-sm">terminal</span>
            <CopyButton commands={INSTALL_COMMANDS[method].commands} />
          </div>
          <div className="terminal-body font-mono text-sm">
            {INSTALL_COMMANDS[method].commands.map((line, i) => (
              <div key={i} className="leading-relaxed">
                {line.comment && !line.cmd ? (
                  <span className="text-[var(--term-text-dim)]">{line.comment}</span>
                ) : line.cmd.startsWith("#") ? (
                  <span className="text-[var(--term-text-dim)]">{line.cmd}</span>
                ) : line.cmd ? (
                  <>
                    <span className="text-[var(--term-green)]">$</span>{" "}
                    <span className="text-[var(--term-text)]">{line.cmd}</span>
                    {line.comment && (
                      <span className="text-[var(--term-text-dim)]"> {line.comment}</span>
                    )}
                  </>
                ) : (
                  <br />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a
            href="https://www.npmjs.com/package/@shodh/memory-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
          >
            npm package →
          </a>
          <a
            href="https://crates.io/crates/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
          >
            crates.io →
          </a>
          <a
            href="https://pypi.org/project/shodh-memory/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
          >
            PyPI →
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

function CopyButton({ commands }: { commands: { cmd: string; comment?: string }[] }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const text = commands
      .filter((l) => l.cmd && !l.cmd.startsWith("#"))
      .map((l) => l.cmd)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto text-[var(--term-text-dim)] hover:text-[var(--term-orange)] text-xs px-2 py-1 border border-[var(--term-border)] rounded hover:border-[var(--term-orange)] transition-all"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

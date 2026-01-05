"use client";

import { InteractiveTerminal } from "./InteractiveTerminal";

export function Demo() {
  return (
    <section id="demo" className="py-16 px-4 border-t border-[var(--term-border)] bg-[var(--term-bg-secondary)]">
      <div className="mx-auto max-w-4xl">
        <SectionHeader
          prefix="05"
          title="Try It"
          subtitle="Type commands to interact with a simulated memory system"
        />

        <InteractiveTerminal />

        {/* Call to action */}
        <div className="mt-12 text-center">
          <p className="text-[var(--term-text-dim)] mb-4">
            Ready to add memory to your AI agents?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#install"
              className="btn-terminal btn-terminal-primary px-6 py-2"
            >
              Get Started
            </a>
            <a
              href="https://github.com/varun29ankuS/shodh-memory"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal px-6 py-2"
            >
              Read the Docs
            </a>
          </div>
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

import Image from "next/image";

const ELEPHANT = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀",
  "⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀",
  "⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠈⠯⢹⣿⠀⠀⠀⠀",
  "⠀⠀⠀⣿⣿⣿⠟⠋⠉⠙⣿⣿⠀⠀⠀⠻⠷⠖⠀⠀",
  "⠀⠀⠐⠛⠛⠛⠀⠀⠀⠀⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀",
];

export function Hero() {
  return (
    <section className="pt-28 pb-20 px-6 md:pt-40 md:pb-28">
      <div className="mx-auto max-w-6xl">
        {/* Brand mark */}
        <div className="flex items-center gap-4 mb-10 animate-fade-in">
          <div className="hidden md:block">
            <pre className="text-[var(--term-orange)] text-[9px] leading-tight" aria-hidden="true">
              {ELEPHANT.join("\n")}
            </pre>
          </div>
          <div className="md:hidden">
            <Image
              src="/logo.png"
              alt="Shodh Logo"
              width={56}
              height={56}
              className="opacity-90"
              priority
            />
          </div>
          <div className="font-mono text-[var(--term-text-dim)] text-sm tracking-[0.3em]">
            SHODH · MEMORY
          </div>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-[var(--term-text)] mb-8 max-w-4xl animate-fade-in animate-delay-1">
          Persistent memory for AI agents.{" "}
          <span className="text-[var(--term-orange)]">Zero LLM calls.</span>
        </h1>

        {/* Description — server-rendered, visible immediately */}
        <p className="text-[var(--term-text-dim)] text-base md:text-lg max-w-2xl mb-14 leading-relaxed animate-fade-in animate-delay-2">
          Other memory systems call an LLM to store, summarize, and manage memories —
          slow, expensive, non-deterministic. shodh-memory learns with Hebbian rules
          and decay curves instead: memories strengthen with use, fade naturally, and
          wire together. Microseconds, offline, free.
        </p>

        {/* Stats — server-rendered, visible immediately */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14 animate-fade-in animate-delay-3">
          <StatBox label="In the memory loop — ever" value="0 LLM Calls" />
          <StatBox label="Your data never leaves your machine" value="100% Private" />
          <StatBox label="No Docker, no dependencies" value="30MB Binary" />
          <StatBox label="Battle-tested" value="1089 Tests" href="https://github.com/varun29ankuS/shodh-memory/actions" />
        </div>

        {/* CTA Buttons — server-rendered, visible immediately */}
        <div className="flex flex-wrap gap-5 mb-12 animate-fade-in animate-delay-4">
          <a
            href="#install"
            className="shadow-btn shadow-btn-primary px-6 py-2 text-sm font-medium"
          >
            $ npm install
          </a>
          <a
            href="https://github.com/varun29ankuS/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-btn px-6 py-2 text-sm"
          >
            GitHub →
          </a>
          <a
            href="#demo"
            className="shadow-btn px-6 py-2 text-sm"
          >
            Try Demo
          </a>
          <a
            href="/shodh_memory.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-btn px-6 py-2 text-sm font-medium"
          >
            Read the Paper
          </a>
        </div>

        {/* Trust line */}
        <div className="font-mono text-xs text-[var(--term-text-dim)] flex flex-wrap items-center gap-x-3 gap-y-1 animate-fade-in animate-delay-5">
          <span>Apache 2.0</span>
          <span aria-hidden="true">·</span>
          <a
            href="https://doi.org/10.5281/zenodo.18668709"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--term-orange)]"
          >
            Published research
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://crates.io/crates/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--term-orange)]"
          >
            crates.io
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://www.npmjs.com/package/@shodh/memory-mcp"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--term-orange)]"
          >
            npm
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://pypi.org/project/shodh-memory/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--term-orange)]"
          >
            PyPI
          </a>
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="font-mono text-[var(--term-orange)] text-xl md:text-2xl font-semibold">
        {value}
      </div>
      <div className="text-[var(--term-text-dim)] text-sm">
        {label}
      </div>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="shadow-card p-4 block"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="shadow-card p-4">
      {content}
    </div>
  );
}

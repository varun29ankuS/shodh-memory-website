import Image from "next/image";
import { GlitchText } from "./GlitchText";

const ELEPHANT = [
  "⠀⠀⠀⠀⠀⠀⠀⠀⣠⣤⣤⣤⣤⣄⠀⠀⠀⠀⠀⠀",
  "⠀⠀⠀⠀⢀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀",
  "⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀⠀",
  "⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⠈⠯⢹⣿⠀⠀⠀⠀",
  "⠀⠀⠀⣿⣿⣿⠟⠋⠉⠙⣿⣿⠀⠀⠀⠻⠷⠖⠀⠀",
  "⠀⠀⠐⠛⠛⠛⠀⠀⠀⠀⠛⠛⠃⠀⠀⠀⠀⠀⠀⠀",
];

const SHODH_TEXT = [
  "███████╗██╗  ██╗ ██████╗ ██████╗ ██╗  ██╗",
  "██╔════╝██║  ██║██╔═══██╗██╔══██╗██║  ██║",
  "███████╗███████║██║   ██║██║  ██║███████║",
  "╚════██║██╔══██║██║   ██║██║  ██║██╔══██║",
  "███████║██║  ██║╚██████╔╝██████╔╝██║  ██║",
  "╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═╝",
];

export function Hero() {
  return (
    <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Logo + ASCII Art — renders immediately on server */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
          {/* Elephant braille art */}
          <div className="hidden md:block">
            <pre className="text-[var(--term-orange)] text-sm leading-tight">
              {ELEPHANT.join("\n")}
            </pre>
          </div>

          {/* Logo image on mobile */}
          <div className="md:hidden">
            <Image
              src="/logo.png"
              alt="Shodh Logo"
              width={80}
              height={80}
              className="opacity-90"
              priority
            />
          </div>

          {/* SHODH text */}
          <div>
            <pre className="text-[var(--term-orange)] text-[8px] sm:text-[10px] md:text-xs leading-tight font-bold">
              {SHODH_TEXT.join("\n")}
            </pre>
            <div className="text-[var(--term-text-dim)] text-xs tracking-[0.3em] mt-2 text-center md:text-left">
              M E M O R Y
            </div>
          </div>
        </div>

        {/* Tagline */}
        <h1 className="text-xl md:text-2xl text-[var(--term-text)] mb-4 mt-[25mm]">
          Persistent memory for AI agents that actually learns.
        </h1>

        {/* Description — server-rendered, visible immediately */}
        <p className="text-[var(--term-text-dim)] text-base md:text-lg max-w-2xl mb-12 leading-relaxed">
          Memories that strengthen with use, decay naturally,
          and wire together — like a real brain.
          <br />
          <br />
          <span className="text-[var(--term-orange)] font-bold">Runs locally</span>.{" "}
          <span className="text-[var(--term-orange)] font-bold">Single binary</span>.{" "}
          <span className="text-[var(--term-orange)] font-bold">No cloud required</span>.
        </p>

        {/* Stats — server-rendered, visible immediately */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatBox label="Your data never leaves your machine" value="100% Private" />
          <StatBox label="ChatGPT, Claude, Cursor & more" value="Any AI Agent" />
          <StatBox label="No Docker, no dependencies" value="30MB Binary" />
          <StatBox label="Battle-tested" value="1089 Tests" href="https://github.com/varun29ankuS/shodh-memory/actions" />
        </div>

        {/* CTA Buttons — server-rendered, visible immediately */}
        <div className="flex flex-wrap gap-5">
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
            className="shadow-btn px-6 py-2 text-sm flex items-center gap-2"
          >
            <span>GitHub</span>
            <img
              src="https://img.shields.io/github/stars/varun29ankuS/shodh-memory?style=flat&color=f0883e&labelColor=161b22"
              alt="GitHub stars"
              className="h-5"
            />
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
            className="shadow-btn px-6 py-2 text-sm font-medium flex items-center gap-2"
          >
            <span>&#128196;</span> Read the Paper
          </a>
        </div>
      </div>
    </section>
  );
}

function StatBox({ label, value, href }: { label: string; value: string; href?: string }) {
  const content = (
    <>
      <div className="text-[var(--term-orange)] text-xl md:text-2xl font-semibold">
        <GlitchText intensity="medium">{value}</GlitchText>
      </div>
      <div className="text-[var(--term-text-dim)] text-sm">
        <GlitchText intensity="subtle">{label}</GlitchText>
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

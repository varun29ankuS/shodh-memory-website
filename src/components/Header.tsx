"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VERSION } from "@/lib/version";
import { GlitchText } from "./GlitchText";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--term-border)] bg-[var(--term-bg)]/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:no-underline">
          <Image src="/logo.png" alt="Shodh" width={32} height={32} className="opacity-90" priority />
          <span className="text-[var(--term-text)] font-semibold">shodh-memory</span>
          <span className="text-[var(--term-text-dim)] text-sm hidden sm:inline">v{VERSION}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/use-cases">Edge & Robotics</NavLink>
          <NavLink href="/research">Research</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/enterprise">Enterprise</NavLink>
          <NavLink href="/docs">Docs</NavLink>

          <Link
            href="/contact"
            className="shadow-btn flex items-center gap-2 px-3 py-1.5 text-sm border-[var(--term-orange)] text-[var(--term-orange)] hover:bg-[var(--term-orange)] hover:text-[var(--term-bg)] transition-colors"
          >
            Contact
          </Link>
          <a
            href="https://discord.gg/HrpzXqTtEp"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-btn flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            <DiscordIcon />
            <span>Discord</span>
          </a>
          <a
            href="https://github.com/varun29ankuS/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-btn flex items-center gap-2 px-3 py-1.5 text-sm"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[var(--term-text-dim)] hover:text-[var(--term-text)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "×" : "≡"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--term-border)] bg-[var(--term-bg)] px-4 py-4 space-y-4">
          <NavLink href="/use-cases" onClick={() => setMenuOpen(false)}>Edge & Robotics</NavLink>
          <NavLink href="/research" onClick={() => setMenuOpen(false)}>Research</NavLink>
          <NavLink href="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink href="/enterprise" onClick={() => setMenuOpen(false)}>Enterprise</NavLink>
          <NavLink href="/docs" onClick={() => setMenuOpen(false)}>Docs</NavLink>
          <NavLink href="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          <a
            href="https://discord.gg/HrpzXqTtEp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
            onClick={() => setMenuOpen(false)}
          >
            <DiscordIcon />
            <span>Discord</span>
          </a>
          <a
            href="https://github.com/varun29ankuS/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
            onClick={() => setMenuOpen(false)}
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-[var(--term-text-dim)] hover:text-[var(--term-orange)] transition-colors"
    >
      <GlitchText intensity="subtle">{children}</GlitchText>
    </Link>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.046.046 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.028-.07 8.735 8.735 0 01-1.248-.595.05.05 0 01-.005-.083c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007c.08.066.164.132.248.195a.05.05 0 01-.004.083c-.399.233-.813.441-1.249.595a.05.05 0 00-.027.07c.24.466.514.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019zM5.347 10.215c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

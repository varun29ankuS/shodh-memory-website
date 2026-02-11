"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { VERSION } from "@/lib/version";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--term-border)] bg-[var(--term-bg)]/95 backdrop-blur-sm">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:no-underline">
          <Image src="/logo.png" alt="Shodh" width={24} height={24} className="opacity-90" />
          <span className="text-[var(--term-text)] font-semibold">shodh-memory</span>
          <span className="text-[var(--term-text-dim)] text-sm hidden sm:inline">v{VERSION}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink href="/#features">Features</NavLink>
          <NavLink href="/use-cases">Edge & Robotics</NavLink>
          <NavLink href="/enterprise">Enterprise</NavLink>
          <NavLink href="/research">Research</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/#install">Install</NavLink>
          
          
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
          <NavLink href="/#features" onClick={() => setMenuOpen(false)}>Features</NavLink>
          <NavLink href="/#install" onClick={() => setMenuOpen(false)}>Install</NavLink>
          <NavLink href="/use-cases" onClick={() => setMenuOpen(false)}>Edge & Robotics</NavLink>
          <NavLink href="/enterprise" onClick={() => setMenuOpen(false)}>Enterprise</NavLink>
          <NavLink href="/research" onClick={() => setMenuOpen(false)}>Research</NavLink>
          <NavLink href="/docs" onClick={() => setMenuOpen(false)}>Docs</NavLink>
          <NavLink href="/blog" onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <a
            href="https://github.com/varun29ankuS/shodh-memory"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
          >
            <GithubIcon />
            <span>GitHub</span>
          </a>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-[var(--term-text-dim)] hover:text-[var(--term-orange)] transition-colors"
    >
      {children}
    </Link>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

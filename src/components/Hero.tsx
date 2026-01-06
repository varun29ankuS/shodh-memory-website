"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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

const TAGLINES = [
  "Memory that learns with use",
  "Hebbian learning for AI agents",
  "Runs offline on edge devices",
  "Neuroscience-grounded architecture",
  "<1μs graph lookup latency",
];

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentTagline = TAGLINES[taglineIndex];
    
    if (isTyping) {
      if (displayedText.length < currentTagline.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentTagline.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayedText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setIsTyping(true);
      }
    }
  }, [displayedText, isTyping, taglineIndex]);

  return (
    <section className="pt-24 pb-16 px-4 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-4xl">
        {/* Logo + ASCII Art */}
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8 animate-fade-in">
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

        {/* Typing tagline */}
        <div className="h-8 mb-8 animate-fade-in animate-delay-1">
          <span className="text-xl md:text-2xl text-[var(--term-text-dim)]">
            {">"} {displayedText}
            <span className="cursor-blink text-[var(--term-orange)]">▌</span>
          </span>
        </div>

        {/* Description */}
        <p className="text-[var(--term-text-dim)] text-base md:text-lg max-w-2xl mb-8 animate-fade-in animate-delay-2">
          A persistent cognitive memory system for AI agents. Three-tier architecture 
          based on Cowan&apos;s working memory model. Connections that are used together 
          become stronger—just like biological neurons.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 animate-fade-in animate-delay-3">
          <StatBox label="Graph Lookup" value="<1μs" href="https://github.com/varun29ankuS/shodh-memory#performance" />
          <StatBox label="Semantic Search" value="34-58ms" href="https://github.com/varun29ankuS/shodh-memory#benchmarks" />
          <StatBox label="Binary Size" value="~15MB" href="https://github.com/varun29ankuS/shodh-memory/releases" />
          <StatBox label="Tests Passing" value="688" href="https://github.com/varun29ankuS/shodh-memory/actions" />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-5 animate-fade-in animate-delay-4">
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
            View on GitHub
          </a>
          <a
            href="#demo"
            className="shadow-btn px-6 py-2 text-sm"
          >
            Try Demo
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
        {value}
      </div>
      <div className="text-[var(--term-text-dim)] text-sm">{label}</div>
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

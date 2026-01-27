"use client";

import { useState, useEffect } from "react";
import { VERSION } from "@/lib/version";

const BOOT_LINES = [
  { text: `SHODH-MEMORY BIOS v${VERSION}`, delay: 0 },
  { text: "Copyright (C) 2024-2025 Shodh Systems", delay: 100 },
  { text: "", delay: 200 },
  { text: "Detecting hardware...", delay: 300 },
  { text: "  CPU: Neural Processing Unit [OK]", delay: 500 },
  { text: "  MEM: 384-dim Embedding Space [OK]", delay: 700 },
  { text: "  GPU: Vamana Vector Index [OK]", delay: 900 },
  { text: "", delay: 1000 },
  { text: "Loading cognitive modules...", delay: 1100 },
  { text: "  [====                ] 20% Hebbian synapses", delay: 1300 },
  { text: "  [========            ] 40% Spreading activation", delay: 1500 },
  { text: "  [============        ] 60% Memory consolidation", delay: 1700 },
  { text: "  [================    ] 80% Knowledge graph", delay: 1900 },
  { text: "  [====================] 100% Complete", delay: 2100 },
  { text: "", delay: 2200 },
  { text: "Initializing memory system...", delay: 2300 },
  { text: "Ready.", delay: 2500 },
];

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Check if user has seen boot sequence before (this session)
    if (sessionStorage.getItem("bootSeen")) {
      onComplete();
      return;
    }

    // Show lines progressively
    BOOT_LINES.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(index + 1);
      }, line.delay);
    });

    // Start fade out after last line
    const fadeTimeout = setTimeout(() => {
      setFadeOut(true);
    }, 2800);

    // Complete and mark as seen
    const completeTimeout = setTimeout(() => {
      sessionStorage.setItem("bootSeen", "true");
      onComplete();
    }, 3300);

    return () => {
      clearTimeout(fadeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  // Skip if already seen
  if (typeof window !== "undefined" && sessionStorage.getItem("bootSeen")) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[var(--term-bg)] flex items-center justify-center transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-2xl px-6 font-mono text-sm">
        {BOOT_LINES.slice(0, visibleLines).map((line, index) => (
          <div
            key={index}
            className={`${
              line.text.includes("[OK]")
                ? "text-[var(--term-green)]"
                : line.text.includes("100%")
                ? "text-[var(--term-green)]"
                : line.text.includes("%")
                ? "text-[var(--term-orange)]"
                : line.text === "Ready."
                ? "text-[var(--term-green)] font-bold"
                : "text-[var(--term-text-dim)]"
            }`}
          >
            {line.text || "\u00A0"}
          </div>
        ))}
        {visibleLines > 0 && visibleLines < BOOT_LINES.length && (
          <span className="cursor-blink text-[var(--term-orange)]">▌</span>
        )}
      </div>
    </div>
  );
}

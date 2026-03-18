"use client";

import { useState, useEffect } from "react";
import { VERSION } from "@/lib/version";

const BOOT_LINES = [
  { text: `SHODH-MEMORY BIOS v${VERSION}`, style: "dim" },
  { text: "Copyright (C) 2024-2025 Shodh Systems", style: "dim" },
  { text: "\u00A0", style: "dim" },
  { text: "Detecting hardware...", style: "dim" },
  { text: "  CPU: Neural Processing Unit [OK]", style: "green" },
  { text: "  MEM: 384-dim Embedding Space [OK]", style: "green" },
  { text: "  GPU: Vamana Vector Index [OK]", style: "green" },
  { text: "\u00A0", style: "dim" },
  { text: "Loading cognitive modules...", style: "dim" },
  { text: "  [====                ] 20% Hebbian synapses", style: "orange" },
  { text: "  [========            ] 40% Spreading activation", style: "orange" },
  { text: "  [============        ] 60% Memory consolidation", style: "orange" },
  { text: "  [================    ] 80% Knowledge graph", style: "orange" },
  { text: "  [====================] 100% Complete", style: "green" },
  { text: "\u00A0", style: "dim" },
  { text: "Initializing memory system...", style: "dim" },
  { text: "Ready.", style: "ready" },
];

const STYLE_MAP: Record<string, string> = {
  dim: "text-[var(--term-text-dim)]",
  green: "text-[var(--term-green)]",
  orange: "text-[var(--term-orange)]",
  ready: "text-[var(--term-green)] font-bold",
};

const TOTAL_DURATION_MS = 3300;

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("bootSeen")) {
      onComplete();
      return;
    }

    // Single timeout instead of 13 — the CSS staggered animation handles the visual timing
    const timeout = setTimeout(() => {
      sessionStorage.setItem("bootSeen", "true");
      setDone(true);
      onComplete();
    }, TOTAL_DURATION_MS);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  if (typeof window !== "undefined" && sessionStorage.getItem("bootSeen")) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[var(--term-bg)] flex items-center justify-center transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-2xl px-6 font-mono text-sm">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className={STYLE_MAP[line.style]}
            style={{
              opacity: 0,
              animation: `boot-line-in 0.05s ease-out ${i * 160}ms forwards`,
            }}
          >
            {line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

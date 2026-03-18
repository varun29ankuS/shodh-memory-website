"use client";

import { useState, useCallback, useRef } from "react";

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

interface GlitchTextProps {
  children: string;
  className?: string;
  as?: "span" | "div";
  intensity?: "subtle" | "medium" | "heavy";
}

export function GlitchText({
  children,
  className = "",
  as: Tag = "span",
  intensity = "subtle",
}: GlitchTextProps) {
  const [display, setDisplay] = useState(children);
  const rafRef = useRef<number | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const config = {
    subtle: { iterations: 3, intervalMs: 40, charRatio: 0.3 },
    medium: { iterations: 5, intervalMs: 35, charRatio: 0.5 },
    heavy: { iterations: 8, intervalMs: 30, charRatio: 0.7 },
  }[intensity];

  const scramble = useCallback(
    (original: string, ratio: number) => {
      return original
        .split("")
        .map((ch) => {
          if (ch === " ") return " ";
          return Math.random() < ratio
            ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
            : ch;
        })
        .join("");
    },
    []
  );

  const handleMouseEnter = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    let iteration = 0;

    const step = () => {
      if (iteration >= config.iterations) {
        setDisplay(children);
        return;
      }

      const progress = iteration / config.iterations;
      const ratio = config.charRatio * (1 - progress);
      setDisplay(scramble(children, ratio));
      iteration++;

      timeoutRef.current = setTimeout(() => {
        rafRef.current = requestAnimationFrame(step);
      }, config.intervalMs);
    };

    step();
  }, [children, config, scramble]);

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplay(children);
  }, [children]);

  return (
    <Tag
      className={`glitch-hover ${className}`}
      data-text={children}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {display}
    </Tag>
  );
}

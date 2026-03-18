"use client";

import { useEffect, useState } from "react";

const TAGLINES = [
  "Memory that learns with use",
  "A brain for your AI agent",
  "Past and future inform present",
  "Runs offline on edge devices",
  "<1μs graph lookup latency",
];

export function TypingTagline() {
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
    <span className="text-xl md:text-2xl text-[var(--term-text-dim)]">
      {">"} {displayedText}
      <span className="cursor-blink text-[var(--term-orange)]">▌</span>
    </span>
  );
}

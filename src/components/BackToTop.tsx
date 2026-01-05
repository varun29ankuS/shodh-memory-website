"use client";

import { useState, useEffect } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 px-3 py-2 bg-[var(--term-bg)] border border-[var(--term-border)] rounded font-mono text-sm text-[var(--term-text-dim)] hover:border-[var(--term-orange)] hover:text-[var(--term-orange)] transition-all shadow-lg hover:shadow-[0_0_15px_rgba(240,136,62,0.3)]"
      aria-label="Back to top"
    >
      <span className="text-[var(--term-orange)]">↑</span> TOP
    </button>
  );
}

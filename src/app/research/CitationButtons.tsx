"use client";

import { useState } from "react";

export function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 border border-[var(--term-border)] text-[var(--term-text-dim)] hover:text-[var(--term-orange)] hover:border-[var(--term-orange)] transition-colors rounded"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

export function DownloadBibButton({ content }: { content: string }) {
  const handleDownload = () => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shodh-memory-citations.bib";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="text-sm px-4 py-2 border border-[var(--term-orange)] text-[var(--term-orange)] hover:bg-[var(--term-orange)] hover:text-[var(--term-bg)] transition-colors rounded"
    >
      Download all citations (.bib)
    </button>
  );
}

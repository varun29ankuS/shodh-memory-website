"use client";

import { useState, useRef, useEffect } from "react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system";
  content: string;
}

const COMMANDS: Record<string, { output: string[]; delay?: number }> = {
  help: {
    output: [
      "Available commands:",
      "  remember <text>  - Store a memory",
      "  recall <query>   - Search memories semantically",
      "  stats            - Show memory statistics",
      "  forget <id>      - Remove a memory",
      "  clear            - Clear terminal",
      "  demo             - Run interactive demo",
      "",
      "Try: remember I love building with Rust",
    ],
  },
  stats: {
    output: [
      "Memory Statistics:",
      "  Total memories: 1,247",
      "  Active edges: 3,892",
      "  Avg retrieval: 42ms",
      "  Graph lookup: <1μs",
      "  Storage: 12.4 MB",
      "  Last consolidation: 2m ago",
    ],
    delay: 500,
  },
  demo: {
    output: [
      "Starting interactive demo...",
      "",
      '> remember The user prefers dark mode for all applications',
      '  Stored memory: d7f3a2b1',
      '  Extracted entities: ["user", "dark mode", "applications"]',
      '  Created 3 graph edges',
      "",
      '> remember User is building a robotics project with ROS2',
      '  Stored memory: e8c4d5a9',
      '  Extracted entities: ["user", "robotics", "ROS2"]',
      '  Strengthened edge: user -> robotics (0.7 -> 0.85)',
      "",
      "> recall what does the user like",
      "  Searching semantically...",
      '  Found 2 memories (relevance > 0.8):',
      '    1. "The user prefers dark mode..." (0.92)',
      '    2. "User is building a robotics..." (0.87)',
      "",
      "Demo complete. Try your own commands!",
    ],
    delay: 100,
  },
  clear: {
    output: [],
  },
};

export function InteractiveTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", content: "shodh-memory v0.1.6 - Cognitive Memory System" },
    { type: "system", content: 'Type "help" for available commands' },
    { type: "system", content: "" },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const processCommand = async (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const [command, ...args] = trimmed.split(" ");

    setHistory((prev) => [...prev, { type: "input", content: `> ${cmd}` }]);
    setIsProcessing(true);

    if (command === "clear") {
      setHistory([
        { type: "system", content: "shodh-memory v0.1.6 - Cognitive Memory System" },
        { type: "system", content: "" },
      ]);
      setIsProcessing(false);
      return;
    }

    if (command === "remember" && args.length > 0) {
      const text = args.join(" ");
      await delay(300);
      const id = Math.random().toString(16).slice(2, 10);
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `Storing memory...` },
      ]);
      await delay(400);
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `  Memory ID: ${id}` },
        { type: "output", content: `  Content: "${text}"` },
        { type: "output", content: `  Embedding: 384-dim vector computed` },
        { type: "output", content: `  Entities extracted: ${extractEntities(text)}` },
        { type: "output", content: `  Graph edges created: ${Math.floor(Math.random() * 4) + 2}` },
        { type: "output", content: "" },
      ]);
      setIsProcessing(false);
      return;
    }

    if (command === "recall" && args.length > 0) {
      const query = args.join(" ");
      await delay(200);
      setHistory((prev) => [
        ...prev,
        { type: "output", content: `Searching: "${query}"` },
        { type: "output", content: "  Vector similarity search..." },
      ]);
      await delay(350);
      setHistory((prev) => [
        ...prev,
        { type: "output", content: "  Graph traversal (spreading activation)..." },
      ]);
      await delay(300);
      setHistory((prev) => [
        ...prev,
        { type: "output", content: "  Ranking by relevance..." },
        { type: "output", content: "" },
        { type: "output", content: `  Results: 3 memories found (42ms)` },
        { type: "output", content: `    1. [0.94] Recent context about ${args[0] || "query"}` },
        { type: "output", content: `    2. [0.87] Related learning from earlier` },
        { type: "output", content: `    3. [0.72] Historical reference` },
        { type: "output", content: "" },
      ]);
      setIsProcessing(false);
      return;
    }

    if (command === "forget") {
      await delay(200);
      if (args.length === 0) {
        setHistory((prev) => [
          ...prev,
          { type: "error", content: "Usage: forget <memory-id>" },
          { type: "output", content: "" },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "output", content: `Removing memory: ${args[0]}` },
          { type: "output", content: `  Memory suppressed (decay accelerated)` },
          { type: "output", content: `  Graph edges weakened` },
          { type: "output", content: "" },
        ]);
      }
      setIsProcessing(false);
      return;
    }

    const commandData = COMMANDS[command];
    if (commandData) {
      for (const line of commandData.output) {
        await delay(commandData.delay || 30);
        setHistory((prev) => [...prev, { type: "output", content: line }]);
      }
    } else {
      await delay(100);
      setHistory((prev) => [
        ...prev,
        { type: "error", content: `Command not found: ${command}` },
        { type: "output", content: 'Type "help" for available commands' },
        { type: "output", content: "" },
      ]);
    }

    setIsProcessing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      processCommand(input);
      setInput("");
    }
  };

  return (
    <div className="shadow-window max-w-2xl mx-auto">
      <div className="terminal-header">
        <div className="terminal-dot terminal-dot-red" />
        <div className="terminal-dot terminal-dot-yellow" />
        <div className="terminal-dot terminal-dot-green" />
        <span className="ml-2 text-[var(--term-text-dim)] text-sm">
          shodh-memory --interactive
        </span>
      </div>
      <div
        ref={terminalRef}
        className="terminal-body h-80 overflow-y-auto font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((line, i) => (
          <div
            key={i}
            className={`${
              line.type === "input"
                ? "text-[var(--term-orange)]"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "system"
                ? "text-[var(--term-cyan)]"
                : "text-[var(--term-text-dim)]"
            } whitespace-pre-wrap`}
          >
            {line.content}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center mt-1">
          <span className="text-[var(--term-green)] mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isProcessing}
            className="flex-1 bg-transparent border-none outline-none text-[var(--term-text)] caret-[var(--term-orange)]"
            placeholder={isProcessing ? "Processing..." : "Type a command..."}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="cursor-blink text-[var(--term-orange)]">▌</span>
        </form>
      </div>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function extractEntities(text: string): string {
  const words = text.split(" ").filter((w) => w.length > 3);
  const entities = words.slice(0, 3).map((w) => `"${w}"`);
  return `[${entities.join(", ")}]`;
}

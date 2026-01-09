"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<string>("");
  const [isTypingEffect, setIsTypingEffect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedContent]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      typeMessage("> Welcome! I'm the shodh-memory demo. Ask me about cognitive memory for AI agents.");
    }
  }, [isOpen, messages.length]);

  // Cleanup typing effect on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  const typeMessage = useCallback((text: string) => {
    setIsTypingEffect(true);
    setDisplayedContent("");
    let index = 0;

    const type = () => {
      if (index < text.length) {
        setDisplayedContent(text.slice(0, index + 1));
        index++;
        // Faster for spaces and punctuation, slower for letters
        const delay = text[index - 1] === " " ? 10 : text[index - 1]?.match(/[.,!?]/) ? 50 : 20;
        typingRef.current = setTimeout(type, delay);
      } else {
        setIsTypingEffect(false);
        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
        setDisplayedContent("");
      }
    };

    type();
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || isTypingEffect) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          clientId: "shodh-demo",
          history: messages.slice(-6),
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setIsLoading(false);
      typeMessage(data.response);
    } catch {
      setIsLoading(false);
      typeMessage("> Error: Connection failed. Try again or contact us below.");
    }
  };

  return (
    <>
      {/* Floating Button - Terminal style */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[1001] group"
        aria-label="Open chat"
        style={{ transform: "translate(0, 0)" }}
      >
        <div className="relative">
          {/* Dotted shadow layers */}
          <div
            className="absolute top-1 left-1 w-14 h-14 border-2 border-dotted rounded-lg transition-all duration-150 group-hover:top-2 group-hover:left-2"
            style={{ borderColor: "var(--term-border)", opacity: 0.4 }}
          />
          <div
            className="absolute top-0.5 left-0.5 w-14 h-14 border-2 border-dotted rounded-lg transition-all duration-150 group-hover:top-1 group-hover:left-1"
            style={{ borderColor: "var(--term-border)" }}
          />
          {/* Main button */}
          <div
            className="relative w-14 h-14 rounded-lg flex items-center justify-center transition-all duration-150 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5"
            style={{
              background: isOpen ? "var(--term-bg-secondary)" : "var(--term-orange)",
              border: "1px solid",
              borderColor: isOpen ? "var(--term-orange)" : "var(--term-orange)"
            }}
          >
            {isOpen ? (
              <span style={{ color: "var(--term-orange)", fontSize: "24px", fontWeight: "bold" }}>×</span>
            ) : (
              <svg className="w-6 h-6" fill="var(--term-bg)" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
            )}
          </div>
        </div>
      </button>

      {/* Chat Box - Terminal window style */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 w-[380px] z-[1001] animate-fade-in"
          style={{ maxHeight: "calc(100vh - 140px)" }}
        >
          {/* Dotted shadow layers */}
          <div
            className="absolute top-2 left-2 right-[-8px] bottom-[-8px] border-2 border-dotted rounded-md"
            style={{ borderColor: "var(--term-border)", opacity: 0.4, borderTop: "none", borderLeft: "none" }}
          />
          <div
            className="absolute top-1 left-1 right-[-4px] bottom-[-4px] border-2 border-dotted rounded-md"
            style={{ borderColor: "var(--term-border)", borderTop: "none", borderLeft: "none" }}
          />

          {/* Main window */}
          <div
            className="relative rounded-md overflow-hidden flex flex-col"
            style={{
              background: "var(--term-bg-secondary)",
              border: "1px solid var(--term-border)",
              height: "520px"
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-2"
              style={{ background: "var(--term-bg)", borderBottom: "1px solid var(--term-border)" }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--term-red)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--term-yellow)" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "var(--term-green)" }} />
              <span
                className="ml-2 text-xs font-mono"
                style={{ color: "var(--term-text-dim)" }}
              >
                shodh-chat --demo
              </span>
            </div>

            {/* Messages area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm"
              style={{ background: "var(--term-bg-secondary)" }}
            >
              {messages.map((msg, i) => (
                <div key={i} className={`${msg.role === "user" ? "text-right" : ""}`}>
                  {msg.role === "assistant" ? (
                    <div className="flex items-start gap-2">
                      <span style={{ color: "var(--term-green)" }}>$</span>
                      <span style={{ color: "var(--term-text)" }}>{msg.content}</span>
                    </div>
                  ) : (
                    <div
                      className="inline-block px-3 py-2 rounded"
                      style={{
                        background: "var(--term-orange)",
                        color: "var(--term-bg)",
                        maxWidth: "85%"
                      }}
                    >
                      {msg.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Currently typing message */}
              {isTypingEffect && displayedContent && (
                <div className="flex items-start gap-2">
                  <span style={{ color: "var(--term-green)" }}>$</span>
                  <span style={{ color: "var(--term-text)" }}>
                    {displayedContent}
                    <span className="cursor-blink" style={{ color: "var(--term-orange)" }}>_</span>
                  </span>
                </div>
              )}

              {/* Loading state */}
              {isLoading && !isTypingEffect && (
                <div className="flex items-center gap-2">
                  <span style={{ color: "var(--term-green)" }}>$</span>
                  <span style={{ color: "var(--term-text-dim)" }} className="cursor-blink">_</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div
              className="p-3 flex gap-2"
              style={{ borderTop: "1px solid var(--term-border)", background: "var(--term-bg)" }}
            >
              <div className="flex-1 flex items-center gap-2">
                <span style={{ color: "var(--term-orange)" }}>&gt;</span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                  placeholder="type your query..."
                  disabled={isLoading || isTypingEffect}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm disabled:opacity-50"
                  style={{ color: "var(--term-text)" }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={isLoading || isTypingEffect || !input.trim()}
                className="px-3 py-1 rounded text-xs font-mono transition-all duration-150 disabled:opacity-50"
                style={{
                  background: "var(--term-orange)",
                  color: "var(--term-bg)",
                  border: "none"
                }}
              >
                SEND
              </button>
            </div>

            {/* Contact section */}
            <div
              className="px-4 py-3"
              style={{
                borderTop: "1px solid var(--term-border)",
                background: "var(--term-bg)"
              }}
            >
              <div className="text-xs font-mono" style={{ color: "var(--term-text-dim)" }}>
                Need enterprise support or custom integration?
              </div>
              <a
                href="mailto:enterprise@shodh-memory.com?subject=Enterprise%20Inquiry%20-%20shodh-memory"
                className="flex items-center gap-2 mt-2 px-3 py-2 rounded text-xs font-mono transition-all duration-150 hover:opacity-90"
                style={{
                  background: "var(--term-bg-secondary)",
                  border: "1px solid var(--term-border)",
                  color: "var(--term-cyan)",
                  textDecoration: "none"
                }}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                enterprise@shodh-memory.com
              </a>
            </div>

            {/* Footer */}
            <div
              className="text-center py-1.5 text-xs font-mono"
              style={{
                color: "var(--term-text-dim)",
                borderTop: "1px solid var(--term-border)",
                background: "var(--term-bg)"
              }}
            >
              powered by <span style={{ color: "var(--term-orange)" }}>shodh-memory</span> + groq
            </div>
          </div>
        </div>
      )}
    </>
  );
}

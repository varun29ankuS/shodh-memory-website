"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LeadInfo {
  name: string;
  email: string;
  company?: string;
}

type WidgetState = "closed" | "form" | "chat";

export function ChatWidget() {
  const [state, setState] = useState<WidgetState>("closed");
  const [leadInfo, setLeadInfo] = useState<LeadInfo>({ name: "", email: "" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [displayedContent, setDisplayedContent] = useState<string>("");
  const [isTypingEffect, setIsTypingEffect] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedContent]);

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
        const delay = text[index - 1] === " " ? 8 : text[index - 1]?.match(/[.,!?]/) ? 40 : 15;
        typingRef.current = setTimeout(type, delay);
      } else {
        setIsTypingEffect(false);
        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
        setDisplayedContent("");
      }
    };
    type();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadInfo.name.trim() || !leadInfo.email.trim()) return;

    // Send lead info to backend (which forwards to Telegram)
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `[NEW LEAD]\nName: ${leadInfo.name}\nEmail: ${leadInfo.email}${leadInfo.company ? `\nCompany: ${leadInfo.company}` : ""}`,
          clientId: "shodh-demo",
          history: [],
          isLead: true,
        }),
      });
    } catch {
      // Continue anyway
    }

    setState("chat");
    setTimeout(() => {
      typeMessage(`Hi ${leadInfo.name.split(" ")[0]}! I'm the shodh-memory assistant. Ask me anything about cognitive memory for AI agents, pricing, or enterprise integration.`);
    }, 300);
  };

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
          leadInfo,
        }),
      });

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      setIsLoading(false);
      typeMessage(data.response);
    } catch {
      setIsLoading(false);
      typeMessage("Sorry, I couldn't process that. Please try again or email us at enterprise@shodh-memory.com");
    }
  };

  const toggleWidget = () => {
    if (state === "closed") {
      setState("form");
    } else {
      setState("closed");
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-[1001] group"
        aria-label={state === "closed" ? "Open chat" : "Close chat"}
      >
        <div
          className={`flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 ${
            state === "closed" ? "rounded-full px-4 py-3 gap-2" : "w-14 h-14 rounded-full"
          }`}
          style={{
            background: state === "closed"
              ? "linear-gradient(135deg, var(--term-orange) 0%, #e07730 100%)"
              : "var(--term-bg-secondary)",
            border: state !== "closed" ? "1px solid var(--term-border)" : "none",
          }}
        >
          {state === "closed" ? (
            <>
              <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
              </svg>
              <span className="text-white font-medium text-sm whitespace-nowrap">talk to us!</span>
            </>
          ) : (
            <svg className="w-5 h-5" fill="var(--term-text)" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          )}
        </div>
      </button>

      {/* Widget Panel */}
      {state !== "closed" && (
        <div
          className="fixed bottom-24 right-6 w-[400px] z-[1001] transition-all duration-300"
          style={{
            animation: "slideUp 0.3s ease-out",
          }}
        >
          <style jsx>{`
            @keyframes slideUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>

          <div
            className="rounded-2xl overflow-hidden flex flex-col shadow-2xl"
            style={{
              background: "var(--term-bg)",
              border: "1px solid var(--term-border)",
              height: state === "form" ? "auto" : "560px",
            }}
          >
            {/* Header */}
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{
                background: "linear-gradient(135deg, var(--term-orange) 0%, #e07730 100%)",
              }}
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="white" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-white font-semibold text-sm">shodh-memory</div>
                <div className="text-white/70 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online
                </div>
              </div>
            </div>

            {/* Pre-chat Form */}
            {state === "form" && (
              <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
                <div className="text-center mb-4">
                  <h3 className="font-semibold mb-1" style={{ color: "var(--term-text)" }}>
                    Start a conversation
                  </h3>
                  <p className="text-xs" style={{ color: "var(--term-text-dim)" }}>
                    We typically reply within minutes
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--term-text-dim)" }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px solid var(--term-border)",
                      color: "var(--term-text)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--term-text-dim)" }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px solid var(--term-border)",
                      color: "var(--term-text)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--term-text-dim)" }}>
                    Company <span style={{ color: "var(--term-text-dim)" }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={leadInfo.company || ""}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                    placeholder="Your company"
                    className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-all"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px solid var(--term-border)",
                      color: "var(--term-text)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium text-sm transition-all hover:opacity-90"
                  style={{
                    background: "var(--term-orange)",
                    color: "var(--term-bg)",
                  }}
                >
                  Start Chat
                </button>

                <p className="text-center text-xs" style={{ color: "var(--term-text-dim)" }}>
                  By chatting, you agree to our{" "}
                  <a href="/privacy" className="underline" style={{ color: "var(--term-cyan)" }}>
                    privacy policy
                  </a>
                </p>
              </form>
            )}

            {/* Chat View */}
            {state === "chat" && (
              <>
                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-4 space-y-4"
                  style={{ background: "var(--term-bg-secondary)" }}
                >
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                          style={{ background: "var(--term-orange)" }}
                        >
                          <svg className="w-4 h-4" fill="var(--term-bg)" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          </svg>
                        </div>
                      )}
                      <div
                        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: msg.role === "user" ? "var(--term-orange)" : "var(--term-bg)",
                          color: msg.role === "user" ? "white" : "var(--term-text)",
                          borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                          borderBottomLeftRadius: msg.role === "assistant" ? "4px" : "16px",
                        }}
                      >
                        {msg.content}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  {isTypingEffect && displayedContent && (
                    <div className="flex justify-start">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                        style={{ background: "var(--term-orange)" }}
                      >
                        <svg className="w-4 h-4" fill="var(--term-bg)" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div
                        className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: "var(--term-bg)",
                          color: "var(--term-text)",
                          borderBottomLeftRadius: "4px",
                        }}
                      >
                        {displayedContent}
                        <span className="inline-block w-0.5 h-4 ml-0.5 animate-pulse" style={{ background: "var(--term-orange)" }}></span>
                      </div>
                    </div>
                  )}

                  {/* Loading dots */}
                  {isLoading && !isTypingEffect && (
                    <div className="flex justify-start">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                        style={{ background: "var(--term-orange)" }}
                      >
                        <svg className="w-4 h-4" fill="var(--term-bg)" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <div
                        className="px-4 py-3 rounded-2xl flex gap-1"
                        style={{ background: "var(--term-bg)", borderBottomLeftRadius: "4px" }}
                      >
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--term-text-dim)", animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--term-text-dim)", animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: "var(--term-text-dim)", animationDelay: "300ms" }}></span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div
                  className="p-4"
                  style={{ background: "var(--term-bg)", borderTop: "1px solid var(--term-border)" }}
                >
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: "var(--term-bg-secondary)", border: "1px solid var(--term-border)" }}
                  >
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      placeholder="Type a message..."
                      disabled={isLoading || isTypingEffect}
                      className="flex-1 bg-transparent border-none outline-none text-sm disabled:opacity-50"
                      style={{ color: "var(--term-text)" }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || isTypingEffect || !input.trim()}
                      className="w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-30"
                      style={{ background: "var(--term-orange)" }}
                    >
                      <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Footer with contact */}
                <div
                  className="px-4 py-3 flex items-center justify-center"
                  style={{ background: "var(--term-bg)", borderTop: "1px solid var(--term-border)" }}
                >
                  <a
                    href="mailto:enterprise@shodh-memory.com?subject=Enterprise%20Inquiry"
                    className="text-xs flex items-center gap-1.5 transition-opacity hover:opacity-80"
                    style={{ color: "var(--term-cyan)", textDecoration: "none" }}
                  >
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Need help? Contact sales
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

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
  const [showPrompt, setShowPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingRef = useRef<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const summarySentRef = useRef(false);
  const sessionStartRef = useRef<number>(Date.now());
  const chatOpenedAtRef = useRef<number | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, displayedContent]);

  useEffect(() => {
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, []);

  // Show prompt bubble after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state === "closed") {
        setShowPrompt(true);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Hide prompt when chat opens
  useEffect(() => {
    if (state !== "closed") {
      setShowPrompt(false);
    }
  }, [state]);

  // Send summary when user leaves page
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (messages.length > 0 && !summarySentRef.current) {
        summarySentRef.current = true;
        const now = Date.now();
        const behavior = {
          timestamp: new Date().toISOString(),
          page: window.location.pathname,
          timeOnPageSec: Math.round((now - sessionStartRef.current) / 1000),
          timeInChatSec: chatOpenedAtRef.current ? Math.round((now - chatOpenedAtRef.current) / 1000) : 0,
          messageCount: messages.length,
          filledForm: leadInfo.name !== "Anonymous" && leadInfo.email !== "",
          userAgent: navigator.userAgent,
          referrer: document.referrer,
        };
        const data = JSON.stringify({
          message: "[SESSION_END]",
          clientId: "shodh-demo",
          history: messages,
          leadInfo,
          sessionEnd: true,
          behavior,
        });
        // Use Blob with correct content-type for sendBeacon
        const blob = new Blob([data], { type: "application/json" });
        navigator.sendBeacon("/api/chat", blob);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [messages, leadInfo]);

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
      typeMessage(`Hey ${leadInfo.name.split(" ")[0]}! Thanks for reaching out. What brings you here today?`);
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

  const getBehaviorData = () => {
    const now = Date.now();
    const timeOnPage = Math.round((now - sessionStartRef.current) / 1000);
    const timeInChat = chatOpenedAtRef.current
      ? Math.round((now - chatOpenedAtRef.current) / 1000)
      : 0;

    return {
      timestamp: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.pathname : "/",
      timeOnPageSec: timeOnPage,
      timeInChatSec: timeInChat,
      messageCount: messages.length,
      filledForm: leadInfo.name !== "Anonymous" && leadInfo.email !== "",
      userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      referrer: typeof document !== "undefined" ? document.referrer : "",
    };
  };

  const sendSummaryToTelegram = async () => {
    if (messages.length < 1 || summarySentRef.current) return;
    summarySentRef.current = true;
    try {
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: "[SESSION_END]",
          clientId: "shodh-demo",
          history: messages,
          leadInfo,
          sessionEnd: true,
          behavior: getBehaviorData(),
        }),
      });
    } catch {
      // Silent fail
    }
  };

  const toggleWidget = () => {
    if (state === "closed") {
      chatOpenedAtRef.current = Date.now();
      setState("form");
    } else {
      if (messages.length > 0) {
        sendSummaryToTelegram();
      }
      setState("closed");
    }
  };

  return (
    <>
      {/* Prompt Bubble */}
      {showPrompt && state === "closed" && (
        <div
          className="fixed bottom-20 right-6 z-[1001] max-w-[250px]"
          style={{ animation: "fadeInUp 0.3s ease-out" }}
        >
          <style jsx>{`
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <div
            className="relative px-4 py-3 text-sm cursor-pointer"
            onClick={() => { setShowPrompt(false); setState("form"); }}
            style={{
              background: "var(--term-bg)",
              border: "1px dotted var(--term-orange)",
              color: "var(--term-text)",
              fontFamily: "var(--font-mono)",
              boxShadow: "3px 3px 0 var(--term-orange)",
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setShowPrompt(false); }}
              className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center text-xs"
              style={{
                background: "var(--term-bg)",
                border: "1px dotted var(--term-border)",
                color: "var(--term-text-dim)",
              }}
            >
              ×
            </button>
            <span style={{ color: "var(--term-orange)" }}>→</span> got questions about shodh-memory? let&apos;s chat!
          </div>
          {/* Arrow pointing to button */}
          <div
            className="absolute -bottom-2 right-8 w-0 h-0"
            style={{
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "8px solid var(--term-orange)",
            }}
          />
        </div>
      )}

      {/* Floating Button - Terminal Style */}
      <button
        onClick={toggleWidget}
        className="fixed bottom-6 right-6 z-[1001] group"
        aria-label={state === "closed" ? "Open chat" : "Close chat"}
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5 transition-all duration-200"
          style={{
            background: "var(--term-bg)",
            border: "2px dotted var(--term-orange)",
            fontFamily: "var(--font-mono), monospace",
            boxShadow: state === "closed"
              ? "4px 4px 0 var(--term-orange)"
              : "2px 2px 0 var(--term-border)",
          }}
        >
          {state === "closed" ? (
            <>
              <img
                src="/logo.png"
                alt="shodh"
                className="w-6 h-6 object-contain"
              />
              <span
                className="text-sm font-medium"
                style={{ color: "var(--term-text)" }}
              >
                talk to us!
              </span>
            </>
          ) : (
            <>
              <span style={{ color: "var(--term-orange)" }}>[</span>
              <span style={{ color: "var(--term-text)" }}>x</span>
              <span style={{ color: "var(--term-orange)" }}>]</span>
            </>
          )}
        </div>
      </button>

      {/* Widget Panel - Terminal Window */}
      {state !== "closed" && (
        <div
          className="fixed bottom-20 right-6 w-[380px] z-[1001]"
          style={{ animation: "termSlideUp 0.2s ease-out" }}
        >
          <style jsx>{`
            @keyframes termSlideUp {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes termBlink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>

          <div
            className="flex flex-col overflow-hidden"
            style={{
              background: "var(--term-bg)",
              border: "2px dotted var(--term-border)",
              boxShadow: "6px 6px 0 rgba(255, 140, 50, 0.3)",
              height: state === "form" ? "auto" : "500px",
            }}
          >
            {/* Terminal Header */}
            <div
              className="px-3 py-2 flex items-center justify-between"
              style={{
                background: "var(--term-bg-secondary)",
                borderBottom: "1px dotted var(--term-border)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f56" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ffbd2e" }} />
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#27ca40" }} />
                </div>
                <span
                  className="text-xs ml-2"
                  style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
                >
                  shodh-memory ~ chat
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#27ca40" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
                >
                  online
                </span>
              </div>
            </div>

            {/* Pre-chat Form */}
            {state === "form" && (
              <form onSubmit={handleFormSubmit} className="p-4 space-y-3">
                <div className="mb-3">
                  <div
                    className="text-sm mb-1"
                    style={{ color: "var(--term-orange)", fontFamily: "var(--font-mono)" }}
                  >
                    $ init_conversation
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
                  >
                    // typically reply within minutes
                  </p>
                </div>

                <div>
                  <label
                    className="block text-xs mb-1"
                    style={{ color: "var(--term-cyan)", fontFamily: "var(--font-mono)" }}
                  >
                    name:
                  </label>
                  <input
                    type="text"
                    required
                    value={leadInfo.name}
                    onChange={(e) => setLeadInfo({ ...leadInfo, name: e.target.value })}
                    placeholder="your_name"
                    className="w-full px-3 py-2 text-sm outline-none"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px dotted var(--term-border)",
                      color: "var(--term-text)",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs mb-1"
                    style={{ color: "var(--term-cyan)", fontFamily: "var(--font-mono)" }}
                  >
                    email:
                  </label>
                  <input
                    type="email"
                    required
                    value={leadInfo.email}
                    onChange={(e) => setLeadInfo({ ...leadInfo, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-3 py-2 text-sm outline-none"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px dotted var(--term-border)",
                      color: "var(--term-text)",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-xs mb-1"
                    style={{ color: "var(--term-cyan)", fontFamily: "var(--font-mono)" }}
                  >
                    company: <span style={{ color: "var(--term-text-dim)" }}>(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={leadInfo.company || ""}
                    onChange={(e) => setLeadInfo({ ...leadInfo, company: e.target.value })}
                    placeholder="your_company"
                    className="w-full px-3 py-2 text-sm outline-none"
                    style={{
                      background: "var(--term-bg-secondary)",
                      border: "1px dotted var(--term-border)",
                      color: "var(--term-text)",
                      fontFamily: "var(--font-mono)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-sm font-medium transition-all hover:opacity-90 mt-2"
                  style={{
                    background: "var(--term-orange)",
                    border: "none",
                    color: "var(--term-bg)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  [ENTER] start_chat
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setLeadInfo({ name: "Anonymous", email: "" });
                    setState("chat");
                    setTimeout(() => {
                      typeMessage("Hey! What brings you here today?");
                    }, 300);
                  }}
                  className="w-full py-2 text-xs transition-all hover:opacity-70"
                  style={{
                    background: "transparent",
                    border: "1px dotted var(--term-border)",
                    color: "var(--term-text-dim)",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  [ESC] skip, chat anonymously
                </button>

                <p
                  className="text-center text-xs pt-1"
                  style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
                >
                  // by chatting, you agree to our{" "}
                  <a href="/privacy" style={{ color: "var(--term-cyan)" }}>
                    privacy_policy
                  </a>
                </p>
              </form>
            )}

            {/* Chat View */}
            {state === "chat" && (
              <>
                {/* Messages */}
                <div
                  className="flex-1 overflow-y-auto p-3 space-y-3"
                  style={{ background: "var(--term-bg)" }}
                >
                  {messages.map((msg, i) => (
                    <div key={i}>
                      {msg.role === "user" ? (
                        <div className="flex items-start gap-2">
                          <span
                            className="text-xs shrink-0 mt-0.5"
                            style={{ color: "var(--term-cyan)", fontFamily: "var(--font-mono)" }}
                          >
                            you&gt;
                          </span>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--term-text)", fontFamily: "var(--font-mono)" }}
                          >
                            {msg.content}
                          </p>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <span
                            className="text-xs shrink-0 mt-0.5"
                            style={{ color: "var(--term-orange)", fontFamily: "var(--font-mono)" }}
                          >
                            shodh&gt;
                          </span>
                          <p
                            className="text-sm leading-relaxed"
                            style={{ color: "var(--term-text)", fontFamily: "var(--font-mono)" }}
                          >
                            {msg.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Typing effect */}
                  {isTypingEffect && displayedContent && (
                    <div className="flex items-start gap-2">
                      <span
                        className="text-xs shrink-0 mt-0.5"
                        style={{ color: "var(--term-orange)", fontFamily: "var(--font-mono)" }}
                      >
                        bot&gt;
                      </span>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--term-text)", fontFamily: "var(--font-mono)" }}
                      >
                        {displayedContent}
                        <span
                          className="inline-block w-2 h-4 ml-0.5"
                          style={{
                            background: "var(--term-orange)",
                            animation: "termBlink 1s infinite",
                          }}
                        />
                      </p>
                    </div>
                  )}

                  {/* Loading */}
                  {isLoading && !isTypingEffect && (
                    <div className="flex items-start gap-2">
                      <span
                        className="text-xs shrink-0 mt-0.5"
                        style={{ color: "var(--term-orange)", fontFamily: "var(--font-mono)" }}
                      >
                        bot&gt;
                      </span>
                      <span
                        className="text-sm"
                        style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
                      >
                        processing...
                      </span>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div
                  className="p-3"
                  style={{ borderTop: "1px dotted var(--term-border)" }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm shrink-0"
                      style={{ color: "var(--term-cyan)", fontFamily: "var(--font-mono)" }}
                    >
                      $
                    </span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                      placeholder="type_message..."
                      disabled={isLoading || isTypingEffect}
                      className="flex-1 bg-transparent border-none outline-none text-sm disabled:opacity-50"
                      style={{
                        color: "var(--term-text)",
                        fontFamily: "var(--font-mono)",
                      }}
                    />
                    <button
                      onClick={sendMessage}
                      disabled={isLoading || isTypingEffect || !input.trim()}
                      className="px-3 py-1 text-xs transition-all disabled:opacity-30"
                      style={{
                        background: "var(--term-orange)",
                        color: "var(--term-bg)",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      SEND
                    </button>
                  </div>
                </div>

                {/* Footer */}
                <div
                  className="px-3 py-2 flex items-center justify-center"
                  style={{ borderTop: "1px dotted var(--term-border)" }}
                >
                  <a
                    href="mailto:enterprise@shodh-memory.com?subject=Enterprise%20Inquiry"
                    className="text-xs flex items-center gap-1 transition-opacity hover:opacity-70"
                    style={{
                      color: "var(--term-cyan)",
                      textDecoration: "none",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    [?] need_help? → contact_sales
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

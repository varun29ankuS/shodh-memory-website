"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Enterprise",
  "Partnership",
  "Bug Report",
  "Other",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(SUBJECT_OPTIONS[0]);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoSubject = encodeURIComponent(
      `[shodh-memory] ${subject}${name ? ` — ${name}` : ""}`
    );
    const mailtoBody = encodeURIComponent(
      `${message}\n\n---\nFrom: ${name}\nEmail: ${email}\nSubject: ${subject}`
    );
    window.location.href = `mailto:varun@shodh-memory.com?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-green)] font-mono">$</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                Contact
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] leading-relaxed">
              Questions about shodh-memory, enterprise deployments, partnerships,
              or just want to talk about neuroscience-inspired AI? Reach out.
            </p>
          </div>

          {/* Contact Form */}
          <div className="shadow-window rounded mb-12">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-xs">
                contact.sh
              </span>
            </div>
            <div className="terminal-body p-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs text-[var(--term-text-dim)] font-mono mb-1.5"
                  >
                    <span className="text-[var(--term-green)]">$</span> name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Your name"
                    className="w-full bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] placeholder:text-[var(--term-text-dim)]/50 text-sm px-3 py-2 font-mono focus:outline-none focus:border-[var(--term-orange)] transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs text-[var(--term-text-dim)] font-mono mb-1.5"
                  >
                    <span className="text-[var(--term-green)]">$</span> email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] placeholder:text-[var(--term-text-dim)]/50 text-sm px-3 py-2 font-mono focus:outline-none focus:border-[var(--term-orange)] transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs text-[var(--term-text-dim)] font-mono mb-1.5"
                  >
                    <span className="text-[var(--term-green)]">$</span> subject
                  </label>
                  <select
                    id="contact-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] text-sm px-3 py-2 font-mono focus:outline-none focus:border-[var(--term-orange)] transition-colors appearance-none cursor-pointer"
                  >
                    {SUBJECT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs text-[var(--term-text-dim)] font-mono mb-1.5"
                  >
                    <span className="text-[var(--term-green)]">$</span> message
                  </label>
                  <textarea
                    id="contact-message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className="w-full bg-[var(--term-bg)] border border-[var(--term-border)] text-[var(--term-text)] placeholder:text-[var(--term-text-dim)]/50 text-sm px-3 py-2 font-mono focus:outline-none focus:border-[var(--term-orange)] transition-colors resize-vertical"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full shadow-btn shadow-btn-primary px-4 py-2.5 text-sm font-mono cursor-pointer"
                >
                  {sent ? "Opening email client..." : "Send message"}
                </button>
              </form>
            </div>
          </div>

          {/* Other Ways to Reach Us */}
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-[var(--term-text)] mb-6">
              Other ways to reach us
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Email */}
              <a
                href="mailto:varun@shodh-memory.com"
                className="shadow-box rounded p-5 group hover:border-[var(--term-orange)] transition-colors block"
              >
                <div className="text-[var(--term-orange)] text-lg mb-2">
                  &#9993;
                </div>
                <h3 className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-1">
                  Email
                </h3>
                <p className="text-xs text-[var(--term-text-dim)] font-mono">
                  varun@shodh-memory.com
                </p>
              </a>

              {/* Calendly */}
              <a
                href="https://calendly.com/varun-shodh-memory/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-box rounded p-5 group hover:border-[var(--term-orange)] transition-colors block"
              >
                <div className="text-[var(--term-orange)] text-lg mb-2">
                  &#128197;
                </div>
                <h3 className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-1">
                  Schedule a Call
                </h3>
                <p className="text-xs text-[var(--term-text-dim)]">
                  30-minute chat — enterprise, integration, or just a conversation
                </p>
              </a>

              {/* GitHub Issues */}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-box rounded p-5 group hover:border-[var(--term-orange)] transition-colors block"
              >
                <div className="text-[var(--term-orange)] text-lg mb-2">
                  &#128736;
                </div>
                <h3 className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-1">
                  GitHub Issues
                </h3>
                <p className="text-xs text-[var(--term-text-dim)]">
                  Bug reports, feature requests, and technical discussions
                </p>
              </a>

              {/* GitHub Discussions */}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-box rounded p-5 group hover:border-[var(--term-orange)] transition-colors block"
              >
                <div className="text-[var(--term-orange)] text-lg mb-2">
                  &#128172;
                </div>
                <h3 className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors mb-1">
                  Community
                </h3>
                <p className="text-xs text-[var(--term-text-dim)]">
                  Questions, ideas, and community conversations on GitHub Discussions
                </p>
              </a>
            </div>
          </div>

          {/* Response note */}
          <div className="shadow-callout p-5">
            <p className="text-[var(--term-text-dim)] text-sm">
              <span className="text-[var(--term-green)] font-mono">$</span>{" "}
              We typically respond within 24 hours. For enterprise inquiries,{" "}
              <a
                href="https://calendly.com/varun-shodh-memory/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--term-orange)] hover:underline"
              >
                schedule a call
              </a>{" "}
              for the fastest response.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function PrivacyPolicy() {
  return (
    <main
      className="min-h-screen px-6 py-20 max-w-3xl mx-auto"
      style={{ background: "var(--term-bg)", color: "var(--term-text)" }}
    >
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--term-orange)", fontFamily: "var(--font-mono)" }}
      >
        privacy_policy
      </h1>
      <p
        className="text-sm mb-8"
        style={{ color: "var(--term-text-dim)", fontFamily: "var(--font-mono)" }}
      >
        Last updated: January 2026
      </p>

      <div
        className="space-y-6 text-sm leading-relaxed"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // what we collect
          </h2>
          <p style={{ color: "var(--term-text)" }}>
            When you use our chat widget or website, we may collect:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: "var(--term-text-dim)" }}>
            <li>Information you provide (name, email, company)</li>
            <li>Chat messages and conversation history</li>
            <li>IP address and approximate location (country/city)</li>
            <li>Device type, browser, and referrer URL</li>
            <li>Time spent on pages and interaction data</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // how we use it
          </h2>
          <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
            <li>To respond to your inquiries and provide support</li>
            <li>To improve our product and website experience</li>
            <li>To understand where our visitors come from</li>
            <li>To send follow-up communications (only if you provide contact info)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // third parties
          </h2>
          <p style={{ color: "var(--term-text-dim)" }}>
            We use the following services:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: "var(--term-text-dim)" }}>
            <li><span style={{ color: "var(--term-text)" }}>Vercel</span> - hosting and analytics</li>
            <li><span style={{ color: "var(--term-text)" }}>Groq</span> - AI chat responses</li>
            <li><span style={{ color: "var(--term-text)" }}>Telegram</span> - internal notifications for support</li>
          </ul>
          <p className="mt-2" style={{ color: "var(--term-text-dim)" }}>
            We do not sell your data to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // cookies
          </h2>
          <p style={{ color: "var(--term-text-dim)" }}>
            We use minimal cookies for essential functionality. We do not use tracking cookies
            or browser fingerprinting.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // your rights
          </h2>
          <p style={{ color: "var(--term-text-dim)" }}>
            You can:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1" style={{ color: "var(--term-text-dim)" }}>
            <li>Request a copy of your data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of communications</li>
            <li>Chat anonymously (skip the form)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
            // contact
          </h2>
          <p style={{ color: "var(--term-text-dim)" }}>
            Questions? Email us at{" "}
            <a
              href="mailto:enterprise@shodh-memory.com"
              style={{ color: "var(--term-orange)" }}
            >
              enterprise@shodh-memory.com
            </a>
          </p>
        </section>

        <section
          className="mt-10 p-4"
          style={{ border: "1px dotted var(--term-border)" }}
        >
          <p style={{ color: "var(--term-text-dim)" }}>
            <span style={{ color: "var(--term-orange)" }}>tl;dr →</span> We collect basic info to help you and improve our product.
            We don&apos;t sell your data. You can ask us to delete it anytime.
          </p>
        </section>
      </div>
    </main>
  );
}

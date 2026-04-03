import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Shodh-memory terms of service. Open-source software under the Apache 2.0 license.",
  openGraph: {
    title: "Terms of Service | shodh-memory",
    description:
      "Shodh-memory terms of service. Open-source software under the Apache 2.0 license.",
    url: "https://www.shodh-memory.com/terms",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/terms",
  },
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-6 max-w-3xl mx-auto">
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--term-orange)" }}
        >
          terms_of_service
        </h1>
        <p
          className="text-sm mb-8"
          style={{ color: "var(--term-text-dim)" }}
        >
          Last updated: April 2026
        </p>

        <div className="space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // overview
            </h2>
            <p style={{ color: "var(--term-text)" }}>
              Shodh-memory is open-source software licensed under the{" "}
              <a
                href="https://www.apache.org/licenses/LICENSE-2.0"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--term-orange)" }}
              >
                Apache License 2.0
              </a>
              . By using our software or website, you agree to these terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // open-source software
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>The shodh-memory binary, MCP server, Python bindings, and TUI are provided under Apache 2.0</li>
              <li>You may use, modify, and distribute the software freely under the license terms</li>
              <li>The software is provided &quot;as is&quot; without warranty of any kind</li>
              <li>We are not liable for any damages arising from use of the software</li>
              <li>Attribution must be maintained as required by the Apache 2.0 license</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // website usage
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>The shodh-memory.com website is for informational and promotional purposes</li>
              <li>Blog content is licensed under{" "}
                <a
                  href="https://creativecommons.org/licenses/by/4.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "var(--term-orange)" }}
                >
                  CC BY 4.0
                </a>
                {" "}unless otherwise noted
              </li>
              <li>You may not scrape, mirror, or redistribute the website without permission</li>
              <li>We reserve the right to modify or discontinue any part of the website</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // chat widget
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              The AI chat widget on this website uses Groq for inference. Messages you send are
              processed by third-party AI models. Do not share sensitive, confidential, or personally
              identifiable information through the chat widget. Chat data may be stored for support
              and product improvement purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // your data
            </h2>
            <ul className="list-disc list-inside space-y-1" style={{ color: "var(--term-text-dim)" }}>
              <li>When you run shodh-memory locally, all data stays on your machine</li>
              <li>We have no access to your memories, embeddings, or knowledge graphs</li>
              <li>The software does not phone home, collect telemetry, or transmit data</li>
              <li>You own your data completely — we make no claim to it</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // trademarks
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              &quot;Shodh&quot; and &quot;shodh-memory&quot; are trademarks of the Shodh project.
              You may use these names to refer to the software, but not in a way that implies
              endorsement or affiliation without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // limitation of liability
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              To the maximum extent permitted by law, shodh-memory and its contributors shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages,
              or any loss of profits or data, whether in contract, tort, or otherwise, arising from
              use of the software or website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // changes
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              We may update these terms from time to time. Continued use of the software or website
              constitutes acceptance of the updated terms. Material changes will be noted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-2" style={{ color: "var(--term-cyan)" }}>
              // contact
            </h2>
            <p style={{ color: "var(--term-text-dim)" }}>
              Questions about these terms? Email us at{" "}
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
              <span style={{ color: "var(--term-orange)" }}>tl;dr →</span> Apache 2.0 for the code.
              Your data is yours. We&apos;re not liable for anything. Don&apos;t pretend to be us.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

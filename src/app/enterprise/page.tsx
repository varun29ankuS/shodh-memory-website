import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Mission-critical memory deployment for industrial applications. On-premise installation, annual support contracts, and custom development for robotics, medical devices, defense, and autonomous vehicles.",
};

const SERVICES = [
  {
    icon: "🚀",
    title: "Deployment Package",
    description:
      "End-to-end installation on your infrastructure. Hardware assessment, memory system configuration, integration with existing pipelines, and team training.",
    includes: [
      "On-site or remote deployment",
      "Hardware compatibility audit",
      "Custom configuration tuning",
      "Integration with existing systems",
      "Team training & documentation",
      "30-day post-deployment support",
    ],
  },
  {
    icon: "🛡️",
    title: "Annual Maintenance Contract",
    description:
      "Continuous support to keep your memory systems running at peak performance. Priority response, regular updates, and proactive monitoring.",
    includes: [
      "Priority support (4-hour response)",
      "Version upgrades & patches",
      "Performance monitoring",
      "Quarterly health checks",
      "Dedicated account manager",
      "Custom SLA options",
    ],
  },
  {
    icon: "🔧",
    title: "Custom Development",
    description:
      "Bespoke features and integrations built for your specific use case. From custom memory models to specialized hardware drivers.",
    includes: [
      "Custom memory architectures",
      "Domain-specific embeddings",
      "Hardware driver development",
      "Compliance certifications",
      "API integrations",
      "Performance optimization",
    ],
  },
];

const INDUSTRIES = [
  {
    icon: "🤖",
    name: "Industrial Robotics",
    description:
      "Memory for robot arms, welding systems, and autonomous manufacturing. Sub-millisecond recall for real-time control.",
    requirements: ["Deterministic latency", "Air-gapped operation", "24/7 uptime"],
  },
  {
    icon: "🏥",
    name: "Medical Devices",
    description:
      "FDA-ready memory systems for diagnostic AI, surgical robotics, and patient monitoring. Full audit trail support.",
    requirements: ["HIPAA compliance", "Audit logging", "Deterministic behavior"],
  },
  {
    icon: "🛡️",
    name: "Defense & Aerospace",
    description:
      "Secure, sovereign memory for mission-critical systems. Zero external dependencies, complete operational control.",
    requirements: ["Air-gapped deployment", "Cryptographic integrity", "No cloud dependency"],
  },
  {
    icon: "🚗",
    name: "Autonomous Vehicles",
    description:
      "Edge-deployed memory for self-driving cars, drones, and logistics robots. Persistent across restarts, fast enough for real-time.",
    requirements: ["<1ms latency", "Offline operation", "Crash resilience"],
  },
];

const TRUST_SIGNALS = [
  { label: "Pure Rust", detail: "Memory-safe, no runtime overhead" },
  { label: "688+ Tests", detail: "Comprehensive test coverage" },
  { label: "Zero Cloud", detail: "All data stays on-premise" },
  { label: "Apache 2.0", detail: "Full source code access" },
];

export default function Enterprise() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Hero */}
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-[var(--term-orange)] text-[var(--term-orange)] text-sm mb-6">
              <span className="text-xs">ENTERPRISE</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-semibold text-[var(--term-text)] mb-6">
              Memory for Mission-Critical Systems
            </h1>
            <p className="text-[var(--term-text-dim)] text-lg max-w-2xl mx-auto mb-10">
              Production-grade deployment, ongoing support, and custom development
              for organizations where AI memory cannot fail.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <a
                href="mailto:enterprise@shodh-memory.com?subject=Enterprise%20Inquiry"
                className="shadow-btn shadow-btn-primary px-8 py-3 text-sm font-medium"
              >
                Contact Sales
              </a>
              <a
                href="https://calendly.com/varun-shodh-memory/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-btn px-8 py-3 text-sm"
              >
                Schedule a Call
              </a>
            </div>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
            {TRUST_SIGNALS.map((signal, i) => (
              <div key={i} className="shadow-card p-4 text-center">
                <div className="text-[var(--term-orange)] font-semibold mb-1">
                  {signal.label}
                </div>
                <div className="text-[var(--term-text-dim)] text-xs">
                  {signal.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Services */}
          <section className="mb-20">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--term-orange)] font-mono text-sm">
                  [01]
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                  Services
                </h2>
              </div>
              <p className="text-[var(--term-text-dim)] pl-12">
                Everything you need to deploy and maintain shodh-memory in production
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {SERVICES.map((service, i) => (
                <div key={i} className="shadow-window">
                  <div className="terminal-header">
                    <div className="terminal-dot terminal-dot-red" />
                    <div className="terminal-dot terminal-dot-yellow" />
                    <div className="terminal-dot terminal-dot-green" />
                    <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                      {service.title.toLowerCase().replace(/\s+/g, "-")}.toml
                    </span>
                  </div>
                  <div className="terminal-body">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="text-lg font-medium text-[var(--term-orange)] mb-2">
                      {service.title}
                    </h3>
                    <p className="text-[var(--term-text-dim)] text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="border-t border-[var(--term-border)] pt-4">
                      <div className="text-[var(--term-text)] text-xs font-medium mb-2">
                        Includes:
                      </div>
                      <ul className="space-y-1">
                        {service.includes.map((item, j) => (
                          <li
                            key={j}
                            className="text-[var(--term-text-dim)] text-xs flex items-start gap-2"
                          >
                            <span className="text-[var(--term-green)]">+</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Industries */}
          <section className="mb-20">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--term-orange)] font-mono text-sm">
                  [02]
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                  Industries
                </h2>
              </div>
              <p className="text-[var(--term-text-dim)] pl-12">
                Built for environments where failure is not an option
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {INDUSTRIES.map((industry, i) => (
                <div key={i} className="shadow-box p-6 rounded">
                  <div className="flex items-start gap-4">
                    <span className="text-3xl">{industry.icon}</span>
                    <div className="flex-1">
                      <h3 className="text-[var(--term-text)] font-medium mb-2">
                        {industry.name}
                      </h3>
                      <p className="text-[var(--term-text-dim)] text-sm mb-4">
                        {industry.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {industry.requirements.map((req, j) => (
                          <span
                            key={j}
                            className="text-xs px-2 py-1 border border-[var(--term-border)] text-[var(--term-text-dim)]"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Why Enterprise */}
          <section className="mb-20">
            <div className="shadow-window">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                  why-enterprise.md
                </span>
              </div>
              <div className="terminal-body">
                <pre className="text-sm text-[var(--term-text)] whitespace-pre-wrap">{`# Why Enterprise Support?

The open-source shodh-memory works great for development.
Production is different.

  DEPLOYMENT
  + Custom hardware configurations
  + Integration with existing infrastructure
  + Air-gapped installation support
  + Team training and knowledge transfer

  RELIABILITY
  + Priority support with guaranteed response times
  + Regular health checks and performance audits
  + Proactive monitoring and alerting
  + Version upgrade assistance

  COMPLIANCE
  + Audit trail support
  + Regulatory documentation assistance
  + Security review and hardening
  + Custom compliance integrations

Your systems don't have downtime. Neither do we.`}</pre>
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="mb-20">
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--term-orange)] font-mono text-sm">
                  [03]
                </span>
                <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                  How It Works
                </h2>
              </div>
              <p className="text-[var(--term-text-dim)] pl-12">
                From first conversation to production deployment
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              <ProcessStep
                number="01"
                title="Discovery Call"
                description="30-minute call to understand your use case, infrastructure, and requirements."
              />
              <ProcessStep
                number="02"
                title="Technical Assessment"
                description="We evaluate your hardware, existing systems, and integration points."
              />
              <ProcessStep
                number="03"
                title="Proposal"
                description="Detailed scope, timeline, and pricing tailored to your needs."
              />
              <ProcessStep
                number="04"
                title="Deployment"
                description="On-site or remote installation with training and documentation."
              />
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <div className="shadow-box p-12 rounded">
              <h2 className="text-2xl font-semibold text-[var(--term-text)] mb-4">
                Ready to deploy memory that learns?
              </h2>
              <p className="text-[var(--term-text-dim)] mb-8 max-w-xl mx-auto">
                Let&apos;s discuss how shodh-memory can power your mission-critical AI systems.
                No commitment, no sales pitch—just a technical conversation.
              </p>
              <div className="flex flex-wrap justify-center gap-5">
                <a
                  href="mailto:enterprise@shodh-memory.com?subject=Enterprise%20Inquiry"
                  className="shadow-btn shadow-btn-primary px-8 py-3 text-sm font-medium"
                >
                  Contact Sales
                </a>
                <a
                  href="https://calendly.com/varun-shodh-memory/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-btn px-8 py-3 text-sm"
                >
                  Schedule a Call
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProcessStep({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="shadow-card p-6">
      <div className="text-[var(--term-orange)] font-mono text-2xl mb-3">
        {number}
      </div>
      <h3 className="text-[var(--term-text)] font-medium mb-2">{title}</h3>
      <p className="text-[var(--term-text-dim)] text-sm">{description}</p>
    </div>
  );
}

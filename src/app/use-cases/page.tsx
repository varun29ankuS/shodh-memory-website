import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Edge & Robotics Use Cases",
  description:
    "Deploy AI memory on edge devices, robots, and industrial systems. Shodh-memory runs on Raspberry Pi, NVIDIA Jetson, and air-gapped environments with sub-millisecond latency.",
  openGraph: {
    title: "Edge & Robotics Use Cases | shodh-memory",
    description:
      "Deploy AI memory on edge devices, robots, and industrial systems. Sub-millisecond latency, zero cloud dependency.",
    url: "https://www.shodh-memory.com/use-cases",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/use-cases",
  },
};

const USE_CASES = [
  {
    icon: "🤖",
    title: "Industrial Robotics",
    description: "Memory for robot arms and autonomous manufacturing systems. Learn tool preferences, remember failure modes, adapt to new parts without retraining.",
    specs: ["<50ms recall latency", "Offline operation", "Real-time learning"],
    example: "A welding robot remembers which torch angles work best for different metal thicknesses.",
  },
  {
    icon: "🚗",
    title: "Autonomous Vehicles",
    description: "Edge-deployed memory for self-driving cars and drones. Store learned routes, remember unusual traffic patterns, maintain situational awareness.",
    specs: ["Sub-millisecond lookup", "No cloud dependency", "Persistent across restarts"],
    example: "An autonomous delivery drone remembers that Building 7 has a tricky landing zone.",
  },
  {
    icon: "🏭",
    title: "Smart Manufacturing",
    description: "Production line AI that learns from experience. Remember optimal machine settings, predict maintenance needs, adapt to product variations.",
    specs: ["Air-gapped deployment", "Multi-agent coordination", "Temporal patterns"],
    example: "A CNC controller remembers that aluminum batch #4523 requires different feed rates.",
  },
  {
    icon: "🏥",
    title: "Medical Devices",
    description: "FDA-compliant memory for medical AI. Patient-specific preferences, treatment history, drug interaction patterns stored locally.",
    specs: ["HIPAA-ready", "Audit logging", "Deterministic recall"],
    example: "An insulin pump AI learns individual patient glucose patterns over time.",
  },
  {
    icon: "🌾",
    title: "Agricultural Robotics",
    description: "Memory for farm robots and smart irrigation. Learn field conditions, remember crop-specific needs, adapt to seasonal changes.",
    specs: ["Solar-powered edge", "Weather-resilient", "Multi-season learning"],
    example: "A harvesting robot remembers soil conditions in different field sections.",
  },
  {
    icon: "🛡️",
    title: "Defense & Aerospace",
    description: "Secure, air-gapped memory for mission-critical systems. No external dependencies, complete operational sovereignty.",
    specs: ["Zero network required", "Cryptographic integrity", "Tamper detection"],
    example: "A reconnaissance drone maintains mission context across communication blackouts.",
  },
  {
    icon: "🏠",
    title: "Smart Home Hubs",
    description: "Privacy-first home automation memory. Learn family routines, remember preferences, adapt to seasonal patterns.",
    specs: ["Local-only processing", "Family-safe privacy", "Low power (<5W)"],
    example: "A home assistant learns that Tuesday evenings mean workout music.",
  },
  {
    icon: "📦",
    title: "Warehouse Automation",
    description: "Memory for autonomous forklifts and picking robots. Learn warehouse layouts, remember item locations, optimize routes.",
    specs: ["Real-time coordination", "Spatial reasoning", "Multi-robot sync"],
    example: "A picking robot learns that aisle 7 gets congested at 2pm.",
  },
];

export default function UseCases() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[use-cases]</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">Edge & Robotics</h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg max-w-3xl">
              Shodh-memory runs anywhere from Raspberry Pi to industrial PLCs. No cloud, no latency,
              no data leaving your premises. Memory that works where your robots do.
            </p>
          </div>

          <div className="shadow-window mb-16">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">why-edge.md</span>
            </div>
            <div className="terminal-body">
              <pre className="text-sm text-[var(--term-text)] whitespace-pre-wrap">{`# Why Edge Memory Matters

Cloud-based AI has three fatal flaws for robotics:

  1. LATENCY  - 100-500ms round trip kills real-time control
  2. CONNECTIVITY - Factories, farms, vehicles lose connection
  3. PRIVACY  - Operational data leaving premises = IP risk

Shodh-memory solves all three:

  + <1us graph lookup, 34-58ms semantic search
  + Single binary, zero network dependencies
  + All data stays on-device, always`}</pre>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {USE_CASES.map((useCase, i) => (
              <div key={i} className="shadow-window">
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-2 text-[var(--term-text-dim)] text-sm">{useCase.title.toLowerCase().replace(/\s+/g, "-")}.rs</span>
                </div>
                <div className="terminal-body">
                  <div className="text-3xl mb-3">{useCase.icon}</div>
                  <h3 className="text-lg font-medium text-[var(--term-orange)] mb-2">{useCase.title}</h3>
                  <p className="text-[var(--term-text-dim)] text-sm mb-4">{useCase.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {useCase.specs.map((spec, j) => (
                      <span key={j} className="text-xs px-2 py-1 border border-[var(--term-border)] text-[var(--term-text-dim)]">{spec}</span>
                    ))}
                  </div>
                  <div className="text-xs text-[var(--term-text-dim)] italic border-l-2 border-[var(--term-orange)] pl-3">{useCase.example}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-2xl font-semibold text-[var(--term-text)] mb-6">Hardware Requirements</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <SpecCard title="Minimum" specs={["ARM Cortex-A53", "512MB RAM", "100MB storage", "Linux/RTOS"]} />
              <SpecCard title="Recommended" specs={["ARM Cortex-A72+", "2GB RAM", "1GB storage", "Linux 5.x+"]} highlighted />
              <SpecCard title="Tested Platforms" specs={["Raspberry Pi 4/5", "NVIDIA Jetson", "BeagleBone", "Industrial PCs"]} />
            </div>
          </div>

          <div className="text-center">
            <p className="text-[var(--term-text-dim)] mb-4">Ready to add memory to your edge devices?</p>
            <div className="flex flex-wrap justify-center gap-5">
              <a href="/#install" className="shadow-btn shadow-btn-primary px-6 py-2">Get Started</a>
              <a href="https://github.com/varun29ankuS/shodh-memory" target="_blank" rel="noopener noreferrer" className="shadow-btn px-6 py-2">View Source</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SpecCard({ title, specs, highlighted }: { title: string; specs: string[]; highlighted?: boolean }) {
  return (
    <div className={"shadow-box p-6 rounded " + (highlighted ? "border-[var(--term-orange)]" : "")}>
      <h3 className={"text-sm font-medium mb-4 " + (highlighted ? "text-[var(--term-orange)]" : "text-[var(--term-text)]")}>{title}</h3>
      <ul className="space-y-2">
        {specs.map((spec, i) => (
          <li key={i} className="text-sm text-[var(--term-text-dim)] flex items-center gap-2">
            <span className="text-[var(--term-green)]">+</span>
            {spec}
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Edge & Robotics — AI Memory Where the Cloud Can't Follow",
  description:
    "Deploy AI memory on edge devices, robots, and industrial systems. Shodh-memory runs on Raspberry Pi, NVIDIA Jetson, and air-gapped environments with sub-millisecond latency. Neuromorphic-ready architecture for next-gen hardware.",
  keywords: [
    "edge AI memory",
    "robotics memory",
    "neuromorphic computing",
    "neuromorphic AI memory",
    "Intel Loihi memory",
    "spiking neural network memory",
    "Raspberry Pi AI",
    "NVIDIA Jetson memory",
    "industrial AI",
    "air-gapped AI",
    "brain-inspired computing",
    "edge inference",
  ],
  openGraph: {
    title: "Edge & Robotics | shodh-memory",
    description:
      "Deploy AI memory on edge devices, robots, and industrial systems. Sub-millisecond latency, zero cloud dependency. Neuromorphic-ready architecture.",
    url: "https://www.shodh-memory.com/use-cases",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/use-cases",
  },
};

interface UseCase {
  icon: string;
  title: string;
  description: string;
  specs: string[];
  example: string;
}

interface World {
  prefix: string;
  title: string;
  narrative: string;
  cases: UseCase[];
}

const WORLDS: World[] = [
  {
    prefix: "01",
    title: "On the factory floor",
    narrative:
      "Production environments measure downtime in thousands of dollars per minute. Memory here has to be deterministic, local, and faster than the control loop.",
    cases: [
      {
        icon: "🤖",
        title: "Industrial Robotics",
        description:
          "Memory for robot arms and autonomous manufacturing systems. Learn tool preferences, remember failure modes, adapt to new parts without retraining.",
        specs: ["<50ms recall latency", "Offline operation", "Real-time learning"],
        example:
          "A welding robot remembers which torch angles work best for different metal thicknesses.",
      },
      {
        icon: "🏭",
        title: "Smart Manufacturing",
        description:
          "Production line AI that learns from experience. Remember optimal machine settings, predict maintenance needs, adapt to product variations.",
        specs: ["Air-gapped deployment", "Multi-agent coordination", "Temporal patterns"],
        example:
          "A CNC controller remembers that aluminum batch #4523 requires different feed rates.",
      },
      {
        icon: "📦",
        title: "Warehouse Automation",
        description:
          "Memory for autonomous forklifts and picking robots. Learn warehouse layouts, remember item locations, optimize routes.",
        specs: ["Real-time coordination", "Spatial patterns", "Persistent across shifts"],
        example: "A picking robot learns that aisle 7 gets congested at 2pm.",
      },
    ],
  },
  {
    prefix: "02",
    title: "In the field",
    narrative:
      "Vehicles, farms, and contested airspace share one constraint: the network is a luxury. Memory has to survive disconnection — and restarts — without losing what it learned.",
    cases: [
      {
        icon: "🚗",
        title: "Autonomous Vehicles",
        description:
          "Edge-deployed memory for self-driving platforms and drones. Store learned routes, remember unusual traffic patterns, maintain situational awareness.",
        specs: ["Sub-millisecond lookup", "No cloud dependency", "Persistent across restarts"],
        example:
          "An autonomous delivery drone remembers that Building 7 has a tricky landing zone.",
      },
      {
        icon: "🌾",
        title: "Agricultural Robotics",
        description:
          "Memory for farm robots and smart irrigation. Learn field conditions, remember crop-specific needs, adapt to seasonal changes.",
        specs: ["Low-power edge", "Weather-resilient", "Multi-season learning"],
        example: "A harvesting robot remembers soil conditions in different field sections.",
      },
      {
        icon: "🛡️",
        title: "Defense & Aerospace",
        description:
          "Air-gapped memory for mission-critical systems. No external dependencies, no network calls, complete operational sovereignty.",
        specs: ["Zero network required", "Deterministic recall", "Single auditable binary"],
        example:
          "A reconnaissance drone maintains mission context across communication blackouts.",
      },
    ],
  },
  {
    prefix: "03",
    title: "Close to people",
    narrative:
      "When memory holds health data or family routines, the only acceptable place for it is the device itself. Nothing leaves. Nothing phones home.",
    cases: [
      {
        icon: "🏥",
        title: "Medical Devices",
        description:
          "Local-only memory for medical AI. Patient-specific preferences, treatment history, and usage patterns stored on the device — never in someone else's cloud.",
        specs: ["Local-only storage", "Deterministic recall", "Persistent history"],
        example: "An insulin pump AI learns individual patient glucose patterns over time.",
      },
      {
        icon: "🏠",
        title: "Smart Home Hubs",
        description:
          "Privacy-first home automation memory. Learn family routines, remember preferences, adapt to seasonal patterns.",
        specs: ["Local-only processing", "Family-safe privacy", "Low power (<5W)"],
        example: "A home assistant learns that Tuesday evenings mean workout music.",
      },
    ],
  },
];

const EDGE_STATS = [
  { value: "30MB", label: "single binary, no runtime deps" },
  { value: "<1μs", label: "graph lookup on-device" },
  { value: "512MB", label: "minimum RAM (Pi Zero territory)" },
  { value: "0", label: "network calls, ever" },
];

export default function UseCases() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6 md:pt-36 md:pb-32">
        <div className="mx-auto max-w-6xl">
          {/* Act 1 — the hook */}
          <div className="mb-16 max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-orange)] font-mono text-sm">[edge]</span>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-[var(--term-text)]">
                Where the cloud can&apos;t follow
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] text-lg leading-relaxed">
              A robot arm can&apos;t wait 300ms for a round trip. A drone loses its uplink.
              A factory&apos;s process data can&apos;t leave the building. Every memory system
              that depends on a cloud API fails at exactly the moment robotics needs it most.
              shodh-memory lives on the machine — and learns there.
            </p>
          </div>

          {/* Act 2 — the stakes */}
          <div className="shadow-window mb-12">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red" />
              <div className="terminal-dot terminal-dot-yellow" />
              <div className="terminal-dot terminal-dot-green" />
              <span className="ml-2 text-[var(--term-text-dim)] text-sm">why-edge.md</span>
            </div>
            <div className="terminal-body">
              <pre className="text-sm text-[var(--term-text)] whitespace-pre-wrap">{`# Why Edge Memory Matters

Cloud-based AI has three fatal flaws for robotics:

  1. LATENCY      - 100-500ms round trip kills real-time control
  2. CONNECTIVITY - Factories, farms, vehicles lose connection
  3. PRIVACY      - Operational data leaving premises = IP risk

Shodh-memory solves all three:

  + <1us graph lookup, 34-58ms semantic search
  + Single binary, zero network dependencies
  + All data stays on-device, always`}</pre>
            </div>
          </div>

          {/* Act 3 — the turn: what on-device actually means */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-20">
            {EDGE_STATS.map((stat) => (
              <div key={stat.value} className="shadow-card p-4">
                <div className="font-mono text-[var(--term-orange)] text-xl md:text-2xl font-semibold">
                  {stat.value}
                </div>
                <div className="text-[var(--term-text-dim)] text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Act 4 — three worlds */}
          {WORLDS.map((world) => (
            <div key={world.prefix} className="mb-20">
              <div className="mb-8 max-w-3xl">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[var(--term-orange)] font-mono text-sm">
                    [{world.prefix}]
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                    {world.title}
                  </h2>
                </div>
                <p className="text-[var(--term-text-dim)] pl-12">{world.narrative}</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {world.cases.map((useCase) => (
                  <div key={useCase.title} className="shadow-window">
                    <div className="terminal-header">
                      <div className="terminal-dot terminal-dot-red" />
                      <div className="terminal-dot terminal-dot-yellow" />
                      <div className="terminal-dot terminal-dot-green" />
                      <span className="ml-2 text-[var(--term-text-dim)] text-sm">
                        {useCase.title.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "and")}.rs
                      </span>
                    </div>
                    <div className="terminal-body">
                      <div className="text-3xl mb-3">{useCase.icon}</div>
                      <h3 className="text-lg font-medium text-[var(--term-orange)] mb-2">
                        {useCase.title}
                      </h3>
                      <p className="text-[var(--term-text-dim)] text-sm mb-4">
                        {useCase.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {useCase.specs.map((spec) => (
                          <span
                            key={spec}
                            className="text-xs px-2 py-1 border border-[var(--term-border)] rounded text-[var(--term-text-dim)]"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-[var(--term-text-dim)] italic border-l-2 border-[var(--term-orange)] pl-3">
                        {useCase.example}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Act 5 — what it runs on */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[var(--term-orange)] font-mono text-sm">[04]</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-[var(--term-text)]">
                What it runs on
              </h2>
            </div>
            <p className="text-[var(--term-text-dim)] pl-12 mb-8">
              If your hardware can run Linux, it can probably run shodh-memory.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              <SpecCard
                title="Minimum"
                specs={["ARM Cortex-A53", "512MB RAM", "100MB storage", "Linux/RTOS"]}
              />
              <SpecCard
                title="Recommended"
                specs={["ARM Cortex-A72+", "2GB RAM", "1GB storage", "Linux 5.x+"]}
                highlighted
              />
              <SpecCard
                title="Tested Platforms"
                specs={["Raspberry Pi 4/5", "NVIDIA Jetson", "BeagleBone", "Industrial PCs"]}
              />
            </div>
          </div>

          {/* Act 6 — the close */}
          <div className="text-center">
            <p className="text-[var(--term-text)] text-lg mb-2">
              Your robots already work where the cloud doesn&apos;t.
            </p>
            <p className="text-[var(--term-text-dim)] mb-6">
              Now their memory can too. One binary, one command.
            </p>
            <div className="flex flex-wrap justify-center gap-5">
              <Link href="/#install" className="shadow-btn shadow-btn-primary px-6 py-2">
                $ npm install
              </Link>
              <a
                href="https://github.com/varun29ankuS/shodh-memory"
                target="_blank"
                rel="noopener noreferrer"
                className="shadow-btn px-6 py-2"
              >
                View Source
              </a>
              <Link href="/contact" className="shadow-btn px-6 py-2">
                Talk to us about a deployment
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function SpecCard({
  title,
  specs,
  highlighted,
}: {
  title: string;
  specs: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={"shadow-box p-6 rounded " + (highlighted ? "border-[var(--term-orange)]" : "")}>
      <h3
        className={
          "text-sm font-medium mb-4 " +
          (highlighted ? "text-[var(--term-orange)]" : "text-[var(--term-text)]")
        }
      >
        {title}
      </h3>
      <ul className="space-y-2">
        {specs.map((spec) => (
          <li key={spec} className="text-sm text-[var(--term-text-dim)] flex items-center gap-2">
            <span className="text-[var(--term-green)]">+</span>
            {spec}
          </li>
        ))}
      </ul>
    </div>
  );
}

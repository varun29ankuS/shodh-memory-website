import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClientWrapper } from "@/components/ClientWrapper";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ChatWidget } from "@/components/ChatWidget";
import { VERSION } from "@/lib/version";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shodh-memory.com"),
  title: {
    default: "shodh-memory | A Cognitive Brain for AI Agents",
    template: "%s | shodh-memory",
  },
  description:
    "Persistent memory for AI agents that learns with use. Cognitive memory system with Hebbian learning, knowledge graphs, and 3-tier architecture. Runs offline on edge devices. Open-source Rust binary, no cloud required.",
  keywords: [
    "AI brain",
    "AI memory",
    "AI agent memory",
    "cognitive brain",
    "cognitive memory",
    "persistent memory",
    "AI agents",
    "LLM memory",
    "LLM context",
    "MCP server",
    "MCP memory",
    "Model Context Protocol",
    "Hebbian learning",
    "edge AI",
    "edge AI memory",
    "offline AI",
    "local AI",
    "local-first AI",
    "vector database",
    "knowledge graph",
    "Rust AI",
    "Claude memory",
    "Claude Code memory",
    "Cursor memory",
    "robotics memory",
    "autonomous agent memory",
    "memory for AI",
    "AI long-term memory",
    "semantic memory",
    "episodic memory",
    "memory decay",
    "forgetting curves",
    "shodh",
    "shodh-memory",
    "mem0 alternative",
    "memgpt alternative",
    "zep alternative",
    "cognee alternative",
    "AI memory system",
    "memory for AI agents",
    "agent memory system",
    "AI agent long-term memory",
    "neuroscience-inspired AI",
    "Hopfield network memory",
    "biologically plausible AI",
    "memory MCP server",
  ],
  authors: [{ name: "Shodh", url: "https://www.shodh-memory.com" }],
  creator: "Shodh",
  publisher: "Shodh",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.shodh-memory.com",
    siteName: "shodh-memory",
    title: "shodh-memory | A Cognitive Brain for AI Agents",
    description:
      "Persistent memory for AI agents. Cognitive memory with Hebbian learning, knowledge graphs, and memory decay. Open-source, runs offline.",
    images: [
      {
        url: "https://raw.githubusercontent.com/varun29ankuS/shodh-memory/main/assets/splash.jpg",
        width: 1200,
        height: 630,
        alt: "shodh-memory - Cognitive Memory for AI Agents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "shodh-memory | A Cognitive Brain for AI Agents",
    description:
      "Persistent memory for AI agents. Cognitive memory with Hebbian learning, knowledge graphs, and memory decay. Open-source, runs offline.",
    images: ["https://raw.githubusercontent.com/varun29ankuS/shodh-memory/main/assets/splash.jpg"],
    creator: "@shodh_memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "shodh-memory",
                applicationCategory: "DeveloperApplication",
                applicationSubCategory: "AI Memory System",
                operatingSystem: "Windows, macOS, Linux, ARM64",
                description:
                  "Persistent cognitive memory for AI agents. Neuroscience-inspired memory system with Hebbian learning, 3-tier architecture (Cowan's model), knowledge graphs with spreading activation, and biologically plausible decay curves. Runs offline on edge devices.",
                url: "https://www.shodh-memory.com",
                downloadUrl: "https://www.npmjs.com/package/@shodh/memory-mcp",
                softwareVersion: VERSION,
                license: "https://opensource.org/licenses/Apache-2.0",
                programmingLanguage: ["Rust", "TypeScript", "Python"],
                codeRepository: "https://github.com/varun29ankuS/shodh-memory",
                author: {
                  "@type": "Organization",
                  name: "Shodh",
                  url: "https://www.shodh-rag.com",
                },
                offers: {
                  "@type": "Offer",
                  price: "0",
                  priceCurrency: "USD",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "shodh-memory",
                url: "https://www.shodh-memory.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.shodh-memory.com/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Shodh",
                url: "https://www.shodh-rag.com",
                logo: "https://www.shodh-memory.com/logo.png",
                sameAs: [
                  "https://github.com/varun29ankuS/shodh-memory",
                  "https://www.npmjs.com/package/@shodh/memory-mcp",
                  "https://crates.io/crates/shodh-memory",
                  "https://pypi.org/project/shodh-memory/",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How is shodh-memory different from a vector database?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Vector databases give you similarity search. Shodh-memory gives you cognition — memories strengthen when accessed together (Hebbian learning), decay naturally over time (power-law forgetting), and form associative networks via a knowledge graph. It's the difference between storage and memory.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Does shodh-memory require an internet connection?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No. Shodh-memory runs 100% offline. Embeddings, vector index, knowledge graph — everything runs locally in a single ~30MB binary. Perfect for edge devices, air-gapped systems, or anywhere you need data privacy.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can shodh-memory run on a Raspberry Pi?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Yes. Shodh-memory is designed for edge deployment. It runs on Raspberry Pi Zero, Jetson Nano, industrial PCs, and other resource-constrained devices. Graph lookups are under 1 microsecond.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is Hebbian learning in AI agent memory?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Hebbian learning is a neuroscience principle: neurons that fire together wire together. In shodh-memory, when memories are accessed together, their connection strengthens. When memories compete, interference effects occur. This is how biological brains work, applied to AI agent memory.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What languages and frameworks does shodh-memory support?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The core is Rust. We provide: an MCP server (for Claude, Cursor, and other AI agents), Python bindings (via PyO3/maturin), and a REST API. The Rust crate can be embedded directly in your application.",
                    },
                  },
                ],
              },
            ]),
          }}
        />
      </head>
      <body className={`${jetbrainsMono.className} scanline`}>
        <AnnouncementBar />
        <div className="interference-bands" aria-hidden="true" />
        <ClientWrapper>
          {children}
        </ClientWrapper>
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}

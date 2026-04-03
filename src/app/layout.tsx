import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Script from "next/script";
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
    types: {
      "application/rss+xml": "https://www.shodh-memory.com/blog/feed.xml",
    },
  },
  category: "technology",
  other: {
    "citation_title":
      "Shodh-Memory: A Cognitive Memory System for Edge-Native AI Agents",
    "citation_author": "Varun Sharma",
    "citation_publication_date": "2026/02",
    "citation_doi": "10.5281/zenodo.18668709",
    "citation_pdf_url": "https://www.shodh-memory.com/shodh_memory.pdf",
    "citation_abstract":
      "Current AI agent memory systems depend on cloud infrastructure, imposing latency and connectivity constraints incompatible with edge deployment. We present Shodh-Memory, a single-binary cognitive memory system that composes three established cognitive science models into a unified architecture for edge-native AI agents.",
    "citation_language": "en",
    "citation_keywords":
      "AI agent memory, cognitive architecture, Hebbian learning, edge AI, memory decay, knowledge graph, spreading activation",
    "citation_technical_report_institution": "Shodh Team",
  },
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
                url: "https://www.shodh-memory.com",
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
                      text: "No. Shodh-memory runs 100% offline. The embeddings, vector index, knowledge graph — everything runs locally. Perfect for edge devices, air-gapped systems, or anywhere you need data privacy.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What's the memory overhead?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "The binary is ~30MB. Models add ~50MB (22MB MiniLM embeddings + 14MB NER model + 14MB ONNX runtime). Each memory entry uses roughly 2-5KB. A system with 10,000 memories uses approximately 50MB of storage.",
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
                    name: "How does memory decay work?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Shodh-memory uses a hybrid model: exponential decay for the first 3 days (consolidation phase), then power-law decay for long-term retention. Memories accessed 10+ times become potentiated and decay 10x slower. Based on Wixted & Ebbesen (1991).",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is Hebbian learning in AI agent memory?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Cells that fire together, wire together. When memories are accessed together, their connection strengthens. When memories compete, interference effects occur. It's how biological brains work, now applied to AI agent memory.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Is there a cloud version?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "No, and that's intentional. Shodh-memory is built for local-first, privacy-preserving AI. Your agent's memories stay on your hardware. If you need multi-device sync, you can replicate the RocksDB storage yourself.",
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
                  {
                    "@type": "Question",
                    name: "How do I contribute?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Check out github.com/varun29ankuS/shodh-memory. Open issues, submit PRs, or join discussions. The codebase is well-documented with 688+ tests. All constants have neuroscience citations.",
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
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "w5s6l8nmmk");
            `,
          }}
        />
      </body>
    </html>
  );
}

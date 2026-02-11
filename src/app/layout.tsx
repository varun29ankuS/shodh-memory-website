import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClientWrapper } from "@/components/ClientWrapper";
import { AnnouncementBar } from "@/components/AnnouncementBar";
import { ChatWidget } from "@/components/ChatWidget";
import { VERSION } from "@/lib/version";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shodh-memory.com"),
  title: {
    default: "shodh-memory | A Cognitive Brain for AI Agents",
    template: "%s | shodh-memory",
  },
  description:
    "A cognitive brain for AI agents. Memory that learns with use — Hebbian learning, 3-tier architecture, runs offline on edge devices. Single ~30MB binary, no cloud required.",
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
    "AI memory system",
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
      "A brain for your AI agent. Memory that learns with use. Hebbian learning, runs offline, single binary.",
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
      "A brain for your AI agent. Memory that learns with use. Runs offline, single binary.",
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
                  "Persistent cognitive memory for AI agents. Hebbian learning, 3-tier memory architecture, knowledge graph. Runs offline, single binary.",
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

import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shodh-memory.com"),
  title: {
    default: "shodh-memory | Persistent Cognitive Memory for AI Agents",
    template: "%s | shodh-memory",
  },
  description:
    "A neuroscience-grounded memory system that learns with use. Hebbian learning, 3-tier architecture, runs offline on edge devices. Single ~15MB binary, no cloud required.",
  keywords: [
    "AI memory",
    "cognitive memory",
    "AI agents",
    "LLM memory",
    "MCP server",
    "Hebbian learning",
    "edge AI",
    "offline AI",
    "vector database",
    "knowledge graph",
    "Rust",
    "Claude",
    "robotics memory",
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
    title: "shodh-memory | Persistent Cognitive Memory for AI Agents",
    description:
      "Memory that learns with use. Hebbian learning, runs offline, single binary. Not another vector database.",
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
    title: "shodh-memory | Cognitive Memory for AI Agents",
    description:
      "Memory that learns with use. Hebbian learning, runs offline, single binary.",
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
      <body className={`${jetbrainsMono.className} scanline`}>
        {children}
      </body>
    </html>
  );
}

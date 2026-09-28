import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Architecture } from "@/components/Architecture";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";

// Below-fold client components — defer JS hydration, still SSR the HTML
const WhyShodh = dynamic(() => import("@/components/WhyShodh").then(m => ({ default: m.WhyShodh })), { ssr: true });
const Durability = dynamic(() => import("@/components/Durability").then(m => ({ default: m.Durability })), { ssr: true });
const Installation = dynamic(() => import("@/components/Installation").then(m => ({ default: m.Installation })), { ssr: true });
const Demo = dynamic(() => import("@/components/Demo").then(m => ({ default: m.Demo })), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ").then(m => ({ default: m.FAQ })), { ssr: true });

export const metadata: Metadata = {
  title: "shodh-memory — Persistent Memory for AI Agents. Zero LLM Calls.",
  description:
    "Persistent memory for AI agents with zero LLM calls in the loop. Hebbian learning, decay curves, and knowledge graphs as microsecond algorithms — a single 30MB Rust binary that runs offline on anything from servers to Raspberry Pi.",
  openGraph: {
    title: "shodh-memory — Persistent Memory for AI Agents. Zero LLM Calls.",
    description:
      "Memory that learns like a brain: Hebbian strengthening, natural decay, spreading activation. No cloud, no API keys, no per-memory bill.",
    url: "https://www.shodh-memory.com",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Reveal><WhyShodh /></Reveal>
        <Features />
        <Reveal><Architecture /></Reveal>
        <Reveal><Durability /></Reveal>
        <Reveal><Demo /></Reveal>
        <Reveal><Installation /></Reveal>
        <Reveal><FAQ /></Reveal>
      </main>
      <Footer />
    </div>
  );
}

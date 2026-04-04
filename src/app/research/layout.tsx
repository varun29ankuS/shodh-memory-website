import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Citations",
  description:
    "The neuroscience research behind shodh-memory's cognitive architecture. Papers on memory decay, Hebbian learning, and spreading activation.",
  openGraph: {
    title: "Research & Citations | shodh-memory",
    description:
      "The neuroscience research behind shodh-memory's cognitive architecture. Papers on memory decay, Hebbian learning, and spreading activation.",
    url: "https://www.shodh-memory.com/research",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/research",
  },
  other: {
    "citation_title":
      "Shodh-Memory: A Cognitive Memory System for Edge-Native AI Agents",
    "citation_author": "Varun Sharma",
    "citation_publication_date": "2026/02",
    "citation_doi": "10.5281/zenodo.18668709",
    "citation_pdf_url": "https://www.shodh-memory.com/shodh_memory.pdf",
    "citation_abstract":
      "Current AI agent memory systems depend on cloud infrastructure, imposing latency and connectivity constraints incompatible with edge deployment. We present Shodh-Memory, a single-binary cognitive memory system that composes three established cognitive science models—Hebbian synaptic plasticity, piecewise hybrid decay following Wixted's forgetting model, and Anderson's spreading activation—into a unified architecture for edge-native AI agents.",
    "citation_language": "en",
    "citation_keywords":
      "AI agent memory, cognitive architecture, Hebbian learning, edge AI, memory decay, neuromorphic computing, spiking neural networks, synaptic plasticity, spreading activation",
    "citation_technical_report_institution": "Shodh Team",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

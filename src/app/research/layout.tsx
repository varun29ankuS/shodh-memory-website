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
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

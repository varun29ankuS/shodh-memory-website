import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — shodh-memory",
  description:
    "Get in touch with the shodh-memory team. Questions about enterprise deployments, partnerships, integrations, or neuroscience-inspired AI memory.",
  openGraph: {
    title: "Contact — shodh-memory",
    description:
      "Get in touch with the shodh-memory team. Questions about enterprise deployments, partnerships, integrations, or neuroscience-inspired AI memory.",
    url: "https://www.shodh-memory.com/contact",
    siteName: "shodh-memory",
  },
  alternates: {
    canonical: "https://www.shodh-memory.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

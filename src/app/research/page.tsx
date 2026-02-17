"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface Paper {
  authors: string;
  year: number;
  title: string;
  journal: string;
  doi: string | null;
  usage: string;
  bibtexKey: string;
}

interface Category {
  title: string;
  description: string;
  blogSlug: string;
  blogLabel: string;
  ascii: string[];
  papers: Paper[];
}

const RESEARCH_CATEGORIES: Category[] = [
  {
    title: "Memory Decay & Forgetting",
    description: "How memories fade over time and why power-law decay matters",
    blogSlug: "memory-decay-forgetting-curves",
    blogLabel: "The Math Behind Remembering",
    ascii: [
      "  strength",
      "  100% |\u2588\u2588\u2588\u2588",
      "   80% |\u2588\u2588\u2588\u2588\u2588\u2588",
      "   60% |   \u2588\u2588\u2588\u2588\u2588\u2593\u2593",
      "   40% |      \u2588\u2588\u2588\u2593\u2593\u2593\u2592\u2592",
      "   20% |         \u2593\u2593\u2592\u2592\u2592\u2591\u2591\u2591\u2591",
      "   10% |            \u2592\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591",
      "       +\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "       0   1d   3d   7d   30d",
      "         exponential \u2192 power-law",
    ],
    papers: [
      {
        authors: "Wixted, J.T. & Ebbesen, E.B.",
        year: 1991,
        title: "On the Form of Forgetting",
        journal: "Psychological Science, 2(6), 409-415",
        doi: "10.1111/j.1467-9280.1991.tb00175.x",
        usage: "Foundation for our hybrid decay model. Demonstrated that forgetting follows power-law, not exponential, over long periods.",
        bibtexKey: "wixted1991forgetting",
      },
      {
        authors: "Wixted, J.T.",
        year: 2004,
        title: "The Psychology and Neuroscience of Forgetting",
        journal: "Annual Review of Psychology, 55, 235-269",
        doi: "10.1146/annurev.psych.55.090902.141555",
        usage: "Comprehensive review linking psychological forgetting curves to neural consolidation processes. Informed our 3-day crossover point.",
        bibtexKey: "wixted2004forgetting",
      },
      {
        authors: "Anderson, J.R. & Schooler, L.J.",
        year: 1991,
        title: "Reflections of the Environment in Memory",
        journal: "Psychological Science, 2(6), 396-408",
        doi: "10.1111/j.1467-9280.1991.tb00174.x",
        usage: "Showed that memory decay mirrors environmental statistics. Justifies our adaptive decay rates.",
        bibtexKey: "anderson1991environment",
      },
    ],
  },
  {
    title: "Hebbian Learning & Synaptic Plasticity",
    description: "Fire together, wire together\u2014the basis of associative memory",
    blogSlug: "hebbian-learning-ai-agents",
    blogLabel: "Neurons That Fire Together Wire Together",
    ascii: [
      "  before:          after:",
      "",
      "  \u25CB \u2500\u2500\u2500 \u25CB          \u25CF \u2550\u2550\u2550 \u25CF",
      "  |       |          |       |",
      "  \u25CB \u2500\u2500\u2500 \u25CB          \u25CF \u2550\u2550\u2550 \u25CF",
      "",
      "  weak edges       strengthened",
      "  (0.10)            (+0.025/co-access)",
      "",
      "  co-activation \u2192 stronger bonds",
    ],
    papers: [
      {
        authors: "Bi, G.Q. & Poo, M.M.",
        year: 1998,
        title: "Synaptic Modifications in Cultured Hippocampal Neurons",
        journal: "Journal of Neuroscience, 18(24), 10464-10472",
        doi: "10.1523/JNEUROSCI.18-24-10464.1998",
        usage: "Measured actual synaptic strengthening rates (~3-7% per activation). Calibrated our HEBBIAN_BOOST_HELPFUL constant.",
        bibtexKey: "bi1998synaptic",
      },
      {
        authors: "Hebb, D.O.",
        year: 1949,
        title: "The Organization of Behavior",
        journal: "New York: Wiley",
        doi: null,
        usage: "The foundational work on associative learning. 'Cells that fire together, wire together' is the core principle of our knowledge graph.",
        bibtexKey: "hebb1949organization",
      },
    ],
  },
  {
    title: "Spreading Activation",
    description: "How activation spreads through associative networks",
    blogSlug: "knowledge-graph-spreading-activation",
    blogLabel: "How Context Surfaces",
    ascii: [
      "          \u25CB",
      "         / \\",
      "        \u25CB   \u25CB \u2190 hop 2 (0.49)",
      "       / \\   \\",
      "      \u25CF   \u25CF   \u25CB \u2190 hop 1 (0.70)",
      "       \\ /",
      "        \u2605 \u2190 query node (1.00)",
      "",
      "  activation = weight \u00D7 0.7^hops",
      "  surfaces related context",
    ],
    papers: [
      {
        authors: "Anderson, J.R. & Pirolli, P.L.",
        year: 1984,
        title: "Spread of Activation",
        journal: "Journal of Experimental Psychology: Learning, Memory, and Cognition, 10(4), 791-798",
        doi: "10.1037/0278-7393.10.4.791",
        usage: "Defined the mathematical model for spreading activation. Our SPREADING_DECAY_RATE and hop limits come from this work.",
        bibtexKey: "anderson1984spreading",
      },
      {
        authors: "Siew, C.S.Q.",
        year: 2019,
        title: "spreadr: An R package for simulating spreading activation in a network",
        journal: "Behavior Research Methods, 51, 910-929",
        doi: "10.3758/s13428-018-1186-5",
        usage: "Modern implementation of spreading activation. Validated our importance-weighted decay approach.",
        bibtexKey: "siew2019spreadr",
      },
    ],
  },
  {
    title: "Sleep & Memory Consolidation",
    description: "How replay during rest strengthens memory traces",
    blogSlug: "long-term-potentiation-code",
    blogLabel: "Making Memories Permanent",
    ascii: [
      "  awake        consolidation     stable",
      "",
      "  \u2591\u2591\u2591\u2592\u2591\u2591\u2592\u2591   \u2192   \u2592\u2593\u2593\u2593\u2593\u2592\u2592\u2591   \u2192   \u2588\u2588\u2588\u2588\u2593\u2592\u2591\u2591",
      "  fragile         replay         durable",
      "  traces          cycles         engrams",
      "",
      "  hippocampal replay \u2192 cortical storage",
      "  (our maintenance cycles mirror this)",
    ],
    papers: [
      {
        authors: "Rasch, B. & Born, J.",
        year: 2013,
        title: "About Sleep's Role in Memory",
        journal: "Physiological Reviews, 93(2), 681-766",
        doi: "10.1152/physrev.00032.2012",
        usage: "Comprehensive review of hippocampal replay during sleep. Inspired our memory replay maintenance cycles.",
        bibtexKey: "rasch2013sleep",
      },
      {
        authors: "LaBar, K.S. & Cabeza, R.",
        year: 2006,
        title: "Cognitive Neuroscience of Emotional Memory",
        journal: "Nature Reviews Neuroscience, 7, 54-64",
        doi: "10.1038/nrn1825",
        usage: "How emotional arousal enhances memory. Our REPLAY_AROUSAL_THRESHOLD prioritizes emotional memories.",
        bibtexKey: "labar2006emotional",
      },
    ],
  },
  {
    title: "Interference & Competition",
    description: "How similar memories compete and interfere",
    blogSlug: "why-not-just-vector-search",
    blogLabel: "Why Vector Search Alone Isn't Enough",
    ascii: [
      "  memory A [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2593\u2593]  sim=0.92",
      "  memory B [\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2593\u2592]  sim=0.95",
      "            \u2502",
      "            \u25BC",
      "  retrieval competition: B wins",
      "  A suppressed by interference",
      "",
      "  threshold > 0.85 \u2192 inhibition",
      "  (prevents redundant recall)",
    ],
    papers: [
      {
        authors: "Postman, L. & Underwood, B.J.",
        year: 1973,
        title: "Critical Issues in Interference Theory",
        journal: "Memory & Cognition, 1, 19-40",
        doi: "10.3758/BF03198064",
        usage: "Defined retroactive and proactive interference. Our INTERFERENCE_SIMILARITY_THRESHOLD detects competing memories.",
        bibtexKey: "postman1973interference",
      },
      {
        authors: "Anderson, M.C. & Neely, J.H.",
        year: 1996,
        title: "Interference and Inhibition in Memory Retrieval",
        journal: "In E.L. Bjork & R.A. Bjork (Eds.), Memory (pp. 237-313). Academic Press",
        doi: null,
        usage: "Explained inhibitory mechanisms in retrieval. Informed our competition factor for similar memories.",
        bibtexKey: "anderson1996inhibition",
      },
    ],
  },
  {
    title: "Cognitive Architecture",
    description: "Computational models of human memory",
    blogSlug: "three-tier-memory-architecture",
    blogLabel: "From Cowan to Code",
    ascii: [
      "  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510",
      "  \u2502  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510  \u2502",
      "  \u2502  \u2502  \u250C\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510  \u2502  \u2502",
      "  \u2502  \u2502  \u2502 Working \u2502  \u2502  \u2502  \u2190 seconds",
      "  \u2502  \u2502  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518  \u2502  \u2502",
      "  \u2502  \u2502   Session      \u2502  \u2502  \u2190 hours",
      "  \u2502  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518  \u2502",
      "  \u2502     Long-Term Memory    \u2502  \u2190 permanent",
      "  \u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518",
      "    Cowan's embedded processes",
    ],
    papers: [
      {
        authors: "Cowan, N.",
        year: 1988,
        title: "Evolving Conceptions of Memory Storage, Selective Attention, and Their Mutual Constraints",
        journal: "Psychological Bulletin, 104(2), 163-191",
        doi: "10.1037/0033-2909.104.2.163",
        usage: "The foundational paper for our 3-tier architecture. Cowan's model distinguishes activated long-term memory from the focus of attention\u2014our Working \u2192 Session \u2192 LongTerm tiers map directly to this.",
        bibtexKey: "cowan1988storage",
      },
      {
        authors: "Cowan, N.",
        year: 2001,
        title: "The Magical Number 4 in Short-Term Memory",
        journal: "Behavioral and Brain Sciences, 24(1), 87-114",
        doi: "10.1017/S0140525X01003922",
        usage: "Working memory capacity limits. Refined our understanding of tier boundaries and why memories must be consolidated.",
        bibtexKey: "cowan2001magical",
      },
      {
        authors: "Anderson, J.R.",
        year: 2007,
        title: "How Can the Human Mind Occur in the Physical Universe?",
        journal: "Oxford University Press",
        doi: "10.1093/acprof:oso/9780195324259.001.0001",
        usage: "ACT-R cognitive architecture. Our base-level activation and decay equations derive from ACT-R.",
        bibtexKey: "anderson2007actr",
      },
      {
        authors: "McGaugh, J.L.",
        year: 2000,
        title: "Memory\u2014a Century of Consolidation",
        journal: "Science, 287(5451), 248-251",
        doi: "10.1126/science.287.5451.248",
        usage: "Landmark review of memory consolidation. Our TIER_PROMOTION_WORKING_AGE_SECS (30 min) is based on the synaptic consolidation window described here.",
        bibtexKey: "mcgaugh2000consolidation",
      },
      {
        authors: "Dudai, Y.",
        year: 2004,
        title: "The Neurobiology of Consolidations, or, How Stable Is the Engram?",
        journal: "Annual Review of Psychology, 55, 51-86",
        doi: "10.1146/annurev.psych.55.090902.141555",
        usage: "Detailed analysis of consolidation timelines. Informed our 24-hour session \u2192 long-term promotion threshold.",
        bibtexKey: "dudai2004engram",
      },
    ],
  },
  {
    title: "Graph-Enhanced Retrieval",
    description: "Combining knowledge graphs with vector search",
    blogSlug: "why-not-just-vector-search",
    blogLabel: "Why Vector Search Alone Isn't Enough",
    ascii: [
      "  query \u2192 [semantic] \u2500\u2500\u2510",
      "          [keyword ] \u2500\u2500\u2524 RRF",
      "          [graph   ] \u2500\u2500\u2524 fusion \u2192 results",
      "          [temporal] \u2500\u2500\u2518",
      "",
      "  multi-signal retrieval:",
      "  vector + BM25 + graph + recency",
      "  beats any single signal alone",
    ],
    papers: [
      {
        authors: "Edge et al.",
        year: 2024,
        title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization",
        journal: "arXiv:2404.16130",
        doi: "10.48550/arXiv.2404.16130",
        usage: "GraphRAG improves retrieval by 13.1% over vector-only. Validated our hybrid semantic+graph approach.",
        bibtexKey: "edge2024graphrag",
      },
      {
        authors: "Lioma, C. & Ounis, I.",
        year: 2006,
        title: "A Syntactically-Based Query Reformulation Technique for Information Retrieval",
        journal: "Information Processing & Management, 42(5), 1332-1363",
        doi: "10.1016/j.ipm.2006.02.003",
        usage: "Information content weighting for query terms. Our IC_NOUN, IC_ADJECTIVE, IC_VERB weights derive from this.",
        bibtexKey: "lioma2006syntactic",
      },
    ],
  },
];

function paperToBibtex(paper: Paper): string {
  const type = paper.journal.includes("arXiv") ? "misc" : paper.journal.includes("Press") || paper.journal.includes("Wiley") ? "book" : "article";
  let bib = `@${type}{${paper.bibtexKey},\n`;
  bib += `  author    = {${paper.authors.replace(/ & /g, " and ")}},\n`;
  bib += `  title     = {${paper.title}},\n`;
  if (type === "article") {
    const parts = paper.journal.split(",");
    bib += `  journal   = {${parts[0].trim()}},\n`;
    if (parts.length > 1) bib += `  volume    = {${parts.slice(1).join(",").trim()}},\n`;
  } else if (type === "book") {
    bib += `  publisher = {${paper.journal}},\n`;
  } else {
    bib += `  note      = {${paper.journal}},\n`;
  }
  bib += `  year      = {${paper.year}},\n`;
  if (paper.doi) bib += `  doi       = {${paper.doi}},\n`;
  bib += `}`;
  return bib;
}

function allBibtex(): string {
  const entries: string[] = [];
  for (const cat of RESEARCH_CATEGORIES) {
    entries.push(`% --- ${cat.title} ---`);
    for (const paper of cat.papers) {
      entries.push(paperToBibtex(paper));
    }
    entries.push("");
  }
  return entries.join("\n");
}

const SHODH_BIBTEX = `@software{sharma2026shodh,
  author    = {Sharma, Varun},
  title     = {shodh-memory: Cognitive Memory for AI Agents},
  year      = {2026},
  url       = {https://github.com/varun29ankuS/shodh-memory},
  doi       = {10.5281/zenodo.18668709},
  version   = {0.1.80},
  license   = {Apache-2.0},
  note      = {Hebbian learning, 3-tier architecture (Cowan 2001), hybrid decay (Wixted 2004), spreading activation (Anderson 1984)},
}`;

const SHODH_APA = `Sharma, V. (2026). shodh-memory: Cognitive memory for AI agents (Version 0.1.80) [Computer software]. https://doi.org/10.5281/zenodo.18668709`;

const SHODH_IEEE = `V. Sharma, "shodh-memory: Cognitive memory for AI agents," version 0.1.80, 2026. doi: 10.5281/zenodo.18668709`;

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs px-2 py-1 border border-[var(--term-border)] text-[var(--term-text-dim)] hover:text-[var(--term-orange)] hover:border-[var(--term-orange)] transition-colors rounded"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

function DownloadBibButton() {
  const handleDownload = () => {
    const content = `% shodh-memory: Research Citations\n% Generated from https://www.shodh-memory.com/research\n\n${SHODH_BIBTEX}\n\n${allBibtex()}`;
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shodh-memory-citations.bib";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      className="text-sm px-4 py-2 border border-[var(--term-orange)] text-[var(--term-orange)] hover:bg-[var(--term-orange)] hover:text-[var(--term-bg)] transition-colors rounded"
    >
      Download all citations (.bib)
    </button>
  );
}

export default function ResearchPage() {
  const totalPapers = RESEARCH_CATEGORIES.reduce((sum, cat) => sum + cat.papers.length, 0);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-green)] font-mono">$</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                Research & Citations
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] leading-relaxed max-w-2xl">
              shodh-memory is grounded in decades of cognitive psychology and neuroscience research.
              Every constant in our codebase has a citation. Here are the papers that shaped our architecture.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-5 mb-14">
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">{totalPapers}</div>
              <div className="text-xs text-[var(--term-text-dim)]">Papers cited</div>
            </div>
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">{RESEARCH_CATEGORIES.length}</div>
              <div className="text-xs text-[var(--term-text-dim)]">Research areas</div>
            </div>
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">200+</div>
              <div className="text-xs text-[var(--term-text-dim)]">Tuned constants</div>
            </div>
          </div>

          {/* Cite shodh-memory */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-green)] font-mono">$</span>
              <h2 className="text-xl font-semibold text-[var(--term-text)]">Cite shodh-memory</h2>
            </div>
            <p className="text-[var(--term-text-dim)] text-sm mb-6">
              If you use shodh-memory in your research, please cite it using one of the formats below.
            </p>

            {/* BibTeX */}
            <div className="shadow-window rounded mb-4">
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red" />
                <div className="terminal-dot terminal-dot-yellow" />
                <div className="terminal-dot terminal-dot-green" />
                <span className="ml-2 text-[var(--term-text-dim)] text-xs">BibTeX</span>
                <span className="ml-auto">
                  <CopyButton text={SHODH_BIBTEX} label="Copy" />
                </span>
              </div>
              <div className="terminal-body p-4">
                <pre className="text-[var(--term-green)] text-xs leading-relaxed font-mono overflow-x-auto">
                  {SHODH_BIBTEX}
                </pre>
              </div>
            </div>

            {/* APA & IEEE */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="shadow-box rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--term-text-dim)] font-mono">APA 7th</span>
                  <CopyButton text={SHODH_APA} label="Copy" />
                </div>
                <p className="text-xs text-[var(--term-text)] leading-relaxed">{SHODH_APA}</p>
              </div>
              <div className="shadow-box rounded p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[var(--term-text-dim)] font-mono">IEEE</span>
                  <CopyButton text={SHODH_IEEE} label="Copy" />
                </div>
                <p className="text-xs text-[var(--term-text)] leading-relaxed">{SHODH_IEEE}</p>
              </div>
            </div>

            <div className="flex gap-4 items-center flex-wrap">
              <DownloadBibButton />
              <a
                href="https://doi.org/10.5281/zenodo.18668709"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 border border-[var(--term-cyan)] text-[var(--term-cyan)] hover:bg-[var(--term-cyan)] hover:text-[var(--term-bg)] transition-colors rounded"
              >
                DOI: 10.5281/zenodo.18668709
              </a>
              <a
                href="https://github.com/varun29ankuS/shodh-memory/blob/main/CITATION.cff"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--term-text-dim)] hover:text-[var(--term-orange)] transition-colors"
              >
                View CITATION.cff on GitHub &rarr;
              </a>
            </div>
          </section>

          {/* Research categories */}
          {RESEARCH_CATEGORIES.map((category, i) => (
            <section key={i} className="mb-16">
              {/* Category header */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--term-orange)] font-mono text-sm">[{String(i + 1).padStart(2, "0")}]</span>
                <h2 className="text-xl font-semibold text-[var(--term-text)]">{category.title}</h2>
              </div>
              <p className="text-[var(--term-text-dim)] text-sm mb-4 pl-10">{category.description}</p>

              {/* ASCII art diagram */}
              <div className="shadow-window rounded mb-6">
                <div className="terminal-header">
                  <div className="terminal-dot terminal-dot-red" />
                  <div className="terminal-dot terminal-dot-yellow" />
                  <div className="terminal-dot terminal-dot-green" />
                  <span className="ml-2 text-[var(--term-text-dim)] text-xs">
                    {category.title.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}.viz
                  </span>
                </div>
                <div className="terminal-body p-4 md:p-5">
                  <pre className="text-[var(--term-green)] text-xs md:text-sm leading-relaxed font-mono overflow-x-auto">
                    {category.ascii.join("\n")}
                  </pre>
                </div>
              </div>

              {/* Blog deep-dive link */}
              <div className="pl-10 mb-6">
                <Link
                  href={`/blog/${category.blogSlug}`}
                  className="text-sm text-[var(--term-orange)] hover:underline"
                >
                  Read the deep-dive: {category.blogLabel} &rarr;
                </Link>
              </div>

              {/* Papers */}
              <div className="space-y-4">
                {category.papers.map((paper, j) => (
                  <div key={j} className="shadow-box rounded p-5">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-[var(--term-text)] font-medium leading-snug text-sm">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-2 shrink-0">
                        <CopyButton text={paperToBibtex(paper)} label="BibTeX" />
                        <span className="text-[var(--term-orange)] font-mono text-sm">
                          {paper.year}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-[var(--term-text-dim)] mb-3">
                      {paper.authors}
                      <br />
                      <span className="italic">{paper.journal}</span>
                    </div>
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-[var(--term-cyan)] hover:underline"
                      >
                        DOI: {paper.doi}
                      </a>
                    )}
                    <div className="mt-3 pt-3 border-t border-[var(--term-border)]/30">
                      <div className="text-xs text-[var(--term-text-dim)]">
                        <span className="text-[var(--term-green)]">How we use it:</span>{" "}
                        {paper.usage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Footer note */}
          <div className="shadow-callout p-6 mt-8">
            <h3 className="text-[var(--term-text)] font-medium mb-2">
              Open Science, Open Source
            </h3>
            <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
              All {totalPapers} citations and 200+ tunable constants are documented in{" "}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/blob/main/src/constants.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--term-orange)] hover:underline"
              >
                src/constants.rs
              </a>{" "}
              with full justification. We believe AI memory systems should be grounded
              in science, not magic numbers.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

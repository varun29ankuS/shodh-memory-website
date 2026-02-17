import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

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

const RESEARCH_CATEGORIES = [
  {
    title: "Memory Decay & Forgetting",
    description: "How memories fade over time and why power-law decay matters",
    papers: [
      {
        authors: "Wixted, J.T. & Ebbesen, E.B.",
        year: 1991,
        title: "On the Form of Forgetting",
        journal: "Psychological Science, 2(6), 409-415",
        doi: "10.1111/j.1467-9280.1991.tb00175.x",
        usage:
          "Foundation for our hybrid decay model. Demonstrated that forgetting follows power-law, not exponential, over long periods.",
      },
      {
        authors: "Wixted, J.T.",
        year: 2004,
        title: "The Psychology and Neuroscience of Forgetting",
        journal: "Annual Review of Psychology, 55, 235-269",
        doi: "10.1146/annurev.psych.55.090902.141555",
        usage:
          "Comprehensive review linking psychological forgetting curves to neural consolidation processes. Informed our 3-day crossover point.",
      },
      {
        authors: "Anderson, J.R. & Schooler, L.J.",
        year: 1991,
        title: "Reflections of the Environment in Memory",
        journal: "Psychological Science, 2(6), 396-408",
        doi: "10.1111/j.1467-9280.1991.tb00174.x",
        usage:
          "Showed that memory decay mirrors environmental statistics. Justifies our adaptive decay rates.",
      },
    ],
  },
  {
    title: "Hebbian Learning & Synaptic Plasticity",
    description: "Fire together, wire together—the basis of associative memory",
    papers: [
      {
        authors: "Bi, G.Q. & Poo, M.M.",
        year: 1998,
        title: "Synaptic Modifications in Cultured Hippocampal Neurons",
        journal: "Journal of Neuroscience, 18(24), 10464-10472",
        doi: "10.1523/JNEUROSCI.18-24-10464.1998",
        usage:
          "Measured actual synaptic strengthening rates (~3-7% per activation). Calibrated our HEBBIAN_BOOST_HELPFUL constant.",
      },
      {
        authors: "Hebb, D.O.",
        year: 1949,
        title: "The Organization of Behavior",
        journal: "New York: Wiley",
        doi: null,
        usage:
          "The foundational work on associative learning. 'Cells that fire together, wire together' is the core principle of our knowledge graph.",
      },
    ],
  },
  {
    title: "Spreading Activation",
    description: "How activation spreads through associative networks",
    papers: [
      {
        authors: "Anderson, J.R. & Pirolli, P.L.",
        year: 1984,
        title: "Spread of Activation",
        journal: "Journal of Experimental Psychology: Learning, Memory, and Cognition, 10(4), 791-798",
        doi: "10.1037/0278-7393.10.4.791",
        usage:
          "Defined the mathematical model for spreading activation. Our SPREADING_DECAY_RATE and hop limits come from this work.",
      },
      {
        authors: "Siew, C.S.Q.",
        year: 2019,
        title: "spreadr: An R package for simulating spreading activation in a network",
        journal: "Behavior Research Methods, 51, 910-929",
        doi: "10.3758/s13428-018-1186-5",
        usage:
          "Modern implementation of spreading activation. Validated our importance-weighted decay approach.",
      },
    ],
  },
  {
    title: "Sleep & Memory Consolidation",
    description: "How replay during rest strengthens memory traces",
    papers: [
      {
        authors: "Rasch, B. & Born, J.",
        year: 2013,
        title: "About Sleep's Role in Memory",
        journal: "Physiological Reviews, 93(2), 681-766",
        doi: "10.1152/physrev.00032.2012",
        usage:
          "Comprehensive review of hippocampal replay during sleep. Inspired our memory replay maintenance cycles.",
      },
      {
        authors: "LaBar, K.S. & Cabeza, R.",
        year: 2006,
        title: "Cognitive Neuroscience of Emotional Memory",
        journal: "Nature Reviews Neuroscience, 7, 54-64",
        doi: "10.1038/nrn1825",
        usage:
          "How emotional arousal enhances memory. Our REPLAY_AROUSAL_THRESHOLD prioritizes emotional memories.",
      },
    ],
  },
  {
    title: "Interference & Competition",
    description: "How similar memories compete and interfere",
    papers: [
      {
        authors: "Postman, L. & Underwood, B.J.",
        year: 1973,
        title: "Critical Issues in Interference Theory",
        journal: "Memory & Cognition, 1, 19-40",
        doi: "10.3758/BF03198064",
        usage:
          "Defined retroactive and proactive interference. Our INTERFERENCE_SIMILARITY_THRESHOLD detects competing memories.",
      },
      {
        authors: "Anderson, M.C. & Neely, J.H.",
        year: 1996,
        title: "Interference and Inhibition in Memory Retrieval",
        journal: "In E.L. Bjork & R.A. Bjork (Eds.), Memory (pp. 237-313). Academic Press",
        doi: null,
        usage:
          "Explained inhibitory mechanisms in retrieval. Informed our competition factor for similar memories.",
      },
    ],
  },
  {
    title: "Cognitive Architecture",
    description: "Computational models of human memory",
    papers: [
      {
        authors: "Cowan, N.",
        year: 1988,
        title: "Evolving Conceptions of Memory Storage, Selective Attention, and Their Mutual Constraints",
        journal: "Psychological Bulletin, 104(2), 163-191",
        doi: "10.1037/0033-2909.104.2.163",
        usage:
          "The foundational paper for our 3-tier architecture. Cowan's model distinguishes activated long-term memory from the focus of attention—our Working → Session → LongTerm tiers map directly to this.",
      },
      {
        authors: "Cowan, N.",
        year: 2001,
        title: "The Magical Number 4 in Short-Term Memory",
        journal: "Behavioral and Brain Sciences, 24(1), 87-114",
        doi: "10.1017/S0140525X01003922",
        usage:
          "Working memory capacity limits. Refined our understanding of tier boundaries and why memories must be consolidated.",
      },
      {
        authors: "Anderson, J.R.",
        year: 2007,
        title: "How Can the Human Mind Occur in the Physical Universe?",
        journal: "Oxford University Press",
        doi: "10.1093/acprof:oso/9780195324259.001.0001",
        usage:
          "ACT-R cognitive architecture. Our base-level activation and decay equations derive from ACT-R.",
      },
      {
        authors: "McGaugh, J.L.",
        year: 2000,
        title: "Memory—a Century of Consolidation",
        journal: "Science, 287(5451), 248-251",
        doi: "10.1126/science.287.5451.248",
        usage:
          "Landmark review of memory consolidation. Our TIER_PROMOTION_WORKING_AGE_SECS (30 min) is based on the synaptic consolidation window described here.",
      },
      {
        authors: "Dudai, Y.",
        year: 2004,
        title: "The Neurobiology of Consolidations, or, How Stable Is the Engram?",
        journal: "Annual Review of Psychology, 55, 51-86",
        doi: "10.1146/annurev.psych.55.090902.141555",
        usage:
          "Detailed analysis of consolidation timelines. Informed our 24-hour session → long-term promotion threshold.",
      },
    ],
  },
  {
    title: "Graph-Enhanced Retrieval",
    description: "Combining knowledge graphs with vector search",
    papers: [
      {
        authors: "Edge et al.",
        year: 2024,
        title: "From Local to Global: A Graph RAG Approach to Query-Focused Summarization",
        journal: "arXiv:2404.16130",
        doi: "10.48550/arXiv.2404.16130",
        usage:
          "GraphRAG improves retrieval by 13.1% over vector-only. Validated our hybrid semantic+graph approach.",
      },
      {
        authors: "Lioma, C. & Ounis, I.",
        year: 2006,
        title: "A Syntactically-Based Query Reformulation Technique for Information Retrieval",
        journal: "Information Processing & Management, 42(5), 1332-1363",
        doi: "10.1016/j.ipm.2006.02.003",
        usage:
          "Information content weighting for query terms. Our IC_NOUN, IC_ADJECTIVE, IC_VERB weights derive from this.",
      },
    ],
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 px-4">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[var(--term-green)] font-mono">$</span>
              <h1 className="text-3xl md:text-4xl font-semibold text-[var(--term-text)]">
                Research & Citations
              </h1>
            </div>
            <p className="text-[var(--term-text-dim)] leading-relaxed">
              shodh-memory is grounded in decades of cognitive psychology and neuroscience research.
              Every constant in our codebase has a citation. Here are the papers that shaped our architecture.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-5 mb-12">
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">18+</div>
              <div className="text-xs text-[var(--term-text-dim)]">Papers cited</div>
            </div>
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">7</div>
              <div className="text-xs text-[var(--term-text-dim)]">Research areas</div>
            </div>
            <div className="shadow-card rounded p-4 text-center">
              <div className="text-2xl font-semibold text-[var(--term-orange)]">50+</div>
              <div className="text-xs text-[var(--term-text-dim)]">Tuned constants</div>
            </div>
          </div>

          {/* Research categories */}
          {RESEARCH_CATEGORIES.map((category, i) => (
            <section key={i} className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[var(--term-orange)] font-mono text-sm">[{String(i + 1).padStart(2, "0")}]</span>
                <h2 className="text-xl font-semibold text-[var(--term-text)]">{category.title}</h2>
              </div>
              <p className="text-[var(--term-text-dim)] text-sm mb-6 pl-10">{category.description}</p>

              <div className="space-y-5">
                {category.papers.map((paper, j) => (
                  <div
                    key={j}
                    className="shadow-box rounded p-5"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="text-[var(--term-text)] font-medium leading-snug">
                        {paper.title}
                      </h3>
                      <span className="text-[var(--term-orange)] font-mono text-sm shrink-0">
                        {paper.year}
                      </span>
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
                        className="text-xs text-[var(--term-orange)] hover:underline"
                      >
                        DOI: {paper.doi}
                      </a>
                    )}
                    <div className="mt-3 pt-3 border-t border-[var(--term-border)]/30">
                      <div className="text-xs text-[var(--term-text-dim)]">
                        <span className="text-[var(--term-green)]">How we use it:</span> {paper.usage}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Footer note */}
          <div className="shadow-callout p-6 mt-12">
            <h3 className="text-[var(--term-text)] font-medium mb-2">
              Open Science, Open Source
            </h3>
            <p className="text-[var(--term-text-dim)] text-sm leading-relaxed">
              All constants in shodh-memory are documented in{" "}
              <a
                href="https://github.com/varun29ankuS/shodh-memory/blob/main/src/constants.rs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--term-orange)] hover:underline"
              >
                src/constants.rs
              </a>{" "}
              with full justification and citations. We believe AI memory systems should be grounded
              in science, not magic numbers.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

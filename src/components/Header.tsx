"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { VERSION } from "@/lib/version";

type MenuId = "product" | "resources" | null;

type NavCard = {
  href: string;
  title: string;
  desc: string;
  Icon: () => React.ReactElement;
};

const PRODUCT_ITEMS: NavCard[] = [
  {
    href: "/use-cases",
    title: "Edge & Robotics",
    desc: "Persistent memory for robots — ROS2/Zenoh, fully offline",
    Icon: ChipIcon,
  },
  {
    href: "/integrations",
    title: "Integrations",
    desc: "Claude Code, Cursor, LangChain, LlamaIndex, OpenAI SDK",
    Icon: LinkIcon,
  },
  {
    href: "/compare",
    title: "Compare",
    desc: "How Shodh stacks up — no LLM in the loop",
    Icon: BarsIcon,
  },
  {
    href: "/security",
    title: "Security",
    desc: "Local-first by design — data never leaves the machine",
    Icon: ShieldIcon,
  },
];

const RESOURCE_ITEMS: NavCard[] = [
  {
    href: "/docs",
    title: "Docs",
    desc: "Install, REST API, 37 MCP tools",
    Icon: DocIcon,
  },
  {
    href: "/research",
    title: "Research",
    desc: "The cognitive architecture, benchmarks, and the paper",
    Icon: FlaskIcon,
  },
  {
    href: "/blog",
    title: "Blog",
    desc: "Engineering notes on memory, recall, and robotics",
    Icon: PenIcon,
  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const openNow = useCallback((id: MenuId) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }, []);

  const closeSoon = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenMenu(null), 160);
  }, []);

  const closeAll = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenMenu(null);
    setMenuOpen(false);
  }, []);

  // Escape closes; click outside closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    const onClick = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [closeAll]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--term-border)] bg-[var(--term-bg)]/95 backdrop-blur-sm"
    >
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:no-underline" onClick={closeAll}>
          <Image src="/logo.png" alt="Shodh" width={32} height={32} className="opacity-90" priority />
          <span className="text-[var(--term-text)] font-semibold">shodh-memory</span>
          <span className="text-[var(--term-text-dim)] text-sm hidden sm:inline">v{VERSION}</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          <Dropdown
            id="product"
            label="Product"
            open={openMenu === "product"}
            onEnter={() => openNow("product")}
            onLeave={closeSoon}
            onToggle={() => setOpenMenu(openMenu === "product" ? null : "product")}
          >
            <div className="grid grid-cols-2 gap-2 w-[560px] p-3">
              {PRODUCT_ITEMS.map((item) => (
                <NavCardLink key={item.href} item={item} onClick={closeAll} />
              ))}
            </div>
          </Dropdown>

          <Dropdown
            id="resources"
            label="Resources"
            open={openMenu === "resources"}
            onEnter={() => openNow("resources")}
            onLeave={closeSoon}
            onToggle={() => setOpenMenu(openMenu === "resources" ? null : "resources")}
          >
            <div className="flex flex-col gap-2 w-[380px] p-3">
              {RESOURCE_ITEMS.map((item) => (
                <NavCardLink key={item.href} item={item} onClick={closeAll} />
              ))}
            </div>
          </Dropdown>

          <TopLink href="/enterprise" onClick={closeAll}>
            Enterprise
          </TopLink>

          <div className="flex items-center gap-2 ml-4">
            <Link
              href="/contact"
              onClick={closeAll}
              className="shadow-btn flex items-center gap-2 px-3 py-1.5 text-sm border-[var(--term-orange)] text-[var(--term-orange)] hover:bg-[var(--term-orange)] hover:text-[var(--term-bg)] transition-colors"
            >
              Contact
            </Link>
            <a
              href="https://discord.gg/HrpzXqTtEp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="shadow-btn flex items-center px-2.5 py-1.5 text-sm"
            >
              <DiscordIcon />
            </a>
            <a
              href="https://github.com/varun29ankuS/shodh-memory"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="shadow-btn flex items-center px-2.5 py-1.5 text-sm"
            >
              <GithubIcon />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-[var(--term-text-dim)] hover:text-[var(--term-text)]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "×" : "≡"}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-[var(--term-border)] bg-[var(--term-bg)] px-4 py-4 space-y-5 max-h-[calc(100vh-60px)] overflow-y-auto">
          <MobileSection label="Product">
            {PRODUCT_ITEMS.map((item) => (
              <NavCardLink key={item.href} item={item} onClick={closeAll} />
            ))}
          </MobileSection>
          <MobileSection label="Resources">
            {RESOURCE_ITEMS.map((item) => (
              <NavCardLink key={item.href} item={item} onClick={closeAll} />
            ))}
          </MobileSection>
          <div className="space-y-3 pt-1 border-t border-[var(--term-border)]">
            <MobileLink href="/enterprise" onClick={closeAll}>Enterprise</MobileLink>
            <MobileLink href="/contact" onClick={closeAll}>Contact</MobileLink>
            <a
              href="https://discord.gg/HrpzXqTtEp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
              onClick={closeAll}
            >
              <DiscordIcon />
              <span>Discord</span>
            </a>
            <a
              href="https://github.com/varun29ankuS/shodh-memory"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[var(--term-text-dim)] hover:text-[var(--term-orange)]"
              onClick={closeAll}
            >
              <GithubIcon />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Dropdown({
  id,
  label,
  open,
  onEnter,
  onLeave,
  onToggle,
  children,
}: {
  id: string;
  label: string;
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
          open ? "text-[var(--term-orange)]" : "text-[var(--term-text-dim)] hover:text-[var(--term-text)]"
        }`}
        aria-expanded={open}
        aria-controls={`nav-panel-${id}`}
        onClick={onToggle}
      >
        {label}
        <Chevron open={open} />
      </button>
      <div
        id={`nav-panel-${id}`}
        className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 transition-all duration-150 origin-top ${
          open ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="border border-[var(--term-border)] bg-[var(--term-bg-secondary)] rounded-md shadow-2xl shadow-black/50">
          {children}
        </div>
      </div>
    </div>
  );
}

function NavCardLink({
  item,
  onClick,
}: {
  item: NavCard;
  onClick?: () => void;
}) {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className="group flex items-start gap-3 p-2.5 rounded-md border border-transparent hover:border-[var(--term-border)] hover:bg-[var(--term-bg)] transition-colors hover:no-underline"
    >
      <span className="mt-0.5 shrink-0 text-[var(--term-text-dim)] group-hover:text-[var(--term-orange)] transition-colors">
        <item.Icon />
      </span>
      <div className="min-w-0">
        <div className="text-sm font-medium text-[var(--term-text)] group-hover:text-[var(--term-orange)] transition-colors">
          {item.title}
        </div>
        <div className="text-xs text-[var(--term-text-dim)] leading-snug mt-0.5">{item.desc}</div>
      </div>
    </Link>
  );
}

function TopLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="px-3 py-2 text-sm text-[var(--term-text-dim)] hover:text-[var(--term-text)] transition-colors hover:no-underline"
    >
      {children}
    </Link>
  );
}

function MobileSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-widest text-[var(--term-text-dim)] mb-2">{label}</div>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function MobileLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block text-[var(--term-text-dim)] hover:text-[var(--term-orange)] transition-colors"
    >
      {children}
    </Link>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
    >
      <path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M13.545 2.907a13.227 13.227 0 00-3.257-1.011.05.05 0 00-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 00-3.658 0 8.258 8.258 0 00-.412-.833.051.051 0 00-.052-.025c-1.125.194-2.22.534-3.257 1.011a.046.046 0 00-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 003.995 2.02.05.05 0 00.056-.019c.308-.42.582-.863.818-1.329a.05.05 0 00-.028-.07 8.735 8.735 0 01-1.248-.595.05.05 0 01-.005-.083c.084-.063.168-.129.248-.195a.05.05 0 01.051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 01.053.007c.08.066.164.132.248.195a.05.05 0 01-.004.083c-.399.233-.813.441-1.249.595a.05.05 0 00-.027.07c.24.466.514.909.817 1.329a.05.05 0 00.056.019 13.235 13.235 0 004.001-2.02.049.049 0 00.021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 00-.02-.019zM5.347 10.215c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612z" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

// Nav menu glyphs — simple mono-line icons, drawn in the same stroke style as
// the chevron/social icons. They inherit color from the parent, so they tint
// dim -> orange on hover with the rest of the card.
function NavIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function ChipIcon() {
  return (
    <NavIcon>
      <rect x="6" y="6" width="8" height="8" rx="1" />
      <path d="M8 3v3M12 3v3M8 14v3M12 14v3M3 8h3M3 12h3M14 8h3M14 12h3" />
    </NavIcon>
  );
}

function LinkIcon() {
  return (
    <NavIcon>
      <circle cx="6.5" cy="10" r="2.5" />
      <circle cx="13.5" cy="10" r="2.5" />
      <path d="M9 10h2" />
    </NavIcon>
  );
}

function BarsIcon() {
  return (
    <NavIcon>
      <path d="M4 16h12" />
      <path d="M7 16V9M11 16V5M15 16V12" />
    </NavIcon>
  );
}

function ShieldIcon() {
  return (
    <NavIcon>
      <path d="M10 3l6 2.2v4.3c0 3.4-2.6 5.9-6 7-3.4-1.1-6-3.6-6-7V5.2z" />
      <path d="M7.6 10l1.7 1.7L13 8" />
    </NavIcon>
  );
}

function DocIcon() {
  return (
    <NavIcon>
      <path d="M6 3h5l3 3v11H6z" />
      <path d="M11 3v3h3" />
      <path d="M8 10.5h4M8 13.5h4" />
    </NavIcon>
  );
}

function FlaskIcon() {
  return (
    <NavIcon>
      <path d="M8.5 3h3" />
      <path d="M9.5 3v4.6l-3.6 6.9A1 1 0 006.8 16h6.4a1 1 0 00.9-1.5L10.5 7.6V3" />
      <path d="M7.8 12.5h4.4" />
    </NavIcon>
  );
}

function PenIcon() {
  return (
    <NavIcon>
      <path d="M4 16l.9-3.2L12.5 5.1l2.4 2.4-7.6 7.6z" />
      <path d="M11.3 6.3l2.4 2.4" />
    </NavIcon>
  );
}

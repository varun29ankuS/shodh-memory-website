import Link from "next/link";
import { Newsletter } from "./Newsletter";

export function Footer() {
  return (
    <footer className="border-t border-[var(--term-border)] py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand + Newsletter */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[var(--term-green)]">$</span>
              <span className="font-semibold">shodh-memory</span>
            </div>
            <p className="text-[var(--term-text-dim)] text-sm max-w-md mb-4">
              Persistent cognitive memory for AI agents. Built with Rust,
              grounded in neuroscience, designed for the edge.
            </p>
            <Newsletter variant="inline" />
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[var(--term-orange)] text-sm font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.gg/HrpzXqTtEp" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Discord
                </a>
              </li>
              <li>
                <Link href="/docs" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/research" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Research & Citations
                </Link>
              </li>
              <li>
                <Link href="/enterprise" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Enterprise
                </Link>
              </li>
              <li>
                <Link href="/compare" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Compare
                </Link>
              </li>
              <li>
                <Link href="/integrations" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Contact
                </Link>
              </li>
              <li>
                <a href="https://crates.io/crates/shodh-memory" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  crates.io
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@shodh/memory-mcp" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  npm
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-[var(--term-orange)] text-sm font-medium mb-3">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory/issues" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory/discussions" target="_blank" rel="noopener noreferrer" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Discussions
                </a>
              </li>
              <li>
                <Link href="/privacy" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/security" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--term-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--term-text-dim)]">
          <div>
            <span className="text-[var(--term-orange)]">shodh-memory</span> — open-source, Apache 2.0
          </div>
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <span className="text-[var(--term-orange)]">Rust</span>
            <span>+</span>
            <span className="text-[var(--term-green)]">love</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

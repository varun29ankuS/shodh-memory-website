export function Footer() {
  return (
    <footer className="border-t border-[var(--term-border)] py-12 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[var(--term-green)]">$</span>
              <span className="font-semibold">shodh-memory</span>
            </div>
            <p className="text-[var(--term-text-dim)] text-sm max-w-md">
              Persistent cognitive memory for AI agents. Built with Rust, 
              grounded in neuroscience, designed for the edge.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[var(--term-orange)] text-sm font-medium mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory#readme" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://crates.io/crates/shodh-memory" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  crates.io
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@shodh/memory-mcp" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  npm
                </a>
              </li>
            </ul>
          </div>

          {/* Shodh Ecosystem */}
          <div>
            <h4 className="text-[var(--term-orange)] text-sm font-medium mb-3">Shodh Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://www.shodh-rag.com" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Shodh RAG
                </a>
              </li>
              <li>
                <a href="https://www.shodh-rag.com/memory" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Memory Docs
                </a>
              </li>
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory/issues" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Issues
                </a>
              </li>
              <li>
                <a href="https://github.com/varun29ankuS/shodh-memory/discussions" className="text-[var(--term-text-dim)] hover:text-[var(--term-orange)]">
                  Discussions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[var(--term-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-[var(--term-text-dim)]">
          <div>
            Part of the <a href="https://shodh-rag.com" className="text-[var(--term-orange)] hover:underline">Shodh</a> ecosystem
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

import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-lg text-center font-mono">
          <div className="mb-8">
            <span className="text-6xl font-bold text-[var(--term-orange)]">
              404
            </span>
          </div>
          <div className="mb-6 text-left inline-block">
            <p className="text-[var(--term-text-dim)] mb-1">
              <span className="text-[var(--term-cyan)]">$</span> curl
              this-page
            </p>
            <p className="text-[var(--term-red)] mb-4">
              error: memory not found — this page doesn&apos;t exist
            </p>
            <p className="text-[var(--term-text-dim)]">
              The page you&apos;re looking for may have decayed, been moved, or
              never existed. Unlike shodh-memory, the web doesn&apos;t have
              Hebbian learning.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            <Link
              href="/"
              className="px-5 py-2.5 bg-[var(--term-orange)] text-[var(--term-bg)] font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Home
            </Link>
            <Link
              href="/docs"
              className="px-5 py-2.5 border border-[var(--term-border)] text-[var(--term-text)] rounded hover:border-[var(--term-orange)] transition-colors"
            >
              Docs
            </Link>
            <Link
              href="/blog"
              className="px-5 py-2.5 border border-[var(--term-border)] text-[var(--term-text)] rounded hover:border-[var(--term-orange)] transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="px-5 py-2.5 border border-[var(--term-border)] text-[var(--term-text)] rounded hover:border-[var(--term-orange)] transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

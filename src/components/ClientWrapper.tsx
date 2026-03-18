"use client";

import { useState, useEffect } from "react";
import { BootSequence } from "./BootSequence";
import { ScrollProgress } from "./ScrollProgress";
import { BackToTop } from "./BackToTop";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem("bootSeen")) {
      setBooted(true);
    }
  }, []);

  return (
    <>
      {/* Boot sequence overlays on TOP of content — content is always in the DOM
          and rendered by the browser for LCP, even while the overlay is visible */}
      {mounted && !booted && (
        <BootSequence onComplete={() => setBooted(true)} />
      )}
      <div>
        {mounted && <ScrollProgress />}
        {children}
        {mounted && <BackToTop />}
      </div>
    </>
  );
}

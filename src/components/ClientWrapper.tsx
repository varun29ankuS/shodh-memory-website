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
    // Check if already booted this session
    if (sessionStorage.getItem("bootSeen")) {
      setBooted(true);
    }
  }, []);

  // Avoid hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <>
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      <div className={booted ? "opacity-100" : "opacity-0"}>
        <ScrollProgress />
        {children}
        <BackToTop />
      </div>
    </>
  );
}

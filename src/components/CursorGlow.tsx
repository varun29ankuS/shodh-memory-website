"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor spotlight in the substrate's visual language: a warm radial glow
 * that follows the pointer and brightens the dot grid around it. Sits behind
 * content, so it lights the page substrate without tinting cards or text.
 * Desktop fine-pointer devices only; rAF-throttled to one paint per frame.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let x = -1000;
    let y = -1000;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf) {
        raf = requestAnimationFrame(() => {
          el.style.background = `radial-gradient(380px circle at ${x}px ${y}px, rgba(240, 136, 62, 0.08), transparent 70%)`;
          raf = 0;
        });
      }
    };

    const onLeave = () => {
      el.style.background = "transparent";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}

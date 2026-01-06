"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const ANNOUNCEMENT = {
  id: "v0.2.0-release", // Change this ID when updating announcement to show it again
  text: "v0.2.0 released — GTD-style todos, comments, sub-projects & more",
  link: "https://github.com/varun29ankuS/shodh-memory/releases",
  linkText: "View changelog →",
};

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true); // Start hidden to prevent flash

  useEffect(() => {
    const stored = localStorage.getItem("announcement-dismissed");
    if (stored !== ANNOUNCEMENT.id) {
      setDismissed(false);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("announcement-dismissed", ANNOUNCEMENT.id);
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div className="announcement-bar">
      <div className="announcement-content">
        <span className="announcement-badge">NEW</span>
        <span className="announcement-text">{ANNOUNCEMENT.text}</span>
        <a
          href={ANNOUNCEMENT.link}
          target="_blank"
          rel="noopener noreferrer"
          className="announcement-link"
        >
          {ANNOUNCEMENT.linkText}
        </a>
      </div>
      <button
        onClick={handleDismiss}
        className="announcement-dismiss"
        aria-label="Dismiss announcement"
      >
        ×
      </button>
    </div>
  );
}

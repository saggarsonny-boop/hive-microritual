"use client";

import { useEffect, useState } from "react";

type FirstVisitCardProps = {
  storageKey: string;
};

export default function FirstVisitCard({ storageKey }: FirstVisitCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const seen = window.localStorage.getItem(storageKey);
    setVisible(!seen);
  }, [storageKey]);

  if (!visible) {
    return null;
  }

  return (
    <aside className="welcome-card" aria-live="polite">
      <p className="eyebrow">First Visit</p>
      <h3>One tap. One clear feeling.</h3>
      <p>Try this prompt: I need a reset.</p>
      <div className="welcome-actions">
        <button
          className="chip-button"
          type="button"
          onClick={() => {
            window.localStorage.setItem(storageKey, "1");
            setVisible(false);
          }}
        >
          Try it
        </button>
        <button
          className="text-button"
          type="button"
          onClick={() => {
            window.localStorage.setItem(storageKey, "1");
            setVisible(false);
          }}
        >
          Dismiss
        </button>
      </div>
    </aside>
  );
}
"use client";

import { useEffect, useState } from "react";
import type { RitualTemplate } from "@/lib/rituals/templates";

type AutoDemoProps = {
  storageKey: string;
  onFinish: (input: string, ritual: RitualTemplate) => void;
};

const demoInput = "I need a reset";
const demoRitual: RitualTemplate = {
  id: "demo-reset",
  type: "reframe",
  text: "This does not need to become a whole life verdict. Let this moment be a reset, not a referendum.",
};

export default function AutoDemo({ storageKey, onFinish }: AutoDemoProps) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const seen = window.localStorage.getItem(storageKey);
    if (seen) {
      return;
    }

    setVisible(true);

    let charIndex = 0;
    const typeTimer = window.setInterval(() => {
      charIndex += 1;
      setTyped(demoInput.slice(0, charIndex));

      if (charIndex >= demoInput.length) {
        window.clearInterval(typeTimer);
        onFinish(demoInput, demoRitual);

        window.setTimeout(() => {
          window.localStorage.setItem(storageKey, "1");
          setVisible(false);
        }, 8000);
      }
    }, 70);

    return () => window.clearInterval(typeTimer);
  }, [onFinish, storageKey]);

  if (!visible) {
    return null;
  }

  return (
    <aside className="auto-demo" aria-live="polite">
      <p className="auto-demo-label">Auto Demo</p>
      <h3>First loop</h3>
      <p className="typed-line">{typed}</p>
      {typed.length === demoInput.length ? (
        <div className="demo-ritual">
          <p>{demoRitual.text}</p>
        </div>
      ) : null}
    </aside>
  );
}
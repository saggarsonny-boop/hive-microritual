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


<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>

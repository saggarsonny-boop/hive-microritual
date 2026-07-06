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


<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>

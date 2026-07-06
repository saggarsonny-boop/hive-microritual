"use client";

import { useState } from "react";

const steps = [
  "Type a feeling if you want the ritual to sharpen around what is actually here.",
  "Begin gives you an instant ritual first, then quietly upgrades it if AI is needed.",
  "Swipe left on the card, or tap Next, to keep the loop moving.",
  "Save keeps a local stack. Share formats it as your ritual today.",
];

export default function TooltipTour() {
  const [open, setOpen] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  return (
    <>
      <button
        className="ghost-button"
        type="button"
        onClick={() => {
          setStepIndex(0);
          setOpen((current) => !current);
        }}
      >
        ? Tour
      </button>
      {open ? (
        <aside className="tour-card" aria-live="polite">
          <div className="tour-steps" aria-hidden="true">
            {steps.map((step, index) => (
              <span key={step} className={`tour-step${index === stepIndex ? " is-active" : ""}`} />
            ))}
          </div>
          <p className="eyebrow">Tooltip Tour</p>
          <h3>How this loop works</h3>
          <p>{steps[stepIndex]}</p>
          <div className="tour-actions">
            <button
              className="text-button"
              type="button"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
            <button
              className="chip-button"
              type="button"
              onClick={() => {
                if (stepIndex === steps.length - 1) {
                  setOpen(false);
                  setStepIndex(0);
                  return;
                }

                setStepIndex((current) => current + 1);
              }}
            >
              {stepIndex === steps.length - 1 ? "Done" : "Next"}
            </button>
          </div>
        </aside>
      ) : null}
    </>
  );
}


<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>

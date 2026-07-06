"use client";

import { useEffect, useRef, useState } from "react";
import AutoDemo from "@/components/AutoDemo";
import FirstVisitCard from "@/components/FirstVisitCard";
import TooltipTour from "@/components/TooltipTour";
import {
  buildFallbackRitual,
  nextType,
  ritualTypeLabels,
  type RitualTemplate,
  type RitualType,
} from "@/lib/rituals/templates";

type RitualRecord = RitualTemplate & {
  createdAt: number;
  source: "template" | "ai";
  input?: string;
};

const savedStorageKey = "hive_saved_hivemicroritual";
const welcomeStorageKey = "hive_welcomed_hivemicroritual";
const demoStorageKey = "hive_demo_hivemicroritual";

const placeholders = [
  "I feel weird today",
  "I need a reset",
  "Give me something grounding",
  "Everything feels louder than it should",
  "I want one honest sentence",
];

function toRecord(ritual: RitualTemplate, source: "template" | "ai", input?: string): RitualRecord {
  return {
    ...ritual,
    source,
    input: input?.trim() || undefined,
    createdAt: Date.now(),
  };
}

export default function RitualExperience() {
  const [input, setInput] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [currentRitual, setCurrentRitual] = useState<RitualRecord>(() => toRecord(buildFallbackRitual(), "template"));
  const [savedRituals, setSavedRituals] = useState<RitualRecord[]>([]);
  const [hasBegun, setHasBegun] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusLine, setStatusLine] = useState("Tap Begin for one small, clear shift.");
  const [saveStatus, setSaveStatus] = useState("");
  const requestRef = useRef(0);
  const touchStartRef = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((current) => (current + 1) % placeholders.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const raw = window.localStorage.getItem(savedStorageKey);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as RitualRecord[];
      setSavedRituals(parsed.slice(0, 6));
    } catch {
      window.localStorage.removeItem(savedStorageKey);
    }
  }, []);

  useEffect(() => {
    if (!saveStatus) {
      return;
    }

    const timer = window.setTimeout(() => setSaveStatus(""), 1800);
    return () => window.clearTimeout(timer);
  }, [saveStatus]);

  async function generateRitual(nextInput?: string, forcedType?: RitualType) {
    const activeInput = typeof nextInput === "string" ? nextInput : input;
    const preferredType = forcedType ?? nextType(currentRitual.type);
    const immediate = toRecord(buildFallbackRitual(activeInput, preferredType), "template", activeInput);
    const currentRequest = requestRef.current + 1;
    requestRef.current = currentRequest;

    setCurrentRitual(immediate);
    setHasBegun(true);
    setStatusLine(activeInput.trim() ? "Instant ritual loaded. Personalizing now." : "Fresh ritual ready.");

    if (!activeInput.trim()) {
      setIsGenerating(false);
      return;
    }

    setIsGenerating(true);

    try {
      const response = await fetch("/api/ritual", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: activeInput,
          preferredType: immediate.type,
        }),
      });

      const payload = (await response.json()) as RitualTemplate & { source?: "template" | "ai" };
      if (requestRef.current !== currentRequest) {
        return;
      }

      if (payload?.text) {
        setCurrentRitual(toRecord(payload, payload.source === "ai" ? "ai" : "template", activeInput));
        setStatusLine(payload.source === "ai" ? "Personalized and ready." : "Template ritual ready.");
      }
    } catch {
      if (requestRef.current === currentRequest) {
        setStatusLine("Template ritual ready.");
      }
    } finally {
      if (requestRef.current === currentRequest) {
        setIsGenerating(false);
      }
    }
  }

  function saveCurrentRitual() {
    const nextSaved = [currentRitual, ...savedRituals.filter((ritual) => ritual.text !== currentRitual.text)].slice(0, 6);
    setSavedRituals(nextSaved);
    window.localStorage.setItem(savedStorageKey, JSON.stringify(nextSaved));
    setSaveStatus("Saved");
  }

  async function shareCurrentRitual() {
    const shareText = `Your ritual today is: ${currentRitual.text}`;

    if (navigator.share) {
      await navigator.share({
        title: "HiveMicroRitual",
        text: shareText,
        url: window.location.href,
      }).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(`${shareText}\n\n${window.location.href}`);
    setSaveStatus("Copied");
  }

  return (
    <div className="ritual-shell">
      <FirstVisitCard storageKey={welcomeStorageKey} />
      <AutoDemo
        storageKey={demoStorageKey}
        onFinish={(demoInput, demoRitual) => {
          setInput(demoInput);
          setCurrentRitual(toRecord(demoRitual, "template", demoInput));
          setHasBegun(true);
          setStatusLine("Auto-demo loaded.");
        }}
      />
      <div className="ritual-stage">
        <header className="ritual-topbar">
          <div>
            <p className="eyebrow">Healthy replacement for doomscrolling</p>
            <div className="ritual-wordmark">HIVE <span>MICRORITUAL</span></div>
          </div>
          <TooltipTour />
        </header>

        <div className="ritual-grid">
          <section className="surface-card">
            <div>
              <p className="eyebrow">10-second ritual</p>
              <h1>Begin with one true feeling.</h1>
            </div>
            <p>Give me one moment and I will give you clarity, resonance, or relief. No menu. No profile. No extra ceremony.</p>

            <div className="input-shell">
              <textarea
                className="ritual-textarea"
                rows={5}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={placeholders[placeholderIndex]}
                aria-label="Optional ritual input"
              />
              <div className="placeholder-strip" aria-hidden="true">
                <span className="placeholder-label">Try</span>
                <span className="placeholder-ghost">{placeholders[placeholderIndex]}</span>
              </div>
            </div>

            <button className="begin-button" type="button" onClick={() => generateRitual()} disabled={isGenerating}>
              {isGenerating ? "Personalizing..." : "Begin"}
            </button>

            <p className="status-line">{statusLine}</p>

            <div className="surface-meta">
              <div className="meta-pill">
                <strong>Instant</strong>
                <span>Template loads immediately so the loop never stalls.</span>
              </div>
              <div className="meta-pill">
                <strong>Atomic</strong>
                <span>Every ritual stays short, emotionally precise, and screenshot-ready.</span>
              </div>
              <div className="meta-pill">
                <strong>Local</strong>
                <span>Saved rituals stay on this device. No signup, no settings.</span>
              </div>
            </div>
          </section>

          <section
            className="output-card"
            onTouchStart={(event) => {
              touchStartRef.current = event.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(event) => {
              const start = touchStartRef.current;
              const end = event.changedTouches[0]?.clientX ?? null;
              if (start !== null && end !== null && start - end > 72) {
                void generateRitual();
              }
              touchStartRef.current = null;
            }}
          >
            <div className="output-header">
              <span className="type-pill">{ritualTypeLabels[currentRitual.type]}</span>
              <span className="source-pill">{currentRitual.source === "ai" ? "Personalized" : "Instant"}</span>
            </div>

            <div className="output-copy">
              <small>{hasBegun ? "Your ritual" : "Ready when you are"}</small>
              <h2>{hasBegun ? "Hold this instead." : "One tap changes the tone."}</h2>
              <p>{currentRitual.text}</p>
              <small>Swipe left for next.</small>
            </div>

            <div className="output-actions">
              <div className="action-row">
                <button className="chip-button" type="button" onClick={saveCurrentRitual}>
                  Save ritual
                </button>
                <button className="chip-button" type="button" onClick={() => void shareCurrentRitual()}>
                  Share card
                </button>
                <button className="chip-button next-button" type="button" onClick={() => void generateRitual()}>
                  Next ritual
                </button>
              </div>
              <div>
                {saveStatus ? <span className="save-status">{saveStatus}</span> : <span className="swipe-note">Infinite loop enabled</span>}
              </div>
            </div>
          </section>
        </div>

        {savedRituals.length > 0 ? (
          <section className="saved-card">
            <div className="saved-header">
              <div>
                <p className="eyebrow">Saved Rituals</p>
                <p>Your last few anchors stay here on this device.</p>
              </div>
            </div>
            <div className="saved-list">
              {savedRituals.map((ritual) => (
                <article key={`${ritual.createdAt}-${ritual.id}`} className="saved-item">
                  <strong>{ritualTypeLabels[ritual.type]}</strong>
                  <p>{ritual.text}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}


<!-- Stripe Checkout Block -->
<div id="stripe-checkout-cta" style="margin: 2rem auto; padding: 2rem; border-radius: 12px; background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.2); text-align: center; font-family: sans-serif; max-width: 600px;">
    <h3 style="margin-top: 0; color: #fff;">Activate Premium License</h3>
    <p style="color: #9ca3af; font-size: 0.95rem; margin-bottom: 1.5rem;">Get instant access to all advanced capabilities and integration features.</p>
    <a href="https://buy.stripe.com/6oU00lb2L6F37bIazv0RG0J" target="_blank" style="display: inline-block; padding: 0.8rem 2rem; background: #3b82f6; color: #fff; font-weight: bold; border-radius: 8px; text-decoration: none; transition: background 0.2s;">Unlock Now</a>
</div>

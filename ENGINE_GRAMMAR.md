# ENGINE GRAMMAR — HiveMicroRitual

<GrapplerHook>
engine: HiveMicroRitual
version: 0.1.0
governance: QueenBee.MasterGrappler
safety: enabled
multilingual: pending
premium: false
</GrapplerHook>

## Engine Identity
- **Name:** HiveMicroRitual
- **Domain:** hivemicroritual.hive.baby
- **Repo:** saggarsonny-boop/hive-microritual
- **Status:** V0 blueprint implemented
- **Stack:** Next.js 16 + TypeScript + Anthropic SDK + localStorage

## Purpose
A 10-second ritual people reach for automatically. A healthy replacement for doomscrolling that returns one short emotional shift: clarity, resonance, permission, release, or identity.

## Inputs
- Optional free-text feeling or prompt
- One tap: `Begin`
- Swipe left or tap `Next ritual`
- Save and share actions

## Outputs
- One micro-ritual in 1-2 sentences
- Types: Micro-Reflection, Micro-Reframe, Micro-Permission, Micro-Release, Micro-Identity Mirror
- Instant template response on every tap
- AI-personalized ritual when text input is provided and Anthropic is configured

## Onboarding Stack
- Auto-demo: first visit types `I need a reset` and reveals a ritual, then fades
- First-visit card: one-tap introduction with a single prompt
- Tooltip tour: replayable `? Tour`
- Rotating placeholders: live example prompts in the input field

## Rules
- Short, atomic, emotionally precise
- No advice
- No therapy language
- No moralizing
- Frame as identity, permission, clarity, resonance, or release

## Data Objects
- `RitualTemplates`: 50 local templates across five ritual types
- `UserSession`: implicit local interaction state only in V0
- `SavedRituals`: localStorage-based saved card list

## Deployment Notes
- Set `NEXT_PUBLIC_APP_URL=https://hivemicroritual.hive.baby`
- Set `ANTHROPIC_API_KEY` in Vercel for personalized rituals
- Optional: set `ANTHROPIC_MODEL` to override the default model string
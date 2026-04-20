# HiveMicroRitual

HiveMicroRitual is a 10-second ritual engine built to replace doomscrolling with one clear emotional shift.

## Local development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` and set:

- `NEXT_PUBLIC_APP_URL`
- `ANTHROPIC_API_KEY` for personalized rituals
- `ANTHROPIC_MODEL` to override the default model

## V0 behavior

- Instant ritual on every tap via local templates
- AI upgrade when the user types a prompt and Anthropic is configured
- Save and share
- Swipe or tap next for the infinite loop
- First-visit card, auto-demo, tooltip tour, rotating placeholders
# CLAUDE.md — synth-deck (pitch deck)

## What this is

The **synth. pitch deck** — a 13-slide investor/partner presentation for Synth Sports, built as a custom full-screen web app. This is one **instance** of the reusable presentation engine defined in `../CLAUDE.md` (`presentations/CLAUDE.md`); read that file first for the shared architecture, component library, animation presets, and a16z State of Crypto 2023 aesthetic rules.

This file documents what's specific to **this** deck: the narrative arc, the brand theme, and the split from the product prototype.

> synth.  — Every data signal. One platform.

**Related repos**

- **Product prototype** — `~/synth-platform/` (GitHub: `abishaigeorge09/synth-platform`). The interactive Cal Women's Rowing demo the deck references. Used to live here under `src/prototype/` and as "Solution flow" slides; the interactive prototype was split out so this repo is pitch-only. The Solution section slides (`OurSolutionCover`, `SetupAccountSlide`, `SynthAgentWorkflowSlide`, `SolutionFlowSlides`) remain here — they're *slides* showing product mockups, not the interactive prototype itself.
- **Presentation engine spec** — `../CLAUDE.md`. Shared rules that apply to every deck built on this framework (slide types, component library, motion presets, pixel art patterns, typography hierarchy).

## Stack

Same as the engine spec: React 18 + TypeScript + Vite 5 + Tailwind + Framer Motion 12. See `../CLAUDE.md` for the full dependency list and rules.

## Run

```bash
npm install
npm run dev       # vite (default port 5173)
npm run build     # tsc -b && vite build
```

## Narrative arc (S01 → S13)

App entry: `src/App.tsx` renders `MainDeck` inside `DeckBlurLock` + `DeckAdvanceProvider` + `SlideShell`. The slide array in `App.tsx` is the source of truth for ordering and section labels.

| # | Slide | Section | File | What it conveys |
|---|---|---|---|---|
| 01 | Title | TITLE | `S01_Title.tsx` | Green cover, synth logo + wordmark, tagline. Full-bleed pixel cascade. No top nav or progress. |
| 02 | Problem | 01 · PROBLEM | `S02_Problem.tsx` | Headline: **"Coaches are drowning in dispersed data."** Infinite carousel of fragmented coach tools (Sheets, TeamWorks, Whoop, Bridge, …). |
| 03 | Solution cover | 02 · SOLUTION | `OurSolutionCover.tsx` | Section transition into the solution block — ROW IQ + Synth dashboards, narrative framing of the unified surface. |
| 04 | Setup account | 02 · SOLUTION | `SetupAccountSlide.tsx` | Coach signs up and picks connectors (CSV + email list onboarding). Mirrors prototype sign-in. |
| 05 | Synth agent workflow | 02 · SOLUTION | `SynthAgentWorkflowSlide.tsx` | Browser-extension agent diagram: how capture happens beside existing workflows. |
| 06 | Dashboard intro (SF01) | 02 · SOLUTION | `SolutionFlowSlides.tsx` → `SF01_DashboardIntro` | First look at the live coach dashboard — connector chips, roster table. |
| 07 | Deploy extension (SF02) | 02 · SOLUTION | `SolutionFlowSlides.tsx` → `SF02_DeployExtension` | Deploying the agent to the coach's browser. |
| 08 | Connectors | 03 · CONNECTORS | `S04_Connectors.tsx` | "Connect once. It updates forever." — OAuth/extension once, then scheduled pulls forever. |
| 09 | Traction | 04 · TRACTION | `S05_Traction.tsx` | Cal Men's & Women's Rowing pilot — real rosters, real feedback. |
| 10 | Why now | 05 · WHY NOW | `S06_WhyNow.tsx` | Athlete-founders lived this, fragmented data, AI finally makes synthesis cheap, competitive drive. Tagline: "We're athletes. We want to win." |
| 11 | Market | 06 · MARKET | `S07_Market.tsx` | TAM / SAM / SOM rings with rationale. Start with rowing, scale to every sport. |
| 12 | Business model | 07 · BUSINESS MODEL | `S08_BusinessModel.tsx` | Flat tiers, revenue mix, 3-year projection. |
| 13 | Competition | 08 · COMPETITION | `S09_Competition.tsx` | "No one connects it all" — comparison table + four differentiator cards. |
| 14 | Team | 09 · TEAM | `S10_Team.tsx` | Four co-founders: Abishai Gosula · Star Rose · Lily Pember · Matthew Waddell. "We didn't discover this problem through research. We lived it." |
| 15 | Vision | VISION | `S11_Vision.tsx` | Custom base apps, one synth layer, every program. |
| 16 | Close | CLOSE | `S12_Close.tsx` | Three asks: (01) Partners & pilots · (02) $100k seed (brand, AI/compute, ops) · (03) GTM / sales network. |
| 17 | Thank you | THANK YOU | `S13_ThankYou.tsx` | Dark slide, centered thank-you, breathing logo, contact (synthsports.com, supportsynth@gmail.com). |

> Counting note: deck total (17) lives in `src/lib/deckTotal.ts` as `DECK_SLIDE_TOTAL`. Newer slides reference it directly (`page={`3 / ${DECK_SLIDE_TOTAL}`}`); a few older slides still hardcode `"N / 17"`. When adding or removing slides, update `DECK_SLIDE_TOTAL` and fix the hardcoded numerators on the affected slides.

**Appendix deck** — `src/appendix/AppendixDeck.tsx` is gated behind `window.location.hash === '#appendix'`. Use it for Q&A backups, deeper market math, etc.

## Brand theme

Single source of truth: `src/lib/theme.ts`. The deck inherits every rule from `../CLAUDE.md` §THEME; what matters for this specific deck:

- `name: 'synth.'`
- `tagline: 'Every data signal. One platform.'`
- `deckName: 'Pitch Deck'` · `year: '2026'`
- `primary: #059669` (emerald) · `accent: #10B981` (logo dot)
- `logoFont: 'JetBrains Mono'`, 600 weight
- `logoReveal: { dotFirst: true, typewriterSpeed: 80, crossfadeDuration: 600 }`

Logo files live in `public/logos/` — see `../CLAUDE.md` for which SVG to use on each background (green / dark / light / muted / monochrome).

## Split from the product prototype

Originally this repo contained both the pitch deck AND an interactive product prototype (at `src/prototype/`, routed via `#prototype` hash in `App.tsx`). On **2026-04-14** the interactive prototype moved to `~/synth-platform/`. What stayed behind:

- **All slides**, including Solution-section slides that show product mockups (`OurSolutionCover`, `SetupAccountSlide`, `SynthAgentWorkflowSlide`, `SolutionFlowSlides`, `SolutionDataHubSlide`, `DeployAgentProcessingSlide`). These are *slides*, not a live app, so they belong in the deck.
- Shared components the slides use: `SynthLayerDashboardMockup`, `ConnectSourcesPanel`, `LineupBoardMockup`, `SynthDemoCursor`, etc.

What moved out:

- `src/prototype/` directory (`ProductPrototypeApp`, `RowiqWomensCharts`, `athleteCards/`, `womensDemoData.ts`, `rowiqWomensData.ts`)
- The `#prototype` hash route in `App.tsx`

If you need to update a product mockup shown in the deck, do it here (and keep `synth-platform` visually in sync if the same component is used there). If you need to update the interactive demo, do it in `synth-platform`.

## Working conventions

- **Every deck file reads from `theme.ts`** — no hardcoded colors. See `../CLAUDE.md` critical rules.
- **Keep the a16z DNA obvious** — monospace headlines, highlight bars, pixel art patterns on section covers, dashed rules, stat cards with colored left borders.
- **Target viewport 1440×900** — letterbox on other sizes via `SlideShell`.
- **Pixel art must be architectural**, not confetti. Large blocks, grid-aligned, cascading.
- **When adding a slide**, add it to the `slides: SlideDef[]` array in `src/App.tsx` with a stable `id`, `section`, `component`, `background`, and any `frame` / `showTopNav` / `showProgress` / `showNavButtons` overrides.
- **When reordering**, update the top-nav page counters in each slide (`page="2 / 17"` etc.) to match. These are hardcoded strings today.

## File map (deck-specific)

```
src/
├── App.tsx                        # MainDeck slide array (source of truth for ordering)
├── main.tsx
├── index.css
├── lib/
│   ├── theme.ts                   # THIS deck's theme (extend ../CLAUDE.md template)
│   ├── motion.ts                  # inherited engine presets
│   ├── pixelPatterns.ts
│   ├── deckTotal.ts
│   └── setupSlideEvents.ts
├── components/                    # shared engine components (see ../CLAUDE.md)
│   ├── SlideShell.tsx             # fullscreen 16:9 container + nav
│   ├── TopNav.tsx                 # brand · deck · year · section · page
│   ├── DeckBlurLock.tsx           # print/blur overlay
│   ├── DeckAdvanceContext.tsx     # advance hook for auto-advancing slides
│   ├── SlideDeckContext.tsx
│   ├── PixelArt.tsx               # architectural block patterns
│   ├── HighlightLine.tsx
│   ├── StatCard.tsx
│   ├── SectionLabel.tsx
│   ├── DashedRule.tsx
│   ├── Tagline.tsx
│   ├── PaperTexture.tsx
│   ├── ProblemToolMarquee.tsx     # S02 infinite carousel
│   ├── SynthLayerDashboardMockup.tsx  # product UI embedded in Solution slides
│   ├── ConnectSourcesPanel.tsx
│   ├── LineupBoardMockup.tsx
│   ├── SynthDemoCursor.tsx
│   └── advanceGate.tsx
├── appendix/
│   └── AppendixDeck.tsx           # #appendix route
└── slides/
    ├── S01_Title.tsx              → S13_ThankYou.tsx
    ├── OurSolutionCover.tsx
    ├── SetupAccountSlide.tsx
    ├── SynthAgentWorkflowSlide.tsx
    ├── SolutionFlowSlides.tsx     # SF01_DashboardIntro, SF02_DeployExtension
    ├── SolutionDataHubSlide.tsx
    ├── DeployAgentProcessingSlide.tsx
    └── coachToolImages.ts         # S02 carousel asset registry
```

## Critical rules

1. This repo is **pitch-only**. The interactive product demo lives in `synth-platform`.
2. Every slide must read brand tokens from `src/lib/theme.ts`.
3. Inherit engine rules from `../CLAUDE.md` — don't redefine architecture, animation, or component conventions here.
4. Top-nav page counters are hardcoded; keep them in sync when slides are added/removed.
5. Pixel art must be large and architectural on section covers, not decorative confetti.

# CLAUDE.md — synth-deck (pitch deck)

## What this is

The **synth. pitch deck** — an investor/partner presentation for Synth Sports, built as a custom full-screen web app. It is one **instance** of the reusable presentation engine defined in `../CLAUDE.md` (`presentations/CLAUDE.md`); read that first for the shared architecture, component library, animation presets, and a16z State of Crypto 2023 aesthetic rules.

The repo now ships **several decks behind one build**, selected by URL hash (see Routes). This file documents what's specific to this repo: routes, the slide registries, the Simple Pitch Deck, brand, and conventions.

> synth. — Every data signal. One platform.

**Related repos**

- **Product prototype** — `~/synth-platform/` (GitHub: `abishaigeorge09/synth-platform`). The interactive Cal Women's Rowing demo the deck references. Split out so this repo is pitch-only; Solution-section slides that show product *mockups* remain here.
- **Presentation engine spec** — `../CLAUDE.md`. Shared rules for every deck on this framework.

## Stack

React 18 + TypeScript + Vite 5 + Tailwind 3.4 + Framer Motion. PWA via `vite-plugin-pwa`. Deploy: Vercel (GitHub integration — pushes to `main` build production). See `../CLAUDE.md` for the full dependency list and rules.

## Run

```bash
npm install
npm run dev       # vite (default port 5173)
npm run build     # tsc -b && vite build   (typechecks + bundles)
```

## Routes (hash-based)

`src/App.tsx` → `resolveHashRoute(window.location.hash)` selects the deck. Everything not matched falls through to the main deck.

| URL | Deck | Source |
|---|---|---|
| `/` | **Main pitch deck** (full VC deck: title → main flow → appendix tail) | `src/deck/slideRegistry.tsx` via `MainDeck` in `App.tsx` |
| `/#spd` | **Simple Pitch Deck** — trimmed 10-slide main + grouped, clickable appendix | `src/spd/SimplePitchDeck.tsx` |
| `/#indiappt` | **India pitch deck** — linear 10-slide INR deck for Indian federations/grants | `src/india/IndiaPitchDeck.tsx` |
| `/#appendix` | Draft / backup appendix deck (Q&A material) | `src/appendix/AppendixDeck.tsx` |
| `/#legacy` | Old design reference (read-only) — separate passcode `synthrowiq` | `src/legacy/` |
| `/#analytics` | Live viewer-tracking dashboard — **local dev only** | `src/analytics/LiveAnalyticsDebug.tsx` |
| `/#oldpdf` (or `/#old`) | Redirect to the archived pre-restructure deck | `OldDeckRedirect` in `App.tsx` → `https://synth-deck-old.vercel.app` |

- Also a `?viewer=<name>` query param (e.g. `/?viewer=Sequoia`) tags analytics per VC — works alongside any route.
- **Passcode gate:** the deck is blur-locked until unlocked. Password `98962005` (`src/lib/deckLock.ts`, `DeckBlurLock`). Legacy uses `synthrowiq`.
- `#oldpdf` targets `synth-deck-old.vercel.app`, a public alias to the immutable old production deployment (commit before the v3 restructure). Vercel **deployment protection is off** on this project so that alias is publicly reachable.

## Main deck — the slide registry

`src/deck/slideRegistry.tsx` is the source of truth for the main deck's order and section labels. `MainDeck` (in `App.tsx`) builds the slide array from three exports:

- `TITLE_SLIDE` — the cover (no top nav / progress).
- `MAIN_FLOW_SLIDES: RegisteredSlide[]` — the primary narrative, in order.
- `APPENDIX_TAIL_SLIDES: RegisteredSlide[]` — appendix appended after Thank You (starts with `AppendixIndexSlide`).

Each `RegisteredSlide` has `{ id, section, background, render(nav?), frame?, showTopNav?, showProgress?, showNavButtons?, hideRights? }`. `render(nav)` receives `{ sectionOverride, pageOverride }` so the same slide component can be relabeled/renumbered per deck.

Slide totals live in `src/lib/deckTotal.ts` (`DECK_SLIDE_TOTAL`, `MAIN_DECK_SLIDE_TOTAL`, `APPENDIX_MAIN_TOTAL`, `APPENDIX_SLIDE_TOTAL`). Update these when adding/removing slides. Main-flow page counters are computed from array length in `App.tsx`; a few slides still keep a hardcoded fallback used only when `pageOverride` is absent.

The main flow currently covers: Problem → Solution overview → Product demo → Our advantage → Data strategy → What synth predicts → Traction → Why now → Market → Competition → Vision → Business model → Team → Advisors → Raising (USD) → Raising (India) → India returns → Thank You → One-pager, plus the appendix tail (flywheel, growth, unit economics, budgets incl. India grant, behavioral econ, ethics, department intelligence, data privacy, pricing, product architecture, competitive quadrant, legacy Solution/Connectors). Treat `slideRegistry.tsx` as canonical — this list drifts.

## Simple Pitch Deck (`/#spd`)

`src/spd/SimplePitchDeck.tsx` — a self-contained, **order-driven** deck. Everything editable lives in two arrays at the top of the file:

- `MAIN: MainEntry[]` — title-cover + content slides + Thank You. Section numbers (`01 ·`, `02 ·`, …) are **derived from array position** in `buildMain`; `sameGroupAsPrev` shares the previous number (both "THE ASK" slides). Reorder = move a line.
- `APPENDIX: Entry[]` — everything else, grouped by `group` (theme). The appendix index (`SpdAppendixIndex`) renders these as 3 filled columns with emerald group headers; **click any row to jump** to that slide. Each appendix slide is wrapped in `AppendixBackFrame`, which shows a subtle **"← Appendix"** control (`SpdNavContext.goToId`) to return to the index. Appendix section labels + page counters are auto-numbered from position too.

Current SPD main lineup: Title → Problem → **One-pager overview** → **Advisors** → Solution → Product demo → Market → Vision → Traction → Ask (USD) → Ask (India) → Thank You. (Team lives in the SPD appendix.)

To reorder/add/remove: edit `MAIN` / `APPENDIX`. Numbers, page counters, the index, and jump nav all follow automatically.

## India pitch deck (`/#indiappt`)

`src/india/IndiaPitchDeck.tsx` — a linear, order-driven deck for Indian federations/grant pitches (SAI, Khelo India), all figures in INR. Same pattern as SPD: a `CONTENT: Entry[]` array at the top of the file is the source of truth; section numbers (`01 ·`, …) and page counters derive from array position — reorder = move a line.

Current lineup: **Title (light cover, India-specific facts card) → Problem → Target market → Solution → Competition → Business model → Team one-pager → Budget/Ask → Milestones/Deployment → Thank You.**

- Shared slides are reused with flags: `india` on `S02a_ProblemStatements`/`S03_SolutionOverview`, `inr` on `S07_Market`/`S08_BusinessModel`/`S09_Competition`; the ask is `S12b_RaisingIndia`.
- India-only components live in `src/india/`: `S_TitleIndia` (light-theme cover, no kicker, facts card: ₹1.2 Cr ask / SAI · Khelo India pipeline / Commonwealth 2030), `S_TeamOnePager`, `S_MilestonesDeployment`, `S_ThankYouIndia`. Other decks' slides are untouched.

## Numbering is `sectionOverride`-driven

Every slide's on-screen label (both `TopNav` and any in-body `SectionLabel`/kicker) now reads from the passed `sectionOverride ?? '<default>'`, so a slide shows the number of whatever deck/position renders it. This was wired across the shared appendix components and Team/Advisors/Competition/asks so the SPD's order-driven numbering shows correctly; the main deck passes its own labels, so it is unaffected (kickers are CSS-uppercased, so visuals are identical there).

## Brand theme

Single source of truth: `src/lib/theme.ts` (inherits `../CLAUDE.md` §THEME). Key tokens: `name: 'synth.'`, `primary: #059669` (emerald), `accent: #10B981` (logo dot), `fontMono: JetBrains Mono`, `fontSerif: Fraunces`, `fontSans: Instrument Sans`.

**Icons / mascot (SynthDog):** brand assets live in `public/brand/` (sourced from `~/Desktop/synth-brand-kit/`):

- `synth-splash-icon.png` — the SynthDog app icon (dog on green). **Favicon + apple-touch-icon** (`index.html`) and **PWA manifest icon** (`vite.config.ts`), and the brand mark on the **Title** and **Thank You** slides.
- `synth-app-icon.png` — dog app-icon crop; used as the brand mark on Solution cover, the Competition table, and illustrations.
- `synthdog.png` — full-body mascot cutout (available; not currently placed).
- `synth-s-logo.png` — the old green "S" tile; **retired** (no longer referenced).

The former `public/logos/synth-icon-green.svg` ("S" tile) is no longer used anywhere. Wordmark SVGs in `public/logos/` still exist for text-logo contexts.

## Working conventions

- **Read brand tokens from `theme.ts`** — no hardcoded colors (except brand hexes deliberately mirrored in SPD helpers).
- **Keep the a16z DNA** — monospace headlines, highlight bars, pixel art on section covers, dashed rules, stat cards with colored left borders.
- **Target viewport 1440×900** — `SlideShell` letterboxes other sizes; slides use `overflow-hidden`, so content must fit (no scroll).
- **Adding a main-deck slide:** add a `RegisteredSlide` to `MAIN_FLOW_SLIDES` (or `APPENDIX_TAIL_SLIDES`) in `slideRegistry.tsx`; update `deckTotal.ts`.
- **Adding an SPD slide:** add an entry to `MAIN`/`APPENDIX` in `SimplePitchDeck.tsx` — numbering is automatic.
- **On-slide numbers:** drive them through `sectionOverride`/`pageOverride`; never hardcode a new number in a slide body.
- **Verify with `npm run build`** (runs `tsc -b`) before committing; the dev server HMR + a hard refresh (favicons cache) is enough for visual checks.

## Deploy

Vercel GitHub integration. Working branch is `feat/vc-presentation`; production tracks `main`. Flow used this repo:

```bash
git add -A && git commit -m "..."
git push origin feat/vc-presentation          # preview build
git push origin HEAD:main                     # fast-forward main → production build
```

The GitHub account with write access is **abishaigeorge09** (`gh auth switch --user abishaigeorge09` if pushes 403). Production alias: `synth-deck.vercel.app`.

## File map (deck-specific)

```
src/
├── App.tsx                        # hash router: main / spd / appendix / legacy / analytics / oldpdf
├── deck/slideRegistry.tsx         # MAIN deck: TITLE_SLIDE, MAIN_FLOW_SLIDES, APPENDIX_TAIL_SLIDES
├── spd/SimplePitchDeck.tsx        # /#spd deck: MAIN + APPENDIX arrays, clickable index, back nav
├── india/                         # /#indiappt deck: IndiaPitchDeck.tsx (CONTENT array) + India-only slides
├── appendix/AppendixDeck.tsx      # /#appendix draft deck
├── legacy/                        # /#legacy old deck (read-only)
├── analytics/LiveAnalyticsDebug.tsx  # /#analytics (local dev only)
├── lib/
│   ├── theme.ts                   # brand tokens
│   ├── deckTotal.ts               # slide-count constants
│   ├── deckLock.ts                # passcode (98962005)
│   ├── motion.ts · pixelPatterns.ts · setupSlideEvents.ts
├── components/                    # shared engine components (SlideShell, TopNav, DeckBlurLock, …)
└── slides/                        # slide components (S01_Title … S13_ThankYou, Appendix*, S12b/S12c India, …)

public/
├── brand/                         # SynthDog icons (favicon, app-icon, mascot)
└── logos/                         # wordmark SVGs
```

## Critical rules

1. This repo is **pitch-only**. The interactive product demo lives in `synth-platform`.
2. Every slide reads brand tokens from `src/lib/theme.ts`.
3. Inherit engine rules from `../CLAUDE.md` — don't redefine architecture, animation, or component conventions here.
4. Drive on-slide section/page numbers via `sectionOverride`/`pageOverride`, not hardcoded strings.
5. `#spd` numbering/index/back-nav all derive from the `MAIN`/`APPENDIX` arrays — reorder by moving lines, don't renumber by hand.
6. Pixel art must be large and architectural on section covers, not decorative confetti.
```

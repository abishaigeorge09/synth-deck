## Pitch deck template (web-based)

This repo is a **web pitch deck**, not PowerPoint: a full-screen React app where **each slide is a component** and the deck is navigated like a presentation.

This document explains **how the deck is structured** and how to use it as a template for your own pitch deck.

### Design + aesthetic sources (read these first)

- **Engine + design rules (global)**: `presentations/CLAUDE.md`
  - This is the “design MD” that defines the **a16z State of Crypto 2023** aesthetic, motion presets, typography hierarchy, and the shared component library.
- **This deck’s specifics**: `synth-deck/CLAUDE.md`
  - Narrative arc, slide inventory, branding notes, theme tokens, and deck-specific conventions.

When building your own pitch deck from this template:
- **Follow `presentations/CLAUDE.md` for how it should look** (typography, spacing, highlight bars, pixel art, dashed rules, cards, and motion).
- Only change brand tokens/content in your deck repo; **don’t reinvent the engine patterns**.

---

## Mental model

- **Slides are React components** in `src/slides/`.
- The deck is rendered by `SlideShell` as a **full-screen 16:9 canvas** (letterboxed on other aspect ratios).
- Navigation is handled at the shell level (keyboard + click).
- A **TopNav** (brand · deck name · year · section · page) is optionally shown per slide.
- The **slide order** is defined in one registry (`src/deck/slideRegistry.tsx`) and then turned into the runtime deck in `src/App.tsx`.

---

## Repo structure (what matters)

```text
src/
  App.tsx                     Deck composition (main + appendix tail)
  main.tsx                    React entry
  index.css                   Global styles (Tailwind + resets)

  deck/
    slideRegistry.tsx         Slide registration + ordering (source of truth)

  lib/
    theme.ts                  Brand tokens (colors, fonts, logo behavior)
    motion.ts                 Shared Framer Motion presets
    pixelPatterns.ts          Pixel block layout generators
    deckTotal.ts              Slide totals used for page counters

  components/
    SlideShell.tsx            Fullscreen container, enforces 16:9, handles nav + transitions
    TopNav.tsx                a16z-style top bar
    PixelArt.tsx              Architectural pixel art overlays (section covers, etc.)
    HighlightLine.tsx         Monospace highlight bars
    DashedRule.tsx            Dashed separators
    StatCard.tsx              Dark stat cards w/ colored left border
    PaperTexture.tsx          Subtle grain overlay
    DeckAdvanceContext.tsx    “Advance deck” context (auto-advance hooks)
    advanceGate.tsx           Gated advancing (e.g., to prevent accidental click-through)
    MobileLandscapeGate.tsx   Phone/viewport gating (if enabled)

  appendix/
    AppendixDeck.tsx          Separate appendix mode (via hash route)

public/
  logos/                      Logo SVG variants
  coach_tools_images/         Image assets used by slides (example)
```

---

## How slides are ordered (the source of truth)

### `src/deck/slideRegistry.tsx`

This file defines:
- `TITLE_SLIDE`: the first slide (often no TopNav/progress).
- `MAIN_FLOW_SLIDES`: the main pitch flow after the title.
- `APPENDIX_TAIL_SLIDES`: appendix slides appended after the main flow (still in the primary deck).

Each slide is registered as:
- `id`: stable identifier for deep-linking, debugging, and reordering.
- `section`: TopNav section label (e.g., `"06 · MARKET"`).
- `background`: background color token (typically from `THEME`).
- `render(navOverrides?)`: renders the slide component and passes optional nav overrides.
- optional flags: `frame`, `showTopNav`, `showProgress`, `showNavButtons`.

### `src/App.tsx`

`App.tsx` is where the registered slide list becomes the runtime deck:
- Computes page strings like `"2 / N"` automatically from the registry order.
- Produces `SlideDef[]` for `SlideShell`.
- Chooses between:
  - **Main deck** (default)
  - **Appendix deck** (`#appendix` route)

Key pattern:
- Main flow page numbering is **assigned automatically** by index in `MAIN_FLOW_SLIDES` (title is page 1).
- Appendix tail page numbering is **local** within `APPENDIX_TAIL_SLIDES`.

---

## Slide anatomy (what a slide component should do)

Most slides follow this structure:
- Root: `div` with `className="absolute inset-0 ..."`, no scrolling.
- TopNav: `<TopNav section={...} page={...} tone="light|dark" />` (unless intentionally disabled).
- Content: a 2-column or centered layout, consistent gutters, consistent typography.

Important:
- **Do not hardcode colors in slides.** Use `THEME` tokens from `src/lib/theme.ts`.
- Keep layout tuned for **1440×900** (engine target).

---

## Navigation + transitions

Defined by the engine (see `presentations/CLAUDE.md`):
- Click anywhere to advance (with guard rails via `advanceGate` if enabled).
- Arrow keys: right/space/enter = next, left/backspace = previous.
- Transitions: Framer Motion page fade + slight vertical slide.

`SlideShell.tsx` is the component that:
- enforces the 16:9 stage,
- applies transitions,
- draws progress bar and nav buttons when enabled.

---

## Theming (how to “reskin” for a new deck)

### `src/lib/theme.ts`

This is the **single source of truth** for brand:
- colors (primary/accent + semantic palette)
- fonts (mono/sans/serif)
- top-nav metadata (deck name + year)
- pixel art settings
- logo reveal behavior

To template this deck for a new company:
- Copy `src/lib/theme.ts` and update:
  - `name`, `tagline`, `deckName`, `year`
  - `primary`, `accent`, and related palette values
  - font families/import (if changing)

### Logos

Use the correct SVG variant from `public/logos/` depending on background.
The mapping rules live in `presentations/CLAUDE.md`.

---

## Design rules you should copy (the “how it should look” checklist)

These come from `presentations/CLAUDE.md` and should stay consistent deck-to-deck:

- **Typography hierarchy**
  - Section covers: monospace, uppercase, tight tracking
  - Body headlines: serif (or strong sans), large + clean
  - Data: monospace
- **A16z DNA**
  - Highlight bars staircase per line
  - Dashed rules as separators on content slides
  - Dark stat cards with colored left border
  - Subtle grain (`PaperTexture`) on premium slides
- **Pixel art**
  - Large, architectural blocks (not confetti)
  - Use `PixelArt` with patterns like `cascade-tr` / `cascade-bl`
- **Motion**
  - Use shared `TRANSITIONS`, `VARIANTS`, `STAGGER` from `src/lib/motion.ts`
  - Avoid bespoke timings unless there’s a strong reason
- **No chart libraries**
  - Build charts with divs + Framer Motion patterns from the engine

---

## Adding a new slide (recommended workflow)

1. Create a slide component in `src/slides/` (e.g. `S14_NewSlide.tsx`)
2. Ensure it reads brand tokens from `THEME`.
3. Register it in `src/deck/slideRegistry.tsx`
   - add it to `MAIN_FLOW_SLIDES` (main story) or `APPENDIX_TAIL_SLIDES` (appendix tail)
4. Verify page counters show correctly (TopNav page strings are passed via `pageOverride`).
5. Run:

```bash
npm run dev
npm run build
```

---

## Appendix modes (two kinds)

This codebase supports two appendix concepts:

- **Appendix tail**: slides appended after the main flow in the primary deck
  - Defined by `APPENDIX_TAIL_SLIDES` in `src/deck/slideRegistry.tsx`
- **Standalone appendix deck**: a dedicated appendix route via hash
  - Rendered by `src/appendix/AppendixDeck.tsx` when URL hash is `#appendix`

Use appendix for:
- market math backups
- deeper product workflows
- competitive teardown
- pricing/pricing proof points

---

## Asset management

- Put static assets in `public/` so they can be referenced by absolute path (e.g. `/logos/...`).
- Keep slide-specific registries when helpful (example: `src/slides/coachToolImages.ts`).
- Prefer SVG for crisp UI marks; PNG/JPG/WebP for photos/screenshots.

---

## Template porting checklist (copy this repo to a new pitch deck)

- **Brand**
  - Update `src/lib/theme.ts`
  - Replace logo SVGs in `public/logos/`
- **Slide order**
  - Replace `MAIN_FLOW_SLIDES` content in `src/deck/slideRegistry.tsx`
- **Content**
  - Duplicate slides in `src/slides/` and rewrite text/visuals
- **Design compliance**
  - Audit against `presentations/CLAUDE.md` (typography, highlight bars, pixel art, spacing)
- **Build**
  - `npm run build` must pass


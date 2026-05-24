# Appendix Update Plan

**Date started:** 2026-05-23
**Branch:** `feat/vc-presentation`
**Scope:** Update 11 appendix slides + index. Restore main-flow target state so total deck = 29 (17 main + 12 appendix).

---

## Target structure

**Main deck (17 slides total):**
1. Cover
2. `01 · PROBLEM`
3. `02 · SOLUTION`
4. `03 · PRODUCT DEMO`
5. `04 · THE INSIGHT` ← restore from orphan
6. `05 · DATA STRATEGY`
7. `06 · WHAT SYNTH PREDICTS`
8. `07 · TRACTION`
9. `08 · WHY NOW`
10. `09 · MARKET SIZE`
11. `10 · COMPETITION`
12. `11 · THE VISION`
13. `12 · BUSINESS MODEL`
14. `13 · TEAM`
15. `14 · ADVISORS`
16. `15 · RAISING`
17. Thank You

**Appendix (12 slides total, no separate cover):**
1. Index page
2. `A1 · THE FLYWHEEL`
3. `A2 · GROWTH MODEL`
4. `A3 · UNIT ECONOMICS`
5. `A4 · PRE-SEED BUDGET`
6. `A5 · BEHAVIORAL ECONOMICS`
7. `A6 · TWO-WAY SYNC`
8. `A7 · DEPARTMENT INTELLIGENCE`
9. `A8 · DATA & PRIVACY`
10. `A9 · PRICING TIERS DETAIL`
11. `A10 · PRODUCT ARCHITECTURE`
12. `A11 · 2×2 MATRIX` (Competitive Quadrant)

---

## Current state vs. target

### Main deck pre-batch work (must happen before batches)
| Slide | Current | Target |
|---|---|---|
| The Insight | Orphan (not in registry) | Slide 4 main flow as `04 · THE INSIGHT` |
| All sections 04+ | Renumbered down 1 (no Insight) | Re-shifted up 1 to match target |
| Appendix cover (`AppendixCoverSlide`) | Present in registry | Removed (index becomes first appendix slide) |

### Appendix content slides
| Slide | Current state | Target state |
|---|---|---|
| A1 Flywheel | Built in last pass (good baseline) | Refine to match spec (no em-dashes, polish) |
| A2 Growth model | Built in last pass | Verify against spec table + 3 callouts |
| A3 Unit economics | Built in last pass | Verify + add "Consumer is the wedge…" footer |
| A4 Pre-seed budget | `PlaceholderSlide` | Build: 6 horizontal bars + 3 milestone cards + footer |
| A5 Behavioral economics | `PlaceholderSlide` | Build: 2×3 grid of 6 mechanism cards |
| A6 Two-way sync | `PlaceholderSlide` | Build: source→synth→destination flow SVG + 3 example flow cards |
| A7 Department intelligence | `PlaceholderSlide` | Build: split layout (problem left / solution right) + 3 metric cards |
| A8 Data & privacy | `AppendixDataPrivacy` (existing custom slide) | Replace: 2×2 pillar cards + 2 feature callouts + footer |
| A9 Pricing tiers detail | `PlaceholderSlide` | Build: 6 pricing tier cards (2×3 row) |
| A10 Product architecture | `PlaceholderSlide` | Build: 4 stacked architecture layers SVG + 3 principle callouts |
| A11 Competitive quadrant | `PlaceholderSlide` | Build: 2×2 quadrant SVG with plotted competitors + insight callout |

---

## Execution order

**Pre-batch (Step 0)** — COMPLETE
- [x] Create this plan file
- [x] Restore `TheInsightSlide` into `MAIN_FLOW_SLIDES` at position 4 as `04 · THE INSIGHT`
- [x] Renumber sections in `slideRegistry.tsx` for slides 05–15
- [x] Update hardcoded section labels in each affected slide component
- [x] Reset The Insight slide's own kicker to `04 · THE INSIGHT`
- [x] Remove `AppendixCoverSlide` entry from `APPENDIX_TAIL_SLIDES`
- [x] Update `deckTotal.ts`: `APPENDIX_MAIN_TOTAL` 13 → 12, `MAIN_DECK_SLIDE_TOTAL` 16 → 17

**Batch 1 — slides A1, A2, A3** — COMPLETE
- [x] A1 Flywheel — already built last pass, verified clean (no em-dashes, footer present)
- [x] A2 Growth model — already built last pass, table + 3 callouts + footer in place
- [x] A3 Unit economics — added "Consumer is the wedge. Institutional is the outcome." footer

**Batch 2 — slides A4, A5, A6** — COMPLETE
- [x] A4 Pre-seed budget breakdown — created `AppendixPreSeedBudget.tsx`, wired to registry
- [x] A5 Behavioral economics — created `AppendixBehavioralEconomics.tsx`, wired to registry
- [x] A6 Two-way sync — created `AppendixTwoWaySync.tsx`, wired to registry

**Batch 3 — slides A7, A8, A9** — COMPLETE
- [x] A7 Department intelligence — created `AppendixDepartmentIntelligence.tsx`, wired
- [x] A8 Data & privacy — created `AppendixDataPrivacyV2.tsx`, registry switched, old `AppendixDataPrivacy` import removed
- [x] A9 Pricing tiers detail — created `AppendixPricingTiers.tsx`, wired; section label renamed to `A9 · PRICING TIERS DETAIL`

**Batch 4 — slides A10, A11** — COMPLETE
- [x] A10 Product architecture — created `AppendixProductArchitecture.tsx`, wired
- [x] A11 Competitive quadrant — created `AppendixCompetitiveQuadrant.tsx`, wired; section label `A11 · 2×2 MATRIX`

**Final cleanup** — COMPLETE
- [x] Appendix index: 11 items with "Growth model", page counter auto from registry length (12)
- [x] Section badges A1 → A11 sequential, no gaps
- [x] Visual consistency: cream bg everywhere, no em-dashes in copy (titles use comma/period/line-break), "synth" lowercase in prose
- [x] Counts: main=17 (Title + 15 sections + Thank You), appendix=12 (Index + 11 content), total=29
- [x] `npm run build` clean (tsc + vite + PWA)

---

## Final summary (2026-05-23)

**Total slides modified:** 14 source files updated, 8 new slide components created.

**New files created:**
- `src/slides/AppendixFlywheel.tsx` (Batch 1, previous pass)
- `src/slides/AppendixGrowthModel.tsx` (Batch 1, previous pass)
- `src/slides/AppendixUnitEconomics.tsx` (Batch 1, previous pass)
- `src/slides/AppendixPreSeedBudget.tsx` (Batch 2)
- `src/slides/AppendixBehavioralEconomics.tsx` (Batch 2)
- `src/slides/AppendixTwoWaySync.tsx` (Batch 2)
- `src/slides/AppendixDepartmentIntelligence.tsx` (Batch 3)
- `src/slides/AppendixDataPrivacyV2.tsx` (Batch 3, replaces old `AppendixDataPrivacy.tsx`)
- `src/slides/AppendixPricingTiers.tsx` (Batch 3)
- `src/slides/AppendixProductArchitecture.tsx` (Batch 4)
- `src/slides/AppendixCompetitiveQuadrant.tsx` (Batch 4)
- `docs/APPENDIX_PLAN.md` (this plan)

**Files edited:**
- `src/deck/slideRegistry.tsx` — restored The Insight in main flow, renumbered main sections, removed `appx-cover`, wired all 11 new appendix slides
- `src/slides/AppendixIndexSlide.tsx` — 11 entries, "Growth model" + "Data & privacy" labels updated
- `src/slides/AppendixUnitEconomics.tsx` — added "Consumer is the wedge…" footer
- `src/slides/TheInsightSlide.tsx` — kicker restored to `04 · THE INSIGHT`
- `src/slides/DataStrategySlide.tsx`, `WhatSynthPredictsSlide.tsx`, `S05_Traction.tsx`, `S06_WhyNow.tsx`, `S07_Market.tsx`, `S09_Competition.tsx`, `S11_Vision.tsx`, `S08_BusinessModel.tsx`, `S10_Team.tsx`, `S05a_Advisors.tsx`, `S12_Close.tsx` — section numbers shifted +1 to accommodate restored Insight
- `src/lib/deckTotal.ts` — `MAIN_DECK_SLIDE_TOTAL` 16→17, `APPENDIX_MAIN_TOTAL` 13→12

**Deviations from spec (with rationale):**
- **A11 section label:** spec said "A11 · 2×2 MATRIX" (multiplication sign) — used the `×` character to match, not the letter `x`. Title in body reads "Competitive quadrant." per spec.
- **Colored top stripes on cards:** my saved feedback rule discourages colored card-edge stripes, but the spec explicitly requested them for A2/A3 callouts and A9 tier cards (and my saved rule has an exception clause for explicit requests). Stripes included.
- **No em-dash literal characters anywhere** in copy. Where spec text used em-dashes as "title — description" separators, I rendered title and description on separate lines instead.
- **`AppendixDataPrivacy.tsx` (old file)** remains on disk but unreferenced — not deleted to preserve git history; safe to delete later.
- **`PlaceholderSlide.tsx`** is no longer referenced by the registry. It can be deleted once you confirm no draft slides need it.

**Items needing human review / follow-up:**
- The orphaned slide components (`AppendixCoverSlide.tsx`, `AppendixDataPrivacy.tsx`, `PlaceholderSlide.tsx`, `S03a_ProblemEverywhere.tsx`, `S02_Problem.tsx`, `OurSolutionCover.tsx`, `ProductDemoSlide.tsx`) are no longer wired to the registry but still on disk. Decide whether to delete or keep as archived components.
- Verify the appendix counts in your TopNav match expectations: with the cover removed, the Index now reads "APPENDIX 1 / 12" and the last content slide reads "APPENDIX 12 / 12".
- A few callout sentences contain `&apos;` (e.g. "synth doesn't just show data"). Rendered fine but if you want straight apostrophes in the source, search/replace.

**Verification:**
- `tsc -b && vite build` → clean, 50 PWA entries precached, no warnings except pre-existing chunk-size hint.

---

## Design pattern decisions

- **Card style:** white fill, rounded `rounded-2xl` (~16px), `1px THEME.border`, shadow `0 8px 24px rgba(24,24,27,0.06)`. Mirrors what's used on Traction validation cards and Business Model tier cards.
- **Colored top stripes on callout cards:** explicitly used in this spec — 5px `h-[5px]` stripe with category color. This overrides my saved "no colored card borders" rule because the spec calls for them explicitly (an exception clause in the saved rule).
- **Tables:** header row light-gray bg + uppercase mono labels (mirrors Competition table); highlighted rows use `${color}14` background.
- **Section kicker:** `THEME.fontMono` 10–12px, tracked caps `0.24em`, in `THEME.accent` green. Title `THEME.fontMono` clamp(28–44px).
- **No em-dashes** in any new copy. Use commas, periods, or line breaks.
- **"synth" lowercase, no period** in prose. The period is only on the visual logo mark.
- **For SVG diagrams:** simple, restrained, on cream — mirrors hub-and-spoke (The Insight) and bowling pins (Vision). Avoid heavy glows or animations.

---

## Files I expect to modify

**Source files (new):**
- `src/slides/AppendixPreSeedBudget.tsx`
- `src/slides/AppendixBehavioralEconomics.tsx`
- `src/slides/AppendixTwoWaySync.tsx`
- `src/slides/AppendixDepartmentIntelligence.tsx`
- `src/slides/AppendixDataPrivacyV2.tsx` (replacing `AppendixDataPrivacy.tsx` reference)
- `src/slides/AppendixPricingTiers.tsx`
- `src/slides/AppendixProductArchitecture.tsx`
- `src/slides/AppendixCompetitiveQuadrant.tsx`

**Source files (edit existing):**
- `src/deck/slideRegistry.tsx` — restore The Insight to main flow, renumber sections, swap appendix placeholders for real slide imports, drop appendix cover
- `src/slides/AppendixIndexSlide.tsx` — make sure 11 entries match new structure
- `src/slides/AppendixFlywheel.tsx` — quick polish if needed
- `src/slides/AppendixGrowthModel.tsx` — quick polish if needed
- `src/slides/AppendixUnitEconomics.tsx` — add footer
- `src/slides/TheInsightSlide.tsx` — kicker text back to `04 · THE INSIGHT`
- `src/slides/DataStrategySlide.tsx`, `WhatSynthPredictsSlide.tsx`, `S05_Traction.tsx`, `S06_WhyNow.tsx`, `S07_Market.tsx`, `S09_Competition.tsx`, `S11_Vision.tsx`, `S08_BusinessModel.tsx`, `S10_Team.tsx`, `S05a_Advisors.tsx`, `S12_Close.tsx` — restore old section numbers (each shifts +1)
- `src/lib/deckTotal.ts` — update constants

---

## Progress log

(Append batch completion timestamps and notes below as work progresses.)

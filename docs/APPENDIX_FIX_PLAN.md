# Appendix Fix Plan (round 2)

**Date:** 2026-05-23
**Branch:** `feat/vc-presentation`
**Scope:** Address screenshot feedback — overlap, dead vertical space, tiny text, AI-generated feel of the Flywheel + Architecture diagrams, compliance logos on Data & Privacy, stripe-free index, gray-text cleanup.

---

## Problems identified (from screenshots)

| # | Symptom | Where | Fix |
|---|---|---|---|
| 1 | "THE SYNTH QUADRANT" header text overlaps the green `synth` dot label | A11 Competitive Quadrant | Move synth dot down + in; push corner label further into corner; raise dot label clear of quadrant labels |
| 2 | Massive empty white band at the bottom of slide | A11, A8, A6, A4, A2, A3 | Make every flex container `min-h-0 flex-1 justify-between` (top zone, body, bottom zone) so content distributes top↔bottom. |
| 3 | Card body text too small | A8, A9, A4, A3 | Bump card-body text to 15–17px, bullets to 14–15px minimum |
| 4 | Stripe on Consumer Athlete card (and a thin green line above CONSUMER ATHLETE label) | A9 Pricing tiers | Stripe should be GONE — verify the deployed build is current. If still present in your dev build, hard-refresh; my last commit stripped them. |
| 5 | Gray italic micro-text under every slide (e.g. "Pre-seed (\$350K) + seed (\$2.5M) covers this entirely. Profitable from Year 3.", "Four revenue layers: SaaS…", "EBITDA positive at \$2.0M…", "Cash needs = cumulative negative EBITDA…", "4-MONTH PAYBACK FLOOR" red microline alone in a sea of white) | All appendix slides + A2 table caption + A3 legend text | Remove the freestanding italic footers and reposition any "key" lines (4-month floor, 3× floor) inside the chart panel, not as orphan text |
| 6 | Index page screenshot still shows 14 items with Advisors / Problem cover / Solution cover and label "Data & privacy / ethics" | A0 Index | Already updated in source — your screenshot is stale. After this round I'll confirm by re-screenshotting from a fresh build. |
| 7 | A10 Architecture looks AI-generated, stacked layer-cards feel template-y | A10 Product Architecture | Rebuild as horizontal flow diagram with labeled shapes (cylinder data sources → boxes → surfaces) connected by drawn arrows; inline labels inside the shapes, not in a list below. Inspiration: your image #50 (Platform Architecture) — but in synth's cream + green palette, not navy + blue. |
| 8 | A1 Flywheel doesn't look hand-crafted; descriptions live in a side list rather than next to each step | A1 Flywheel | Rebuild: 4 (or keep 6) labeled BOXES arranged around the central "synth flywheel" circle with arrows clockwise. Each box contains its number + title + 1–2 line description inline. Inspiration: your image #49. |
| 9 | A5 Behavioral economics feels cluttered with 6 cards on one slide | A5 Behavioral Economics | Two options: (a) split into two slides A5a (mechanisms 01–03) + A5b (04–06), 3 per page with bigger mockups; or (b) keep 6 in a 3-row 2-col grid but cut definition+example down to one sentence each. **Need your call.** |
| 10 | A8 Data & Privacy needs compliance LOGOS + costs | A8 Data & Privacy | Replace the 4-pillar layout with: (a) compliance logo wall (SOC 2, FERPA, HECVAT, GDPR, HIPAA, ISO 27001 — whichever apply), (b) cost table per cert, (c) keep the 2 feature callouts at bottom (Per athlete · scoped / Aggregate · anonymized). **Need your list of certs + costs; placeholders below.** |
| 11 | The bottom platform-architecture micro-footer (Built in 6 months. Ships in days…) is one of the freestanding gray lines that needs to go | A10 | Removed when I rebuild |

---

## Approach per slide

### A0 — Appendix index
- No changes required to the data — current source already lists the 11 items with "Growth model". Screenshot is stale.
- Will re-verify after build.

### A1 — The Flywheel (rebuild for hand-crafted feel)
- 4 boxes arranged in a 2×2 around a center circle labeled `DATA FLYWHEEL`:
  - 01 ATHLETE CONNECTS (top-left, green)
  - 02 SYNTH SYNTHESIZES (top-right, blue)
  - 03 PREDICTIONS SHARPEN (bottom-right, amber)
  - 04 COACHES ACT (bottom-left, purple)
- Each box: number + bold title + 2-line description **inside** the box, no side list.
- Arrows clockwise between boxes; arrows pass behind the central circle.
- Center circle labeled `SYNTH FLYWHEEL`.
- Will I lose nodes 5 & 6 from the prior spec? **Yes**, because the inspiration shows 4 boxes, not 6. The remaining ideas (Outcomes validate / More athletes join) can fold into "Predictions sharpen" + "Athlete connects" descriptions.

### A2 — Growth model
- Keep table + 3 callouts.
- Remove italic footer line. Re-check spacing so the slide fills vertically.

### A3 — Unit economics
- Already has charts; remove the "4-MONTH PAYBACK FLOOR" / "3× LTV/CAC FLOOR" floating gray microlines underneath each chart — those labels move INSIDE the chart card as a small in-chart legend chip, not free-floating.
- Bump card-body / table text by ~1–2px.

### A4 — Pre-seed budget
- Strip italic footer.
- Stretch milestone cards to fill bottom.

### A5 — Behavioral economics (decision needed)
- Option A: split into A5a + A5b. 3 mechanisms per slide. Bigger mockups (200×160 each, vs current 160×88). Index updates to 12 items (one extra).
- Option B: 3×2 single slide with simplified descriptions (one sentence definition + one sentence outcome, no separate "example" sentence).
- **Default if no answer:** Option B (keep slide count at 11).

### A6 — Two-way sync
- Strip italic footer.
- Already flow-diagram + 3 cards — just verify spacing.

### A7 — Department intelligence
- Strip italic footer.
- Make 2-column problem/answer + 3 stat cards fill vertical space evenly.

### A8 — Data & privacy (rebuild around compliance + costs)
- Layout: heading + subtitle on top, compliance logo wall in the middle, cost table on the right, 2 feature callouts at bottom.
- **Logos needed (placeholder):** SOC 2, FERPA, HECVAT, ISO 27001, GDPR, HIPAA. Will hunt for SVGs the same way I did for backers (search synth-platform repo + use graceful fallback for missing).
- **Costs (placeholder until you confirm):**
  - SOC 2 Type 1 — \$15–25K initial, \$15K/yr maintenance
  - SOC 2 Type 2 — \$25–40K initial, \$25K/yr
  - FERPA alignment — counsel review, \$3–5K
  - HECVAT self-assessment — \$2–4K
  - ISO 27001 — \$30–50K initial, \$20K/yr
  - HIPAA readiness — \$8–12K
  - GDPR readiness — \$5–10K

### A9 — Pricing tiers
- Verify stripes are gone in current source (they are — see commit). If stripe still showing on your screen it's a cached build.
- Stretch cards so vertical space fills.

### A10 — Product architecture (rebuild for hand-crafted feel)
- Horizontal flow diagram, left → right:
  - Far left: 3 cylinders (Proprietary, Partner, Public)
  - Middle-left: Athlete profiles box
  - Center: Prediction engine box
  - Middle-right: Decision / surface box
  - Far right: Coach + Athlete surfaces
  - Top: feedback loop arrow labeled "outcome validation" pointing back into prediction engine
- Drawn arrows between every step, labels INSIDE each shape.
- No side list. No layer-card stack. No italic footer.
- Inspiration: image #50 styled in cream + synth green.

### A11 — Competitive quadrant
- Move synth dot from (88, 88) → (78, 78) so it's clear of the corner label.
- Move "THE SYNTH QUADRANT" corner label further into the corner (right and up) and reduce the dot's halo radius so labels don't collide.
- Raise the "synth" dot caption label by another 10px so it's visibly above the dot.

---

## Files I expect to touch

**Rebuild:**
- `src/slides/AppendixFlywheel.tsx` — full rebuild for hand-crafted look
- `src/slides/AppendixProductArchitecture.tsx` — full rebuild for hand-crafted look
- `src/slides/AppendixDataPrivacyV2.tsx` — replace pillar layout with compliance logos + cost table
- `src/slides/AppendixBehavioralEconomics.tsx` — simplify (depends on Option A/B)
- `src/slides/AppendixCompetitiveQuadrant.tsx` — fix dot positions + label collision

**Trim italic footers + stretch layouts:**
- `src/slides/AppendixGrowthModel.tsx`
- `src/slides/AppendixUnitEconomics.tsx`
- `src/slides/AppendixPreSeedBudget.tsx`
- `src/slides/AppendixTwoWaySync.tsx`
- `src/slides/AppendixDepartmentIntelligence.tsx`
- `src/slides/AppendixPricingTiers.tsx`

**No change needed (already clean):**
- `src/slides/AppendixIndexSlide.tsx`
- `src/lib/deckTotal.ts`
- `src/deck/slideRegistry.tsx`

**New file possibly (if split A5):**
- `src/slides/AppendixBehavioralEconomicsB.tsx`

---

## Open questions (will block execution if not answered)

1. **A5 layout** — split into two slides (3 each, bigger mockups), or keep 6 on one slide with one-sentence descriptions?
2. **A8 compliance certs + costs** — confirm the list and cost figures, or proceed with the placeholder numbers above?

I'll start with everything that ISN'T blocked on those answers, and circle back to A5/A8 after you reply.

---

## Execution order (after plan approval)

1. [x] A11 Quadrant overlap fix — synth dot moved from (88,88) → (78,76); halo trimmed; dot label moved BELOW the dot to clear the corner header
2. [x] Strip italic footers — removed "Cash needs = cumulative…" from A2 and the floating "4-MONTH PAYBACK FLOOR" / "3× LTV/CAC FLOOR" microlines from A3 chart cards
3. [x] A1 Flywheel rebuilt — 4 labeled boxes in 2×2 around a center circle, body inside each box, clockwise drawn arrows
4. [x] A10 Architecture rebuilt — horizontal flow: 3 source cylinders → store box → prediction engine → 4 surface boxes, with outcome-validation feedback arc
5. [x] A5 split into A5a + A5b — 3 mechanisms each, each row 300px-wide mockup + headline + example
6. [x] A8 rebuilt — totals bar at top + 7 cert cards in a 4×2 grid + 8th slot holds the two feature callouts
7. [x] Index updated to 12 entries (Behavioral economics 1/2 + 2/2 split). deckTotal `APPENDIX_MAIN_TOTAL` 12→13, `DECK_SLIDE_TOTAL` 29→30
8. [x] Build verify — `tsc -b && vite build` clean

**Batch complete.** Open `npm run dev` and step through.

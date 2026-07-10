# Simple Pitch Deck (`/#spd`) — Content Index

Full contents of the Simple Pitch Deck. Source of truth: `src/spd/SimplePitchDeck.tsx`
(arrays `MAIN` and `APPENDIX`). Numbering, page counters, the appendix index, and
jump navigation all derive from array order — this document mirrors that order.

- **Route:** `https://synth-deck.vercel.app/#spd`
- **Passcode:** `98962005`
- **Structure:** Title cover → 9 numbered main slides (both "asks" share number 09) → Thank You → Appendix (index + 23 slides).
- Every appendix slide has a subtle **"← Appendix"** control; the appendix index rows are clickable and jump straight to a slide.

---

## Main lineup

Section numbers auto-derive from order. The **Overview** slide renders full-bleed with no top nav (so no visible section label). Both **Ask** slides share section `09` (`sameGroupAsPrev`).

| Page | Section | Slide | Component | What it conveys |
|---|---|---|---|---|
| — | — | Title (cover) | `S01_Title` | Green cover, synth wordmark + SynthDog app icon, tagline. No nav/progress. |
| 1 / 11 | 01 · PROBLEM | Problem | `S02a_ProblemStatements` | The problem statements — dispersed data, no single view, injury from overtraining. |
| 2 / 11 | 02 · OVERVIEW | One-pager overview | `OnePagerOverview` | The entire pitch on a single page (full-bleed, no top nav). |
| 3 / 11 | 03 · ADVISORS | Advisors | `S05a_Advisors` | The operators and researchers backing synth. |
| 4 / 11 | 04 · SOLUTION | Solution | `S03_SolutionOverview` | The unified surface — how synth connects and synthesizes. |
| 5 / 11 | 05 · PRODUCT DEMO | Product demo | `ProductDemoStatic` | The synth agent capturing and syncing coach data. |
| 6 / 11 | 06 · MARKET | Market opportunity | `S07_Market` | TAM / SAM / SOM. SOM caption: "Obtainable market within current channel reach." (dark slide) |
| 7 / 11 | 07 · VISION | Vision | `S11_Vision` | Custom base apps, one synth layer, every program. |
| 8 / 11 | 08 · TRACTION | Traction | `S05_Traction` | Cal Men's & Women's Rowing pilot — real rosters, real feedback. |
| 9 / 11 | 09 · THE ASK | Ask — USD | `S12_Close` | $350K pre-seed, 16-month runway, use of funds. |
| 10 / 11 | 09 · THE ASK | Ask — India | `S12b_RaisingIndia` | ₹1.2 Crore India grant, 12-month runway, use of funds. |
| 11 / 11 | THANK YOU | Thank you | `S13_ThankYou` | Closing slide — SynthDog app icon, "Thank you.", Website + Live app QR codes. |

---

## Appendix (23 slides + index)

The appendix index (`page 1 / 24`) lists these as **numbered rows grouped by theme**, in 3 filled columns. Click any row to jump; use **"← Appendix"** to return. Item numbers below (01–23) match the index; page counters run `2 / 24 … 24 / 24`.

### Product & moat
| # | Slide | Component | Blurb |
|---|---|---|---|
| 01 | Our advantage | `TheInsightSlide` | The insight competitors miss. |
| 02 | Data strategy | `DataStrategySlide` | How the data moat compounds over time. |
| 03 | What synth predicts | `WhatSynthPredictsSlide` | Fatigue, injury risk, readiness, performance. |
| 04 | Product architecture | `AppendixProductArchitecture` | Connectors, store, prediction engine, surfaces. |

### Market & competition
| # | Slide | Component | Blurb |
|---|---|---|---|
| 05 | Why now | `S06_WhyNow` | Athlete-founders, fragmented data, cheap AI. *(dark slide)* |
| 06 | Competition | `S09_Competition` | No one connects it all. |
| 07 | Competitive quadrant | `AppendixCompetitiveQuadrant` | Where synth sits vs point tools and platforms. |

### Business & economics
| # | Slide | Component | Blurb |
|---|---|---|---|
| 08 | Business model | `S08_BusinessModel` | Tiers, revenue mix, 3-year projection. |
| 09 | Unit economics | `AppendixUnitEconomics` | Payback under 4 months, every tier above 3× LTV/CAC. |
| 10 | Growth model | `AppendixGrowthModel` | Y1 → Y6 path to $214M total revenue. |
| 11 | The flywheel | `AppendixFlywheel` | How data, signal, and engagement compound. |
| 12 | Pricing tiers detail | `AppendixPricingTiers` | Per-tier limits, breakpoints, enterprise. |
| 13 | Pre-seed budget | `AppendixPreSeedBudget` | Use of funds across engineering, growth, ops. |

### India
| # | Slide | Component | Blurb |
|---|---|---|---|
| 14 | What India gets back | `S12c_IndiaReturns` | Jobs, foreign currency, national capability. |
| 15 | India grant budget | `AppendixIndiaGrantBudget` | ₹1.2 Crore raise, every rupee tied to a milestone. |

### Trust & policy
| # | Slide | Component | Blurb |
|---|---|---|---|
| 16 | Data security & privacy | `AppendixDataPrivacyV2` | What we're certified for. What we do today. |
| 17 | Ethics policy | `AppendixEthicsPolicy` | Nine commitments that protect athletes. |
| 18 | Behavioral economics (1/2) | `AppendixBehavioralEconomicsA` | Smart defaults, loss framing, social proof. |
| 19 | Behavioral economics (2/2) | `AppendixBehavioralEconomicsB` | Progress visualization, anchoring, anti-overload. |

### Team & reference
| # | Slide | Component | Blurb |
|---|---|---|---|
| 20 | Team | `S10_Team` | The founders behind synth. |
| 21 | Department intelligence | `AppendixDepartmentIntelligence` | Roll-ups across teams and the AD office. |
| 22 | Solution (legacy) | `LegacyS03_Solution` | A small door into a massive world. |
| 23 | Connectors (legacy) | `LegacyS04_Connectors` | Connect once. It updates forever. |

---

## Editing

Reorder / add / remove by editing the `MAIN` or `APPENDIX` array in
`src/spd/SimplePitchDeck.tsx`. Section numbers (`01 · …`), page counters,
the index numbering, group headers, and jump navigation all follow the array
order automatically — no manual renumbering. Keep grouped appendix entries
adjacent (matching `group`) so the index columns stay tidy.

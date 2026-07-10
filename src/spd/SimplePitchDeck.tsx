import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { AdvanceGateProvider } from '../components/advanceGate'
import { DeckAdvanceProvider } from '../components/DeckAdvanceContext'
import { DeckBlurLock } from '../components/DeckBlurLock'
import { SlideShell, type SlideDef } from '../components/SlideShell'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

// Main lineup
import { S01_Title } from '../slides/S01_Title'
import { S02a_ProblemStatements } from '../slides/S02a_ProblemStatements'
import { S10_Team } from '../slides/S10_Team'
import { S03_SolutionOverview } from '../slides/S03_SolutionOverview'
import { S11_Vision } from '../slides/S11_Vision'
import { S07_Market } from '../slides/S07_Market'
import { S05_Traction } from '../slides/S05_Traction'
import { S12_Close } from '../slides/S12_Close'
import { S12b_RaisingIndia } from '../slides/S12b_RaisingIndia'
import { S13_ThankYou } from '../slides/S13_ThankYou'

// Appendix — demoted main slides
import { ProductDemoStatic } from '../slides/ProductDemoStatic'
import { TheInsightSlide } from '../slides/TheInsightSlide'
import { DataStrategySlide } from '../slides/DataStrategySlide'
import { WhatSynthPredictsSlide } from '../slides/WhatSynthPredictsSlide'
import { S06_WhyNow } from '../slides/S06_WhyNow'
import { S09_Competition } from '../slides/S09_Competition'
import { S08_BusinessModel } from '../slides/S08_BusinessModel'
import { S05a_Advisors } from '../slides/S05a_Advisors'
import { S12c_IndiaReturns } from '../slides/S12c_IndiaReturns'
import { OnePagerOverview } from '../slides/OnePagerOverview'

// Appendix — deep dive
import { AppendixFlywheel } from '../slides/AppendixFlywheel'
import { AppendixGrowthModel } from '../slides/AppendixGrowthModel'
import { AppendixUnitEconomics } from '../slides/AppendixUnitEconomics'
import { AppendixPreSeedBudget } from '../slides/AppendixPreSeedBudget'
import { AppendixIndiaGrantBudget } from '../slides/AppendixIndiaGrantBudget'
import { AppendixBehavioralEconomicsA, AppendixBehavioralEconomicsB } from '../slides/AppendixBehavioralEconomics'
import { AppendixEthicsPolicy } from '../slides/AppendixEthicsPolicy'
import { AppendixDepartmentIntelligence } from '../slides/AppendixDepartmentIntelligence'
import { AppendixDataPrivacyV2 } from '../slides/AppendixDataPrivacyV2'
import { AppendixPricingTiers } from '../slides/AppendixPricingTiers'
import { AppendixProductArchitecture } from '../slides/AppendixProductArchitecture'
import { AppendixCompetitiveQuadrant } from '../slides/AppendixCompetitiveQuadrant'
import { S03_Solution as LegacyS03_Solution } from '../legacy/slides/S03_Solution'
import { S04_Connectors as LegacyS04_Connectors } from '../legacy/slides/S04_Connectors'

/**
 * ════════════════════════════════════════════════════════════════════════
 *  SIMPLE PITCH DECK  (route: /#spd)
 *  ──────────────────────────────────────────────────────────────────────
 *  Everything you'd change lives in the two arrays below: `MAIN` and `APPENDIX`.
 *
 *  • Reorder a slide → move its line. Section numbers (01, 02 …), page
 *    counters (N / total), the appendix index, and jump navigation all
 *    re-derive from array order automatically. Nothing is hardcoded.
 *  • Add a slide → import its component up top, then add one entry.
 *  • Remove a slide → delete its entry.
 *  • Move a slide between main ⇄ appendix → cut/paste the entry between arrays
 *    (main entries carry a `label`; appendix entries carry `section`+`title`+`blurb`).
 *  • `sameGroupAsPrev` (main) → share the previous slide's section number
 *    (e.g. both "THE ASK" slides show "08").
 *  • `group` (appendix) → the theme header the item appears under in the index;
 *    keep grouped entries adjacent so the index stays tidy.
 * ════════════════════════════════════════════════════════════════════════
 */
const APPX_INDEX_ID = 'spd-appendix-index'

/* ── Jump navigation (index → slide, slide → index) ── */
type SpdNav = { goToId: (id: string) => void }
const SpdNavContext = createContext<SpdNav | null>(null)
function useSpdNav(): SpdNav {
  const c = useContext(SpdNavContext)
  if (!c) throw new Error('useSpdNav must be used within SimplePitchDeck')
  return c
}

type NavProps = { sectionOverride?: string; pageOverride?: string }

/**
 * Main lineup, in presentation order. Section numbers are derived from position
 * (see buildMain), so reordering this array is all it takes — numbers and page
 * counters follow automatically. Set `sameGroupAsPrev` to share the previous
 * slide's section number (e.g. both "THE ASK" slides).
 */
type MainEntry = {
  id: string
  label: string
  background: string
  sameGroupAsPrev?: boolean
  showTopNav?: boolean
  hideRights?: boolean
  render: (nav: NavProps) => ReactNode
}
const MAIN: MainEntry[] = [
  { id: 'spd-problem', label: 'PROBLEM', background: THEME.light, render: (n) => <S02a_ProblemStatements {...n} /> },
  { id: 'spd-onepager', label: 'OVERVIEW', background: THEME.light, showTopNav: false, hideRights: true, render: (n) => <OnePagerOverview {...n} /> },
  { id: 'spd-advisors', label: 'ADVISORS', background: THEME.light, render: (n) => <S05a_Advisors {...n} /> },
  { id: 'spd-solution', label: 'SOLUTION', background: THEME.light, render: (n) => <S03_SolutionOverview {...n} /> },
  { id: 'spd-product-demo', label: 'PRODUCT DEMO', background: THEME.light, render: (n) => <ProductDemoStatic {...n} /> },
  { id: 'spd-market', label: 'MARKET', background: THEME.darkDeep, render: (n) => <S07_Market {...n} /> },
  { id: 'spd-vision', label: 'VISION', background: THEME.light, render: (n) => <S11_Vision {...n} /> },
  { id: 'spd-traction', label: 'TRACTION', background: THEME.light, render: (n) => <S05_Traction {...n} /> },
  { id: 'spd-ask-usd', label: 'THE ASK', background: THEME.light, render: (n) => <S12_Close {...n} /> },
  { id: 'spd-ask-india', label: 'THE ASK', background: THEME.light, sameGroupAsPrev: true, render: (n) => <S12b_RaisingIndia {...n} /> },
]

type Entry = {
  id: string
  section: string
  title: string
  blurb: string
  background: string
  /** Theme this slide belongs to — shown as a header in the appendix index. */
  group?: string
  showTopNav?: boolean
  hideRights?: boolean
  render: (nav: NavProps) => ReactNode
}

/**
 * Appendix, grouped by theme. Reorder freely — the index numbering (01…N),
 * page counters, and jump navigation all follow this array's order, and each
 * item's `group` renders a header in the index. Keep related slides adjacent
 * (e.g. Competition + Competitive quadrant).
 */
const APPENDIX: Entry[] = [
  // ─── Product & moat ───
  { id: 'spd-a-advantage', group: 'Product & moat', section: 'APPENDIX · OUR ADVANTAGE', title: 'Our advantage', blurb: 'The insight competitors miss.', background: THEME.light, render: (n) => <TheInsightSlide {...n} /> },
  { id: 'spd-a-data', group: 'Product & moat', section: 'APPENDIX · DATA STRATEGY', title: 'Data strategy', blurb: 'How the data moat compounds over time.', background: THEME.light, render: (n) => <DataStrategySlide {...n} /> },
  { id: 'spd-a-predicts', group: 'Product & moat', section: 'APPENDIX · WHAT SYNTH PREDICTS', title: 'What synth predicts', blurb: 'Fatigue, injury risk, readiness, performance.', background: THEME.light, render: (n) => <WhatSynthPredictsSlide {...n} /> },
  { id: 'spd-a-arch', group: 'Product & moat', section: 'APPENDIX · PRODUCT ARCHITECTURE', title: 'Product architecture', blurb: 'Connectors, store, prediction engine, surfaces.', background: THEME.light, render: (n) => <AppendixProductArchitecture {...n} /> },

  // ─── Market & competition ───
  { id: 'spd-a-whynow', group: 'Market & competition', section: 'APPENDIX · WHY NOW', title: 'Why now', blurb: 'Athlete-founders, fragmented data, cheap AI.', background: THEME.darkDeep, render: (n) => <S06_WhyNow {...n} /> },
  { id: 'spd-a-competition', group: 'Market & competition', section: 'APPENDIX · COMPETITION', title: 'Competition', blurb: 'No one connects it all.', background: THEME.light, render: (n) => <S09_Competition {...n} /> },
  { id: 'spd-a-quadrant', group: 'Market & competition', section: 'APPENDIX · 2×2 MATRIX', title: 'Competitive quadrant', blurb: 'Where synth sits vs point tools and platforms.', background: THEME.light, render: (n) => <AppendixCompetitiveQuadrant {...n} /> },

  // ─── Business & economics ───
  { id: 'spd-a-business', group: 'Business & economics', section: 'APPENDIX · BUSINESS MODEL', title: 'Business model', blurb: 'Tiers, revenue mix, 3-year projection.', background: THEME.light, render: (n) => <S08_BusinessModel {...n} /> },
  { id: 'spd-a-unit-econ', group: 'Business & economics', section: 'APPENDIX · UNIT ECONOMICS', title: 'Unit economics', blurb: 'Payback under 4 months, every tier above 3× LTV/CAC.', background: THEME.light, render: (n) => <AppendixUnitEconomics {...n} /> },
  { id: 'spd-a-growth', group: 'Business & economics', section: 'APPENDIX · GROWTH MODEL', title: 'Growth model', blurb: 'Y1 → Y6 path to $214M total revenue.', background: THEME.light, render: (n) => <AppendixGrowthModel {...n} /> },
  { id: 'spd-a-flywheel', group: 'Business & economics', section: 'APPENDIX · THE FLYWHEEL', title: 'The flywheel', blurb: 'How data, signal, and engagement compound.', background: THEME.light, render: (n) => <AppendixFlywheel {...n} /> },
  { id: 'spd-a-pricing', group: 'Business & economics', section: 'APPENDIX · PRICING TIERS', title: 'Pricing tiers detail', blurb: 'Per-tier limits, breakpoints, enterprise.', background: THEME.light, render: (n) => <AppendixPricingTiers {...n} /> },
  { id: 'spd-a-preseed', group: 'Business & economics', section: 'APPENDIX · PRE-SEED BUDGET', title: 'Pre-seed budget', blurb: 'Use of funds across engineering, growth, ops.', background: THEME.light, render: (n) => <AppendixPreSeedBudget {...n} /> },

  // ─── India ───
  { id: 'spd-a-india-returns', group: 'India', section: 'APPENDIX · INDIA RETURNS', title: 'What India gets back', blurb: 'Jobs, foreign currency, national capability.', background: THEME.light, render: (n) => <S12c_IndiaReturns {...n} /> },
  { id: 'spd-a-india-budget', group: 'India', section: 'APPENDIX · INDIA GRANT BUDGET', title: 'India grant budget', blurb: '₹1.2 Crore raise, every rupee tied to a milestone.', background: THEME.light, render: (n) => <AppendixIndiaGrantBudget {...n} /> },

  // ─── Trust & policy ───
  { id: 'spd-a-privacy', group: 'Trust & policy', section: 'APPENDIX · DATA SECURITY & PRIVACY', title: 'Data security & privacy', blurb: "What we're certified for. What we do today.", background: THEME.light, render: (n) => <AppendixDataPrivacyV2 {...n} /> },
  { id: 'spd-a-ethics', group: 'Trust & policy', section: 'APPENDIX · ETHICS POLICY', title: 'Ethics policy', blurb: 'Nine commitments that protect athletes.', background: THEME.light, render: (n) => <AppendixEthicsPolicy {...n} /> },
  { id: 'spd-a-behavioral-a', group: 'Trust & policy', section: 'APPENDIX · BEHAVIORAL ECON (1/2)', title: 'Behavioral economics (1/2)', blurb: 'Smart defaults, loss framing, social proof.', background: THEME.light, render: (n) => <AppendixBehavioralEconomicsA {...n} /> },
  { id: 'spd-a-behavioral-b', group: 'Trust & policy', section: 'APPENDIX · BEHAVIORAL ECON (2/2)', title: 'Behavioral economics (2/2)', blurb: 'Progress visualization, anchoring, anti-overload.', background: THEME.light, render: (n) => <AppendixBehavioralEconomicsB {...n} /> },

  // ─── Team & reference ───
  { id: 'spd-a-team', group: 'Team & reference', section: 'APPENDIX · TEAM', title: 'Team', blurb: 'The founders behind synth.', background: THEME.light, render: (n) => <S10_Team {...n} /> },
  { id: 'spd-a-dept', group: 'Team & reference', section: 'APPENDIX · DEPARTMENT INTELLIGENCE', title: 'Department intelligence', blurb: 'Roll-ups across teams and the AD office.', background: THEME.light, render: (n) => <AppendixDepartmentIntelligence {...n} /> },
  { id: 'spd-a-legacy-solution', group: 'Team & reference', section: 'APPENDIX · SOLUTION (LEGACY)', title: 'Solution (legacy)', blurb: 'A small door into a massive world.', background: THEME.light, render: (n) => <LegacyS03_Solution {...n} /> },
  { id: 'spd-a-legacy-connectors', group: 'Team & reference', section: 'APPENDIX · CONNECTORS (LEGACY)', title: 'Connectors (legacy)', blurb: 'Connect once. It updates forever.', background: THEME.light, render: (n) => <LegacyS04_Connectors {...n} /> },
]

const DARK_BACKGROUNDS = new Set<string>([THEME.darkDeep, THEME.dark, THEME.darkMid, THEME.primary, THEME.accent])

/* ── Subtle back-to-appendix control shown on every appendix slide ── */
function AppendixBackFrame({ children, dark }: { children: ReactNode; dark?: boolean }) {
  const { goToId } = useSpdNav()
  return (
    <>
      {children}
      <button
        type="button"
        data-no-advance
        onClick={(e) => {
          e.stopPropagation()
          goToId(APPX_INDEX_ID)
        }}
        className="absolute bottom-3 left-4 z-40 rounded-full px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.18em] backdrop-blur-sm transition-opacity hover:opacity-100"
        style={{
          fontFamily: THEME.fontMono,
          background: dark ? 'rgba(255,255,255,0.12)' : 'rgba(24,24,27,0.05)',
          border: `1px solid ${dark ? 'rgba(255,255,255,0.24)' : THEME.border}`,
          color: dark ? 'rgba(255,255,255,0.82)' : THEME.textSecondary,
          opacity: 0.72,
        }}
      >
        ← Appendix
      </button>
    </>
  )
}

/* ── Clickable appendix index — grouped, 3 columns that stretch to fill ── */
type IndexGroup = { label: string; items: { entry: Entry; num: number }[] }

function buildIndexColumns(): IndexGroup[][] {
  const groups: IndexGroup[] = []
  APPENDIX.forEach((entry, i) => {
    const label = entry.group ?? 'More'
    const last = groups[groups.length - 1]
    if (!last || last.label !== label) groups.push({ label, items: [] })
    groups[groups.length - 1]!.items.push({ entry, num: i + 1 })
  })
  // Split whole groups across 3 columns at the nearest group boundaries.
  const target = Math.ceil(APPENDIX.length / 3)
  const cols: IndexGroup[][] = [[], [], []]
  const count = (c: IndexGroup[]) => c.reduce((s, g) => s + g.items.length, 0)
  let ci = 0
  groups.forEach((g) => {
    if (cols[ci]!.length > 0 && ci < 2 && count(cols[ci]!) + g.items.length > target) ci++
    cols[ci]!.push(g)
  })
  return cols
}

function SpdAppendixIndex({ pageOverride }: { pageOverride?: string }) {
  const { goToId } = useSpdNav()
  const columns = buildIndexColumns()
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: 'clamp(24px,3.2vw,38px) clamp(28px,4vw,56px) clamp(18px,2.6vw,30px)' }}>
      <TopNav section="APPENDIX" page={pageOverride ?? ''} tone="light" />
      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <h1 className="text-[clamp(30px,3.8vw,46px)] font-bold leading-[1.04] tracking-[-0.04em]" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
          Appendix
        </h1>
        <p className="mt-2 text-[14px] leading-[1.5]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Tap any item to jump straight to it. A subtle <span style={{ color: THEME.primary, fontWeight: 700 }}>← Appendix</span> control on each slide brings you back.
        </p>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-3 gap-x-10">
          {columns.map((col, ci) => (
            <div key={ci} className="flex min-h-0 flex-col">
              {col.map((g) => (
                <Fragment key={g.label}>
                  <div
                    className="mb-1 mt-4 shrink-0 border-b pb-1.5 text-[11px] font-bold uppercase tracking-[0.22em] first:mt-0"
                    style={{ fontFamily: THEME.fontMono, color: THEME.primary, borderColor: `${THEME.primary}33` }}
                  >
                    {g.label}
                  </div>
                  {g.items.map(({ entry, num }) => (
                    <button
                      key={entry.id}
                      type="button"
                      data-no-advance
                      onClick={(e) => {
                        e.stopPropagation()
                        goToId(entry.id)
                      }}
                      className="flex min-h-0 w-full flex-1 items-center gap-4 border-b text-left"
                      style={{ borderColor: THEME.border }}
                    >
                      <span className="w-7 shrink-0 text-right text-[16px] font-bold tabular-nums leading-none" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                        {String(num).padStart(2, '0')}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[17px] font-semibold leading-tight tracking-[-0.01em]" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                          {entry.title}
                        </span>
                        <span className="mt-0.5 block truncate text-[12.5px] leading-tight" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                          {entry.blurb}
                        </span>
                      </span>
                    </button>
                  ))}
                </Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function SimplePitchDeck() {
  const [index, setIndex] = useState(0)
  const idIndexRef = useRef<Record<string, number>>({})

  const goToId = useCallback((id: string) => {
    const i = idIndexRef.current[id]
    if (i != null) setIndex(i)
  }, [])
  const navValue = useMemo<SpdNav>(() => ({ goToId }), [goToId])

  const slides: SlideDef[] = useMemo(() => {
    const mainTotal = MAIN.length + 1 // + Thank You (Title has no counter)
    const appendixTotal = APPENDIX.length + 1 // + index

    const built: SlideDef[] = []

    // Title cover
    built.push({
      id: 'spd-title',
      section: 'TITLE',
      component: <S01_Title />,
      background: THEME.accent,
      frame: 'none',
      showTopNav: false,
      showProgress: false,
      showNavButtons: false,
    })

    // Main content — section numbers derived from array order (interchangeable)
    let topic = 0
    MAIN.forEach((e, i) => {
      if (!e.sameGroupAsPrev) topic++
      const section = `${String(topic).padStart(2, '0')} · ${e.label}`
      built.push({
        id: e.id,
        section,
        background: e.background,
        showTopNav: e.showTopNav,
        hideRights: e.hideRights,
        component: e.render({ sectionOverride: section, pageOverride: `${i + 1} / ${mainTotal}` }),
      })
    })

    // Thank You
    built.push({
      id: 'spd-thankyou',
      section: 'THANK YOU',
      background: THEME.primary,
      component: <S13_ThankYou sectionOverride="THANK YOU" pageOverride={`${mainTotal} / ${mainTotal}`} />,
    })

    // Appendix index
    built.push({
      id: APPX_INDEX_ID,
      section: 'APPENDIX',
      background: THEME.light,
      component: <SpdAppendixIndex pageOverride={`1 / ${appendixTotal}`} />,
    })

    // Appendix content — numbered from position so the slide label matches the
    // index entry (item i → "NN · NAME"), then wrapped with the back control.
    APPENDIX.forEach((e, i) => {
      const label = e.section.replace(/^APPENDIX · /, '')
      const section = `${String(i + 1).padStart(2, '0')} · ${label}`
      built.push({
        id: e.id,
        section,
        background: e.background,
        showTopNav: e.showTopNav,
        hideRights: e.hideRights,
        component: (
          <AppendixBackFrame dark={DARK_BACKGROUNDS.has(e.background)}>
            {e.render({ sectionOverride: section, pageOverride: `${i + 2} / ${appendixTotal}` })}
          </AppendixBackFrame>
        ),
      })
    })

    const map: Record<string, number> = {}
    built.forEach((s, i) => {
      map[s.id] = i
    })
    idIndexRef.current = map

    return built
  }, [])

  const advanceDeck = useCallback(() => {
    setIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides.length])

  return (
    <SpdNavContext.Provider value={navValue}>
      <AdvanceGateProvider>
        <DeckAdvanceProvider advance={advanceDeck}>
          <DeckBlurLock printSlides={slides}>
            <div className="deck-print-hide h-full w-full min-h-0">
              <SlideShell slides={slides} index={index} setIndex={setIndex} />
            </div>
          </DeckBlurLock>
        </DeckAdvanceProvider>
      </AdvanceGateProvider>
    </SpdNavContext.Provider>
  )
}

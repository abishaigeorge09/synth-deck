import type { ReactNode } from 'react'

import { THEME } from '../lib/theme'
import { S01_Title } from '../slides/S01_Title'
import { S02_Problem } from '../slides/S02_Problem'
import { OurSolutionCover } from '../slides/OurSolutionCover'
import { ProductDemoSlide } from '../slides/ProductDemoSlide'
import { S05_Traction } from '../slides/S05_Traction'
import { S05a_Advisors } from '../slides/S05a_Advisors'
import { S06_WhyNow } from '../slides/S06_WhyNow'
import { S07_Market } from '../slides/S07_Market'
import { S08_BusinessModel } from '../slides/S08_BusinessModel'
import { S09_Competition } from '../slides/S09_Competition'
import { S10_Team } from '../slides/S10_Team'
import { S11_Vision } from '../slides/S11_Vision'
import { S12_Close } from '../slides/S12_Close'
import { S13_ThankYou } from '../slides/S13_ThankYou'

import { AppendixCoverSlide } from '../slides/AppendixCoverSlide'
import { AppendixDataPrivacy } from '../slides/AppendixDataPrivacy'
import { AppendixIndexSlide } from '../slides/AppendixIndexSlide'
import { PlaceholderSlide } from '../slides/PlaceholderSlide'
import { S02a_ProblemStatements } from '../slides/S02a_ProblemStatements'
import { S03_SolutionOverview } from '../slides/S03_SolutionOverview'
import { S03a_ProblemEverywhere } from '../slides/S03a_ProblemEverywhere'

export type DeckNavOverrides = {
  /** Overrides TopNav section label (e.g. when reused in appendix). */
  sectionOverride?: string
  /** Overrides TopNav page string (e.g. "6 / 13" or "3 / 8"). */
  pageOverride?: string
}

export type RegisteredSlide = {
  id: string
  /** Default section label for this slide in the main flow. */
  section: string
  background: string
  /** Render slide with optional nav overrides. */
  render: (nav?: DeckNavOverrides) => ReactNode
  frame?: 'none' | 'deck'
  showTopNav?: boolean
  showProgress?: boolean
  showNavButtons?: boolean
}

export const TITLE_SLIDE: RegisteredSlide = {
  id: 's01',
  section: 'TITLE',
  background: THEME.darkDeep,
  frame: 'none',
  showTopNav: false,
  showProgress: false,
  showNavButtons: false,
  render: () => <S01_Title />,
}

/**
 * Main story slides (after title, through Thank You).
 * Page numbers are assigned automatically from this order.
 *
 * Order matches the VC-pitch structure:
 *   Problem → Solution → Product demo → Insight → Data strategy →
 *   What synth predicts → Traction → Why now → Market → Competition →
 *   Vision → Business model → Team → Ask → Thank you
 */
export const MAIN_FLOW_SLIDES: RegisteredSlide[] = [
  {
    id: 's02-problem-statements',
    section: '01 · PROBLEM',
    background: THEME.light,
    render: (nav) => (
      <S02a_ProblemStatements {...nav} sectionOverride="01 · PROBLEM" />
    ),
  },
  {
    id: 's02b-problem-everywhere',
    section: '01 · PROBLEM',
    background: THEME.light,
    render: (nav) => (
      <S03a_ProblemEverywhere {...nav} sectionOverride="01 · PROBLEM" />
    ),
  },
  {
    id: 's03-solution-overview',
    section: '02 · SOLUTION',
    background: THEME.light,
    render: (nav) => (
      <S03_SolutionOverview {...nav} sectionOverride="02 · SOLUTION" />
    ),
  },
  {
    id: 's04-product-demo',
    section: '03 · PRODUCT DEMO',
    background: THEME.darkDeep,
    render: (nav) => <ProductDemoSlide {...nav} autoExpand />,
  },
  {
    id: 's05-the-insight',
    section: '04 · THE INSIGHT',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="04 · THE INSIGHT"
        title="The insight."
        kicker="04 · The insight"
      />
    ),
  },
  {
    id: 's06-data-strategy',
    section: '05 · DATA STRATEGY',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="05 · DATA STRATEGY"
        title="Data strategy."
        kicker="05 · Data strategy"
      />
    ),
  },
  {
    id: 's07-what-synth-predicts',
    section: '06 · WHAT SYNTH PREDICTS',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="06 · WHAT SYNTH PREDICTS"
        title="What synth predicts."
        kicker="06 · What synth predicts"
      />
    ),
  },
  {
    id: 's08-traction',
    section: '07 · TRACTION',
    background: THEME.light,
    render: (nav) => <S05_Traction {...nav} />,
  },
  {
    id: 's09-why-now',
    section: '08 · WHY NOW',
    background: THEME.light,
    render: (nav) => <S06_WhyNow {...nav} />,
  },
  {
    id: 's10-market',
    section: '09 · MARKET SIZE',
    background: THEME.darkDeep,
    render: (nav) => <S07_Market {...nav} />,
  },
  {
    id: 's11-competition',
    section: '10 · COMPETITION',
    background: THEME.darkDeep,
    render: (nav) => <S09_Competition {...nav} />,
  },
  {
    id: 's12-vision',
    section: '11 · THE VISION',
    background: THEME.light,
    render: (nav) => <S11_Vision {...nav} />,
  },
  {
    id: 's13-business-model',
    section: '12 · BUSINESS MODEL',
    background: THEME.light,
    render: (nav) => <S08_BusinessModel {...nav} />,
  },
  {
    id: 's14-team',
    section: '13 · TEAM',
    background: THEME.darkDeep,
    render: (nav) => <S10_Team {...nav} />,
  },
  {
    id: 's15-ask',
    section: '14 · ASK',
    background: THEME.light,
    render: (nav) => <S12_Close {...nav} />,
  },
  {
    id: 's16-thankyou',
    section: 'THANK YOU',
    background: THEME.primary,
    render: (nav) => <S13_ThankYou {...nav} />,
  },
]

/**
 * Appendix slides appended after Thank You in the primary deck.
 * These use local numbering, set in App via `pageOverride`.
 *
 * Order matches the VC-pitch appendix:
 *   Cover · Index ·
 *   Flywheel · Revenue projections · Unit economics · Pre-seed budget ·
 *   Behavioral economics · Two-way sync · Department intelligence ·
 *   Data & privacy / ethics · Advisors (detailed) · Pricing tiers ·
 *   Product architecture · Competitive quadrant
 */
export const APPENDIX_TAIL_SLIDES: RegisteredSlide[] = [
  {
    id: 'appx-cover',
    section: 'APPENDIX',
    background: THEME.darkDeep,
    render: (nav) => <AppendixCoverSlide {...nav} />,
  },
  {
    id: 'appx-index',
    section: 'APPENDIX',
    background: THEME.light,
    render: (nav) => <AppendixIndexSlide {...nav} />,
  },
  {
    id: 'appx-flywheel',
    section: 'A1 · FLYWHEEL',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A1 · FLYWHEEL"
        title="The flywheel."
        kicker="A1 · The flywheel"
      />
    ),
  },
  {
    id: 'appx-revenue-projections',
    section: 'A2 · REVENUE PROJECTIONS',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A2 · REVENUE PROJECTIONS"
        title="Revenue projections."
        kicker="A2 · Y1 → Y6"
      />
    ),
  },
  {
    id: 'appx-unit-economics',
    section: 'A3 · UNIT ECONOMICS',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A3 · UNIT ECONOMICS"
        title="Unit economics."
        kicker="A3 · Unit economics"
      />
    ),
  },
  {
    id: 'appx-preseed-budget',
    section: 'A4 · PRE-SEED BUDGET',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A4 · PRE-SEED BUDGET"
        title="Pre-seed budget breakdown."
        kicker="A4 · Pre-seed budget"
      />
    ),
  },
  {
    id: 'appx-behavioral-economics',
    section: 'A5 · BEHAVIORAL ECONOMICS',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A5 · BEHAVIORAL ECONOMICS"
        title="Behavioral economics in the product."
        kicker="A5 · Behavioral economics"
      />
    ),
  },
  {
    id: 'appx-two-way-sync',
    section: 'A6 · TWO-WAY SYNC',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A6 · TWO-WAY SYNC"
        title="Two-way sync."
        kicker="A6 · Two-way sync"
      />
    ),
  },
  {
    id: 'appx-department-intelligence',
    section: 'A7 · DEPARTMENT INTELLIGENCE',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A7 · DEPARTMENT INTELLIGENCE"
        title="Department intelligence."
        kicker="A7 · Department intelligence"
      />
    ),
  },
  {
    id: 'appx-data-privacy',
    section: 'A8 · DATA & PRIVACY',
    background: THEME.light,
    render: (nav) => (
      <AppendixDataPrivacy
        pageOverride={nav?.pageOverride}
        sectionOverride="A8 · DATA & PRIVACY"
      />
    ),
  },
  {
    id: 'appx-advisors-detailed',
    section: 'A9 · ADVISORS',
    background: THEME.light,
    render: (nav) => <S05a_Advisors {...nav} />,
  },
  {
    id: 'appx-pricing-tiers',
    section: 'A10 · PRICING TIERS',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A10 · PRICING TIERS"
        title="Pricing tiers."
        kicker="A10 · Pricing tiers detail"
      />
    ),
  },
  {
    id: 'appx-product-architecture',
    section: 'A11 · PRODUCT ARCHITECTURE',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A11 · PRODUCT ARCHITECTURE"
        title="Product architecture."
        kicker="A11 · Product architecture"
      />
    ),
  },
  {
    id: 'appx-competitive-quadrant',
    section: 'A12 · COMPETITIVE QUADRANT',
    background: THEME.light,
    render: (nav) => (
      <PlaceholderSlide
        {...nav}
        section="A12 · COMPETITIVE QUADRANT"
        title="Competitive quadrant."
        kicker="A12 · 2×2 matrix"
      />
    ),
  },
  {
    id: 'appx-problem-cover',
    section: 'A13 · PROBLEM COVER',
    background: THEME.light,
    render: (nav) => (
      <S02_Problem {...nav} sectionOverride="A13 · PROBLEM COVER" />
    ),
  },
  {
    id: 'appx-solution-cover',
    section: 'A14 · SOLUTION COVER',
    background: THEME.primary,
    render: (nav) => (
      <OurSolutionCover {...nav} sectionOverride="A14 · SOLUTION COVER" />
    ),
  },
]

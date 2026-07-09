import type { ReactNode } from 'react'

import { THEME } from '../lib/theme'
import { S01_Title } from '../slides/S01_Title'
import { ProductDemoStatic } from '../slides/ProductDemoStatic'
import { S05_Traction } from '../slides/S05_Traction'
import { S05a_Advisors } from '../slides/S05a_Advisors'
import { S06_WhyNow } from '../slides/S06_WhyNow'
import { S07_Market } from '../slides/S07_Market'
import { S08_BusinessModel } from '../slides/S08_BusinessModel'
import { S09_Competition } from '../slides/S09_Competition'
import { S10_Team } from '../slides/S10_Team'
import { S11_Vision } from '../slides/S11_Vision'
import { S12_Close } from '../slides/S12_Close'
import { S12b_RaisingIndia } from '../slides/S12b_RaisingIndia'
import { S12c_IndiaReturns } from '../slides/S12c_IndiaReturns'
import { S13_ThankYou } from '../slides/S13_ThankYou'
import { DataStrategySlide } from '../slides/DataStrategySlide'
import { WhatSynthPredictsSlide } from '../slides/WhatSynthPredictsSlide'
import { TheInsightSlide } from '../slides/TheInsightSlide'

import { AppendixIndexSlide } from '../slides/AppendixIndexSlide'
import { AppendixFlywheel } from '../slides/AppendixFlywheel'
import { AppendixGrowthModel } from '../slides/AppendixGrowthModel'
import { AppendixUnitEconomics } from '../slides/AppendixUnitEconomics'
import { AppendixPreSeedBudget } from '../slides/AppendixPreSeedBudget'
import { AppendixIndiaGrantBudget } from '../slides/AppendixIndiaGrantBudget'
import {
  AppendixBehavioralEconomicsA,
  AppendixBehavioralEconomicsB,
} from '../slides/AppendixBehavioralEconomics'
import { AppendixEthicsPolicy } from '../slides/AppendixEthicsPolicy'
import { AppendixDepartmentIntelligence } from '../slides/AppendixDepartmentIntelligence'
import { AppendixDataPrivacyV2 } from '../slides/AppendixDataPrivacyV2'
import { AppendixPricingTiers } from '../slides/AppendixPricingTiers'
import { AppendixProductArchitecture } from '../slides/AppendixProductArchitecture'
import { AppendixCompetitiveQuadrant } from '../slides/AppendixCompetitiveQuadrant'
import { S02a_ProblemStatements } from '../slides/S02a_ProblemStatements'
import { S03_SolutionOverview } from '../slides/S03_SolutionOverview'
import { OnePagerOverview } from '../slides/OnePagerOverview'
import { S03_Solution as LegacyS03_Solution } from '../legacy/slides/S03_Solution'
import { S04_Connectors as LegacyS04_Connectors } from '../legacy/slides/S04_Connectors'

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
  hideRights?: boolean
}

export const TITLE_SLIDE: RegisteredSlide = {
  id: 's01',
  section: 'TITLE',
  background: THEME.accent,
  frame: 'none',
  showTopNav: false,
  showProgress: false,
  showNavButtons: false,
  render: () => <S01_Title />,
}

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
    background: THEME.light,
    render: (nav) => <ProductDemoStatic {...nav} sectionOverride="03 · PRODUCT DEMO" />,
  },
  {
    id: 's05-our-advantage',
    section: '04 · OUR ADVANTAGE',
    background: THEME.light,
    render: (nav) => <TheInsightSlide {...nav} sectionOverride="04 · OUR ADVANTAGE" />,
  },
  {
    id: 's06-data-strategy',
    section: '05 · DATA STRATEGY',
    background: THEME.light,
    render: (nav) => <DataStrategySlide {...nav} sectionOverride="05 · DATA STRATEGY" />,
  },
  {
    id: 's07-what-synth-predicts',
    section: '06 · WHAT SYNTH PREDICTS',
    background: THEME.light,
    render: (nav) => <WhatSynthPredictsSlide {...nav} sectionOverride="06 · WHAT SYNTH PREDICTS" />,
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
    background: THEME.darkDeep,
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
    background: THEME.light,
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
    background: THEME.light,
    render: (nav) => <S10_Team {...nav} />,
  },
  {
    id: 's14a-advisors',
    section: '14 · ADVISORS',
    background: THEME.light,
    render: (nav) => <S05a_Advisors {...nav} sectionOverride="14 · ADVISORS" />,
  },
  {
    id: 's15-raising',
    section: '15 · RAISING',
    background: THEME.light,
    render: (nav) => <S12_Close {...nav} sectionOverride="15 · RAISING" />,
  },
  {
    id: 's15b-raising-india',
    section: '15 · RAISING',
    background: THEME.light,
    // Header pinned to the spec ("15 · RAISING · 16 / 18") — twin of the USD raising slide.
    render: () => <S12b_RaisingIndia sectionOverride="15 · RAISING" pageOverride="16 / 18" />,
  },
  {
    id: 's16-india-returns',
    section: '16 · INDIA RETURNS',
    background: THEME.light,
    // Header pinned to the spec ("16 · INDIA RETURNS · 17 / 18").
    render: () => <S12c_IndiaReturns sectionOverride="16 · INDIA RETURNS" pageOverride="17 / 18" />,
  },
  {
    id: 's16-thankyou',
    section: 'THANK YOU',
    background: THEME.primary,
    render: (nav) => <S13_ThankYou {...nav} />,
  },
  {
    id: 's17-one-pager',
    section: 'OVERVIEW · ONE-PAGER',
    background: THEME.light,
    showTopNav: false,
    hideRights: true,
    render: (nav) => <OnePagerOverview {...nav} sectionOverride="OVERVIEW · ONE-PAGER" />,
  },
]

/**
 * Appendix slides appended after Thank You in the primary deck.
 * Cover + Index + 11 content slides = 13 total.
 */
export const APPENDIX_TAIL_SLIDES: RegisteredSlide[] = [
  {
    id: 'appx-index',
    section: 'APPENDIX',
    background: THEME.light,
    render: (nav) => <AppendixIndexSlide {...nav} />,
  },
  {
    id: 'appx-flywheel',
    section: 'A1 · THE FLYWHEEL',
    background: THEME.light,
    render: (nav) => <AppendixFlywheel {...nav} sectionOverride="A1 · THE FLYWHEEL" />,
  },
  {
    id: 'appx-growth-model',
    section: 'A2 · GROWTH MODEL',
    background: THEME.light,
    render: (nav) => <AppendixGrowthModel {...nav} sectionOverride="A2 · GROWTH MODEL" />,
  },
  {
    id: 'appx-unit-economics',
    section: 'A3 · UNIT ECONOMICS',
    background: THEME.light,
    render: (nav) => <AppendixUnitEconomics {...nav} sectionOverride="A3 · UNIT ECONOMICS" />,
  },
  {
    id: 'appx-preseed-budget',
    section: 'A4 · PRE-SEED BUDGET',
    background: THEME.light,
    render: (nav) => <AppendixPreSeedBudget {...nav} sectionOverride="A4 · PRE-SEED BUDGET" />,
  },
  {
    id: 'appx-india-grant-budget',
    section: 'A4 · INDIA GRANT BUDGET',
    background: THEME.light,
    // Header pinned to the spec ("A4 · INDIA GRANT BUDGET · 5 / 15") — INR twin of the pre-seed budget.
    render: () => <AppendixIndiaGrantBudget sectionOverride="A4 · INDIA GRANT BUDGET" pageOverride="5 / 15" />,
  },
  {
    id: 'appx-behavioral-economics-a',
    section: 'A5 · BEHAVIORAL ECONOMICS (1/2)',
    background: THEME.light,
    render: (nav) => (
      <AppendixBehavioralEconomicsA {...nav} sectionOverride="A5 · BEHAVIORAL ECONOMICS (1/2)" />
    ),
  },
  {
    id: 'appx-behavioral-economics-b',
    section: 'A5 · BEHAVIORAL ECONOMICS (2/2)',
    background: THEME.light,
    render: (nav) => (
      <AppendixBehavioralEconomicsB {...nav} sectionOverride="A5 · BEHAVIORAL ECONOMICS (2/2)" />
    ),
  },
  {
    id: 'appx-ethics-policy',
    section: 'A6 · ETHICS POLICY',
    background: THEME.light,
    render: (nav) => <AppendixEthicsPolicy {...nav} sectionOverride="A6 · ETHICS POLICY" />,
  },
  {
    id: 'appx-department-intelligence',
    section: 'A7 · DEPARTMENT INTELLIGENCE',
    background: THEME.light,
    render: (nav) => <AppendixDepartmentIntelligence {...nav} sectionOverride="A7 · DEPARTMENT INTELLIGENCE" />,
  },
  {
    id: 'appx-data-privacy',
    section: 'A8 · DATA SECURITY & PRIVACY',
    background: THEME.light,
    render: (nav) => <AppendixDataPrivacyV2 {...nav} sectionOverride="A8 · DATA SECURITY & PRIVACY" />,
  },
  {
    id: 'appx-pricing-tiers',
    section: 'A9 · PRICING TIERS DETAIL',
    background: THEME.light,
    render: (nav) => <AppendixPricingTiers {...nav} sectionOverride="A9 · PRICING TIERS DETAIL" />,
  },
  {
    id: 'appx-product-architecture',
    section: 'A10 · PRODUCT ARCHITECTURE',
    background: THEME.light,
    render: (nav) => <AppendixProductArchitecture {...nav} sectionOverride="A10 · PRODUCT ARCHITECTURE" />,
  },
  {
    id: 'appx-competitive-quadrant',
    section: 'A11 · 2×2 MATRIX',
    background: THEME.light,
    render: (nav) => <AppendixCompetitiveQuadrant {...nav} sectionOverride="A11 · 2×2 MATRIX" />,
  },
  {
    id: 'appx-legacy-solution',
    section: 'A12 · SOLUTION (LEGACY)',
    background: THEME.light,
    render: (nav) => <LegacyS03_Solution {...nav} sectionOverride="A12 · SOLUTION (LEGACY)" />,
  },
  {
    id: 'appx-legacy-connectors',
    section: 'A13 · CONNECTORS (LEGACY)',
    background: THEME.light,
    render: (nav) => <LegacyS04_Connectors {...nav} sectionOverride="A13 · CONNECTORS (LEGACY)" />,
  },
]

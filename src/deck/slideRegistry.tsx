import type { ReactNode } from 'react'

import { THEME } from '../lib/theme'
import { S01_Title } from '../slides/S01_Title'
import { S02a_ProblemStatements } from '../slides/S02a_ProblemStatements'
import { S02_Problem } from '../slides/S02_Problem'
import { S03a_ProblemEverywhere } from '../slides/S03a_ProblemEverywhere'
import { OurSolutionCover } from '../slides/OurSolutionCover'
import { S03_SolutionOverview } from '../slides/S03_SolutionOverview'
import { ProductDemoSlide } from '../slides/ProductDemoSlide'
import { S05_Traction } from '../slides/S05_Traction'
import { S07_Market } from '../slides/S07_Market'
import { S08_BusinessModel } from '../slides/S08_BusinessModel'
import { S09_Competition } from '../slides/S09_Competition'
import { S10_Team } from '../slides/S10_Team'
import { S11_Vision } from '../slides/S11_Vision'
import { S12_Close } from '../slides/S12_Close'
import { S13_ThankYou } from '../slides/S13_ThankYou'

import { AppendixCoverSlide } from '../slides/AppendixCoverSlide'
import { AppendixIndexSlide } from '../slides/AppendixIndexSlide'
import { SetupAccountSlide } from '../slides/SetupAccountSlide'
import { SF01_DashboardIntro, SF02_DeployExtension } from '../slides/SolutionFlowSlides'
import { SynthAgentWorkflowSlide } from '../slides/SynthAgentWorkflowSlide'
import { CustomToolsShowcaseSlide } from '../slides/CustomToolsShowcaseSlide'
import { S04_Connectors } from '../slides/S04_Connectors'
import { S06_WhyNow } from '../slides/S06_WhyNow'

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
 */
/** Main story after title: Team first, then problem → solution demo → traction → market → competition → thank you. */
export const MAIN_FLOW_SLIDES: RegisteredSlide[] = [
  { id: 's10', section: '09 · TEAM', background: THEME.darkDeep, render: (nav) => <S10_Team {...nav} /> },
  { id: 's02', section: '01 · PROBLEM', background: THEME.light, render: (nav) => <S02_Problem {...nav} /> },
  { id: 's02-solution', section: '02 · SOLUTION', background: THEME.primary, render: (nav) => <OurSolutionCover {...nav} /> },
  { id: 's06-product-demo', section: '02 · SOLUTION', background: THEME.darkDeep, render: (nav) => <ProductDemoSlide {...nav} /> },
  { id: 's05', section: '04 · TRACTION', background: THEME.light, render: (nav) => <S05_Traction {...nav} /> },
  { id: 's06', section: '05 · WHY NOW', background: THEME.light, render: (nav) => <S06_WhyNow {...nav} /> },
  { id: 's07', section: '06 · MARKET', background: THEME.darkDeep, render: (nav) => <S07_Market {...nav} /> },
  { id: 's09', section: '08 · COMPETITION', background: THEME.darkDeep, render: (nav) => <S09_Competition {...nav} /> },
  { id: 's13', section: 'THANK YOU', background: THEME.primary, render: (nav) => <S13_ThankYou {...nav} /> },
]

/**
 * Appendix slides appended after Thank You in the primary deck.
 * These use local numbering, set in App via `pageOverride`.
 */
/** After Thank You: appendix cover → index → pitch backups → product/GTM detail (see AppendixIndexSlide). */
export const APPENDIX_TAIL_SLIDES: RegisteredSlide[] = [
  { id: 'appx-cover', section: 'APPENDIX', background: THEME.darkDeep, render: (nav) => <AppendixCoverSlide {...nav} /> },
  { id: 'appx-index', section: 'APPENDIX', background: THEME.light, render: (nav) => <AppendixIndexSlide {...nav} /> },
  { id: 'appx-s02a', section: 'APPENDIX', background: THEME.light, render: (nav) => <S02a_ProblemStatements {...nav} /> },
  { id: 'appx-s03a-scope', section: 'APPENDIX', background: THEME.light, render: (nav) => <S03a_ProblemEverywhere {...nav} /> },
  { id: 'appx-solution-overview', section: 'APPENDIX', background: THEME.light, render: (nav) => <S03_SolutionOverview {...nav} /> },
  { id: 'appx-s11', section: 'APPENDIX', background: THEME.light, render: (nav) => <S11_Vision {...nav} /> },
  { id: 'appx-s12', section: 'APPENDIX', background: THEME.light, render: (nav) => <S12_Close {...nav} /> },
  { id: 'appx-business-model', section: 'APPENDIX', background: THEME.light, render: (nav) => <S08_BusinessModel {...nav} /> },
  { id: 'appx-setup', section: 'APPENDIX', background: THEME.light, render: (nav) => <SetupAccountSlide {...nav} /> },
  { id: 'appx-sf01', section: 'APPENDIX', background: THEME.light, render: (nav) => <SF01_DashboardIntro {...nav} /> },
  { id: 'appx-sf02', section: 'APPENDIX', background: THEME.light, render: (nav) => <SF02_DeployExtension {...nav} /> },
  { id: 'appx-workflow', section: 'APPENDIX', background: THEME.primary, render: (nav) => <SynthAgentWorkflowSlide {...nav} /> },
  { id: 'appx-custom-tools', section: 'APPENDIX', background: THEME.light, render: (nav) => <CustomToolsShowcaseSlide {...nav} /> },
  { id: 'appx-connectors', section: 'APPENDIX', background: THEME.light, render: (nav) => <S04_Connectors {...nav} /> },
]


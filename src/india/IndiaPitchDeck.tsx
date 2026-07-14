import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { AdvanceGateProvider } from '../components/advanceGate'
import { DeckAdvanceProvider } from '../components/DeckAdvanceContext'
import { DeckBlurLock } from '../components/DeckBlurLock'
import { SlideShell, type SlideDef } from '../components/SlideShell'
import { THEME } from '../lib/theme'

import { S02a_ProblemStatements } from '../slides/S02a_ProblemStatements'
import { S07_Market } from '../slides/S07_Market'
import { S03_SolutionOverview } from '../slides/S03_SolutionOverview'
import { S09_Competition } from '../slides/S09_Competition'
import { S08_BusinessModel } from '../slides/S08_BusinessModel'
import { S12b_RaisingIndia } from '../slides/S12b_RaisingIndia'
import { S_MilestonesDeployment } from './S_MilestonesDeployment'
import { S_TeamOnePager } from './S_TeamOnePager'
import { S_TitleIndia } from './S_TitleIndia'
import { S_ThankYouIndia } from './S_ThankYouIndia'

/**
 * ════════════════════════════════════════════════════════════════════════
 *  INDIA PITCH DECK  (route: /#indiappt)
 *  A linear 10-slide India pitch. Section numbers (01, 02 …) and page
 *  counters derive from CONTENT order — reorder = move a line.
 * ════════════════════════════════════════════════════════════════════════
 */
type NavProps = { sectionOverride?: string; pageOverride?: string }
type Entry = {
  id: string
  label: string
  background: string
  showTopNav?: boolean
  hideRights?: boolean
  render: (nav: NavProps) => ReactNode
}

const CONTENT: Entry[] = [
  { id: 'in-problem', label: 'PROBLEM STATEMENT', background: THEME.light, render: (n) => <S02a_ProblemStatements {...n} india /> },
  { id: 'in-market', label: 'TARGET MARKET', background: THEME.darkDeep, render: (n) => <S07_Market {...n} inr /> },
  { id: 'in-solution', label: 'SOLUTION', background: THEME.light, render: (n) => <S03_SolutionOverview {...n} india /> },
  { id: 'in-competition', label: 'COMPETITIVE LANDSCAPE', background: THEME.light, render: (n) => <S09_Competition {...n} inr /> },
  { id: 'in-business', label: 'BUSINESS MODEL', background: THEME.light, render: (n) => <S08_BusinessModel {...n} inr /> },
  { id: 'in-team', label: 'TEAM', background: THEME.light, showTopNav: false, hideRights: true, render: (n) => <S_TeamOnePager {...n} /> },
  { id: 'in-ask', label: 'BUDGET / ASK', background: THEME.light, render: (n) => <S12b_RaisingIndia {...n} /> },
  { id: 'in-milestones', label: 'MILESTONES / DEPLOYMENT PLAN', background: THEME.light, render: (n) => <S_MilestonesDeployment {...n} /> },
]

export function IndiaPitchDeck() {
  const [index, setIndex] = useState(0)

  const slides: SlideDef[] = useMemo(() => {
    const total = CONTENT.length + 1 // + Thank You (Title has no page counter)
    const built: SlideDef[] = []

    // Intro / cover
    built.push({
      id: 'in-title',
      section: 'TITLE',
      component: <S_TitleIndia />,
      background: THEME.light,
      frame: 'none',
      showTopNav: false,
      showProgress: false,
      showNavButtons: false,
    })

    // Numbered content
    CONTENT.forEach((e, i) => {
      const section = `${String(i + 1).padStart(2, '0')} · ${e.label}`
      built.push({
        id: e.id,
        section,
        background: e.background,
        showTopNav: e.showTopNav,
        hideRights: e.hideRights,
        component: e.render({ sectionOverride: section, pageOverride: `${i + 1} / ${total}` }),
      })
    })

    // Thank you
    built.push({
      id: 'in-thankyou',
      section: 'THANK YOU',
      background: THEME.primary,
      component: <S_ThankYouIndia sectionOverride="THANK YOU" pageOverride={`${total} / ${total}`} />,
    })

    return built
  }, [])

  const advanceDeck = useCallback(() => {
    setIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides.length])

  return (
    <AdvanceGateProvider>
      <DeckAdvanceProvider advance={advanceDeck}>
        <DeckBlurLock printSlides={slides}>
          <div className="deck-print-hide h-full w-full min-h-0">
            <SlideShell slides={slides} index={index} setIndex={setIndex} />
          </div>
        </DeckBlurLock>
      </DeckAdvanceProvider>
    </AdvanceGateProvider>
  )
}

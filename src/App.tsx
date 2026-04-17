import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdvanceGateProvider } from './components/advanceGate'
import { DeckAdvanceProvider } from './components/DeckAdvanceContext'
import { MobileLandscapeGate } from './components/MobileLandscapeGate'
import { SlideShell, type SlideDef } from './components/SlideShell'
import { AppendixDeck } from './appendix/AppendixDeck'

import { DeckBlurLock } from './components/DeckBlurLock'
import { APPENDIX_TAIL_SLIDES, MAIN_FLOW_SLIDES, TITLE_SLIDE } from './deck/slideRegistry'

function MainDeck() {
  const [index, setIndex] = useState(0)

  const slides: SlideDef[] = useMemo(
    () => {
      const mainTotal = MAIN_FLOW_SLIDES.length + 1 // + Title (no TopNav)
      const main = MAIN_FLOW_SLIDES.map((s, i) => {
        const page = `${i + 2} / ${mainTotal}` // start at 2 because Title is 1
        return {
          id: s.id,
          section: s.section,
          component: s.render({ sectionOverride: s.section, pageOverride: page }),
          background: s.background,
          frame: s.frame,
          showTopNav: s.showTopNav,
          showProgress: s.showProgress,
          showNavButtons: s.showNavButtons,
        } satisfies SlideDef
      })

      const appendixTotal = APPENDIX_TAIL_SLIDES.length
      const appendix = APPENDIX_TAIL_SLIDES.map((s, i) => {
        const page = `${i + 1} / ${appendixTotal}`
        return {
          id: s.id,
          section: s.section,
          component: s.render({ sectionOverride: 'APPENDIX', pageOverride: page }),
          background: s.background,
          frame: s.frame,
          showTopNav: s.showTopNav,
          showProgress: s.showProgress,
          showNavButtons: s.showNavButtons,
        } satisfies SlideDef
      })

      return [
        {
          id: TITLE_SLIDE.id,
          section: TITLE_SLIDE.section,
          component: TITLE_SLIDE.render(),
          background: TITLE_SLIDE.background,
          frame: TITLE_SLIDE.frame,
          showTopNav: TITLE_SLIDE.showTopNav,
          showProgress: TITLE_SLIDE.showProgress,
          showNavButtons: TITLE_SLIDE.showNavButtons,
        },
        ...main,
        ...appendix,
      ]
    },
    [],
  )

  const advanceDeck = useCallback(() => {
    setIndex((i) => Math.min(i + 1, slides.length - 1))
  }, [slides.length])

  return (
    <DeckAdvanceProvider advance={advanceDeck}>
      <DeckBlurLock printSlides={slides}>
        <div className="deck-print-hide h-full w-full min-h-0">
          <SlideShell slides={slides} index={index} setIndex={setIndex} />
        </div>
      </DeckBlurLock>
    </DeckAdvanceProvider>
  )
}

export default function App() {
  const [appendix, setAppendix] = useState(() =>
    typeof window !== 'undefined' ? window.location.hash === '#appendix' : false,
  )

  useEffect(() => {
    const sync = () => {
      setAppendix(window.location.hash === '#appendix')
    }
    window.addEventListener('hashchange', sync)
    sync()
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  if (appendix) {
    return (
      <AdvanceGateProvider>
        <MobileLandscapeGate>
          <div className="deck-print-hide h-full w-full min-h-0">
            <AppendixDeck />
          </div>
        </MobileLandscapeGate>
      </AdvanceGateProvider>
    )
  }

  return (
    <AdvanceGateProvider>
      <MobileLandscapeGate>
        <MainDeck />
      </MobileLandscapeGate>
    </AdvanceGateProvider>
  )
}

import { useCallback, useEffect, useMemo, useState } from 'react'
import { AdvanceGateProvider } from './components/advanceGate'
import { DeckAdvanceProvider } from './components/DeckAdvanceContext'
import { MobileLandscapeGate } from './components/MobileLandscapeGate'
import { SlideShell, type SlideDef } from './components/SlideShell'
import { AppendixDeck } from './appendix/AppendixDeck'

import { DeckBlurLock } from './components/DeckBlurLock'
import { APPENDIX_TAIL_SLIDES, MAIN_FLOW_SLIDES, TITLE_SLIDE } from './deck/slideRegistry'
import { LiveAnalyticsDebug } from './analytics/LiveAnalyticsDebug'

function resolveHashRoute(hash: string): 'main' | 'appendix' | 'analytics' {
  const base = hash.replace(/^#/, '').split('?')[0] ?? ''
  if (base === 'analytics') return 'analytics'
  if (base === 'appendix') return 'appendix'
  return 'main'
}

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
  const [hashRoute, setHashRoute] = useState<'main' | 'appendix' | 'analytics'>(() =>
    typeof window !== 'undefined' ? resolveHashRoute(window.location.hash) : 'main',
  )

  useEffect(() => {
    const sync = () => {
      setHashRoute(resolveHashRoute(window.location.hash))
    }
    window.addEventListener('hashchange', sync)
    sync()
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  if (hashRoute === 'analytics') {
    const host = typeof window !== 'undefined' ? window.location.hostname : ''
    const isLocal =
      host === 'localhost' || host === '127.0.0.1' || host === '[::1]' || host === '::1'
    if (typeof window !== 'undefined' && !isLocal) {
      return (
        <div className="p-8 text-sm text-zinc-600" style={{ fontFamily: 'system-ui, sans-serif' }}>
          Analytics dashboard is only available in local dev. Run <code className="rounded bg-zinc-100 px-1 py-0.5">npm run dev</code>
          , then open the <strong>Local</strong> URL from the terminal with <code className="rounded bg-zinc-100 px-1 py-0.5">/#analytics</code>{' '}
          (Vite defaults to port 5173 but uses the next free port—e.g. 5174—if 5173 is taken).
        </div>
      )
    }
    return <LiveAnalyticsDebug />
  }

  if (hashRoute === 'appendix') {
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

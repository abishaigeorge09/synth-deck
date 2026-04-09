import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { THEME } from '../lib/theme'
import { TRANSITIONS } from '../lib/motion'
import { useAdvanceGate } from './advanceGate'

export type SlideDef = {
  id: string
  section: string
  title?: string
  component: React.ReactNode
  background?: string
  frame?: 'none' | 'deck'
  showTopNav?: boolean
  showProgress?: boolean
  showNavButtons?: boolean
}

export function SlideShell({
  slides,
  index,
  setIndex,
}: {
  slides: SlideDef[]
  index: number
  setIndex: (i: number) => void
}) {
  const { blocked } = useAdvanceGate()
  const slide = slides[index]!

  const canPrev = index > 0
  const canNext = index < slides.length - 1

  const goPrev = () => {
    if (!canPrev) return
    setIndex(index - 1)
  }
  const goNext = () => {
    if (!canNext) return
    if (blocked) return
    setIndex(index + 1)
  }

  // Keyboard nav
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        goPrev()
      }
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        goNext()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, blocked])

  // Click anywhere to advance (except when blocked)
  const clickGuardRef = useRef(0)
  const onBackdropClick = () => {
    const now = Date.now()
    if (now - clickGuardRef.current < 150) return
    clickGuardRef.current = now
    goNext()
  }

  const bg = slide.background ?? THEME.darkDeep
  const lightSurface = bg === THEME.light
  const showTopNav = slide.showTopNav ?? true
  const showProgress = slide.showProgress ?? true
  const showNavButtons = slide.showNavButtons ?? true
  const frame = slide.frame ?? 'deck'

  const progressPct = useMemo(() => {
    if (slides.length <= 1) return 0
    return (index / (slides.length - 1)) * 100
  }, [index, slides.length])

  return (
    <div
      className="h-full w-full select-none"
      style={{ background: THEME.darkDeep }}
      onMouseDown={onBackdropClick}
    >
      <div className="h-full w-full flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: '100vw',
            height: '100vh',
            maxWidth: 'calc(100vh * 16 / 9)',
            maxHeight: 'calc(100vw * 9 / 16)',
            aspectRatio: '16 / 9',
          }}
        >
          {frame === 'deck' ? (
            <div
              className="absolute inset-0 rounded-[14px]"
              style={{
                boxShadow: '0 24px 60px rgba(0,0,0,0.55)',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
            />
          ) : null}

          {showTopNav ? (
            <div className="absolute left-0 top-0 w-full z-20 pointer-events-none">
              {/* TopNav attaches itself inside slides when needed; kept reserved here */}
            </div>
          ) : null}

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              className="absolute inset-0 overflow-hidden"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={TRANSITIONS.page}
            >
              <div className={frame === 'deck' ? 'absolute inset-[14px] rounded-[12px] overflow-hidden' : 'absolute inset-0'}>
                <div className="absolute inset-0" style={{ background: bg }} />
                {slide.component}
              </div>
            </motion.div>
          </AnimatePresence>

          {showNavButtons ? (
            <div className="absolute bottom-5 right-8 z-30 flex items-center gap-2 pointer-events-auto">
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                disabled={!canPrev}
                className={
                  lightSurface
                    ? 'h-8 w-8 rounded bg-zinc-900/85 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900/85 text-white font-medium shadow-sm border border-zinc-800/40'
                    : 'h-8 w-8 rounded bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/10 text-white font-medium'
                }
                style={{ fontFamily: THEME.fontMono }}
              >
                ←
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                disabled={!canNext || blocked}
                className={
                  lightSurface
                    ? 'h-8 w-8 rounded bg-zinc-900/85 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900/85 text-white font-medium shadow-sm border border-zinc-800/40'
                    : 'h-8 w-8 rounded bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/10 text-white font-medium'
                }
                style={{ fontFamily: THEME.fontMono }}
              >
                →
              </button>
              <div
                className={`ml-2 text-[11px] ${lightSurface ? 'text-zinc-600' : 'text-white/70'}`}
                style={{ fontFamily: THEME.fontMono }}
              >
                {index + 1} / {slides.length}
              </div>
            </div>
          ) : null}

          {showProgress ? (
            <div className={`absolute bottom-0 left-0 w-full h-[3px] z-30 ${lightSurface ? 'bg-zinc-200/90' : 'bg-white/10'}`}>
              <div
                className="h-full"
                style={{
                  width: `${progressPct}%`,
                  background: THEME.accent,
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}


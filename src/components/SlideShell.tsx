import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { THEME } from '../lib/theme'
import { TRANSITIONS } from '../lib/motion'
import { useAdvanceGate } from './advanceGate'
import { SlideDeckProvider } from './SlideDeckContext'
import { PRODUCT_DEMO_SLIDE_NEXT_EVENT, SETUP_SLIDE_NEXT_EVENT } from '../lib/setupSlideEvents'

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

function isTypingInField(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  const t = target.tagName
  if (t === 'INPUT' || t === 'TEXTAREA' || t === 'SELECT') return true
  if (target.isContentEditable) return true
  return false
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
    /** Setup slide runs a cursor → Create account sim before advancing. */
    if (slide.id === 's02-setup') {
      window.dispatchEvent(new CustomEvent(SETUP_SLIDE_NEXT_EVENT))
      return
    }
    /** Product demo slide expands first, then advances only after completion. */
    if (slide.id === 's06-product-demo') {
      window.dispatchEvent(new CustomEvent(PRODUCT_DEMO_SLIDE_NEXT_EVENT))
      return
    }
    setIndex(index + 1)
  }

  // Keyboard nav (skip when typing in inputs — e.g. deck password, so Backspace edits text)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isTypingInField(e.target)) return
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

  // Tap / click to advance (pointer + mouse); swipe left/right on touch; guard doubles + interactive UI
  const clickGuardRef = useRef(0)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)
  const suppressNextClickRef = useRef(false)

  const isInteractiveTarget = (el: EventTarget | null) => {
    if (!(el instanceof HTMLElement)) return false
    return !!el.closest(
      'button, a, input, textarea, select, label, [role="dialog"], [data-no-advance]',
    )
  }

  const onBackdropClick = (e: React.MouseEvent) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false
      return
    }
    if (isInteractiveTarget(e.target)) return
    const now = Date.now()
    if (now - clickGuardRef.current < 150) return
    clickGuardRef.current = now
    goNext()
  }

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0]
    if (!t) return
    touchStartRef.current = { x: t.clientX, y: t.clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const t = e.changedTouches[0]
    if (!t) return
    const dx = t.clientX - touchStartRef.current.x
    const dy = t.clientY - touchStartRef.current.y
    touchStartRef.current = null
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)
    if (absX < 48 || absX < absY) return
    suppressNextClickRef.current = true
    if (dx < 0) goNext()
    else goPrev()
  }

  const bg = slide.background ?? THEME.darkDeep
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
      className="h-full min-h-screen min-h-[100dvh] w-full select-none deck-backdrop"
      style={{
        background: `radial-gradient(ellipse 85% 75% at 50% 42%, ${THEME.darkMid} 0%, ${THEME.darkDeep} 48%, #030201 100%)`,
      }}
      onClick={onBackdropClick}
    >
      <div className="h-full min-h-screen min-h-[100dvh] w-full flex items-center justify-center px-2 py-3 sm:px-4 sm:py-6">
        <div className="flex flex-col items-center">
          <div
            className="deck-aspect-wrap relative"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {frame === 'deck' ? (
              <div
                className="pointer-events-none absolute inset-0 rounded-[15px] sm:rounded-[16px]"
                style={{
                  boxShadow:
                    '0 0 0 1px rgba(255,255,255,0.09), 0 2px 1px rgba(255,255,255,0.04) inset, 0 32px 64px rgba(0,0,0,0.55), 0 12px 28px rgba(0,0,0,0.35)',
                }}
              />
            ) : null}

            {showTopNav ? (
              <div className="absolute left-0 top-0 w-full z-20 pointer-events-none">
                {/* TopNav attaches itself inside slides when needed; kept reserved here */}
              </div>
            ) : null}

            <LayoutGroup id="deck-layout">
              <AnimatePresence mode="sync">
                <motion.div
                  key={slide.id}
                  className="absolute inset-0 overflow-hidden"
                  initial={{ opacity: 0, y: 18, scale: 0.992 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.988 }}
                  transition={TRANSITIONS.pageCrossfade}
                >
                  <div
                    className={
                      frame === 'deck'
                        ? 'absolute inset-2 sm:inset-[14px] rounded-[10px] sm:rounded-[12px] overflow-hidden'
                        : 'absolute inset-0'
                    }
                  >
                    <div className="absolute inset-0" style={{ background: bg }} />
                    <SlideDeckProvider value={{ currentIndex: index, slideCount: slides.length }}>
                      {slide.component}
                    </SlideDeckProvider>
                  </div>
                </motion.div>
              </AnimatePresence>
            </LayoutGroup>
          </div>

          {(showNavButtons || showProgress) ? (
            <div
              className="mt-3 flex w-full max-w-[min(96vw,1380px)] items-center justify-between gap-3 pointer-events-auto"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              style={{
                paddingBottom: 'max(0px, env(safe-area-inset-bottom, 0px))',
              }}
            >
              {showProgress ? (
                <div
                  className="h-[6px] flex-1 overflow-hidden rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.35)',
                  }}
                >
                  <div
                    className="h-full rounded-full transition-[width] duration-300 ease-out"
                    style={{
                      width: `${progressPct}%`,
                      background: `linear-gradient(90deg, ${THEME.primary} 0%, ${THEME.accent} 100%)`,
                      boxShadow: `0 0 14px ${THEME.accent}66`,
                    }}
                  />
                </div>
              ) : (
                <div className="flex-1" />
              )}

              {showNavButtons ? (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      goPrev()
                    }}
                    disabled={!canPrev}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border text-white shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors disabled:opacity-40"
                    style={{
                      fontFamily: THEME.fontMono,
                      background: 'rgba(255,255,255,0.10)',
                      borderColor: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      goNext()
                    }}
                    disabled={!canNext || blocked}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border text-white shadow-[0_10px_26px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors disabled:opacity-40"
                    style={{
                      fontFamily: THEME.fontMono,
                      background: 'rgba(255,255,255,0.10)',
                      borderColor: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    →
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}


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
      className="h-full min-h-screen min-h-[100dvh] w-full select-none"
      style={{ background: THEME.darkDeep }}
      onClick={onBackdropClick}
    >
      <div className="h-full min-h-screen min-h-[100dvh] w-full flex items-center justify-center">
        <div
          className="deck-aspect-wrap relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
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
              <div
                className={
                  frame === 'deck'
                    ? 'absolute inset-2 sm:inset-[14px] rounded-[10px] sm:rounded-[12px] overflow-hidden'
                    : 'absolute inset-0'
                }
              >
                <div className="absolute inset-0" style={{ background: bg }} />
                {slide.component}
              </div>
            </motion.div>
          </AnimatePresence>

          {showNavButtons ? (
            <div
              className="absolute z-30 flex items-center gap-2 pointer-events-auto"
              style={{
                bottom: 'max(0.75rem, calc(env(safe-area-inset-bottom, 0px) + 0.25rem))',
                right: 'max(1rem, env(safe-area-inset-right, 0px))',
              }}
            >
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  goPrev()
                }}
                disabled={!canPrev}
                className={
                  lightSurface
                    ? 'flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded sm:h-8 sm:w-8 sm:min-h-0 sm:min-w-0 bg-zinc-900/85 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900/85 text-white font-medium shadow-sm border border-zinc-800/40'
                    : 'flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded sm:h-8 sm:w-8 sm:min-h-0 sm:min-w-0 bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/10 text-white font-medium'
                }
                style={{ fontFamily: THEME.fontMono }}
              >
                ←
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation()
                  goNext()
                }}
                disabled={!canNext || blocked}
                className={
                  lightSurface
                    ? 'flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded sm:h-8 sm:w-8 sm:min-h-0 sm:min-w-0 bg-zinc-900/85 hover:bg-zinc-900 disabled:opacity-40 disabled:hover:bg-zinc-900/85 text-white font-medium shadow-sm border border-zinc-800/40'
                    : 'flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded sm:h-8 sm:w-8 sm:min-h-0 sm:min-w-0 bg-white/10 hover:bg-white/15 disabled:opacity-40 disabled:hover:bg-white/10 text-white font-medium'
                }
                style={{ fontFamily: THEME.fontMono }}
              >
                →
              </button>
              <div
                className={`ml-1 text-[10px] sm:ml-2 sm:text-[11px] ${lightSurface ? 'text-zinc-600' : 'text-white/70'}`}
                style={{ fontFamily: THEME.fontMono }}
              >
                {index + 1} / {slides.length}
              </div>
            </div>
          ) : null}

          {showProgress ? (
            <div
              className={`absolute left-0 w-full h-[3px] z-30 ${lightSurface ? 'bg-zinc-200/90' : 'bg-white/10'}`}
              style={{ bottom: 'env(safe-area-inset-bottom, 0px)' }}
            >
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


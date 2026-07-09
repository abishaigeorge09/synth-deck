import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { HighlightLine } from '../components/HighlightLine'
import { PixelArt } from '../components/PixelArt'
import { Tagline } from '../components/Tagline'
import { ExportPdfButton } from '../components/ExportPdfButton'
import { TopNav } from '../components/TopNav'
import { useAdvanceGate } from '../components/advanceGate'
import { STAGGER, TRANSITIONS } from '../lib/motion'
import { THEME } from '../lib/theme'

type Phase = 'reveal' | 'title'

export function S01_Title() {
  const { setBlocked } = useAdvanceGate()
  const [phase, setPhase] = useState<Phase>('reveal')
  const [typed, setTyped] = useState('')

  useEffect(() => {
    setBlocked(true)
    return () => setBlocked(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const target = 'synth'
    const timers: Array<number> = []

    // 300ms silence
    timers.push(
      window.setTimeout(() => {
        let i = 0
        const interval = window.setInterval(() => {
          i++
          setTyped(target.slice(0, i))
          if (i >= target.length) window.clearInterval(interval)
        }, THEME.logoReveal.typewriterSpeed)
        timers.push(interval)
      }, 300),
    )

    // crossfade into title phase
    timers.push(
      window.setTimeout(() => {
        setPhase('title')
      }, 2500),
    )

    // unlock advance after title phase lands
    timers.push(
      window.setTimeout(() => {
        setBlocked(false)
      }, 2500 + 1500),
    )

    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [setBlocked])

  const highlightLines = useMemo(
    () => [
      { text: 'EVERY DATA' },
      { text: 'SIGNAL.' },
      { text: 'ONE' },
      { text: 'PLATFORM.' },
    ],
    [],
  )

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background crossfade */}
      <motion.div
        className="absolute inset-0"
        animate={{ backgroundColor: phase === 'title' ? THEME.primary : THEME.darkDeep }}
        transition={{ duration: THEME.logoReveal.crossfadeDuration / 1000, ease: 'easeOut' }}
      />

      {/* Phase 2 pixels */}
      <AnimatePresence>
        {phase === 'title' ? (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <PixelArt pattern="cascade-tr" seed={2} color="#000000" />
            <PixelArt pattern="cascade-bl" seed={3} color="#000000" />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Logo reveal (center) → title phase: top-right (replaces nav brand). Transform + % left only — no left/right:auto swap (avoids double-settle). Underline is absolute so removing it does not reflow the wordmark. */}
      <motion.div
        className="absolute z-50 pointer-events-none"
        initial={false}
        animate={
          phase === 'title'
            ? {
                top: 72,
                left: '100%',
                bottom: 'auto',
                // Right edge of wordmark 40px from slide edge — %/calc so we never animate to left:auto
                x: 'calc(-100% - 40px)',
                y: 0,
                scale: 0.42,
              }
            : {
                top: '50%',
                left: '50%',
                bottom: 'auto',
                x: '-50%',
                y: '-50%',
                scale: 1,
              }
        }
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          // Single origin for the whole move — switching origin mid-tween reads as a second “position”
          transformOrigin: 'center center',
        }}
      >
        <div className="relative flex flex-col items-center">
          <div className="flex items-baseline gap-1.5">
            <div
              className="text-[64px] tracking-[-0.06em] text-white leading-none"
              style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight }}
            >
              {typed}
            </div>
            <motion.div
              className="text-[68px] leading-none"
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                fontFamily: THEME.logoFont,
                fontWeight: THEME.logoWeight,
                color: THEME.logoDotColor,
              }}
            >
              .
            </motion.div>
          </div>

          {THEME.logoReveal.showLine && phase === 'reveal' ? (
            <motion.div
              className="pointer-events-none absolute left-1/2 top-full mt-4 h-px max-w-[200px] w-full -translate-x-1/2 bg-white/50"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: 0.4 }}
              style={{ transformOrigin: 'center' }}
            />
          ) : null}
        </div>
      </motion.div>

      {/* Tagline during reveal */}
      <AnimatePresence>
        {phase === 'reveal' && THEME.logoReveal.showSubtitle ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.9 }}
          >
            <Tagline text={THEME.tagline} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Phase 2 title typography */}
      <AnimatePresence>
        {phase === 'title' ? (
          <motion.div
            className="absolute left-24 top-40 z-20"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={TRANSITIONS.smooth}
          >
            <div className="flex flex-col gap-3 text-[84px] uppercase font-bold">
              {highlightLines.map((l, i) => (
                <motion.div
                  key={l.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...TRANSITIONS.smooth, delay: i * STAGGER.highlights }}
                >
                  <HighlightLine text={l.text} color={THEME.primaryLight} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Phase 2 nav + footer */}
      <AnimatePresence>
        {phase === 'title' ? (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.35 }}
            >
              <TopNav section="INTRO" page="1 / 13" omitBrand />
            </motion.div>
            <motion.div
              className="absolute left-10 bottom-7 text-white/70 text-[11px] tracking-[0.14em] uppercase"
              style={{ fontFamily: THEME.fontMono }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.55 }}
            >
              ©2026 {THEME.name}
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <ExportPdfButton tone={phase === 'title' ? 'green' : 'dark'} />
    </div>
  )
}


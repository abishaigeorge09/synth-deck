import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PrintExportContext } from '../context/PrintExportContext'
import { DeckPrintStack } from './DeckPrintStack'
import type { SlideDef } from './SlideShell'
import {
  DECK_UNLOCK_PASSWORD,
  readDeckUnlockFlag,
  writeDeckUnlockFlag,
} from '../lib/deckLock'
import { PasscodeInput } from '../features/gate/PasscodeInput'

export function DeckBlurLock({ children, printSlides }: { children: React.ReactNode; printSlides: SlideDef[] }) {
  const [unlocked, setUnlocked] = useState<boolean>(() => readDeckUnlockFlag())
  const [hasError, setHasError] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [attemptId, setAttemptId] = useState(0)
  const reducedMotion = useReducedMotion()

  /** Only mount the heavy print stack while a print job is active — avoids scroll/layout jank. */
  const [printSession, setPrintSession] = useState(false)

  const requestPdfExport = useCallback(() => {
    setPrintSession(true)
  }, [])

  const printExportValue = useMemo(() => ({ requestPdfExport }), [requestPdfExport])

  useEffect(() => {
    if (!printSession) return
    const id = window.setTimeout(() => {
      window.print()
    }, 200)
    return () => window.clearTimeout(id)
  }, [printSession])

  useEffect(() => {
    const onAfterPrint = () => {
      setPrintSession(false)
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = ''
    }
    window.addEventListener('afterprint', onAfterPrint)
    return () => window.removeEventListener('afterprint', onAfterPrint)
  }, [])

  useEffect(() => {
    if (!printSession) return
    const safety = window.setTimeout(() => setPrintSession(false), 120_000)
    return () => window.clearTimeout(safety)
  }, [printSession])

  useEffect(() => {
    if (!unlocked) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [unlocked])

  const onSubmit = (code: string) => {
    if (verifying) return
    if (code === DECK_UNLOCK_PASSWORD) {
      setVerifying(true)
      window.setTimeout(() => {
        writeDeckUnlockFlag()
        setUnlocked(true)
      }, 280)
      return
    }
    setHasError(true)
    window.setTimeout(() => {
      setAttemptId((n) => n + 1)
      setHasError(false)
    }, 340)
  }

  return (
    <PrintExportContext.Provider value={printExportValue}>
      <div className="relative h-full w-full min-h-0">
        <div
          aria-hidden={!unlocked}
          className="h-full w-full min-h-0"
          style={{
            filter: unlocked ? 'none' : 'blur(18px) saturate(1.2) brightness(0.7)',
            transition: 'filter 350ms ease',
            pointerEvents: unlocked ? 'auto' : 'none',
          }}
        >
          {children}
        </div>

        <AnimatePresence>
          {!unlocked ? (
            <motion.div
              key="deck-gate"
              initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[9999] flex items-center justify-center"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(30, 38, 130, 0.55) 0%, rgba(8, 8, 40, 0.85) 60%, rgba(8, 8, 40, 0.95) 100%)',
                backdropFilter: 'blur(8px) saturate(1.1)',
                WebkitBackdropFilter: 'blur(8px) saturate(1.1)',
                paddingTop: 'env(safe-area-inset-top)',
                paddingBottom: 'env(safe-area-inset-bottom)',
                paddingLeft: 'env(safe-area-inset-left)',
                paddingRight: 'env(safe-area-inset-right)',
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="deck-lock-title"
            >
              <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
                className="mx-5 flex w-full max-w-[380px] flex-col items-center gap-10"
                style={{ fontFamily: 'JetBrains Mono, ui-monospace, monospace' }}
              >
                <span
                  id="deck-lock-title"
                  className="text-[28px] font-bold leading-none tracking-[-0.02em]"
                  style={{ color: '#FFFFFF' }}
                >
                  synth
                  <span style={{ color: '#10B981' }}>.</span>
                </span>

                <PasscodeInput
                  key={attemptId}
                  length={8}
                  onSubmit={onSubmit}
                  hasError={hasError}
                  disabled={verifying}
                />

                <p
                  className="min-h-[16px] text-center text-[11px] leading-[1.4]"
                  aria-live="polite"
                  style={{
                    color: hasError ? 'rgba(239, 68, 68, 0.85)' : 'transparent',
                    transition: 'color 200ms ease',
                    fontFamily: 'JetBrains Mono, ui-monospace, monospace',
                  }}
                >
                  {hasError ? 'Wrong code' : '·'}
                </p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {unlocked && printSession ? <DeckPrintStack slides={printSlides} /> : null}
      </div>
    </PrintExportContext.Provider>
  )
}

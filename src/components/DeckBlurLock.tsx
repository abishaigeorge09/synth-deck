import { useCallback, useEffect, useMemo, useState } from 'react'
import { PrintExportContext } from '../context/PrintExportContext'
import { DeckPrintStack } from './DeckPrintStack'
import type { SlideDef } from './SlideShell'
import { THEME } from '../lib/theme'
import { DECK_UNLOCK_PASSWORD } from '../lib/deckLock'

export function DeckBlurLock({ children, printSlides }: { children: React.ReactNode; printSlides: SlideDef[] }) {
  // Dev: always unlocked (no gate). Production / preview: locked on every full reload.
  const [unlocked, setUnlocked] = useState(() => import.meta.env.DEV)
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(false)

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
      // Print preview sets overflow on body; restore app chrome
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = ''
    }
    window.addEventListener('afterprint', onAfterPrint)
    return () => window.removeEventListener('afterprint', onAfterPrint)
  }, [])

  // Safari / edge cases: if afterprint never fires, unmount the print stack so scroll stays smooth
  useEffect(() => {
    if (!printSession) return
    const safety = window.setTimeout(() => setPrintSession(false), 120_000)
    return () => window.clearTimeout(safety)
  }, [printSession])

  const tryUnlock = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (password === DECK_UNLOCK_PASSWORD) {
      setUnlocked(true)
      setError(false)
      setPassword('')
    } else {
      setError(true)
    }
  }

  return (
    <PrintExportContext.Provider value={printExportValue}>
      <div className="relative h-full w-full min-h-0">
        <div
          className={`h-full w-full min-h-0 ${unlocked ? '' : 'pointer-events-none select-none blur-[14px]'}`}
          aria-hidden={!unlocked}
        >
          {children}
        </div>

        {!unlocked ? (
          <div
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-md sm:p-6"
            style={{
              paddingTop: 'max(1rem, env(safe-area-inset-top, 0px))',
              paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))',
              paddingLeft: 'max(1rem, env(safe-area-inset-left, 0px))',
              paddingRight: 'max(1rem, env(safe-area-inset-right, 0px))',
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="deck-lock-title"
          >
            <form
              onSubmit={tryUnlock}
              className="my-auto w-full max-h-[min(90dvh,560px)] max-w-[380px] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950/95 p-6 shadow-2xl sm:p-8"
              style={{ fontFamily: THEME.fontSans }}
            >
              <h2 id="deck-lock-title" className="text-lg font-semibold text-white" style={{ fontFamily: THEME.fontMono }}>
                Presentation locked
              </h2>
              <p className="mt-2 text-sm text-zinc-400">Enter the password to view this deck.</p>

              <label className="mt-6 block">
                <span className="mb-1.5 block text-[11px] font-medium uppercase tracking-wide text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
                  Password
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2.5 text-[15px] text-white outline-none ring-0 placeholder:text-zinc-600 focus:border-zinc-500"
                  placeholder="Password"
                  autoFocus
                />
              </label>

              <div className="mt-3 flex items-center gap-2">
                <input
                  id="deck-lock-show-pw"
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4 rounded border-zinc-600 bg-zinc-900 text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="deck-lock-show-pw" className="cursor-pointer text-sm text-zinc-400">
                  Show password
                </label>
              </div>

              {error ? (
                <p className="mt-3 text-sm text-red-400" role="alert">
                  Incorrect password. Try again.
                </p>
              ) : null}

              <button
                type="submit"
                className="mt-6 w-full rounded-lg py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white transition hover:opacity-90"
                style={{ background: THEME.primary, fontFamily: THEME.fontMono }}
              >
                Unlock
              </button>
            </form>
          </div>
        ) : null}

        {unlocked && printSession ? <DeckPrintStack slides={printSlides} /> : null}
      </div>
    </PrintExportContext.Provider>
  )
}

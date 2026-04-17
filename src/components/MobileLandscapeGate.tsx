import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { THEME } from '../lib/theme'

function isPhoneUserAgent() {
  if (typeof navigator === 'undefined') return false
  return /Android.+Mobile|iPhone|iPod|Mobile/i.test(navigator.userAgent)
}

function isStandaloneDisplayMode() {
  if (typeof window === 'undefined') return false
  const mediaStandalone = window.matchMedia?.('(display-mode: standalone)').matches ?? false
  const iosStandalone = typeof navigator !== 'undefined' && 'standalone' in navigator ? Boolean((navigator as Navigator & { standalone?: boolean }).standalone) : false
  return mediaStandalone || iosStandalone
}

function isSmallTouchViewport() {
  if (typeof window === 'undefined') return false
  const smallestSide = Math.min(window.innerWidth, window.innerHeight)
  return smallestSide <= 932
}

export function MobileLandscapeGate({ children }: { children: ReactNode }) {
  const [isPhone, setIsPhone] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isSmallTouch, setIsSmallTouch] = useState(false)

  useEffect(() => {
    const sync = () => {
      setIsPhone(isPhoneUserAgent())
      setIsStandalone(isStandaloneDisplayMode())
      setIsSmallTouch(isSmallTouchViewport())
    }

    sync()
    window.addEventListener('resize', sync)
    window.addEventListener('orientationchange', sync)

    return () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
    }
  }, [])

  const showGate = useMemo(() => isPhone || (isStandalone && isSmallTouch), [isPhone, isSmallTouch, isStandalone])

  if (!showGate) return <>{children}</>

  return (
    <div
      className="flex min-h-screen min-h-[100dvh] w-full items-center justify-center px-6 py-8 text-center"
      style={{
        background: `radial-gradient(circle at top, rgba(16,185,129,0.12), transparent 38%), ${THEME.darkDeep}`,
        color: THEME.white,
      }}
    >
      <div className="max-w-[28rem]">
        <div
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] border"
          style={{
            borderColor: 'rgba(255,255,255,0.14)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <div
            className="flex h-11 w-7 items-center justify-center rounded-[10px] border-2"
            style={{
              borderColor: THEME.primaryLight,
              boxShadow: `0 0 22px ${THEME.accent}22`,
            }}
          >
            <div className="h-1.5 w-1.5 rounded-full" style={{ background: THEME.primaryLight }} />
          </div>
        </div>

        <div
          className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ fontFamily: THEME.fontMono, color: 'rgba(255,255,255,0.5)' }}
        >
          Website only
        </div>
        <h1
          className="mt-3 text-[30px] font-bold leading-[1.02] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono }}
        >
          This presentation works better on the website.
        </h1>
        <p
          className="mt-4 text-[15px] leading-[1.6]"
          style={{ fontFamily: THEME.fontSans, color: 'rgba(255,255,255,0.76)' }}
        >
          Please open it on our website instead of using a PWA or phone view.
        </p>
      </div>
    </div>
  )
}

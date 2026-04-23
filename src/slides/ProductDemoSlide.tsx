import { motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { useAdvanceGate } from '../components/advanceGate'
import { useDeckAdvance } from '../components/DeckAdvanceContext'
import { TopNav } from '../components/TopNav'
import { PRODUCT_DEMO_SLIDE_NEXT_EVENT } from '../lib/setupSlideEvents'
import { THEME } from '../lib/theme'

type NavOverrides = { pageOverride?: string; sectionOverride?: string; autoExpand?: boolean }
type DemoPhase = 'preview' | 'expanded' | 'done' | 'closing'

const DEMO_URL = '/Product%20Demo/synth_demo_nature.html'

export function ProductDemoSlide({ pageOverride, sectionOverride, autoExpand = false }: NavOverrides) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null)
  const closingTimerRef = useRef<number | null>(null)
  const pendingStartRef = useRef(false)
  const pendingPreviewStartRef = useRef(true)

  const { setBlocked } = useAdvanceGate()
  const advance = useDeckAdvance()

  const [phase, setPhase] = useState<DemoPhase>('preview')
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const isExpanded = phase === 'expanded' || phase === 'done' || phase === 'closing'

  const invokeDemo = useCallback((command: 'start' | 'pause' | 'resume' | 'toggle', muted = false) => {
    const frame = iframeRef.current
    const win = frame?.contentWindow
    if (!win) return false
    try {
      const controller = (win as Window & { synthDemoController?: { start?: (muted?: boolean) => void; pause?: () => void; resume?: () => void; toggle?: () => void } }).synthDemoController
      if (controller) {
        if (command === 'start') controller.start?.(muted)
        if (command === 'pause') controller.pause?.()
        if (command === 'resume') controller.resume?.()
        if (command === 'toggle') controller.toggle?.()
      }
      win.postMessage({ source: 'deck-product-demo', command, muted }, '*')
      return true
    } catch {
      return false
    }
  }, [])

  const openDemo = useCallback(() => {
    setPhase('expanded')
    setBlocked(false)
    /** Expanded demo always starts muted; unmute from the in-demo speaker control. */
    if (iframeLoaded) {
      window.setTimeout(() => invokeDemo('start', true), 80)
    } else {
      pendingStartRef.current = true
    }
  }, [iframeLoaded, invokeDemo, setBlocked])

  useEffect(() => {
    if (!autoExpand) return
    if (phase !== 'preview') return
    window.setTimeout(() => openDemo(), 60)
  }, [autoExpand, openDemo, phase])

  useEffect(() => {
    if (phase !== 'preview') return
    if (iframeLoaded) {
      window.setTimeout(() => invokeDemo('start', true), 80)
      pendingPreviewStartRef.current = false
      return
    }
    pendingPreviewStartRef.current = true
  }, [iframeLoaded, invokeDemo, phase])

  const collapseAndAdvance = useCallback(() => {
    setBlocked(false)
    setPhase('closing')
    closingTimerRef.current = window.setTimeout(() => {
      advance()
    }, 260)
  }, [advance, setBlocked])

  useEffect(() => {
    setBlocked(false)
    return () => {
      setBlocked(false)
      if (closingTimerRef.current) window.clearTimeout(closingTimerRef.current)
    }
  }, [setBlocked])

  useEffect(() => {
    const onNext = () => {
      if (phase === 'preview') {
        openDemo()
        return
      }
      if (phase === 'expanded' || phase === 'done') {
        collapseAndAdvance()
      }
    }
    window.addEventListener(PRODUCT_DEMO_SLIDE_NEXT_EVENT, onNext)
    return () => window.removeEventListener(PRODUCT_DEMO_SLIDE_NEXT_EVENT, onNext)
  }, [collapseAndAdvance, openDemo, phase])

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      const data = event.data
      if (!data || data.source !== 'synth-demo') return
      if (data.type === 'finished') {
        setPhase('done')
        setBlocked(false)
      }
      /** Iframe has focus while demo is paused; parent never sees Arrow/Space — bridge from HTML. */
      if (data.type === 'requestDeckNext') {
        window.dispatchEvent(new CustomEvent(PRODUCT_DEMO_SLIDE_NEXT_EVENT))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [setBlocked])

  const previewHint = useMemo(() => {
    if (phase === 'preview') return 'Press next to open the live product demo.'
    if (phase === 'expanded')
      return 'Demo is playing muted. Use the speaker control in the demo for sound. Click inside to pause or resume, or press next to skip.'
    if (phase === 'done') return 'Demo finished. Press next to continue.'
    return 'Closing demo…'
  }, [phase])

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: THEME.darkDeep,
        padding: 'clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 48px) clamp(20px, 3.5vw, 32px)',
      }}
    >
      <TopNav section={sectionOverride ?? '02 · SOLUTION'} page={pageOverride ?? '7 / 14'} tone="dark" />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        {!isExpanded ? (
          <div className="mb-8 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/55" style={{ fontFamily: THEME.fontMono }}>
              Product demo
            </div>
            <h1 className="mt-3 text-[clamp(28px,4vw,44px)] font-bold leading-[1.02] tracking-[-0.05em] text-white" style={{ fontFamily: THEME.fontMono }}>
              See the product in motion.
            </h1>
            <p className="mt-3 max-w-[42rem] text-[15px] leading-[1.55] text-white/70" style={{ fontFamily: THEME.fontSans }}>
              Preview first, then expand into the full in-deck demo.
            </p>
          </div>
        ) : null}

        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 280, damping: 34 }}
          className="relative"
          style={{
            width: isExpanded ? '100%' : 'min(900px, 74vw)',
            maxWidth: isExpanded ? '100%' : '900px',
          }}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 280, damping: 34 }}
            className="relative overflow-hidden rounded-[28px] border bg-black shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            style={{
              borderColor: 'rgba(255,255,255,0.16)',
              height: isExpanded ? 'min(74vh, 720px)' : '360px',
            }}
          >
            <iframe
              ref={iframeRef}
              src={DEMO_URL}
              title="synth. product demo"
              className="h-full w-full border-0"
              style={{
                pointerEvents: isExpanded ? 'auto' : 'none',
                transform: isExpanded ? 'scale(1)' : 'scale(0.9)',
                transformOrigin: 'center center',
                opacity: isExpanded ? 1 : 0.9,
                transition: 'transform 240ms ease, opacity 240ms ease',
              }}
              onLoad={() => {
                setIframeLoaded(true)
                if (phase === 'preview' && pendingPreviewStartRef.current) {
                  pendingPreviewStartRef.current = false
                  window.setTimeout(() => invokeDemo('start', true), 80)
                }
                if (pendingStartRef.current) {
                  pendingStartRef.current = false
                  window.setTimeout(() => invokeDemo('start', true), 80)
                }
              }}
            />

            {!isExpanded ? (
              <div className="absolute inset-0 flex items-center justify-center bg-[linear-gradient(180deg,rgba(5,10,18,0.12),rgba(5,10,18,0.4))]">
                <div
                  className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white"
                  style={{ fontFamily: THEME.fontMono, borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.32)' }}
                >
                  Preview mode
                </div>
              </div>
            ) : null}
          </motion.div>

          <div className="mt-4 flex items-center justify-center">
            <div
              className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{
                fontFamily: THEME.fontMono,
                color: 'rgba(255,255,255,0.82)',
                borderColor: 'rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
              }}
            >
              {previewHint}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


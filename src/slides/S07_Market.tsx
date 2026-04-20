import type { ReactNode } from 'react'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'
import { IllustMarketNestedBottom } from '../components/simpleIllustrations'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

const sub = 'rgba(255,255,255,0.5)'
const lineTam = 'rgba(255,255,255,0.38)'
const lineSam = THEME.primary
const lineSom = THEME.accent

function MarketTier({
  label,
  value,
  valueColor,
  lineColor,
  children,
}: {
  label: string
  value: string
  valueColor: string
  lineColor: string
  children: ReactNode
}) {
  return (
    <div className="space-y-2.5">
      <p
        className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45"
        style={{ fontFamily: THEME.fontMono }}
      >
        {label}
      </p>
      <div className="flex min-w-0 items-center gap-4">
        {/* Single leader line (never crosses into illustration column) */}
        <div className="h-[2px] min-w-[4.5rem] flex-1" style={{ background: lineColor, opacity: 0.9 }} />
        <span
          className="shrink-0 text-[clamp(26px,3.4vw,42px)] font-bold tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: valueColor }}
        >
          {value}
        </span>
      </div>
      <div className="max-w-[34ch] text-[14px] leading-relaxed lg:text-[15px]" style={{ fontFamily: THEME.fontSans, color: sub }}>
        {children}
      </div>
    </div>
  )
}

/** Airbnb-style market viz: bullseye bleeds from the left; TAM/SAM/SOM blocks + connectors on the right. */
export function S07_Market({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.darkDeep, padding: PAD }}>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36%] opacity-[0.28]"
        style={{
          background: `radial-gradient(ellipse 95% 75% at 58% 115%, ${THEME.accent} 0%, ${THEME.primary}55 38%, transparent 62%)`,
        }}
        aria-hidden
      />

      <TopNav section={sectionOverride ?? '06 · MARKET'} page={pageOverride ?? '7 / 13'} tone="dark" />

      {/* Center the whole composition inside the slide */}
      <div className="relative z-[1] flex min-h-0 flex-1 items-center">
        <div className="mx-auto flex w-full max-w-[1280px] min-h-0 flex-col items-stretch gap-10 lg:flex-row lg:items-center lg:gap-14">
          <div className="relative flex min-h-[min(40vh,320px)] min-w-0 flex-[1.45] items-center justify-center overflow-visible lg:min-h-0">
            <div
              className="flex w-full items-center justify-center"
              // Keep the full outer disk visible; no edge cropping.
              style={{ transform: 'translateX(0%)', transformOrigin: 'center center' }}
            >
              <IllustMarketNestedBottom className="max-w-none max-lg:max-h-[min(52vh,520px)] lg:max-h-[min(70vh,640px)]" />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 flex-col justify-center gap-11 py-6 sm:py-8 lg:max-w-[min(26rem,44vw)] lg:gap-12 lg:py-10">
          <h2
            className="text-left text-[clamp(32px,4.6vw,56px)] font-bold leading-[1.02] tracking-[-0.04em]"
            style={{ fontFamily: THEME.fontSans }}
          >
            <span style={{ color: THEME.white }}>Market</span>{' '}
            <span style={{ color: 'rgba(255,255,255,0.38)' }}>size</span>
          </h2>

          <div className="flex flex-col gap-11 lg:gap-12">
            <MarketTier
              label="Total addressable market"
              value="$4.2B+"
              valueColor={THEME.white}
              lineColor={lineTam}
            >
              <strong style={{ color: THEME.white, fontWeight: 600 }}>Global sports</strong> software &amp; data spend
              (illustrative).
            </MarketTier>

            <MarketTier
              label="Serviceable addressable market"
              value="$890M"
              valueColor={THEME.primaryLight}
              lineColor={lineSam}
            >
              <strong style={{ color: THEME.primaryLight, fontWeight: 600 }}>US collegiate</strong> athletics programs.
            </MarketTier>

            <MarketTier
              label="Serviceable obtainable market"
              value="$24M"
              valueColor={THEME.accent}
              lineColor={lineSom}
            >
              <strong style={{ color: THEME.accent, fontWeight: 600 }}>Rowing</strong> wedge · year-one footprint.
            </MarketTier>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

const COACH_DASHBOARD_SRC = '/product-demo/coach-dashboard.png'
const ATHLETE_HOME_SRC = '/product-demo/athlete-home.jpeg'
const ATHLETE_OVERVIEW_SRC = '/product-demo/athlete-overview.jpeg'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

function ScreenPlaceholder({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-1"
      style={{
        background: '#FAFAF9',
        border: `1.5px dashed ${THEME.border}`,
      }}
    >
      <span
        className="text-[11px] font-semibold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {label}
      </span>
      {sublabel ? (
        <span
          className="text-[9.5px] uppercase tracking-[0.18em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted, opacity: 0.7 }}
        >
          {sublabel}
        </span>
      ) : null}
    </div>
  )
}

/** Renders an <img> but falls back to <fallback/> if the file is missing. */
function GracefulScreen({
  src,
  alt,
  fallback,
  objectPosition = 'top center',
}: {
  src: string
  alt: string
  fallback: React.ReactNode
  objectPosition?: string
}) {
  const [ok, setOk] = useState(true)
  if (!ok) return <>{fallback}</>
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
      style={{ objectPosition }}
      onError={() => setOk(false)}
    />
  )
}

function Laptop() {
  return (
    <div className="relative" style={{ width: 760 }}>
      <div
        className="relative mx-auto"
        style={{
          width: 760,
          height: 470,
          background: '#0C0A09',
          borderRadius: '20px 20px 6px 6px',
          padding: '26px 22px 22px',
          boxShadow: '0 36px 80px rgba(24,24,27,0.28), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: '#EF4444' }} />
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: '#F59E0B' }} />
            <span className="block h-2.5 w-2.5 rounded-full" style={{ background: THEME.accent }} />
          </div>
          <span
            className="rounded-full px-3 py-1 text-[9.5px] font-semibold uppercase tracking-[0.18em]"
            style={{
              fontFamily: THEME.fontMono,
              color: 'rgba(255,255,255,0.75)',
              background: 'rgba(255,255,255,0.06)',
            }}
          >
            app.synthsports.co
          </span>
          <span style={{ width: 56 }} />
        </div>
        <div className="h-[calc(100%-30px)] w-full overflow-hidden rounded-md bg-white">
          <GracefulScreen
            src={COACH_DASHBOARD_SRC}
            alt="synth coach dashboard"
            fallback={<ScreenPlaceholder label="Coach dashboard" sublabel="screenshot TBD" />}
          />
        </div>
      </div>
      <div
        className="mx-auto"
        style={{
          width: 820,
          height: 16,
          background: 'linear-gradient(180deg, #27272A 0%, #0C0A09 100%)',
          borderRadius: '0 0 18px 18px',
          boxShadow: '0 24px 32px rgba(24,24,27,0.18)',
        }}
      />
      <div
        className="mx-auto"
        style={{
          width: 140,
          height: 5,
          background: '#3F3F46',
          borderRadius: '0 0 10px 10px',
          marginTop: -2,
        }}
      />
    </div>
  )
}

function Phone({
  tilt,
  src,
  alt,
  fallbackLabel,
}: {
  tilt: number
  src: string
  alt: string
  fallbackLabel: string
}) {
  return (
    <div
      className="relative"
      style={{
        width: 188,
        height: 388,
        background: '#0C0A09',
        borderRadius: 34,
        padding: 9,
        boxShadow: '0 28px 56px rgba(24,24,27,0.28), inset 0 1px 0 rgba(255,255,255,0.05)',
        transform: `rotate(${tilt}deg)`,
      }}
    >
      <div
        className="absolute left-1/2 top-2.5 z-10 -translate-x-1/2"
        style={{ width: 64, height: 18, background: '#0C0A09', borderRadius: 14 }}
      />
      <div className="h-full w-full overflow-hidden bg-white" style={{ borderRadius: 25 }}>
        <GracefulScreen
          src={src}
          alt={alt}
          fallback={<ScreenPlaceholder label={fallbackLabel} sublabel="TBD" />}
        />
      </div>
    </div>
  )
}

export function ProductDemoStatic({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '03 · PRODUCT DEMO'} page={pageOverride ?? ''} tone="light" />

      <div className="relative z-10 mt-6 flex min-h-0 flex-1 flex-col">
        <SectionLabel text="03 · PRODUCT DEMO" />
        <h1
          className="mt-2 text-[clamp(32px,3.8vw,48px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          One layer. Every surface.
        </h1>
        <p
          className="mt-3 max-w-[60rem] text-[17px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Coach dashboard on the web. Athlete app as a PWA. Same data layer underneath.
        </p>

        <div className="relative flex flex-1 items-center justify-center">
          <div
            className="pointer-events-none absolute inset-x-10 bottom-20 top-10"
            style={{
              background: `radial-gradient(ellipse 60% 60% at 50% 60%, ${THEME.accent}1F 0%, transparent 70%)`,
            }}
            aria-hidden
          />
          <div className="relative flex items-end justify-center gap-3">
            <div className="z-10 -mr-6 mb-12">
              <Phone
                tilt={-6}
                src={ATHLETE_HOME_SRC}
                alt="synth athlete app — home"
                fallbackLabel="Athlete app"
              />
            </div>
            <div className="z-20">
              <Laptop />
            </div>
            <div className="z-10 -ml-6 mb-12">
              <Phone
                tilt={6}
                src={ATHLETE_OVERVIEW_SRC}
                alt="synth athlete app — overview"
                fallbackLabel="Athlete app"
              />
            </div>
          </div>
        </div>

        <p
          className="text-center text-[12px] font-semibold uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          Live at app.synthsports.co
        </p>
      </div>
    </div>
  )
}

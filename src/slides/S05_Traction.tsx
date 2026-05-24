import { useState } from 'react'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const CAL_LOGO = '/logos/cal-golden-bears.svg'

const PAD = 'clamp(28px, 4vw, 48px) clamp(28px, 4vw, 56px) clamp(24px, 4vw, 40px)'

/** Renders an image but stays invisible if the file is missing. */
function GracefulLogo({
  src,
  alt,
  style,
  className,
}: {
  src: string
  alt: string
  style?: React.CSSProperties
  className?: string
}) {
  const [ok, setOk] = useState(true)
  if (!ok) return null
  return <img src={src} alt={alt} style={style} className={className} onError={() => setOk(false)} />
}

type Stat = { value: string; label: string; accent: string }

/** Descending by value. */
const STATS: Stat[] = [
  { value: '250', label: 'Pre-launch signups', accent: THEME.accent },
  { value: '120', label: 'On the roster', accent: THEME.textPrimary },
  { value: '6', label: 'Advisors', accent: THEME.textPrimary },
  { value: '5', label: 'Active users', accent: THEME.purple },
  { value: '2', label: 'Coaches', accent: THEME.amber },
]

function StatColumn({ stat, leftBorder }: { stat: Stat; leftBorder: boolean }) {
  return (
    <div
      className="flex flex-col items-center px-2 py-1 text-center"
      style={{ borderLeft: leftBorder ? `1px solid ${THEME.border}` : 'none' }}
    >
      <div
        className="text-[clamp(60px,7.4vw,96px)] font-bold leading-none tracking-[-0.06em]"
        style={{ fontFamily: THEME.fontMono, color: stat.accent }}
      >
        {stat.value}
      </div>
      <div
        className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {stat.label}
      </div>
    </div>
  )
}

function SectionRule({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="h-px flex-1" style={{ background: THEME.border }} />
      <span
        className="text-[11px] font-bold uppercase tracking-[0.24em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
      >
        {text}
      </span>
      <span className="h-px flex-1" style={{ background: THEME.border }} />
    </div>
  )
}

function BackerLogo({ src, alt, maxH }: { src: string; alt: string; maxH: number }) {
  return (
    <div className="flex h-[76px] items-center justify-center px-3">
      <GracefulLogo
        src={src}
        alt={alt}
        style={{ maxHeight: maxH }}
        className="w-auto max-w-full object-contain"
      />
    </div>
  )
}

export function S05_Traction({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: THEME.light, padding: PAD }}
    >
      <TopNav section={sectionOverride ?? '07 · TRACTION'} page={pageOverride ?? ''} tone="light" />

      <div className="mx-auto flex w-full min-h-0 max-w-[1240px] flex-1 flex-col pt-6 pb-2">
        {/* Kicker — top left */}
        <div
          className="text-[12px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          07 · Traction
        </div>

        {/* Rest of the slide — centered, distributed vertically */}
        <div className="flex flex-1 flex-col items-center justify-between pt-2 text-center">
          {/* Top zone — Cal hero */}
          <div className="flex flex-col items-center">
            <img
              src={CAL_LOGO}
              alt="Cal"
              className="h-[clamp(100px,15vh,150px)] w-auto object-contain opacity-95"
            />
            <h1
              className="mt-5 text-[clamp(36px,4.2vw,54px)] font-bold leading-[1.04] tracking-[-0.04em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
            >
              Validated with{' '}
              <span style={{ color: THEME.primary }}>Cal Rowing.</span>
            </h1>
            <p
              className="mt-3 text-[15px] leading-[1.55]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
            >
              Cal Men&apos;s &amp; Women&apos;s Rowing — ranked #2 &amp; #5 in the U.S.A.
            </p>
          </div>

        {/* Middle zone — 5 stat columns, descending order */}
        <div className="w-full">
          <div className="grid grid-cols-5 items-end gap-2">
            {STATS.map((s, i) => (
              <StatColumn key={s.label} stat={s} leftBorder={i !== 0} />
            ))}
          </div>
        </div>

        {/* Bottom zone — Backed by */}
        <div className="w-full">
          <SectionRule text="Backed by" />
          <div className="mt-5 grid grid-cols-6 items-center gap-3">
            <BackerLogo src="/logos/berkeley-skydeck.svg" alt="Berkeley SkyDeck" maxH={52} />
            <BackerLogo src="/logos/pad-13.svg" alt="Pad-13" maxH={56} />
            <BackerLogo src="/logos/nvidia-inception.svg" alt="NVIDIA Inception" maxH={50} />
            <BackerLogo src="/logos/microsoft-for-startups.png" alt="Microsoft for Startups" maxH={56} />
            <BackerLogo src="/logos/google-for-startups.png" alt="Google for Startups" maxH={64} />
            <BackerLogo src="/logos/sutardja-cet.jpg" alt="Sutardja CET" maxH={52} />
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}

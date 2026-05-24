import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

type PinTier = 'now' | 'next' | 'long'

const PIN_TIER_STYLE: Record<PinTier, { fill: string; opacity: number; stroke: string }> = {
  now: { fill: THEME.accent, opacity: 1, stroke: THEME.primary },
  next: { fill: THEME.amber, opacity: 0.85, stroke: THEME.amber },
  long: { fill: 'transparent', opacity: 0.55, stroke: THEME.textMuted },
}

function Pin({ x, y, tier }: { x: number; y: number; tier: PinTier }) {
  const s = PIN_TIER_STYLE[tier]
  const r = 22
  return (
    <g opacity={s.opacity}>
      <path
        d={`M ${x} ${y - r - 22}
            C ${x - r * 0.55} ${y - r - 14}, ${x - r * 0.55} ${y - 5}, ${x - r * 0.32} ${y + 2}
            C ${x - r * 0.32} ${y + 10}, ${x - r * 0.45} ${y + 14}, ${x - r * 0.5} ${y + 18}
            C ${x - r} ${y + 32}, ${x - r} ${y + 22 + r}, ${x} ${y + r + 26}
            C ${x + r} ${y + 22 + r}, ${x + r} ${y + 32}, ${x + r * 0.5} ${y + 18}
            C ${x + r * 0.45} ${y + 14}, ${x + r * 0.32} ${y + 10}, ${x + r * 0.32} ${y + 2}
            C ${x + r * 0.55} ${y - 5}, ${x + r * 0.55} ${y - r - 14}, ${x} ${y - r - 22} Z`}
        fill={s.fill}
        stroke={s.stroke}
        strokeWidth={2.4}
      />
      {tier !== 'long' ? (
        <>
          <rect x={x - 8.5} y={y - r - 6} width={3.4} height={10} rx={1.7} fill="rgba(0,0,0,0.18)" />
          <rect x={x - 8.5} y={y - r + 10} width={3.4} height={10} rx={1.7} fill="rgba(0,0,0,0.18)" />
        </>
      ) : null}
    </g>
  )
}

const PINS: Array<{ x: number; y: number; tier: PinTier }> = [
  // Back row (4 pins) — long-term
  { x: 260, y: 100, tier: 'long' },
  { x: 380, y: 100, tier: 'long' },
  { x: 500, y: 100, tier: 'long' },
  { x: 620, y: 100, tier: 'long' },
  // Third row (3 pins) — next
  { x: 320, y: 250, tier: 'next' },
  { x: 440, y: 250, tier: 'next' },
  { x: 560, y: 250, tier: 'next' },
  // Second row (2 pins) — now
  { x: 380, y: 400, tier: 'now' },
  { x: 500, y: 400, tier: 'now' },
  // Front pin — now
  { x: 440, y: 550, tier: 'now' },
]

function BowlingTriangle() {
  return (
    <svg viewBox="0 0 880 660" className="w-full max-w-[640px]" aria-hidden>
      {PINS.map((p, i) => (
        <Pin key={i} x={p.x} y={p.y} tier={p.tier} />
      ))}
    </svg>
  )
}

type Tier = {
  label: string
  pins: string
  bullets: string[]
  color: string
}

const TIERS: Tier[] = [
  {
    label: '01 · Athletes · Now',
    pins: 'Pins 1–3',
    color: THEME.primary,
    bullets: ['Club teams', 'Collegiate sports', 'Professional teams'],
  },
  {
    label: '02 · Industrial human · Next',
    pins: 'Pins 4–6',
    color: THEME.amber,
    bullets: ['Construction workers', 'First responders', 'Military'],
  },
  {
    label: '03 · Every body that performs · Long-term',
    pins: 'Pins 7–10',
    color: THEME.textMuted,
    bullets: ['Performing artists', 'Manual trades', 'Industrial workforces', 'Robotics'],
  },
]

function TierBlock({ tier }: { tier: Tier }) {
  return (
    <div>
      <div
        className="text-[16px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: tier.color }}
      >
        {tier.label}
      </div>
      <div
        className="mt-1.5 text-[13px] uppercase tracking-[0.18em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {tier.pins}
      </div>
      <ul className="mt-3.5 space-y-2">
        {tier.bullets.map((b) => (
          <li
            key={b}
            className="flex items-center gap-3 text-[19px] leading-[1.4]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
          >
            <span
              className="inline-block h-2 w-2 shrink-0 rounded-full"
              style={{ background: tier.color }}
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function S11_Vision({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '44px 48px 32px', color: THEME.textPrimary, background: THEME.light }}
    >
      <TopNav section={sectionOverride ?? '11 · THE VISION'} page={pageOverride ?? ''} tone="light" />

      <div className="relative z-10 mt-10 flex min-h-0 flex-1 flex-col">
        {/* Kicker — top left */}
        <div
          className="text-[14px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          11 · The Vision
        </div>

        {/* Headline — centered above both columns */}
        <h1
          className="mx-auto mt-3 max-w-[1100px] text-center text-[clamp(32px,3.6vw,46px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          The world model of human physical performance.
        </h1>

        {/* 2-col row: bowling pins left, tier descriptions right */}
        <div className="mt-6 grid min-h-0 flex-1 grid-cols-12 items-center gap-10">
          <div className="col-span-7 flex items-center justify-center">
            <BowlingTriangle />
          </div>
          <div className="col-span-5 flex flex-col justify-center gap-8">
            {TIERS.map((t) => (
              <TierBlock key={t.label} tier={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

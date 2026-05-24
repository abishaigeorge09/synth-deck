import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.6vw, 44px) clamp(28px, 4vw, 52px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

/* ───────── Visualizations ───────── */

/** 01 — Semicircular gauge dial at 74%, with chips below */
function GaugeViz() {
  // Semicircle params
  const cx = 80
  const cy = 78
  const r = 56
  const pct = 0.74
  // Sweep from 180° to 0° (left to right). Filled portion ends at 180 - pct * 180.
  const endAngleDeg = 180 - pct * 180 // = 46.8°
  const endRad = (endAngleDeg * Math.PI) / 180
  const endX = cx + r * Math.cos(endRad)
  const endY = cy - r * Math.sin(endRad)
  // Needle from center to filled-arc end
  return (
    <svg viewBox="0 0 160 100" className="h-[88px] w-[160px]" aria-hidden>
      {/* Background arc */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        stroke={THEME.border}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Filled arc to 74% */}
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${endX} ${endY}`}
        stroke={THEME.accent}
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      {/* Needle */}
      <line x1={cx} y1={cy} x2={endX} y2={endY} stroke={THEME.textPrimary} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="3.5" fill={THEME.textPrimary} />
      {/* Value */}
      <text
        x={cx}
        y={cy - 18}
        textAnchor="middle"
        style={{ fontFamily: THEME.fontMono, fontSize: 24, fontWeight: 700, fill: THEME.textPrimary }}
      >
        74
      </text>
    </svg>
  )
}

function ChipsRow() {
  const chipBase =
    'inline-flex items-center rounded-full px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-[0.12em]'
  return (
    <div className="flex flex-wrap items-center justify-end gap-1.5">
      <span
        className={chipBase}
        style={{
          fontFamily: THEME.fontMono,
          background: `${THEME.accent}1F`,
          color: THEME.primaryDarker,
        }}
      >
        Readiness 74
      </span>
      <span
        className={chipBase}
        style={{ fontFamily: THEME.fontMono, background: '#F4F4F5', color: THEME.textMuted }}
      >
        Load 6.2
      </span>
      <span
        className={chipBase}
        style={{ fontFamily: THEME.fontMono, background: '#F4F4F5', color: THEME.textMuted }}
      >
        Risk low
      </span>
    </div>
  )
}

/** 02 — Sparkline with dip + recovery, peak marker */
function TrajectoryViz() {
  return (
    <svg viewBox="0 0 160 90" className="h-[80px] w-[160px]" aria-hidden>
      {/* Soft fill under curve */}
      <defs>
        <linearGradient id="wsp-traj-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={THEME.accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={THEME.accent} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 10 38 C 28 46, 42 58, 60 60 C 78 62, 92 50, 110 36 C 122 27, 134 22, 146 24 L 146 75 L 10 75 Z"
        fill="url(#wsp-traj-fill)"
      />
      {/* Curve */}
      <path
        d="M 10 38 C 28 46, 42 58, 60 60 C 78 62, 92 50, 110 36 C 122 27, 134 22, 146 24"
        stroke={THEME.accent}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Peak dot at (~146, 24) */}
      <circle cx="146" cy="24" r="4" fill={THEME.accent} />
      <text
        x="142"
        y="14"
        textAnchor="end"
        style={{ fontFamily: THEME.fontMono, fontSize: 7, fontWeight: 700, letterSpacing: '0.16em', fill: THEME.primaryDarker }}
      >
        PEAK FORM
      </text>
      {/* X-axis labels */}
      {[
        { x: 38, label: 'D+7' },
        { x: 80, label: 'D+14' },
        { x: 130, label: 'D+28' },
      ].map((t) => (
        <text
          key={t.label}
          x={t.x}
          y={86}
          textAnchor="middle"
          style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted, letterSpacing: '0.08em' }}
        >
          {t.label}
        </text>
      ))}
    </svg>
  )
}

/** 03 — Two diverging sparklines (BASE vs +SYNTH) with delta callout */
function InterventionViz() {
  return (
    <svg viewBox="0 0 170 95" className="h-[84px] w-[168px]" aria-hidden>
      {/* BASE line — slight downward drift */}
      <text
        x="2"
        y="14"
        style={{ fontFamily: THEME.fontMono, fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', fill: THEME.textMuted }}
      >
        BASE
      </text>
      <path
        d="M 10 36 L 50 38 L 90 44 L 130 52 L 156 56"
        stroke={THEME.textMuted}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        strokeDasharray="3 2"
      />
      {/* +SYNTH line — diverges upward */}
      <path
        d="M 10 36 L 50 32 L 90 24 L 130 16 L 156 12"
        stroke={THEME.accent}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="2"
        y="92"
        style={{ fontFamily: THEME.fontMono, fontSize: 7.5, fontWeight: 700, letterSpacing: '0.14em', fill: THEME.primaryDarker }}
      >
        +SYNTH
      </text>
      {/* Endpoint dots */}
      <circle cx="156" cy="56" r="3" fill={THEME.textMuted} />
      <circle cx="156" cy="12" r="3.5" fill={THEME.accent} />
      {/* Δ callout at the right side, at max divergence */}
      <line x1="156" y1="14" x2="156" y2="54" stroke={THEME.accent} strokeWidth="1" strokeDasharray="2 2" />
      <rect x="118" y="36" width="32" height="13" rx="6" fill={THEME.accent} />
      <text
        x="134"
        y="45"
        textAnchor="middle"
        style={{ fontFamily: THEME.fontMono, fontSize: 8, fontWeight: 700, letterSpacing: '0.04em', fill: '#FFFFFF' }}
      >
        Δ +8.4
      </text>
    </svg>
  )
}

/** 04 — 7 ascending bars from gray to amber to red, with FLAG above bar 7 */
function BreakdownViz() {
  // Each bar: x position, height. Bars start drawing from baseline y=82.
  const baseline = 82
  const barW = 14
  const xs = [8, 30, 52, 74, 96, 118, 140]
  const heights = [10, 16, 22, 30, 40, 54, 68]
  const fills = [
    THEME.border,
    THEME.border,
    THEME.border,
    '#A1A1AA',
    '#A1A1AA',
    THEME.amber,
    THEME.red,
  ]
  return (
    <svg viewBox="0 0 162 96" className="h-[86px] w-[162px]" aria-hidden>
      {/* FLAG label above bar 7 */}
      <text
        x={140 + barW / 2}
        y="8"
        textAnchor="middle"
        style={{ fontFamily: THEME.fontMono, fontSize: 12, fill: THEME.red }}
      >
        ⚠
      </text>
      <text
        x={140 + barW / 2}
        y="20"
        textAnchor="middle"
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 7,
          fontWeight: 700,
          letterSpacing: '0.18em',
          fill: THEME.red,
        }}
      >
        FLAG
      </text>
      {xs.map((x, i) => (
        <rect
          key={i}
          x={x}
          y={baseline - heights[i]}
          width={barW}
          height={heights[i]}
          rx={2}
          fill={fills[i]}
        />
      ))}
      {/* Baseline */}
      <line x1="6" y1={baseline + 0.5} x2="158" y2={baseline + 0.5} stroke={THEME.border} strokeWidth="1" />
    </svg>
  )
}

/* ───────── Card model ───────── */

type Card = {
  num: string
  title: string
  subtitle: string
  bullets: string[]
  viz: 'gauge' | 'trajectory' | 'intervention' | 'breakdown'
}

const CARDS: Card[] = [
  {
    num: '01',
    title: 'Current state',
    subtitle: 'One score. Every athlete. Right now.',
    viz: 'gauge',
    bullets: [
      'Readiness, load, recovery, risk fused into a single number',
      'Updated the moment new data lands from any tool',
      'Color-coded green, yellow, red across the whole roster',
      'Compresses 20+ signals into one glance',
    ],
  },
  {
    num: '02',
    title: 'Predicted trajectory',
    subtitle: '7, 14, 28 days into the future.',
    viz: 'trajectory',
    bullets: [
      "Projects each athlete's readiness curve forward",
      'Built on their personal response history, not generic averages',
      "Flags when they'll hit peak form and when they'll fall off",
      'Coaches plan the next 4 weeks with real visibility',
    ],
  },
  {
    num: '03',
    title: 'Intervention impact',
    subtitle: 'Test the decision before you make it.',
    viz: 'intervention',
    bullets: [
      '"Add a hard Tuesday" → see the predicted readiness drop on Thursday',
      '"Pull volume by 20%" → see the recovery gain on Sunday',
      '"Shift recovery day" → see the impact on race-day readiness',
      'Compare any two paths side-by-side before committing',
    ],
  },
  {
    num: '04',
    title: 'Breakdown probability',
    subtitle: 'Catch it 7 days before it shows up.',
    viz: 'breakdown',
    bullets: [
      'Injury, illness, and overtraining transition probabilities',
      'Surfaced when load, sleep, HRV, and movement start drifting',
      'Confidence interval per athlete, refreshed daily',
      'One alert per athlete per week max — no noise',
    ],
  },
]

function CardViz({ kind }: { kind: Card['viz'] }) {
  if (kind === 'gauge') return <GaugeViz />
  if (kind === 'trajectory') return <TrajectoryViz />
  if (kind === 'intervention') return <InterventionViz />
  return <BreakdownViz />
}

function PredictCard({ card }: { card: Card }) {
  const showChips = card.viz === 'gauge'
  return (
    <div
      className="relative flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{ borderColor: THEME.border, boxShadow: '0 12px 32px rgba(24,24,27,0.08)' }}
    >
      {/* Viz absolutely positioned in the top-right so it doesn't push layout */}
      <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end gap-2">
        <CardViz kind={card.viz} />
        {showChips ? <ChipsRow /> : null}
      </div>

      {/* Header — reserve right padding so title doesn't collide with viz */}
      <div className="pr-[180px]">
        <div
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          {card.num}
        </div>
        <h3
          className="mt-1.5 text-[clamp(22px,2.2vw,28px)] font-bold leading-[1.15] tracking-[-0.02em]"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
        >
          {card.title}
        </h3>
        <p
          className="mt-1 text-[13px] italic leading-snug"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
        >
          {card.subtitle}
        </p>
      </div>

      <ul className="mt-5 flex flex-1 flex-col justify-between gap-4">
        {card.bullets.map((b) => (
          <li
            key={b}
            className="flex items-start gap-2.5 text-[15px] leading-[1.4]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
          >
            <span
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: THEME.textMuted }}
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function WhatSynthPredictsSlide({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '06 · WHAT SYNTH PREDICTS'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          06 · What synth predicts
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Where every athlete is heading, not just where they&apos;ve been.
        </h1>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-5">
          {CARDS.map((c) => (
            <PredictCard key={c.num} card={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

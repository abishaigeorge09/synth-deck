import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

export type Mech = {
  num: string
  name: string
  definition: string
  example: string
  mock: () => JSX.Element
}

/* ─── Bigger UI mockups ─── */

export function MockSmartDefault() {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.18em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Morning check-in
      </div>
      <div className="flex flex-col gap-2">
        <div
          className="flex items-center justify-between rounded-md px-3 py-2"
          style={{ background: `${THEME.accent}1F`, border: `1.5px solid ${THEME.accent}` }}
        >
          <span
            className="text-[13px] font-semibold"
            style={{ fontFamily: THEME.fontSans, color: THEME.primaryDarker }}
          >
            Same as yesterday
          </span>
          <span
            className="text-[9px] font-bold uppercase tracking-[0.16em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker }}
          >
            Selected
          </span>
        </div>
        <div
          className="rounded-md px-3 py-2 text-[12.5px]"
          style={{ background: 'white', border: `1px solid ${THEME.border}`, color: THEME.textMuted }}
        >
          Different today
        </div>
      </div>
    </div>
  )
}

export function MockLoss() {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div className="flex items-center gap-2">
        <span style={{ color: THEME.red, fontSize: 14 }}>⚠</span>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.red }}
        >
          Coach alert
        </span>
      </div>
      <div>
        <div
          className="text-[36px] font-bold leading-none"
          style={{ fontFamily: THEME.fontMono, color: THEME.red }}
        >
          73%
        </div>
        <div
          className="mt-2 text-[13px] leading-tight"
          style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
        >
          Soft-tissue injury risk
          <br />
          within 14 days
        </div>
      </div>
    </div>
  )
}

export function MockSocial() {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Team check-in
      </div>
      <div className="flex items-end gap-2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-6 w-3 rounded-sm"
            style={{ background: THEME.accent, opacity: 0.85 }}
          />
        ))}
      </div>
      <div
        className="text-[13px] leading-tight"
        style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
      >
        <strong style={{ color: THEME.primary }}>12 athletes</strong> logged sleep this week.{' '}
        <strong>You haven&apos;t.</strong>
      </div>
    </div>
  )
}

export function MockProgress() {
  const pts = [38, 42, 35, 46, 40, 54, 50, 60, 55, 68]
  const w = 240
  const h = 80
  const max = Math.max(...pts)
  const min = Math.min(...pts)
  const norm = (v: number) => h - 10 - ((v - min) / (max - min)) * (h - 20)
  const stepX = w / (pts.length - 1)
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * stepX} ${norm(v)}`).join(' ')
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        28-day readiness
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} className="h-[70px] w-full">
        <path d={d} stroke={THEME.accent} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx={w} cy={norm(pts[pts.length - 1])} r="5" fill={THEME.accent} />
      </svg>
      <div className="flex items-center justify-between">
        <span
          className="text-[10px] font-bold uppercase tracking-[0.16em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          Peak day
        </span>
        <span
          className="text-[16px] font-bold"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          68
        </span>
      </div>
    </div>
  )
}

export function MockAnchor() {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Team readiness
      </div>
      <div className="flex items-end gap-4">
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            Last wk
          </div>
          <div
            className="text-[34px] font-bold leading-none tabular-nums"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            68
          </div>
        </div>
        <span
          className="pb-2 text-[28px] font-bold leading-none"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          →
        </span>
        <div>
          <div
            className="text-[10px] font-bold uppercase tracking-[0.14em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
          >
            This wk
          </div>
          <div
            className="text-[34px] font-bold leading-none tabular-nums"
            style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
          >
            74
          </div>
        </div>
      </div>
      <div
        className="inline-flex w-fit items-center rounded-full px-2 py-0.5 text-[11px] font-bold"
        style={{ fontFamily: THEME.fontMono, background: `${THEME.accent}1F`, color: THEME.primaryDarker }}
      >
        +6 Δ
      </div>
    </div>
  )
}

export function MockAntiOverload() {
  return (
    <div
      className="flex h-full w-full flex-col justify-between rounded-lg p-4"
      style={{ background: '#FAFAF9', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        This week&apos;s alerts
      </div>
      <div className="flex flex-col gap-1.5">
        <div
          className="flex items-center gap-2 rounded-md px-3 py-2"
          style={{ background: 'white', border: `1px solid ${THEME.border}` }}
        >
          <span className="text-[12px]" style={{ color: THEME.red }}>
            ●
          </span>
          <span className="text-[13px]" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
            Olivia — low recovery score
          </span>
        </div>
      </div>
      <div
        className="text-[10px] uppercase tracking-[0.14em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        1 alert · 46 athletes silent
      </div>
    </div>
  )
}

export const MECHS: Mech[] = [
  {
    num: '01',
    name: 'Smart defaults',
    definition: "Pre-select the best option so users don't have to choose.",
    example:
      'Weekly wellness check-ins default to "Same as yesterday." 80% of athletes accept the default in under 5 seconds.',
    mock: () => <MockSmartDefault />,
  },
  {
    num: '02',
    name: 'Loss framing',
    definition: 'Frame outcomes in terms of what could go wrong, not what could go right.',
    example:
      "Coach sees a 73% injury-risk warning instead of a generic suggestion to ease tomorrow's session.",
    mock: () => <MockLoss />,
  },
  {
    num: '03',
    name: 'Social proof',
    definition: 'People follow what their peers do.',
    example: "\"12 teammates logged sleep this week. You haven't.\" Drives 2.4× higher check-in completion.",
    mock: () => <MockSocial />,
  },
  {
    num: '04',
    name: 'Progress visualization',
    definition: "Show users where they've been and where they're heading.",
    example:
      'Athlete dashboard shows the 28-day readiness trend with a green peak marker. Endowed progress keeps athletes logging daily.',
    mock: () => <MockProgress />,
  },
  {
    num: '05',
    name: 'Anchoring',
    definition: 'The first number a user sees becomes the reference point.',
    example: '"Last week: 68. This week: 74." The +6 delta drives the decision, not the absolute number.',
    mock: () => <MockAnchor />,
  },
  {
    num: '06',
    name: 'Anti-overload',
    definition: 'Surface one decision at a time, not all the data at once.',
    example:
      'One alert per athlete per week max. Coaches read every flag because every flag matters.',
    mock: () => <MockAntiOverload />,
  },
]

function MechRow({ m }: { m: Mech }) {
  return (
    <div
      className="flex h-full items-stretch overflow-hidden rounded-xl border bg-white"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div className="flex flex-1 flex-col justify-center gap-3 p-6">
        <div
          className="text-[11px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          {m.num} · {m.name}
        </div>
        <p
          className="text-[18px] font-bold leading-snug tracking-[-0.01em]"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
        >
          {m.definition}
        </p>
        <p
          className="text-[14px] leading-[1.5]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          {m.example}
        </p>
      </div>
      <div className="flex w-[300px] shrink-0 items-center justify-center p-4">
        <div className="h-[160px] w-full">{m.mock()}</div>
      </div>
    </div>
  )
}

function BehavioralSlide({
  pageOverride,
  sectionOverride,
  partNum,
  partLabel,
  mechs,
}: NavOverrides & {
  partNum: string
  partLabel: string
  mechs: Mech[]
}) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? partLabel} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {partNum} · Behavioral economics
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Behavioral economics in the product.
        </h1>
        <p
          className="mt-2 max-w-[80rem] text-[14.5px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          synth doesn&apos;t just show data. It nudges athletes and coaches toward better decisions, building
          habit and retention.
        </p>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-1 grid-rows-3 gap-4">
          {mechs.map((m) => (
            <MechRow key={m.num} m={m} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function AppendixBehavioralEconomicsA(props: NavOverrides) {
  return (
    <BehavioralSlide
      {...props}
      partNum="A5a"
      partLabel="A5 · BEHAVIORAL ECONOMICS (1/2)"
      mechs={MECHS.slice(0, 3)}
    />
  )
}

export function AppendixBehavioralEconomicsB(props: NavOverrides) {
  return (
    <BehavioralSlide
      {...props}
      partNum="A5b"
      partLabel="A5 · BEHAVIORAL ECONOMICS (2/2)"
      mechs={MECHS.slice(3)}
    />
  )
}

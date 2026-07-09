import type { ReactNode } from 'react'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'
const CARD = {
  borderColor: THEME.border,
  boxShadow: '0 8px 24px rgba(24,24,27,0.06)',
} as const
const HIGHLIGHT_BG = '#F0FDF4'

type BarRow = { label: string; number: string; pct: number; desc: string; color: string; big?: boolean }

type JobGroup = { number: string; label: string; color: string; roles: string[] }
const JOBS: JobGroup[] = [
  {
    number: '8',
    label: 'Direct · Year 1',
    color: THEME.accent,
    roles: [
      '5 founding engineers, unpaid to salaried',
      '3 new hires within 12 months',
      'All roles based in India',
    ],
  },
  {
    number: '25+',
    label: 'Indirect · Year 1',
    color: THEME.cyan,
    roles: [
      'Content and creative',
      'Legal and compliance',
      'Accounting and finance',
      'Contractors and build support',
      'Infrastructure and tooling',
    ],
  },
]

// Forex values span ₹70L → ₹55Cr (~78×); bars are log-scaled so each year reads clearly.
const logPct = (lakh: number) => {
  const min = Math.log10(10)
  const max = Math.log10(5500)
  return ((Math.log10(lakh) - min) / (max - min)) * 100
}
const FOREX: BarRow[] = [
  {
    label: 'Year 1',
    number: '₹70L',
    pct: logPct(70),
    desc: 'All USD revenue from US, NZ, and Australian customers, repatriated through Elsheph Systems India.',
    color: THEME.blue,
    big: true,
  },
  { label: 'Year 2', number: '₹8.3Cr', pct: logPct(830), desc: '7x return on the grant in foreign currency within 24 months.', color: THEME.purple, big: true },
  { label: 'Year 3', number: '₹55Cr', pct: logPct(5500), desc: 'As the platform scales across collegiate programs internationally.', color: THEME.amber, big: true },
]

const CAPABILITY: { label: string; desc: string }[] = [
  {
    label: 'Commonwealth Games 2030',
    desc: 'Indian athletes and federations gain the same performance intelligence platform used by top US and NZ programs.',
  },
  {
    label: 'Olympics 2036',
    desc: 'Four years of longitudinal data becomes national sports intelligence infrastructure across disciplines.',
  },
  {
    label: 'Industrial expansion',
    desc: 'The same fatigue and performance platform extends to defence, first responders, and industrial operators.',
  },
]

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden className="mt-[1px] shrink-0">
      <circle cx="12" cy="12" r="10" fill={`${THEME.accent}1F`} />
      <path d="M7 12l3 3 7-7" fill="none" stroke={THEME.primary} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Bar({ row }: { row: BarRow }) {
  return (
    <div>
      <div className="grid grid-cols-[86px_1fr_92px] items-center gap-3">
        <span
          className="text-[11px] font-bold uppercase tracking-[0.14em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          {row.label}
        </span>
        <div className="relative h-7">
          <div className="absolute inset-0 rounded-md" style={{ background: `${row.color}1A` }} />
          <div
            className="absolute left-0 top-0 h-7 rounded-md"
            style={{ width: `${row.pct}%`, background: row.color, opacity: 0.9 }}
          />
        </div>
        <span
          className="text-right font-bold tabular-nums leading-none"
          style={{
            fontFamily: THEME.fontMono,
            color: row.color,
            fontSize: row.big ? 'clamp(20px, 2.2vw, 26px)' : 'clamp(18px, 2vw, 22px)',
            letterSpacing: '-0.03em',
          }}
        >
          {row.number}
        </span>
      </div>
      <p
        className="mt-1 pl-[98px] text-[11px] leading-[1.35]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {row.desc}
      </p>
    </div>
  )
}

function Band({
  index,
  pillar,
  sub,
  children,
  divided,
}: {
  index: string
  pillar: string
  sub: string
  children: ReactNode
  divided?: boolean
}) {
  return (
    <div
      className={`grid flex-1 grid-cols-[164px_1fr] items-center gap-6 py-1 ${divided ? 'border-t' : ''}`}
      style={divided ? { borderColor: THEME.border } : undefined}
    >
      <div className="flex flex-col gap-1 self-stretch justify-center border-r pr-6" style={{ borderColor: THEME.border }}>
        <span
          className="text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          {index}
        </span>
        <span
          className="text-[19px] font-bold leading-none tracking-[-0.02em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          {pillar}
        </span>
        <span
          className="text-[11px] leading-[1.35]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          {sub}
        </span>
      </div>
      <div>{children}</div>
    </div>
  )
}

export function S12c_IndiaReturns({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '16 · INDIA RETURNS'} page={pageOverride ?? '17 / 18'} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          India impact
        </div>
        <div className="flex items-baseline justify-between gap-6">
          <h1
            className="mt-2 font-bold leading-[1.05] tracking-[-0.03em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontSize: 32 }}
          >
            What India gets back.
          </h1>
          <p
            className="hidden max-w-[30rem] text-right text-[13px] leading-[1.5] md:block"
            style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
          >
            Every rupee of this grant returns to India as jobs, foreign currency, and national capability.
          </p>
        </div>

        {/* One dense board — three bands, hairline-divided */}
        <div className="mt-4 flex min-h-0 flex-1 flex-col rounded-2xl border bg-white px-6 py-2" style={CARD}>
          <Band index="01" pillar="Jobs" sub="Salaried roles created in India">
            <div className="flex h-full items-center justify-center px-10">
              <div className="flex items-center justify-center gap-x-14">
                {JOBS.map((g) => (
                  <div key={g.label} className="flex items-center gap-5">
                    <div className="flex w-[104px] shrink-0 flex-col items-center text-center">
                      <div
                        className="font-bold tabular-nums leading-none"
                        style={{
                          fontFamily: THEME.fontMono,
                          color: g.color,
                          fontSize: 'clamp(34px, 3.6vw, 48px)',
                          letterSpacing: '-0.04em',
                        }}
                      >
                        {g.number}
                      </div>
                      <div
                        className="mt-2 whitespace-nowrap text-[9.5px] font-bold uppercase tracking-[0.16em]"
                        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                      >
                        {g.label}
                      </div>
                    </div>
                    <ul className="flex flex-col justify-center gap-2 border-l pl-5" style={{ borderColor: THEME.border }}>
                      {g.roles.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-[14px] font-medium leading-[1.3]"
                          style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                        >
                          <span
                            className="mt-[7px] inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ background: g.color }}
                          />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Band>
          <Band index="02" pillar="Forex" sub="USD revenue repatriated home · bars log-scaled" divided>
            <div className="flex flex-col gap-2.5">
              {FOREX.map((r) => (
                <Bar key={r.label} row={r} />
              ))}
            </div>
          </Band>
          <Band index="03" pillar="Capability" sub="What the grant unlocks nationally" divided>
            <div className="grid grid-cols-3 gap-6">
              {CAPABILITY.map((c) => (
                <div key={c.label} className="flex items-start gap-2.5">
                  <IconCheck />
                  <div>
                    <div
                      className="text-[12.5px] font-bold leading-tight"
                      style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                    >
                      {c.label}
                    </div>
                    <p
                      className="mt-1 text-[11px] leading-[1.4]"
                      style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
                    >
                      {c.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Band>
        </div>

        {/* Highlight strip */}
        <div
          className="mt-4 rounded-2xl px-6 py-3.5"
          style={{ background: HIGHLIGHT_BG, borderLeft: `3px solid ${THEME.accent}` }}
        >
          <p className="text-[13.5px] leading-[1.5]" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
            ₹1.2Cr in → ₹70L forex back in Year 1 → ₹8.3Cr by Year 2. The grant pays for itself in foreign currency
            before the runway ends.
          </p>
        </div>

        <div className="mt-2.5 flex justify-end">
          <span
            className="text-[10px] tracking-[0.14em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            © 2026 Synth Sports. All rights reserved.
          </span>
        </div>
      </div>
    </div>
  )
}

import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

function Icon({ name }: { name: 'decision' | 'fatigue' | 'tools' | 'next' }) {
  const common = {
    fill: 'none',
    stroke: THEME.textPrimary,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'decision') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M12 3v6" />
        <path {...common} d="M8 7h8" />
        <path {...common} d="M7 21l5-3 5 3" />
        <path {...common} d="M8 13l2 2 6-6" />
        <path {...common} d="M12 9a7 7 0 0 1 7 7v3H5v-3a7 7 0 0 1 7-7z" opacity="0.55" />
      </svg>
    )
  }
  if (name === 'fatigue') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M12 2v4" />
        <path {...common} d="M12 18v4" />
        <path {...common} d="M4.2 4.2l2.8 2.8" />
        <path {...common} d="M17 17l2.8 2.8" />
        <path {...common} d="M2 12h4" />
        <path {...common} d="M18 12h4" />
        <path {...common} d="M7 7a7 7 0 1 1 10 10" opacity="0.55" />
        <path {...common} d="M9.5 13.5c.8.8 1.9 1.3 3.1 1.3 1 0 2-.3 2.8-1" />
      </svg>
    )
  }
  if (name === 'tools') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4zM13 15h7v5h-7z" />
      </svg>
    )
  }
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
      <path {...common} d="M4 4h16v12H7l-3 3V4z" />
      <path {...common} d="M7.5 9h9" />
      <path {...common} d="M7.5 12h6" />
    </svg>
  )
}

function Row({
  num,
  icon,
  lead,
  highlight,
  rest,
}: {
  num: string
  icon: Parameters<typeof Icon>[0]['name']
  lead: string
  highlight: string
  rest: string
}) {
  return (
    <div className="grid grid-cols-[54px_54px_1fr] items-center gap-6">
      <div className="pt-0.5 text-[12px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        {num}
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white" style={{ borderColor: THEME.border }}>
        <Icon name={icon} />
      </div>
      <div className="min-w-0">
        <p className="text-[26px] leading-[1.12] tracking-[-0.03em]" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
          {lead}{' '}
          <span style={{ color: THEME.primaryDarker, fontWeight: 700 }}>{highlight}</span>
          {rest}
        </p>
      </div>
    </div>
  )
}

export function S02a_ProblemStatements({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '01 · PROBLEM'} page={pageOverride ?? '2 / 13'} tone="light" />

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="mt-6 grid min-h-0 grid-cols-12 gap-8">
          <div className="col-span-6 flex min-h-0 flex-col justify-center pr-2">
            <div className="mb-10">
              <h1 className="text-[46px] font-bold leading-[1.02] tracking-[-0.05em]" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                Problem
              </h1>
            </div>

            <div className="space-y-10">
            <Row
              num="01"
              icon="decision"
              lead="When coaches decide with"
              highlight="incomplete info,"
              rest=" athlete performance drops."
            />
            <Row
              num="02"
              icon="fatigue"
              lead="With"
              highlight="120 athletes"
              rest=" on Cal Rowing, fatigue and recovery are hard to spot early."
            />
            <Row
              icon="next"
              lead="They collect the data, but it still doesn’t tell them"
              highlight="what to do next"
              rest="—fast."
              num="03"
            />
            <Row
              num="04"
              icon="tools"
              lead="Data lives in"
              highlight="8+ tools,"
              rest=" so there’s no single complete view."
            />
            </div>
          </div>

          <div className="col-span-6 flex min-h-0 items-center justify-end">
            <div
              className="h-[640px] w-full max-w-[470px] overflow-hidden rounded-[4px] border bg-white p-0 shadow-[0_24px_60px_rgba(24,24,27,0.12)]"
              style={{ borderColor: `${THEME.border}cc` }}
            >
              <img
                src="/team/calrowing_team.png"
                alt="Cal rowing athletes gathered by the water"
                className="h-full w-full object-cover"
                style={{ objectPosition: '62% center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


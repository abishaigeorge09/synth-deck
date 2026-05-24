import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

function Icon({ name }: { name: 'timeline' | 'predict' | 'custom' | 'scores' }) {
  const common = {
    fill: 'none',
    stroke: THEME.textPrimary,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'timeline') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M3 18h18" />
        <circle cx="6" cy="18" r="2" {...common} fill="white" />
        <circle cx="12" cy="18" r="2" {...common} fill="white" />
        <circle cx="18" cy="18" r="2" {...common} fill="white" />
        <path {...common} d="M6 14V8M12 14V5M18 14v-3" />
      </svg>
    )
  }
  if (name === 'predict') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M3 17l5-6 4 4 6-8 3 4" />
        <circle cx="8" cy="11" r="1.3" fill={THEME.textPrimary} />
        <circle cx="12" cy="15" r="1.3" fill={THEME.textPrimary} />
        <circle cx="18" cy="7" r="1.3" fill={THEME.textPrimary} />
      </svg>
    )
  }
  if (name === 'custom') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4z" />
        <path {...common} d="M16 17h3M17.5 15.5v3" />
      </svg>
    )
  }
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="8" {...common} />
      <path {...common} d="M12 7v5l3 2" />
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
          {lead ? <>{lead}{' '}</> : null}
          <span style={{ color: THEME.primaryDarker, fontWeight: 700 }}>{highlight}</span>
          {rest}
        </p>
      </div>
    </div>
  )
}

export function S03_SolutionOverview({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '02 · SOLUTION'} page={pageOverride ?? '5 / 13'} tone="light" />

      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="mt-6 grid min-h-0 grid-cols-12 gap-8">
          <div className="col-span-6 flex min-h-0 flex-col justify-center pr-2">
            <div className="mb-10">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                The solution
              </div>
              <h1 className="mt-2 text-[46px] font-bold leading-[1.02] tracking-[-0.05em]" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                Solution
              </h1>
            </div>

            <div className="space-y-10">
              <Row
                num="01"
                icon="timeline"
                lead="synth. pulls every source into"
                highlight="one athlete timeline,"
                rest=" so coaches see patterns instead of switching tabs."
              />
              <Row
                num="02"
                icon="predict"
                lead="synth. learns when load, sleep, and recovery"
                highlight="predict injury,"
                rest=" not just track it after the fact."
              />
              <Row
                num="03"
                icon="custom"
                lead="synth. ships"
                highlight="custom tools on your data in 24 hours,"
                rest=" because no two programs run the same way."
              />
              <Row
                num="04"
                icon="scores"
                lead="synth. turns complex data into"
                highlight="simple scores and actions,"
                rest=" so nothing stays buried in spreadsheets."
              />
            </div>
          </div>

          <div className="col-span-6 flex min-h-0 items-center justify-end">
            <div className="h-[640px] w-full max-w-[470px] overflow-hidden">
              <img
                src="/team/teamsolutionvertical.png"
                alt="Solution team visual"
                className="h-full w-full object-contain"
                style={{ objectPosition: 'center center' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


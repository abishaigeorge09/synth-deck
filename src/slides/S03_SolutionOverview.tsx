import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

function Icon({ name }: { name: 'view' | 'fatigue' | 'connect' | 'custom' }) {
  const common = {
    fill: 'none',
    stroke: THEME.textPrimary,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'view') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" />
        <circle {...common} cx="12" cy="12" r="3" />
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
  if (name === 'connect') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M7 7h4v4H7zM13 7h4v4h-4zM7 13h4v4H7zM13 13h4v4h-4z" />
        <path {...common} d="M11 9h2M9 11v2M15 11v2M11 15h2" opacity="0.7" />
      </svg>
    )
  }
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
      <path {...common} d="M12 3l1.6 6.3L20 11l-6.4 1.7L12 19l-1.6-6.3L4 11l6.4-1.7L12 3z" />
      <path {...common} d="M18 18l3 3" opacity="0.7" />
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
                icon="view"
                lead="synth. gives coaches"
                highlight="one complete view"
                rest=" of every athlete, so decisions are made with the full picture."
              />
              <Row
                num="02"
                icon="fatigue"
                lead="synth. helps teams"
                highlight="spot fatigue and recovery early"
                rest=" across large rosters, before performance drops."
              />
              <Row
                num="03"
                icon="connect"
                lead="synth. pulls data from"
                highlight="8+ tools into one system,"
                rest=" so coaches stop working across disconnected platforms."
              />
              <Row
                num="04"
                icon="custom"
                lead="synth. supports"
                highlight="custom tools on the same data layer,"
                rest=" so teams get the exact workflows they need without adding more disconnected software."
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


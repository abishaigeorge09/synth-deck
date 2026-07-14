import { PaperTexture } from '../components/PaperTexture'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string; india?: boolean }

function Icon({ name }: { name: 'tools' | 'shield' | 'sliders' | 'alert' }) {
  const common = {
    fill: 'none',
    stroke: THEME.textPrimary,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'tools') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M4 6h7v7H4zM13 6h7v7h-7zM4 15h7v5H4zM13 15h7v5h-7z" />
      </svg>
    )
  }
  if (name === 'shield') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z" />
        <path {...common} d="M9 12l2 2 4-4" />
      </svg>
    )
  }
  if (name === 'sliders') {
    return (
      <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M4 7h16M4 12h16M4 17h16" />
        <circle {...common} cx="9" cy="7" r="2" fill="white" />
        <circle {...common} cx="15" cy="12" r="2" fill="white" />
        <circle {...common} cx="8" cy="17" r="2" fill="white" />
      </svg>
    )
  }
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
      <path {...common} d="M12 3l10 18H2L12 3z" />
      <path {...common} d="M12 10v5" />
      <circle cx="12" cy="18" r="0.9" fill={THEME.textPrimary} />
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

export function S02a_ProblemStatements({ pageOverride, sectionOverride, india }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
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
              icon="tools"
              lead="Data lives in"
              highlight="8+ disconnected tools,"
              rest={india ? " so no single view tells a coach or SAI centre what's actually happening." : " so no single view tells a coach what's actually happening."}
            />
            <Row
              num="02"
              icon="shield"
              lead="Coaches can't see when to"
              highlight="push or protect"
              rest=" an athlete until fatigue shows up as injury."
            />
            <Row
              num="03"
              icon="sliders"
              lead={india ? 'Every academy, state federation, and national camp runs differently, but the tools are' : 'Every program runs differently, but the tools are'}
              highlight="generic and rigid,"
              rest=" not built for their context."
            />
            <Row
              num="04"
              icon="alert"
              lead=""
              highlight="29% of injuries"
              rest=" come from overtraining, but the warning signs are buried across disconnected systems."
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


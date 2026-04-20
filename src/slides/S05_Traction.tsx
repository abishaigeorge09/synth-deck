import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const CAL_LOGO = '/logos/cal-golden-bears.svg'

const PAD = 'clamp(20px, 3.2vh, 48px) clamp(28px, 3.5vw, 44px) clamp(16px, 2.5vh, 32px)'

const METRICS = [
  { label: 'Athlete users', value: '120', accent: THEME.purple },
  { label: 'Coaches', value: '4', accent: THEME.amber },
] as const

export function S05_Traction({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain"
      style={{ background: THEME.light, padding: PAD }}
    >
      <TopNav section={sectionOverride ?? '04 · TRACTION'} page={pageOverride ?? '6 / 13'} tone="light" />

      <div className="flex min-h-0 flex-1 flex-col items-stretch justify-center">
        <div className="flex min-h-0 w-full max-w-[1100px] flex-col items-center justify-center gap-10 self-center sm:flex-row sm:items-center sm:gap-[clamp(32px,7vw,88px)]">
          <div className="flex shrink-0 flex-col items-center justify-center">
            <img src={CAL_LOGO} alt="Cal" className="h-[clamp(80px,min(18vh,16vw),160px)] w-auto object-contain opacity-95" />
            <div
              className="mt-5 text-center text-[11px] font-semibold tracking-[0.18em] text-zinc-500/80"
              style={{ fontFamily: THEME.fontMono }}
            >
              Ranked #2 &amp; 8th in the U.S.A.
            </div>
          </div>

          <div className="grid w-full min-w-0 max-w-[540px] flex-1 grid-cols-2 justify-items-stretch gap-3 sm:max-w-[600px] sm:gap-4 md:max-w-[680px]">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex min-h-[clamp(118px,22vh,150px)] min-w-0 flex-col items-center justify-center rounded-2xl border bg-white px-5 py-5 text-center sm:px-6 sm:py-6"
                style={{
                  borderColor: THEME.border,
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.9) inset, 0 2px 4px rgba(24,24,27,0.04), 0 12px 36px rgba(24,24,27,0.08)',
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  {metric.label}
                </div>
                <div
                  className="mt-3 text-[clamp(34px,min(9.5vw,8.5vh),52px)] font-bold leading-none tracking-[-0.06em]"
                  style={{ fontFamily: THEME.fontMono, color: metric.accent }}
                >
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(20px, 3.2vh, 48px) clamp(28px, 3.5vw, 44px) clamp(16px, 2.5vh, 32px)'

const CARDS = [
  { label: 'Per athlete', value: 'SCOPED', accent: THEME.purple },
  { label: 'Aggregate', value: 'ANONYMIZED', accent: THEME.amber },
] as const

export function AppendixDataPrivacy({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain"
      style={{ background: THEME.light, padding: PAD }}
    >
      <TopNav section={sectionOverride ?? '08 · DATA & PRIVACY'} page={pageOverride ?? 'APPENDIX  10 / 14'} tone="light" />

      <div className="flex min-h-0 flex-1 flex-col items-stretch justify-center">
        <div className="flex min-h-0 w-full max-w-[1100px] flex-col items-center justify-center gap-10 self-center sm:flex-row sm:items-center sm:gap-[clamp(32px,7vw,88px)]">
          <div className="flex shrink-0 flex-col items-center justify-center">
            <div
              className="text-[clamp(48px,min(11vh,10vw),96px)] font-semibold leading-none tracking-[-0.04em] text-zinc-900"
              style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight }}
            >
              synth<span style={{ color: THEME.logoDotColor }}>.</span>
            </div>
            <div
              className="mt-5 text-center text-[11px] font-semibold tracking-[0.18em] text-zinc-500/80"
              style={{ fontFamily: THEME.fontMono }}
            >
              FERPA-aligned · SOC 2 in progress
            </div>
          </div>

          <div className="grid w-full min-w-0 max-w-[540px] flex-1 grid-cols-2 justify-items-stretch gap-3 sm:max-w-[600px] sm:gap-4 md:max-w-[680px]">
            {CARDS.map((card) => (
              <div
                key={card.label}
                className="flex min-h-[clamp(118px,22vh,150px)] min-w-0 flex-col items-center justify-center rounded-2xl border bg-white px-5 py-5 text-center sm:px-6 sm:py-6"
                style={{
                  borderColor: THEME.border,
                  boxShadow:
                    '0 1px 0 rgba(255,255,255,0.9) inset, 0 2px 4px rgba(24,24,27,0.04), 0 12px 36px rgba(24,24,27,0.08)',
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  {card.label}
                </div>
                <div
                  className="mt-3 text-[clamp(22px,min(5.4vw,5vh),36px)] font-bold leading-none tracking-[-0.04em]"
                  style={{ fontFamily: THEME.fontMono, color: card.accent }}
                >
                  {card.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

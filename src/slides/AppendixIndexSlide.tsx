import { TopNav } from '../components/TopNav'
import { APPENDIX_MAIN_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(20px, 3vw, 36px)'

/** Matches order in `APPENDIX_TAIL_SLIDES` after cover + this index (content slides only). */
export const APPENDIX_CONTENT_INDEX: { title: string; blurb: string }[] = [
  { title: 'Product demo (interactive)', blurb: 'Click into the live demo slide; preview expands and plays in-place.' },
  { title: 'Problem statements', blurb: 'Numbered problem framing with Cal context.' },
  { title: 'Problem everywhere', blurb: 'Rowing + global sports data scope and signals.' },
  { title: 'Solution overview', blurb: 'Four solution statements and team visual.' },
  { title: 'Vision', blurb: 'Long-term synth layer across programs.' },
  { title: 'Close / Our ask', blurb: 'Partners, seed, GTM asks.' },
  { title: 'Business model', blurb: 'Tiers, mix, projections.' },
  { title: 'Setup account', blurb: 'Onboarding and connector selection.' },
  { title: 'Dashboard intro', blurb: 'First look at the coach dashboard.' },
  { title: 'Deploy extension', blurb: 'Agent deployment to the browser.' },
  { title: 'Synth agent workflow', blurb: 'Capture beside existing workflows.' },
  { title: 'Custom tools showcase', blurb: 'Custom tools on the same layer.' },
  { title: 'Connectors', blurb: 'Connect once, scheduled updates.' },
]

export function AppendixIndexSlide({ pageOverride }: { pageOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section="APPENDIX" page={pageOverride ?? `2 / ${APPENDIX_MAIN_TOTAL}`} tone="light" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <h1
          className="text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Appendix index
        </h1>

        <div className="mt-8 min-h-0 flex-1 overflow-y-auto pr-1">
          <ol className="m-0 flex list-none flex-col gap-0 p-0">
            {APPENDIX_CONTENT_INDEX.map((row, i) => (
              <li
                key={row.title}
                className="flex gap-[clamp(12px,2vw,20px)] border-b py-[clamp(14px,2vh,22px)] first:pt-0 last:border-b-0"
                style={{ borderColor: THEME.border }}
              >
                <span
                  className="w-[clamp(2.5rem,4vw,3.25rem)] shrink-0 pt-[0.15em] text-right text-[clamp(18px,2.4vw,26px)] font-bold tabular-nums leading-none"
                  style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[clamp(19px,2.35vw,26px)] font-semibold leading-snug tracking-[-0.02em]"
                    style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                  >
                    {row.title}
                  </div>
                  <div
                    className="mt-1.5 text-[clamp(15px,1.85vw,19px)] leading-[1.45]"
                    style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
                  >
                    {row.blurb}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

import { TopNav } from '../components/TopNav'
import { APPENDIX_MAIN_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(20px, 3vw, 36px)'

/** Matches order in `APPENDIX_TAIL_SLIDES` after cover + this index (content slides only). */
export const APPENDIX_CONTENT_INDEX: { title: string; blurb: string }[] = [
  { title: 'The flywheel', blurb: 'How data, signal, and engagement compound.' },
  { title: 'Revenue projections', blurb: 'Y1 → Y6 model with key drivers.' },
  { title: 'Unit economics', blurb: 'ACV, gross margin, payback, LTV/CAC.' },
  { title: 'Pre-seed budget breakdown', blurb: 'Use of funds across brand, compute, ops.' },
  { title: 'Behavioral economics in the product', blurb: 'Loops we lean on to drive habit + retention.' },
  { title: 'Two-way sync', blurb: 'Synth writes back to source-of-truth systems.' },
  { title: 'Department intelligence', blurb: 'Roll-ups across teams, AD office, program-wide insight.' },
  { title: 'Data & privacy / ethics', blurb: 'Athlete consent, scoping, retention, deletion.' },
  { title: 'Advisors (detailed)', blurb: 'Who we work with and how they help.' },
  { title: 'Pricing tiers detail', blurb: 'Per-tier limits, breakpoints, enterprise.' },
  { title: 'Product architecture', blurb: 'Connectors, agent, store, surfaces.' },
  { title: 'Competitive quadrant (2×2)', blurb: 'Where synth sits vs. point tools and platforms.' },
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

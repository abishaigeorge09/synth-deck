import { TopNav } from '../components/TopNav'
import { APPENDIX_MAIN_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 36px)'

/** Matches order in `APPENDIX_TAIL_SLIDES` after this index (content slides only). */
export const APPENDIX_CONTENT_INDEX: { title: string; blurb: string }[] = [
  { title: 'The flywheel', blurb: 'How data, signal, and engagement compound.' },
  { title: 'Growth model', blurb: 'Y1 → Y6 path to $214M total revenue.' },
  { title: 'Unit economics', blurb: 'Payback under 4 months. Every tier above 3× LTV/CAC.' },
  { title: 'Pre-seed budget breakdown', blurb: 'Use of funds across engineering, growth, ops.' },
  { title: 'India grant budget breakdown', blurb: '₹1.2 Crore raise, every rupee tied to a milestone.' },
  { title: 'Behavioral economics (1/2)', blurb: 'Smart defaults, loss framing, social proof.' },
  { title: 'Behavioral economics (2/2)', blurb: 'Progress visualization, anchoring, anti-overload.' },
  { title: 'Ethics policy', blurb: 'Nine commitments that protect athletes and the company.' },
  { title: 'Department intelligence', blurb: 'Roll-ups across teams, AD office, program-wide insight.' },
  { title: 'Data security & privacy', blurb: "What we're certified for. What we do today." },
  { title: 'Pricing tiers detail', blurb: 'Per-tier limits, breakpoints, enterprise.' },
  { title: 'Product architecture', blurb: 'Connectors, store, prediction engine, surfaces.' },
  { title: 'Competitive quadrant', blurb: 'Where synth sits vs. point tools and platforms.' },
  { title: 'Solution (legacy)', blurb: 'A small door into a massive world — base + synth layers.' },
  { title: 'Connectors (legacy)', blurb: 'Connect once. It updates forever.' },
]

export function AppendixIndexSlide({ pageOverride }: { pageOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section="APPENDIX" page={pageOverride ?? `2 / ${APPENDIX_MAIN_TOTAL}`} tone="light" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col pt-12">
        <h1
          className="text-[clamp(34px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Appendix index
        </h1>

        {/* 2-column grid that fills the slide */}
        <ol
          className="m-0 mt-10 grid min-h-0 flex-1 list-none grid-flow-col grid-cols-2 grid-rows-6 gap-x-14 gap-y-0 p-0"
        >
          {APPENDIX_CONTENT_INDEX.map((row, i) => (
            <li
              key={row.title}
              className="flex gap-5 border-b py-3.5 first:pt-0"
              style={{ borderColor: THEME.border }}
            >
              <span
                className="w-11 shrink-0 pt-[0.18em] text-right text-[19px] font-bold tabular-nums leading-none"
                style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0 flex-1">
                <div
                  className="text-[18px] font-semibold leading-snug tracking-[-0.01em]"
                  style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                >
                  {row.title}
                </div>
                <div
                  className="mt-1 text-[14px] leading-[1.4]"
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
  )
}

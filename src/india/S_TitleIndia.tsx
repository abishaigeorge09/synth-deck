import { PixelArt } from '../components/PixelArt'
import { THEME } from '../lib/theme'

/**
 * India-deck-only variant of S01_Title: light cover with a two-column
 * layout — wordmark + tagline on the left, a card of India-specific
 * context on the right (grant, runway, pipeline, milestone). Replaces
 * the SynthDog mark that S01_Title uses for other decks; that component
 * is untouched.
 */
const FACTS = [
  { label: 'The ask', value: '₹1.2 Cr', note: '12-month runway' },
  { label: 'The pipeline', value: 'SAI · Khelo India', note: 'State federations & national camps' },
  { label: 'The milestone', value: 'Commonwealth 2030', note: 'Positioning locked with target federations' },
]

export function S_TitleIndia() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: THEME.light }}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <PixelArt pattern="cascade-tr" seed={2} color={THEME.accent} opacity={0.12} />
        <PixelArt pattern="cascade-bl" seed={3} color={THEME.accent} opacity={0.08} />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[45%] opacity-[0.12]"
        style={{ background: `radial-gradient(ellipse 80% 60% at 20% -10%, ${THEME.accent} 0%, transparent 62%)` }}
        aria-hidden
      />

      <div className="relative z-10 flex h-full flex-col justify-center gap-14 px-10 sm:px-16 lg:flex-row lg:items-center lg:gap-20 xl:px-24">
        <div className="flex max-w-xl flex-col">
          <h1
            className="text-[clamp(4rem,9vw,6.5rem)] font-bold leading-none"
            style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight, color: THEME.textPrimary }}
          >
            synth<span style={{ color: THEME.accent }}>.</span>
          </h1>
          <p
            className="mt-6 text-[clamp(15px,2vw,19px)] leading-relaxed"
            style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
          >
            {THEME.tagline}
          </p>
          <p
            className="mt-8 text-[clamp(11px,1.4vw,13px)] tracking-[0.18em] uppercase"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            synthsports.co
          </p>
        </div>

        <div
          className="w-full max-w-md shrink-0 rounded-2xl border p-6"
          style={{ borderColor: THEME.border, background: THEME.white, boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}
        >
          {FACTS.map((f, i) => (
            <div
              key={f.label}
              className="flex items-center justify-between gap-4 py-4"
              style={{ borderTop: i === 0 ? undefined : `1px solid ${THEME.border}` }}
            >
              <div>
                <div
                  className="text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  {f.label}
                </div>
                <div
                  className="mt-1 text-[17px] font-bold leading-tight"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
                >
                  {f.value}
                </div>
              </div>
              <div
                className="max-w-[45%] text-right text-[11px] leading-[1.4]"
                style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
              >
                {f.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

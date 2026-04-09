import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const CAL_LOGO = '/logos/cal-golden-bears.svg'

export function S05_Traction() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '48px 52px 40px' }}>
      <TopNav section="04 · TRACTION" page="5 / 13" tone="light" />
      <PaperTexture strength={0.75} tint="rgba(250, 250, 248, 0.97)" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-between gap-8">
        {/* Top: narrative */}
        <header className="shrink-0">
          <SectionLabel text="04 · TRACTION" />
          <div
            className="mt-4 max-w-[920px] text-[34px] font-bold leading-[1.08] sm:text-[38px]"
            style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.055em', color: THEME.textPrimary }}
          >
            Validating at the highest level.
          </div>
          <p
            className="mt-6 max-w-[880px] text-[15px] leading-[1.65]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
          >
            We are still in validation, not a finished scoreboard. Cal Men&apos;s and Women&apos;s Crew share how the product behaves in the wild: roughly{' '}
            <span className="font-medium" style={{ color: THEME.textPrimary }}>
              30 staff
            </span>{' '}
            across both programs and on the order of{' '}
            <span className="font-medium" style={{ color: THEME.textPrimary }}>
              ~60 athletes per roster
            </span>
            . Real sessions, real lineups, and real training data flow in with permission to improve models and deliver the workflows they keep asking for.
            Feedback comes in continuously; what ships next follows what they need.
          </p>
        </header>

        {/* Middle: logo + early signals — uses remaining height */}
        <section className="flex min-h-0 flex-1 flex-col justify-center gap-10 py-4">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
            {/* Cal mark — primary visual weight */}
            <div className="flex flex-col items-center gap-5 lg:col-span-5 lg:items-start">
              <div
                className="flex w-full max-w-[320px] flex-col items-center rounded-2xl border bg-white px-10 py-10 shadow-md lg:max-w-none"
                style={{ borderColor: THEME.border, boxShadow: '0 12px 40px rgba(0,0,0,0.07)' }}
              >
                <img src={CAL_LOGO} alt="California Golden Bears" className="h-[112px] w-auto sm:h-[128px]" />
              </div>
              <div className="text-center lg:text-left">
                <div className="text-[16px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                  Cal Rowing · UC Berkeley
                </div>
                <div className="mt-1.5 text-[12px] tracking-wide text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
                  Pilot program
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400"
                style={{ fontFamily: THEME.fontMono }}
              >
                What surfaced early
              </div>
              <ul className="mt-5 space-y-5 text-left text-[14px] leading-[1.6] text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" aria-hidden />
                  <span>
                    Pulling together dispersed signals, who&apos;s up, how pieces are moving, port vs. starboard preferences, academy load, race splits,
                    without living in spreadsheets and stopwatches.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" aria-hidden />
                  <span>
                    Strong response to a clear fatigue read, one place to synthesize data, publishable lineups, and quick visibility into who&apos;s trending up
                    or down.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Coach voice — quiet, no rule / no green accent */}
        <footer className="shrink-0 border-t border-zinc-200/90 pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Coach feedback
          </p>
          <p
            className="mt-3 max-w-[880px] text-[14px] leading-[1.65] text-zinc-500"
            style={{ fontFamily: THEME.fontSerif, fontStyle: 'italic' }}
          >
            &ldquo;She loved the fatigue feature; it helps make sense of how athletes are performing and how they&apos;re feeling day to day.&rdquo;
          </p>
          <p className="mt-3 text-[12px] text-zinc-400" style={{ fontFamily: THEME.fontSans }}>
            <span className="text-zinc-500">[Coach name]</span>
            <span className="mx-2 text-zinc-300">·</span>
            <span className="italic text-zinc-400">Placeholder · name to confirm</span>
          </p>
        </footer>
      </div>
    </div>
  )
}

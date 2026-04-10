import { SimpleSlide } from '../components/SimpleSlide'
import { IllustSolutionLayers } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S03_Solution() {
  return (
    <SimpleSlide
      section="02 · SOLUTION"
      page="3 / 13"
      tone="light"
      illustration={<IllustSolutionLayers />}
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          A small door into a massive world.
        </h1>
      }
      features={
        <div
          className="rounded-xl border px-4 py-3.5 sm:px-5 sm:py-4"
          style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.75)' }}
        >
          <p
            className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-400"
            style={{ fontFamily: THEME.fontMono }}
          >
            Features
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="text-left">
              <div className="text-[11px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker }}>
                synth agent
              </div>
              <p className="mt-1.5 text-[12px] leading-[1.5] text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
                Connects to your tools and scrapes data on a schedule — nothing to copy by hand.
              </p>
            </div>
            <div className="text-left">
              <div className="text-[11px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.cyan }}>
                synth extension
              </div>
              <p className="mt-1.5 text-[12px] leading-[1.5] text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
                Works in the browser where staff already live — capture and pull without another login wall.
              </p>
            </div>
          </div>
        </div>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          One roster view on top: base app for day-to-day capture and publish, synth layer underneath doing the heavy sync.
        </p>
      }
    />
  )
}

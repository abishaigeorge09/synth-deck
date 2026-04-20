import { PixelArt } from '../components/PixelArt'
import { THEME } from '../lib/theme'

/** Cover: pixel texture + brand mark image + wordmark + tagline */
export function S01_Title() {
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: THEME.primary }}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <PixelArt pattern="cascade-tr" seed={2} color="#000000" opacity={0.1} />
        <PixelArt pattern="cascade-bl" seed={3} color="#000000" opacity={0.08} />
      </div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center gap-10 px-6 sm:px-10 lg:flex-row lg:gap-14 xl:gap-20">
        <div className="shrink-0 rounded-3xl bg-white p-7 shadow-[0_24px_60px_rgba(0,0,0,0.25)] sm:p-9">
          <img
            src="/logos/synth-icon-green.svg"
            alt=""
            className="h-20 w-20 sm:h-28 sm:w-28"
            width={112}
            height={112}
          />
        </div>
        <div className="max-w-xl text-center lg:text-left">
          <h1
            className="text-[clamp(3rem,10vw,4.75rem)] font-bold leading-none text-white"
            style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight }}
          >
            synth<span style={{ color: THEME.logoDotColor }}>.</span>
          </h1>
          <p
            className="mt-8 text-[clamp(15px,2.4vw,18px)] leading-relaxed text-white/90"
            style={{ fontFamily: THEME.fontSans }}
          >
            {THEME.tagline}
          </p>
        </div>
      </div>
    </div>
  )
}

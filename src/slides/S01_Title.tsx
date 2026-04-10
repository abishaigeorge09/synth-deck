import { THEME } from '../lib/theme'

/** Title only: wordmark + one line. No animation — advance when ready. */
export function S01_Title() {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      style={{ background: THEME.primary }}
    >
      <h1
        className="text-center text-[clamp(3.25rem,11vw,5rem)] font-bold leading-none text-white"
        style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight }}
      >
        synth<span style={{ color: THEME.logoDotColor }}>.</span>
      </h1>
      <p
        className="mt-10 max-w-[22rem] text-center text-[clamp(15px,2.4vw,18px)] leading-relaxed text-white/90"
        style={{ fontFamily: THEME.fontSans }}
      >
        {THEME.tagline}
      </p>
    </div>
  )
}

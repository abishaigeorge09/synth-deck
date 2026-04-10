import { SimpleSlide } from '../components/SimpleSlide'
import { THEME } from '../lib/theme'

export function S11_Vision() {
  return (
    <SimpleSlide
      section="VISION"
      page="11 / 13"
      tone="light"
      primary={
        <h1
          className="text-[clamp(24px,3.8vw,38px)] font-bold leading-[1.12] tracking-[-0.04em] uppercase"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Custom base apps.
          <br />
          One synth layer.
          <br />
          <span style={{ color: THEME.primaryDarker }}>Every program.</span>
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Read everything. Replace nothing. Same engine — rowing now, more sports next, enterprise when you&apos;re ready.
        </p>
      }
    />
  )
}

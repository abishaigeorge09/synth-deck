import { SimpleSlide } from '../components/SimpleSlide'
import { THEME } from '../lib/theme'

export function S07_Market() {
  return (
    <SimpleSlide
      section="06 · MARKET"
      page="7 / 13"
      tone="dark"
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,42px)] font-bold leading-[1.08] tracking-[-0.04em] text-white"
          style={{ fontFamily: THEME.fontMono }}
        >
          Start with rowing. Scale to every sport.
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55] text-white/65" style={{ fontFamily: THEME.fontSans }}>
          One synthesis engine — wedge in rowing (~$24M SOM US collegiate), then fork sport-by-sport.
        </p>
      }
    />
  )
}

import { SimpleSlide } from '../components/SimpleSlide'
import { IllustThreePillars } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S12_Close() {
  return (
    <SimpleSlide
      section="CLOSE"
      page="12 / 13"
      tone="light"
      illustration={<IllustThreePillars />}
      primary={
        <h1
          className="text-[clamp(28px,4.5vw,36px)] font-bold tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Our ask
        </h1>
      }
      secondary={
        <p className="text-[clamp(15px,2.1vw,18px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Partners &amp; pilots · $100k seed · Introductions across collegiate athletics &amp; AD offices.
        </p>
      }
    />
  )
}

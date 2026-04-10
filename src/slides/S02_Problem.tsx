import { SimpleSlide } from '../components/SimpleSlide'
import { THEME } from '../lib/theme'

export function S02_Problem() {
  return (
    <SimpleSlide
      section="01 · PROBLEM"
      page="2 / 13"
      tone="light"
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Coaches are drowning in dispersed data.
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Half an hour a day copying between apps — ergs, strength, schedule, recovery — and still no single picture of the athlete.
        </p>
      }
    />
  )
}

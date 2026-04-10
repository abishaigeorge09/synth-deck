import { SimpleSlide } from '../components/SimpleSlide'
import { THEME } from '../lib/theme'

export function S06_WhyNow() {
  return (
    <SimpleSlide
      section="05 · WHY NOW"
      page="6 / 13"
      tone="light"
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Why now?
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Programs already run six to eight systems — the bottleneck isn&apos;t features, it&apos;s integration. Budgets are up; insight is still fragmented.
        </p>
      }
    />
  )
}

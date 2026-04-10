import { SimpleSlide } from '../components/SimpleSlide'
import { IllustTierStairs } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S08_BusinessModel() {
  return (
    <SimpleSlide
      section="07 · BUSINESS MODEL"
      page="8 / 13"
      tone="light"
      illustration={<IllustTierStairs />}
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Flat tiers. Simple to buy. Natural to upgrade.
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          Starter → Pro → Elite → Enterprise — proof in daily use, then more connectors, automation, and full-athletics rollout.
        </p>
      }
    />
  )
}

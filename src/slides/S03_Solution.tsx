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
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          A thin base app for capture and publish — plus a synth layer that unifies every source into one roster view.
        </p>
      }
    />
  )
}

import { SimpleSlide } from '../components/SimpleSlide'
import { IllustCompetitionMatrix } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S09_Competition() {
  return (
    <SimpleSlide
      section="08 · COMPETITION"
      page="9 / 13"
      tone="dark"
      illustration={<IllustCompetitionMatrix />}
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,44px)] font-bold leading-[1.05] tracking-[-0.04em] text-white"
          style={{ fontFamily: THEME.fontMono }}
        >
          No one connects it all.
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55] text-white/65" style={{ fontFamily: THEME.fontSans }}>
          Point tools do one job each. The real incumbent is Sheets and group chat — synth. is sport-specific synthesis with connectors, one view, and automation.
        </p>
      }
    />
  )
}

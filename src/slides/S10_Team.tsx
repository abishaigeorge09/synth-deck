import { SimpleSlide } from '../components/SimpleSlide'
import { IllustTeamAvatars } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S10_Team() {
  return (
    <SimpleSlide
      section="09 · TEAM"
      page="10 / 13"
      tone="dark"
      illustration={<IllustTeamAvatars />}
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em] text-white"
          style={{ fontFamily: THEME.fontMono }}
        >
          We lived the problem.
        </h1>
      }
      secondary={
        <p className="text-[clamp(14px,2vw,17px)] leading-[1.55] text-white/65" style={{ fontFamily: THEME.fontSans }}>
          Abishai · Star · Lily · Matthew — Cal Rowing, international medals, and operators who&apos;ve felt the chaos firsthand.
        </p>
      }
    />
  )
}

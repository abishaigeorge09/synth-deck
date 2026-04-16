import { SimpleSlide } from '../components/SimpleSlide'
import { IllustMarketRings } from '../components/simpleIllustrations'
import { THEME } from '../lib/theme'

export function S07_Market({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <SimpleSlide
      section={sectionOverride ?? '06 · MARKET'}
      page={pageOverride ?? '7 / 13'}
      tone="dark"
      illustration={<IllustMarketRings />}
      primary={
        <h1
          className="text-[clamp(26px,4.2vw,40px)] font-bold leading-[1.08] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.white }}
        >
          Start with rowing. Scale to every sport.
        </h1>
      }
      secondary={
        <div
          className="space-y-4 text-[clamp(14px,2vw,17px)] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: 'rgba(255,255,255,0.72)' }}
        >
          <p>
            Start with rowing, prove the synthesis workflow, then expand into every program dealing with fragmented athlete data and disconnected operations.
          </p>
          <div className="space-y-2.5 text-left text-[clamp(13px,1.85vw,16px)]">
            <p>
              <span className="font-semibold text-white/90" style={{ fontFamily: THEME.fontMono }}>
                TAM · $4.2B+
              </span>{' '}
              — Global programs juggling fragmented performance stacks.
            </p>
            <p>
              <span className="font-semibold text-white/90" style={{ fontFamily: THEME.fontMono }}>
                SAM · $890M
              </span>{' '}
              — US collegiate programs running fragmented performance, operations, and athlete-data workflows.
            </p>
            <p>
              <span className="font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.primaryLight }}>
                SOM · $24M
              </span>{' '}
              — US collegiate rowing: high pain, no direct competitor.
            </p>
          </div>
        </div>
      }
    />
  )
}

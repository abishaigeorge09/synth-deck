import { SolutionInteractiveStack } from '../components/SolutionInteractiveStack'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

/**
 * Solution: stacked “mini websites” — base app (ROW IQ) → problem gaps;
 * tool thumbs (slide 2) → synth layer (dashboard) + synth agent.
 */
export function S03_Solution() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: THEME.light,
        padding: 'clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 48px) clamp(20px, 3.5vw, 32px)',
      }}
    >
      <TopNav section="02 · SOLUTION" page="3 / 13" tone="light" />

      <h1
        className="shrink-0 text-[clamp(22px,3.4vw,34px)] font-bold leading-[1.08] tracking-[-0.04em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
      >
        A small door into a massive world.
      </h1>
      <p className="mt-1 max-w-[52rem] text-[11px] leading-snug text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
        Base app: a new surface for lineups and boats. Synth layer + agent: ingest the scattered tools from the last slide into one roster view.
      </p>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin]">
        <SolutionInteractiveStack />
      </div>
    </div>
  )
}

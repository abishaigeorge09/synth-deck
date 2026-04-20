import { THEME } from '../lib/theme'

/** Matches main slide horizontal padding so brand/titles align with body copy. */
const GUTTER_X = 'clamp(24px, 4vw, 56px)'

export function TopNav({
  brand = THEME.name,
  deckName = THEME.deckName,
  year = THEME.year,
  section,
  page,
  tone = 'dark',
  omitBrand = false,
}: {
  brand?: string
  deckName?: string
  year?: string
  section: string
  page: string
  tone?: 'dark' | 'light'
  /** When true, the left brand column is hidden (e.g. title slide shows an animated logo in the corner). */
  omitBrand?: boolean
}) {
  const textClass = tone === 'light' ? 'text-zinc-600/90' : 'text-white/70'
  const shadow = tone === 'dark' ? '0 1px 14px rgba(0,0,0,0.35)' : 'none'
  const strong = tone === 'light' ? 'text-zinc-900/95' : 'text-white/95'

  return (
    <div
      className="pointer-events-none absolute left-0 top-0 z-40 w-full max-w-full pb-1 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:pt-7"
      style={{
        fontFamily: THEME.fontMono,
        paddingLeft: GUTTER_X,
        paddingRight: GUTTER_X,
      }}
    >
      <div
        className={`grid w-full grid-cols-3 items-baseline gap-x-2 text-[9px] tracking-[0.12em] sm:gap-x-4 sm:text-[11px] sm:tracking-[0.16em] ${textClass} uppercase`}
        style={{ textShadow: shadow }}
      >
        <div className={`min-w-0 justify-self-start font-semibold tracking-[0.18em] ${strong}`} style={{ textShadow: shadow }}>
          {omitBrand ? null : brand}
        </div>
        <div className="flex min-w-0 items-baseline justify-center gap-x-2 sm:gap-x-3">
          <span className="truncate">{deckName}</span>
          <span className="shrink-0 opacity-40" aria-hidden>
            ·
          </span>
          <span className="shrink-0 opacity-85">{year}</span>
        </div>
        <div className="flex min-w-0 items-baseline justify-end gap-x-3 sm:gap-x-5">
          <span className="truncate text-right">{section}</span>
          <span className="shrink-0 tabular-nums">{page}</span>
        </div>
      </div>
    </div>
  )
}

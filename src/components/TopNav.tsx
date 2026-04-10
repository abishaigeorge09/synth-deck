import { THEME } from '../lib/theme'

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
  const textClass = tone === 'light' ? 'text-black/45' : 'text-white/55'
  return (
    <div
      className="absolute left-0 top-0 z-40 w-full max-w-full pointer-events-none px-4 pt-[max(0.75rem,env(safe-area-inset-top,0px))] sm:px-10 sm:pt-7"
      style={{ fontFamily: THEME.fontMono }}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-x-1 gap-y-1 text-[9px] tracking-[0.1em] sm:gap-x-0 sm:gap-y-0 sm:text-[11px] sm:tracking-[0.15em] uppercase ${textClass}`}
      >
        {omitBrand ? null : <div>{brand}</div>}
        <div>{deckName}</div>
        <div>{year}</div>
        <div>{section}</div>
        <div>{page}</div>
      </div>
    </div>
  )
}


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
      className="absolute left-0 top-0 w-full px-10 pt-7 z-40 pointer-events-none"
      style={{ fontFamily: THEME.fontMono }}
    >
      <div className={`flex items-center justify-between text-[11px] tracking-[0.15em] uppercase ${textClass}`}>
        {omitBrand ? null : <div>{brand}</div>}
        <div>{deckName}</div>
        <div>{year}</div>
        <div>{section}</div>
        <div>{page}</div>
      </div>
    </div>
  )
}


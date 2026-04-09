import { THEME } from '../lib/theme'

export function TierCard({
  name,
  price,
  features,
  accent = THEME.accent,
  offset = 0,
}: {
  name: string
  price: string
  features: string[]
  accent?: string
  /** Vertical stagger in px; prefer `0` for a flat row. */
  offset?: number
}) {
  return (
    <div
      className="rounded-xl border p-6"
      style={{
        borderColor: THEME.border,
        background: '#ffffff',
        ...(offset !== 0 ? { transform: `translateY(${offset}px)` } : {}),
        boxShadow: '0 18px 35px rgba(0,0,0,0.06)',
      }}
    >
      <div
        className="text-[11px] tracking-[0.16em] uppercase font-semibold"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {name}
      </div>
      <div className="mt-3 text-[34px] leading-none" style={{ fontFamily: THEME.fontMono, fontWeight: 700, color: accent }}>
        {price}
      </div>
      <div className="mt-5 flex flex-col gap-2">
        {features.map((f) => (
          <div key={f} className="text-[13px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            <span style={{ color: accent, marginRight: 8 }}>✓</span>
            {f}
          </div>
        ))}
      </div>
    </div>
  )
}


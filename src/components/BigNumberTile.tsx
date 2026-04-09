import { THEME } from '../lib/theme'

export function BigNumberTile({
  value,
  label,
  accent = THEME.accent,
  tone = 'dark',
}: {
  value: string
  label: string
  accent?: string
  tone?: 'light' | 'dark'
}) {
  const isLight = tone === 'light'
  return (
    <div
      className="rounded-xl border px-6 py-5"
      style={{
        borderColor: isLight ? THEME.border : 'rgba(255,255,255,0.14)',
        background: isLight ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.06)',
        boxShadow: isLight ? '0 18px 35px rgba(0,0,0,0.06)' : undefined,
      }}
    >
      <div
        className="text-[54px] leading-none"
        style={{
          fontFamily: THEME.fontMono,
          fontWeight: 800,
          letterSpacing: '-0.06em',
          color: accent,
        }}
      >
        {value}
      </div>
      <div
        className="mt-2 text-[13px] leading-[1.4]"
        style={{ fontFamily: THEME.fontSans, color: isLight ? THEME.textSecondary : 'rgba(255,255,255,0.72)' }}
      >
        {label}
      </div>
    </div>
  )
}


import { THEME } from '../lib/theme'

export function CalloutStrip({
  label,
  text,
  tone = 'light',
}: {
  label: string
  text: string
  tone?: 'light' | 'dark'
}) {
  const isLight = tone === 'light'
  return (
    <div
      className="rounded-xl border px-6 py-4"
      style={{
        borderColor: isLight ? THEME.border : 'rgba(255,255,255,0.14)',
        background: isLight ? 'rgba(255,255,255,0.82)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="text-[11px] tracking-[0.16em] uppercase"
        style={{ fontFamily: THEME.fontMono, color: isLight ? THEME.textMuted : 'rgba(255,255,255,0.55)' }}
      >
        {label}
      </div>
      <div
        className="mt-2 text-[14px] leading-[1.55]"
        style={{ fontFamily: THEME.fontSans, color: isLight ? THEME.textSecondary : 'rgba(255,255,255,0.80)' }}
      >
        {text}
      </div>
    </div>
  )
}


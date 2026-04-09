import { THEME } from '../lib/theme'

type IconKind = 'sheet' | 'web' | 'csv' | 'cloud' | 'spark'

function Glyph({ kind }: { kind: IconKind }) {
  const common = { stroke: 'currentColor', strokeWidth: 2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (kind) {
    case 'sheet':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 3h7l3 3v15H7z" />
          <path {...common} d="M14 3v6h6" />
          <path {...common} d="M9 12h6M9 16h6" />
        </svg>
      )
    case 'web':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
          <path {...common} d="M3 12h18" />
          <path {...common} d="M12 3c3 3.5 3 14 0 18" />
        </svg>
      )
    case 'csv':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 3h10v18H7z" />
          <path {...common} d="M9 7h6M9 11h6M9 15h6" />
        </svg>
      )
    case 'cloud':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 18h10a4 4 0 0 0 .7-7.94A5 5 0 0 0 8.3 8.6 4 4 0 0 0 7 18Z" />
        </svg>
      )
    case 'spark':
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 2l1.6 5.4L19 9l-5.4 1.6L12 16l-1.6-5.4L5 9l5.4-1.6Z" />
        </svg>
      )
  }
}

export function IconRow({
  tone = 'light',
  items,
}: {
  tone?: 'light' | 'dark'
  items: Array<{ kind: IconKind; label: string; accent?: string }>
}) {
  const isLight = tone === 'light'
  return (
    <div className="grid grid-cols-5 gap-3">
      {items.map((it) => {
        const accent = it.accent ?? (isLight ? THEME.primary : THEME.accent)
        return (
          <div
            key={it.label}
            className="rounded-xl border px-4 py-4"
            style={{
              borderColor: isLight ? THEME.border : 'rgba(255,255,255,0.14)',
              background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.06)',
            }}
          >
            <div style={{ color: accent }}>
              <Glyph kind={it.kind} />
            </div>
            <div
              className="mt-3 text-[12px] leading-[1.35]"
              style={{ fontFamily: THEME.fontSans, color: isLight ? THEME.textSecondary : 'rgba(255,255,255,0.72)' }}
            >
              {it.label}
            </div>
          </div>
        )
      })}
    </div>
  )
}


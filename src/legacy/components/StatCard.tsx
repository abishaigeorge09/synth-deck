import { THEME } from '../lib/theme'

export function StatCard({
  value,
  label,
  color = THEME.accent,
}: {
  value: string
  label: string
  color?: string
}) {
  return (
    <div
      className="rounded-lg p-5"
      style={{
        background: THEME.dark,
        borderLeft: `5px solid ${color}`,
        boxShadow: '0 10px 20px rgba(0,0,0,0.25)',
      }}
    >
      <div
        className="text-[42px] leading-none"
        style={{ fontFamily: THEME.fontMono, fontWeight: 700, color: '#fff' }}
      >
        {value}
      </div>
      <div className="mt-2 text-white/70 text-[13px]" style={{ fontFamily: THEME.fontSans }}>
        {label}
      </div>
    </div>
  )
}


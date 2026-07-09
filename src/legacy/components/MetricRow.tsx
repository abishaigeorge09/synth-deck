import { THEME } from '../lib/theme'

export function MetricRow({
  value,
  text,
  color = THEME.accent,
}: {
  value: string
  text: string
  color?: string
}) {
  return (
    <div className="flex items-baseline gap-4">
      <div
        className="text-[32px] leading-none"
        style={{ fontFamily: THEME.fontMono, fontWeight: 700, color }}
      >
        {value}
      </div>
      <div className="text-white/80 text-[15px]" style={{ fontFamily: THEME.fontSans }}>
        {text}
      </div>
    </div>
  )
}


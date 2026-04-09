import { THEME } from '../lib/theme'

export function DashedRule({ color = THEME.border }: { color?: string }) {
  return (
    <div
      className="w-full border-t-2 border-dashed"
      style={{ borderColor: color, opacity: 0.5 }}
    />
  )
}


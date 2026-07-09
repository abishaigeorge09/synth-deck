import { THEME } from '../lib/theme'

export function SectionLabel({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div
      className={`mt-5 text-[11px] tracking-[0.16em] uppercase font-semibold ${className}`}
      style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
    >
      {text}
    </div>
  )
}


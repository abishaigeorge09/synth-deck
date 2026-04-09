import { THEME } from '../lib/theme'

export function Tagline({ text = THEME.tagline }: { text?: string }) {
  return (
    <div
      className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[14px] text-white/70 italic"
      style={{ fontFamily: THEME.fontSerif }}
    >
      {text}
    </div>
  )
}


import { THEME } from '../lib/theme'

export function TeamCard({
  name,
  role,
  accent = THEME.accent,
}: {
  name: string
  role: string
  accent?: string
}) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase()

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: THEME.dark, border: '1px solid rgba(255,255,255,0.10)' }}
    >
      <div className="flex items-center gap-4">
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center"
          style={{ background: `${accent}22`, color: accent, fontFamily: THEME.fontMono, fontWeight: 700 }}
        >
          {initials}
        </div>
        <div>
          <div className="text-[18px] text-white" style={{ fontFamily: THEME.fontSerif, fontWeight: 700 }}>
            {name}
          </div>
          <div className="text-[13px] text-white/70" style={{ fontFamily: THEME.fontSans }}>
            {role}
          </div>
        </div>
      </div>
    </div>
  )
}


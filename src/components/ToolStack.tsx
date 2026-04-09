import { THEME } from '../lib/theme'

const TOOLS = [
  { name: 'Google Sheets', color: '#34A853' },
  { name: 'Bridge', color: '#3B82F6' },
  { name: 'TeamWorks', color: '#F59E0B' },
  { name: 'Stopwatch', color: '#A1A1AA' },
  { name: 'Notes', color: '#8B5CF6' },
  { name: 'Group Chat', color: '#06B6D4' },
] as const

/** Plain list: colored dots only — no card chrome. */
export function ToolStack({ title = 'Typical coach stack' }: { title?: string }) {
  return (
    <div>
      <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-zinc-600" style={{ fontFamily: THEME.fontMono }}>
        {title}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2.5">
        {TOOLS.map((t) => (
          <div key={t.name} className="flex items-center gap-2.5">
            <div className="h-2 w-2 shrink-0 rounded-sm" style={{ background: t.color }} aria-hidden />
            <span className="text-[14px] text-zinc-800" style={{ fontFamily: THEME.fontSans }}>
              {t.name}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[13px] leading-relaxed text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
        Every program uses a different mix · the workflow stays the same.
      </p>
    </div>
  )
}

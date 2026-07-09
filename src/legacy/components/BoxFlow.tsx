import { THEME } from '../lib/theme'

function FlowBox({
  title,
  color,
  borderColor,
  background,
  labelColor,
  textColor,
}: {
  title: string
  color: string
  borderColor: string
  background: string
  labelColor: string
  textColor: string
}) {
  const desc =
    title === 'Connect'
      ? 'One-time setup'
      : title === 'Scrape'
        ? 'Cloud schedule'
        : title === 'Synthesize'
          ? 'Normalize + join'
          : 'Coach opens app'

  return (
    <div className="rounded-xl border px-4 py-3" style={{ borderColor, background }}>
      <div
        className="text-[11px] tracking-[0.16em] uppercase"
        style={{ fontFamily: THEME.fontMono, color: labelColor }}
      >
        {title}
      </div>
      <div className="mt-1 text-[13px]" style={{ fontFamily: THEME.fontSans, color: textColor }}>
        <span style={{ color, fontFamily: THEME.fontMono, fontWeight: 700 }}>■</span> {desc}
      </div>
    </div>
  )
}

export function BoxFlow({
  title = 'Synthesis loop',
  tone = 'light',
}: {
  title?: string
  tone?: 'light' | 'dark'
}) {
  const isLight = tone === 'light'
  const border = isLight ? THEME.border : 'rgba(255,255,255,0.14)'
  const bg = isLight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.06)'
  const text = isLight ? THEME.textSecondary : 'rgba(255,255,255,0.75)'
  const label = isLight ? THEME.textMuted : 'rgba(255,255,255,0.55)'

  return (
    <div className="rounded-xl border p-5" style={{ borderColor: border, background: bg }}>
      <div className="text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: label }}>
        {title}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 items-center">
        <FlowBox title="Connect" color={THEME.primary} borderColor={border} background={bg} labelColor={label} textColor={text} />
        <div className="text-center" style={{ fontFamily: THEME.fontMono, color: label }}>
          →
        </div>
        <FlowBox title="Scrape" color={THEME.cyan} borderColor={border} background={bg} labelColor={label} textColor={text} />
        <div className="text-center" style={{ fontFamily: THEME.fontMono, color: label }}>
          →
        </div>
        <FlowBox title="Synthesize" color={THEME.purple} borderColor={border} background={bg} labelColor={label} textColor={text} />
        <div className="text-center" style={{ fontFamily: THEME.fontMono, color: label }}>
          →
        </div>
        <FlowBox title="Wake up" color={THEME.amber} borderColor={border} background={bg} labelColor={label} textColor={text} />
        <div className="col-span-2 mt-2 text-[12px]" style={{ fontFamily: THEME.fontSans, color: label }}>
          The coach doesn’t “upload” · synth updates in the cloud before they open the app.
        </div>
      </div>
    </div>
  )
}


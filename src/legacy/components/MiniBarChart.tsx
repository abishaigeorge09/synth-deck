import { motion } from 'framer-motion'
import { THEME } from '../lib/theme'
import { TRANSITIONS } from '../lib/motion'

export function MiniBarChart({
  title,
  series,
  tone = 'dark',
}: {
  title: string
  series: Array<{ label: string; value: number; color?: string }>
  tone?: 'light' | 'dark'
}) {
  const max = Math.max(...series.map((s) => s.value), 1)
  const isLight = tone === 'light'
  return (
    <div
      className="rounded-xl border p-5"
      style={{
        borderColor: isLight ? THEME.border : 'rgba(255,255,255,0.14)',
        background: isLight ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.06)',
      }}
    >
      <div
        className="text-[11px] tracking-[0.16em] uppercase"
        style={{ fontFamily: THEME.fontMono, color: isLight ? THEME.textMuted : 'rgba(255,255,255,0.55)' }}
      >
        {title}
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {series.map((s) => {
          const pct = Math.round((s.value / max) * 100)
          const color = s.color ?? (isLight ? THEME.primary : THEME.accent)
          return (
            <div key={s.label} className="flex items-center gap-3">
              <div className="w-24 text-[12px]" style={{ fontFamily: THEME.fontSans, color: isLight ? THEME.textSecondary : 'rgba(255,255,255,0.70)' }}>
                {s.label}
              </div>
              <div className="flex-1 h-[10px] rounded bg-black/10 overflow-hidden" style={{ background: isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.10)' }}>
                <motion.div
                  className="h-full rounded"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ ...TRANSITIONS.smooth, delay: 0.05 }}
                  style={{ background: color }}
                />
              </div>
              <div className="w-12 text-right text-[12px]" style={{ fontFamily: THEME.fontMono, color: isLight ? THEME.textMuted : 'rgba(255,255,255,0.55)' }}>
                {s.value}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}


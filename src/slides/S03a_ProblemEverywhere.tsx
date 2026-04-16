import { motion } from 'framer-motion'
import { DashedRule } from '../components/DashedRule'
import { TopNav } from '../components/TopNav'
import { STAGGER, TRANSITIONS } from '../lib/motion'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.cards, delayChildren: 0.05 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
}

function Stat({
  label,
  value,
  accent,
  note,
}: {
  label: string
  value: string
  accent: string
  note?: string
}) {
  return (
    <div className="rounded-2xl border bg-white px-5 py-4" style={{ borderColor: THEME.border, borderLeft: `4px solid ${accent}`, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
      <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        {label}
      </div>
      <div className="mt-2 text-[34px] font-bold leading-none tracking-[-0.04em]" style={{ fontFamily: THEME.fontMono, color: accent }}>
        {value}
      </div>
      {note ? (
        <div className="mt-2 text-[12px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          {note}
        </div>
      ) : null}
    </div>
  )
}

function MiniBar({
  label,
  value,
  max,
  accent,
}: {
  label: string
  value: number
  max: number
  accent: string
}) {
  const pct = Math.max(0, Math.min(1, value / max))
  return (
    <div className="flex items-center gap-3">
      <div className="w-[128px] text-[11px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
        {label}
      </div>
      <div className="flex-1">
        <div className="h-2 rounded-full" style={{ background: `${THEME.border}` }} />
        <motion.div
          className="h-2 -mt-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct * 100}%` }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${accent}, ${THEME.accent})` }}
        />
      </div>
      <div className="w-[44px] text-right text-[11px] tabular-nums font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
        {value}
      </div>
    </div>
  )
}

function MiniLine({
  aLabel,
  aValue,
  bLabel,
  bValue,
  accent,
}: {
  aLabel: string
  aValue: number
  bLabel: string
  bValue: number
  accent: string
}) {
  const max = Math.max(aValue, bValue) * 1.15
  const y = (v: number) => 72 - (v / max) * 72
  const x1 = 18
  const x2 = 210
  const y1 = y(aValue)
  const y2 = y(bValue)
  return (
    <div className="rounded-2xl border bg-white p-4" style={{ borderColor: THEME.border }}>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          Market growth (illustrative)
        </div>
        <div className="text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
          USD billions
        </div>
      </div>
      <svg viewBox="0 0 240 96" className="mt-3 h-[96px] w-full">
        <path d={`M${x1},${y1} L${x2},${y2}`} stroke={`${accent}`} strokeWidth="3" fill="none" opacity="0.9" />
        <path d={`M${x1},${y1} L${x2},${y2}`} stroke={`${accent}33`} strokeWidth="10" fill="none" opacity="1" />
        <circle cx={x1} cy={y1} r="5" fill={accent} />
        <circle cx={x2} cy={y2} r="5" fill={THEME.accent} />
        <text x={x1} y={90} textAnchor="middle" style={{ fontFamily: THEME.fontMono, fontSize: 10, fill: THEME.textMuted }}>
          {aLabel}
        </text>
        <text x={x2} y={90} textAnchor="middle" style={{ fontFamily: THEME.fontMono, fontSize: 10, fill: THEME.textMuted }}>
          {bLabel}
        </text>
      </svg>
      <div className="mt-2 flex items-center justify-between text-[11px]" style={{ fontFamily: THEME.fontMono }}>
        <span style={{ color: accent }}>${aValue.toFixed(1)}B</span>
        <span style={{ color: THEME.accent }}>${bValue.toFixed(1)}B</span>
      </div>
    </div>
  )
}

export function S03a_ProblemEverywhere({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '01 · PROBLEM'} page={pageOverride ?? '4 / 13'} tone="light" />

      <motion.div variants={container} initial="hidden" animate="show" className="flex min-h-0 flex-1 flex-col justify-center">
        <motion.div variants={item} className="max-w-[64rem]">
          <div className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Scope
          </div>
          <h1
            className="mt-2 text-[clamp(30px,4.2vw,46px)] font-bold leading-[1.02] tracking-[-0.05em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            The problem is everywhere.
          </h1>
          <p className="mt-3 max-w-[58rem] text-[15px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            Teams already run on tools. The issue is that the data is dispersed, hard to connect, and slow to turn into next steps.
          </p>
        </motion.div>

        <motion.div variants={item} className="mt-5">
          <DashedRule />
        </motion.div>

        <motion.div variants={item} className="mt-6 grid min-h-0 grid-cols-1 gap-5 lg:grid-cols-12">
          {/* US / Rowing */}
          <div className="lg:col-span-6 min-h-0 rounded-2xl border bg-white p-5" style={{ borderColor: THEME.border, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  United States · Rowing
                </div>
                <div className="mt-1 text-[18px] font-bold leading-tight" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                  Hundreds of programs, same fragmented stack.
                </div>
              </div>
              <div className="shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: `${THEME.primary}33`, background: `${THEME.primary}10`, color: THEME.primary, fontFamily: THEME.fontMono }}>
                Wedge
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat label="NCAA D1 rowing programs" value="97" accent={THEME.primary} note="Varsity rowing programs (D1)." />
              <Stat label="NCAA varsity programs (all divs)" value="156" accent={THEME.cyan} note="Varsity rowing programs across NCAA divisions." />
            </div>

            <div className="mt-4 rounded-2xl border bg-zinc-50/70 px-4 py-4" style={{ borderColor: THEME.border }}>
              <div className="flex items-center justify-between gap-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  Typical tool load
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.16em]" style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker }}>
                  8+ tools
                </div>
              </div>
              <div className="mt-3 space-y-2.5">
                <MiniBar label="Communication" value={2} max={8} accent={THEME.primary} />
                <MiniBar label="Planning + calendar" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="Strength / gym" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="On-water instruments" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="Erg tools" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="GPS / wearables (Catapult)" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="Timing (stopwatches)" value={1} max={8} accent={THEME.primary} />
                <MiniBar label="Spreadsheets + exports" value={2} max={8} accent={THEME.primary} />
              </div>
              <div className="mt-3 text-[11px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
                Examples: ergs, boat instrumentation, stopwatches, GPS wearables, plus the usual apps.
              </div>
            </div>
          </div>

          {/* Global / All sports */}
          <div className="lg:col-span-6 min-h-0 rounded-2xl border bg-white p-5" style={{ borderColor: THEME.border, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  Global · All sports
                </div>
                <div className="mt-1 text-[18px] font-bold leading-tight" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                  Sports is becoming data-centric everywhere.
                </div>
              </div>
              <div className="shrink-0 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: `${THEME.purple}33`, background: `${THEME.purple}10`, color: THEME.purple, fontFamily: THEME.fontMono }}>
                Tailwind
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <Stat
                label="Sports tech market (2030)"
                value="$68.7B"
                accent={THEME.purple}
                note="Projected market size by 2030."
              />
              <Stat
                label="Growth rate"
                value="14.9%"
                accent={THEME.amber}
                note="Projected CAGR (mid- to late-2020s)."
              />
            </div>

            <div className="mt-4">
              <MiniLine aLabel="2024" aValue={44.8} bLabel="2030" bValue={68.7} accent={THEME.purple} />
            </div>

            <div className="mt-4 rounded-2xl border bg-zinc-50/70 px-4 py-4" style={{ borderColor: THEME.border }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                Investment signal
              </div>
              <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
                <div className="min-w-0">
                  <div className="text-[28px] font-bold leading-none tracking-[-0.04em]" style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker }}>
                    $9.6B
                  </div>
                  <div className="mt-1 text-[12px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                    invested in sports tech (2024)
                  </div>
                </div>
                <div className="rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider" style={{ borderColor: `${THEME.primary}33`, background: `${THEME.primary}10`, color: THEME.primaryDarker, fontFamily: THEME.fontMono }}>
                  tools → data → decisions
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}


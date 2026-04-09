import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'
import { TRANSITIONS } from '../lib/motion'

const GRID = THEME.border

/** Line chart with horizontal grid, x-axis year labels, area fill. */
function ChartLineIndexed({
  values,
  xLabels,
  yFormat,
  color,
}: {
  values: number[]
  xLabels: string[]
  yFormat: (n: number) => string
  color: string
}) {
  const w = 320
  const h = 96
  const padL = 38
  const padR = 10
  const padT = 12
  const padB = 20
  const plotBottom = h - padB
  const chartW = w - padL - padR
  const plotH = plotBottom - padT
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1
  const pts = values.map((v, i) => {
    const x = padL + (i / (values.length - 1)) * chartW
    const y = plotBottom - ((v - min) / range) * plotH
    return [x, y] as const
  })
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ')
  const areaD = `${d} L ${pts[pts.length - 1][0]} ${plotBottom} L ${pts[0][0]} ${plotBottom} Z`
  const gridYs = [0.25, 0.5, 0.75].map((t) => padT + plotH * (1 - t))

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" aria-hidden>
      {gridYs.map((gy, i) => (
        <line key={i} x1={padL} y1={gy} x2={w - padR} y2={gy} stroke={GRID} strokeWidth={1} opacity={0.4} />
      ))}
      <line x1={padL} y1={plotBottom} x2={w - padR} y2={plotBottom} stroke={GRID} strokeWidth={1.2} opacity={0.65} />
      <text x={2} y={padT + 8} style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted }}>
        {yFormat(max)}
      </text>
      <text x={2} y={plotBottom - 2} style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted }}>
        {yFormat(min)}
      </text>
      <path d={areaD} fill={color} fillOpacity={0.12} />
      <path d={d} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {xLabels.map((lab, i) => {
        const x = padL + (i / (xLabels.length - 1)) * chartW
        return (
          <text key={`${lab}-${i}`} x={x} y={h - 4} textAnchor="middle" style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted }}>
            {lab}
          </text>
        )
      })}
    </svg>
  )
}

function ChartHBarLabeled({
  rows,
  color,
}: {
  rows: Array<{ label: string; value: number }>
  color: string
}) {
  const max = Math.max(...rows.map((r) => r.value), 1)
  const w = 320
  const rowH = 14
  const gap = 5
  const labelW = 78
  const barW = w - labelW - 28
  const h = rows.length * (rowH + gap) + 4

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" aria-hidden>
      {rows.map((r, i) => {
        const y = i * (rowH + gap) + 2
        const bw = (r.value / max) * barW
        return (
          <g key={r.label}>
            <text x={0} y={y + 11} style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textSecondary }}>
              {r.label}
            </text>
            <rect x={labelW} y={y + 2} width={barW} height={rowH - 4} rx={2} fill={`${THEME.textMuted}12`} />
            <motion.rect
              x={labelW}
              y={y + 2}
              width={bw}
              height={rowH - 4}
              rx={2}
              fill={color}
              initial={{ width: 0 }}
              animate={{ width: bw }}
              transition={{ ...TRANSITIONS.smooth, delay: 0.04 + i * 0.05 }}
            />
            <text x={labelW + barW + 4} y={y + 11} style={{ fontFamily: THEME.fontMono, fontSize: 9, fill: THEME.textMuted }}>
              {r.value}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function ChartVBarLabeled({
  years,
  values,
  unit,
  color,
}: {
  years: string[]
  values: number[]
  unit: string
  color: string
}) {
  const max = Math.max(...values)
  const w = 320
  const h = 88
  const padL = 28
  const padB = 18
  const plotH = h - padB - 8
  const n = values.length
  const gap = 14
  const colW = (w - padL - 16 - gap * (n - 1)) / n

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto block" aria-hidden>
      {[0.33, 0.66].map((t, i) => {
        const gy = 6 + (plotH - 6) * (1 - t)
        return <line key={i} x1={padL} y1={gy} x2={w - 8} y2={gy} stroke={GRID} strokeWidth={1} opacity={0.4} />
      })}
      <line x1={padL} y1={plotH} x2={w - 8} y2={plotH} stroke={GRID} strokeWidth={1.2} opacity={0.65} />
      <text x={4} y={12} style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted }}>
        ${max}M
      </text>
      {values.map((v, i) => {
        const bh = Math.max(12, (v / max) * (plotH - 14))
        const x = padL + i * (colW + gap)
        return (
          <g key={years[i]}>
            <motion.rect
              x={x}
              y={plotH - bh}
              width={colW}
              height={bh}
              rx={2}
              fill={color}
              initial={{ height: 0, y: plotH }}
              animate={{ height: bh, y: plotH - bh }}
              transition={{ ...TRANSITIONS.smooth, delay: 0.05 + i * 0.06 }}
            />
            <text
              x={x + colW / 2}
              y={h - 4}
              textAnchor="middle"
              style={{ fontFamily: THEME.fontMono, fontSize: 8, fill: THEME.textMuted }}
            >
              {years[i]}
            </text>
            <text
              x={x + colW / 2}
              y={plotH - bh - 4}
              textAnchor="middle"
              style={{ fontFamily: THEME.fontMono, fontSize: 9, fontWeight: 600, fill: THEME.textSecondary }}
            >
              {v}
              {unit}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

function ChartPanel({
  title,
  stat,
  statNote,
  caption,
  children,
}: {
  title: string
  stat: string
  statNote?: string
  caption: string
  children: ReactNode
}) {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col h-full min-h-0"
      style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.85)', boxShadow: '0 8px 24px rgba(0,0,0,0.04)' }}
    >
      <div className="text-[9px] tracking-[0.14em] uppercase font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        {title}
      </div>
      <div className="mt-1 flex items-baseline gap-2 flex-wrap">
        <span className="text-[36px] font-bold tabular-nums leading-none tracking-tight" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
          {stat}
        </span>
        {statNote ? (
          <span className="text-[11px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
            {statNote}
          </span>
        ) : null}
      </div>
      <div className="mt-2 flex-1 min-h-0 flex flex-col justify-end">{children}</div>
      <p className="mt-2 text-[11px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
        {caption}
      </p>
    </div>
  )
}

export function S06_WhyNow() {
  const marketSeries = [100, 108, 118, 128, 138, 152, 168]
  const athleteSeries = [472, 485, 498, 508, 518, 526]
  const years7 = ['\'19', '\'20', '\'21', '\'22', '\'23', '\'24', '\'25']
  const years6 = ['\'19', '\'20', '\'21', '\'22', '\'23', '\'24']

  const whyPoints = [
    {
      title: 'Demand & expectations',
      body: 'Audiences and rights spend are up; programs are expected to look as pro as the leagues they feed. Cheap software moved the bottleneck to integration, not features.',
    },
    {
      title: 'Tool sprawl',
      body: 'Staff already juggle six to eight systems. Pilots keep asking for one place that honors fatigue, lineups, and load, without re-keying the same fields.',
    },
    {
      title: 'Athlete parity',
      body: 'Athletes track sleep and strain on their wrists. Coaches need the same visibility so roster and compliance decisions stay defensible.',
    },
    {
      title: 'Spend vs. insight',
      body: 'Athletic budgets keep climbing, but insight stays fragmented. The opening is when spend is rising and the workflow is still broken.',
    },
  ]

  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '40px 44px 28px', color: THEME.textPrimary }}>
      <TopNav section="05 · WHY NOW" page="6 / 13" tone="light" />
      <PaperTexture strength={0.72} tint="rgba(244, 243, 236, 0.95)" />

      <SectionLabel text="05 · WHY NOW" />
      <div className="mt-2 text-[36px] leading-[1.08] font-bold max-w-[800px]" style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em' }}>
        The world changed. Coaching hasn&apos;t.
      </div>
      <p className="mt-2 max-w-[640px] text-[13px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
        Demand, spend, and athlete literacy crossed a line, building a unified surface is less a bet on novelty than on timing.
      </p>

      {/* Upper: charts */}
      <div className="mt-5 flex-1 min-h-0 grid grid-cols-2 gap-4 content-stretch" style={{ minHeight: 0 }}>
        <ChartPanel
          title="Market · live sports viewership"
          stat="+38%"
          statNote="vs 2019 (indexed)"
          caption="More screens, more leagues, more pressure for programs to present like pros, not more spreadsheets."
        >
          <ChartLineIndexed
            values={marketSeries}
            xLabels={years7}
            yFormat={(n) => `${Math.round(n)}`}
            color={THEME.primary}
          />
        </ChartPanel>

        <ChartPanel
          title="Stack depth · tools in play"
          stat="7+"
          statNote="systems / staff (D-I median)"
          caption="Wearables, S&C, ops, each with its own login. The pain isn’t data collection; it’s stitching it."
        >
          <ChartHBarLabeled
            color={THEME.primary}
            rows={[
              { label: 'Wearables', value: 81 },
              { label: 'S&C / Bridge', value: 74 },
              { label: 'Whoop', value: 69 },
              { label: 'Ops / TW', value: 56 },
            ]}
          />
        </ChartPanel>

        <ChartPanel
          title="Participation · NCAA athletes"
          stat="530K"
          statNote="and climbing"
          caption="Full rosters and quota pressure mean ‘see load in one place’ is no longer optional."
        >
          <ChartLineIndexed
            values={athleteSeries}
            xLabels={years6}
            yFormat={(n) => `${n}`}
            color={THEME.primary}
          />
        </ChartPanel>

        <ChartPanel
          title="Spend · avg FBS athletic budget"
          stat="$127M"
          statNote="'24 average"
          caption="Money is there; what’s missing is a single layer that turns spend into coordinated action."
        >
          <ChartVBarLabeled years={['\'20', '\'22', '\'24']} values={[98, 112, 127]} unit="M" color={THEME.primary} />
        </ChartPanel>
      </div>

      {/* Lower: full-width horizontal strip · same copy as before */}
      <div className="mt-4 pt-4 shrink-0 border-t" style={{ borderColor: THEME.border }}>
        <div
          className="text-[10px] tracking-[0.2em] uppercase font-bold mb-3"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          Why build now
        </div>
        <div className="grid grid-cols-4 gap-0">
          {whyPoints.map((item, i) => (
            <div
              key={item.title}
              className="min-w-0 px-4 first:pl-0 border-l first:border-l-0"
              style={{ borderColor: THEME.border }}
            >
              <div className="flex items-baseline gap-2">
                <span className="text-[10px] font-bold tabular-nums" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="text-[12px] font-semibold leading-tight" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                  {item.title}
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-[1.5]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

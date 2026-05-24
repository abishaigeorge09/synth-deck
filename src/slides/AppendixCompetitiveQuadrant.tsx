import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(20px, 3vw, 36px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Competitor = {
  label: string
  x: number // workflow integration 0..100
  y: number // data depth 0..100
  color: string
  bold?: boolean
}

const COMPETITORS: Competitor[] = [
  { label: 'synth', x: 78, y: 76, color: THEME.accent, bold: true },
  { label: 'Kitman Labs', x: 70, y: 56, color: THEME.blue },
  { label: 'Teamworks (Smartabase)', x: 56, y: 50, color: THEME.textMuted },
  { label: 'Catapult', x: 28, y: 72, color: THEME.amber },
  { label: 'Whoop · Garmin · Oura', x: 18, y: 78, color: THEME.textMuted },
  { label: 'Hudl', x: 36, y: 48, color: THEME.textMuted },
  { label: 'TrainingPeaks', x: 48, y: 44, color: THEME.textMuted },
  { label: 'Google Sheets', x: 72, y: 16, color: THEME.textMuted },
  { label: 'Slack · GroupMe', x: 80, y: 12, color: THEME.textMuted },
]

function Quadrant() {
  // Full-bleed-ish viewBox; renderer scales to container width
  const W = 1400
  const H = 760
  const padL = 110
  const padR = 80
  const padT = 70
  const padB = 90
  const plotW = W - padL - padR
  const plotH = H - padT - padB

  const xPos = (v: number) => padL + (v / 100) * plotW
  const yPos = (v: number) => padT + ((100 - v) / 100) * plotH

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      {/* Plot area (darker axis border) */}
      <rect
        x={padL}
        y={padT}
        width={plotW}
        height={plotH}
        fill="rgba(24,24,27,0.02)"
        stroke="rgba(24,24,27,0.45)"
        strokeWidth="2"
      />

      {/* Center axes (darker dashed crosshair) */}
      <line
        x1={padL + plotW / 2}
        y1={padT}
        x2={padL + plotW / 2}
        y2={padT + plotH}
        stroke="rgba(24,24,27,0.38)"
        strokeWidth="1.6"
        strokeDasharray="6 6"
      />
      <line
        x1={padL}
        y1={padT + plotH / 2}
        x2={padL + plotW}
        y2={padT + plotH / 2}
        stroke="rgba(24,24,27,0.38)"
        strokeWidth="1.6"
        strokeDasharray="6 6"
      />

      {/* Quadrant labels (corners) */}
      <text
        x={padL + 20}
        y={padT + 32}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.textMuted,
        }}
      >
        WALLED GARDENS
      </text>
      <text
        x={padL + plotW - 20}
        y={padT + 32}
        textAnchor="end"
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.primary,
        }}
      >
        THE SYNTH QUADRANT
      </text>
      <text
        x={padL + 20}
        y={padT + plotH - 22}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.textMuted,
        }}
      >
        POINT TOOLS
      </text>
      <text
        x={padL + plotW - 20}
        y={padT + plotH - 22}
        textAnchor="end"
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 14,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.textMuted,
        }}
      >
        COMMUNICATION PLATFORMS
      </text>

      {/* Y-axis */}
      <text
        x={28}
        y={padT + plotH / 2}
        textAnchor="middle"
        transform={`rotate(-90, 28, ${padT + plotH / 2})`}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.22em',
          fill: THEME.textPrimary,
        }}
      >
        DATA DEPTH →
      </text>
      <text
        x={padL - 18}
        y={padT + 8}
        textAnchor="end"
        style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: THEME.textMuted }}
      >
        Deep
      </text>
      <text
        x={padL - 18}
        y={padT + plotH + 4}
        textAnchor="end"
        style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: THEME.textMuted }}
      >
        Shallow
      </text>

      {/* X-axis (title removed; keep low/high anchors only) */}
      <text
        x={padL}
        y={padT + plotH + 22}
        textAnchor="start"
        style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: THEME.textMuted }}
      >
        Low
      </text>
      <text
        x={padL + plotW}
        y={padT + plotH + 22}
        textAnchor="end"
        style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: THEME.textMuted }}
      >
        High
      </text>

      {/* Competitors */}
      {COMPETITORS.map((c) => {
        const cx = xPos(c.x)
        const cy = yPos(c.y)
        const r = c.bold ? 18 : 10
        const labelBelow = c.bold // place synth label BELOW dot to avoid colliding with corner quadrant header
        return (
          <g key={c.label}>
            {c.bold ? <circle cx={cx} cy={cy} r={r + 10} fill={`${c.color}28`} /> : null}
            <circle cx={cx} cy={cy} r={r} fill={c.color} />
            <text
              x={cx}
              y={labelBelow ? cy + r + 22 : cy - r - 10}
              textAnchor="middle"
              style={{
                fontFamily: THEME.fontMono,
                fontSize: c.bold ? 18 : 12.5,
                fontWeight: c.bold ? 700 : 600,
                fill: c.bold ? THEME.primaryDarker : THEME.textPrimary,
                letterSpacing: c.bold ? '0.06em' : undefined,
              }}
            >
              {c.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export function AppendixCompetitiveQuadrant({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A11 · 2×2 MATRIX'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div className="flex items-baseline justify-between gap-6">
          <div>
            <div
              className="text-[10px] font-bold uppercase tracking-[0.24em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
            >
              A11 · 2×2 matrix
            </div>
            <h1
              className="mt-1 text-[clamp(26px,3.2vw,38px)] font-bold leading-[1.05] tracking-[-0.04em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
            >
              Competitive quadrant.
            </h1>
          </div>
          <p
            className="max-w-[36rem] text-right text-[14px] leading-[1.5]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
          >
            Where synth sits vs. every other tool in collegiate athletics.
          </p>
        </div>

        {/* Full-bleed quadrant */}
        <div className="mt-3 min-h-0 flex-1">
          <Quadrant />
        </div>
      </div>
    </div>
  )
}

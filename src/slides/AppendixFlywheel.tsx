import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Node = {
  num: string
  title: string
  body: string
  color: string
  /** Quadrant position: 'tl' | 'tr' | 'br' | 'bl' */
  pos: 'tl' | 'tr' | 'br' | 'bl'
}

const NODES: Node[] = [
  {
    num: '01',
    title: 'Athletes connect tools',
    body:
      'Every wearable, strength platform, and spreadsheet that comes online adds another stream of data to the same athlete.',
    color: THEME.accent,
    pos: 'tl',
  },
  {
    num: '02',
    title: 'synth synthesizes signals',
    body:
      'Cross-tool events that no single vendor can see (sleep × load × HRV × decisions) become the proprietary corpus.',
    color: THEME.blue,
    pos: 'tr',
  },
  {
    num: '03',
    title: 'Predictions sharpen',
    body:
      'Readiness, trajectory, and breakdown probability improve with every athlete, validated by race results and injury data.',
    color: THEME.amber,
    pos: 'br',
  },
  {
    num: '04',
    title: 'Coaches act, athletes return',
    body:
      'Better predictions earn better decisions. Better decisions drive better outcomes. Better outcomes pull in more athletes and coaches.',
    color: THEME.purple,
    pos: 'bl',
  },
]

function FlywheelDiagram() {
  const W = 1080
  const H = 540
  const cx = W / 2
  const cy = H / 2
  const centerR = 78

  const boxW = 380
  const boxH = 200
  const colGap = 80 // gap between left and right columns (= 2 × inset from center)
  const rowGap = 60

  const positions: Record<Node['pos'], { x: number; y: number }> = {
    tl: { x: cx - colGap / 2 - boxW, y: cy - rowGap / 2 - boxH },
    tr: { x: cx + colGap / 2, y: cy - rowGap / 2 - boxH },
    br: { x: cx + colGap / 2, y: cy + rowGap / 2 },
    bl: { x: cx - colGap / 2 - boxW, y: cy + rowGap / 2 },
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <marker
          id="fw-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={THEME.textPrimary} />
        </marker>
      </defs>

      {/* Boxes */}
      {NODES.map((n) => {
        const p = positions[n.pos]
        return (
          <g key={n.num}>
            <rect
              x={p.x}
              y={p.y}
              width={boxW}
              height={boxH}
              rx={12}
              fill="white"
              stroke={n.color}
              strokeWidth="2"
            />
            <text
              x={p.x + 22}
              y={p.y + 36}
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 18,
                fontWeight: 700,
                fill: n.color,
                letterSpacing: '0.06em',
              }}
            >
              {n.num}
            </text>
            <text
              x={p.x + 22}
              y={p.y + 74}
              style={{
                fontFamily: THEME.fontSerif,
                fontSize: 24,
                fontWeight: 700,
                fill: THEME.textPrimary,
                letterSpacing: '-0.02em',
              }}
            >
              {n.title}
            </text>
            {/* Body: wrap manually using two tspans */}
            <foreignObject x={p.x + 22} y={p.y + 92} width={boxW - 44} height={boxH - 100}>
              <div
                style={{
                  fontFamily: THEME.fontSans,
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: THEME.textPrimary,
                }}
              >
                {n.body}
              </div>
            </foreignObject>
          </g>
        )
      })}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={centerR + 18} fill={`${THEME.accent}1A`} />
      <circle cx={cx} cy={cy} r={centerR} fill="white" stroke={THEME.accent} strokeWidth="2" />
      <text
        x={cx}
        y={cy - 8}
        textAnchor="middle"
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 13,
          fontWeight: 700,
          fill: THEME.textMuted,
          letterSpacing: '0.24em',
        }}
      >
        SYNTH
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 14,
          fontWeight: 700,
          fill: THEME.primary,
          letterSpacing: '0.22em',
        }}
      >
        FLYWHEEL
      </text>

      {/* Clockwise arrows between boxes (around the center circle) */}
      {/* TL → TR (top edge) */}
      <path
        d={`M ${positions.tl.x + boxW + 6} ${cy - rowGap / 2 - boxH / 2}
           Q ${cx} ${cy - 200}, ${positions.tr.x - 6} ${cy - rowGap / 2 - boxH / 2}`}
        stroke={THEME.textPrimary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#fw-arrow)"
        opacity="0.4"
      />
      {/* TR → BR (right edge) */}
      <path
        d={`M ${positions.tr.x + boxW / 2} ${positions.tr.y + boxH + 6}
           Q ${positions.tr.x + boxW + 80} ${cy}, ${positions.br.x + boxW / 2} ${positions.br.y - 6}`}
        stroke={THEME.textPrimary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#fw-arrow)"
        opacity="0.4"
      />
      {/* BR → BL (bottom edge) */}
      <path
        d={`M ${positions.br.x - 6} ${cy + rowGap / 2 + boxH / 2}
           Q ${cx} ${cy + 200}, ${positions.bl.x + boxW + 6} ${cy + rowGap / 2 + boxH / 2}`}
        stroke={THEME.textPrimary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#fw-arrow)"
        opacity="0.4"
      />
      {/* BL → TL (left edge) */}
      <path
        d={`M ${positions.bl.x + boxW / 2} ${positions.bl.y - 6}
           Q ${positions.bl.x - 80} ${cy}, ${positions.tl.x + boxW / 2} ${positions.tl.y + boxH + 6}`}
        stroke={THEME.textPrimary}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        markerEnd="url(#fw-arrow)"
        opacity="0.4"
      />
    </svg>
  )
}

export function AppendixFlywheel({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A1 · THE FLYWHEEL'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-6 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {sectionOverride ?? 'A1 · The flywheel'}
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          The flywheel.
        </h1>
        <p
          className="mt-2 max-w-[80rem] text-[14.5px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Every athlete who connects a tool makes the next prediction better, the next coach decision sharper,
          and the next contract easier to close.
        </p>

        <div className="mt-5 min-h-0 flex-1">
          <FlywheelDiagram />
        </div>
      </div>
    </div>
  )
}

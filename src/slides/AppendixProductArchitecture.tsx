import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

/* ───── Persona / glyph primitives ───── */

function PersonGlyph({
  cx,
  cy,
  scale = 1,
  accessory,
  color = THEME.textPrimary,
}: {
  cx: number
  cy: number
  scale?: number
  accessory?: 'watch' | 'clipboard' | 'tie'
  color?: string
}) {
  const headR = 7 * scale
  const bodyTop = cy - 8 * scale
  const bodyBottom = cy + 26 * scale
  const shoulderW = 22 * scale
  return (
    <g>
      <circle cx={cx} cy={cy - 18 * scale} r={headR} fill="none" stroke={color} strokeWidth="1.5" />
      <path
        d={`M ${cx - shoulderW / 2} ${bodyBottom}
            L ${cx - shoulderW / 2} ${bodyTop + 4 * scale}
            C ${cx - shoulderW / 2} ${bodyTop}, ${cx + shoulderW / 2} ${bodyTop}, ${cx + shoulderW / 2} ${bodyTop + 4 * scale}
            L ${cx + shoulderW / 2} ${bodyBottom}`}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {accessory === 'watch' ? (
        <rect
          x={cx - shoulderW / 2 - 5}
          y={cy + 6 * scale}
          width="5"
          height="4"
          rx="1"
          fill={color}
          opacity="0.7"
        />
      ) : null}
      {accessory === 'clipboard' ? (
        <rect
          x={cx + shoulderW / 2 - 2}
          y={cy - 2 * scale}
          width="9"
          height="13"
          rx="1.5"
          fill="none"
          stroke={color}
          strokeWidth="1.3"
        />
      ) : null}
      {accessory === 'tie' ? (
        <path
          d={`M ${cx - 2} ${cy - 6 * scale} L ${cx + 2} ${cy - 6 * scale} L ${cx + 4} ${cy + 14 * scale} L ${cx} ${cy + 18 * scale} L ${cx - 4} ${cy + 14 * scale} Z`}
          fill={color}
          opacity="0.7"
        />
      ) : null}
    </g>
  )
}

function ChatGlyph({ cx, cy, scale = 1, color = THEME.textPrimary }: { cx: number; cy: number; scale?: number; color?: string }) {
  const w = 32 * scale
  const h = 24 * scale
  return (
    <path
      d={`M ${cx - w / 2} ${cy - h / 2}
          h ${w}
          a 4 4 0 0 1 4 4
          v ${h - 8}
          a 4 4 0 0 1 -4 4
          h ${-(w - 12)}
          l -6 6
          v -6
          h -4
          a 4 4 0 0 1 -4 -4
          v ${-(h - 8)}
          a 4 4 0 0 1 4 -4 Z`}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  )
}

/* ───── Diagram ───── */

function Diagram() {
  const W = 1400
  const H = 820

  // ROW 1 — inputs (cylinders + athletes icon)
  const athleteIconX = 90
  const athleteIconY = 80
  const cylinderRowY = 50 // top of cylinder bodies
  const cylinderH = 90
  const cylinderW = 340
  const cylinderGap = 30
  // 3 cylinders horizontal: total 3*340 + 2*30 = 1080. Start at x=200, end at x=1280.
  const cylStartX = 200
  const cylPositions = [0, 1, 2].map((i) => cylStartX + i * (cylinderW + cylinderGap))
  const cylCenters = cylPositions.map((x) => x + cylinderW / 2)
  const cylBottomY = cylinderRowY + cylinderH

  // ROW 2 — pipeline (5 boxes)
  const pipelineRowY = 330
  const boxW = 252
  const boxH = 180
  const boxGap = 20
  const pipelineStartX = 20
  // 5 boxes: 5*252 + 4*20 = 1340. From x=20 to x=1360.
  const pipeBoxX = (i: number) => pipelineStartX + i * (boxW + boxGap)
  const pipeBoxCenter = (i: number) => pipeBoxX(i) + boxW / 2
  const ingestionCenter = pipeBoxCenter(0)
  const synthCenter = pipeBoxCenter(2)
  const actionX = pipeBoxX(4)
  const actionCenter = pipeBoxCenter(4)
  const actionRightEdge = actionX + boxW
  const pipelineTopY = pipelineRowY
  const pipelineBottomY = pipelineRowY + boxH

  // ROW 3 — surfaces (4 boxes)
  const surfaceRowY = 620
  const surfaceW = 240
  const surfaceH = 160
  const surfaceGap = 30
  // 4 boxes: 4*240 + 3*30 = 1050. Centered → start at (1400-1050)/2 = 175
  const surfaceStartX = 175
  const surfaceX = (i: number) => surfaceStartX + i * (surfaceW + surfaceGap)
  const surfaceCenter = (i: number) => surfaceX(i) + surfaceW / 2

  // INPUT bus (Y-shaped converging connector)
  const inputBusY = 215
  const inputBusLeft = ingestionCenter // bus left end aligned with Ingestion column center
  const inputBusRight = cylCenters[2]
  // Ingestion top y = pipelineTopY (330). Bus → Ingestion top via vertical from (ingestionCenter, inputBusY) → (ingestionCenter, pipelineTopY - 4)

  // SURFACE distribution bus
  const surfaceBusY = surfaceRowY - 30
  const surfaceBusLeft = surfaceCenter(0)
  const surfaceBusRight = actionCenter

  // FEEDBACK arc — start at right edge of Action layer, end above Synthesis engine
  const fbStartX = actionRightEdge
  const fbStartY = pipelineRowY + boxH / 2
  const fbEndX = synthCenter
  const fbEndY = pipelineTopY - 6
  // Control points to pull curve up and over with ≥30px clearance above pipeline
  const fbApexY = 130
  const fbCurve = `M ${fbStartX} ${fbStartY}
                   C ${fbStartX + 60} ${fbApexY + 90},
                     ${(fbStartX + fbEndX) / 2 + 80} ${fbApexY - 30},
                     ${fbEndX} ${fbEndY}`

  // Strokes
  const arrowStroke = THEME.textPrimary
  const arrowOpacity = '0.55'
  const arrowW = '1.6'

  const PIPELINE = [
    { label: 'INGESTION', title: 'Ingestion', desc: 'OAuth, webhooks, schema normalization.' },
    { label: 'DATA STORE', title: 'Data store', desc: 'Athlete profiles · multi-year longitudinal.' },
    { label: 'SYNTHESIS ENGINE', title: 'Synthesis engine', desc: 'Cross-tool events · latent state embedding.' },
    { label: 'PREDICTION ENGINE', title: 'Prediction engine', desc: 'Readiness · trajectory · breakdown probability.' },
    { label: 'ACTION LAYER', title: 'Action layer', desc: 'Alerts · lineup suggestions · custom tools.' },
  ]

  const SURFACES: Array<{
    title: string
    sub: string
    persona: 'coach' | 'athlete' | 'ad' | 'chat'
  }> = [
    { title: 'Coach dashboard', sub: 'web', persona: 'coach' },
    { title: 'Athlete app', sub: 'PWA + iOS', persona: 'athlete' },
    { title: 'AD console', sub: 'department view', persona: 'ad' },
    { title: 'AI chat', sub: 'every role', persona: 'chat' },
  ]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <defs>
        <marker
          id="arch-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={THEME.textPrimary} />
        </marker>
        <marker
          id="fb-arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={THEME.accent} />
        </marker>
      </defs>

      {/* Row rail labels */}
      <text
        x={20}
        y={28}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.accent,
        }}
      >
        INPUTS
      </text>
      <text
        x={20}
        y={pipelineRowY - 18}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.accent,
        }}
      >
        PIPELINE
      </text>
      <text
        x={20}
        y={surfaceRowY - 12}
        style={{
          fontFamily: THEME.fontMono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.24em',
          fill: THEME.accent,
        }}
      >
        SURFACES
      </text>

      {/* ─── ROW 1: athletes icon + 3 horizontal cylinders ─── */}
      <g transform={`translate(${athleteIconX}, ${athleteIconY})`}>
        <PersonGlyph cx={0} cy={0} scale={1.1} accessory="watch" />
        <text
          x={0}
          y={50}
          textAnchor="middle"
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 10.5,
            fontWeight: 700,
            letterSpacing: '0.16em',
            fill: THEME.textPrimary,
          }}
        >
          ATHLETES
        </text>
        <text
          x={0}
          y={66}
          textAnchor="middle"
          style={{
            fontFamily: THEME.fontMono,
            fontSize: 9.5,
            letterSpacing: '0.14em',
            fill: THEME.textMuted,
          }}
        >
          connect tools
        </text>
      </g>

      {/* Arrow from athletes icon → cylinder row */}
      <line
        x1={athleteIconX + 24}
        y1={athleteIconY}
        x2={cylStartX - 8}
        y2={athleteIconY}
        stroke={arrowStroke}
        strokeWidth={arrowW}
        strokeOpacity={arrowOpacity}
        markerEnd="url(#arch-arrow)"
      />

      {/* 3 horizontal cylinders */}
      {[
        {
          x: cylPositions[0],
          color: THEME.accent,
          label: 'Proprietary data',
          desc: 'synthesis events · interaction graph',
        },
        {
          x: cylPositions[1],
          color: THEME.blue,
          label: 'Partner data',
          desc: '20+ integrations via OAuth',
        },
        {
          x: cylPositions[2],
          color: THEME.amber,
          label: 'Public data',
          desc: 'open science · injury surveillance',
        },
      ].map((c, i) => (
        <g key={i}>
          <rect
            x={c.x}
            y={cylinderRowY}
            width={cylinderW}
            height={cylinderH}
            fill="white"
            stroke={c.color}
            strokeWidth="1.8"
          />
          <ellipse
            cx={c.x + cylinderW / 2}
            cy={cylinderRowY}
            rx={cylinderW / 2}
            ry={9}
            fill="white"
            stroke={c.color}
            strokeWidth="1.8"
          />
          <ellipse
            cx={c.x + cylinderW / 2}
            cy={cylinderRowY + cylinderH}
            rx={cylinderW / 2}
            ry={9}
            fill="white"
            stroke={c.color}
            strokeWidth="1.8"
          />
          <text
            x={c.x + cylinderW / 2}
            y={cylinderRowY + 40}
            textAnchor="middle"
            style={{
              fontFamily: THEME.fontSerif,
              fontSize: 18,
              fontWeight: 700,
              fill: THEME.textPrimary,
            }}
          >
            {c.label}
          </text>
          <text
            x={c.x + cylinderW / 2}
            y={cylinderRowY + 62}
            textAnchor="middle"
            style={{
              fontFamily: THEME.fontMono,
              fontSize: 11.5,
              letterSpacing: '0.06em',
              fill: c.color,
            }}
          >
            {c.desc}
          </text>
        </g>
      ))}

      {/* Y-shaped converging connector (cylinders → Ingestion) */}
      {/* 3 short verticals from each cylinder bottom to bus */}
      {cylCenters.map((cx, i) => (
        <line
          key={i}
          x1={cx}
          y1={cylBottomY + 2}
          x2={cx}
          y2={inputBusY}
          stroke={arrowStroke}
          strokeWidth={arrowW}
          strokeOpacity={arrowOpacity}
        />
      ))}
      {/* Horizontal bus */}
      <line
        x1={inputBusLeft}
        y1={inputBusY}
        x2={inputBusRight}
        y2={inputBusY}
        stroke={arrowStroke}
        strokeWidth={arrowW}
        strokeOpacity={arrowOpacity}
      />
      {/* Bus drop down into Ingestion */}
      <line
        x1={ingestionCenter}
        y1={inputBusY}
        x2={ingestionCenter}
        y2={pipelineTopY - 4}
        stroke={arrowStroke}
        strokeWidth={arrowW}
        strokeOpacity={arrowOpacity}
        markerEnd="url(#arch-arrow)"
      />

      {/* ─── ROW 2: pipeline (5 boxes) ─── */}
      {PIPELINE.map((b, i) => {
        const x = pipeBoxX(i)
        const isSynth = b.label === 'SYNTHESIS ENGINE'
        return (
          <g key={b.label}>
            <rect
              x={x}
              y={pipelineRowY}
              width={boxW}
              height={boxH}
              rx={10}
              fill={isSynth ? `${THEME.accent}10` : 'white'}
              stroke={isSynth ? THEME.accent : THEME.border}
              strokeWidth={isSynth ? 2 : 1.4}
            />
            <text
              x={x + 16}
              y={pipelineRowY + 28}
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.22em',
                fill: THEME.primary,
              }}
            >
              {b.label}
            </text>
            <text
              x={x + 16}
              y={pipelineRowY + 66}
              style={{
                fontFamily: THEME.fontSerif,
                fontSize: 22,
                fontWeight: 700,
                fill: THEME.textPrimary,
                letterSpacing: '-0.02em',
              }}
            >
              {b.title}
            </text>
            <foreignObject x={x + 16} y={pipelineRowY + 80} width={boxW - 32} height={boxH - 92}>
              <div
                style={{
                  fontFamily: THEME.fontSans,
                  fontSize: 13,
                  lineHeight: 1.45,
                  color: THEME.textPrimary,
                }}
              >
                {b.desc}
              </div>
            </foreignObject>

            {i < PIPELINE.length - 1 ? (
              <line
                x1={x + boxW + 2}
                y1={pipelineRowY + boxH / 2}
                x2={x + boxW + boxGap - 2}
                y2={pipelineRowY + boxH / 2}
                stroke={arrowStroke}
                strokeWidth={arrowW}
                markerEnd="url(#arch-arrow)"
              />
            ) : null}
          </g>
        )
      })}

      {/* ─── Action layer → surfaces (T-bus, no diagonals) ─── */}
      <line
        x1={actionCenter}
        y1={pipelineBottomY + 2}
        x2={actionCenter}
        y2={surfaceBusY}
        stroke={arrowStroke}
        strokeWidth={arrowW}
        strokeOpacity={arrowOpacity}
      />
      <line
        x1={surfaceBusLeft}
        y1={surfaceBusY}
        x2={surfaceBusRight}
        y2={surfaceBusY}
        stroke={arrowStroke}
        strokeWidth={arrowW}
        strokeOpacity={arrowOpacity}
      />
      {SURFACES.map((_, i) => {
        const cx = surfaceCenter(i)
        return (
          <line
            key={i}
            x1={cx}
            y1={surfaceBusY}
            x2={cx}
            y2={surfaceRowY - 4}
            stroke={arrowStroke}
            strokeWidth={arrowW}
            strokeOpacity={arrowOpacity}
            markerEnd="url(#arch-arrow)"
          />
        )
      })}

      {/* ─── ROW 3: surfaces ─── */}
      {SURFACES.map((s, i) => {
        const x = surfaceX(i)
        const cx = surfaceCenter(i)
        return (
          <g key={s.title}>
            <rect
              x={x}
              y={surfaceRowY}
              width={surfaceW}
              height={surfaceH}
              rx={10}
              fill="white"
              stroke={THEME.border}
              strokeWidth="1.4"
            />
            <g transform={`translate(${cx}, ${surfaceRowY + 50})`}>
              {s.persona === 'athlete' ? <PersonGlyph cx={0} cy={0} scale={0.9} accessory="watch" /> : null}
              {s.persona === 'coach' ? <PersonGlyph cx={0} cy={0} scale={0.9} accessory="clipboard" /> : null}
              {s.persona === 'ad' ? <PersonGlyph cx={0} cy={0} scale={0.9} accessory="tie" /> : null}
              {s.persona === 'chat' ? <ChatGlyph cx={0} cy={0} scale={0.95} /> : null}
            </g>
            <text
              x={cx}
              y={surfaceRowY + 120}
              textAnchor="middle"
              style={{
                fontFamily: THEME.fontSerif,
                fontSize: 18,
                fontWeight: 700,
                fill: THEME.textPrimary,
              }}
            >
              {s.title}
            </text>
            <text
              x={cx}
              y={surfaceRowY + 142}
              textAnchor="middle"
              style={{
                fontFamily: THEME.fontMono,
                fontSize: 11,
                letterSpacing: '0.18em',
                fill: THEME.primary,
              }}
            >
              {s.sub}
            </text>
          </g>
        )
      })}

      {/* ─── FEEDBACK LOOP (green dashed arc only, no overlay label) ─── */}
      <path
        d={fbCurve}
        stroke={THEME.accent}
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="9 7"
        markerEnd="url(#fb-arrow)"
      />
    </svg>
  )
}

export function AppendixProductArchitecture({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A10 · PRODUCT ARCHITECTURE'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A10 · Product architecture
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Product architecture.
        </h1>
        <p
          className="mt-2 max-w-[88rem] text-[14.5px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Connectors ingest. Store holds. Synthesis finds events. Prediction learns. Outcomes feed back into the model.
        </p>

        <div className="mt-3 min-h-0 flex-1">
          <Diagram />
        </div>

        <p
          className="mt-2 text-center text-[12.5px] italic"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
        >
          Built in 6 months. Sport-agnostic. Two-way by default.
        </p>
      </div>
    </div>
  )
}

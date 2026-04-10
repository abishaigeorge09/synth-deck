import { THEME } from '../lib/theme'

const mono = { fontFamily: THEME.fontMono } as const

/** Disconnected app windows — problem / tool sprawl */
export function IllustDisconnectedApps({ className = '' }: { className?: string }) {
  const w = 320
  const h = 200
  const apps = [
    { x: 8, y: 12, bw: 88, bh: 52, c: THEME.blue, t: 'S' },
    { x: 108, y: 8, bw: 92, bh: 48, c: THEME.cyan, t: 'B' },
    { x: 210, y: 20, bw: 86, bh: 56, c: THEME.purple, t: 'W' },
    { x: 48, y: 110, bw: 96, bh: 54, c: THEME.amber, t: 'T' },
    { x: 168, y: 118, bw: 90, bh: 50, c: THEME.red, t: '?' },
  ]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[220px] ${className}`} aria-hidden>
      <defs>
        <filter id="sblur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.5" />
        </filter>
      </defs>
      {apps.map((a, i) => (
        <g key={i} opacity={0.92}>
          <rect x={a.x} y={a.y} width={a.bw} height={a.bh} rx={8} fill="#fff" stroke={THEME.border} strokeWidth={1.5} />
          <rect x={a.x} y={a.y} width={a.bw} height={14} rx={8} fill={`${a.c}18`} />
          <text x={a.x + a.bw / 2} y={a.y + 36} textAnchor="middle" style={{ ...mono, fontSize: 14, fontWeight: 700, fill: a.c }}>
            {a.t}
          </text>
        </g>
      ))}
      <path
        d="M52 78 Q120 95 150 70 M200 65 Q160 100 120 108 M230 78 Q200 120 168 118"
        fill="none"
        stroke={THEME.border}
        strokeWidth={1.2}
        strokeDasharray="4 6"
        opacity={0.7}
      />
    </svg>
  )
}

/** Base layer + synth layer — solution */
export function IllustSolutionLayers({ className = '' }: { className?: string }) {
  const w = 300
  const h = 200
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[220px] ${className}`} aria-hidden>
      <rect x={24} y={120} width={252} height={56} rx={10} fill={`${THEME.primary}12`} stroke={THEME.primary} strokeWidth={2} />
      <text x={150} y={148} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: THEME.primaryDarker }}>
        BASE APP
      </text>
      <text x={150} y={166} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textMuted }}>
        capture · publish
      </text>
      <rect x={40} y={48} width={220} height={62} rx={10} fill={`${THEME.cyan}10`} stroke={THEME.cyan} strokeWidth={2} />
      <text x={150} y={78} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: THEME.cyan }}>
        SYNTH LAYER
      </text>
      <text x={150} y={96} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textMuted }}>
        sync · unify · brief
      </text>
      <path d="M150 110 L150 118" stroke={THEME.border} strokeWidth={2} />
      <circle cx={150} cy={32} r={18} fill={`${THEME.accent}20`} stroke={THEME.accent} strokeWidth={2} />
      <path d="M150 22 v8 M146 26 h8" stroke={THEME.accent} strokeWidth={2} strokeLinecap="round" />
    </svg>
  )
}

/** Hub + spokes — connectors */
export function IllustConnectorHub({ className = '' }: { className?: string }) {
  const w = 300
  const h = 200
  const cx = 150
  const cy = 100
  const nodes = [
    { ax: 150, ay: 28, lab: 'Sheets', c: THEME.primary },
    { ax: 248, ay: 72, lab: 'Bridge', c: THEME.blue },
    { ax: 248, ay: 148, lab: 'TW', c: THEME.cyan },
    { ax: 150, ay: 178, lab: 'Whoop', c: THEME.purple },
    { ax: 52, ay: 148, lab: '…', c: THEME.amber },
    { ax: 52, ay: 72, lab: 'Inbox', c: THEME.textMuted },
  ]
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[220px] ${className}`} aria-hidden>
      {nodes.map((n, i) => (
        <line key={i} x1={cx} y1={cy} x2={n.ax} y2={n.ay} stroke={THEME.border} strokeWidth={1.5} opacity={0.65} />
      ))}
      <circle cx={cx} cy={cy} r={36} fill={`${THEME.primary}18`} stroke={THEME.primary} strokeWidth={2.5} />
      <text x={cx} y={cy + 5} textAnchor="middle" style={{ ...mono, fontSize: 12, fontWeight: 700, fill: THEME.primaryDarker }}>
        synth
      </text>
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.ax} cy={n.ay} r={22} fill="#fff" stroke={n.c} strokeWidth={2} />
          <text x={n.ax} y={n.ay + 4} textAnchor="middle" style={{ ...mono, fontSize: 9, fontWeight: 600, fill: n.c }}>
            {n.lab}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** Upward trend — why now */
export function IllustTrendUp({ className = '' }: { className?: string }) {
  const w = 300
  const h = 160
  const pts = [
    [40, 120],
    [90, 100],
    [140, 88],
    [190, 62],
    [240, 44],
    [268, 28],
  ]
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[180px] ${className}`} aria-hidden>
      <rect x={32} y={16} width={236} height={120} rx={8} fill="#fff" stroke={THEME.border} />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1={40} y1={36 + i * 28} x2={260} y2={36 + i * 28} stroke={THEME.border} strokeWidth={1} opacity={0.4} />
      ))}
      <path d={d} fill="none" stroke={THEME.primary} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${d} L 268 120 L 40 120 Z`} fill={`${THEME.primary}14`} />
      <text x={44} y={142} style={{ ...mono, fontSize: 9, fill: THEME.textMuted }}>
        spend · expectations · tools
      </text>
    </svg>
  )
}

/** Market rings */
export function IllustMarketRings({ className = '' }: { className?: string }) {
  const w = 220
  const h = 220
  const cx = 110
  const cy = 110
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[240px] ${className}`} aria-hidden>
      <circle cx={cx} cy={cy} r={98} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={72} fill={`${THEME.primary}08`} stroke={`${THEME.primary}55`} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={44} fill={`${THEME.primary}16`} stroke={THEME.accent} strokeWidth={2} />
      <text x={cx} y={cy + 6} textAnchor="middle" style={{ ...mono, fontSize: 14, fontWeight: 700, fill: '#fff' }}>
        $24M
      </text>
      <text x={cx} y={cy + 78} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: 'rgba(255,255,255,0.45)' }}>
        SOM · rowing
      </text>
    </svg>
  )
}

/** Tier cards — business model */
export function IllustTierStairs({ className = '' }: { className?: string }) {
  const tiers = [
    { w: 200, x: 50, y: 120, c: THEME.primary, t: 'Starter' },
    { w: 220, x: 40, y: 82, c: THEME.cyan, t: 'Pro' },
    { w: 240, x: 30, y: 44, c: THEME.purple, t: 'Elite' },
    { w: 260, x: 20, y: 6, c: THEME.amber, t: 'Enterprise' },
  ]
  return (
    <svg viewBox="0 0 300 200" className={`w-full max-h-[220px] ${className}`} aria-hidden>
      {tiers.map((r, i) => (
        <rect key={i} x={r.x} y={r.y} width={r.w} height={36} rx={8} fill={`${r.c}14`} stroke={r.c} strokeWidth={2} />
      ))}
      {tiers.map((r, i) => (
        <text key={`t-${i}`} x={r.x + r.w / 2} y={r.y + 23} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: r.c }}>
          {r.t}
        </text>
      ))}
    </svg>
  )
}

/** Competition — synth row vs fragmented rows */
export function IllustCompetitionMatrix({ className = '' }: { className?: string }) {
  const headers = ['connect', '1 view', 'auto']
  const grid: Array<'✓' | '—'> = [
    '✓', '✓', '✓',
    '—', '—', '—',
    '—', '—', '—',
  ]
  return (
    <svg viewBox="0 0 280 172" className={`w-full max-h-[200px] ${className}`} aria-hidden>
      <rect x={8} y={8} width={264} height={156} rx={10} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
      {headers.map((h, i) => (
        <text key={h} x={118 + i * 52} y={36} textAnchor="middle" style={{ ...mono, fontSize: 8, fill: 'rgba(255,255,255,0.4)' }}>
          {h}
        </text>
      ))}
      {['synth.', 'Point tools', 'Sheets + chat'].map((lab, ri) => (
        <text key={lab} x={20} y={72 + ri * 40} style={{ fontFamily: THEME.fontSans, fontSize: 11, fontWeight: ri === 0 ? 700 : 400, fill: ri === 0 ? THEME.accent : 'rgba(255,255,255,0.55)' }}>
          {lab}
        </text>
      ))}
      {grid.map((cell, i) => {
        const ri = Math.floor(i / 3)
        const ci = i % 3
        return (
          <text key={i} x={118 + ci * 52} y={72 + ri * 40} textAnchor="middle" style={{ ...mono, fontSize: 14, fill: ri === 0 ? THEME.accent : 'rgba(255,255,255,0.25)' }}>
            {cell}
          </text>
        )
      })}
    </svg>
  )
}

/** Four founders — initials */
export function IllustTeamAvatars({ className = '' }: { className?: string }) {
  const people = [
    { i: 'A', c: THEME.primary },
    { i: 'S', c: THEME.cyan },
    { i: 'L', c: THEME.purple },
    { i: 'M', c: THEME.amber },
  ]
  return (
    <svg viewBox="0 0 280 100" className={`w-full max-h-[120px] ${className}`} aria-hidden>
      {people.map((p, idx) => (
        <g key={p.i} transform={`translate(${12 + idx * 68}, 14)`}>
          <circle cx={40} cy={40} r={38} fill={`${p.c}12`} stroke={p.c} strokeWidth={3} />
          <text x={40} y={48} textAnchor="middle" style={{ ...mono, fontSize: 22, fontWeight: 700, fill: p.c }}>
            {p.i}
          </text>
        </g>
      ))}
    </svg>
  )
}

/** Vision — synth layer between tools and outcome */
export function IllustVisionStack({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 200" className={`w-full max-h-[220px] ${className}`} aria-hidden>
      <rect x={20} y={24} width={260} height={36} rx={8} fill={`${THEME.textMuted}10`} stroke={THEME.border} strokeWidth={1} />
      <text x={150} y={48} textAnchor="middle" style={{ ...mono, fontSize: 10, fill: THEME.textMuted }}>
        YOUR TOOLS (Sheets, Bridge, Whoop…)
      </text>
      <path d="M150 62 L150 78" stroke={THEME.border} strokeWidth={2} />
      <rect x={40} y={82} width={220} height={52} rx={10} fill={`${THEME.primary}16`} stroke={THEME.primary} strokeWidth={2.5} />
      <text x={150} y={108} textAnchor="middle" style={{ ...mono, fontSize: 13, fontWeight: 700, fill: THEME.primaryDarker }}>
        synth layer
      </text>
      <text x={150} y={126} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textSecondary }}>
        read · unify · flag risk
      </text>
      <path d="M150 136 L150 152" stroke={THEME.border} strokeWidth={2} />
      <rect x={50} y={156} width={200} height={32} rx={8} fill={`${THEME.cyan}12`} stroke={THEME.cyan} strokeWidth={1.5} />
      <text x={150} y={177} textAnchor="middle" style={{ ...mono, fontSize: 10, fontWeight: 600, fill: THEME.cyan }}>
        ONE ROSTER · EVERY MORNING
      </text>
    </svg>
  )
}

/** Thank you — conversation / open door */
export function IllustThankYou({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 160" className={`w-full max-h-[180px] ${className}`} aria-hidden>
      <ellipse cx={90} cy={70} rx={72} ry={52} fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
      <path d="M48 96 L38 118 L62 108" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" strokeWidth={2} />
      <text x={90} y={68} textAnchor="middle" style={{ ...mono, fontSize: 11, fill: 'rgba(255,255,255,0.85)' }}>
        Questions?
      </text>
      <ellipse cx={200} cy={88} rx={68} ry={48} fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.28)" strokeWidth={2} />
      <text x={200} y={92} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 10, fill: 'rgba(255,255,255,0.75)' }}>
        Let&apos;s talk
      </text>
    </svg>
  )
}

/** Three-part ask */
export function IllustThreePillars({ className = '' }: { className?: string }) {
  const cols = [
    { x: 24, c: THEME.primary, t: 'Pilots', s: 'shape' },
    { x: 112, c: THEME.cyan, t: '$100k', s: 'seed' },
    { x: 200, c: THEME.amber, t: 'Intro', s: 'GTM' },
  ]
  return (
    <svg viewBox="0 0 300 140" className={`w-full max-h-[160px] ${className}`} aria-hidden>
      {cols.map((col) => (
        <g key={col.t}>
          <rect x={col.x} y={20} width={72} height={96} rx={12} fill={`${col.c}10`} stroke={col.c} strokeWidth={2} />
          <text x={col.x + 36} y={58} textAnchor="middle" style={{ ...mono, fontSize: 13, fontWeight: 700, fill: col.c }}>
            {col.t}
          </text>
          <text x={col.x + 36} y={82} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 10, fill: THEME.textMuted }}>
            {col.s}
          </text>
        </g>
      ))}
    </svg>
  )
}

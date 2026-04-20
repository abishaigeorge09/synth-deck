import { useId } from 'react'
import { THEME } from '../lib/theme'

const mono = { fontFamily: THEME.fontMono } as const

/** Disconnected app windows — chaotic breakdown (coach POV: scary, disrupted stack) */
export function IllustDisconnectedApps({ className = '' }: { className?: string }) {
  const rid = useId().replace(/:/g, '')
  const w = 320
  const h = 200
  const blood = '#b91c1c'
  const toxic = '#4ade80'
  const warn = '#fbbf24'
  const ice = '#22d3ee'
  const voidBg = '#0a0a0b'
  const apps: Array<{ x: number; y: number; bw: number; bh: number; c: string; t: string; rot: number }> = [
    { x: 8, y: 14, bw: 88, bh: 52, c: '#3b82f6', t: 'S', rot: -5 },
    { x: 106, y: 6, bw: 94, bh: 50, c: ice, t: 'B', rot: 4 },
    { x: 208, y: 18, bw: 86, bh: 54, c: '#a855f7', t: 'W', rot: -3 },
    { x: 44, y: 108, bw: 96, bh: 54, c: warn, t: 'T', rot: 6 },
    { x: 166, y: 114, bw: 92, bh: 52, c: blood, t: '?', rot: -4 },
  ]

  const tf = (x: number, y: number, bw: number, bh: number, rot: number) => {
    const cx = x + bw / 2
    const cy = y + bh / 2
    return `translate(${cx},${cy}) rotate(${rot}) translate(${-cx},${-cy})`
  }

  const idNoise = `noiseCoach-${rid}`
  const idScan = `scanCoach-${rid}`
  const idVoid = `voidGrad-${rid}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[220px] overflow-visible ${className}`} aria-hidden>
      <defs>
        <filter id={idNoise} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.12 0" result="a" />
          <feBlend in="a" in2="SourceGraphic" mode="overlay" />
        </filter>
        <pattern id={idScan} width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="1.5" fill="rgba(255,255,255,0.04)" y="0" />
        </pattern>
        <linearGradient id={idVoid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1c1917" />
          <stop offset="100%" stopColor="#0c0a09" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width={w} height={h} rx="12" fill={`url(#${idVoid})`} />
      <rect x="0" y="0" width={w} height={h} rx="12" fill={`url(#${idScan})`} opacity={0.85} />
      <rect x="0" y="0" width={w} height={h} rx="12" fill="#000" opacity={0.2} filter={`url(#${idNoise})`} />

      {/* Horizontal fracture */}
      <path d="M12 96 L308 92" stroke="rgba(248,113,113,0.35)" strokeWidth={1} strokeDasharray="2 7" />

      {/* Jagged severed links */}
      <path
        d="M48 72 L62 88 L78 74 L92 96 L108 82 L128 98 L148 88 M198 68 L212 90 L228 76 L244 100 L260 84 M88 118 L104 132 L120 118 L138 128 M218 112 L232 130 L248 118"
        fill="none"
        stroke={blood}
        strokeWidth={1.8}
        strokeLinecap="square"
        strokeLinejoin="miter"
        opacity={0.9}
      />
      <path
        d="M50 74 L64 90 L80 76 L94 98 L110 84"
        fill="none"
        stroke={toxic}
        strokeWidth={0.8}
        opacity={0.45}
        transform="translate(2,0)"
      />

      {apps.map((a, i) => (
        <g key={i} transform={tf(a.x, a.y, a.bw, a.bh, a.rot)}>
          <rect x={a.x + 3} y={a.y + 2} width={a.bw} height={a.bh} rx={6} fill="none" stroke={blood} strokeWidth={1} opacity={0.4} />
          <rect x={a.x - 1} y={a.y} width={a.bw} height={a.bh} rx={6} fill="none" stroke={ice} strokeWidth={0.8} opacity={0.3} />
          <rect x={a.x} y={a.y} width={a.bw} height={a.bh} rx={6} fill={voidBg} stroke={a.c} strokeWidth={2} />
          <rect x={a.x} y={a.y} width={a.bw} height={13} rx={6} fill={`${a.c}40`} opacity={0.85} />
          <line x1={a.x + 4} y1={a.y + 22} x2={a.x + a.bw - 4} y2={a.y + 22} stroke="rgba(255,255,255,0.08)" strokeWidth={1} strokeDasharray="3 5" />
          <text
            x={a.x + a.bw / 2}
            y={a.y + 38}
            textAnchor="middle"
            style={{
              ...mono,
              fontSize: 15,
              fontWeight: 800,
              fill: a.t === '?' ? blood : '#f4f4f5',
              paintOrder: 'stroke',
              stroke: '#0a0a0a',
              strokeWidth: 3,
            }}
          >
            {a.t}
          </text>
        </g>
      ))}

      <text
        x={w / 2}
        y={h - 8}
        textAnchor="middle"
        style={{ ...mono, fontSize: 7, fontWeight: 700, letterSpacing: '0.32em', fill: blood, opacity: 0.95 }}
      >
        NO SYNC · FRAGMENTED
      </text>
    </svg>
  )
}

/** Base layer + synth layer + logo — detail lives in slide `features` slot */
export function IllustSolutionLayers({ className = '' }: { className?: string }) {
  const w = 300
  const h = 190
  const logo = 44
  const lx = (w - logo) / 2
  const ly = 6
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[220px] ${className}`} aria-hidden>
      <image href="/logos/synth-icon-green.svg" x={lx} y={ly} width={logo} height={logo} />
      <path d={`M ${w / 2} ${ly + logo + 2} L ${w / 2} 54`} stroke={THEME.border} strokeWidth={1.5} opacity={0.85} />

      <rect x={22} y={56} width={256} height={58} rx={10} fill={`${THEME.cyan}0d`} stroke={THEME.cyan} strokeWidth={2} />
      <text x={w / 2} y={78} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: THEME.cyan }}>
        SYNTH LAYER
      </text>
      <text x={w / 2} y={98} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textMuted }}>
        sync · unify · brief
      </text>

      <path d={`M ${w / 2} 116 L ${w / 2} 126`} stroke={THEME.border} strokeWidth={2} />

      <rect x={22} y={128} width={256} height={52} rx={10} fill={`${THEME.primary}12`} stroke={THEME.primary} strokeWidth={2} />
      <text x={w / 2} y={152} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: THEME.primaryDarker }}>
        BASE APP
      </text>
      <text x={w / 2} y={168} textAnchor="middle" style={{ fontFamily: THEME.fontSans, fontSize: 9, fill: THEME.textMuted }}>
        capture · publish
      </text>
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

/**
 * TAM / SAM / SOM as nested circles sharing a bottom baseline (reference: proportional “wedge” viz).
 * Tuned for dark slides — charcoal outer, emerald mid, bright SOM core.
 */
export function IllustMarketNestedBottom({ className = '' }: { className?: string }) {
  const rid = useId().replace(/:/g, '')
  const w = 420
  const h = 300
  const vbPadTop = 22
  const cx = 165
  const bottom = 268
  const rTam = 138
  const rSam = 76
  const rSom = 30
  const cyTam = bottom - rTam
  const cySam = bottom - rSam
  const cySom = bottom - rSom
  const monoStyle = { fontFamily: THEME.fontMono } as const
  const idGlow = `marketGlow-${rid}`
  const idGlowStrong = `marketGlowStrong-${rid}`

  return (
    <svg
      viewBox={`0 ${-vbPadTop} ${w} ${h + vbPadTop}`}
      className={`w-full max-w-[420px] max-h-[min(280px,38vh)] ${className}`}
      aria-hidden
    >
      <defs>
        <filter id={idGlow} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={idGlowStrong} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* TAM — largest; slight left bleed reads like reference crop */}
      <circle
        cx={cx}
        cy={cyTam}
        r={rTam}
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.40)"
        strokeWidth={2.5}
      />
      <text
        x={cx}
        y={cyTam - rTam * 0.35 + 10}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 12, fontWeight: 700, fill: 'rgba(255,255,255,0.55)', letterSpacing: '0.32em' }}
      >
        TAM
      </text>

      {/* SAM */}
      <circle
        cx={cx}
        cy={cySam}
        r={rSam}
        fill={`${THEME.primary}20`}
        stroke={`${THEME.primaryLight}cc`}
        strokeWidth={2.5}
        filter={`url(#${idGlow})`}
      />
      <text
        x={cx}
        y={cySam - 6}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 11, fontWeight: 700, fill: 'rgba(255,255,255,0.58)', letterSpacing: '0.28em' }}
      >
        SAM
      </text>

      {/* SOM — focal */}
      {/* Lift slightly so bottom tangency doesn't muddy the baseline */}
      <circle cx={cx} cy={cySom - 2} r={rSom + 3} fill="none" stroke={THEME.accent} strokeWidth={1.25} opacity={0.55} filter={`url(#${idGlow})`} />
      <circle
        cx={cx}
        cy={cySom - 2}
        r={rSom}
        fill="rgba(16,185,129,0.16)"
        stroke={THEME.accent}
        strokeWidth={3}
        filter={`url(#${idGlowStrong})`}
      />
      <text
        x={cx}
        y={cySom - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ ...monoStyle, fontSize: 10, fontWeight: 800, fill: THEME.accent, letterSpacing: '0.32em' }}
      >
        SOM
      </text>
    </svg>
  )
}

/**
 * Hero-scale nested TAM/SAM/SOM for split Market slide: geometry biased so circles read as
 * emerging from the left (wide radii, center offset).
 */
export function IllustMarketBleedLeft({ className = '' }: { className?: string }) {
  const vbX = -260
  const vbY = 0
  const vbW = 620
  const vbH = 380
  const cx = 95
  const bottom = 348
  const rTam = 228
  const rSam = 128
  const rSom = 52
  const cyTam = bottom - rTam
  const cySam = bottom - rSam
  const cySom = bottom - rSom
  const monoStyle = { fontFamily: THEME.fontMono } as const

  return (
    <svg
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      className={`h-[min(78vh,620px)] w-auto min-h-[min(52vh,420px)] max-w-none ${className}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <circle
        cx={cx}
        cy={cyTam}
        r={rTam}
        fill="rgba(255,255,255,0.045)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={2.5}
      />
      <text
        x={cx + 28}
        y={cyTam - rTam * 0.22}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 32, fontWeight: 700, fill: 'rgba(255,255,255,0.94)', letterSpacing: '-0.04em' }}
      >
        $4.2B+
      </text>
      <text
        x={cx + 28}
        y={cyTam - rTam * 0.22 + 22}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 12, fontWeight: 600, fill: 'rgba(255,255,255,0.42)', letterSpacing: '0.22em' }}
      >
        TAM
      </text>

      <circle
        cx={cx}
        cy={cySam}
        r={rSam}
        fill={`${THEME.primary}28`}
        stroke={`${THEME.primary}90`}
        strokeWidth={2.5}
      />
      <text
        x={cx + 12}
        y={cySam - 2}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 22, fontWeight: 700, fill: '#fff', letterSpacing: '-0.03em' }}
      >
        $890M
      </text>
      <text
        x={cx + 12}
        y={cySam + 22}
        textAnchor="middle"
        style={{ fontFamily: THEME.fontSans, fontSize: 11, fill: 'rgba(255,255,255,0.52)' }}
      >
        US collegiate
      </text>

      <circle cx={cx} cy={cySom} r={rSom + 3} fill="none" stroke={THEME.accent} strokeWidth={1.5} opacity={0.4} />
      <circle cx={cx} cy={cySom} r={rSom} fill="rgba(16,185,129,0.22)" stroke={THEME.accent} strokeWidth={3} />
      <text
        x={cx}
        y={cySom + 7}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 20, fontWeight: 700, fill: '#fff', letterSpacing: '-0.04em' }}
      >
        $24M
      </text>
      <text
        x={cx}
        y={cySom + 30}
        textAnchor="middle"
        style={{ ...monoStyle, fontSize: 11, fontWeight: 700, fill: THEME.accent, letterSpacing: '0.2em' }}
      >
        SOM
      </text>
    </svg>
  )
}

/**
 * Airbnb-style stacked bullseye (concentric filled disks) for Market slide: reads as thick
 * outer band → emerald mid → bright core. Biased left so it bleeds off the slide edge.
 */
export function IllustMarketBullseyeBleedLeft({ className = '' }: { className?: string }) {
  const rid = useId().replace(/:/g, '')
  // Keep the full outer disk visible in the slide column.
  const cx = 210
  const cy = 230
  const rTam = 236
  const rSam = 142
  const rSom = 68
  const vbX = -10
  const vbY = -80
  const vbW = 560
  const vbH = 560
  const idTam = `bull-tam-${rid}`
  const idSam = `bull-sam-${rid}`
  const idSom = `bull-som-${rid}`
  const idSpec = `bull-spec-${rid}`
  const idVig = `bull-vig-${rid}`
  const idTamRim = `bull-tam-rim-${rid}`
  const idSamRim = `bull-sam-rim-${rid}`
  const idInnerWall = `bull-innerwall-${rid}`
  const idInnerShadow = `bull-innershadow-${rid}`
  const idSoft = `bull-soft-${rid}`
  const dx = 18
  const dy = 16

  return (
    <svg
      viewBox={`${vbX} ${vbY} ${vbW} ${vbH}`}
      className={`h-[min(84vh,700px)] w-auto min-h-[min(46vh,360px)] max-w-none ${className}`}
      preserveAspectRatio="xMinYMid meet"
      aria-hidden
    >
      <defs>
        {/* Outer charcoal disk */}
        <radialGradient id={idTam} cx="30%" cy="24%" r="78%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="18%" stopColor={THEME.darkMid} />
          <stop offset="62%" stopColor={THEME.dark} />
          <stop offset="100%" stopColor={THEME.darkDeep} />
        </radialGradient>

        {/* Mid emerald disk */}
        <radialGradient id={idSam} cx="30%" cy="26%" r="74%">
          <stop offset="0%" stopColor={THEME.primaryLight} stopOpacity={0.55} />
          <stop offset="26%" stopColor={THEME.primary} stopOpacity={0.98} />
          <stop offset="78%" stopColor={THEME.primaryDark} stopOpacity={1} />
          <stop offset="100%" stopColor={THEME.primaryDarker} stopOpacity={1} />
        </radialGradient>

        {/* Core (brighter) */}
        <radialGradient id={idSom} cx="28%" cy="24%" r="70%">
          <stop offset="0%" stopColor={THEME.white} stopOpacity={0.95} />
          <stop offset="34%" stopColor={THEME.primaryLight} stopOpacity={0.96} />
          <stop offset="100%" stopColor={THEME.accent} stopOpacity={0.95} />
        </radialGradient>

        {/* Specular highlight (top-left) */}
        <radialGradient id={idSpec} cx="26%" cy="22%" r="48%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={0.65} />
          <stop offset="35%" stopColor="#ffffff" stopOpacity={0.16} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
        </radialGradient>

        {/* Vignette for depth */}
        <radialGradient id={idVig} cx="55%" cy="55%" r="70%">
          <stop offset="0%" stopColor="#000000" stopOpacity={0} />
          <stop offset="72%" stopColor="#000000" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#000000" stopOpacity={0.38} />
        </radialGradient>

        {/* Rim highlights to mimic a beveled edge */}
        <radialGradient id={idTamRim} cx="28%" cy="24%" r="82%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.02)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={idSamRim} cx="30%" cy="26%" r="78%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.14)" />
          <stop offset="42%" stopColor="rgba(255,255,255,0.06)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>

        {/* Inner wall light + shadow for the donut cavity */}
        <radialGradient id={idInnerWall} cx="40%" cy="32%" r="72%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="45%" stopColor="rgba(0,0,0,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.42)" />
        </radialGradient>
        <radialGradient id={idInnerShadow} cx="55%" cy="58%" r="74%">
          <stop offset="0%" stopColor="rgba(0,0,0,0)" />
          <stop offset="55%" stopColor="rgba(0,0,0,0.22)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>

        <filter id={idSoft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx={cx} cy={cy + rTam * 0.86} rx={rTam * 0.86} ry={rTam * 0.11} fill={THEME.darkDeep} opacity={0.55} />

      {/* Back "thickness" layers (offset down-right) */}
      <circle cx={cx + dx} cy={cy + dy} r={rTam} fill="rgba(0,0,0,0.55)" />
      <circle cx={cx + dx} cy={cy + dy} r={rSam} fill="rgba(0,0,0,0.35)" />

      {/* Front faces */}
      <circle cx={cx} cy={cy} r={rTam} fill={`url(#${idTam})`} />
      <circle cx={cx} cy={cy} r={rSam} fill={`url(#${idSam})`} />

      {/* Donut cavity for the mid ring (cutout + inner wall shading) */}
      <path
        d={[
          `M ${cx + rSam} ${cy}`,
          `A ${rSam} ${rSam} 0 1 0 ${cx - rSam} ${cy}`,
          `A ${rSam} ${rSam} 0 1 0 ${cx + rSam} ${cy}`,
          `M ${cx + rSom} ${cy}`,
          `A ${rSom} ${rSom} 0 1 1 ${cx - rSom} ${cy}`,
          `A ${rSom} ${rSom} 0 1 1 ${cx + rSom} ${cy}`,
        ].join(' ')}
        fill={`url(#${idInnerWall})`}
        fillRule="evenodd"
        opacity={0.95}
      />

      {/* Core sphere */}
      <circle cx={cx} cy={cy} r={rSom} fill={`url(#${idSom})`} />

      {/* Lighting overlays */}
      <circle cx={cx} cy={cy} r={rTam} fill={`url(#${idVig})`} opacity={0.9} />
      <circle cx={cx - rTam * 0.14} cy={cy - rTam * 0.18} r={rTam * 0.72} fill={`url(#${idSpec})`} />
      <circle cx={cx} cy={cy} r={rTam} fill={`url(#${idTamRim})`} opacity={0.9} />
      <circle cx={cx} cy={cy} r={rSam} fill={`url(#${idSamRim})`} opacity={0.9} />
      <circle cx={cx} cy={cy} r={rSam} fill={`url(#${idInnerShadow})`} opacity={0.55} />
      <circle cx={cx - rSom * 0.22} cy={cy - rSom * 0.26} r={rSom * 0.62} fill="rgba(255,255,255,0.22)" filter={`url(#${idSoft})`} />

      {/* Ring edges */}
      <circle cx={cx} cy={cy} r={rTam} fill="none" stroke="rgba(255,255,255,0.09)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={rSam} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={rSom} fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth={1} />

      {/* Small anchor dots where leader lines land (right side of each ring) */}
      <circle cx={cx + rTam} cy={cy - rTam * 0.22} r={3} fill="rgba(255,255,255,0.55)" />
      <circle cx={cx + rSam} cy={cy + 4} r={3} fill={THEME.primaryLight} />
      <circle cx={cx + rSom} cy={cy + rSom * 0.18} r={3} fill={THEME.accent} />
    </svg>
  )
}

/** Market rings — TAM / SAM / SOM (outer → inner); larger canvas for slide prominence */
export function IllustMarketRings({ className = '' }: { className?: string }) {
  const rid = useId().replace(/:/g, '')
  const w = 380
  const h = 340
  const cx = w / 2
  const cy = 158
  const rTam = 132
  const rSam = 96
  const rSom = 58
  const sub = 'rgba(255,255,255,0.5)'
  const idGlow = `somGlow-${rid}`
  const idSomFill = `somFill-${rid}`

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={`w-full max-h-[min(360px,42vh)] min-h-[200px] ${className}`} aria-hidden>
      <defs>
        <radialGradient id={idSomFill} cx="50%" cy="45%" r="65%">
          <stop offset="0%" stopColor={THEME.accent} stopOpacity={0.22} />
          <stop offset="55%" stopColor={THEME.primary} stopOpacity={0.12} />
          <stop offset="100%" stopColor="#0c0a09" stopOpacity={0} />
        </radialGradient>
        <filter id={idGlow} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* TAM — outer */}
      <circle cx={cx} cy={cy} r={rTam} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={2} />
      <text x={cx} y={cy - rTam - 14} textAnchor="middle" style={{ ...mono, fontSize: 13, fontWeight: 700, fill: '#fff', letterSpacing: '-0.03em' }}>
        $4.2B+
      </text>
      <text x={cx} y={cy - rTam + 2} textAnchor="middle" style={{ ...mono, fontSize: 10, fontWeight: 600, fill: sub, letterSpacing: '0.14em' }}>
        TAM
      </text>

      {/* SAM — middle */}
      <circle cx={cx} cy={cy} r={rSam} fill={`${THEME.primary}08`} stroke={`${THEME.primary}55`} strokeWidth={2} />
      <text x={cx - rSam - 10} y={cy - 6} textAnchor="end" style={{ ...mono, fontSize: 12, fontWeight: 700, fill: '#fff' }}>
        $890M
      </text>
      <text x={cx - rSam - 10} y={cy + 10} textAnchor="end" style={{ ...mono, fontSize: 9, fontWeight: 600, fill: sub, letterSpacing: '0.12em' }}>
        SAM
      </text>

      {/* SOM — inner focus */}
      <circle cx={cx} cy={cy} r={rSom + 6} fill="none" stroke={THEME.accent} strokeWidth={1} opacity={0.35} filter={`url(#${idGlow})`} />
      <circle cx={cx} cy={cy} r={rSom} fill={`url(#${idSomFill})`} stroke={THEME.accent} strokeWidth={3.5} filter={`url(#${idGlow})`} />
      <text x={cx} y={cy + 2} textAnchor="middle" style={{ ...mono, fontSize: 22, fontWeight: 700, fill: '#fff', letterSpacing: '-0.04em' }}>
        $24M
      </text>
      <text x={cx} y={cy + 22} textAnchor="middle" style={{ ...mono, fontSize: 11, fontWeight: 700, fill: THEME.accent, letterSpacing: '0.16em' }}>
        SOM
      </text>

      <text
        x={cx}
        y={h - 18}
        textAnchor="middle"
        style={{ ...mono, fontSize: 9, fontWeight: 600, letterSpacing: '0.12em', fill: 'rgba(255,255,255,0.38)' }}
      >
        ROWING · YEAR-ONE WEDGE
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

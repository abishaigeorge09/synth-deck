import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028] as const

const SERIES = [
  {
    key: 'data',
    label: 'Data per athlete',
    color: '#10B981',
    values: [5, 8, 15, 30, 60, 100, 180, 320, 500],
  },
  {
    key: 'spend',
    label: 'Athlete spend per program',
    color: '#06B6D4',
    values: [50, 60, 75, 95, 120, 450, 850, 1200, 1500],
  },
  {
    key: 'tools',
    label: 'Disconnected tools per staff',
    color: '#F59E0B',
    values: [2, 3, 4, 5, 5, 6, 8, 10, 12],
  },
] as const

const SVG_W = 1100
const SVG_H = 520
const PAD_L = 96
const PAD_R = 36
const PAD_T = 50
const PAD_B = 126
const PLOT_W = SVG_W - PAD_L - PAD_R
const PLOT_H = SVG_H - PAD_T - PAD_B

function normalize(values: readonly number[]) {
  const base = values[0] || 1
  const indexed = values.map((v) => v / base)
  const max = Math.max(...indexed)
  return indexed.map((v) => (v / max) * 100)
}

function buildPath(points: Array<{ x: number; y: number }>) {
  return points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
}

export function S06_WhyNow({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 80)
    return () => window.clearTimeout(id)
  }, [])

  const chart = useMemo(() => {
    return SERIES.map((series) => {
      const normalized = normalize(series.values)
      const points = normalized.map((value, idx) => {
        const x = PAD_L + (idx / (YEARS.length - 1)) * PLOT_W
        const y = PAD_T + ((100 - value) / 100) * PLOT_H
        return { x, y, value }
      })
      return {
        ...series,
        points,
        d: buildPath(points),
      }
    })
  }, [])

  const windowStartX = PAD_L + (5 / (YEARS.length - 1)) * PLOT_W
  const windowEndX = PAD_L + (6 / (YEARS.length - 1)) * PLOT_W

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: '#050505',
        padding: '44px 44px 34px',
      }}
    >
      <TopNav section={sectionOverride ?? '05 · WHY NOW'} page={pageOverride ?? '12 / 19'} tone="dark" />

      <h1
        className="mt-16 text-[clamp(34px,4.4vw,56px)] font-bold leading-[1.02] tracking-[-0.05em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.white }}
      >
        Three forces. One moment.
      </h1>

      <p
        className="mt-4 max-w-[62rem] text-[16px] leading-[1.55]"
        style={{ fontFamily: THEME.fontSans, color: '#A1A1AA' }}
      >
        Athlete data, program spending, and coaching tool count all hit their inflection point in 2025. The synthesis layer doesn&apos;t exist yet.
      </p>

      <div className="mt-10 flex min-h-0 flex-1 items-center justify-center">
        <div className="w-full max-w-[1180px]">
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="h-auto w-full overflow-visible">
            <style>{`
              .trend-line {
                transition: filter 180ms ease;
              }
              .trend-series:hover .trend-line {
                filter: var(--hover-filter);
              }
            `}</style>
            <defs>
              {chart.map((series) => (
                <filter key={series.key} id={`glow-${series.key}`} x="-30%" y="-30%" width="160%" height="160%">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor={series.color} floodOpacity="0.3" />
                </filter>
              ))}
            </defs>

            {[0, 25, 50, 75, 100].map((tick) => {
              const y = PAD_T + ((100 - tick) / 100) * PLOT_H
              return (
                <g key={tick}>
                  <line x1={PAD_L} x2={SVG_W - PAD_R} y1={y} y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <text
                    x={PAD_L - 14}
                    y={y + 4}
                    textAnchor="end"
                    style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.42)' }}
                  >
                    {tick}
                  </text>
                </g>
              )
            })}

            {YEARS.map((year, idx) => {
              const x = PAD_L + (idx / (YEARS.length - 1)) * PLOT_W
              return (
                <g key={year}>
                  <line x1={x} x2={x} y1={PAD_T} y2={PAD_T + PLOT_H} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                  <text
                    x={x}
                    y={SVG_H - 66}
                    textAnchor="middle"
                    style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.55)' }}
                  >
                    {year}
                  </text>
                </g>
              )
            })}

            <text
              x={18}
              y={PAD_T - 14}
              style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.55)' }}
            >
              Growth index · 2020 = baseline
            </text>

            <g
              style={{
                opacity: mounted ? 1 : 0,
                transition: 'opacity 500ms ease 2600ms',
              }}
            >
              <rect
                x={windowStartX}
                y={PAD_T}
                width={windowEndX - windowStartX}
                height={PLOT_H}
                fill="rgba(255,255,255,0.08)"
              />
              <text
                x={(windowStartX + windowEndX) / 2}
                y={PAD_T - 16}
                textAnchor="middle"
                style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: '#10B981', letterSpacing: '0.12em' }}
              >
                THE SYNTH. WINDOW
              </text>
            </g>

            {chart.map((series, idx) => {
              const lineLength = 1600
              return (
                <g
                  key={series.key}
                  className="trend-series cursor-default"
                  style={{ '--hover-filter': `url(#glow-${series.key})` } as CSSProperties}
                >
                  <path
                    d={series.d}
                    className="trend-line"
                    fill="none"
                    stroke={series.color}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      strokeDasharray: lineLength,
                      strokeDashoffset: mounted ? 0 : lineLength,
                      transition: `stroke-dashoffset 2000ms cubic-bezier(0.22,1,0.36,1) ${idx * 200}ms`,
                    }}
                  />
                  {series.points.map((point, pointIdx) => (
                    <circle
                      key={pointIdx}
                      cx={point.x}
                      cy={point.y}
                      r="3"
                      fill={series.color}
                      style={{
                        opacity: mounted ? 1 : 0,
                        transition: `opacity 300ms ease ${700 + idx * 200 + pointIdx * 60}ms`,
                      }}
                    />
                  ))}
                </g>
              )
            })}

            <g transform={`translate(${PAD_L}, ${SVG_H - 34})`}>
              <g transform="translate(0, 0)">
                <circle cx="0" cy="0" r="4" fill={chart[0].color} />
                <text
                  x="12"
                  y="4"
                  style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.78)' }}
                >
                  {chart[0].label}
                </text>
              </g>
              <g transform="translate(255, 0)">
                <circle cx="0" cy="0" r="4" fill={chart[1].color} />
                <text
                  x="12"
                  y="4"
                  style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.78)' }}
                >
                  {chart[1].label}
                </text>
              </g>
              <g transform="translate(510, 0)">
                <circle cx="0" cy="0" r="4" fill={chart[2].color} />
                <text
                  x="12"
                  y="4"
                  style={{ fontFamily: THEME.fontMono, fontSize: 11, fill: 'rgba(255,255,255,0.78)' }}
                >
                  {chart[2].label}
                </text>
              </g>
            </g>

            <text
              x={SVG_W - PAD_R}
              y={SVG_H - 8}
              textAnchor="end"
              style={{ fontFamily: THEME.fontMono, fontSize: 10, fill: 'rgba(255,255,255,0.28)' }}
            >
              Sources: WHOOP, Catapult, Concept2, House v. NCAA, Teamworks · 2025
            </text>
          </svg>
        </div>
      </div>
    </div>
  )
}

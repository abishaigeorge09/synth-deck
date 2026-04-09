import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

/** Concentric market rings · single hue, subtle fills (no rainbow). */
function NestedMarketRings() {
  const cx = 100
  const cy = 100
  const rings = [
    { r: 86, stroke: 'rgba(255,255,255,0.14)', fill: 'rgba(255,255,255,0.03)' },
    { r: 58, stroke: 'rgba(255,255,255,0.18)', fill: `${THEME.primary}10` },
    { r: 30, stroke: `${THEME.primary}55`, fill: `${THEME.primary}14` },
  ]
  return (
    <svg viewBox="0 0 200 200" className="w-[min(260px,32vw)] h-auto mx-auto block" aria-hidden>
      {rings.map((ring) => (
        <circle key={ring.r} cx={cx} cy={cy} r={ring.r} fill={ring.fill} stroke={ring.stroke} strokeWidth={1.25} />
      ))}
      <text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fill="rgba(255,255,255,0.9)"
        style={{ fontFamily: THEME.fontMono, fontSize: 12, fontWeight: 700 }}
      >
        $24M
      </text>
    </svg>
  )
}

export function S07_Market() {
  const cadenceMonths = [0, 2, 4, 6, 8, 10, 12]
  const tickLabels = ['Rowing', '+1 sport', '+1 sport', '+1 sport', 'Water cluster', 'Scale', 'Y2 sports']

  return (
    <div className="absolute inset-0 flex flex-col text-white" style={{ padding: '48px 56px 40px' }}>
      <TopNav section="06 · MARKET" page="7 / 13" />

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full max-w-[1100px] mx-auto">
        <h1
          className="text-center text-[42px] leading-[1.08] font-bold max-w-[920px]"
          style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.055em' }}
        >
          Start with rowing. Scale to every sport.
        </h1>
        <p className="mt-4 text-center text-[14px] leading-[1.5] max-w-[640px] text-white/55" style={{ fontFamily: THEME.fontSans }}>
          One synthesis engine. Each sport gets a thin base app; we widen the wedge before we blanket collegiate and pro.
        </p>

        {/* TAM / SAM / SOM · nested diagram + legend (no loud circle trio) */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-14">
          <NestedMarketRings />
          <div className="text-left space-y-4 min-w-[240px]">
            {[
              { k: 'TAM', v: '$4.2B+', d: 'Global programs juggling fragmented performance stacks' },
              { k: 'SAM', v: '$890M', d: 'US collegiate · 12K+ programs, 3+ tools each' },
              { k: 'SOM', v: '$24M', d: 'US collegiate rowing · high pain, no direct competitor' },
            ].map((row) => (
              <div key={row.k} className="flex gap-4">
                <div
                  className="w-9 shrink-0 text-[10px] font-bold tracking-[0.14em] pt-0.5"
                  style={{ fontFamily: THEME.fontMono, color: 'rgba(255,255,255,0.4)' }}
                >
                  {row.k}
                </div>
                <div>
                  <div className="text-[22px] font-bold tabular-nums leading-none" style={{ fontFamily: THEME.fontMono, color: 'rgba(255,255,255,0.92)' }}>
                    {row.v}
                  </div>
                  <div className="mt-1 text-[12px] leading-snug text-white/55" style={{ fontFamily: THEME.fontSans }}>
                    {row.d}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How every 8 weeks works */}
        <div className="mt-12 w-full max-w-[840px]">
          <p className="text-center text-[11px] tracking-[0.16em] uppercase text-white/40 font-semibold" style={{ fontFamily: THEME.fontMono }}>
            Ship cadence · every 8 weeks
          </p>
          <p className="mt-2 text-center text-[13px] text-white/60 max-w-[720px] mx-auto leading-[1.45]" style={{ fontFamily: THEME.fontSans }}>
            Fork the rowing base → sport-specific schema + UI deltas → deploy to that program cluster. Same pipeline, next sport slot, roughly every two
            months, not a six-month blackout.
          </p>

          {/* Month ticks 0–12 (every 2 mo) · neutral rail, first milestone accented */}
          <div className="mt-6 w-full">
            <div className="relative grid grid-cols-7 gap-0 pt-3">
              <div className="absolute left-0 right-0 top-[10px] h-px bg-white/12 pointer-events-none" />
              {cadenceMonths.map((m, i) => (
                <div key={m} className="flex flex-col items-center relative z-10 text-center px-0.5">
                  <div
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      background: i === 0 ? THEME.primary : 'rgba(255,255,255,0.22)',
                      boxShadow: i === 0 ? `0 0 0 3px ${THEME.primary}30` : 'none',
                    }}
                  />
                  <div className="mt-3 text-[9px] font-mono tabular-nums text-white/38">M{m}</div>
                  <div className="mt-1 text-[9px] leading-[1.25] text-white/48" style={{ fontFamily: THEME.fontSans }}>
                    {tickLabels[i]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-[12px] text-white/45 max-w-[680px] leading-[1.5]" style={{ fontFamily: THEME.fontSerif, fontStyle: 'italic' }}>
          Same synthesis engine. Different sport-specific base apps, rolled out on a fixed drumbeat.
        </div>
      </div>
    </div>
  )
}

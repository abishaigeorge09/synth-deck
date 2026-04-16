import { THEME } from '../lib/theme'

const BOATS = [
  { id: 1, label: 'Boat 1', mode: '8+', port: ['M', 'S', '—', '—'], stbd: ['L', '—', '—', 'S'], status: 'Not assigned · tap seat' },
  { id: 2, label: 'Boat 2', mode: '8+', port: ['—', '—', '—', '—'], stbd: ['T', '—', '—', '—'], status: 'Draft' },
] as const

function BoatSilhouette({
  label,
  mode,
  port,
  stbd,
  status,
}: {
  label: string
  mode: string
  port: readonly string[]
  stbd: readonly string[]
  status: string
}) {
  const Seat = ({ s, emphasize }: { s: string; emphasize: boolean }) => (
    <div
      className="flex h-8 w-8 items-center justify-center rounded-full border text-[8px] font-bold"
      style={{
        fontFamily: THEME.fontMono,
        borderColor: s === '—' ? 'rgba(24,24,27,0.14)' : emphasize ? THEME.primary : `${THEME.primary}aa`,
        background: s === '—' ? '#ffffff' : `${THEME.primary}12`,
        color: s === '—' ? THEME.textMuted : THEME.textPrimary,
        boxShadow: s === '—' ? 'inset 0 1px 0 rgba(0,0,0,0.03)' : `0 10px 22px ${THEME.primary}14`,
      }}
    >
      {s}
    </div>
  )

  return (
    <div
      className="relative overflow-hidden border bg-gradient-to-b from-white to-zinc-50"
      style={{
        borderColor: THEME.border,
        borderRadius: 24,
        clipPath: 'polygon(18% 0%, 82% 0%, 92% 12%, 96% 26%, 96% 74%, 92% 88%, 82% 100%, 18% 100%, 8% 88%, 4% 74%, 4% 26%, 8% 12%)',
        boxShadow: '0 1px 0 rgba(24,24,27,0.02), 0 10px 26px rgba(24,24,27,0.10)',
      }}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-12" style={{ background: `linear-gradient(180deg, ${THEME.primary}10, transparent)` }} />
        <div className="absolute inset-x-8 top-[54px] h-px" style={{ background: 'rgba(24,24,27,0.06)' }} />
      </div>

      <div className="relative flex min-h-[228px] flex-col px-4 py-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
            {label}
          </span>
          <span className="text-[7px] font-semibold text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            {mode}
          </span>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-2 gap-5">
          <div className="flex flex-col items-center">
            <div className="text-[6px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: '#dc2626' }}>
              Port
            </div>
            <div className="mt-2.5 flex flex-col items-center gap-2.5">
              {port.map((s, i) => (
                <Seat key={`p-${i}`} s={s} emphasize={s !== '—'} />
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="text-[6px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
              Stbd
            </div>
            <div className="mt-2.5 flex flex-col items-center gap-2.5">
              {stbd.map((s, i) => (
                <Seat key={`s-${i}`} s={s} emphasize={s !== '—'} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-2 text-center text-[7px] text-zinc-400" style={{ fontFamily: THEME.fontSans }}>
          {status}
        </div>
      </div>
    </div>
  )
}

/** Generated lineup UI (ROW IQ–inspired, no screenshot). */
export function LineupBoardMockup() {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden p-2.5">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: THEME.border }}>
        <div className="flex gap-1">
          {(['1x', '2x', '4+', '8+'] as const).map((m) => (
            <span
              key={m}
              className="rounded-md border px-2 py-0.5 text-[8px] font-semibold"
              style={{
                fontFamily: THEME.fontMono,
                borderColor: m === '8+' ? THEME.primary : THEME.border,
                background: m === '8+' ? `${THEME.primary}14` : '#fff',
                color: m === '8+' ? THEME.primaryDark : THEME.textMuted,
              }}
            >
              {m}
            </span>
          ))}
        </div>
        <span className="text-[8px] font-semibold text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          BOATS · US
        </span>
      </div>

      <p className="mt-2 text-[8px] leading-snug text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
        Drag to assign — same athlete IDs as Team Overview. Not assigned slots stay open.
      </p>

      <div className="mt-2.5 grid min-h-0 flex-1 grid-cols-1 gap-2.5 sm:grid-cols-2">
        {BOATS.map((b) => (
          <BoatSilhouette key={b.id} label={b.label} mode={b.mode} port={b.port} stbd={b.stbd} status={b.status} />
        ))}
      </div>

      <div className="mt-2 flex shrink-0 items-center justify-end border-t pt-2" style={{ borderColor: THEME.border }}>
        <button
          type="button"
          className="rounded-md px-3 py-2 text-[9px] font-bold uppercase tracking-wider"
          style={{
            fontFamily: THEME.fontMono,
            background: THEME.primary,
            color: THEME.white,
            boxShadow: `0 12px 28px ${THEME.primary}33`,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Publish lineup
        </button>
      </div>
    </div>
  )
}

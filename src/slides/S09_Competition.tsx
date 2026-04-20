import { PixelArt } from '../components/PixelArt'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const SYNTH_LOGO_SRC = '/logos/synth-icon-green.svg'

/** Top padding clears TopNav; horizontal gutter matches `TopNav` GUTTER_X. */
const PAD = 'clamp(52px, 6.5vh, 76px) clamp(24px, 4vw, 56px) clamp(18px, 2.8vh, 36px)'

const PANEL = {
  border: 'rgba(255,255,255,0.11)',
  bg: 'rgba(255,255,255,0.035)',
  rowLine: 'rgba(255,255,255,0.07)',
} as const

/** Set `logoSrc` when you add files under `public/logos/competition/`. */
export type CompetitorRowDef = {
  name: string
  desc: string
  logoSrc?: string
  checks: Array<boolean | string>
}

function CompetitorCell({ row }: { row: CompetitorRowDef }) {
  return (
    <td className="align-middle px-4 py-4 sm:px-5 sm:py-[1.125rem]">
      <div className="flex items-start gap-3">
        {row.logoSrc ? (
          <img src={row.logoSrc} alt="" className="mt-0.5 h-8 w-auto max-w-[100px] shrink-0 object-contain opacity-95" />
        ) : null}
        <div className="min-w-0 pr-2">
          <div className="text-[13px] font-semibold leading-snug text-white/92" style={{ fontFamily: THEME.fontSans }}>
            {row.name}
          </div>
          <div className="mt-1 text-[10px] leading-[1.45] text-white/48" style={{ fontFamily: THEME.fontSans }}>
            {row.desc}
          </div>
        </div>
      </div>
    </td>
  )
}

function CheckCell({ c }: { c: boolean | string }) {
  return (
    <td className="align-middle px-2 py-4 text-center sm:px-3 sm:py-[1.125rem]" style={{ fontFamily: THEME.fontMono }}>
      {c === true ? (
        <span className="text-[15px]" style={{ color: THEME.accent }}>
          ✓
        </span>
      ) : c === false ? (
        <span className="text-[14px] text-white/22">✗</span>
      ) : (
        <span className="text-[11px] leading-tight text-white/55">{c}</span>
      )}
    </td>
  )
}

const COMPETITORS: CompetitorRowDef[] = [
  { name: 'TeamWorks', desc: 'Team communication & scheduling', checks: [false, false, false, false] },
  { name: 'Hudl', desc: 'Video analysis (football, basketball)', checks: [false, false, 'Partial', false] },
  { name: 'Bridge Athletics', desc: 'Gym & strength tracking', checks: [false, false, false, false] },
  { name: 'TrainingPeaks', desc: 'Endurance training plans', checks: ['Endurance', false, 'Partial', false] },
  { name: 'Catapult / STATSports', desc: 'GPS wearables for team sports', checks: [false, false, false, false] },
  { name: 'Sheets + GroupMe', desc: 'The actual incumbent', checks: [false, false, false, false] },
]

export function S09_Competition({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden text-white" style={{ padding: PAD }}>
      <PixelArt pattern="scatter" seed={93} color="#000000" opacity={0.08} />
      <TopNav section={sectionOverride ?? '08 · COMPETITION'} page={pageOverride ?? '9 / 13'} />

      <header className="shrink-0 pt-1">
        <h1
          className="text-[clamp(32px,min(8vw,9vh),68px)] font-bold uppercase leading-[0.96] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.white }}
        >
          COMPETITION
        </h1>
        <p
          className="mt-3 max-w-[40rem] text-[clamp(18px,2.6vw,28px)] font-semibold leading-[1.2] tracking-[-0.02em] text-white/88 sm:mt-4"
          style={{ fontFamily: THEME.fontSerif, fontStyle: 'italic' }}
        >
          No one connects it all.
        </p>
      </header>

      {/* min-h-full + justify-center vertically balances the table when the viewport is tall */}
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-5">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="flex min-h-full w-full flex-col justify-center py-2">
            <div
              className="mx-auto w-full max-w-[1080px] rounded-2xl border"
              style={{
                borderColor: PANEL.border,
                background: PANEL.bg,
                boxShadow: '0 24px 48px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] table-fixed border-collapse">
                  <colgroup>
                    <col style={{ width: '36%' }} />
                    <col style={{ width: '16%' }} />
                    <col style={{ width: '16%' }} />
                    <col style={{ width: '16%' }} />
                    <col style={{ width: '16%' }} />
                  </colgroup>
                  <thead>
                    <tr
                      className="text-[10px] uppercase tracking-[0.18em] text-white/50"
                      style={{ fontFamily: THEME.fontMono, borderBottom: `1px solid ${PANEL.rowLine}` }}
                    >
                      <th className="px-4 py-3.5 text-left sm:px-5">Competitor</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Sport-specific</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Connects tools</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">One view</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Auto-updates</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        borderTop: `1px solid ${PANEL.rowLine}`,
                        background: `linear-gradient(90deg, ${THEME.accent}14 0%, rgba(255,255,255,0.02) 55%)`,
                      }}
                    >
                      <td className="align-middle px-4 py-4 sm:px-5 sm:py-[1.125rem]">
                        <div className="flex items-center gap-3">
                          <img src={SYNTH_LOGO_SRC} alt="" className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10" />
                          <div className="min-w-0">
                            <div className="text-[15px] font-bold sm:text-[16px]" style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>
                              synth.
                            </div>
                            <div className="mt-1 text-[10px] leading-snug text-white/58" style={{ fontFamily: THEME.fontSans }}>
                              Purpose-built synthesis
                            </div>
                          </div>
                        </div>
                      </td>
                      {[true, true, true, true].map((_, i) => (
                        <CheckCell key={i} c={true} />
                      ))}
                    </tr>
                    {COMPETITORS.map((row) => (
                      <tr key={row.name} style={{ borderTop: `1px solid ${PANEL.rowLine}` }}>
                        <CompetitorCell row={row} />
                        {row.checks.map((c, i) => (
                          <CheckCell key={i} c={c} />
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

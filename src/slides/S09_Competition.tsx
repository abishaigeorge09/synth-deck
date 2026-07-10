import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const SYNTH_LOGO_SRC = '/brand/synth-app-icon.png'

const PAD = 'clamp(52px, 6.5vh, 76px) clamp(24px, 4vw, 56px) clamp(18px, 2.8vh, 36px)'

export type CompetitorRowDef = {
  name: string
  desc: string
  checks: Array<boolean | string>
}

function CompetitorCell({ row }: { row: CompetitorRowDef }) {
  return (
    <td className="align-middle px-4 py-4 sm:px-5 sm:py-[1.125rem]">
      <div className="min-w-0 pr-2">
        <div className="text-[13px] font-semibold leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
          {row.name}
        </div>
        <div className="mt-1 text-[10.5px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
          {row.desc}
        </div>
      </div>
    </td>
  )
}

function CheckCell({ c }: { c: boolean | string }) {
  return (
    <td
      className="align-middle px-2 py-4 text-center sm:px-3 sm:py-[1.125rem]"
      style={{ fontFamily: THEME.fontMono }}
    >
      {c === true ? (
        <span className="text-[16px] font-bold" style={{ color: THEME.accent }}>
          ✓
        </span>
      ) : c === false ? (
        <span className="text-[14px]" style={{ color: THEME.textMuted, opacity: 0.55 }}>
          ✗
        </span>
      ) : (
        <span
          className="text-[11px] italic leading-tight"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
        >
          {c}
        </span>
      )}
    </td>
  )
}

const COMPETITORS: CompetitorRowDef[] = [
  { name: 'Teamworks AMS (Smartabase)', desc: 'Collegiate AMS, 700+ NCAA programs', checks: ['Partial', false, false, false] },
  { name: 'Kitman Labs', desc: '$82M raised, sports intelligence', checks: ['Partial', false, false, 'Partial'] },
  { name: 'Catapult', desc: 'GPS wearables, 600+ NCAA programs', checks: [false, false, false, false] },
  { name: 'Hudl', desc: 'Video analysis', checks: [false, false, false, false] },
  { name: 'TrainingPeaks', desc: 'Endurance coaching', checks: [false, false, false, false] },
  { name: 'Wearables (Whoop, Garmin, Oura)', desc: 'Single-device data', checks: [false, false, false, false] },
]

export function S09_Competition({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD, color: THEME.textPrimary }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '10 · COMPETITION'} page={pageOverride ?? ''} tone="light" />

      <header className="relative z-10 shrink-0 pt-1">
        <SectionLabel text={sectionOverride ?? '10 · COMPETITION'} />
        <h1
          className="mt-2 text-[clamp(40px,min(7.5vw,8.5vh),72px)] font-bold uppercase leading-[0.96] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Competition
        </h1>
        <p
          className="mt-3 max-w-[44rem] text-[clamp(18px,2.4vw,26px)] font-semibold italic leading-[1.2] tracking-[-0.02em] sm:mt-4"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textSecondary }}
        >
          No one connects it all.
        </p>
      </header>

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden pt-5">
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain">
          <div className="flex min-h-full w-full flex-col justify-center py-2">
            <div
              className="mx-auto w-full max-w-[1180px] overflow-hidden rounded-2xl border bg-white"
              style={{
                borderColor: THEME.border,
                boxShadow: '0 12px 36px rgba(24,24,27,0.08)',
              }}
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] table-fixed border-collapse">
                  <colgroup>
                    <col style={{ width: '34%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '15%' }} />
                    <col style={{ width: '17%' }} />
                    <col style={{ width: '19%' }} />
                  </colgroup>
                  <thead>
                    <tr
                      className="text-[9.5px] uppercase tracking-[0.16em]"
                      style={{
                        fontFamily: THEME.fontMono,
                        color: THEME.textMuted,
                        borderBottom: `1px solid ${THEME.border}`,
                      }}
                    >
                      <th className="px-4 py-3.5 text-left sm:px-5">Competitor</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Connects every tool</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Two-way sync</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">Custom tools on demand</th>
                      <th className="px-2 py-3.5 text-center sm:px-3">World model (predicts, not tracks)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      style={{
                        borderTop: `1px solid ${THEME.border}`,
                        background: `linear-gradient(90deg, ${THEME.accent}1A 0%, rgba(255,255,255,0) 70%)`,
                        borderLeft: `3px solid ${THEME.accent}`,
                      }}
                    >
                      <td className="align-middle px-4 py-4 sm:px-5 sm:py-[1.125rem]">
                        <div className="flex items-center gap-3">
                          <img src={SYNTH_LOGO_SRC} alt="" className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10" />
                          <div className="min-w-0">
                            <div className="text-[15px] font-bold sm:text-[16px]" style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>
                              synth.
                            </div>
                            <div className="mt-1 text-[10.5px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
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
                      <tr key={row.name} style={{ borderTop: `1px solid ${THEME.border}` }}>
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

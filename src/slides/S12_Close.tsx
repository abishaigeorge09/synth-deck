import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const ROWS: {
  num: string
  ask: string
  accent: string
  summary: string
  funds?: string[]
}[] = [
  {
    num: '01',
    ask: 'Partners & pilots',
    accent: THEME.primary,
    summary:
      'Coaches and programs still split across disconnected tools, help us shape the base app for your sport.',
  },
  {
    num: '02',
    ask: '$100k seed',
    accent: THEME.cyan,
    summary: 'Raising $100k to turn live traction into repeatable growth, clear use of funds, no mystery.',
    funds: ['Brand & marketing', 'AI & compute credits', 'Ops & infrastructure'],
  },
  {
    num: '03',
    ask: 'GTM / sales',
    accent: THEME.amber,
    summary:
      'A network into collegiate athletics, AD offices, coaching trees, conferences, to open doors while we ship.',
  },
]

export function S12_Close({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '44px 40px 32px', color: THEME.textPrimary, background: THEME.light }}>
      <TopNav section={sectionOverride ?? 'CLOSE'} page={pageOverride ?? '12 / 13'} tone="light" />

      <div className="flex-1 min-h-0 flex flex-col justify-center w-full max-w-[1200px] mx-auto">
        <div className="w-full min-h-0 flex flex-col">
          <h2
            className="text-[30px] font-bold tracking-[-0.04em] text-center"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            Our ask
          </h2>
          <p className="mt-1.5 text-center text-[12px] uppercase tracking-[0.16em] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Three ways to plug in
          </p>

          <div className="mt-5 rounded-2xl overflow-hidden w-full" style={{ border: `1px solid ${THEME.border}`, boxShadow: '0 8px 32px rgba(24,24,27,0.08)' }}>
            <table className="w-full border-collapse text-left" style={{ fontFamily: THEME.fontSans }}>
              <thead>
                <tr style={{ background: `${THEME.primary}10` }}>
                  <th
                    scope="col"
                    className="py-3.5 px-4 w-[68px] text-[11px] tracking-[0.14em] uppercase font-bold border-b"
                    style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker, borderColor: THEME.border }}
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-4 w-[min(30%,260px)] text-[11px] tracking-[0.14em] uppercase font-bold border-b"
                    style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker, borderColor: THEME.border }}
                  >
                    Ask
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-5 text-[11px] tracking-[0.14em] uppercase font-bold border-b"
                    style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker, borderColor: THEME.border }}
                  >
                    What we&apos;re looking for
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.num} style={{ background: THEME.white }}>
                    <td
                      className="align-top py-5 px-4 border-b font-bold text-[14px]"
                      style={{
                        fontFamily: THEME.fontMono,
                        color: row.accent,
                        borderColor: THEME.border,
                        borderLeft: `4px solid ${row.accent}`,
                      }}
                    >
                      {row.num}
                    </td>
                    <td
                      className="align-top py-5 px-4 border-b text-[18px] font-semibold leading-snug"
                      style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary, borderColor: THEME.border }}
                    >
                      {row.ask}
                    </td>
                    <td className="align-top py-5 px-5 border-b" style={{ borderColor: THEME.border }}>
                      <p className="text-[15px] leading-[1.62]" style={{ color: THEME.textSecondary }}>
                        {row.summary}
                      </p>
                      {row.funds ? (
                        <div className="mt-4 pt-4" style={{ borderTop: `1px dashed ${THEME.border}` }}>
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                            Use of funds
                          </div>
                          <ul className="space-y-1.5 text-[13px] leading-[1.45]" style={{ fontFamily: THEME.fontMono, color: THEME.textSecondary }}>
                            {row.funds.map((f) => (
                              <li key={f} className="flex gap-2">
                                <span style={{ color: row.accent }}>·</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

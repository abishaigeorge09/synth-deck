import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

type FundLine = {
  label: string
  pct: number
  amount: string
  color: string
}

const FUNDS: FundLine[] = [
  { label: 'Engineering', pct: 46, amount: '₹55,00,000', color: THEME.accent },
  { label: 'Marketing and growth', pct: 21, amount: '₹25,00,000', color: THEME.blue },
  { label: 'Legal and compliance', pct: 17, amount: '₹20,00,000', color: THEME.purple },
  { label: 'Outreach and sales', pct: 8, amount: '₹10,00,000', color: THEME.amber },
  { label: 'Operations', pct: 8, amount: '₹10,00,000', color: THEME.red },
]

export function S12b_RaisingIndia({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '44px 44px 32px', color: THEME.textPrimary, background: THEME.light }}
    >
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '15 · RAISING'} page={pageOverride ?? '16 / 18'} tone="light" />

      <div className="relative z-10 mx-auto mt-6 flex w-full min-h-0 max-w-[1280px] flex-1 flex-col">
        <SectionLabel text={sectionOverride ?? '15 · RAISING'} />

        <div className="mt-10 grid min-h-0 flex-1 grid-cols-12 gap-12">
          {/* Hero — big number */}
          <div className="col-span-7 flex flex-col justify-center">
            <div
              className="flex items-baseline gap-3"
              style={{ fontFamily: THEME.fontMono, lineHeight: 0.92 }}
            >
              <span
                className="whitespace-nowrap text-[clamp(52px,7vw,96px)] font-bold tracking-[-0.05em]"
                style={{ color: THEME.textPrimary }}
              >
                ₹1,20,00,000
              </span>
              <span
                className="text-[clamp(20px,2.4vw,34px)] font-bold tracking-[-0.04em]"
                style={{ color: THEME.accent }}
              >
                .
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.22em]"
                style={{
                  fontFamily: THEME.fontMono,
                  borderColor: THEME.border,
                  background: 'white',
                  color: THEME.textPrimary,
                }}
              >
                India grant
              </span>
              <span
                className="rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.22em]"
                style={{
                  fontFamily: THEME.fontMono,
                  borderColor: THEME.border,
                  background: 'white',
                  color: THEME.textPrimary,
                }}
              >
                12-month runway
              </span>
            </div>
            <div
              className="mt-8 text-[14px] font-semibold uppercase tracking-[0.22em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              founder@synthsports.co
            </div>
          </div>

          {/* Use of funds — compact list */}
          <div className="col-span-5 flex flex-col justify-center">
            <div
              className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              Use of funds
            </div>
            <div className="flex flex-col gap-3.5">
              {FUNDS.map((f) => (
                <div key={f.label} className="flex items-baseline gap-3">
                  <span className="block h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: f.color }} />
                  <span
                    className="text-[15px] font-semibold"
                    style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                  >
                    {f.label}
                  </span>
                  <span
                    className="text-[12px] font-bold tabular-nums"
                    style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                  >
                    {f.pct}%
                  </span>
                  <span className="flex-1 border-b border-dotted" style={{ borderColor: THEME.border }} />
                  <span
                    className="shrink-0 text-[15px] font-bold tabular-nums"
                    style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
                  >
                    {f.amount}
                  </span>
                </div>
              ))}
              <div
                className="mt-2 flex items-baseline justify-between border-t pt-3"
                style={{ borderColor: THEME.border }}
              >
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.22em]"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  Total
                </span>
                <span
                  className="text-[20px] font-bold tabular-nums"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
                >
                  ₹1,20,00,000
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

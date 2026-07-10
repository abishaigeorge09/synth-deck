import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

type FundLine = {
  label: string
  pct: number
  amount: string
  desc: string
  color: string
}

const FUNDS: FundLine[] = [
  { label: 'Engineering', pct: 55, amount: '$192K', desc: 'Founding engineer + contractor + founder salary', color: THEME.accent },
  { label: 'Buffer', pct: 25, amount: '$87K', desc: 'Unallocated reserve', color: THEME.cyan },
  { label: 'Growth', pct: 10, amount: '$35K', desc: 'Paid social, content, conferences', color: THEME.blue },
  { label: 'Operations', pct: 4, amount: '$15K', desc: 'Travel, accounting, insurance', color: THEME.purple },
  { label: 'Legal & compliance', pct: 3, amount: '$11K', desc: 'SOC 2 prep, immigration, legal docs', color: THEME.amber },
  { label: 'Infrastructure', pct: 3, amount: '$11K', desc: 'Supabase, Vercel, Claude API', color: THEME.red },
]

export function S12_Close({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '44px 44px 32px', color: THEME.textPrimary, background: THEME.light }}
    >
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '15 · RAISING'} page={pageOverride ?? ''} tone="light" />

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
                className="text-[clamp(140px,18vw,260px)] font-bold tracking-[-0.07em]"
                style={{ color: THEME.textPrimary }}
              >
                $350K
              </span>
              <span
                className="text-[clamp(28px,3vw,40px)] font-bold tracking-[-0.04em]"
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
                Pre-seed
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
                16-month runway
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
                  $350K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

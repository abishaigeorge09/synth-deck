import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

const YEARS = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6'] as const

type Row = {
  label: string
  values: string[]
  /** Special styling flags. */
  variant?: 'total' | 'cash' | 'ebitda'
  /** Per-cell color overrides for ebitda row. */
  cellColors?: (string | undefined)[]
}

const ROWS: Row[] = [
  { label: 'New paying consumers', values: ['550', '6,000', '38,000', '135,000', '350,000', '720,000'] },
  { label: 'New team subscriptions', values: ['12', '100', '500', '1,550', '3,900', '7,800'] },
  { label: 'New programs + departments', values: ['—', '2', '11', '45', '140', '340'] },
  { label: 'SaaS revenue', values: ['$84K', '$967K', '$6.3M', '$25.2M', '$74.9M', '$169.3M'] },
  { label: 'Marketplace revenue', values: ['—', '$30K', '$300K', '$1.8M', '$7.5M', '$27.0M'] },
  { label: 'Data licensing revenue', values: ['—', '—', '—', '$500K', '$4.0M', '$18.0M'] },
  {
    label: 'TOTAL REVENUE',
    values: ['$84K', '$997K', '$6.6M', '$27.5M', '$86.4M', '$214.3M'],
    variant: 'total',
  },
  { label: 'Expenses (OpEx)', values: ['$263K', '$1.1M', '$3.5M', '$10.6M', '$26.0M', '$53.1M'] },
  {
    label: 'EBITDA',
    values: ['($192K)', '($137K)', '$2.0M', '$11.4M', '$41.4M', '$114.1M'],
    variant: 'ebitda',
    cellColors: [THEME.red, THEME.red, THEME.primary, THEME.primary, THEME.primary, THEME.primary],
  },
  {
    label: 'Cash needs (cumulative)',
    values: ['$192K', '$479K', '—', '—', '—', '—'],
    variant: 'cash',
  },
]

function GrowthTable() {
  const cellBase = 'px-3 py-2.5 text-right tabular-nums'
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <table className="w-full border-collapse">
        <thead>
          <tr style={{ background: 'rgba(24,24,27,0.03)', borderBottom: `1px solid ${THEME.border}` }}>
            <th
              className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              Metric
            </th>
            {YEARS.map((y) => (
              <th
                key={y}
                className="px-3 py-3 text-right text-[10px] font-bold uppercase tracking-[0.18em]"
                style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
              >
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const isTotal = row.variant === 'total'
            const isCash = row.variant === 'cash'
            const isEbitda = row.variant === 'ebitda'
            const highlightBg = isTotal
              ? `${THEME.accent}14`
              : isCash
                ? `${THEME.amber}14`
                : 'transparent'
            const labelColor = isTotal
              ? THEME.primaryDarker
              : isCash
                ? THEME.amber
                : THEME.textPrimary
            const labelWeight = isTotal || isCash ? 700 : 500
            return (
              <tr key={row.label} style={{ borderTop: `1px solid ${THEME.border}`, background: highlightBg }}>
                <td
                  className={`px-4 py-2.5 text-[13px]`}
                  style={{
                    fontFamily: isTotal || isCash ? THEME.fontMono : THEME.fontSans,
                    color: labelColor,
                    fontWeight: labelWeight,
                    letterSpacing: isTotal || isCash ? '0.04em' : undefined,
                    textTransform: isTotal ? 'uppercase' : undefined,
                  }}
                >
                  {row.label}
                </td>
                {row.values.map((v, i) => {
                  const color = isEbitda
                    ? row.cellColors?.[i] ?? THEME.textPrimary
                    : isTotal
                      ? THEME.primaryDarker
                      : isCash
                        ? THEME.amber
                        : THEME.textPrimary
                  return (
                    <td
                      key={i}
                      className={`${cellBase} text-[13px]`}
                      style={{
                        fontFamily: THEME.fontMono,
                        color,
                        fontWeight: isTotal || isCash || isEbitda ? 700 : 500,
                      }}
                    >
                      {v}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

type Callout = {
  label: string
  metric: string
  subLabel: string
  description: string
  stripe: string
}

const CALLOUTS: Callout[] = [
  {
    label: 'Revenue',
    metric: '$214.3M',
    subLabel: 'Total revenue in Year 6',
    description: 'Four revenue layers: SaaS, marketplace, data licensing, network effects.',
    stripe: THEME.accent,
  },
  {
    label: 'Profitability',
    metric: 'Y3',
    subLabel: 'First profitable year',
    description: 'EBITDA positive at $2.0M. Scales to $114M by Year 6.',
    stripe: THEME.blue,
  },
  {
    label: 'Capital efficiency',
    metric: '$479K',
    subLabel: 'Peak cash need',
    description: 'Pre-seed ($350K) + seed ($2.5M) covers this entirely. Profitable from Year 3.',
    stripe: THEME.purple,
  },
]

function CalloutCard({ c }: { c: Callout }) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center rounded-xl border bg-white p-6 text-center"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: c.stripe }}
      >
        {c.label}
      </div>
      <div
        className="mt-3 text-[clamp(44px,5vw,64px)] font-bold leading-none tracking-[-0.05em]"
        style={{ fontFamily: THEME.fontMono, color: c.stripe }}
      >
        {c.metric}
      </div>
      <div
        className="mt-3 text-[13px] font-semibold uppercase tracking-[0.18em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
      >
        {c.subLabel}
      </div>
      <p
        className="mt-3 max-w-[260px] text-[12.5px] leading-[1.5]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {c.description}
      </p>
    </div>
  )
}

export function AppendixGrowthModel({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A2 · GROWTH MODEL'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {sectionOverride ?? 'A2 · Growth model'}
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Growth model.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Path to $214M total revenue by Year 6. EBITDA positive in Year 3. $479K peak cash need before breakeven.
        </p>

        <div className="mt-4">
          <GrowthTable />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4">
          {CALLOUTS.map((c) => (
            <CalloutCard key={c.label} c={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

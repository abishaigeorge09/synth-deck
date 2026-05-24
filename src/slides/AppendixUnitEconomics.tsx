import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type ConsumerRow = { metric: string; y1: string; y3: string; y6: string }
const CONSUMER: ConsumerRow[] = [
  { metric: 'ARPU (blended)', y1: '$100/yr', y3: '$120/yr', y6: '$150/yr' },
  { metric: 'CAC', y1: '$25', y3: '$25', y6: '$40' },
  { metric: 'LTV', y1: '$118', y3: '$166', y6: '$244' },
  { metric: 'LTV/CAC', y1: '4.7×', y3: '6.6×', y6: '6.1×' },
  { metric: 'Payback', y1: '3.5 mo', y3: '3.0 mo', y6: '4.1 mo' },
  { metric: 'Monthly churn', y1: '6.0%', y3: '5.0%', y6: '4.0%' },
]

type InstRow = { metric: string; team: string; program: string; department: string }
const INSTITUTIONAL: InstRow[] = [
  { metric: 'ACV', team: '$2,388', program: '$22,500', department: '$60,000' },
  { metric: 'CAC', team: '$150', program: '$4,500', department: '$12,000' },
  { metric: 'LTV (3-yr avg)', team: '$6,089', program: '$93,750', department: '$360,000' },
  { metric: 'LTV/CAC', team: '40.6×', program: '20.8×', department: '30.0×' },
  { metric: 'Payback', team: '0.9 mo', program: '3.2 mo', department: '3.3 mo' },
  { metric: 'Annual retention', team: '90%', program: '92%', department: '92%' },
]

function ConsumerTable() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <th
            className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            Metric
          </th>
          {['Y1', 'Y3', 'Y6'].map((y) => (
            <th
              key={y}
              className="px-2 py-2 text-right text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              {y}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {CONSUMER.map((r) => (
          <tr key={r.metric} style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td
              className="px-2 py-2 text-[12.5px]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary, fontWeight: 500 }}
            >
              {r.metric}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontWeight: 600 }}
            >
              {r.y1}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontWeight: 600 }}
            >
              {r.y3}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.accent, fontWeight: 700 }}
            >
              {r.y6}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function InstitutionalTable() {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr style={{ borderBottom: `1px solid ${THEME.border}` }}>
          <th
            className="px-2 py-2 text-left text-[10px] font-bold uppercase tracking-[0.18em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            Metric
          </th>
          {['Team', 'Program', 'Dept.'].map((c) => (
            <th
              key={c}
              className="px-2 py-2 text-right text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {INSTITUTIONAL.map((r) => (
          <tr key={r.metric} style={{ borderBottom: `1px solid ${THEME.border}` }}>
            <td
              className="px-2 py-2 text-[12.5px]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary, fontWeight: 500 }}
            >
              {r.metric}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontWeight: 600 }}
            >
              {r.team}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontWeight: 600 }}
            >
              {r.program}
            </td>
            <td
              className="px-2 py-2 text-right text-[12.5px] tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.blue, fontWeight: 700 }}
            >
              {r.department}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

/** Small product mock: payback-period bars showing every tier under 4 months. */
function PaybackChart() {
  const data = [
    { label: 'Consumer · Y1', months: 3.5, color: THEME.accent },
    { label: 'Consumer · Y6', months: 4.1, color: THEME.accent },
    { label: 'Team', months: 0.9, color: THEME.blue },
    { label: 'Program', months: 3.2, color: THEME.blue },
    { label: 'Department', months: 3.3, color: THEME.blue },
  ]
  const max = 5
  return (
    <div className="flex h-full flex-col">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Payback period · months
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
        {data.map((d) => (
          <div key={d.label} className="grid grid-cols-[140px_1fr_64px] items-center gap-4">
            <span
              className="text-[14.5px] font-semibold"
              style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
            >
              {d.label}
            </span>
            <div className="relative h-10">
              <div className="absolute inset-0 rounded-md" style={{ background: `${d.color}1A` }} />
              <div
                className="absolute left-0 top-0 h-10 rounded-md"
                style={{ width: `${(d.months / max) * 100}%`, background: d.color }}
              />
              {/* 4-month threshold marker */}
              <div
                className="absolute top-0 h-10 w-[2px]"
                style={{ left: `${(4 / max) * 100}%`, background: THEME.red }}
              />
            </div>
            <span
              className="text-right text-[16px] font-bold tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: d.color }}
            >
              {d.months} mo
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Small product mock: LTV/CAC ratios — every tier above the 3× floor */
function LtvCacChart() {
  const data = [
    { label: 'Consumer', value: 6.6 },
    { label: 'Team', value: 40.6 },
    { label: 'Program', value: 20.8 },
    { label: 'Department', value: 30.0 },
  ]
  const domainMax = 45
  return (
    <div className="flex h-full flex-col">
      <div
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        LTV / CAC ratio
      </div>
      <div className="mt-4 flex flex-1 flex-col justify-between gap-3">
        {data.map((d) => (
          <div key={d.label} className="grid grid-cols-[140px_1fr_64px] items-center gap-4">
            <span
              className="text-[14.5px] font-semibold"
              style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
            >
              {d.label}
            </span>
            <div className="relative h-10">
              <div className="absolute inset-0 rounded-md" style={{ background: `${THEME.accent}1A` }} />
              <div
                className="absolute left-0 top-0 h-10 rounded-md"
                style={{ width: `${(d.value / domainMax) * 100}%`, background: THEME.accent }}
              />
              <div
                className="absolute top-0 h-10 w-[2px]"
                style={{ left: `${(3 / domainMax) * 100}%`, background: THEME.amber }}
              />
            </div>
            <span
              className="text-right text-[16px] font-bold tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
            >
              {d.value}×
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({
  label,
  labelColor,
  headline,
  children,
}: {
  label: string
  labelColor: string
  headline: string
  children: React.ReactNode
}) {
  return (
    <div
      className="flex h-full flex-col rounded-2xl border bg-white p-5"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: labelColor }}
      >
        {label}
      </div>
      <h3
        className="mt-1.5 text-[18px] font-bold leading-snug tracking-[-0.02em]"
        style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
      >
        {headline}
      </h3>
      <div className="mt-3 flex-1">{children}</div>
    </div>
  )
}

export function AppendixUnitEconomics({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A3 · UNIT ECONOMICS'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A3 · Unit economics
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Unit economics.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Every tier above the 3× LTV/CAC floor. Payback under 4 months on consumer. Institutional payback under
          4 months across all tiers.
        </p>

        {/* Top: visual proof of the headline claims */}
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-4">
          <div
            className="flex flex-col rounded-2xl border bg-white p-5"
            style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
          >
            <PaybackChart />
          </div>
          <div
            className="flex flex-col rounded-2xl border bg-white p-5"
            style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
          >
            <LtvCacChart />
          </div>
        </div>

        {/* Bottom: data tables side by side */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <Card label="Consumer" labelColor={THEME.accent} headline="$9 to $19 per month, individual athletes">
            <ConsumerTable />
          </Card>
          <Card label="Institutional" labelColor={THEME.blue} headline="$2,388/yr teams to $60K/yr departments">
            <InstitutionalTable />
          </Card>
        </div>
      </div>
    </div>
  )
}

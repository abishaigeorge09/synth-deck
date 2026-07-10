import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type FundLine = {
  category: string
  amount: string
  pct: number
  notes: string
  color: string
}

const FUNDS: FundLine[] = [
  {
    category: 'Engineering',
    amount: '₹55L',
    pct: 46,
    notes: 'Founding engineer stipends ₹30L, senior developer support ₹15L, contractor builds ₹10L',
    color: THEME.accent,
  },
  {
    category: 'Marketing and growth',
    amount: '₹25L',
    pct: 21,
    notes: 'Ambassador program ₹8L, paid social ₹7L, content ₹5L, regattas and demos ₹5L',
    color: THEME.blue,
  },
  {
    category: 'Legal and compliance',
    amount: '₹20L',
    pct: 17,
    notes: 'SOC 2 Type 1 ₹8L, FERPA framework ₹4L, institutional contracts ₹4L, immigration counsel ₹4L',
    color: THEME.purple,
  },
  {
    category: 'Outreach and sales',
    amount: '₹10L',
    pct: 8,
    notes: 'CRM and tooling ₹5L, discovery conversations ₹3L, Cal pilot prep ₹2L',
    color: THEME.amber,
  },
  {
    category: 'Operations',
    amount: '₹10L',
    pct: 8,
    notes: 'Accounting ₹3L, insurance ₹3L, Demo Day and travel ₹4L',
    color: THEME.red,
  },
]

type Milestone = { title: string; items: string[] }

const MILESTONES: Milestone[] = [
  {
    title: 'Engineering milestones',
    items: [
      '30 integrations live',
      'B2B dashboard v1 deployed',
      'Two-way sync working',
    ],
  },
  {
    title: 'Growth milestones',
    items: [
      'First paying cohort converted',
      'Cal Athletics pilot signed',
      '500 discovery conversations',
    ],
  },
  {
    title: 'India milestones',
    items: [
      'DPIIT recognition complete',
      'SAI or federation outreach initiated',
      'Commonwealth 2030 positioning locked',
    ],
  },
]

function FundRow({ row }: { row: FundLine }) {
  return (
    <div className="grid grid-cols-[210px_1fr_120px] items-center gap-4">
      <div className="min-w-0">
        <div
          className="text-[13.5px] font-semibold leading-tight"
          style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
        >
          {row.category}
        </div>
        <div className="mt-0.5 flex items-baseline gap-1.5">
          <span
            className="text-[18px] font-bold tabular-nums leading-none"
            style={{ fontFamily: THEME.fontMono, color: row.color }}
          >
            {row.amount}
          </span>
          <span
            className="text-[11px] font-medium tabular-nums"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            · {row.pct}%
          </span>
        </div>
      </div>
      <div className="relative h-7">
        <div className="absolute inset-0 rounded-md" style={{ background: `${row.color}1A` }} />
        <div
          className="absolute left-0 top-0 h-7 rounded-md"
          style={{ width: `${row.pct}%`, background: row.color, opacity: 0.9 }}
        />
      </div>
      <div
        className="text-right text-[11.5px] leading-snug"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {row.notes}
      </div>
    </div>
  )
}

function MilestoneCard({ m }: { m: Milestone }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl border bg-white p-5"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
      >
        {m.title}
      </div>
      <ul className="mt-3 space-y-1.5">
        {m.items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-2 text-[13px] leading-[1.45]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
          >
            <span
              className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: THEME.accent }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AppendixIndiaGrantBudget({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A4 · INDIA GRANT BUDGET'} page={pageOverride ?? '5 / 15'} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {sectionOverride ?? 'A4 · India grant budget'}
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          India grant budget breakdown.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          ₹1.2 Crore raise. 12-month runway. Every rupee tied to a milestone.
        </p>

        <div
          className="mt-5 rounded-2xl border bg-white p-5"
          style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
        >
          <div className="flex flex-col gap-3">
            {FUNDS.map((f) => (
              <FundRow key={f.category} row={f} />
            ))}
          </div>
          <div
            className="mt-4 flex items-baseline justify-between border-t pt-3"
            style={{ borderColor: THEME.border }}
          >
            <span
              className="text-[11px] font-bold uppercase tracking-[0.22em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              Total raise
            </span>
            <span
              className="text-[20px] font-bold tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
            >
              ₹1,20,00,000
            </span>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          {MILESTONES.map((m) => (
            <MilestoneCard key={m.title} m={m} />
          ))}
        </div>
      </div>
    </div>
  )
}

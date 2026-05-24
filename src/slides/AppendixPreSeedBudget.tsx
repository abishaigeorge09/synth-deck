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
    amount: '$192K',
    pct: 55,
    notes: 'Founding engineer $96K, contractor $36K, founder salary $60K',
    color: THEME.accent,
  },
  {
    category: 'Growth & customer acquisition',
    amount: '$35K',
    pct: 10,
    notes: 'Paid social $16K, content $7K, conferences $4K, demo prep $2K, referrals $4K, outreach $1K',
    color: THEME.blue,
  },
  {
    category: 'Operations & overhead',
    amount: '$15K',
    pct: 4,
    notes: 'Coworking $2K, travel $3K, accounting $3K, insurance $2.5K, misc $5K',
    color: THEME.cyan,
  },
  {
    category: 'Legal & compliance',
    amount: '$11K',
    pct: 3,
    notes: 'SOC 2 prep $3K, immigration $5K, privacy docs $2K, Stripe setup $0.5K',
    color: THEME.purple,
  },
  {
    category: 'Infrastructure & compute',
    amount: '$11K',
    pct: 3,
    notes: 'Supabase $0.3K, Vercel $0.2K, Claude API $9K, dev tools $1.5K',
    color: THEME.amber,
  },
  {
    category: 'Buffer (unallocated)',
    amount: '$87K',
    pct: 25,
    notes: 'Reserve for unexpected costs, extends runway 3 to 4 months',
    color: THEME.red,
  },
]

type Milestone = { title: string; items: string[] }

const MILESTONES: Milestone[] = [
  {
    title: 'Engineering milestones',
    items: [
      '30 integrations live',
      'Synthesis engine v1 deployed',
      'Two-way sync working',
    ],
  },
  {
    title: 'Growth milestones',
    items: ['1,000 paying B2C athletes', '$10K MRR', '50,000 synthesis events logged'],
  },
  {
    title: 'Institutional milestones',
    items: [
      'Cal Athletics pilot framework signed',
      'SOC 2 Type 1 audit started',
      '500 customer discovery conversations',
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
        <div
          className="mt-0.5 text-[11px] font-bold tabular-nums"
          style={{ fontFamily: THEME.fontMono, color: row.color }}
        >
          {row.amount} <span style={{ color: THEME.textMuted, fontWeight: 500 }}>· {row.pct}%</span>
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

export function AppendixPreSeedBudget({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A4 · PRE-SEED BUDGET'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A4 · Pre-seed budget
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Pre-seed budget breakdown.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          $350K raise. 16-month runway. Every dollar tied to a milestone.
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
              $350K
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

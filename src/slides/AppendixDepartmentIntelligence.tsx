import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

const PROBLEMS = [
  'No visibility into which tech tools are actually used vs. paid for',
  'Each sport runs independently with no consolidated view',
  '$20.5M House v. NCAA tech spend with no ROI accountability',
  'Coaching tools renew automatically, even when usage drops to zero',
]

const ANSWERS = [
  'Real-time usage rates across every tool deployed in every sport',
  'Overlap detection: which sports are paying for duplicate functionality',
  'Gap analysis: which sports are under-tooled for their needs',
  'Contract intelligence: which subscriptions to renew, renegotiate, or cancel',
]

type Stat = { label: string; value: string; subLabel: string; description: string; color: string }

const STATS: Stat[] = [
  {
    label: 'Visibility',
    value: '27 sports',
    subLabel: 'Tracked in one dashboard',
    description: 'Every program. Every tool. Every athlete. One view for the AD office.',
    color: THEME.accent,
  },
  {
    label: 'Spend',
    value: '$2.3M',
    subLabel: 'Avg annual tech spend per D1 program',
    description: 'synth surfaces what is used, what is wasted, and where to reinvest.',
    color: THEME.amber,
  },
  {
    label: 'Outcomes',
    value: '18% ↓',
    subLabel: 'Avg tech spend reduction in Y1',
    description: 'Without losing any tools coaches actually use.',
    color: THEME.purple,
  },
]

function IconX() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={`${THEME.red}1F`} />
      <path d="M8 8l8 8M16 8l-8 8" stroke={THEME.red} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="10" fill={`${THEME.accent}1F`} />
      <path d="M7 12l3 3 7-7" fill="none" stroke={THEME.primary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ListColumn({
  title,
  items,
  tone,
}: {
  title: string
  items: string[]
  tone: 'problem' | 'answer'
}) {
  return (
    <div
      className="flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[11px] font-bold uppercase tracking-[0.22em]"
        style={{
          fontFamily: THEME.fontMono,
          color: tone === 'problem' ? THEME.amber : THEME.primary,
        }}
      >
        {title}
      </div>
      <ul className="mt-5 space-y-3.5">
        {items.map((it) => (
          <li
            key={it}
            className="flex items-start gap-3 text-[14px] leading-[1.45]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
          >
            <span className="mt-0.5 shrink-0">{tone === 'problem' ? <IconX /> : <IconCheck />}</span>
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StatCard({ s }: { s: Stat }) {
  return (
    <div
      className="flex h-full flex-col items-center rounded-xl border bg-white px-5 py-5 text-center"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[10px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {s.label}
      </div>
      <div
        className="mt-2 text-[clamp(28px,3.2vw,42px)] font-bold leading-none tracking-[-0.04em]"
        style={{ fontFamily: THEME.fontMono, color: s.color }}
      >
        {s.value}
      </div>
      <div
        className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
      >
        {s.subLabel}
      </div>
      <p
        className="mt-2 max-w-[260px] text-[12px] leading-[1.45]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {s.description}
      </p>
    </div>
  )
}

export function AppendixDepartmentIntelligence({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A7 · DEPARTMENT INTELLIGENCE'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A7 · Department intelligence
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Department intelligence.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          The layer above coaching. Athletic directors see every tool, every sport, every dollar spent, every
          signal generated.
        </p>

        <div className="mt-5 grid grid-cols-2 gap-5">
          <ListColumn title="The AD problem" items={PROBLEMS} tone="problem" />
          <ListColumn title="The synth answer" items={ANSWERS} tone="answer" />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} s={s} />
          ))}
        </div>

        <DashboardMock />
      </div>
    </div>
  )
}

/* ───── AD dashboard mock (bottom section) ───── */

type ToolRow = { name: string; pct: number; tone?: 'red' | 'amber' }
const TOOL_INVENTORY: ToolRow[] = [
  { name: 'Catapult', pct: 89 },
  { name: 'Whoop', pct: 67 },
  { name: 'TeamWorks', pct: 100 },
  { name: 'Bridge Athletics', pct: 12, tone: 'red' },
  { name: 'Hudl', pct: 78 },
  { name: 'TrainingPeaks', pct: 34, tone: 'amber' },
]

type SpendRow = { sport: string; amount: string; value: number }
const SPEND_BY_SPORT: SpendRow[] = [
  { sport: 'Football', amount: '$890K', value: 890 },
  { sport: 'Basketball', amount: '$340K', value: 340 },
  { sport: 'Olympic sports avg', amount: '$180K', value: 180 },
  { sport: 'Rowing', amount: '$95K', value: 95 },
  { sport: 'Track', amount: '$87K', value: 87 },
  { sport: 'Tennis', amount: '$62K', value: 62 },
]

type Rec = { title: string; saving: string; tone: 'red' | 'amber' | 'accent' }
type RecGroup = { label: string; items: Rec[] }
const REC_GROUPS: RecGroup[] = [
  {
    label: 'Spend',
    items: [
      { title: 'Cancel Bridge Athletics', saving: '12% usage · $48K saved', tone: 'red' },
      { title: 'Renegotiate TrainingPeaks', saving: '34% usage · ~$30K saved', tone: 'amber' },
    ],
  },
  {
    label: 'Programs',
    items: [
      { title: 'Tennis trending down', saving: '4-week ranking slide, check in with staff', tone: 'amber' },
      { title: 'Football injury risk rising', saving: '4 athletes flagged this week', tone: 'red' },
    ],
  },
  {
    label: 'Athletes',
    items: [
      { title: 'Rowing standout', saving: 'top-decile readiness, 4-week streak', tone: 'accent' },
      { title: '3 NIL-ready athletes', saving: 'sustained top performance, brand-deal candidates', tone: 'accent' },
    ],
  },
]

function ColumnHeader({ text }: { text: string }) {
  return (
    <div
      className="text-[10px] font-bold uppercase tracking-[0.22em]"
      style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
    >
      {text}
    </div>
  )
}

function DashboardMock() {
  const maxSpend = Math.max(...SPEND_BY_SPORT.map((s) => s.value))
  return (
    <div className="mt-6">
      <div className="text-center">
        <span
          className="text-[10.5px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          What the AD dashboard actually shows
        </span>
      </div>
      <div
        className="mt-3 grid grid-cols-3 gap-6 rounded-2xl border bg-white p-5"
        style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
      >
        {/* COL 1 — Tool inventory */}
        <div>
          <ColumnHeader text="Tool inventory" />
          <div className="mt-3 flex flex-col gap-2">
            {TOOL_INVENTORY.map((t) => {
              const color =
                t.tone === 'red' ? THEME.red : t.tone === 'amber' ? THEME.amber : THEME.accent
              return (
                <div key={t.name} className="flex items-center gap-3 text-[12px]">
                  <span
                    className="w-[130px] shrink-0 font-semibold"
                    style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                  >
                    {t.name}
                  </span>
                  <div className="relative h-3 flex-1">
                    <div className="absolute inset-0 rounded-sm" style={{ background: `${color}1A` }} />
                    <div
                      className="absolute left-0 top-0 h-3 rounded-sm"
                      style={{ width: `${t.pct}%`, background: color }}
                    />
                  </div>
                  <span
                    className="w-9 shrink-0 text-right text-[11.5px] font-bold tabular-nums"
                    style={{ fontFamily: THEME.fontMono, color }}
                  >
                    {t.pct}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* COL 2 — Spend by sport */}
        <div>
          <ColumnHeader text="Spend by sport" />
          <div className="mt-3 flex flex-col gap-2">
            {SPEND_BY_SPORT.map((s) => (
              <div key={s.sport} className="flex items-center gap-3 text-[12px]">
                <span
                  className="w-[130px] shrink-0 font-semibold"
                  style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                >
                  {s.sport}
                </span>
                <div className="relative h-3 flex-1">
                  <div className="absolute inset-0 rounded-sm" style={{ background: `${THEME.accent}1A` }} />
                  <div
                    className="absolute left-0 top-0 h-3 rounded-sm"
                    style={{ width: `${(s.value / maxSpend) * 100}%`, background: THEME.accent }}
                  />
                </div>
                <span
                  className="w-12 shrink-0 text-right text-[11.5px] font-bold tabular-nums"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
                >
                  {s.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* COL 3 — Recommendations grouped by category */}
        <div>
          <ColumnHeader text="synth recommendations" />
          <div className="mt-3 flex flex-col gap-3.5">
            {REC_GROUPS.map((g) => (
              <div key={g.label}>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {g.items.map((r) => {
                    const color =
                      r.tone === 'red' ? THEME.red : r.tone === 'amber' ? THEME.amber : THEME.accent
                    return (
                      <li key={r.title} className="flex flex-col gap-0.5">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="inline-block h-2 w-2 shrink-0 rounded-full"
                            style={{ background: color }}
                          />
                          <span
                            className="text-[12.5px] font-bold leading-tight"
                            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                          >
                            {r.title}
                          </span>
                        </div>
                        <span
                          className="pl-4 text-[10.5px] leading-[1.4]"
                          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
                        >
                          {r.saving}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

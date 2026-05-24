import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(20px, 3vw, 36px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Tier = {
  name: string
  price: string
  forWhom: string
  athletes: string
  features: string[]
  stripe: string
}

const TIERS: Tier[] = [
  {
    name: 'Consumer Athlete',
    price: '$9/mo',
    forWhom: 'Individual athletes (high school, club, masters, amateur)',
    athletes: '1',
    features: ['Personal training timeline', '5 connectors', 'Basic readiness score', 'Mobile app'],
    stripe: THEME.primaryLight,
  },
  {
    name: 'Consumer Pro',
    price: '$19/mo',
    forWhom: 'Serious athletes (collegiate, sub-elite, competitive)',
    athletes: '1',
    features: ['Everything in Athlete', 'Unlimited connectors', 'Predictive trajectory', 'AI chat, Priority support'],
    stripe: THEME.accent,
  },
  {
    name: 'Team',
    price: '$199/mo',
    forWhom: 'Club teams, small programs, high school teams',
    athletes: 'Up to 40',
    features: ['Everything in Pro for every athlete', 'Coach dashboard', 'Team-level views', '3 active connectors'],
    stripe: THEME.cyan,
  },
  {
    name: 'Team+',
    price: '$499/mo',
    forWhom: 'Larger club teams, mid-size collegiate programs',
    athletes: 'Up to 80',
    features: ['Everything in Team', 'Unlimited connectors', 'Daily cloud sync', 'Lineup optimizer, Custom dashboards'],
    stripe: THEME.blue,
  },
  {
    name: 'Program',
    price: '$22,500/yr',
    forWhom: 'Single sport at a collegiate program',
    athletes: 'Unlimited within sport',
    features: [
      'Everything in Team+',
      'Multi-coach workflows',
      'Two-way sync',
      'Custom tools on demand (24-hour build)',
    ],
    stripe: THEME.purple,
  },
  {
    name: 'Department',
    price: '$60,000/yr',
    forWhom: 'Full athletic department, all sports',
    athletes: 'Unlimited across all sports',
    features: [
      'Everything in Program for every sport',
      'Department Intelligence dashboard',
      'AD-level reporting',
      'White-label, custom integrations',
    ],
    stripe: THEME.amber,
  },
]

function TierCard({ t }: { t: Tier }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl border bg-white p-5"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[12px] font-bold uppercase tracking-[0.22em]"
        style={{ fontFamily: THEME.fontMono, color: t.stripe }}
      >
        {t.name}
      </div>
      <div
        className="mt-3 text-[34px] font-bold leading-none tracking-[-0.04em]"
        style={{ fontFamily: THEME.fontMono, color: t.stripe }}
      >
        {t.price}
      </div>
      <div
        className="mt-3 text-[14px] leading-[1.45]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {t.forWhom}
      </div>
      <div
        className="mt-3 text-[11.5px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Athletes: <span style={{ color: THEME.textPrimary }}>{t.athletes}</span>
      </div>
      <ul
        className="mt-4 flex flex-1 flex-col justify-between gap-2 border-t pt-4"
        style={{ borderColor: THEME.border }}
      >
        {t.features.map((f) => (
          <li
            key={f}
            className="flex items-start gap-2.5 text-[15px] leading-[1.45]"
            style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
          >
            <span
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ background: t.stripe }}
            />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function AppendixPricingTiers({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A9 · PRICING TIERS DETAIL'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A9 · Pricing tiers detail
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Pricing tiers.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Consumer-first. Natural upgrade path from $9/mo to $60K/yr.
        </p>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-3 grid-rows-2 gap-4">
          {TIERS.map((t) => (
            <TierCard key={t.name} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

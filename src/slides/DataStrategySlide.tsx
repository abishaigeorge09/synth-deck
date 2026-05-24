import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.6vw, 44px) clamp(28px, 4vw, 52px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type SubItem = { label: string; tools: string }
type Card = {
  num: string
  label: string
  icon: 'lock' | 'plug' | 'globe'
  headline: string
  items: SubItem[]
}

const CARDS: Card[] = [
  {
    num: '01',
    label: 'Proprietary',
    icon: 'lock',
    headline: 'The synthesis nobody else sees.',
    items: [
      { label: 'Synthesis events', tools: 'Cross-tool correlations only synth observes' },
      { label: 'Interaction graph', tools: 'Athlete ↔ coach decisions over time' },
      { label: 'Response curves', tools: "Each athlete's unique adaptation signature" },
      { label: 'Cohort baselines', tools: 'Position, sport, age baselines that compound' },
      { label: 'Validation loops', tools: 'Outcome data closes every prediction' },
      { label: 'Longitudinal models', tools: 'Multi-year athlete trajectories' },
    ],
  },
  {
    num: '02',
    label: 'Partner',
    icon: 'plug',
    headline: 'Every tool an athlete already uses.',
    items: [
      { label: 'Wearables', tools: 'Whoop · Garmin · Oura · Apple Health' },
      { label: 'Strength', tools: 'VALD ForceDecks · Hawkin Dynamics' },
      { label: 'Coaching', tools: 'TrainingPeaks · Strava' },
      { label: 'Nutrition', tools: 'Cronometer · MacroFactor' },
      { label: 'HRV', tools: 'HRV4Training' },
      { label: 'Sport equipment', tools: 'Concept2 · GymAware' },
    ],
  },
  {
    num: '03',
    label: 'Public',
    icon: 'globe',
    headline: 'The scientific & competitive truth set.',
    items: [
      { label: 'Literature', tools: 'PubMed · JSCR · BJSM · Sports Medicine' },
      { label: 'Biomechanics', tools: 'SimTK · OpenSim · AddBiomechanics' },
      { label: 'Population', tools: 'NHANES · CDC BRFSS' },
      { label: 'Injury', tools: 'NCAA Injury Surveillance Program' },
      { label: 'Weather', tools: 'NOAA NWS · NCEI Climate Data' },
      { label: 'Social', tools: 'Strava public segments' },
    ],
  },
]

function CardIcon({ name }: { name: Card['icon'] }) {
  const common = {
    fill: 'none',
    stroke: THEME.textPrimary,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  if (name === 'lock') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <rect x="5" y="11" width="14" height="9" rx="2" {...common} />
        <path {...common} d="M8 11V8a4 4 0 0 1 8 0v3" />
        <circle cx="12" cy="15.5" r="1.3" fill={THEME.textPrimary} />
      </svg>
    )
  }
  if (name === 'plug') {
    return (
      <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M9 7v4M15 7v4" />
        <path {...common} d="M6 11h12v3a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4v-3z" />
        <path {...common} d="M12 18v3" />
      </svg>
    )
  }
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" {...common} />
      <path {...common} d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  )
}

function SubCard({ item }: { item: SubItem }) {
  return (
    <div
      className="flex flex-1 flex-col justify-center rounded-lg px-3.5 py-3"
      style={{ background: '#F5F4F0', border: `1px solid ${THEME.border}` }}
    >
      <div
        className="text-[9.5px] font-bold uppercase tracking-[0.2em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {item.label}
      </div>
      <div
        className="mt-1 text-[13.5px] leading-[1.35]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
      >
        {item.tools}
      </div>
    </div>
  )
}

function StrategyCard({ card }: { card: Card }) {
  return (
    <div
      className="flex h-full flex-col rounded-2xl border bg-white p-6"
      style={{ borderColor: THEME.border, boxShadow: '0 12px 32px rgba(24,24,27,0.08)' }}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{ borderColor: THEME.border, background: '#FAFAF9' }}
        >
          <CardIcon name={card.icon} />
        </div>
        <div className="flex items-baseline gap-2.5">
          <span
            className="text-[11px] font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            {card.num}
          </span>
          <span
            className="text-[13px] font-bold uppercase tracking-[0.22em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            {card.label}
          </span>
        </div>
      </div>

      <h3
        className="mt-5 text-[clamp(18px,1.8vw,22px)] font-bold leading-[1.2] tracking-[-0.02em]"
        style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
      >
        {card.headline}
      </h3>

      <div className="mt-5 flex flex-1 flex-col gap-2.5">
        {card.items.map((it) => (
          <SubCard key={it.label} item={it} />
        ))}
      </div>
    </div>
  )
}

export function DataStrategySlide({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '05 · DATA STRATEGY'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          05 · Data strategy
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,42px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Three layers. One world model.
        </h1>
        <p
          className="mt-2 max-w-[60rem] text-[14.5px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Proprietary synthesis, partner integrations, and public science compound into a world model of human performance.
        </p>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-3 gap-5">
          {CARDS.map((c) => (
            <StrategyCard key={c.label} card={c} />
          ))}
        </div>
      </div>
    </div>
  )
}

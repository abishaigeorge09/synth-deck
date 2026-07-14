import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Stop = { month: string; title: string; detail: string }

type Phase = {
  name: string
  range: string
  color: string
  stops: Stop[]
}

const PHASES: Phase[] = [
  {
    name: 'Foundation',
    range: 'M1 – M3',
    color: THEME.accent,
    stops: [
      { month: 'M1', title: 'Grant deployed', detail: 'Engineering stipends & contractor builds begin' },
      { month: 'M1', title: 'Unified athlete schema live', detail: 'One data model across training, wearable & video sources' },
      { month: 'M2', title: '30 integrations live', detail: 'Training, wearable & video platforms connected' },
      { month: 'M2', title: 'Core team fully staffed', detail: 'Founding pod hires complete' },
      { month: 'M3', title: 'Coach dashboard v1', detail: 'First unified athlete timeline shipped internally' },
      { month: 'M3', title: 'Mobile app v1 shipped', detail: 'Athlete & coach access on iOS and Android' },
    ],
  },
  {
    name: 'Validation',
    range: 'M4 – M6',
    color: THEME.blue,
    stops: [
      { month: 'M4', title: 'Two-way sync live', detail: 'Data flows back into every source tool' },
      { month: 'M4', title: 'Load & fatigue scoring v1', detail: 'First predictive signal beyond raw tracking' },
      { month: 'M5', title: 'Growth channels live', detail: 'Ambassador program & paid social activated' },
      { month: 'M5', title: 'Custom tool builder beta', detail: '24-hour turnaround on program-specific dashboards' },
      { month: 'M6', title: 'Anchor pilot signed', detail: 'Cal Athletics — proof the playbook travels' },
      { month: 'M6', title: 'Institutional pricing validated', detail: 'Team & Program tiers tested with a paying customer' },
    ],
  },
  {
    name: 'India entry',
    range: 'M7 – M9',
    color: THEME.purple,
    stops: [
      { month: 'M7', title: 'SOC 2 Type 1', detail: 'Certification complete' },
      { month: 'M7', title: 'Injury-risk model v1', detail: 'Early-warning predictions validated against pilot data' },
      { month: 'M8', title: 'SAI outreach initiated', detail: 'Federation & state academy conversations open' },
      { month: 'M8', title: 'DPDP-compliant data residency', detail: 'Infrastructure ready for Indian athlete data' },
      { month: 'M9', title: 'Commonwealth 2030', detail: 'Positioning locked with target federations' },
      { month: 'M9', title: 'Hindi & regional language support', detail: 'Coach dashboard localized for state federations' },
    ],
  },
  {
    name: 'Scale-ready',
    range: 'M10 – M12',
    color: THEME.amber,
    stops: [
      { month: 'M10', title: 'First India pilot', detail: 'SAI centre or state federation live' },
      { month: 'M10', title: 'Marketplace beta', detail: 'First third-party tool transacts through synth.' },
      { month: 'M11', title: '500 discovery calls', detail: 'Conversations completed across the pipeline' },
      { month: 'M11', title: 'Department-scale rollout package', detail: 'Multi-sport deployment ready for a full department' },
      { month: 'M12', title: 'Seed conversations', detail: 'Underway on the back of grant milestones' },
      { month: 'M12', title: 'Second India institution engaged', detail: 'Pipeline builds beyond the first pilot' },
    ],
  },
]

function PhaseColumn({ p, isLast }: { p: Phase; isLast: boolean }) {
  return (
    <div
      className="relative flex h-full flex-col rounded-xl border p-5"
      style={{ borderColor: THEME.border, background: 'white', boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: p.color }} />
        <span className="text-[17px] font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
          {p.name}
        </span>
      </div>
      <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        {p.range}
      </div>

      <div className="relative mt-4 flex flex-1 flex-col justify-between">
        <div className="absolute bottom-1 left-[7px] top-1 w-px" style={{ background: THEME.border }} aria-hidden />
        {p.stops.map((s, i) => (
          <div key={`${s.month}-${i}`} className="relative flex gap-3">
            <div
              className="relative z-10 mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 bg-white"
              style={{ borderColor: p.color }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
            </div>
            <div className="min-w-0">
              <span
                className="inline-block rounded-full px-2 py-[2px] text-[10px] font-bold tabular-nums text-white"
                style={{ fontFamily: THEME.fontMono, background: p.color }}
              >
                {s.month}
              </span>
              <div className="mt-1 text-[14px] font-bold leading-tight" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                {s.title}
              </div>
              <div className="mt-1 text-[12px] leading-[1.35]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {s.detail}
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isLast && (
        <div
          className="absolute right-[-14px] top-1/2 hidden -translate-y-1/2 items-center justify-center sm:flex"
          style={{ color: THEME.textMuted }}
          aria-hidden
        >
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
            <path d="M1 6h14M10 1l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  )
}

export function S_MilestonesDeployment({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)' }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '09 · MILESTONES / DEPLOYMENT PLAN'} page={pageOverride ?? ''} tone="light" />

      <div className="relative z-10 mt-5 flex min-h-0 flex-1 flex-col">
        <SectionLabel text={sectionOverride ?? '09 · MILESTONES / DEPLOYMENT PLAN'} />
        <h1
          className="mt-2 text-[clamp(28px,3.6vw,40px)] font-bold leading-[1.02] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Roadmap to India.
        </h1>

        <div className="mt-4 grid min-h-0 flex-1 grid-cols-4 gap-6">
          {PHASES.map((p, i) => (
            <PhaseColumn key={p.name} p={p} isLast={i === PHASES.length - 1} />
          ))}
        </div>
      </div>
    </div>
  )
}

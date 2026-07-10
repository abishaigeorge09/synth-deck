import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(20px, 3vw, 36px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Principle = { num: string; title: string; body: string }

const PRINCIPLES: Principle[] = [
  {
    num: '01',
    title: 'Athlete autonomy',
    body: 'Data belongs to the athlete, not the school or synth. Athletes can export or delete their full history at any time, no questions asked.',
  },
  {
    num: '02',
    title: 'No surveillance creep',
    body: 'synth never enables coaches to monitor athletes outside the training context. No location tracking off-campus, no social media monitoring, no off-hours data capture.',
  },
  {
    num: '03',
    title: 'Optional wearables',
    body: 'Athletes who decline biometric tracking are never penalized in lineup decisions or playing time. Coaches cannot see who opted out.',
  },
  {
    num: '04',
    title: 'Mental health firewall',
    body: 'Wellness and mental health data never flow to recruiting evaluation, NIL decisions, or coaching contract reviews. Hard separation enforced at the database layer.',
  },
  {
    num: '05',
    title: 'No individual data sales',
    body: 'Individual athlete data is never sold, ever. Data licensing uses only k-anonymized aggregates with no path to re-identification.',
  },
  {
    num: '06',
    title: 'Quarterly bias audits',
    body: 'synth audits prediction accuracy across race, gender, sport, and body type every quarter. Audit results published to all institutional customers.',
  },
  {
    num: '07',
    title: 'Right to be forgotten',
    body: 'Athletes can fully erase their entire synth history within 30 days of leaving the program. Erasure includes derivative aggregates that were trained on their data.',
  },
  {
    num: '08',
    title: 'Coach training requirement',
    body: 'Programs using synth at the program or department tier require coaches to complete a data ethics training module before gaining roster access.',
  },
  {
    num: '09',
    title: 'No manipulation',
    body: 'synth uses behavioral mechanisms to help athletes build habits, never to extract engagement. No dark patterns, no streak guilt, no FOMO triggers, no notifications designed to maximize time-in-app.',
  },
]

function PrincipleCard({ p }: { p: Principle }) {
  return (
    <div
      className="flex h-full flex-col rounded-xl border bg-white p-5"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      <div
        className="text-[14px] font-bold leading-none tracking-[0.08em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
      >
        {p.num}
      </div>
      <h3
        className="mt-3 text-[18px] font-bold leading-snug tracking-[-0.02em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
      >
        {p.title}
      </h3>
      <p
        className="mt-2.5 text-[13.5px] leading-[1.5]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        {p.body}
      </p>
    </div>
  )
}

export function AppendixEthicsPolicy({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A6 · ETHICS POLICY'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {sectionOverride ?? 'A6 · Ethics policy'}
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Ethics policy.
        </h1>
        <p
          className="mt-2 max-w-[72rem] text-[14px] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Nine commitments that protect athletes and the company. Built to prevent litigation before it starts.
        </p>

        <div className="mt-5 grid min-h-0 flex-1 grid-cols-3 grid-rows-3 gap-4">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.num} p={p} />
          ))}
        </div>

        <p
          className="mt-4 text-center text-[13px] italic"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
        >
          Ethics is the cheapest insurance. Athletes are the customer, not the product.
        </p>
      </div>
    </div>
  )
}

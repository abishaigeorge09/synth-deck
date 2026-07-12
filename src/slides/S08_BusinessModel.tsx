import { DashedRule } from '../components/DashedRule'
import { PaperTexture } from '../components/PaperTexture'
import { TierCard } from '../components/TierCard'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

/** Y6 ARR mix across the three revenue layers (illustrative). Sums to 100. */
const ARR_MIX = [
  { tier: 'SaaS', pct: 72, color: THEME.primary },
  { tier: 'Marketplace', pct: 17, color: THEME.cyan },
  { tier: 'Data licensing', pct: 11, color: THEME.purple },
] as const

function ArrMixDonut({ total }: { total: string }) {
  const gradientStops = ARR_MIX.reduce(
    (state, s) => {
      const start = state.cum
      const end = state.cum + s.pct
      return {
        cum: end,
        parts: [...state.parts, `${s.color} ${start}% ${end}%`],
      }
    },
    { cum: 0, parts: [] as string[] },
  ).parts.join(', ')

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="text-center text-[10px] font-bold uppercase tracking-[0.16em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Y6 revenue mix
      </div>
      <div className="relative h-[124px] w-[124px] shrink-0">
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from -90deg, ${gradientStops})` }}
        />
        <div
          className="absolute rounded-full bg-white"
          style={{ inset: '28%', boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.06)' }}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span
            className="text-[11px] font-bold leading-tight"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            {total}
          </span>
        </div>
      </div>
      <ul className="w-full space-y-1">
        {ARR_MIX.map((s) => (
          <li key={s.tier} className="flex items-center justify-between gap-2 text-[11px]">
            <span className="flex min-w-0 items-center gap-2">
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
              <span className="truncate" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {s.tier}
              </span>
            </span>
            <span
              className="shrink-0 font-semibold tabular-nums"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
            >
              {s.pct}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function S08_BusinessModel({ pageOverride, sectionOverride, inr }: { pageOverride?: string; sectionOverride?: string; inr?: boolean }) {
  // All money converted at ₹83 / $1 when `inr` is set (India deck).
  const c = inr
    ? {
        total: '₹1,776 Cr',
        consumer: '₹1,577/mo',
        team: '₹41,417/mo',
        program: '₹18.7L/yr',
        dept: '₹49.8L/yr',
        saasDesc: '₹1,577/mo → ₹49.8L/yr. Wedge that builds the data corpus.',
        ramp: ['₹70L', '₹8.3 Cr', '₹55 Cr', '₹228 Cr', '₹717 Cr', '₹1,779 Cr'],
        licensing: 'Data licensing — ₹2.1 Cr–₹4.2 Cr / partner / yr',
        saasCap: '₹1,403 Cr',
      }
    : {
        total: '$214M',
        consumer: '$19/mo',
        team: '$499/mo',
        program: '$22,500/yr',
        dept: '$60,000/yr',
        saasDesc: '$19/mo → $60K/yr. Wedge that builds the data corpus.',
        ramp: ['$84K', '$997K', '$6.6M', '$27.5M', '$86.4M', '$214.3M'],
        licensing: 'Data licensing — $250K–$500K / partner / yr',
        saasCap: '$169M',
      }
  const compoundSteps = [
    { name: 'SaaS', desc: c.saasDesc, color: THEME.primary },
    { name: 'Marketplace', desc: '15% take rate on partner tools transacted through synth. Activates Y2.', color: THEME.cyan },
    { name: 'Data licensing', desc: 'Anonymized aggregate to manufacturers, federations, researchers. Activates Y4.', color: THEME.purple },
    { name: 'Network effects', desc: 'More athletes × more tools → every layer above scales further.', color: THEME.amber },
  ] as const

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '48px 44px 32px', color: THEME.textPrimary }}
    >
      <TopNav section={sectionOverride ?? '12 · BUSINESS MODEL'} page={pageOverride ?? ''} tone="light" />
      <PaperTexture strength={0.75} tint="rgba(244, 243, 236, 0.95)" />

      <div
        className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
      >
        {sectionOverride ?? '12 · Business model'}
      </div>
      <div
        className="mt-2 max-w-[920px] text-[42px] font-bold leading-[1.05]"
        style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em' }}
      >
        Four tiers. Three revenue layers. One flywheel.
      </div>
      <p
        className="mt-3 max-w-[920px] text-[14px] leading-[1.55]"
        style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
      >
        Consumer-first GTM. Platform-scale outcome. {c.total} total revenue by Year 6.
      </p>
      <div className="mt-3">
        <DashedRule />
      </div>

      {/* SaaS pricing tiers — same flat row as the original */}
      <div className="mt-4 grid grid-cols-4 items-stretch gap-4">
        <TierCard
          name="Consumer"
          price={c.consumer}
          accent={THEME.primary}
          features={['Pro tier', 'Individual athlete', 'All integrations', 'Mobile + web']}
        />
        <TierCard
          name="Team"
          price={c.team}
          accent={THEME.cyan}
          features={['Team+ tier', 'Up to ~80 athletes', 'Coach dashboard', 'Two-way sync']}
        />
        <TierCard
          name="Program"
          price={c.program}
          accent={THEME.purple}
          features={['Single sport', 'Full institutional', 'Custom tools', 'Dedicated success']}
        />
        <TierCard
          name="Department"
          price={c.dept}
          accent={THEME.amber}
          features={['Multi-sport deploy', 'Full athletic dept.', 'Custom integrations', 'White-label']}
        />
      </div>

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-12 gap-4" style={{ alignItems: 'stretch' }}>
        {/* Compounds spine */}
        <div
          className="col-span-4 flex min-h-0 flex-col rounded-xl border p-5"
          style={{ borderColor: THEME.border, background: '#ffffff' }}
        >
          <div
            className="mb-1 text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            How the layers compound
          </div>
          <p
            className="mb-4 text-[11px] leading-snug"
            style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}
          >
            SaaS builds the corpus; the corpus makes marketplace + licensing possible at all.
          </p>
          <div className="relative flex-1 pl-1">
            <div
              className="absolute bottom-2 left-[15px] top-2 w-[2px] rounded-full"
              style={{ background: `linear-gradient(180deg, ${THEME.primary}55, ${THEME.amber}55)` }}
            />
            <ul className="space-y-0">
              {compoundSteps.map((step, i) => (
                <li key={step.name} className="relative flex gap-3 pb-5 last:pb-0">
                  <div
                    className="relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-white"
                    style={{ borderColor: step.color, boxShadow: `0 0 0 3px ${step.color}22` }}
                  >
                    <span
                      className="text-[11px] font-bold"
                      style={{ fontFamily: THEME.fontMono, color: step.color }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <div
                      className="text-[13px] font-bold"
                      style={{ fontFamily: THEME.fontMono, color: step.color }}
                    >
                      {step.name}
                    </div>
                    <div
                      className="mt-0.5 text-[12px] leading-[1.45]"
                      style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
                    >
                      {step.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Revenue projections + data-licensing detail */}
        <div
          className="col-span-4 flex min-h-0 flex-col gap-3 rounded-xl border p-5"
          style={{ borderColor: THEME.border, background: '#ffffff' }}
        >
          <div
            className="text-[11px] uppercase tracking-[0.16em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
          >
            Revenue projections
          </div>
          <table className="w-full border-collapse text-left text-[12px]">
            <thead>
              <tr style={{ borderBottom: `2px solid ${THEME.border}` }}>
                <th
                  className="pb-2 text-[10px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  Year
                </th>
                <th
                  className="pb-2 text-[10px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  Phase
                </th>
                <th
                  className="pb-2 text-right text-[10px] uppercase tracking-[0.12em]"
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  Total revenue
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: 'Y1', phase: 'Wedge', arr: c.ramp[0], color: THEME.primary },
                { year: 'Y2', phase: 'Marketplace on', arr: c.ramp[1], color: THEME.cyan },
                { year: 'Y3', phase: 'Scale SaaS', arr: c.ramp[2], color: THEME.primary },
                { year: 'Y4', phase: 'Licensing on', arr: c.ramp[3], color: THEME.purple },
                { year: 'Y5', phase: 'Cross-layer compounds', arr: c.ramp[4], color: THEME.amber },
                { year: 'Y6', phase: 'Platform scale', arr: c.ramp[5], color: THEME.accent },
              ].map((row) => (
                <tr key={row.year} style={{ borderBottom: `1px solid ${THEME.border}` }}>
                  <td
                    className="py-2"
                    style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary, fontWeight: 600 }}
                  >
                    {row.year}
                  </td>
                  <td
                    className="py-2 text-[10.5px]"
                    style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                  >
                    {row.phase}
                  </td>
                  <td
                    className="py-2 text-right font-bold"
                    style={{ fontFamily: THEME.fontMono, color: row.color }}
                  >
                    {row.arr}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="mt-2 rounded-lg border p-3"
            style={{ borderColor: THEME.border, background: 'rgba(124,110,242,0.05)' }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.purple }}
            >
              {c.licensing}
            </div>
            <div
              className="mt-1 text-[11px] leading-[1.4]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
            >
              Equipment (Nike, Concept2), governing bodies (NCAA, US Rowing), researchers/universities, insurance + occupational health (Phase 2+).
            </div>
          </div>
        </div>

        {/* ARR mix donut */}
        <div className="col-span-4 flex min-h-0 flex-col">
          <div
            className="flex min-h-[280px] flex-1 flex-col items-center justify-center rounded-xl border p-5"
            style={{ borderColor: THEME.border, background: '#ffffff' }}
          >
            <ArrMixDonut total={c.total} />
          </div>
        </div>
      </div>

      <div
        className="mt-3 text-[12px] italic"
        style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
      >
        SaaS alone caps around {c.saasCap}. Marketplace and data licensing break through to {c.total}.
      </div>
    </div>
  )
}

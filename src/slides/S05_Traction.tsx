import { DashedRule } from '../components/DashedRule'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const CAL_LOGO = '/logos/cal-golden-bears.svg'

function AdvisorAvatar({ initials, accent }: { initials: string; accent: string }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border"
      style={{
        borderColor: `${accent}33`,
        background: `linear-gradient(180deg, ${accent}12 0%, rgba(255,255,255,0.9) 100%)`,
      }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: `${accent}18`, color: accent, fontFamily: THEME.fontMono, fontWeight: 700, fontSize: 13 }}
      >
        {initials}
      </div>
    </div>
  )
}

export function S05_Traction({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: '48px 44px 32px' }}>
      <TopNav section={sectionOverride ?? '04 · TRACTION'} page={pageOverride ?? '6 / 13'} tone="light" />

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mt-2">
          <div className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Traction
          </div>
          <div className="mt-3 flex items-start justify-between gap-6">
            <div className="min-w-0">
              <h1
                className="text-[clamp(30px,4.5vw,46px)] font-bold leading-[1.02] tracking-[-0.06em]"
                style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
              >
                Real early pull.
              </h1>
              <p className="mt-3 max-w-[44rem] text-[15px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                Early demand from athletes and coaches, with fundraising momentum and an advisory base around Cal rowing + sports data.
              </p>
            </div>
            <img src={CAL_LOGO} alt="Cal" className="mt-1 h-12 w-auto shrink-0 opacity-90" />
          </div>
          <div className="mt-5">
            <DashedRule />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div
            className="col-span-2 rounded-2xl border bg-white px-5 py-4"
            style={{ borderColor: THEME.border, borderLeft: `4px solid ${THEME.primary}`, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  Piloting and validating at Cal
                </div>
                <div className="mt-2 text-[18px] font-bold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                  Cal Rowing
                </div>
              </div>
              <img src={CAL_LOGO} alt="Cal" className="h-7 w-auto shrink-0 opacity-80" />
            </div>
            <div className="mt-2 text-[12px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              Real roster, lineups, fatigue workflow, and direct coach + athlete feedback on workflow quality, signal coverage, and day-to-day usefulness.
            </div>
          </div>

          <div
            className="rounded-2xl border bg-white px-5 py-4"
            style={{ borderColor: THEME.border, borderLeft: `4px solid ${THEME.purple}`, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}
          >
            <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.purple }}>
              In conversations with
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Tennis', 'Football', 'Water Polo', 'Swimming', 'Basketball', 'Soccer', 'Track & Field'].map((sport) => (
                <span
                  key={sport}
                  className="rounded-full border bg-zinc-50 px-2.5 py-1 text-[10px] font-semibold"
                  style={{ borderColor: THEME.border, fontFamily: THEME.fontSans, color: THEME.textPrimary }}
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border bg-white p-5" style={{ borderColor: THEME.border, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
          <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Advisory board
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {[
              {
                name: 'Sarah Bennett',
                role: 'Assistant Coach · Cal Women’s Rowing',
                note: 'Day-to-day understanding of collegiate rowing operations and athlete management.',
                accent: THEME.primary,
              },
              {
                name: 'Daniel Park',
                role: 'Sports Analytics Advisor',
                note: 'Helps shape how performance data is structured, interpreted, and made actionable.',
                accent: THEME.cyan,
              },
            ].map((advisor) => (
              <div
                key={advisor.name}
                className="rounded-xl border px-4 py-4"
                style={{ borderColor: THEME.border, background: THEME.light, borderLeft: `4px solid ${advisor.accent}` }}
              >
                <div className="flex items-start gap-4">
                  <AdvisorAvatar initials={advisor.name.split(' ').map((part) => part[0]).join('').slice(0, 2)} accent={advisor.accent} />
                  <div className="min-w-0">
                    <div className="text-[16px] font-bold leading-tight" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                      {advisor.name}
                    </div>
                    <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ fontFamily: THEME.fontMono, color: advisor.accent }}>
                      {advisor.role}
                    </div>
                    <div className="mt-3 text-[12px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                      {advisor.note}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {[
            { label: 'Sign ups', value: '245', accent: THEME.primary, note: 'placeholder' },
            { label: 'Fundraised', value: '$200', accent: THEME.cyan, note: 'placeholder' },
            { label: 'Athlete users', value: '150', accent: THEME.purple, note: 'placeholder' },
            { label: 'Coaches', value: '4', accent: THEME.amber, note: 'placeholder' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="rounded-2xl border bg-white px-5 py-5"
              style={{ borderColor: THEME.border, borderLeft: `5px solid ${metric.accent}`, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}
            >
              <div className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                {metric.label}
              </div>
              <div className="mt-3 text-[44px] font-bold leading-none tracking-[-0.06em]" style={{ fontFamily: THEME.fontMono, color: metric.accent }}>
                {metric.value}
              </div>
              <div className="mt-2 text-[11px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
                {metric.note}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

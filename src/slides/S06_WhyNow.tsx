import { DashedRule } from '../components/DashedRule'
import { PaperTexture } from '../components/PaperTexture'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

export function S06_WhyNow({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: '48px 44px 32px' }}>
      <TopNav section={sectionOverride ?? "05 · WHY NOW"} page={pageOverride ?? "12 / 12"} tone="light" />
      <PaperTexture strength={0.55} tint="rgba(255,255,255,0.93)" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center">
        <div className="max-w-[64rem]">
          <div className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Why now
          </div>
          <h1
            className="mt-2 text-[clamp(28px,4.2vw,44px)] font-bold leading-[1.04] tracking-[-0.05em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            Olympic prep is becoming data-driven.
          </h1>
          <p className="mt-3 max-w-[56rem] text-[15px] leading-[1.6]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            Every program is adding wearables and monitoring—more signals, more tools, more admin overhead. The winners are the teams that can unify it into
            a workflow coaches actually use.
          </p>
        </div>

        <div className="mt-5 max-w-[66rem]">
          <DashedRule />
        </div>

        <div className="mt-6 grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-2xl border bg-white p-5" style={{ borderColor: THEME.border, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              The trend across sports teams
            </div>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { k: 'More sensors', v: 'Sleep, readiness, load, GPS, wellness', c: THEME.primary },
                { k: 'More tools', v: 'Team ops + strength + performance + notes', c: THEME.cyan },
                { k: 'Same staff', v: 'Coaches can’t babysit exports daily', c: THEME.amber },
                { k: 'Same goal', v: 'Availability + selection + winning', c: THEME.purple },
              ].map((x) => (
                <div key={x.k} className="rounded-xl border px-4 py-3" style={{ borderColor: THEME.border, background: THEME.light, borderLeft: `4px solid ${x.c}` }}>
                  <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                    {x.k}
                  </div>
                  <div className="mt-1 text-[12px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                    {x.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl border bg-white p-5" style={{ borderColor: THEME.border, boxShadow: '0 2px 18px rgba(24,24,27,0.06)' }}>
            <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Olympic tailwind
            </div>
            <p className="mt-3 text-[13px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              With LA28 on the horizon, Olympic programs are formalizing monitoring stacks and recovery workflows. Adoption is accelerating—what’s missing is
              the unifying layer that turns data into decisions.
            </p>
            <div className="mt-4 rounded-xl border px-4 py-3" style={{ borderColor: `${THEME.primary}33`, background: `${THEME.primary}08` }}>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.primaryDarker }}>
                Our bet
              </div>
              <div className="mt-1 text-[12px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                A synth layer that connects everything and updates on schedule—so coaches spend time coaching, not reconciling.
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-[13px] italic" style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}>
          (Sources: LA28/Team USA wearable partnership announcements and the broader shift to athlete monitoring stacks.)
        </p>
      </div>
    </div>
  )
}

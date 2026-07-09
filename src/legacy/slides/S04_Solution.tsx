import { DashedRule } from '../components/DashedRule'
import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

function Badge({ text, color }: { text: string; color: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-full border text-[11px] uppercase tracking-[0.14em]"
      style={{ borderColor: `${color}40`, color, fontFamily: THEME.fontMono, background: `${color}10` }}
    >
      {text}
    </span>
  )
}

function CakeIllustration() {
  return (
    <svg viewBox="0 0 520 420" className="w-full h-full" aria-hidden="true">
      <ellipse cx="260" cy="392" rx="170" ry="18" fill="rgba(0,0,0,0.10)" />

      <path
        d="M120 150c0-38 62-70 140-70s140 32 140 70v150c0 40-62 72-140 72s-140-32-140-72V150z"
        fill="rgba(5,150,105,0.10)"
        stroke={THEME.primary}
        strokeWidth={3}
      />
      <path d="M140 195c34 22 86 33 120 33s86-11 120-33" fill="none" stroke="rgba(5,150,105,0.55)" strokeWidth={2} />
      <path d="M140 245c34 22 86 33 120 33s86-11 120-33" fill="none" stroke="rgba(5,150,105,0.45)" strokeWidth={2} />
      <path d="M140 295c34 22 86 33 120 33s86-11 120-33" fill="none" stroke="rgba(5,150,105,0.35)" strokeWidth={2} />

      <rect x="155" y="168" width="210" height="34" rx="10" fill="rgba(167,243,208,0.90)" />
      <text
        x="260"
        y="190"
        textAnchor="middle"
        fontFamily={THEME.fontMono}
        fontSize="14"
        fontWeight="800"
        letterSpacing="2"
        fill="#052e2b"
      >
        SYNTH LAYER
      </text>

      <path d="M270 60c-24 20-30 38-30 58" fill="none" stroke="rgba(0,0,0,0.45)" strokeWidth={3} strokeLinecap="round" />
      <circle cx="238" cy="130" r="18" fill="rgba(239,68,68,0.92)" stroke="rgba(0,0,0,0.40)" strokeWidth={3} />
      <rect x="180" y="16" width="160" height="34" rx="10" fill="rgba(255,255,255,0.80)" stroke={THEME.border} />
      <text
        x="260"
        y="39"
        textAnchor="middle"
        fontFamily={THEME.fontMono}
        fontSize="12"
        fontWeight="800"
        letterSpacing="2"
        fill={THEME.textMuted}
      >
        BASE LAYER
      </text>

      <path d="M260 52v36" stroke={THEME.textMuted} strokeWidth={2.5} markerEnd="url(#arrowDown)" />
      <path d="M390 205h70" stroke={THEME.primary} strokeWidth={3} markerEnd="url(#arrowRight)" />
      <text x="392" y="188" fontFamily={THEME.fontMono} fontSize="11" fill={THEME.primary} fontWeight={800}>
        REAL VALUE →
      </text>

      <defs>
        <marker id="arrowDown" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
          <polygon points="0,2 10,2 5,10" fill={THEME.textMuted} />
        </marker>
        <marker id="arrowRight" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
          <polygon points="0,0 10,5 0,10" fill={THEME.primary} />
        </marker>
      </defs>
    </svg>
  )
}

function BeforeAfterCard({
  title,
  before,
  after,
}: {
  title: string
  before: string[]
  after: string[]
}) {
  return (
    <div className="rounded-xl border overflow-hidden" style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.90)' }}>
      <div className="px-4 py-3 border-b" style={{ borderColor: THEME.border }}>
        <div className="text-[12px] tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          {title}
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div className="p-4" style={{ borderRight: `1px solid ${THEME.border}` }}>
          <div className="text-[11px] font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.red }}>
            BEFORE
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {before.map((b) => (
              <div key={b} className="flex items-start gap-2">
                <div className="mt-[6px] h-1.5 w-1.5 rounded-full" style={{ background: `${THEME.red}80` }} />
                <div className="text-[13px] leading-[1.35]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                  {b}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4" style={{ background: `${THEME.primary}06` }}>
          <div className="text-[11px] font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>
            AFTER
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {after.map((a) => (
              <div key={a} className="flex items-start gap-2">
                <div className="mt-[6px] h-1.5 w-1.5 rounded-full" style={{ background: THEME.accent }} />
                <div className="text-[13px] leading-[1.35]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                  {a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function PortalPreview() {
  return (
    <div className="rounded-xl overflow-hidden border h-full" style={{ borderColor: THEME.border, background: '#fff' }}>
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: THEME.darkDeep }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 rounded px-3 py-1 text-[11px] text-white/60" style={{ background: 'rgba(255,255,255,0.10)', fontFamily: THEME.fontMono }}>
          app.synthsports.com / synthesis
        </div>
        <div className="text-[11px] text-white/45" style={{ fontFamily: THEME.fontMono }}>Synced 6:00 AM</div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[14px] font-bold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
              Coach Portal
            </div>
            <div className="text-[12px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              Unified athlete view · sources connected · AI insights
            </div>
          </div>
          <div className="flex gap-2">
            {[
              { l: 'Sources', v: '4', c: THEME.accent },
              { l: 'Alerts', v: '2', c: THEME.red },
              { l: 'Sync', v: 'Daily', c: THEME.cyan },
            ].map((s) => (
              <div key={s.l} className="rounded-lg px-2.5 py-1 border" style={{ borderColor: `${s.c}35`, background: `${s.c}10` }}>
                <div className="text-[10px]" style={{ fontFamily: THEME.fontMono, color: s.c }}>
                  {s.l}: {s.v}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 gap-3">
          <div className="col-span-7 rounded-lg border p-3" style={{ borderColor: THEME.border, background: '#FAFAF9' }}>
            <div className="text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Athlete table
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2 text-[11px]" style={{ fontFamily: THEME.fontMono }}>
              {['Erg', 'Splits', 'Lifts', 'Recovery'].map((h) => (
                <div key={h} className="rounded-md px-2 py-2 border" style={{ borderColor: THEME.border, color: THEME.textSecondary, background: '#fff' }}>
                  {h}
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-md border px-3 py-3" style={{ borderColor: THEME.border, background: '#fff' }}>
              <div className="text-[12px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                “Torres sleep ↓ 3 nights, compliance 88% · flag fatigue risk.”
              </div>
              <div className="mt-2 text-[11px]" style={{ fontFamily: THEME.fontMono, color: THEME.amber }}>
                AI INSIGHT
              </div>
            </div>
          </div>

          <div className="col-span-5 rounded-lg border p-3" style={{ borderColor: THEME.border, background: `${THEME.amber}07` }}>
            <div className="text-[11px] tracking-[0.14em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.amber }}>
              Synthesis &amp; AI report
            </div>
            <div className="mt-3 text-[12px] leading-[1.5]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              Joined across sources into one story: who’s improving, who’s at risk, and what to adjust today.
            </div>
            <div className="mt-3 flex flex-col gap-2">
              {[
                { t: 'Load vs performance', c: THEME.purple },
                { t: 'Sleep vs compliance', c: THEME.cyan },
                { t: 'Risk flags', c: THEME.red },
              ].map((m) => (
                <div key={m.t} className="rounded-md border px-3 py-2" style={{ borderColor: `${m.c}35`, background: '#fff' }}>
                  <div className="text-[11px]" style={{ fontFamily: THEME.fontMono, color: m.c }}>
                    {m.t}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function S04_Solution() {
  return (
    <div className="absolute inset-0">
      <TopNav section="03 · SOLUTION" page="4 / 13" tone="light" />
      <PaperTexture strength={0.75} tint="rgba(244, 243, 236, 0.95)" />

      <div className="absolute inset-0 px-12 pt-20 pb-10" style={{ color: THEME.textPrimary }}>
        <SectionLabel text="03 · SOLUTION" />
        <div className="mt-3 text-[64px] leading-[0.98] font-bold" style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.07em' }}>
          Synthesis &amp; AI Report.
        </div>
        <div className="mt-3">
          <DashedRule />
        </div>

        <div className="mt-5 grid grid-cols-12 gap-6" style={{ height: 'calc(100% - 150px)' }}>
          <div className="col-span-3 flex flex-col gap-4">
            <div className="rounded-xl border p-5" style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.86)' }}>
              <div className="flex items-center justify-between">
                <Badge text="Solution 1" color={THEME.textMuted} />
                <div className="text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  Base app
                </div>
              </div>
              <div className="mt-4 text-[18px] font-bold" style={{ fontFamily: THEME.fontSerif }}>
                Workflow Door
              </div>
              <div className="mt-2 text-[13px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                Lineups · Live timing · Athlete profiles
              </div>
              <div className="mt-4 rounded-lg px-3 py-2 border" style={{ borderColor: THEME.border, background: '#fff' }}>
                <div className="text-[12px]" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  Gets you in
                </div>
                <div className="mt-1 text-[12px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
                  Small add-on
                </div>
              </div>
            </div>

            <div className="rounded-xl border p-5" style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.86)' }}>
              <div className="text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                Key line
              </div>
              <div className="mt-3 text-[16px] leading-[1.35]" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                Connect once. synth. handles the rest.
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="w-full h-full flex items-center justify-center">
              <CakeIllustration />
            </div>
            <div className="mt-2 text-[12px] italic text-center" style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}>
              Cherry = Base Layer (S1). Cake = Synth Layer (S2–S4).
            </div>
          </div>

          <div className="col-span-5">
            <div
              className="rounded-2xl border h-full p-5"
              style={{
                borderColor: `${THEME.primary}55`,
                background: 'rgba(255,255,255,0.86)',
                boxShadow: '0 18px 35px rgba(0,0,0,0.08)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge text="Synth Layer" color={THEME.primary} />
                  <div className="text-[12px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                    The real USP: solves fragmentation automatically.
                  </div>
                </div>
                <div className="text-[11px] tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  Solutions 2–4
                </div>
              </div>

              <div className="mt-4 grid grid-cols-12 gap-4" style={{ height: 'calc(100% - 44px)' }}>
                <div className="col-span-12 rounded-xl border p-4" style={{ borderColor: THEME.border, background: '#fff' }}>
                  <div className="flex items-center justify-between">
                    <Badge text="Solution 2" color={THEME.cyan} />
                    <div className="text-[12px] font-bold" style={{ fontFamily: THEME.fontSerif }}>
                      Connectors + Cloud Scraping
                    </div>
                  </div>
                  <div className="mt-2 text-[13px] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                    Sheets OAuth · Chrome extension on any web app · CSV fallback · scheduled sync in the cloud.
                  </div>
                </div>

                <div className="col-span-12">
                  <BeforeAfterCard
                    title="Solution 3 · Synthesis (before / after)"
                    before={['Data trapped in 5–6 tools', 'Manual exports, stale context', 'No unified athlete narrative']}
                    after={['Sources normalized + joined automatically', 'One athlete profile per rower', 'Trends + alerts built on complete data']}
                  />
                </div>

                <div className="col-span-12 flex flex-col min-h-0">
                  <div className="rounded-xl border px-4 py-3" style={{ borderColor: THEME.border, background: '#fff' }}>
                    <div className="flex items-center justify-between">
                      <Badge text="Solution 4" color={THEME.amber} />
                      <div className="text-[12px] font-bold" style={{ fontFamily: THEME.fontSerif }}>
                        Synthesis &amp; AI Report (portal preview)
                      </div>
                    </div>
                    <div className="mt-2 text-[13px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                      Coach wakes up to a complete picture · and an AI summary of what changed.
                    </div>
                  </div>
                  <div className="mt-3 flex-1 min-h-0">
                    <PortalPreview />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


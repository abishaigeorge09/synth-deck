import { motion } from 'framer-motion'
import { LineupBoardMockup } from '../components/LineupBoardMockup'
import { SynthLayerDashboardMockup } from '../components/SynthLayerDashboardMockup'
import { TopNav } from '../components/TopNav'
import { DECK_SLIDE_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'
import { STAGGER, TRANSITIONS } from '../lib/motion'

const PAD = 'clamp(22px, 3.4vw, 40px) clamp(18px, 3.4vw, 48px) clamp(18px, 3.2vw, 32px)'

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: STAGGER.cards, delayChildren: 0.08 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
}

function MiniAppCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-0 rounded-2xl border bg-white shadow-[0_1px_0_rgba(24,24,27,0.02),0_22px_48px_rgba(24,24,27,0.12)]" style={{ borderColor: THEME.border }}>
      <div className="border-b px-4 py-3" style={{ borderColor: THEME.border, background: THEME.light }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          Custom tool
        </div>
        <div className="mt-1 text-[16px] font-semibold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
          {title}
        </div>
        <div className="mt-1 text-[11px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          {subtitle}
        </div>
      </div>
      <div className="min-h-0 p-3">{children}</div>
    </div>
  )
}

function SessionTimerMock() {
  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border bg-white" style={{ borderColor: THEME.border }}>
      <div className="border-b px-4 py-3" style={{ borderColor: THEME.border, background: THEME.light }}>
        <div className="text-[9px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          Session timer
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col px-4 py-3">
        <div className="flex items-center justify-center">
          <div className="relative h-[210px] w-[210px]">
            {/* crown */}
            <div
              className="absolute left-1/2 top-[-12px] h-7 w-10 -translate-x-1/2 rounded-[14px] border bg-white"
              style={{ borderColor: THEME.border, boxShadow: '0 8px 18px rgba(24,24,27,0.08)' }}
            />

            {/* case */}
            <div
              className="absolute inset-0 rounded-full border bg-white"
              style={{
                borderColor: THEME.border,
                boxShadow: '0 1px 0 rgba(24,24,27,0.03), 0 18px 34px rgba(24,24,27,0.12)',
              }}
            />
            <div
              className="absolute inset-[10px] rounded-full"
              style={{
                background: `radial-gradient(circle at 40% 28%, rgba(255,255,255,0.95) 0%, rgba(244,244,245,0.92) 55%, rgba(250,250,250,0.98) 100%)`,
                border: `1px solid ${THEME.border}`,
              }}
            />

            {/* center pin only (no lines) */}
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full" aria-hidden style={{ background: THEME.primary }} />
            <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" aria-hidden />

            {/* digital readout */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="text-[34px] font-bold leading-none tracking-[-0.02em]" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                12:48
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                Lap 03 · 2:11
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-lg border px-3 py-2" style={{ borderColor: THEME.border, background: THEME.white }}>
          <div className="flex items-center justify-between">
            <div className="text-[9px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Laps
            </div>
            <div className="text-[9px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              Saved to athlete IDs
            </div>
          </div>
          <div className="mt-2 grid grid-cols-3 gap-2 text-[10px]" style={{ fontFamily: THEME.fontMono }}>
            {[
              { k: '01', v: '2:05.8' },
              { k: '02', v: '2:09.3' },
              { k: '03', v: '2:11.0' },
            ].map((x) => (
              <div key={x.k} className="rounded-md border px-2 py-1" style={{ borderColor: THEME.border, background: THEME.light, color: THEME.textSecondary }}>
                <span style={{ color: THEME.textMuted }}>#{x.k}</span> {x.v}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-3">
          <div className="grid grid-cols-3 gap-2">
            {(['Start', 'Lap', 'Stop'] as const).map((x) => {
              const primary = x === 'Start'
              const danger = x === 'Stop'
              return (
                <button
                  key={x}
                  type="button"
                  className="rounded-lg border px-3 py-2 text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: THEME.fontMono,
                    borderColor: primary ? `${THEME.primary}55` : danger ? 'rgba(239,68,68,0.35)' : THEME.border,
                    background: primary ? `${THEME.primary}12` : THEME.white,
                    color: primary ? THEME.primary : danger ? 'rgba(239,68,68,0.9)' : THEME.textSecondary,
                    boxShadow: primary ? `0 12px 26px ${THEME.primary}18` : undefined,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  {x}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function RequestToolApp() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-white" style={{ borderColor: THEME.border }}>
      <div className="border-b px-3 py-2.5" style={{ borderColor: THEME.border, background: THEME.light }}>
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="text-[8px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Custom tools
            </div>
            <div className="mt-1 text-[15px] font-semibold leading-tight" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
              Request a tool
            </div>
            <div className="mt-1 text-[10px]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              We’ll ship it in <span style={{ color: THEME.textPrimary, fontWeight: 600 }}>24 hours</span>.
            </div>
          </div>
          <span
            className="shrink-0 rounded-full border px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wider"
            style={{ borderColor: `${THEME.primary}44`, background: `${THEME.primary}10`, color: THEME.primary, fontFamily: THEME.fontMono }}
          >
            Only 2 live
          </span>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2.5 p-3">
        <div className="rounded-lg border px-3 py-2" style={{ borderColor: `${THEME.primary}33`, background: `${THEME.primary}08` }}>
          <div className="text-[9px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
            What do you need next?
          </div>
          <div className="mt-1 text-[9px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            Same roster IDs, same connectors. New tool appears in the sidebar when it’s ready.
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { t: 'Travel plan', sub: 'lineup + vans', c: THEME.cyan },
            { t: 'Seat alerts', sub: 'risk → swap', c: THEME.amber },
            { t: 'Compliance', sub: 'missing data', c: THEME.purple },
          ].map((x) => (
            <div key={x.t} className="rounded-lg border px-2.5 py-2" style={{ borderColor: THEME.border, background: THEME.white }}>
              <div className="text-[9px] font-semibold leading-tight" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                {x.t}
              </div>
              <div className="mt-0.5 text-[7px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: `${x.c}` }}>
                {x.sub}
              </div>
            </div>
          ))}
        </div>

        <div className="min-h-0">
          <div className="text-[8px] font-bold uppercase tracking-wider" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Your request
          </div>
          <div
            className="mt-2 flex min-h-0 flex-1 w-full items-start rounded-lg border bg-white px-3 py-2.5 text-[10px]"
            style={{ borderColor: THEME.border, fontFamily: THEME.fontSans, color: THEME.textMuted }}
          >
            e.g. “Boat seat alerts when sleep &lt; 6.5h + high load”…
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="text-[9px]" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              Response: <span style={{ color: THEME.textSecondary, fontWeight: 600 }}>within 24 hours</span>
            </div>
            <button
              type="button"
              className="h-8 rounded-md px-3 text-[9px] font-bold uppercase tracking-wider"
              style={{ fontFamily: THEME.fontMono, background: THEME.primary, color: THEME.white }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function CustomToolsShowcaseSlide({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? "02 · SOLUTION"} page={pageOverride ?? `18 / ${DECK_SLIDE_TOTAL}`} tone="light" />

      <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center">
        <motion.div className="max-w-[66rem]" variants={containerVariants} initial="hidden" animate="show">
          <motion.h1
            variants={itemVariants}
            className="text-[clamp(20px,3vw,30px)] font-bold leading-[1.08] tracking-[-0.04em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
          >
            Custom tools, same IDs.
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="mt-1 max-w-[52rem] text-[11px] leading-snug text-zinc-500"
            style={{ fontFamily: THEME.fontSans }}
          >
            Every tool is just another surface on top of the synth layer—lineups, timers, reports—writing back into one roster.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-4 grid min-h-0 grid-cols-1 gap-4 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={itemVariants} className="min-h-0">
            <MiniAppCard title="Lineups" subtitle="Build boats on real roster IDs.">
              <div className="h-[min(46vh,420px)] overflow-hidden rounded-xl">
                <SynthLayerDashboardMockup navMode="lineups-editor" showSidebarDeploy={false} replaceMain={<LineupBoardMockup />} />
              </div>
            </MiniAppCard>
          </motion.div>

          <motion.div variants={itemVariants} className="min-h-0">
            <MiniAppCard title="Session timer" subtitle="Capture intervals + notes in practice.">
              <div className="h-[min(46vh,420px)] overflow-hidden rounded-xl">
                <SynthLayerDashboardMockup navMode="custom-tools" showSidebarDeploy={false} replaceMain={<SessionTimerMock />} />
              </div>
            </MiniAppCard>
          </motion.div>

          <motion.div variants={itemVariants} className="min-h-0">
            <MiniAppCard title="Request a tool" subtitle="We’ll ship it in 24 hours.">
              <div className="h-[min(46vh,420px)] overflow-hidden rounded-xl">
                <SynthLayerDashboardMockup navMode="request-tool" showSidebarDeploy={false} replaceMain={<RequestToolApp />} aiInsightText="" />
              </div>
            </MiniAppCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


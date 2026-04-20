import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TopNav } from '../components/TopNav'
import { DECK_SLIDE_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

const PAD = 'clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 48px) clamp(20px, 3.5vw, 32px)'

const OFFICIAL_CONNECTORS = [
  { name: 'Google Sheets', detail: 'Two-way roster & erg workbooks' },
  { name: 'Google Calendar', detail: 'Practice & academic load' },
  { name: 'Concept2 Logbook', detail: 'Official erg history' },
  { name: 'Strava', detail: 'Activities + webhooks' },
  { name: 'Apple Health', detail: 'Sleep, HRV (via HealthKit)' },
  { name: 'Slack', detail: 'Parse channel posts' },
] as const

function BrowserShell({ url, children }: { url: string; children: React.ReactNode }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white shadow-[0_18px_48px_rgba(0,0,0,0.14)]"
      style={{ borderColor: THEME.border }}
    >
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: THEME.border, background: '#f4f4f5' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="truncate text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
          {url}
        </span>
      </div>
      {children}
    </div>
  )
}

function Toggle({ on }: { on: boolean }) {
  return (
    <div
      className="h-[18px] w-8 rounded-full p-[2px]"
      style={{ background: on ? THEME.accent : 'rgba(113,113,122,0.5)' }}
    >
      <motion.div className="h-3.5 w-3.5 rounded-full bg-white" animate={{ x: on ? 14 : 0 }} transition={{ duration: 0.28 }} />
    </div>
  )
}

function ConnectToolsLoopMiniSite({ tick }: { tick: number }) {
  const stage = tick % 6
  const subTab: 'official' | 'aiImport' | 'manual' = stage <= 2 || stage === 5 ? 'official' : stage === 3 ? 'aiImport' : 'manual'
  const officialCount = stage === 0 ? 2 : stage === 1 ? 4 : stage === 2 ? OFFICIAL_CONNECTORS.length : 0
  const activeOfficialIndex = Math.max(0, Math.min(officialCount - 1, OFFICIAL_CONNECTORS.length - 1))

  const cursorTarget = subTab === 'official'
    ? { x: 93, y: 38 + (activeOfficialIndex % 3) * 14 }
    : subTab === 'aiImport'
      ? { x: 29, y: 23 }
      : { x: 42, y: 23 }

  return (
    <div className="relative h-full overflow-hidden">
      <motion.div
        className="pointer-events-none absolute z-30"
        animate={{ left: `${cursorTarget.x}%`, top: `${cursorTarget.y}%` }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ marginLeft: -8, marginTop: -8 }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden>
          <path d="M5 3v14l4.5-4.5L13 20l2-1-3.2-7.2L17 11.5 5 3z" fill="#18181B" stroke="#fff" strokeWidth="1.1" strokeLinejoin="round" />
        </svg>
      </motion.div>

      <div className="h-full bg-white">
          <header className="flex items-start justify-between border-b px-4 py-3" style={{ borderColor: THEME.border }}>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                synth. Agent
              </div>
              <h3 className="mt-0.5 text-[16px] font-semibold" style={{ color: THEME.textPrimary }}>
                Connectors · import · sync
              </h3>
            </div>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border text-[12px]" style={{ borderColor: THEME.border, color: THEME.textMuted }}>
              ×
            </button>
          </header>

          <nav className="border-b px-4 py-2" style={{ borderColor: THEME.border }}>
            <span className="inline-block border-b-2 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: THEME.primary, color: THEME.primary, fontFamily: THEME.fontMono }}>
              Add connector
            </span>
          </nav>

          <div className="p-3">
            <div className="mb-3 flex gap-2">
              {[
                { id: 'official', label: 'Official connectors' },
                { id: 'aiImport', label: 'AI import' },
                { id: 'manual', label: 'Manual import' },
              ].map((tab) => {
                const active = subTab === tab.id
                return (
                  <button
                    key={tab.id}
                    className="rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]"
                    style={{
                      border: `1px solid ${active ? THEME.primary : THEME.border}`,
                      background: active ? THEME.primary : THEME.white,
                      color: active ? THEME.white : THEME.textPrimary,
                      fontFamily: THEME.fontMono,
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {subTab === 'official' ? (
              <div className="grid grid-cols-2 gap-2">
                {OFFICIAL_CONNECTORS.map((item, idx) => {
                  const on = idx < officialCount
                  return (
                    <div key={item.name} className="flex items-start justify-between rounded-lg border px-3 py-2.5" style={{ borderColor: THEME.border, background: THEME.light }}>
                      <div className="min-w-0 pr-2">
                        <div className="truncate text-[11px] font-semibold" style={{ color: THEME.textPrimary }}>
                          {item.name}
                        </div>
                        <div className="mt-0.5 text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                          {item.detail}
                        </div>
                      </div>
                      <Toggle on={on} />
                    </div>
                  )
                })}
              </div>
            ) : null}

            {subTab === 'aiImport' ? (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { title: 'Upload screenshot', body: 'Pick an image and parse it.' },
                  { title: 'Voice note', body: 'Capture context quickly.' },
                  { title: 'Paste text', body: 'Import Slack/email notes.' },
                ].map((card, idx) => (
                  <div key={card.title} className="rounded-lg border p-2.5" style={{ borderColor: THEME.border, background: THEME.white }}>
                    <div className="text-[9px] font-bold uppercase tracking-[0.12em]" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                      {card.title}
                    </div>
                    <div className="mt-1 text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                      {card.body}
                    </div>
                    {card.title === 'Voice note' ? (
                      <div className="mt-2.5 flex items-end gap-1.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border" style={{ borderColor: THEME.border, background: THEME.light }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden>
                            <path d="M12 4a3 3 0 0 0-3 3v5a3 3 0 1 0 6 0V7a3 3 0 0 0-3-3z" fill="none" stroke={THEME.primary} strokeWidth="1.8" strokeLinecap="round" />
                            <path d="M7 11v1a5 5 0 0 0 10 0v-1M12 17v3" fill="none" stroke={THEME.primary} strokeWidth="1.8" strokeLinecap="round" />
                          </svg>
                        </div>
                        {[4, 7, 10, 8, 5].map((h, i) => (
                          <motion.span
                            key={i}
                            className="w-1 rounded-full"
                            style={{ height: `${h}px`, background: THEME.primary }}
                            animate={{ scaleY: idx === stage % 3 ? [0.6, 1.2, 0.7] : 1 }}
                            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.06 }}
                          />
                        ))}
                      </div>
                    ) : null}
                    <motion.div
                      className="mt-2 h-1.5 rounded-full"
                      style={{ background: `${THEME.primary}22` }}
                      animate={{ opacity: idx === stage % 3 ? [0.45, 1, 0.45] : 0.45 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  </div>
                ))}
              </div>
            ) : null}

            {subTab === 'manual' ? (
              <div className="rounded-xl border border-dashed p-4 text-center" style={{ borderColor: THEME.border, background: THEME.light }}>
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg border" style={{ borderColor: THEME.border, background: THEME.white }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
                    <path d="M6 3h8l4 4v14H6z" fill="none" stroke={THEME.textSecondary} strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M14 3v5h5" fill="none" stroke={THEME.textSecondary} strokeWidth="1.6" strokeLinejoin="round" />
                    <path d="M12 18v-6m0 0l-2.5 2.5M12 12l2.5 2.5" fill="none" stroke={THEME.primary} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div className="text-[9px] font-semibold uppercase tracking-[0.14em]" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  Drag & drop
                </div>
                <div className="mt-1 text-[10px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                  CSV, Excel, screenshots. Preview before commit.
                </div>
                <div className="mt-3 rounded-lg border px-3 py-2 text-left text-[9px]" style={{ borderColor: THEME.border, background: THEME.white }}>
                  womens-week3-erg.csv — preview ready
                </div>
              </div>
            ) : null}
          </div>
        </div>
    </div>
  )
}

export function S04_ProductSetupLoop({ pageOverride, sectionOverride }: NavOverrides) {
  const [tick, setTick] = useState(0)
  // Show Step 1 a bit longer, then keep Step 2 in focus.
  const setupFocused = tick % 8 < 2
  const [teamName, setTeamName] = useState('')

  useEffect(() => {
    const id = window.setInterval(() => {
      setTick((v) => (v + 1) % 16)
    }, 900)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '02 · SOLUTION'} page={pageOverride ?? `5 / ${DECK_SLIDE_TOTAL}`} tone="light" />
      <div className="grid min-h-0 flex-1 grid-cols-2 items-center gap-4">
        <motion.div
          className="min-h-0"
          animate={{
            scale: setupFocused ? 1 : 0.985,
            opacity: setupFocused ? 1 : 0.9,
            filter: setupFocused ? 'blur(0px)' : 'blur(1.8px)',
          }}
          transition={{ duration: 0.35 }}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
            Step 1 · Set up team
          </p>
          <BrowserShell url="app.synthsports.com/onboarding/setup-team">
            <div className="space-y-4 p-4">
              <div className="text-[11px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                Add team details and upload roster first.
              </div>

              <div className="rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fafaf9' }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  Team name
                </div>
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Enter team name..."
                  className="mt-2 w-full rounded-lg border px-3 py-2 text-[13px] font-semibold outline-none"
                  style={{
                    borderColor: `${THEME.primary}33`,
                    fontFamily: THEME.fontSans,
                    color: THEME.textPrimary,
                    background: THEME.white,
                  }}
                  onMouseDown={(e) => e.stopPropagation()}
                />
              </div>

              <div className="rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fafaf9' }}>
                <div className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  Athlete roster
                </div>
                <div
                  className="mt-2 flex items-center justify-between gap-3 rounded-lg border px-3 py-2"
                  style={{ borderColor: `${THEME.primary}44`, background: `${THEME.primary}10` }}
                >
                  <div className="min-w-0">
                    <div className="truncate text-[11px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                      cal-athletes-fall2026.csv
                    </div>
                    <div className="mt-0.5 text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                      46 athletes imported
                    </div>
                  </div>
                  <motion.span
                    className="rounded-full border px-2 py-1 text-[8px] font-bold uppercase tracking-[0.14em]"
                    style={{ borderColor: `${THEME.accent}55`, color: THEME.primary, fontFamily: THEME.fontMono }}
                    animate={{ opacity: [0.75, 1, 0.75] }}
                    transition={{ duration: 1.4, repeat: Infinity }}
                  >
                    Ready
                  </motion.span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { k: 'Boats', v: '8+' },
                  { k: 'Season', v: 'Fall 2026' },
                  { k: 'Invite mode', v: 'Email + code' },
                ].map((item) => (
                  <div key={item.k} className="rounded-lg border px-2.5 py-2" style={{ borderColor: THEME.border, background: THEME.white }}>
                    <div className="text-[8px] font-bold uppercase tracking-[0.12em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                      {item.k}
                    </div>
                    <div className="mt-1 text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                      {item.v}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </BrowserShell>
        </motion.div>

        <motion.div
          className="min-h-0"
          animate={{
            scale: setupFocused ? 0.985 : 1,
            opacity: setupFocused ? 0.9 : 1,
            filter: setupFocused ? 'blur(1.8px)' : 'blur(0px)',
          }}
          transition={{ duration: 0.35 }}
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
            Step 2 · Connect tools
          </p>
          <BrowserShell url="app.synthsports.com/onboarding/connect-tools">
            <ConnectToolsLoopMiniSite tick={tick} />
          </BrowserShell>
        </motion.div>
      </div>
    </div>
  )
}

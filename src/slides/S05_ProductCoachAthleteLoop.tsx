import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { SynthLayerDashboardMockup, type DashboardAthleteRow } from '../components/SynthLayerDashboardMockup'
import { TopNav } from '../components/TopNav'
import { DECK_SLIDE_TOTAL } from '../lib/deckTotal'
import { THEME } from '../lib/theme'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

const PAD = 'clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 48px) clamp(20px, 3.5vw, 32px)'
const LOOP_MS = 15000
const COACH_PHASE_MS = 9000

const COACH_ROWS: DashboardAthleteRow[] = [
  { name: 'Matthew', pos: '1V 3-seat', erg: '6:21.2', split: '1:35.1', squat: '292', load: 'Med', sleep: '7.9h', comply: '97%', risk: false },
  { name: 'Lily Pember', pos: '1V stroke', erg: '6:18.4', split: '1:34.0', squat: '285', load: 'Low', sleep: '8.0h', comply: '99%', risk: false },
  { name: 'Maya Collins', pos: '2V bow', erg: '6:29.1', split: '1:37.0', squat: '261', load: 'High', sleep: '5.7h', comply: '86%', risk: true },
  { name: 'Nia Brooks', pos: '2V 5-seat', erg: '6:24.7', split: '1:35.9', squat: '274', load: 'Med', sleep: '6.9h', comply: '91%', risk: false },
  { name: 'Ari Kim', pos: '2V stroke', erg: '6:19.9', split: '1:34.4', squat: '288', load: 'Low', sleep: '7.8h', comply: '95%', risk: false },
]

const COACH_QUESTION = 'Who should we monitor this week based on load trend and sleep drop?'

function BrowserShell({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div
      className="overflow-hidden rounded-[20px] border bg-white shadow-[0_18px_56px_rgba(0,0,0,0.24)]"
      style={{ borderColor: THEME.border }}
    >
      <div className="flex items-center gap-2 border-b px-3 py-2" style={{ borderColor: THEME.border, background: '#f4f4f5' }}>
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <span className="truncate text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
          {title}
        </span>
      </div>
      {children}
    </div>
  )
}

function AiOverlay({
  showResponse,
  questionText,
  showCaret,
}: {
  showResponse: boolean
  questionText: string
  showCaret: boolean
}) {
  const responseRows = [
    { name: 'Maya Collins', note: 'sleep down 3 nights', trend: [72, 68, 61, 59] },
    { name: 'Nia Brooks', note: 'load spike after intervals', trend: [64, 66, 74, 77] },
    { name: 'Star Miller', note: 'recovering well, monitor anyway', trend: [58, 63, 67, 70] },
  ]
  return (
    <div className="w-[360px] rounded-xl border bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.22)]" style={{ borderColor: THEME.border }} data-no-advance>
      <div className="flex items-center justify-between gap-2">
        <div className="text-[9px] font-bold uppercase tracking-[0.16em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          synth. AI
        </div>
        <span className="rounded-full border px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${THEME.primary}44`, color: THEME.primary, fontFamily: THEME.fontMono }}>
          Team scope
        </span>
      </div>
      <div
        className="mt-2 rounded-lg border px-2.5 py-2 text-[11px]"
        style={{
          borderColor: THEME.border,
          background: THEME.white,
          fontFamily: THEME.fontSans,
          color: THEME.textPrimary,
          minHeight: '44px',
          lineHeight: 1.35,
        }}
      >
        {questionText}
        {showCaret ? (
          <motion.span
            className="ml-0.5 inline-block align-middle"
            style={{ color: THEME.textPrimary }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            |
          </motion.span>
        ) : null}
      </div>

      {showResponse ? (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
          {responseRows.map((row) => {
            const max = Math.max(...row.trend)
            return (
              <div key={row.name} className="rounded-lg border px-2.5 py-2" style={{ borderColor: THEME.border, background: '#fff' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="truncate text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                      {row.name}
                    </div>
                    <div className="mt-0.5 text-[8px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                      {row.note}
                    </div>
                  </div>
                  <div className="flex h-8 w-[88px] items-end gap-1">
                    {row.trend.map((v, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t-sm"
                        style={{
                          height: `${Math.max(6, Math.round((v / max) * 28))}px`,
                          background: i === row.trend.length - 1 ? THEME.accent : `${THEME.primary}88`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>
      ) : (
        <div className="mt-3 text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
          Generating summary...
        </div>
      )}
    </div>
  )
}

function AthleteMiniApp({ scrollOffset }: { scrollOffset: number }) {
  const sessionSplits = [104.6, 103.9, 103.2, 102.8, 101.9, 101.4]
  const minSplit = Math.min(...sessionSplits)
  const maxSplit = Math.max(...sessionSplits)
  const points = sessionSplits
    .map((value, idx) => {
      const x = (idx / (sessionSplits.length - 1)) * 220
      const t = (value - minSplit) / Math.max(1e-6, maxSplit - minSplit)
      const y = 70 - t * 52
      return `${x},${y}`
    })
    .join(' ')

  return (
    <div className="h-[430px] overflow-hidden bg-[linear-gradient(180deg,#ffffff,#f8fafc)]">
      <div className="relative z-20 border-b bg-[#0C0A09] px-3 py-2" style={{ borderColor: THEME.border }}>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-[8px] text-white/65" style={{ fontFamily: THEME.fontMono }}>
            app.synthsports.com/athlete/home
          </span>
          <span className="rounded-full border px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-emerald-300" style={{ borderColor: 'rgba(16,185,129,0.5)', fontFamily: THEME.fontMono }}>
            Athlete
          </span>
        </div>
      </div>

      <div className="relative h-[calc(430px-37px)] overflow-hidden">
        <motion.div
          className="p-3.5"
          animate={{ y: -scrollOffset }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
        <div className="rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fff' }}>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border text-[13px] font-bold" style={{ borderColor: `${THEME.primary}44`, background: `${THEME.primary}12`, color: THEME.primary, fontFamily: THEME.fontMono }}>
              M
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
                Matthew
              </div>
              <div className="mt-1 text-[8px] uppercase tracking-[0.12em] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
                1V 3-seat · senior · cal-wr-2026
              </div>
              <div className="mt-2 grid grid-cols-3 gap-1.5">
                {[
                  { label: '2K', value: '6:19.8' },
                  { label: 'Split', value: '1:34.6' },
                  { label: 'Sleep', value: '7.9h' },
                ].map((m) => (
                  <div key={m.label} className="rounded-md border px-2 py-1.5" style={{ borderColor: THEME.border, background: THEME.light }}>
                    <div className="text-[6px] uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                      {m.label}
                    </div>
                    <div className="text-[8px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-[1.1fr_1fr] gap-2.5">
          <div className="rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fff' }}>
            <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
              Lead athlete card
            </div>
            <div className="mt-2 flex items-center gap-3 rounded-lg border p-2.5" style={{ borderColor: THEME.border, background: THEME.light }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border" style={{ borderColor: `${THEME.primary}44`, background: '#fff' }}>
                <svg width="34" height="34" viewBox="0 0 24 24" aria-hidden>
                  <circle cx="12" cy="8" r="3.2" fill="none" stroke={THEME.primary} strokeWidth="1.6" />
                  <path d="M6.5 19c1.5-2.7 3.3-4.1 5.5-4.1s4 .9 5.5 4.1" fill="none" stroke={THEME.primary} strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M4 20h16" fill="none" stroke={THEME.border} strokeWidth="1.2" />
                </svg>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] font-semibold" style={{ color: THEME.textPrimary }}>
                  Matthew
                </div>
                <div className="mt-0.5 text-[8px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                  Top 2K rank · steady recovery
                </div>
                <div className="mt-1 text-[8px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  Weekly readiness: 82
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fff' }}>
            <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
              Quick cards
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {[
                { k: 'Sessions', v: '5 this week' },
                { k: 'Next race', v: 'Sat 8:00' },
                { k: 'Lineup', v: '1V 8+ #3' },
                { k: 'Compliance', v: '97%' },
              ].map((c) => (
                <div key={c.k} className="rounded-md border px-2 py-1.5" style={{ borderColor: THEME.border, background: THEME.light }}>
                  <div className="text-[6px] uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                    {c.k}
                  </div>
                  <div className="mt-0.5 text-[8px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                    {c.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fff' }}>
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Session trend (last 6)
          </div>
          <div className="mt-2 rounded-lg border px-2 py-2" style={{ borderColor: THEME.border, background: THEME.light }}>
            <svg viewBox="0 0 220 74" className="h-[74px] w-full" aria-hidden>
              <path d="M0 70H220" stroke={THEME.border} strokeWidth="1" />
              <path d="M0 44H220" stroke={THEME.border} strokeWidth="1" strokeDasharray="3 3" />
              <path d={`M${points}`} fill="none" stroke={THEME.primary} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              {sessionSplits.map((value, idx) => {
                const x = (idx / (sessionSplits.length - 1)) * 220
                const t = (value - minSplit) / Math.max(1e-6, maxSplit - minSplit)
                const y = 70 - t * 52
                return <circle key={idx} cx={x} cy={y} r="2.8" fill={idx === sessionSplits.length - 1 ? THEME.accent : THEME.primary} />
              })}
            </svg>
            <div className="mt-1 flex items-center justify-between text-[7px] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
              <span>S1</span>
              <span>S2</span>
              <span>S3</span>
              <span>S4</span>
              <span>S5</span>
              <span>S6</span>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-xl border p-3" style={{ borderColor: THEME.border, background: '#fff' }}>
          <div className="text-[8px] font-bold uppercase tracking-[0.14em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Upcoming boat lineups
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {[
              { boat: '1V 8+', seat: '3-seat', date: 'Tue 6:00 AM' },
              { boat: 'Pair', seat: 'Bow', date: 'Thu 5:30 AM' },
              { boat: '4+', seat: '2-seat', date: 'Sat 7:00 AM' },
              { boat: 'Technical', seat: 'Rate focus', date: 'Sun 8:15 AM' },
            ].map((card) => (
              <div key={card.boat} className="rounded-lg border px-2.5 py-2" style={{ borderColor: THEME.border, background: THEME.light }}>
                <div className="text-[10px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                  {card.boat}
                </div>
                <div className="mt-0.5 text-[8px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                  {card.seat}
                </div>
                <div className="mt-1 text-[8px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  {card.date}
                </div>
              </div>
            ))}
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  )
}

function CoachAthleteCardsMini({ pulseIndex }: { pulseIndex: number }) {
  const cards = [
    { name: 'Matthew', seat: 'Port', split: '1:34.6', erg: '6:19.8', badge: '#00' },
    { name: 'Vargas', seat: 'Starboard', split: '1:35.6', erg: '6:22.5', badge: '#01' },
    { name: 'Young', seat: 'Starboard', split: '1:36.3', erg: '6:25.0', badge: '#02' },
    { name: 'Drake', seat: 'Starboard', split: '1:36.7', erg: '6:26.8', badge: '#03' },
    { name: 'Russo', seat: 'Starboard', split: '1:37.0', erg: '6:28.2', badge: '#04' },
    { name: 'Foster', seat: 'Port', split: '1:37.5', erg: '6:30.0', badge: '#05' },
    { name: 'Garcia', seat: 'Starboard', split: '1:38.8', erg: '6:35.4', badge: '#06' },
    { name: 'Yates', seat: 'Port', split: '1:39.1', erg: '6:37.2', badge: '#07' },
    { name: 'Unger', seat: 'Port', split: '1:39.7', erg: '6:40.8', badge: '#08' },
  ] as const

  return (
    <div className="h-full overflow-hidden bg-white p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Coach · Athletes
          </div>
          <div className="mt-1 text-[18px] font-semibold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
            Good morning, Coach
          </div>
          <div className="mt-1 text-[9px] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
            Full roster · 58 athletes
          </div>
        </div>
        <div className="rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: THEME.border, color: THEME.primary, fontFamily: THEME.fontMono }}>
          2K rank
        </div>
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2">
        {cards.map((athlete, idx) => (
          <motion.div
            key={athlete.name}
            className="rounded-xl border p-2.5"
            style={{ borderColor: THEME.border, background: THEME.white }}
            animate={{ boxShadow: idx === pulseIndex ? [`0 0 0 0 ${THEME.primary}33`, `0 0 0 2px ${THEME.primary}22`, `0 0 0 0 ${THEME.primary}33`] : 'none' }}
            transition={{ duration: 1.2, repeat: idx === pulseIndex ? Infinity : 0 }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate text-[11px] font-semibold" style={{ color: THEME.textPrimary }}>
                  {athlete.name}
                </div>
                <div className="mt-0.5 text-[7px] uppercase tracking-[0.12em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  {athlete.seat} · active
                </div>
              </div>
              <span className="text-[7px] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                {athlete.badge}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-1.5 rounded-lg border p-1.5" style={{ borderColor: THEME.border, background: THEME.light }}>
              <div>
                <div className="text-[6px] uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  Erg
                </div>
                <div className="text-[9px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  {athlete.erg}
                </div>
              </div>
              <div>
                <div className="text-[6px] uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  Split
                </div>
                <div className="text-[9px] font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                  {athlete.split}
                </div>
              </div>
            </div>

            <div className="mt-2 flex gap-1.5">
              <button className="rounded-full border px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ borderColor: THEME.border, color: THEME.textSecondary, fontFamily: THEME.fontMono }}>
                View profile
              </button>
              <button className="rounded-full px-2 py-1 text-[7px] font-semibold uppercase tracking-[0.08em]" style={{ background: THEME.primary, color: THEME.white, fontFamily: THEME.fontMono }}>
                Ask about {athlete.name}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function S05_ProductCoachAthleteLoop({ pageOverride, sectionOverride }: NavOverrides) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const started = Date.now()
    const id = window.setInterval(() => {
      setElapsed((Date.now() - started) % LOOP_MS)
    }, 180)
    return () => window.clearInterval(id)
  }, [])

  const coachStep = useMemo(() => {
    if (elapsed < 3000) return 'dashboard'
    if (elapsed < 6000) return 'roster'
    return 'ai'
  }, [elapsed])

  const aiElapsed = Math.max(0, elapsed - 6000)
  const typedChars = Math.max(0, Math.min(COACH_QUESTION.length, Math.floor(aiElapsed / 35)))
  const typedQuestion = COACH_QUESTION.slice(0, typedChars)
  const typingDone = typedChars >= COACH_QUESTION.length
  const activeAthleteCard = Math.floor(elapsed / 1800) % 8
  const athleteElapsed = Math.max(0, elapsed - COACH_PHASE_MS)
  const athleteWindow = LOOP_MS - COACH_PHASE_MS
  const athleteProgress = Math.max(0, Math.min(1, athleteElapsed / Math.max(1, athleteWindow)))
  const athleteScrollOffset =
    athleteProgress < 0.5
      ? (athleteProgress / 0.5) * 210
      : ((1 - athleteProgress) / 0.5) * 210
  const coachActive = elapsed < COACH_PHASE_MS

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? '02 · SOLUTION'} page={pageOverride ?? `6 / ${DECK_SLIDE_TOTAL}`} tone="light" />

      <div
        className="pointer-events-none absolute left-6 top-1/2 z-0 select-none text-[72px] font-bold uppercase"
        style={{
          fontFamily: THEME.fontMono,
          color: THEME.textPrimary,
          opacity: 0.04,
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%) rotate(180deg)',
          letterSpacing: '0.14em',
          lineHeight: 0.95,
        }}
        aria-hidden
      >
        Synthesized
      </div>

      <div className="relative z-10 mt-3 flex min-h-0 flex-1 items-center justify-center">
        <div className="grid w-full max-w-[1240px] min-h-0 grid-cols-[1.6fr_1fr] items-center gap-4">
        <motion.div
          className="min-h-0"
          animate={{
            filter: coachActive ? 'blur(0px)' : 'blur(2.6px)',
            opacity: coachActive ? 1 : 0.76,
            scale: coachActive ? 1 : 0.988,
          }}
          transition={{ duration: 0.28 }}
        >
          <BrowserShell title="app.synthsports.com/coach">
            <div className="h-[430px] overflow-hidden">
              <SynthLayerDashboardMockup
                navMode={coachStep === 'dashboard' ? 'default' : 'athletes'}
                athleteRows={COACH_ROWS}
                showCoachProfile
                showSidebarDeploy={false}
                synthAiPlacement="top"
                synthAiActive={coachStep === 'ai'}
                dimMain={coachStep === 'ai'}
                replaceMain={coachStep === 'dashboard' ? undefined : <CoachAthleteCardsMini pulseIndex={activeAthleteCard} />}
                overlay={
                  coachStep === 'ai' ? (
                    <AiOverlay showResponse={typingDone && aiElapsed >= 4200} questionText={typedQuestion} showCaret={!typingDone} />
                  ) : null
                }
              />
            </div>
          </BrowserShell>
        </motion.div>

        <motion.div
          className="min-h-0"
          animate={{
            filter: coachActive ? 'blur(2.6px)' : 'blur(0px)',
            opacity: coachActive ? 0.76 : 1,
            scale: coachActive ? 0.988 : 1,
          }}
          transition={{ duration: 0.28 }}
        >
          <BrowserShell title="app.synthsports.com/athlete">
            <AthleteMiniApp scrollOffset={athleteScrollOffset} />
          </BrowserShell>
        </motion.div>
        </div>
      </div>

    </div>
  )
}

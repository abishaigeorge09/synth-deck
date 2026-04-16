import { motion } from 'framer-motion'
import { useEffect, useState, type ReactNode, type RefObject } from 'react'
import { THEME } from '../lib/theme'
import { TRANSITIONS } from '../lib/motion'

export type SynthDashboardNavMode = 'default' | 'athletes' | 'custom-tools' | 'lineups-editor' | 'coach-setup' | 'request-tool'

/** Roster row for Team Overview table (demo / prototype overrides). */
export type DashboardAthleteRow = {
  name: string
  pos: string
  erg: string
  split: string
  squat: string
  load: 'High' | 'Med' | 'Low'
  sleep: string
  comply: string
  risk: boolean
}

export type SynthLayerDashboardMockupProps = {
  agentRef?: RefObject<HTMLButtonElement | null>
  /** Idle emphasis on the Synth agent pill (e.g. cursor hovering). */
  agentHighlight?: boolean
  /** Coach identity in the window chrome (signed-in profile). */
  showCoachProfile?: boolean
  /** Darken dashboard body under a modal. */
  dimMain?: boolean
  /** Centered or full overlay above the mockup (modals, wizards). */
  overlay?: ReactNode
  /** Show “Deploy agent” CTA in sidebar (off during some story beats). */
  showSidebarDeploy?: boolean
  navMode?: SynthDashboardNavMode
  /** Browser-style extension chip under the URL bar (story: extension installed). */
  showExtensionInToolbar?: boolean
  /** Horizontal sheet screenshot with a quick “scraping” sweep (story: ingest). */
  scrapeStripSrc?: string
  /** Replace main dashboard body (e.g. Lineups builder). */
  replaceMain?: ReactNode
  /** Sidebar: “Custom tools” group wrapper (for cursor demos). */
  customToolsGroupRef?: RefObject<HTMLDivElement | null>
  /** Sidebar: active Lineups row wrapper. */
  lineupsNavRef?: RefObject<HTMLDivElement | null>
  /** Hide the two chart strips (source signal / compliance) — table + insight remain. */
  hideTopCharts?: boolean
  /** Override “N sources ingesting” in Team Overview subtitle. */
  sourcesIngestSuffix?: string
  /** Workflow slide: two-stream header (athlete vs coach) + “shaped into” tiles + taller table. */
  workflowDetail?: boolean
  /** Override first line under “Team Overview” (e.g. women’s team copy). */
  teamSubtitle?: string
  /** Replace built-in men’s demo roster. */
  athleteRows?: DashboardAthleteRow[]
  /** Optional chart data: primary strip (e.g. weekly/monthly signal). */
  signalPrimary?: { labels: string[]; values: number[] }
  /** Optional chart data: secondary strip (e.g. block averages). */
  signalSecondary?: { labels: string[]; values: number[] }
  /** Replace AI insight paragraph. */
  aiInsightText?: string
  /** Replace the entire insight box (e.g. request-a-tool prompt). */
  replaceInsight?: ReactNode
  /** Athletes page: replace the filter/summary strip under the header. */
  replaceAthletesSummary?: ReactNode
  /** Override Team Overview table headers (8 columns). */
  tableColumnHeaders?: string[]
  /** Suffix after the fourth column cell (default ` lb` for squat load). Use `""` for watts-only cells. */
  squatColumnSuffix?: string
  /** Product prototype: app shell provides outer nav — hide mock sidebar. */
  hideSidebar?: boolean
  /** Table body max-height override (e.g. `min(22rem, 42vh)` for prototype). */
  tableMaxHeight?: string
  /**
   * Full product layout: no fake browser chrome (traffic lights / URL bar).
   * Use inside a real app shell (sidebar + header).
   */
  embeddedApp?: boolean
}

const DEFAULT_ATHLETES: DashboardAthleteRow[] = [
  { name: 'Matthew', pos: '1V Port', erg: '6:12.4', split: '1:32.6', squat: '315', load: 'High', sleep: '6.1h', comply: '94%', risk: true },
  { name: 'Lily', pos: '1V Stroke', erg: '6:18.1', split: '1:34.2', squat: '285', load: 'Med', sleep: '7.8h', comply: '100%', risk: false },
  { name: 'Star', pos: '1V 3-seat', erg: '6:21.7', split: '1:35.0', squat: '295', load: 'Low', sleep: '8.2h', comply: '97%', risk: false },
  { name: 'D. Torres', pos: '2V Bow', erg: '6:29.3', split: '1:37.1', squat: '260', load: 'High', sleep: '5.4h', comply: '88%', risk: true },
  { name: 'J. Okonkwo', pos: '2V 3', erg: '6:24.0', split: '1:35.8', squat: '275', load: 'Med', sleep: '7.1h', comply: '91%', risk: false },
  { name: 'R. Chen', pos: '2V Stroke', erg: '6:16.2', split: '1:33.4', squat: '305', load: 'Med', sleep: '6.8h', comply: '96%', risk: false },
]

function MicroBars({
  values,
  color,
  labels,
}: {
  values: number[]
  color: string
  labels: string[]
}) {
  const max = Math.max(...values, 1)
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div
        className="text-[7px] font-bold uppercase tracking-wider text-zinc-400 sm:text-[8px]"
        style={{ fontFamily: THEME.fontMono }}
      >
        Source signal
      </div>
      <div className="flex h-14 items-end gap-1 px-0.5">
        {values.map((v, i) => {
          const px = Math.max(6, Math.round((v / max) * 52))
          return (
            <motion.div
              key={labels[i]}
              className="flex-1 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: px }}
              transition={{ ...TRANSITIONS.smooth, delay: i * 0.04 }}
              style={{ background: color, maxHeight: 52 }}
              title={labels[i]}
            />
          )
        })}
      </div>
      <div
        className="flex justify-between gap-1 px-0.5 pb-1 pt-1 text-[6px] text-zinc-400 sm:text-[7px]"
        style={{ fontFamily: THEME.fontMono }}
      >
        {labels.map((l) => (
          <span key={l} className="max-w-[2.5rem] truncate">
            {l}
          </span>
        ))}
      </div>
    </div>
  )
}

function SidebarNav({
  mode,
  customToolsGroupRef,
  lineupsNavRef,
  showSidebarDeploy,
  onDeploy,
  deployPulse,
}: {
  mode: SynthDashboardNavMode
  customToolsGroupRef?: RefObject<HTMLDivElement | null>
  lineupsNavRef?: RefObject<HTMLDivElement | null>
  showSidebarDeploy: boolean
  onDeploy: () => void
  deployPulse: boolean
}) {
  const selected: {
    dashboard: boolean
    athletes: boolean
    sources: boolean
    lineups: boolean
    sessions: boolean
    addTool: boolean
  } = {
    dashboard: mode === 'default' || mode === 'coach-setup',
    athletes: mode === 'athletes',
    sources: false,
    lineups: mode === 'lineups-editor' || mode === 'custom-tools',
    sessions: mode === 'custom-tools',
    addTool: mode === 'request-tool',
  }

  const Icon = ({ name, active }: { name: 'grid' | 'user' | 'link' | 'eye' | 'timer' | 'plus' | 'spark' | 'gear'; active: boolean }) => {
    const c = active ? THEME.primary : THEME.textMuted
    const common = { stroke: c, fill: 'none', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
    if (name === 'grid') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
        </svg>
      )
    }
    if (name === 'user') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M20 21a8 8 0 0 0-16 0" />
          <path {...common} d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4z" />
        </svg>
      )
    }
    if (name === 'link') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M10 13a5 5 0 0 1 0-7l1.2-1.2a5 5 0 0 1 7 7L17 13" />
          <path {...common} d="M14 11a5 5 0 0 1 0 7L12.8 19.2a5 5 0 0 1-7-7L7 11" />
        </svg>
      )
    }
    if (name === 'eye') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" />
          <path {...common} d="M12 15a3 3 0 1 0-3-3 3 3 0 0 0 3 3z" />
        </svg>
      )
    }
    if (name === 'timer') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M10 2h4" />
          <path {...common} d="M12 14l3-3" />
          <path {...common} d="M12 22a9 9 0 1 0-9-9 9 9 0 0 0 9 9z" />
        </svg>
      )
    }
    if (name === 'plus') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M12 5v14M5 12h14" />
        </svg>
      )
    }
    if (name === 'spark') {
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
          <path {...common} d="M12 2l1.6 6.3L20 10l-6.4 1.7L12 18l-1.6-6.3L4 10l6.4-1.7L12 2z" />
        </svg>
      )
    }
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
        <path {...common} d="M12 15.5A3.5 3.5 0 1 0 12 8.5a3.5 3.5 0 0 0 0 7z" />
        <path
          {...common}
          d="M19.4 15a7.7 7.7 0 0 0 .1-1l2-1.1-2-3.5-2.2.5a7.5 7.5 0 0 0-1.7-1l-.3-2.2H10l-.3 2.2a7.5 7.5 0 0 0-1.7 1L5.8 9.4l-2 3.5 2 1.1a7.7 7.7 0 0 0 .1 1l-2 1.1 2 3.5 2.2-.5a7.5 7.5 0 0 0 1.7 1l.3 2.2h4.7l.3-2.2a7.5 7.5 0 0 0 1.7-1l2.2.5 2-3.5-2-1.1z"
        />
      </svg>
    )
  }

  const NavItem = ({
    label,
    icon,
    active,
    rightMark,
    innerRef,
  }: {
    label: string
    icon: Parameters<typeof Icon>[0]['name']
    active: boolean
    rightMark?: boolean
    innerRef?: RefObject<HTMLDivElement | null>
  }) => (
    <div
      ref={innerRef as any}
      className="flex items-center gap-2 rounded-lg px-2 py-2"
      style={{
        background: active ? `${THEME.primary}10` : 'transparent',
        outline: active ? `1px solid ${THEME.primary}55` : undefined,
      }}
    >
      <Icon name={icon} active={active} />
      <span
        className="text-[10px] font-semibold"
        style={{ fontFamily: THEME.fontSans, color: active ? THEME.primary : THEME.textSecondary }}
      >
        {label}
      </span>
      {rightMark ? (
        <span className="ml-auto h-3 w-[2px] rounded-full" style={{ background: THEME.primary }} aria-hidden />
      ) : null}
    </div>
  )

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="px-2 pb-2 pt-1.5">
        <div
          className="text-[14px] font-semibold leading-none"
          style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight, color: THEME.textPrimary }}
        >
          synth<span style={{ color: THEME.logoDotColor }}>.</span>
        </div>

        <div className="mt-3 rounded-xl border p-2" style={{ borderColor: THEME.border, background: '#fff' }}>
          <div className="text-[8px] font-bold uppercase tracking-[0.26em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Active team
          </div>
          <div className="mt-1 text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
            Cal Women&apos;s Rowing
          </div>
          <div className="text-[9px] text-zinc-400" style={{ fontFamily: THEME.fontSans }}>
            rowing · CAL-WR-2026
          </div>
        </div>
      </div>

      <div className="px-2">
        <div className="text-[8px] font-bold uppercase tracking-[0.26em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          Overview
        </div>
        <div className="mt-2 space-y-1">
          <NavItem label="Dashboard" icon="grid" active={selected.dashboard} rightMark={selected.dashboard} />
          <NavItem label="Athletes" icon="user" active={selected.athletes} />
          <NavItem label="Sources" icon="link" active={selected.sources} />
        </div>

        <div className="mt-4 text-[8px] font-bold uppercase tracking-[0.26em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          Custom tools
        </div>
        <div ref={customToolsGroupRef as any} className="mt-2 space-y-1">
          <div ref={lineupsNavRef as any}>
            <NavItem label="Lineups" icon="eye" active={selected.lineups} />
          </div>
          <NavItem label="Session Timer" icon="timer" active={selected.sessions} />
          <NavItem label="Add tool" icon="plus" active={selected.addTool} rightMark={selected.addTool} />
        </div>

        <div className="mt-4 flex items-center gap-2 px-2 py-2">
          <Icon name="spark" active={false} />
          <span className="text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            synth. AI
          </span>
        </div>
      </div>

      <div className="mt-auto px-2 pb-2 pt-2">
        <motion.button
          type="button"
          className="w-full rounded-xl border px-3 py-3 text-left shadow-sm"
          style={{
            background: showSidebarDeploy ? THEME.primaryDarker : `${THEME.primaryDarker}cc`,
            borderColor: `${THEME.primary}22`,
          }}
          animate={deployPulse ? { scale: [1, 1.03, 1] } : { scale: 1 }}
          transition={{ duration: 0.45, repeat: deployPulse ? 2 : 0, ease: 'easeInOut' }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation()
            if (showSidebarDeploy) onDeploy()
          }}
        >
          <div className="text-[12px] font-semibold text-white" style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight }}>
            synth<span style={{ color: THEME.logoDotColor }}>.</span>Agent
          </div>
          <div className="mt-0.5 text-[9px] text-white/75" style={{ fontFamily: THEME.fontSans }}>
            Connectors • scans • reports
          </div>
        </motion.button>

        <div className="mt-3 border-t pt-3" style={{ borderColor: THEME.border }}>
          <div className="flex items-center gap-2 px-2 py-2">
            <Icon name="gear" active={false} />
            <span className="text-[10px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function expandRosterRows(rows: DashboardAthleteRow[], target: number): DashboardAthleteRow[] {
  if (rows.length >= target) return rows
  const out: DashboardAthleteRow[] = [...rows]
  let i = 0
  while (out.length < target && rows.length > 0) {
    const base = rows[i % rows.length]!
    out.push({
      ...base,
      name: `${base.name} ${String((i % 9) + 1).padStart(2, '0')}`.replace(/\s+/, ' '),
      pos: base.pos === '' ? 'active' : base.pos,
      risk: i % 7 === 0 ? true : base.risk,
    })
    i += 1
  }
  return out
}

function AthletesPage({ rows, replaceSummary }: { rows: DashboardAthleteRow[]; replaceSummary?: ReactNode }) {
  const expanded = expandRosterRows(rows, 18)

  function hashSeed(s: string) {
    let h = 2166136261
    for (let i = 0; i < s.length; i += 1) {
      h ^= s.charCodeAt(i)
      h = Math.imul(h, 16777619)
    }
    return h >>> 0
  }

  function seriesFor(name: string) {
    const seed = hashSeed(name)
    // 7 points, biased toward stable with 1-2 spikes.
    const base = 58 + (seed % 18)
    const vals = Array.from({ length: 7 }, (_, i) => {
      const n = (seed >> (i * 3)) & 0xff
      const jitter = (n % 11) - 5
      return Math.max(36, Math.min(92, base + jitter))
    })
    // add a deterministic spike or dip
    const idx = seed % 7
    vals[idx] = Math.max(36, Math.min(92, vals[idx]! + ((seed % 2 === 0 ? 1 : -1) * (10 + (seed % 9)))))
    return vals
  }

  function MiniSparkBars({ name, accent }: { name: string; accent: string }) {
    const vals = seriesFor(name)
    const max = Math.max(...vals, 1)
    return (
      <div className="flex items-end gap-1">
        {vals.map((v, i) => (
          <span
            key={`${name}-spark-${i}`}
            className="w-2 rounded-sm"
            style={{
              height: `${Math.max(6, Math.round((v / max) * 18))}px`,
              background: `${accent}cc`,
              opacity: 0.9,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 items-start justify-between gap-4">
        <div>
          <div className="text-[8px] font-semibold uppercase tracking-[0.18em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Coach · Athletes
          </div>
          <div className="mt-1 text-[18px] font-semibold" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
            Full roster
          </div>
          <div className="mt-1 text-[9px]" style={{ fontFamily: THEME.fontMono, color: THEME.textSecondary }}>
            {expanded.length} athletes · latest erg 2026-03-16 · sorted by rank <span style={{ color: THEME.primary }}>● live</span>
          </div>
        </div>
        <button
          type="button"
          className="rounded-full border px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider"
          style={{ borderColor: THEME.border, background: THEME.white, color: THEME.primary, fontFamily: THEME.fontMono }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          Open synth. Agent →
        </button>
      </div>

      {replaceSummary ? <div className="mt-3 shrink-0">{replaceSummary}</div> : null}

      <div className="mt-3 min-h-0 flex-1 overflow-auto rounded-xl border bg-white p-3" style={{ borderColor: THEME.border }}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {expanded.map((a, idx) => {
            const initials = a.name
              .split(' ')
              .filter(Boolean)
              .slice(0, 2)
              .map((p) => p[0]?.toUpperCase())
              .join('')
            return (
              <div
                key={`${a.name}-${idx}`}
                className="rounded-2xl border p-3"
                style={{
                  borderColor: THEME.border,
                  background: THEME.white,
                  boxShadow: '0 1px 0 rgba(24,24,27,0.02), 0 16px 34px -26px rgba(24,24,27,0.22)',
                }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                      {a.name}
                    </div>
                    <div className="mt-1 text-[7px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                      {a.pos || 'active'}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border text-[9px] font-bold"
                      style={{ borderColor: THEME.border, background: `${THEME.primary}10`, color: THEME.primary, fontFamily: THEME.fontMono }}
                    >
                      {initials || 'A'}
                    </div>
                    <span className="text-[8px] font-semibold text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                      #{String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[
                    { k: '2K', v: a.erg, c: THEME.primary },
                    { k: 'Split', v: a.split, c: THEME.blue },
                    { k: 'Watts', v: a.squat, c: THEME.textSecondary },
                  ].map((m) => (
                    <div key={m.k} className="rounded-lg border px-2 py-2" style={{ borderColor: THEME.border, background: THEME.light }}>
                      <div className="text-[7px] font-bold uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                        {m.k}
                      </div>
                      <div className="mt-1 text-[10px] font-semibold" style={{ fontFamily: THEME.fontMono, color: m.c }}>
                        {m.v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex items-end justify-between gap-3 rounded-lg border px-2.5 py-2" style={{ borderColor: THEME.border, background: THEME.light }}>
                  <div className="min-w-0">
                    <div className="text-[7px] font-bold uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                      7-day trend
                    </div>
                    <div className="mt-1 text-[9px] font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                      readiness index (synthetic)
                    </div>
                  </div>
                  <MiniSparkBars name={a.name} accent={a.risk ? THEME.red : THEME.accent} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/**
 * In-slide app.synthsports.com mockup — configurable for the multi-step solution story.
 */
export function SynthLayerDashboardMockup({
  agentRef,
  agentHighlight = false,
  showCoachProfile = false,
  dimMain = false,
  overlay = null,
  showSidebarDeploy = true,
  navMode = 'default',
  showExtensionInToolbar = false,
  scrapeStripSrc,
  replaceMain,
  customToolsGroupRef,
  lineupsNavRef,
  hideTopCharts = false,
  sourcesIngestSuffix,
  workflowDetail = false,
  teamSubtitle,
  athleteRows,
  signalPrimary,
  signalSecondary,
  aiInsightText,
  replaceInsight,
  replaceAthletesSummary,
  tableColumnHeaders,
  squatColumnSuffix,
  hideSidebar = false,
  tableMaxHeight,
  embeddedApp = false,
}: SynthLayerDashboardMockupProps) {
  const [deployPulse, setDeployPulse] = useState(false)
  const athletes = athleteRows ?? DEFAULT_ATHLETES
  const tableHeaders = tableColumnHeaders ?? ['Athlete', 'Erg 2K', 'Split', 'Squat', 'Load', 'Sleep', 'Comply', 'Status']
  const squatSuffix = squatColumnSuffix ?? ' lb'
  const primaryStrip = signalPrimary ?? {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    values: [72, 85, 78, 91, 88, 76, 82],
  }
  const secondaryStrip = signalSecondary ?? {
    labels: ['wk1', 'wk2', 'wk3', 'wk4'],
    values: [64, 71, 69, 74],
  }
  const connectorChips = [
    { name: 'Sheets', status: 'synced', colorKey: 'primary' as const },
    { name: 'TeamWorks', status: '2m ago', colorKey: 'cyan' as const },
    { name: 'Wearable', status: 'live', colorKey: 'purple' as const },
    ...(workflowDetail ? ([{ name: 'Email', status: 'digests', colorKey: 'amber' as const }] as const) : []),
  ] as const

  useEffect(() => {
    if (!deployPulse) return
    const t = window.setTimeout(() => setDeployPulse(false), 2400)
    return () => window.clearTimeout(t)
  }, [deployPulse])

  return (
    <div
      className={
        embeddedApp
          ? 'relative flex w-full max-w-full min-w-0 flex-col overflow-x-hidden rounded-xl border bg-white shadow-sm'
          : 'relative flex h-full min-h-[18rem] flex-col overflow-hidden rounded-xl border shadow-[0_2px_0_rgba(0,0,0,0.03),0_22px_48px_rgba(0,0,0,0.14)]'
      }
      style={{ borderColor: THEME.border, ...(embeddedApp ? {} : { background: '#fff' }) }}
    >
      {!embeddedApp ? (
        <div className="flex shrink-0 items-center gap-2 px-3 py-2" style={{ background: THEME.darkDeep }}>
          <div className="flex gap-1">
            <span className="h-2 w-2 rounded-full bg-red-400/95" />
            <span className="h-2 w-2 rounded-full bg-amber-400/95" />
            <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          </div>
          <div
            className="mx-1 min-w-0 flex-1 truncate rounded px-2 py-0.5 text-[8px] text-white/55"
            style={{ background: 'rgba(255,255,255,0.08)', fontFamily: THEME.fontMono }}
          >
            app.synthsports.com/dashboard
          </div>
          {showCoachProfile ? (
            <div
              className="flex max-w-[min(42%,9rem)] shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.06] px-1.5 py-0.5"
              title="Coach profile"
            >
              <span
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[7px] font-bold text-white"
                style={{ background: THEME.primaryDarker, fontFamily: THEME.fontMono }}
              >
                C
              </span>
              <div className="min-w-0 text-left leading-tight">
                <div className="truncate text-[7px] font-semibold text-white" style={{ fontFamily: THEME.fontSans }}>
                  Coach
                </div>
                <div className="truncate text-[6px] text-emerald-300/90" style={{ fontFamily: THEME.fontMono }}>
                  Cal Men&apos;s · signed in
                </div>
              </div>
            </div>
          ) : null}
          <span className="shrink-0 text-[7px] text-white/35" style={{ fontFamily: THEME.fontMono }}>
            Live
          </span>
          <motion.button
            ref={agentRef}
            type="button"
            data-synth-agent
            className="shrink-0 cursor-default rounded-full border-0 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wide text-white shadow-md outline-none"
            style={{
              fontFamily: THEME.fontMono,
              background: THEME.primary,
              boxShadow: `0 2px 12px ${THEME.primary}66`,
            }}
            animate={
              deployPulse || agentHighlight
                ? { scale: deployPulse ? [1, 1.06, 1] : [1, 1.03, 1] }
                : { scale: 1 }
            }
            transition={{
              duration: deployPulse ? 0.45 : 2.2,
              repeat: deployPulse ? 2 : agentHighlight ? Infinity : 0,
              ease: 'easeInOut',
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation()
              setDeployPulse(true)
            }}
          >
            Synth agent
          </motion.button>
        </div>
      ) : null}

      {showExtensionInToolbar ? (
        <div
          className="flex shrink-0 items-center gap-2 border-b px-2.5 py-1"
          style={{ borderColor: THEME.border, background: '#F4F4F5' }}
        >
          <span className="text-[7px] font-semibold uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
            Extensions
          </span>
          <div
            className="flex items-center gap-1 rounded-md border bg-white px-2 py-0.5 shadow-sm"
            style={{ borderColor: `${THEME.primary}55` }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden className="text-zinc-500">
              <path
                fill="currentColor"
                d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5a2.5 2.5 0 0 0-5 0V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7s2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5a2.5 2.5 0 0 0 0-5z"
              />
            </svg>
            <span className="text-[8px] font-bold" style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight, color: THEME.primary }}>
              synth<span style={{ color: THEME.logoDotColor }}>.</span>
            </span>
          </div>
        </div>
      ) : null}

      {scrapeStripSrc ? (
        <div
          className="relative h-[68px] w-full shrink-0 overflow-hidden border-b bg-white"
          style={{ borderColor: THEME.border }}
        >
          <img src={scrapeStripSrc} alt="" className="h-full w-full object-cover object-center" />
          <motion.div
            className="pointer-events-none absolute inset-y-2 w-0.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]"
            initial={{ left: '-4%' }}
            animate={{ left: '104%' }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
          <div
            className="absolute bottom-1 left-2 rounded px-1 py-0.5 text-[6px] font-bold uppercase tracking-wide text-white"
            style={{ fontFamily: THEME.fontMono, background: 'rgba(0,0,0,0.55)' }}
          >
            Scraping cells…
          </div>
        </div>
      ) : null}

      <div className={embeddedApp ? 'relative flex w-full min-w-0' : 'relative flex min-h-0 flex-1'}>
        {dimMain ? (
          <div className="pointer-events-none absolute inset-0 z-[15] bg-zinc-900/35" aria-hidden />
        ) : null}

        {!hideSidebar ? (
          <aside
            className="flex w-[170px] shrink-0 flex-col border-r"
            style={{ borderColor: THEME.border, background: '#FAFAF9' }}
          >
            <SidebarNav
              mode={navMode}
              customToolsGroupRef={customToolsGroupRef}
              lineupsNavRef={lineupsNavRef}
              showSidebarDeploy={showSidebarDeploy}
              deployPulse={deployPulse}
              onDeploy={() => setDeployPulse(true)}
            />
          </aside>
        ) : null}

        <div
          className={
            embeddedApp
              ? 'flex min-w-0 max-w-full flex-col gap-5 overflow-x-hidden px-4 pb-3 pt-4 sm:px-5 sm:pb-4 sm:pt-5 lg:px-6'
              : 'flex min-w-0 flex-1 flex-col gap-2 overflow-hidden p-2.5'
          }
        >
          {replaceMain ? (
            <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border" style={{ borderColor: THEME.border }}>
              {replaceMain}
            </div>
          ) : (
            <>
              {navMode === 'athletes' ? (
                <AthletesPage rows={athleteRows ?? DEFAULT_ATHLETES} replaceSummary={replaceAthletesSummary} />
              ) : (
              <div className="flex shrink-0 flex-wrap items-start justify-between gap-x-5 gap-y-3 pb-1">
                  <div className="min-w-0 max-w-[min(100%,44rem)] space-y-2 pr-2">
                    <div
                      className={embeddedApp ? 'text-[18px] font-bold leading-snug sm:text-[20px]' : 'text-[13px] font-bold leading-tight'}
                      style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
                    >
                      Team Overview
                    </div>
                    <div
                      className={embeddedApp ? 'text-[10px] leading-relaxed sm:text-[11px]' : 'text-[8px]'}
                      style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}
                    >
                      {teamSubtitle ? (
                        workflowDetail ? (
                          <>
                            {teamSubtitle}{' '}
                            · <span style={{ color: THEME.textPrimary }}>Athlete + coach streams merged below</span>
                          </>
                        ) : (
                          teamSubtitle
                        )
                      ) : (
                        <>
                          Cal Men&apos;s 1V + 2V · 18 athletes
                          {workflowDetail ? (
                            <>
                              {' '}
                              · <span style={{ color: THEME.textPrimary }}>Athlete + coach streams merged below</span>
                            </>
                          ) : (
                            <> · {sourcesIngestSuffix ?? '6 sources ingesting'}</>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={`shrink-0 pt-0.5 ${workflowDetail ? 'flex flex-col items-end gap-1' : 'flex flex-col items-end gap-1.5'}`}>
                    {workflowDetail ? (
                      <span className="text-[6px] font-bold uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                        Coach connectors
                      </span>
                    ) : null}
                    <div className="flex flex-wrap justify-end gap-1.5 sm:gap-2">
                      {connectorChips.map((b) => {
                        const c =
                          b.colorKey === 'primary'
                            ? THEME.primary
                            : b.colorKey === 'cyan'
                              ? THEME.cyan
                              : b.colorKey === 'purple'
                                ? THEME.purple
                                : THEME.amber
                        return (
                          <span
                            key={b.name}
                            className={embeddedApp ? 'rounded-md border px-2 py-1 text-[8px] font-semibold sm:text-[9px]' : 'rounded border px-1.5 py-0.5 text-[7px] font-semibold'}
                            style={{ fontFamily: THEME.fontMono, borderColor: `${c}35`, background: `${c}10`, color: c }}
                          >
                            {b.name}: {b.status}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}

          {workflowDetail ? (
            <div
              className="shrink-0 rounded-lg border border-dashed p-2"
              style={{ borderColor: `${THEME.primary}44`, background: `${THEME.primary}07` }}
            >
              <div className="grid grid-cols-2 gap-2 text-[6px] leading-snug">
                <div>
                  <div className="font-bold uppercase tracking-wider text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
                    Athlete feeds
                  </div>
                  <p className="mt-0.5 text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
                    One device view per row + <strong style={{ color: THEME.textPrimary }}>their</strong> connectors (apps, sheets,
                    wearables). Tagged by athlete before merge.
                  </p>
                </div>
                <div>
                  <div className="font-bold uppercase tracking-wider text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
                    Coach connectors
                  </div>
                  <p className="mt-0.5 text-zinc-600" style={{ fontFamily: THEME.fontSans }}>
                    <strong style={{ color: THEME.textPrimary }}>Your</strong> roster authority: Sheets, TeamWorks, calendar, email —
                    normalized with athlete reads so nothing double-counts.
                  </p>
                </div>
              </div>
              <div
                className="mt-2 flex flex-wrap items-center gap-1 border-t pt-2"
                style={{ borderColor: THEME.border }}
              >
                <span className="text-[6px] font-bold uppercase tracking-wider text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
                  Shaped into
                </span>
                {(
                  [
                    { t: 'Roster table', c: THEME.primary },
                    { t: 'Signal charts', c: THEME.blue },
                    { t: 'Compliance', c: THEME.amber },
                    { t: 'AI insight', c: THEME.purple },
                  ] as const
                ).map((x) => (
                  <span
                    key={x.t}
                    className="rounded px-1.5 py-0.5 text-[6px] font-semibold"
                    style={{ fontFamily: THEME.fontMono, background: `${x.c}14`, color: x.c, border: `1px solid ${x.c}33` }}
                  >
                    {x.t}
                  </span>
                ))}
              </div>
              <p className="mt-1.5 text-[6px] text-zinc-500" style={{ fontFamily: THEME.fontSans }}>
                Ingest: {sourcesIngestSuffix ?? '8 athlete bundles + coach stack'}
              </p>
            </div>
          ) : null}

          {!hideTopCharts ? (
            <div className={`grid min-w-0 shrink-0 gap-3 ${embeddedApp ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2'}`}>
              <div
                className={`flex min-w-0 rounded-lg border bg-zinc-50/90 ${embeddedApp ? 'p-3 sm:p-4' : 'p-2'}`}
                style={{ borderColor: THEME.border }}
              >
                <MicroBars color={THEME.primary} labels={primaryStrip.labels} values={primaryStrip.values} />
                <div className={`shrink-0 bg-zinc-200 ${embeddedApp ? 'mx-3 w-px' : 'mx-2 w-px'}`} />
                <MicroBars color={THEME.blue} labels={secondaryStrip.labels} values={secondaryStrip.values} />
              </div>
              <div
                className={`min-w-0 rounded-lg border bg-white ${embeddedApp ? 'p-3 sm:p-4' : 'p-2'}`}
                style={{ borderColor: THEME.border }}
              >
                <div
                  className={`font-bold uppercase tracking-wider text-zinc-400 ${embeddedApp ? 'text-[8px] sm:text-[9px]' : 'text-[7px]'}`}
                  style={{ fontFamily: THEME.fontMono }}
                >
                  {squatSuffix === '' ? 'Watts vs. load (top 6)' : 'Compliance vs. load'}
                </div>
                <div className={`flex h-16 items-end gap-1 px-0.5 ${embeddedApp ? 'mt-3' : 'mt-2'}`}>
                  {athletes.slice(0, 6).map((a) => {
                    const n = parseInt(a.squat, 10)
                    const pct = a.risk ? 0.92 : 0.52 + (a.name.length % 5) * 0.06
                    const px =
                      squatSuffix === '' && Number.isFinite(n) && n > 80 && n < 500
                        ? Math.max(10, Math.round((n / 400) * 56))
                        : Math.max(10, Math.round(pct * 56))
                    return (
                      <motion.div
                        key={a.name}
                        className="flex-1 rounded-t"
                        initial={{ height: 0 }}
                        animate={{ height: px }}
                        transition={{ ...TRANSITIONS.smooth, delay: 0.05 }}
                        style={{
                          background: a.risk ? `${THEME.red}85` : `${THEME.accent}90`,
                          maxHeight: 56,
                        }}
                      />
                    )
                  })}
                </div>
                <div
                  className={`flex justify-between text-zinc-400 ${embeddedApp ? 'mt-2 px-0.5 pb-1 pt-1 text-[7px] sm:text-[8px]' : 'mt-1 text-[6px]'}`}
                  style={{ fontFamily: THEME.fontMono }}
                >
                  <span>Risk bands</span>
                  <span>Per athlete</span>
                </div>
              </div>
            </div>
          ) : null}

          <div
            className={
              embeddedApp
                ? 'min-h-0 shrink-0 overflow-x-auto overflow-y-auto rounded-lg border'
                : 'min-h-0 flex-1 overflow-auto rounded-lg border'
            }
            style={{
              borderColor: THEME.border,
              maxHeight: tableMaxHeight ?? (workflowDetail ? 'min(13.5rem, 36vh)' : '11rem'),
            }}
          >
            <table
              className={`w-full border-collapse text-left ${embeddedApp ? 'text-[9px] sm:text-[10px]' : 'text-[8px]'}`}
            >
              <thead className="sticky top-0 z-[1]" style={{ background: '#F4F4F5', boxShadow: `0 1px 0 ${THEME.border}` }}>
                <tr>
                  {tableHeaders.map((h) => (
                    <th key={h} className="px-1.5 py-1 font-semibold" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {athletes.map((a) => (
                  <tr key={a.name} style={{ borderTop: `1px solid ${THEME.border}` }}>
                    <td className="px-1.5 py-1 align-top font-semibold" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                      {a.name}
                      <div className="font-normal text-zinc-400" style={{ fontSize: 7 }}>
                        {a.pos}
                      </div>
                    </td>
                    <td className="px-1.5 py-1 align-top" style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>
                      {a.erg}
                    </td>
                    <td className="px-1.5 py-1 align-top" style={{ fontFamily: THEME.fontMono }}>
                      {a.split}
                    </td>
                    <td className="px-1.5 py-1 align-top" style={{ fontFamily: THEME.fontMono, color: THEME.blue }}>
                      {a.squat}
                      {squatSuffix}
                    </td>
                    <td
                      className="px-1.5 py-1 align-top"
                      style={{
                        fontFamily: THEME.fontMono,
                        color: a.load === 'High' ? THEME.red : a.load === 'Med' ? THEME.amber : THEME.accent,
                      }}
                    >
                      {a.load}
                    </td>
                    <td
                      className="px-1.5 py-1 align-top"
                      style={{
                        fontFamily: THEME.fontMono,
                        color: (() => {
                          const s = a.sleep.trim()
                          if (s === '—' || s === 'n/a' || s === '') return THEME.textMuted
                          const h = parseFloat(s)
                          return Number.isFinite(h) && h < 6.5 ? THEME.red : THEME.textSecondary
                        })(),
                      }}
                    >
                      {a.sleep}
                    </td>
                    <td
                      className="px-1.5 py-1 align-top"
                      style={{
                        fontFamily: THEME.fontMono,
                        color: (() => {
                          const n = parseInt(a.comply.replace(/\D/g, ''), 10)
                          if (!Number.isFinite(n) || n <= 0) return THEME.textMuted
                          return n < 90 ? THEME.amber : THEME.accent
                        })(),
                      }}
                    >
                      {a.comply}
                    </td>
                    <td className="px-1.5 py-1 align-top">
                      {a.risk ? (
                        <span
                          className="rounded px-1 py-0.5 text-[7px] font-bold"
                          style={{ background: `${THEME.red}18`, color: THEME.red, fontFamily: THEME.fontMono }}
                        >
                          AT RISK
                        </span>
                      ) : (
                        <span className="text-[7px]" style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>
                          OK
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {aiInsightText === '' ? null : replaceInsight ? (
            <>{replaceInsight}</>
          ) : (
            <div
              className={`shrink-0 rounded-lg border ${embeddedApp ? 'px-3 py-3 sm:px-4 sm:py-3.5' : 'px-2 py-2'}`}
              style={{ borderColor: `${THEME.amber}35`, background: `${THEME.amber}08` }}
            >
              <div className={`flex items-start ${embeddedApp ? 'gap-3' : 'gap-2'}`}>
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded" style={{ background: `${THEME.amber}22` }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill={THEME.amber}>
                    <path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <div className="text-[8px] font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.amber }}>
                    AI INSIGHT
                  </div>
                  <p
                    className={embeddedApp ? 'mt-1 text-[10px] leading-relaxed sm:text-[11px]' : 'mt-0.5 text-[9px] leading-snug'}
                    style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
                  >
                    {aiInsightText ??
                      'Matthew: 1:32.6 split + 4×3 Front Squat this week + Tuesday 6hr day. Fatigue risk flagged. Torres: sleep dropping 3 nights, compliance 88%. Monitor closely. Ingest matched rows from Sheets + TeamWorks compliance.'}
                  </p>
                </div>
              </div>
            </div>
          )}
            </>
          )}
        </div>
      </div>

      {overlay ? (
        <div className="pointer-events-auto absolute inset-0 z-40 flex items-center justify-center p-4">
          {overlay}
        </div>
      ) : null}
    </div>
  )
}

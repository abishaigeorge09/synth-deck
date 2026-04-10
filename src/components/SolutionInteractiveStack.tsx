import type { ReactNode } from 'react'
import { Fragment, useId } from 'react'
import { motion } from 'framer-motion'
import { THEME } from '../lib/theme'
import { COACH_TOOL_IMAGES, coachToolSrc } from '../slides/coachToolImages'

const ROWIQ = '/solution-mockups/rowiq-lineup.png'
const SYNTH_DASH = '/solution-mockups/synth-team-overview.png'

/** Problems the base app is built to fix — outward from the lineup tool */
const BASE_PROBLEMS = [
  'Wrong lineup sent to the team',
  'Last-minute changes lost in chat',
  'Port vs. starboard mix-ups under pressure',
]

/** Thumbnails = same sources as slide 1 (first four tools) */
const SOURCE_THUMB_FILES = COACH_TOOL_IMAGES.slice(0, 4).map((x) => x.file)

function BrowserFrame({ children, url }: { children: ReactNode; url: string }) {
  return (
    <div
      className="h-full min-h-0 overflow-hidden rounded-lg border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:z-10 hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
      style={{ borderColor: THEME.border }}
    >
      <div
        className="flex items-center gap-2 border-b px-2.5 py-1.5"
        style={{ borderColor: THEME.border, background: '#f4f4f5' }}
      >
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-red-400/90" />
          <span className="h-2 w-2 rounded-full bg-amber-400/90" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80" />
        </div>
        <span className="truncate text-[8px] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
          {url}
        </span>
      </div>
      <div className="bg-white">{children}</div>
    </div>
  )
}

function PulsingArrows({ stroke }: { stroke?: string }) {
  const c = stroke ?? THEME.primary
  return (
    <div className="flex flex-col items-center justify-center gap-1 px-0.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.svg
          key={i}
          width={28}
          height={12}
          viewBox="0 0 28 12"
          className="shrink-0"
          initial={false}
          animate={{ opacity: [0.25, 1, 0.25], x: [0, 4, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
        >
          <path
            d="M2 6h18M18 2l6 4-6 4"
            fill="none"
            stroke={c}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      ))}
    </div>
  )
}

/** One horizontal “data pull” per tool → dashboard: dashed flow moves toward the site */
function DataPullArrow({ delay = 0 }: { delay?: number }) {
  const uid = useId().replace(/:/g, '')
  const gid = `pull-grad-${uid}`

  return (
    <div className="-mr-0.5 flex h-full min-h-[5.5rem] w-9 shrink-0 items-center justify-start sm:w-10" aria-hidden>
      <svg width="40" height="28" viewBox="0 0 48 28" className="shrink-0">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={THEME.cyan} stopOpacity={0.25} />
            <stop offset="100%" stopColor={THEME.cyan} stopOpacity={1} />
          </linearGradient>
        </defs>
        {/* Flow toward dashboard (right): dashes crawl → */}
        <motion.path
          d="M2 14 H36"
          stroke={`url(#${gid})`}
          strokeWidth={2.5}
          strokeLinecap="round"
          fill="none"
          strokeDasharray="3 8"
          animate={{ strokeDashoffset: [0, -44] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'linear', delay }}
        />
        <motion.path
          d="M32 10l10 4-10 4"
          fill="none"
          stroke={THEME.cyan}
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: [0.5, 1, 0.5], x: [0, 2, 0] }}
          transition={{ duration: 0.85, repeat: Infinity, ease: 'easeInOut', delay }}
        />
        <motion.circle
          cx={10}
          cy={14}
          r={2.2}
          fill={THEME.cyan}
          animate={{ cx: [8, 30, 8], opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.05, repeat: Infinity, ease: 'easeInOut', delay }}
        />
      </svg>
    </div>
  )
}

export function SolutionInteractiveStack() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 lg:gap-5">
      {/* BASE LAYER */}
      <div>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          Base app — new tool for lineups &amp; boats
        </p>
        <div className="flex min-h-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="min-w-0 flex-1 sm:max-w-[48%]">
            <BrowserFrame url="rowiq.app · Coach view · Lineup">
              <img src={ROWIQ} alt="ROW IQ lineup" className="max-h-[min(28vh,200px)] w-full object-cover object-top" loading="lazy" />
            </BrowserFrame>
          </div>
          <PulsingArrows stroke={THEME.primary} />
          <ul className="flex min-w-0 flex-1 flex-col justify-center gap-2">
            {BASE_PROBLEMS.map((t) => (
              <li
                key={t}
                className="rounded-lg border px-2.5 py-2 text-[10px] font-medium leading-snug text-zinc-700 shadow-sm"
                style={{ borderColor: `${THEME.red}55`, background: `${THEME.red}08`, fontFamily: THEME.fontSans }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* SYNTH LAYER — 4 rows: [thumb][→][dashboard spans full height] */}
      <div className="relative min-h-0 flex-1 border-t border-dashed pt-4" style={{ borderColor: THEME.border }}>
        <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          Synth layer + agent — pulls from your tools (slide 2)
        </p>

        <div className="min-h-0 w-full overflow-x-auto pb-1 [scrollbar-width:thin]">
          <div
            className="mx-auto grid w-full min-w-[min(100%,720px)] max-w-[900px] grid-cols-[minmax(200px,260px)_40px_1fr] grid-rows-4 items-stretch gap-x-0 gap-y-3"
          >
            {SOURCE_THUMB_FILES.map((file, i) => (
              <Fragment key={file}>
                <div
                  className="overflow-hidden rounded-xl border bg-zinc-50 shadow-sm"
                  style={{ gridColumn: 1, gridRow: i + 1, borderColor: THEME.border }}
                >
                  <img
                    src={coachToolSrc(file)}
                    alt=""
                    className="h-40 w-full object-cover object-center sm:h-44"
                    loading="lazy"
                  />
                </div>
                <div
                  className="flex min-h-[5.5rem] items-center justify-start pl-0"
                  style={{ gridColumn: 2, gridRow: i + 1 }}
                >
                  <DataPullArrow delay={i * 0.14} />
                </div>
              </Fragment>
            ))}

            <div className="relative flex min-h-[17rem] flex-col self-stretch" style={{ gridColumn: 3, gridRow: '1 / 5' }}>
              <BrowserFrame url="app.synthsports.com/dashboard">
                <img
                  src={SYNTH_DASH}
                  alt="Synth Sports team overview"
                  className="h-full min-h-[17rem] w-full object-cover object-top"
                  loading="lazy"
                />
              </BrowserFrame>
              <div
                className="absolute -right-1 -top-2 z-10 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow-md"
                style={{ fontFamily: THEME.fontMono, background: THEME.primary, boxShadow: `0 4px 14px ${THEME.primary}55` }}
              >
                synth agent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

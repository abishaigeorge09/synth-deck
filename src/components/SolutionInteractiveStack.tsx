import type { ReactNode } from 'react'
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
      className="overflow-hidden rounded-lg border bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-transform duration-200 hover:z-10 hover:scale-[1.02] hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
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
    <div className="flex flex-col items-center justify-center gap-1 px-1" aria-hidden>
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

export function SolutionInteractiveStack() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-4 lg:gap-5">
      {/* BASE LAYER — arrows point toward problems (gaps this UI is for) */}
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

      {/* SYNTH LAYER — arrows from tool screenshots into synth (pull data in) */}
      <div className="relative min-h-0 flex-1 border-t border-dashed pt-4" style={{ borderColor: THEME.border }}>
        <p className="mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-400" style={{ fontFamily: THEME.fontMono }}>
          Synth layer + agent — pulls from your tools (slide 1)
        </p>
        <div className="flex min-h-0 flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-wrap items-center justify-center gap-2 sm:max-w-[42%] sm:justify-start">
            {SOURCE_THUMB_FILES.map((file) => (
              <div
                key={file}
                className="h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-md border bg-zinc-100 shadow-sm"
                style={{ borderColor: THEME.border }}
              >
                <img src={coachToolSrc(file)} alt="" className="h-full w-full object-cover object-center" loading="lazy" />
              </div>
            ))}
          </div>
          <PulsingArrows stroke={THEME.cyan} />
          <div className="relative min-w-0 flex-1 sm:max-w-[48%]">
            <BrowserFrame url="app.synthsports.com/dashboard">
              <img
                src={SYNTH_DASH}
                alt="Synth Sports team overview"
                className="max-h-[min(30vh,220px)] w-full object-cover object-top"
                loading="lazy"
              />
            </BrowserFrame>
            <div
              className="absolute -right-1 -top-2 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow-md"
              style={{ fontFamily: THEME.fontMono, background: THEME.primary, boxShadow: `0 4px 14px ${THEME.primary}55` }}
            >
              synth agent
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

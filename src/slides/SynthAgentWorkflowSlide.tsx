import { motion } from 'framer-motion'
import { SynthLayerDashboardMockup } from '../components/SynthLayerDashboardMockup'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'
import { DECK_SLIDE_TOTAL } from '../lib/deckTotal'
import { STAGGER, TRANSITIONS, VARIANTS } from '../lib/motion'
import { COACH_TOOL_IMAGES, coachToolSrc } from './coachToolImages'

const PAD = 'clamp(20px, 3.2vw, 36px) clamp(18px, 3.2vw, 44px) clamp(16px, 3vw, 28px)'

type ToolThumb = { src: string; alt: string }

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: STAGGER.cards, delayChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
}

const SOURCE_CARDS: { title: string; subtitle: string; chips: string[]; tone: 'athlete' | 'coach'; thumb?: ToolThumb }[] = [
  {
    title: 'Athlete signals',
    subtitle: 'Wearables, training logs, and daily context.',
    chips: ['WHOOP', 'Sleep', 'HRV', 'RPE'],
    tone: 'athlete',
    thumb: COACH_TOOL_IMAGES[0] ? { src: coachToolSrc(COACH_TOOL_IMAGES[0].file), alt: COACH_TOOL_IMAGES[0].alt } : undefined,
  },
  {
    title: 'Performance data',
    subtitle: 'Erg intervals, splits, and testing history.',
    chips: ['Erg', 'Intervals', 'Splits'],
    tone: 'athlete',
    thumb: COACH_TOOL_IMAGES[4] ? { src: coachToolSrc(COACH_TOOL_IMAGES[4].file), alt: COACH_TOOL_IMAGES[4].alt } : undefined,
  },
  {
    title: 'Team management',
    subtitle: 'Roster, attendance, and ops.',
    chips: ['TeamWorks', 'Roster', 'Attendance'],
    tone: 'coach',
    thumb: COACH_TOOL_IMAGES[1] ? { src: coachToolSrc(COACH_TOOL_IMAGES[1].file), alt: COACH_TOOL_IMAGES[1].alt } : undefined,
  },
  {
    title: 'Calendar & planning',
    subtitle: 'Training plan + schedule changes.',
    chips: ['Calendar', 'Practice', 'Travel'],
    tone: 'coach',
    thumb: COACH_TOOL_IMAGES[5] ? { src: coachToolSrc(COACH_TOOL_IMAGES[5].file), alt: COACH_TOOL_IMAGES[5].alt } : undefined,
  },
  {
    title: 'Coach stack',
    subtitle: 'The tools you already run the program on.',
    chips: ['TeamWorks', 'Sheets', 'Calendar', 'Video'],
    tone: 'coach',
    thumb: COACH_TOOL_IMAGES[2] ? { src: coachToolSrc(COACH_TOOL_IMAGES[2].file), alt: COACH_TOOL_IMAGES[2].alt } : undefined,
  },
  {
    title: 'Files & uploads',
    subtitle: 'CSVs, shared drives, and ad-hoc imports.',
    chips: ['CSV', 'Google Sheets', 'Email'],
    tone: 'coach',
    thumb: COACH_TOOL_IMAGES[3] ? { src: coachToolSrc(COACH_TOOL_IMAGES[3].file), alt: COACH_TOOL_IMAGES[3].alt } : undefined,
  },
  {
    title: 'Compliance',
    subtitle: 'Eligibility, forms, and status.',
    chips: ['Compliance', 'Forms', 'Status'],
    tone: 'coach',
    thumb: COACH_TOOL_IMAGES[6] ? { src: coachToolSrc(COACH_TOOL_IMAGES[6].file), alt: COACH_TOOL_IMAGES[6].alt } : undefined,
  },
  {
    title: 'Interval worksheets',
    subtitle: 'Prescriptions + interval targets.',
    chips: ['Sheets', 'Intervals', 'Bike'],
    tone: 'athlete',
    thumb: COACH_TOOL_IMAGES[7] ? { src: coachToolSrc(COACH_TOOL_IMAGES[7].file), alt: COACH_TOOL_IMAGES[7].alt } : undefined,
  },
]

function ChipRow({ chips, tone }: { chips: string[]; tone: 'athlete' | 'coach' }) {
  const isCoach = tone === 'coach'
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {chips.map((name) => (
        <span
          key={name}
          className="rounded-md border px-2 py-1 text-[10px] font-semibold shadow-sm"
          style={{
            fontFamily: THEME.fontMono,
            background: isCoach ? 'rgba(253,230,138,0.14)' : 'rgba(16,185,129,0.16)',
            borderColor: isCoach ? 'rgba(253,230,138,0.32)' : 'rgba(52,211,153,0.28)',
            color: isCoach ? 'rgba(254,243,199,0.92)' : 'rgba(236,253,245,0.92)',
          }}
        >
          {name}
        </span>
      ))}
    </div>
  )
}

function SourceCard({
  title,
  subtitle,
  chips,
  tone,
  thumb,
}: {
  title: string
  subtitle: string
  chips: string[]
  tone: 'athlete' | 'coach'
  thumb?: ToolThumb
}) {
  const isCoach = tone === 'coach'
  return (
    <div
      className="rounded-2xl border bg-black/18 p-4 shadow-[0_18px_46px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur-md"
      style={{ borderColor: isCoach ? 'rgba(253,230,138,0.26)' : 'rgba(52,211,153,0.22)' }}
    >
      <div className="flex items-start gap-3">
        <div
          className="h-12 w-12 overflow-hidden rounded-xl border shadow-sm"
          style={{
            borderColor: isCoach ? 'rgba(253,230,138,0.38)' : 'rgba(167,243,208,0.28)',
            background: isCoach ? 'rgba(245,158,11,0.12)' : 'rgba(16,185,129,0.12)',
          }}
        >
          {thumb ? <img src={thumb.src} alt={thumb.alt} className="h-full w-full object-cover object-center" loading="lazy" /> : null}
        </div>
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/92" style={{ fontFamily: THEME.fontMono }}>
            {title}
          </p>
          <p className="mt-1 text-[12px] font-medium leading-snug text-emerald-50/90" style={{ fontFamily: THEME.fontSans }}>
            {subtitle}
          </p>
          <ChipRow chips={chips} tone={tone} />
        </div>
      </div>
    </div>
  )
}

export function SynthAgentWorkflowSlide({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 115% 92% at 50% 36%, ${THEME.primary} 0%, ${THEME.primaryDark} 48%, ${THEME.primaryDarker} 100%)`,
        padding: PAD,
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.07] via-transparent to-black/[0.24]" aria-hidden />

      <TopNav section={sectionOverride ?? "02 · SOLUTION"} page={pageOverride ?? `17 / ${DECK_SLIDE_TOTAL}`} tone="dark" />

      <div className="relative z-[1] mt-3 min-h-0 flex flex-1 items-center">
        <motion.div
          className="mx-auto grid w-full max-w-[78rem] grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_auto_1.2fr]"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Inputs */}
          <motion.div variants={itemVariants} className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/92" style={{ fontFamily: THEME.fontMono }}>
                Inputs
              </p>
              <span
                className="rounded-md border border-emerald-300/25 bg-emerald-950/35 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-50/90"
                style={{ fontFamily: THEME.fontMono }}
              >
                8 sources
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SOURCE_CARDS.map((c) => (
                <SourceCard key={c.title} title={c.title} subtitle={c.subtitle} chips={c.chips} tone={c.tone} thumb={c.thumb} />
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div variants={itemVariants} className="hidden items-center justify-center lg:flex">
            <div className="flex flex-col items-center gap-3">
              <div className="h-14 w-[2px] rounded-full bg-white/10" />
              <div className="rounded-full border border-amber-200/35 bg-amber-950/25 px-4 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
                <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-amber-50/95" style={{ fontFamily: THEME.fontMono }}>
                  →
                </p>
              </div>
              <div className="h-14 w-[2px] rounded-full bg-white/10" />
            </div>
          </motion.div>

          {/* Agent + output */}
          <motion.div variants={itemVariants} className="flex min-h-0 flex-col gap-3">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/92" style={{ fontFamily: THEME.fontMono }}>
                Output
              </p>
              <span
                className="text-[11px] font-medium text-emerald-50/80"
                style={{ fontFamily: THEME.fontSans }}
              >
                One Team Overview, always current.
              </span>
            </div>

            <motion.div initial="initial" animate="animate" variants={VARIANTS.fadeUp} transition={{ delay: 0.15, ...TRANSITIONS.smooth }}>
              <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/92" style={{ fontFamily: THEME.fontMono }}>
                  Team Overview (output)
                </p>
                <p className="max-w-[26rem] text-[12px] font-medium leading-snug text-emerald-50/88" style={{ fontFamily: THEME.fontSans }}>
                  Live roster, readiness, notes, and alerts—one surface.
                </p>
              </div>

              <motion.div
                layoutId="synth-dashboard-hero"
                className="h-full min-h-[300px] w-full overflow-hidden rounded-2xl shadow-[0_28px_64px_rgba(0,0,0,0.48)] ring-1 ring-white/18"
                transition={{ type: 'spring', stiffness: 380, damping: 38, mass: 0.85 }}
              >
                <SynthLayerDashboardMockup showSidebarDeploy={false} showCoachProfile workflowDetail sourcesIngestSuffix="Athlete signals + coach stack (live)" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

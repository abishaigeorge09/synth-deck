import { motion } from 'framer-motion'
import { PaperTexture } from '../components/PaperTexture'
import { TopNav } from '../components/TopNav'
import { STAGGER, TRANSITIONS } from '../lib/motion'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER.highlights, delayChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
}

type Tone = 'light' | 'dark'

export type PlaceholderSlideProps = {
  title: string
  kicker?: string
  note?: string
  tone?: Tone
  pageOverride?: string
  sectionOverride?: string
  section: string
}

export function PlaceholderSlide({
  title,
  kicker = 'Coming soon',
  note = 'Content for this slide is being drafted. Placeholder is in the deck so flow + navigation are intact.',
  tone = 'light',
  pageOverride,
  sectionOverride,
  section,
}: PlaceholderSlideProps) {
  const isDark = tone === 'dark'
  const bg = isDark ? THEME.darkDeep : THEME.light
  const text = isDark ? '#ffffff' : THEME.textPrimary
  const subtle = isDark ? 'rgba(255,255,255,0.65)' : THEME.textSecondary
  const muted = isDark ? 'rgba(255,255,255,0.55)' : THEME.textMuted
  const border = isDark ? 'rgba(255,255,255,0.14)' : THEME.border
  const chipBg = isDark ? 'rgba(255,255,255,0.04)' : `${THEME.primary}10`
  const chipText = isDark ? 'rgba(255,255,255,0.8)' : THEME.primaryDarker

  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: bg, padding: PAD }}
    >
      {!isDark && <PaperTexture strength={0.4} tint="rgba(255,255,255,0.92)" />}

      <TopNav
        section={sectionOverride ?? section}
        page={pageOverride ?? ''}
        tone={tone}
      />

      <motion.div
        className="relative z-10 flex min-h-0 flex-1 flex-col justify-center max-w-[1100px] mx-auto w-full"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={item}
          className="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
          style={{
            fontFamily: THEME.fontMono,
            borderColor: border,
            background: chipBg,
            color: chipText,
          }}
        >
          {kicker}
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-6 text-[clamp(42px,6vw,76px)] font-bold leading-[0.98] tracking-[-0.05em]"
          style={{ fontFamily: THEME.fontMono, color: text }}
        >
          {title}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[52rem] text-[clamp(15px,1.7vw,19px)] leading-[1.6]"
          style={{ fontFamily: THEME.fontSans, color: subtle }}
        >
          {note}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: muted }}
        >
          <span
            className="inline-block h-[2px] w-10"
            style={{ background: isDark ? 'rgba(255,255,255,0.4)' : THEME.primary }}
          />
          Placeholder · fill in later
        </motion.div>
      </motion.div>
    </div>
  )
}

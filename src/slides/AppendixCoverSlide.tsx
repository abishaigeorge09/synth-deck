import { motion } from 'framer-motion'
import { PixelArt } from '../components/PixelArt'
import { TopNav } from '../components/TopNav'
import { APPENDIX_MAIN_TOTAL } from '../lib/deckTotal'
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

export function AppendixCoverSlide({ pageOverride }: { pageOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.darkDeep, padding: PAD }}>
      <PixelArt pattern="dense" seed={108} color="#ffffff" opacity={0.06} />
      <TopNav section="APPENDIX" page={pageOverride ?? `1 / ${APPENDIX_MAIN_TOTAL}`} tone="dark" />

      <motion.div className="relative z-10 flex min-h-0 flex-1 flex-col justify-center max-w-[900px]" variants={container} initial="hidden" animate="show">
        <motion.div
          variants={item}
          className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/80"
          style={{ fontFamily: THEME.fontMono, borderColor: 'rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.04)' }}
        >
          Q&amp;A backups
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-5 text-[clamp(42px,6.5vw,78px)] font-bold leading-[0.96] tracking-[-0.06em] text-white"
          style={{ fontFamily: THEME.fontMono }}
        >
          Appendix.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-[52rem] text-[15px] leading-[1.65] text-white/70"
          style={{ fontFamily: THEME.fontSans }}
        >
          Extra slides for deeper product detail and backups.
        </motion.p>
      </motion.div>
    </div>
  )
}


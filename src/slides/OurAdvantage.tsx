import { motion } from 'framer-motion'
import { PixelArt } from '../components/PixelArt'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'
import { STAGGER, TRANSITIONS, VARIANTS } from '../lib/motion'

const PAD = 'clamp(52px, 6.5vh, 76px) clamp(24px, 4vw, 56px) clamp(18px, 2.8vh, 36px)'

const PILLARS: Array<{ k: string; title: string; accent: string }> = [
  { k: '01', title: 'Domain experts', accent: THEME.primaryLight },
  { k: '02', title: 'Market access', accent: THEME.cyan },
  { k: '03', title: 'Low switching cost', accent: THEME.accent },
]

function AdvantageRow({ k, title, accent, i }: { k: string; title: string; accent: string; i: number }) {
  return (
    <motion.div
      className="relative flex items-center gap-6 rounded-2xl border px-7 py-6"
      style={{
        borderColor: 'rgba(255,255,255,0.10)',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)',
        boxShadow: '0 24px 56px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
      variants={VARIANTS.fadeUp}
      transition={{ ...TRANSITIONS.smooth, delay: 0.05 + i * STAGGER.cards }}
    >
      <div className="shrink-0">
        <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/45" style={{ fontFamily: THEME.fontMono }}>
          {k}
        </div>
        <div className="mt-3 h-[26px] w-[3px] rounded-full" style={{ background: accent, opacity: 0.95 }} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-[clamp(22px,2.4vw,30px)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ fontFamily: THEME.fontSerif }}>
          {title}
        </div>
      </div>

      <div className="shrink-0">
        <div
          className="h-[2px] w-[clamp(90px,12vw,160px)] rounded-full"
          style={{
            background: `linear-gradient(90deg, ${accent} 0%, rgba(255,255,255,0.0) 92%)`,
            opacity: 0.9,
          }}
        />
      </div>
    </motion.div>
  )
}

export function OurAdvantage({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden text-white" style={{ background: THEME.darkDeep, padding: PAD }}>
      <PixelArt pattern="scatter" seed={47} color="#000000" opacity={0.08} />
      <TopNav section={sectionOverride ?? '09 · OUR ADVANTAGE'} page={pageOverride ?? ''} tone="dark" />

      <div className="relative flex min-h-0 flex-1 items-center">
        <div className="mx-auto w-full max-w-[1120px]">
          <motion.header
            className="pt-1"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: STAGGER.highlights }}
          >
            <motion.h1
              className="text-[clamp(34px,min(8vw,9vh),72px)] font-bold uppercase leading-[0.93] tracking-[-0.05em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.white }}
              variants={VARIANTS.fadeUp}
            >
              Why we win
            </motion.h1>
            <motion.p
              className="mt-3 text-[clamp(16px,2.3vw,22px)] font-semibold leading-[1.25] text-white/76"
              style={{ fontFamily: THEME.fontSans }}
              variants={VARIANTS.fadeUp}
            >
              Connect coaches to every signal — without replacing their workflow.
            </motion.p>
          </motion.header>

          <motion.div
            className="mt-10 grid gap-4"
            initial="initial"
            animate="animate"
            transition={{ staggerChildren: STAGGER.cards }}
          >
            {PILLARS.map((p, i) => (
              <AdvantageRow key={p.k} k={p.k} title={p.title} accent={p.accent} i={i} />
            ))}
          </motion.div>

          <div className="mt-9 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-white/36" style={{ fontFamily: THEME.fontMono }}>
            <span>connect</span>
            <span style={{ color: THEME.accent, opacity: 0.7 }}>→</span>
            <span>synthesize</span>
            <span style={{ color: THEME.accent, opacity: 0.7 }}>→</span>
            <span>win</span>
          </div>
        </div>
      </div>
    </div>
  )
}


import { motion } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'
import { PixelArt } from '../components/PixelArt'
import { TopNav } from '../components/TopNav'
import { STAGGER, TRANSITIONS } from '../lib/motion'
import { THEME } from '../lib/theme'

/**
 * India-deck-only variant of S13_ThankYou: same layout, but the SynthDog
 * mark is swapped for the plain "synth." wordmark logo. S13_ThankYou
 * itself is untouched — other decks keep the mascot.
 */
const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER.highlights, delayChildren: 0.06 },
  },
}

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: TRANSITIONS.smooth },
}

function QrTile({ label, href }: { label: string; href: string }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-2xl bg-white p-3 shadow-[0_12px_32px_rgba(0,0,0,0.25)]">
        <QRCodeSVG
          value={href}
          size={148}
          level="M"
          fgColor={THEME.darkDeep}
          bgColor="#FFFFFF"
          marginSize={0}
        />
      </div>
      <span
        className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/85"
        style={{ fontFamily: THEME.fontMono }}
      >
        {label}
      </span>
    </div>
  )
}

export function S_ThankYouIndia({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden text-white" style={{ padding: '52px 64px 40px' }}>
      <div className="pointer-events-none absolute inset-0 z-0">
        <PixelArt pattern="scatter" seed={4} color="#ffffff" opacity={0.06} />
      </div>

      <TopNav section={sectionOverride ?? 'THANK YOU'} page={pageOverride ?? ''} tone="dark" />

      <motion.div
        className="relative z-10 flex flex-1 items-center justify-center gap-20 px-6"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={item} className="shrink-0">
          <div
            className="flex h-[280px] w-[280px] items-center justify-center rounded-[36px] bg-white shadow-[0_36px_80px_rgba(0,0,0,0.28)]"
          >
            <span
              className="text-[56px] font-bold leading-none"
              style={{ fontFamily: THEME.logoFont, fontWeight: THEME.logoWeight, color: THEME.textPrimary }}
            >
              synth<span style={{ color: THEME.logoDotColor }}>.</span>
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col items-start gap-12">
          <motion.h1
            variants={item}
            className="text-[clamp(56px,7.5vw,96px)] font-bold leading-[0.95] tracking-[-0.05em]"
            style={{ fontFamily: THEME.fontMono }}
          >
            Thank you.
          </motion.h1>

          <motion.div variants={item} className="flex items-start gap-16">
            <QrTile label="Website" href="https://synthsports.co" />
            <QrTile label="Live app" href="https://synthsports.co/app" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

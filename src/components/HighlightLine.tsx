import { motion } from 'framer-motion'
import { THEME } from '../lib/theme'
import { VARIANTS, TRANSITIONS } from '../lib/motion'

export function HighlightLine({
  text,
  widthPct = 1,
  color = THEME.primaryLight,
  textColor = '#ffffff',
  delay = 0,
}: {
  text: string
  /** Bar width as a fraction of the text line’s own width (not the slide). Use 1 for full coverage including punctuation. */
  widthPct?: number
  color?: string
  textColor?: string
  delay?: number
}) {
  return (
    <div className="relative w-fit max-w-full">
      <motion.div
        className="absolute left-0 top-[52%] h-[1.05em] -translate-y-1/2 rounded"
        style={{
          width: `${Math.round(widthPct * 100)}%`,
          background: color,
          opacity: 0.42,
        }}
        variants={VARIANTS.highlightBar}
        initial="initial"
        animate="animate"
        transition={{ ...TRANSITIONS.smooth, delay }}
      />
      <div
        className="relative leading-[1.05] tracking-[-0.02em]"
        style={{ fontFamily: THEME.fontMono, color: textColor }}
      >
        {text}
      </div>
    </div>
  )
}


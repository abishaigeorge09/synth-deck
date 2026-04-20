import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { THEME } from '../lib/theme'

/** Rotating two-word phrases — feels like an endless list of tools / pains */
const PHRASES = [
  'Manual copies',
  'Another login',
  'Wrong context',
  'Sheet chaos',
  'Split brain',
  'Late nights',
  'Data silos',
  'Copy paste',
  'Five tabs',
  'Still no sync',
  'Lost pieces',
  'Wrong lineup',
  'Whoop strain',
  'Bridge loads',
  'Team chat',
  'Erg splits',
  'Travel rooms',
  'Form fatigue',
  'Another export',
  'Broken link',
  'Wrong athlete',
  'Double entry',
  'Version hell',
]

const STEP_MS = 2200

export function TwoWordToolCarousel({ seed = 0 }: { seed?: number }) {
  const [i, setI] = useState(() => (seed * 11) % PHRASES.length)

  useEffect(() => {
    const id = window.setInterval(() => {
      setI((x) => (x + 1) % PHRASES.length)
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className="relative flex min-h-[2.75rem] items-center justify-center overflow-hidden px-1"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center text-[11px] font-semibold leading-tight text-zinc-700"
          style={{ fontFamily: THEME.fontMono }}
        >
          {PHRASES[i]}
        </motion.p>
      </AnimatePresence>
    </div>
  )
}

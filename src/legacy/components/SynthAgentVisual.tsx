import { motion } from 'framer-motion'
import { useId } from 'react'
import { THEME } from '../lib/theme'

/** Abstract “synth agent”: pixel core + orbiting signal blocks — brand greens + white only. */
export function SynthAgentVisual() {
  const gid = useId().replace(/:/g, '')
  const filterId = `synth-glow-${gid}`
  const cx = 160
  const cy = 200
  const orbitR = 118
  const outerDots = [0, 45, 90, 135, 180, 225, 270, 315]
  const innerDots = [30, 150, 270]

  return (
    <div
      className="pointer-events-none absolute bottom-[8%] right-[-2%] z-0 h-[min(56vh,480px)] w-[min(46vw,400px)] md:right-[2%]"
      aria-hidden
    >
      <motion.svg
        viewBox="0 0 320 400"
        className="h-full w-full overflow-visible"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        >
          {outerDots.map((deg) => {
            const rad = (deg * Math.PI) / 180
            const x = cx + orbitR * Math.cos(rad) - 5
            const y = cy + orbitR * Math.sin(rad) - 5
            return (
              <rect key={`o-${deg}`} x={x} y={y} width="10" height="10" rx="2" fill="#ffffff" opacity={0.2} />
            )
          })}
        </motion.g>

        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          {innerDots.map((deg) => {
            const rad = (deg * Math.PI) / 180
            const r = 72
            const x = cx + r * Math.cos(rad) - 4
            const y = cy + r * Math.sin(rad) - 4
            return (
              <rect key={`i-${deg}`} x={x} y={y} width="8" height="8" rx="2" fill={THEME.primaryLight} opacity={0.45} />
            )
          })}
        </motion.g>

        <motion.g
          transform={`translate(${cx} ${cy})`}
          animate={{ scale: [0.94, 1.06, 0.94] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle r="52" fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
        </motion.g>

        <motion.g
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.g filter={`url(#${filterId})`} style={{ transformOrigin: `${cx}px ${cy}px` }}>
            <motion.g
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: `${cx}px ${cy}px` }}
            >
              <rect x={cx - 28} y={cy - 8} width="56" height="12" rx="2" fill="rgba(255,255,255,0.14)" />
              <rect x={cx - 20} y={cy + 8} width="40" height="10" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x={cx - 12} y={cy + 22} width="24" height="8" rx="2" fill="rgba(255,255,255,0.08)" />
              <rect x={cx - 18} y={cy - 52} width="36" height="36" rx="4" fill="rgba(255,255,255,0.18)" />
              <motion.rect
                x={cx - 5}
                y={cy - 38}
                width="10"
                height="10"
                rx="2"
                fill={THEME.logoDotColor}
                animate={{ opacity: [0.75, 1, 0.75] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <rect x={cx - 14} y={cy - 32} width="6" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
              <rect x={cx + 8} y={cy - 32} width="6" height="6" rx="1" fill="rgba(255,255,255,0.35)" />
              <line
                x1={cx}
                y1={cy - 52}
                x2={cx}
                y2={cy - 72}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <motion.rect
                x={cx - 3}
                y={cy - 80}
                width="6"
                height="6"
                rx="1"
                fill={THEME.primaryLight}
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Soft drifting sparks */}
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.rect
            key={i}
            x={24 + i * 18}
            y={300 + (i % 3) * 5}
            width="4"
            height="4"
            rx="1"
            fill="#ffffff"
            initial={{ opacity: 0.08 }}
            animate={{
              opacity: [0.08, 0.35, 0.08],
              x: [24 + i * 18, 24 + i * 18 + 12],
              y: [300 + (i % 3) * 5, 280 + i * 4],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.35,
            }}
          />
        ))}
      </motion.svg>
    </div>
  )
}

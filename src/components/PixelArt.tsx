import { useMemo } from 'react'
import { THEME } from '../lib/theme'
import { makePixels, type PixelPattern } from '../lib/pixelPatterns'

export function PixelArt({
  pattern,
  seed = 1,
  color = '#000000',
  opacity = THEME.pixelOpacity,
}: {
  pattern: PixelPattern
  seed?: number
  color?: string
  opacity?: number
}) {
  const blocks = useMemo(
    () =>
      makePixels({
        pattern,
        seed,
        width: 1440,
        height: 900,
        sizes: THEME.pixelSizes,
      }),
    [pattern, seed],
  )

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {blocks.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          fill={color}
          opacity={opacity * b.shade}
          rx={2}
        />
      ))}
    </svg>
  )
}


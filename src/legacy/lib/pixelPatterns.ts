export type PixelPattern = 'cascade-tr' | 'cascade-bl' | 'swoosh' | 'scatter' | 'dense'

export type PixelBlock = {
  x: number
  y: number
  w: number
  h: number
  shade: number // 0..1, relative tint
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(rand: () => number, arr: readonly T[]): T {
  return arr[Math.floor(rand() * arr.length)]!
}

function snap(n: number, grid = 10) {
  return Math.round(n / grid) * grid
}

export function makePixels(opts: {
  pattern: PixelPattern
  seed?: number
  width: number
  height: number
  sizes: readonly number[]
}): PixelBlock[] {
  const rand = mulberry32(opts.seed ?? 1)
  const size = () => pick(rand, opts.sizes)
  const blocks: PixelBlock[] = []

  const add = (x: number, y: number) => {
    const s = size()
    blocks.push({
      x: snap(x),
      y: snap(y),
      w: s,
      h: s,
      shade: 0.35 + rand() * 0.65,
    })
  }

  if (opts.pattern === 'scatter') {
    for (let i = 0; i < 24; i++) add(rand() * opts.width, rand() * opts.height)
    return blocks
  }

  if (opts.pattern === 'cascade-tr' || opts.pattern === 'cascade-bl') {
    const fromTop = opts.pattern === 'cascade-tr'
    for (let i = 0; i < 52; i++) {
      const t = i / 52
      const x = opts.width * (0.62 + 0.38 * (1 - t)) + (rand() - 0.5) * 80
      const y = opts.height * (fromTop ? 0.1 + 0.8 * t : 0.9 - 0.8 * t) + (rand() - 0.5) * 80
      add(x, y)
      if (rand() > 0.6) add(x - 60 * rand(), y + 60 * (rand() - 0.5))
    }
    return blocks
  }

  if (opts.pattern === 'swoosh') {
    for (let i = 0; i < 44; i++) {
      const t = i / 44
      const x = opts.width * (0.1 + 0.8 * t)
      const y = opts.height * (0.25 + 0.35 * Math.sin(t * Math.PI)) + (rand() - 0.5) * 60
      add(x + (rand() - 0.5) * 50, y)
    }
    return blocks
  }

  // dense
  for (let i = 0; i < 70; i++) {
    const corner = rand() > 0.5 ? 'tr' : 'bl'
    const x = corner === 'tr' ? opts.width * (0.55 + rand() * 0.45) : opts.width * (rand() * 0.45)
    const y = corner === 'tr' ? opts.height * (rand() * 0.5) : opts.height * (0.5 + rand() * 0.5)
    add(x + (rand() - 0.5) * 80, y + (rand() - 0.5) * 80)
  }
  return blocks
}


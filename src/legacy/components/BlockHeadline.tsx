import { THEME } from '../lib/theme'

export function BlockHeadline({
  lines,
  blockColor,
  textColor = '#0b1020',
  strokeColor = 'rgba(0,0,0,0.55)',
  fontSize = 110,
  lineGap = 16,
  blockPaddingX = 18,
  blockPaddingY = 10,
  blockRadius = 10,
  strokeWidth = 0,
}: {
  lines: Array<{ text: string; widthPct?: number }>
  blockColor: string
  textColor?: string
  strokeColor?: string
  fontSize?: number
  lineGap?: number
  blockPaddingX?: number
  blockPaddingY?: number
  blockRadius?: number
  strokeWidth?: number
}) {
  return (
    <div className="flex flex-col" style={{ gap: lineGap }}>
      {lines.map((l) => (
        <div key={l.text} className="relative inline-block">
          <div
            className="absolute left-0 top-0"
            style={{
              width: `${Math.round((l.widthPct ?? 1) * 100)}%`,
              height: '100%',
              background: blockColor,
              transform: 'translateY(6px)',
              borderRadius: blockRadius,
            }}
          />
          <div
            className="relative inline-block uppercase"
            style={{
              fontFamily: THEME.fontMono,
              fontWeight: 800,
              fontSize,
              letterSpacing: '-0.08em',
              color: textColor,
              padding: `${blockPaddingY}px ${blockPaddingX}px`,
              WebkitTextStroke: strokeWidth > 0 ? `${strokeWidth}px ${strokeColor}` : undefined,
              textShadow:
                '0 1px 0 rgba(0,0,0,0.22), 0 10px 30px rgba(0,0,0,0.20)',
              textRendering: 'geometricPrecision',
              WebkitFontSmoothing: 'antialiased',
            }}
          >
            {l.text}
          </div>
        </div>
      ))}
    </div>
  )
}


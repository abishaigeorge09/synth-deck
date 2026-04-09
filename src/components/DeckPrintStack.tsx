import type { SlideDef } from './SlideShell'
import { THEME } from '../lib/theme'

/** Screen-hidden stack of all slides; @media print shows this and hides the live deck. */
export function DeckPrintStack({ slides }: { slides: SlideDef[] }) {
  return (
    <div className="deck-print-only" aria-hidden>
      {slides.map((slide) => (
        <div
          key={slide.id}
          className="relative w-full overflow-hidden print:break-after-page"
          style={{
            aspectRatio: '16 / 9',
            minHeight: '100vh',
            pageBreakAfter: 'always',
            breakAfter: 'page',
            background: slide.background ?? THEME.darkDeep,
          }}
        >
          {slide.component}
        </div>
      ))}
    </div>
  )
}

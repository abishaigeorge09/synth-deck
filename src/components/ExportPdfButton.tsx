import { usePrintExport } from '../context/PrintExportContext'
import { THEME } from '../lib/theme'

type Tone = 'dark' | 'light' | 'green'

const toneClass: Record<Tone, string> = {
  dark: 'text-white/35 hover:text-white/55',
  light: 'text-zinc-500/90 hover:text-zinc-700',
  green: 'text-white/35 hover:text-white/55',
}

/** Opens the browser print dialog — user chooses “Save as PDF”. Stops slide advance on click. */
export function ExportPdfButton({ tone = 'dark' }: { tone?: Tone }) {
  const { requestPdfExport } = usePrintExport()

  return (
    <button
      type="button"
      onPointerDown={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        requestPdfExport()
      }}
      className={`pointer-events-auto absolute z-[60] max-w-[min(13rem,calc(100vw-4rem))] text-left text-[9px] uppercase tracking-[0.18em] underline-offset-4 transition hover:underline sm:text-[10px] ${toneClass[tone]}`}
      style={{
        fontFamily: THEME.fontMono,
        bottom: 'max(4.5rem, calc(env(safe-area-inset-bottom, 0px) + 3.5rem))',
        left: 'max(1.25rem, env(safe-area-inset-left, 0px))',
      }}
    >
      Export presentation as PDF
    </button>
  )
}

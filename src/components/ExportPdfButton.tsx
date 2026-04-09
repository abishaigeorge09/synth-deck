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
      onMouseDown={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation()
        requestPdfExport()
      }}
      className={`pointer-events-auto absolute bottom-16 left-8 z-[60] max-w-[13rem] text-left text-[10px] uppercase tracking-[0.18em] underline-offset-4 transition hover:underline ${toneClass[tone]}`}
      style={{ fontFamily: THEME.fontMono }}
    >
      Export presentation as PDF
    </button>
  )
}

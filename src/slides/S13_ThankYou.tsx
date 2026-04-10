import { ExportPdfButton } from '../components/ExportPdfButton'
import { SimpleSlide } from '../components/SimpleSlide'
import { THEME } from '../lib/theme'

export function S13_ThankYou() {
  return (
    <>
      <SimpleSlide
        section="THANK YOU"
        page="13 / 13"
        tone="green"
        primary={
          <h1
            className="text-[clamp(40px,8vw,80px)] font-bold leading-[0.95] tracking-[-0.05em] text-white"
            style={{ fontFamily: THEME.fontMono }}
          >
            Thank you.
          </h1>
        }
        secondary={
          <p className="text-[clamp(14px,2vw,16px)] leading-[1.55] text-white/85" style={{ fontFamily: THEME.fontSans }}>
            synthsports.com · supportsynth@gmail.com
          </p>
        }
      />
      <ExportPdfButton tone="green" />
    </>
  )
}

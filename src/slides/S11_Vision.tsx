import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

export function S11_Vision({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '44px 40px 32px', color: THEME.textPrimary, background: THEME.light }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? 'VISION'} page={pageOverride ?? '11 / 13'} tone="light" />

      <div className="relative z-10 flex-1 min-h-0 flex flex-col max-w-[1200px] mx-auto w-full">
        <SectionLabel text="10 · VISION" className="!text-[11px]" />

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <div className="max-w-[980px] text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Vision
            </div>
            <h1
              className="mt-4 text-[clamp(34px,5vw,64px)] font-bold leading-[1.02] tracking-[-0.06em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
            >
              One synth layer powering every coach workflow.
            </h1>
            <p className="mt-6 text-[clamp(15px,2vw,20px)] leading-[1.55]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              Not another isolated app. One underlying system that supports custom tools across an entire athletic program.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

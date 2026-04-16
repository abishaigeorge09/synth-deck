import { THEME } from '../lib/theme'
import { TopNav } from '../components/TopNav'
import { PixelArt } from '../components/PixelArt'
import { PaperTexture } from '../components/PaperTexture'

/** Bridge after problem: centered headline, brand mark, tagline — then product walkthrough. */
export function OurSolutionCover({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{
        background: `radial-gradient(1100px 720px at 50% 38%, ${THEME.primaryLight} 0%, ${THEME.primary} 44%, ${THEME.primaryDarker} 100%)`,
        padding: 'clamp(24px, 3.5vw, 40px) clamp(20px, 3.5vw, 48px) clamp(20px, 3.5vw, 32px)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none">
        <PixelArt pattern="cascade-tr" seed={12} color="#ffffff" opacity={0.08} />
        <PixelArt pattern="cascade-bl" seed={28} color="#000000" opacity={0.06} />
        <PaperTexture strength={0.42} tint="rgba(255,255,255,0.35)" />
      </div>

      <TopNav section={sectionOverride ?? '02 · SOLUTION'} page={pageOverride ?? '4 / 13'} tone="dark" />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center px-6 text-center">
        <div
          className="shrink-0 rounded-[28px] border px-8 py-7 sm:px-10 sm:py-8"
          style={{
            borderColor: 'rgba(255,255,255,0.22)',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.12) 100%)',
            boxShadow: '0 34px 90px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.28)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            <div className="rounded-3xl bg-white/95 p-5 shadow-[0_18px_44px_rgba(0,0,0,0.18)]">
              <img
                src="/logos/synth-icon-green.svg"
                alt="synth."
                className="h-16 w-16 sm:h-20 sm:w-20"
                width={80}
                height={80}
              />
            </div>
            <div className="text-left">
              <div
                className="text-[42px] sm:text-[54px] font-bold leading-none tracking-[-0.06em]"
                style={{
                  fontFamily: THEME.logoFont,
                  fontWeight: THEME.logoWeight,
                  color: THEME.white,
                  textShadow: '0 22px 60px rgba(0,0,0,0.35)',
                }}
              >
                synth<span style={{ color: THEME.logoDotColor }}>.</span>
              </div>
            </div>
          </div>
        </div>

        <p
          className="mt-10 max-w-[44rem] text-[clamp(14px,2.2vw,18px)] leading-relaxed"
          style={{ fontFamily: THEME.fontSans, color: 'rgba(255,255,255,0.82)' }}
        >
          {THEME.tagline}
        </p>
      </div>
    </div>
  )
}

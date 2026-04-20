import type { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { THEME } from '../lib/theme'

export type SimpleSlideTone = 'light' | 'dark' | 'green'

const surface: Record<SimpleSlideTone, string> = {
  light: THEME.light,
  dark: THEME.darkDeep,
  green: THEME.primary,
}

function illustrationFrameClass(tone: SimpleSlideTone) {
  if (tone === 'light') {
    return 'rounded-2xl border border-zinc-200/90 bg-white/95 shadow-[0_16px_48px_rgba(0,0,0,0.07)]'
  }
  if (tone === 'dark') {
    return 'rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.35)]'
  }
  return 'rounded-2xl border border-white/25 bg-black/15 shadow-[0_12px_40px_rgba(0,0,0,0.2)]'
}

/**
 * Slide with optional illustration: TopNav + (illustration | text) layout.
 * With `illustration`: split on large screens (visual left, copy right), stacked on small.
 * Without: centered headline + subcopy (original simple deck).
 */
export function SimpleSlide({
  section,
  page,
  tone = 'light',
  illustration,
  layout = 'split',
  /** Wider illustration panel (e.g. market rings). */
  illustrationProminence = 'default',
  primary,
  /** Optional block between headline and body — e.g. feature list in its own section */
  features,
  secondary,
}: {
  section: string
  page: string
  tone?: SimpleSlideTone
  /** Visual that explains the slide alongside the headline (SVG, image, etc.) */
  illustration?: ReactNode
  /** `split`: side-by-side on lg+. `stack`: illustration on top, text below. */
  layout?: 'split' | 'stack'
  /** `prominent`: larger max-width and padding for the illustration frame. */
  illustrationProminence?: 'default' | 'prominent'
  primary: ReactNode
  features?: ReactNode
  secondary?: ReactNode
}) {
  const navTone = tone === 'light' ? 'light' : 'dark'
  const hasVisual = illustration != null
  const illustWrap =
    illustrationProminence === 'prominent'
      ? 'w-full shrink-0 max-w-[min(100%,560px)] lg:max-w-[min(54%,600px)]'
      : 'w-full shrink-0 max-w-[min(100%,420px)] lg:max-w-[min(44%,420px)]'
  const illustPad = illustrationProminence === 'prominent' ? 'p-6 sm:p-8' : 'p-5'

  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: surface[tone],
        padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)',
      }}
    >
      <TopNav section={section} page={page} tone={navTone} />
      <div
        className={
          hasVisual
            ? `flex min-h-0 flex-1 flex-col ${layout === 'split' ? 'lg:flex-row lg:items-center lg:justify-center lg:gap-10 xl:gap-14' : ''} items-center justify-center gap-8`
            : 'flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(1.25rem,4vh,2.5rem)]'
        }
      >
        {hasVisual ? (
          <>
            <div className={`${illustWrap} ${illustrationFrameClass(tone)} ${illustPad}`}>
              {illustration}
            </div>
            <div
              className={`flex min-w-0 flex-1 flex-col gap-[clamp(1rem,3vh,1.75rem)] ${
                hasVisual
                  ? layout === 'stack'
                    ? 'items-center text-center'
                    : 'text-center lg:items-start lg:text-left'
                  : 'text-center'
              } max-w-[min(920px,100%)]`}
            >
              {primary}
              {features != null ? <div className="w-full max-w-[min(640px,100%)]">{features}</div> : null}
              {secondary != null ? secondary : null}
            </div>
          </>
        ) : (
          <>
            <div className="w-full max-w-[min(920px,100%)] text-center">{primary}</div>
            {features != null ? <div className="mx-auto w-full max-w-[min(640px,100%)]">{features}</div> : null}
            {secondary != null ? <div className="w-full max-w-[min(720px,100%)] text-center">{secondary}</div> : null}
          </>
        )}
      </div>
    </div>
  )
}

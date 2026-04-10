import type { ReactNode } from 'react'
import { TopNav } from './TopNav'
import { THEME } from '../lib/theme'

export type SimpleSlideTone = 'light' | 'dark' | 'green'

const surface: Record<SimpleSlideTone, string> = {
  light: THEME.light,
  dark: THEME.darkDeep,
  green: THEME.primary,
}

/**
 * Minimal slide: deck chrome (TopNav) + exactly one primary block + optional one secondary block.
 */
export function SimpleSlide({
  section,
  page,
  tone = 'light',
  primary,
  secondary,
}: {
  section: string
  page: string
  tone?: SimpleSlideTone
  primary: ReactNode
  secondary?: ReactNode
}) {
  const navTone = tone === 'light' ? 'light' : 'dark'
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: surface[tone],
        padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)',
      }}
    >
      <TopNav section={section} page={page} tone={navTone} />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-[clamp(1.25rem,4vh,2.5rem)] text-center">
        <div className="w-full max-w-[min(920px,100%)]">{primary}</div>
        {secondary != null ? <div className="w-full max-w-[min(720px,100%)]">{secondary}</div> : null}
      </div>
    </div>
  )
}

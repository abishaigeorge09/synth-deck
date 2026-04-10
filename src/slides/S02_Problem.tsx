import { TwoWordToolCarousel } from '../components/TwoWordToolCarousel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'
import { COACH_TOOL_IMAGES, coachToolSrc } from './coachToolImages'

/**
 * Problem slide: headline + tool screenshots; each card has a rotating two-word
 * carousel to imply an endless pile of disconnected tools.
 */
export function S02_Problem() {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{
        background: THEME.light,
        padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)',
      }}
    >
      <TopNav section="01 · PROBLEM" page="2 / 13" tone="light" />

      <h1
        className="shrink-0 text-[clamp(24px,3.8vw,38px)] font-bold leading-[1.08] tracking-[-0.04em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
      >
        Coaches are drowning in dispersed data.
      </h1>

      <div className="mt-5 min-h-0 flex-1 overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin]">
        <ul className="grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {COACH_TOOL_IMAGES.map(({ file, alt }, index) => (
            <li
              key={file}
              className="list-none flex flex-col rounded-xl border bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              style={{ borderColor: THEME.border }}
            >
              <div className="flex aspect-[4/3] w-full shrink-0 items-center justify-center overflow-hidden rounded-lg bg-zinc-50">
                <img
                  src={coachToolSrc(file)}
                  alt={alt}
                  className="h-full w-full object-contain object-center"
                  loading="lazy"
                />
              </div>
              <TwoWordToolCarousel seed={index} />
            </li>
          ))}
        </ul>
      </div>

      <p
        className="mt-4 shrink-0 text-center text-[clamp(14px,2.2vw,17px)] font-semibold italic"
        style={{ fontFamily: THEME.fontSerif, color: THEME.primaryDarker }}
      >
        That&apos;s a lot of tools!
      </p>
    </div>
  )
}

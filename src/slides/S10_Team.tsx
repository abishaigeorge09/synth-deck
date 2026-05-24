import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

function TeamMember({
  name,
  title,
  bullets,
  accent,
  photoSrc,
  photoObjectPosition = 'center top',
}: {
  name: string
  title: string
  bullets: string[]
  accent: string
  photoSrc?: string
  photoObjectPosition?: string
}) {
  return (
    <div className="flex h-full min-w-0 items-start justify-center gap-6">
      <div
        className="relative aspect-[3/4] w-[176px] shrink-0 overflow-hidden rounded-2xl"
        style={{ background: THEME.light, border: `1px solid ${THEME.border}` }}
      >
        {photoSrc ? (
          <img
            src={photoSrc}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: photoObjectPosition }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center" style={{ background: `${accent}08` }}>
            <span
              className="text-[10px] font-medium uppercase tracking-[0.12em]"
              style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
            >
              Photo
            </span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 max-w-[340px] flex-1 flex-col pt-0.5">
        <div
          className="text-[19px] font-bold leading-tight"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
        >
          {name}
        </div>
        <div
          className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ fontFamily: THEME.fontMono, color: accent }}
        >
          {title}
        </div>
        <ul className="mt-2.5 space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="text-[14px] leading-[1.5]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function S10_Team({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '44px 44px 32px', color: THEME.textPrimary, background: THEME.light }}
    >
      <TopNav section={sectionOverride ?? '13 · TEAM'} page={pageOverride ?? ''} tone="light" />
      <PaperTexture strength={0.65} tint="rgba(255,255,255,0.97)" />

      <div className="relative z-10 mx-auto flex w-full min-h-0 max-w-[1180px] flex-1 flex-col items-center">
        <SectionLabel text="13 · TEAM" className="!text-[12px] text-center" />

        {/* Reserves vertical space matching the original layout rhythm */}
        <h1
          className="invisible pointer-events-none mt-3 max-w-[920px] select-none text-center text-[36px] font-bold leading-[1.1]"
          style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em', color: THEME.textPrimary }}
          aria-hidden={true}
        >
          We didn&apos;t discover this problem through research. We lived it.
        </h1>

        <div className="mt-6 grid w-full min-h-0 flex-1 grid-cols-2 grid-rows-2 items-start justify-items-center gap-x-12 gap-y-8 content-center">
          <TeamMember
            name="Abishai Gosula"
            title="Co-founder & CEO"
            accent={THEME.primary}
            photoSrc="/team/abishai-gosula.png"
            photoObjectPosition="center 22%"
            bullets={[
              'CS at UC Berkeley',
              'Technical founder, leads engineering and product',
              'Ex-competitive tennis athlete',
            ]}
          />
          <TeamMember
            name="Matthew Waddell"
            title="Co-founder"
            accent={THEME.amber}
            photoSrc="/team/matthew-waddell_rowing.png"
            photoObjectPosition="32% 48%"
            bullets={[
              'U23 World silver medalist (New Zealand)',
              "Cal Men's Rowing, IRA National Champion",
              "Head Boy, St. Paul's Collegiate",
              'Political Economy at UC Berkeley',
            ]}
          />
          <TeamMember
            name="Star Miller"
            title="Co-founder"
            accent={THEME.cyan}
            photoSrc="/team/star-rose_profile.png"
            photoObjectPosition="center 32%"
            bullets={[
              "Cal Women's Rowing, 4-year V8+ starter",
              'U23 World Championships (Australia)',
              'Sydney Rowing Club',
            ]}
          />
          <TeamMember
            name="Lily Pember"
            title="Co-founder"
            accent={THEME.purple}
            photoSrc="/team/lily-pember_rowing.png"
            photoObjectPosition="center 42%"
            bullets={[
              'USA Junior World gold medalist + world record holder',
              "4-year team captain, Cal Women's Rowing",
              'Data Science at UC Berkeley',
            ]}
          />
        </div>

        <p
          className="mt-6 max-w-[720px] text-center text-[15px] italic"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textMuted }}
        >
          We&apos;ve lived the problem. Now we&apos;re building the solution.
        </p>
      </div>
    </div>
  )
}

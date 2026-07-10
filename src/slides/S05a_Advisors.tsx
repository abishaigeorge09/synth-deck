import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

function AdvisorCard({
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
    <div className="flex h-full min-w-0 items-start justify-center gap-4">
      <div
        className="relative aspect-[3/4] w-[160px] shrink-0 overflow-hidden rounded-2xl"
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
      <div className="flex min-w-0 max-w-[260px] flex-1 flex-col pt-1">
        <div
          className="text-[18px] font-bold leading-tight"
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
              className="border-l-2 pl-3 text-[13px] leading-[1.5]"
              style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary, borderColor: `${accent}55` }}
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function S05a_Advisors({ pageOverride, sectionOverride }: { pageOverride?: string; sectionOverride?: string }) {
  return (
    <div
      className="absolute inset-0 flex flex-col"
      style={{ padding: '44px 44px 32px', color: THEME.textPrimary, background: THEME.light }}
    >
      <TopNav section={sectionOverride ?? '14 · ADVISORS'} page={pageOverride ?? ''} tone="light" />
      <PaperTexture strength={0.65} tint="rgba(255,255,255,0.97)" />

      <div className="relative z-10 flex w-full min-h-0 flex-1 flex-col items-center">
        <SectionLabel text={sectionOverride ?? '14 · ADVISORS'} className="!text-[12px] text-center" />

        {/* Preserve the Team slide spacing rhythm (section label → grid). */}
        <h1
          className="invisible pointer-events-none mt-3 max-w-[920px] select-none text-center text-[36px] font-bold leading-[1.1]"
          style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em', color: THEME.textPrimary }}
          aria-hidden={true}
        >
          Advisors
        </h1>

        <div className="mt-6 grid w-full min-h-0 max-w-[1340px] flex-1 grid-cols-3 grid-rows-2 items-start justify-items-center gap-x-6 gap-y-12 content-center">
          <AdvisorCard
            name="Shuo Chen"
            title="Advisor"
            accent={THEME.cyan}
            photoSrc="/advisors/shuo-chen.png"
            photoObjectPosition="center 18%"
            bullets={[
              'General Partner, IOVC',
              'Faculty, UC Berkeley & Stanford',
              '150+ portfolio companies, 12+ unicorns, 12+ public exits',
            ]}
          />
          <AdvisorCard
            name="Shomit Ghose"
            title="Advisor"
            accent={THEME.cyan}
            photoSrc="/advisors/shomit-ghose.jpeg"
            photoObjectPosition="center 30%"
            bullets={[
              'Partner, Clearvision Ventures',
              'Faculty, UC Berkeley SCET',
              '4x founder, multiple exits',
            ]}
          />
          <AdvisorCard
            name="Jenny Simon-O'Neill"
            title="Advisor"
            accent={THEME.cyan}
            photoSrc="/advisors/jenny-simon-oneill.webp"
            photoObjectPosition="center 20%"
            bullets={[
              'Co-Director, Cal Athletics',
              "Leads Cal's analytics consolidation initiative",
              '20+ years in collegiate athletic administration',
            ]}
          />
          <AdvisorCard
            name="Vasilis Iliopoulos"
            title="Advisor"
            accent={THEME.cyan}
            photoSrc="/advisors/vasileios-iliopoulos.png"
            photoObjectPosition="center 18%"
            bullets={[
              'Director of Revenue Analytics, Cal Athletics',
              'Former Cal Tennis assistant coach',
              'Haas MBA',
            ]}
          />
          <AdvisorCard
            name="Peter Mansfeld"
            title="Advisor"
            accent={THEME.amber}
            photoSrc="/advisors/peter-mansfeld.png"
            photoObjectPosition="42% 35%"
            bullets={[
              "Assistant Coach, Cal Women's Rowing",
              'Head Coach, Czech National Team — Paris 2024 Olympics',
              'Coached 3x Olympian Kara Kohler at Texas Rowing Center',
            ]}
          />
          <AdvisorCard
            name="Michael Chandler"
            title="Advisor"
            accent={THEME.purple}
            photoSrc="/advisors/michael-chandler.png"
            photoObjectPosition="center 22%"
            bullets={[
              "Assistant Coach, Cal Men's Rowing",
              'Cal Rowing alum (IRA Nationals 2021–22)',
              'Data Science, UC Berkeley',
            ]}
          />
        </div>
      </div>
    </div>
  )
}

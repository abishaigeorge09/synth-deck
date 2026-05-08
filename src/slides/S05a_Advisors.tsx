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
  /** Where to anchor `object-fit: cover` so head + shoulders read clearly (varies by source crop). */
  photoObjectPosition?: string
}) {
  return (
    <div className="flex min-w-0 gap-4 items-start h-full justify-center">
      <div
        className="relative shrink-0 w-[160px] aspect-[3/4] rounded-2xl overflow-hidden"
        style={{ background: `${THEME.light}`, border: `1px solid ${THEME.border}` }}
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
            <span className="text-[10px] tracking-[0.12em] uppercase font-medium" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Photo
            </span>
          </div>
        )}
      </div>
      <div className="min-w-0 flex-1 max-w-[260px] flex flex-col justify-start pt-1">
        <div className="text-[18px] font-bold leading-tight" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
          {name}
        </div>
        <div className="mt-1 text-[11px] tracking-[0.14em] uppercase font-semibold" style={{ fontFamily: THEME.fontMono, color: accent }}>
          {title}
        </div>
        <ul className="mt-2.5 space-y-2">
          {bullets.map((b) => (
            <li
              key={b}
              className="text-[13px] leading-[1.5] pl-3 border-l-2"
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
    <div className="absolute inset-0 flex flex-col" style={{ padding: '44px 44px 32px', color: THEME.textPrimary, background: THEME.light }}>
      <TopNav section={sectionOverride ?? 'ADVISORS'} page={pageOverride ?? ''} tone="light" />
      <PaperTexture strength={0.65} tint="rgba(255,255,255,0.97)" />

      <div className="flex-1 flex flex-col items-center min-h-0 w-full">
        <SectionLabel text="ADVISORS" className="!text-[12px] text-center" />

        {/* Preserve the Team slide spacing rhythm (section label → grid). */}
        <h1
          className="mt-3 text-[36px] leading-[1.1] font-bold max-w-[920px] text-center invisible pointer-events-none select-none"
          style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em', color: THEME.textPrimary }}
          aria-hidden={true}
        >
          Advisors
        </h1>

        <div className="mt-6 flex-1 min-h-0 w-full max-w-[1340px] grid grid-cols-3 grid-rows-2 gap-x-6 gap-y-12 items-start justify-items-center content-center">
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
              'Lecturer, UC Berkeley (Entrepreneurship)',
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
            name="Vasileios Iliopoulos"
            title="Advisor"
            accent={THEME.cyan}
            photoSrc="/advisors/vasileios-iliopoulos.png"
            photoObjectPosition="center 18%"
            bullets={[
              'Director of Revenue Analytics, Cal Athletics',
              'Former Cal Tennis assistant coach',
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

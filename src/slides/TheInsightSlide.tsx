import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(28px, 4vw, 48px) clamp(28px, 4vw, 56px) clamp(24px, 4vw, 40px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

type Advantage = { k: string; title: string; body: string }

const ADVANTAGES: Advantage[] = [
  {
    k: '01',
    title: 'Structural neutrality',
    body: 'No vendor will build a view that exposes where their own data falls short. Only a neutral layer would.',
  },
  {
    k: '02',
    title: 'Domain experts',
    body: 'We are the athletes who lived this problem. International athletes across four countries, every coaching tool stack tested.',
  },
  {
    k: '03',
    title: 'Market access',
    body: 'Already inside the #2 program in the country. Coaches trust us because we are their athletes.',
  },
  {
    k: '04',
    title: 'Low switching effort',
    body: 'Coaches keep every tool they already use. synth reads, writes back, and disappears into their workflow.',
  },
]

function AdvantageRow({ a }: { a: Advantage }) {
  return (
    <div
      className="flex items-center gap-6 rounded-2xl border bg-white px-7 py-6"
      style={{ borderColor: THEME.border, boxShadow: '0 8px 24px rgba(24,24,27,0.06)' }}
    >
      {/* Left: number + vertical green accent */}
      <div className="flex shrink-0 items-center gap-5">
        <div
          className="text-[clamp(22px,2.2vw,28px)] font-bold leading-none tabular-nums"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          {a.k}
        </div>
        <div
          className="h-[42px] w-[3px] rounded-full"
          style={{ background: THEME.accent }}
        />
      </div>

      {/* Middle: title + 1-line description */}
      <div className="min-w-0 flex-1">
        <div
          className="text-[clamp(20px,2vw,26px)] font-semibold leading-[1.1] tracking-[-0.02em]"
          style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
        >
          {a.title}
        </div>
        <p
          className="mt-2 text-[clamp(13.5px,1.1vw,15.5px)] leading-[1.5]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          {a.body}
        </p>
      </div>

      {/* Right: thin green underline accent */}
      <div className="shrink-0">
        <div
          className="h-[2px] w-[clamp(80px,11vw,140px)] rounded-full"
          style={{
            background: `linear-gradient(90deg, rgba(16,185,129,0) 0%, ${THEME.accent} 100%)`,
          }}
        />
      </div>
    </div>
  )
}

export function TheInsightSlide({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.92)" />
      <TopNav section={sectionOverride ?? '04 · OUR ADVANTAGE'} page={pageOverride ?? ''} tone="light" />

      <div className="relative z-10 mt-6 flex min-h-0 flex-1 flex-col">
        <SectionLabel text={sectionOverride ?? '04 · OUR ADVANTAGE'} />

        <h1
          className="mt-4 text-[clamp(34px,4vw,52px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Our advantage.
        </h1>
        <p
          className="mt-3 max-w-[60rem] text-[clamp(16px,1.4vw,19px)] leading-[1.55]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}
        >
          Four reasons no incumbent can build what we&rsquo;re building.
        </p>

        <div className="mt-7 flex min-h-0 flex-1 flex-col justify-between gap-4">
          {ADVANTAGES.map((a) => (
            <AdvantageRow key={a.k} a={a} />
          ))}
        </div>

        <div
          className="mt-6 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
        >
          <span>Connect</span>
          <span style={{ color: THEME.accent, opacity: 0.75 }}>→</span>
          <span>Synthesize</span>
          <span style={{ color: THEME.accent, opacity: 0.75 }}>→</span>
          <span>Win</span>
        </div>
      </div>
    </div>
  )
}

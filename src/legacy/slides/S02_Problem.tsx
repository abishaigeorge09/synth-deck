import { DashedRule } from '../components/DashedRule'
import { HighlightLine } from '../components/HighlightLine'
import { PaperTexture } from '../components/PaperTexture'
import { ToolStack } from '../components/ToolStack'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const STATS: Array<{ n: string; label: string }> = [
  { n: '60+', label: 'Athletes per roster' },
  { n: '5+', label: 'Disconnected sources' },
  { n: '0', label: 'Unified tools — until now' },
]

const PAINS: Array<{ title: string; stat: string; body: React.ReactNode }> = [
  {
    title: 'Minutes lost daily',
    stat: '30+',
    body: (
      <>
        Coaches spend <strong className="font-medium text-zinc-800">half an hour every day</strong> copying data between apps. Erg scores in Sheets, lineups
        in group chats, notes on a phone. Every practice starts with a <strong className="font-medium text-zinc-800">manual scavenger hunt</strong>.
      </>
    ),
  },
  {
    title: 'Paid tools, zero integration',
    stat: '5–6',
    body: (
      <>
        Programs pay for TeamWorks, Bridge, Whoop, TrainingPeaks, and more, each solving <strong className="font-medium text-zinc-800">one slice</strong>.
        None of them connect. The <strong className="font-medium text-zinc-800">integration tax</strong> is the coach&apos;s time and sanity.
      </>
    ),
  },
  {
    title: 'Races lost to bad data',
    stat: '?',
    body: (
      <>
        When a coach <strong className="font-medium text-zinc-800">can&apos;t see the full picture</strong>, they seat the wrong lineup. They miss the athlete
        who peaked. Decisions on <strong className="font-medium text-zinc-800">partial data lose races</strong> that better information would&apos;ve won.
      </>
    ),
  },
  {
    title: 'Early warning systems',
    stat: '0',
    body: (
      <>
        An athlete&apos;s erg drops. Their gym load spikes. Their schedule hits 6+ hours. Each fact lives in a{' '}
        <strong className="font-medium text-zinc-800">different app</strong> and nobody connects the dots until{' '}
        <strong className="font-medium text-zinc-800">the injury happens</strong>.
      </>
    ),
  },
]

export function S02_Problem() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '40px 44px 32px' }}>
      <TopNav section="01 · PROBLEM" page="2 / 13" tone="light" />
      <PaperTexture strength={0.85} tint="rgba(244, 243, 236, 0.95)" />

      <div className="flex min-h-0 flex-1 flex-col gap-5">
        <SectionLabel text="01 · PROBLEM" className="!text-[12px] !tracking-[0.15em]" />

        {/* Headline + stats (plain text, neutral) */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          <h1
            className="max-w-[680px] text-[34px] font-bold leading-[1.08] sm:text-[36px] lg:text-[38px]"
            style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.055em', color: THEME.textPrimary }}
          >
            Coaches are drowning in dispersed data.
          </h1>
          <div className="flex shrink-0 flex-col gap-2.5 text-left lg:min-w-[240px] lg:pt-1 lg:text-right">
            {STATS.map((s) => (
              <div key={s.label} className="leading-tight">
                <span className="text-[24px] font-semibold tabular-nums text-zinc-900 sm:text-[26px]" style={{ fontFamily: THEME.fontMono }}>
                  {s.n}
                </span>
                <span className="mt-0.5 block text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-600 lg:mt-0 lg:inline lg:ml-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-1">
          <DashedRule />
        </div>

        {/* Positioning — one accent: green highlight bars only */}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500" style={{ fontFamily: THEME.fontMono }}>
            Why synth exists
          </p>
          <div className="mt-2.5 flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-1.5">
            <div className="text-[14px] font-bold uppercase leading-none tracking-[-0.04em] sm:text-[15px] lg:text-[16px]">
              <HighlightLine text="EVERY DATA SIGNAL." color={THEME.primaryLight} textColor={THEME.textPrimary} />
            </div>
            <div className="text-[14px] font-bold uppercase leading-none tracking-[-0.04em] sm:text-[15px] lg:text-[16px]">
              <HighlightLine text="ONE PLATFORM." color={THEME.primaryLight} textColor={THEME.textPrimary} />
            </div>
          </div>
        </div>

        {/* Tool stack — only place with multi-color (dots) */}
        <ToolStack />

        {/* Pain points — plain text, no cards */}
        <div className="grid grid-cols-1 gap-7 border-t border-zinc-200/90 pt-7 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-6">
          {PAINS.map((p) => (
            <div key={p.title}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600" style={{ fontFamily: THEME.fontMono }}>
                  {p.title}
                </span>
                <span className="text-[22px] font-bold tabular-nums text-zinc-800 sm:text-[24px]" style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.04em' }}>
                  {p.stat}
                </span>
              </div>
              <p className="mt-2.5 text-[14px] leading-[1.55] text-zinc-700" style={{ fontFamily: THEME.fontSans }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p className="text-[14px] leading-[1.55] text-zinc-700" style={{ fontFamily: THEME.fontSans }}>
          <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600" style={{ fontFamily: THEME.fontMono }}>
            The result
          </span>
          Coaches are <strong className="font-medium text-zinc-900">flying blind</strong>. Athletes <strong className="font-medium text-zinc-900">slip through cracks</strong>.
          Nobody sees the full picture.
        </p>

        <footer className="shrink-0 border-t border-zinc-200/90 pt-3 pr-28 sm:pr-36">
          <p
            className="max-w-[58ch] text-[15px] leading-[1.5] italic text-balance text-zinc-600"
            style={{ fontFamily: THEME.fontSerif }}
          >
            &ldquo;Half the data is lost before the team gets back to the boathouse.&rdquo;
          </p>
        </footer>
      </div>
    </div>
  )
}

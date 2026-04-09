import type { ReactNode } from 'react'
import { DashedRule } from '../components/DashedRule'
import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

/* ── Illustrations (inline SVG, theme colors only) ── */

function IllustrationSheets() {
  const g = THEME.primary
  const gl = THEME.primaryLight
  const line = THEME.border
  return (
    <svg viewBox="0 0 160 72" className="w-full h-[72px] shrink-0 min-h-[72px] block" aria-hidden>
      <rect x="8" y="10" width="144" height="52" rx="6" fill="#FAFAF9" stroke={line} strokeWidth="1.5" />
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={`h${i}`} x1="24" y1={18 + i * 10} x2="136" y2={18 + i * 10} stroke={line} strokeWidth="1" opacity={0.55} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <line key={`v${i}`} x1={36 + i * 28} y1="18" x2={36 + i * 28} y2="58" stroke={line} strokeWidth="1" opacity={0.45} />
      ))}
      <rect x="64" y="28" width="24" height="10" rx="2" fill={gl} opacity={0.95} />
      <rect x="92" y="38" width="28" height="10" rx="2" fill={g} opacity={0.35} />
      <circle cx="148" cy="16" r="5" fill={g} opacity={0.9} />
      <path d="M146 16l2 2 4-4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function IllustrationExtension() {
  const line = THEME.border
  const c = THEME.cyan
  const d = THEME.blue
  return (
    <svg viewBox="0 0 160 72" className="w-full h-[72px] shrink-0 min-h-[72px] block" aria-hidden>
      <rect x="10" y="12" width="140" height="48" rx="6" fill="#FAFAF9" stroke={line} strokeWidth="1.5" />
      <rect x="10" y="12" width="140" height="14" rx="6" fill={THEME.darkDeep} opacity={0.92} />
      <circle cx="22" cy="19" r="2.5" fill="#71717A" />
      <circle cx="32" cy="19" r="2.5" fill="#71717A" />
      <circle cx="42" cy="19" r="2.5" fill="#71717A" />
      <rect x="22" y="34" width="56" height="6" rx="1" fill={line} opacity={0.5} />
      <rect x="22" y="44" width="44" height="6" rx="1" fill={line} opacity={0.35} />
      <rect x="22" y="54" width="50" height="6" rx="1" fill={line} opacity={0.35} />
      <rect x="90" y="32" width="48" height="30" rx="4" fill={`${c}18`} stroke={c} strokeWidth="1.2" />
      <path d="M98 44h32M98 50h22" stroke={c} strokeWidth="1.2" opacity={0.7} strokeLinecap="round" />
      <circle cx="126" cy="22" r="10" fill={`${d}22`} stroke={d} strokeWidth="1.4" />
      <path d="M122 22h8M126 18v8" stroke={d} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function IllustrationUpload() {
  const line = THEME.border
  const a = THEME.amber
  const p = THEME.purple
  return (
    <svg viewBox="0 0 160 72" className="w-full h-[72px] shrink-0 min-h-[72px] block" aria-hidden>
      <rect x="38" y="38" width="72" height="26" rx="4" fill="#fff" stroke={line} strokeWidth="1.3" />
      <rect x="32" y="30" width="72" height="26" rx="4" fill="#FAFAF9" stroke={line} strokeWidth="1.3" />
      <rect x="26" y="22" width="72" height="26" rx="4" fill="#fff" stroke={p} strokeWidth="1.4" opacity={0.85} />
      <path d="M38 32h48M38 38h36M38 44h42" stroke={line} strokeWidth="1" opacity={0.55} strokeLinecap="round" />
      <path d="M78 8v14M72 14l6-6 6 6" stroke={a} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="120" cy="48" r="12" fill={`${a}24`} stroke={a} strokeWidth="1.3" />
      <path d="M116 48h8M120 44v8" stroke={a} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function ConnectorCard({
  num,
  title,
  subtitle,
  illustration,
  points,
  accentBar,
}: {
  num: string
  title: string
  subtitle: string
  illustration: ReactNode
  points: string[]
  accentBar: string
}) {
  return (
    <div
      className="rounded-2xl border flex flex-col min-h-0 overflow-hidden h-full"
      style={{
        borderColor: THEME.border,
        background: '#ffffff',
        boxShadow: '0 14px 36px rgba(0,0,0,0.07)',
      }}
    >
      <div
        className="relative px-3 pt-3 pb-2 shrink-0"
        style={{ background: `linear-gradient(180deg, ${THEME.light} 0%, #fff 100%)` }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl" style={{ background: accentBar }} />
        {illustration}
      </div>
      <div className="px-4 pb-4 pt-1 flex flex-col flex-1 min-h-0">
        <div
          className="text-[11px] tracking-[0.14em] uppercase font-semibold"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          {num}
        </div>
        <div className="mt-1 text-[19px] font-bold leading-[1.1]" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
          {title}
        </div>
        <div className="mt-1 text-[12px] font-medium" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          {subtitle}
        </div>
        <ul className="mt-3 space-y-2.5 flex-1">
          {points.map((line) => (
            <li key={line} className="flex gap-2.5 items-start">
              <span
                className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accentBar }}
                aria-hidden
              />
              <span className="text-[13px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function BulletPanel({
  title,
  items,
  variant,
}: {
  title: string
  items: string[]
  variant: 'nightly' | 'promise'
}) {
  const bar = variant === 'nightly' ? THEME.primary : THEME.cyan
  const bg = variant === 'nightly' ? `${THEME.primary}08` : `${THEME.cyan}08`
  return (
    <div className="rounded-2xl border p-4 h-full flex flex-col" style={{ borderColor: THEME.border, background: bg }}>
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-sm shrink-0" style={{ background: bar }} />
        <div className="text-[11px] tracking-[0.16em] uppercase font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
          {title}
        </div>
      </div>
      <ul className="mt-3 space-y-2.5 flex-1">
        {items.map((line) => (
          <li key={line} className="flex gap-2.5 items-start">
            <span className="text-[13px] font-mono font-bold leading-[1.45] shrink-0" style={{ color: bar }}>
              →
            </span>
            <span className="text-[13px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
              {line}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ConnectorJourney() {
  const steps: Array<{ k: string; label: string; desc: string; color: string }> = [
    { k: '1', label: 'Connect', desc: 'One-time OAuth or extension install', color: THEME.primary },
    { k: '2', label: 'Scrape', desc: 'Scheduled pulls in our cloud', color: THEME.cyan },
    { k: '3', label: 'Synthesize', desc: 'Normalize, join, flag risk', color: THEME.purple },
    { k: '4', label: 'Wake up', desc: 'Coach opens a fresh surface', color: THEME.amber },
  ]
  return (
    <div
      className="rounded-2xl border p-4 h-full min-h-0 flex flex-col overflow-hidden"
      style={{ borderColor: THEME.border, background: 'rgba(255,255,255,0.92)' }}
    >
      <div
        className="shrink-0 text-[11px] tracking-[0.16em] uppercase font-bold"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        How it feels
      </div>
      <div className="mt-3 flex flex-col gap-0 flex-1 min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:thin]">
        {steps.map((s, i) => (
          <div key={s.label} className="flex gap-3 shrink-0">
            <div className="flex flex-col items-center shrink-0 w-[22px]">
              <div
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[11px] font-bold"
                style={{ fontFamily: THEME.fontMono, background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}55` }}
              >
                {s.k}
              </div>
              {i < steps.length - 1 ? (
                <div className="w-px flex-1 min-h-[12px] my-0.5" style={{ background: `linear-gradient(180deg, ${s.color}66, ${steps[i + 1].color}66)` }} />
              ) : null}
            </div>
            <div className="pb-3 min-w-0 flex-1">
              <div className="text-[13px] font-bold uppercase tracking-wide" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                {s.label}
              </div>
              <div className="mt-0.5 text-[13px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {s.desc}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SourcesRail() {
  const rows: Array<{ name: string; detail: string; color: string }> = [
    { name: 'Sheets', detail: 'Ergs, pieces, attendance tabs', color: THEME.accent },
    { name: 'Bridge', detail: 'Strength, AMRAP, readiness', color: THEME.blue },
    { name: 'TeamWorks', detail: 'Practice, travel, rooms', color: THEME.cyan },
    { name: 'Whoop', detail: 'Sleep, strain, recovery', color: THEME.purple },
    { name: 'Inbox', detail: 'Optional alerts · PHI off by default', color: THEME.amber },
  ]
  return (
    <div className="rounded-2xl border p-4" style={{ borderColor: THEME.border, background: THEME.white, boxShadow: `0 1px 0 ${THEME.border}` }}>
      <div className="text-[11px] tracking-[0.16em] uppercase font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        First-class sources
      </div>
      <ul className="mt-3 space-y-2.5">
        {rows.map((r) => (
          <li key={r.name} className="flex gap-2 items-start">
            <span className="mt-0.5 h-[10px] w-[3px] rounded-full shrink-0" style={{ background: r.color }} />
            <div>
              <div className="text-[13px] font-semibold" style={{ fontFamily: THEME.fontMono, color: r.color }}>
                {r.name}
              </div>
              <div className="text-[12px] leading-snug mt-0.5" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                {r.detail}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function S04_Connectors() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '40px 40px 28px', color: THEME.textPrimary }}>
      <TopNav section="03 · CONNECTORS" page="4 / 13" tone="light" />
      <PaperTexture strength={0.75} tint="rgba(244, 243, 236, 0.95)" />

      <SectionLabel text="03 · CONNECTORS" />

      <div
        className="mt-1 text-[36px] leading-[1.05] font-bold"
        style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.05em' }}
      >
        Connect once. It updates forever.
      </div>
      <p className="mt-6 max-w-[960px] text-[14px] leading-[1.45]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
        Reach into Sheets, Bridge, TeamWorks, Whoop, and the tools staff already use · no re-keying, no laptop left on overnight. One OAuth or extension;
        ingestion and the morning roster run in the cloud.
      </p>
      <div className="mt-6">
        <DashedRule />
      </div>

      <div className="mt-5 flex-1 min-h-0 flex gap-5">
        <div className="flex-1 min-h-0 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-4 min-h-0 flex-1" style={{ minHeight: 0 }}>
            <ConnectorCard
              num="01"
              title="Google Sheets"
              subtitle="OAuth · Drive · live tabs"
              accentBar={THEME.primary}
              illustration={<IllustrationSheets />}
              points={[
                'Authorize once; synth watches the folders you pick.',
                'Tabs matched by headers · add rows without breaking the pipe.',
                'Diff-based reads: stale sources get a badge, not silent freezes.',
              ]}
            />
            <ConnectorCard
              num="02"
              title="Chrome extension"
              subtitle="DOM · allowlisted apps"
              accentBar={THEME.cyan}
              illustration={<IllustrationExtension />}
              points={[
                'Snapshot Bridge / TeamWorks tables; replay pulls in the cloud.',
                'Per-domain rules: what to scrape, how often, what to skip.',
                'Rate limits + backoff · polite automation, not brute force.',
              ]}
            />
            <ConnectorCard
              num="03"
              title="Uploads & exports"
              subtitle="CSV · XLSX · images"
              accentBar={THEME.amber}
              illustration={<IllustrationUpload />}
              points={[
                'Drop files or forward mail · parse what we can, attach the rest.',
                'Low-confidence fields surface for quick review.',
                'The bridge until every workflow lives behind a clean API.',
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 shrink-0">
            <BulletPanel
              variant="nightly"
              title="What runs every night"
              items={[
                'Refresh OAuth tokens, then per-source queues with retries.',
                'Schema maps versioned · rollback if a vendor changes columns.',
                'Join roster + wearables + load; synthesis writes the brief.',
              ]}
            />
            <BulletPanel
              variant="promise"
              title="What we won’t do"
              items={[
                'No selling health data · ingestion stays in your workspace.',
                'No surprise scopes: folders and domains are explicit.',
                'No silent deletes · missing data is marked stale first.',
              ]}
            />
          </div>
        </div>

        <div className="w-[292px] shrink-0 flex flex-col gap-3 min-h-0">
          <div className="flex-1 min-h-0">
            <ConnectorJourney />
          </div>
          <div className="shrink-0">
            <SourcesRail />
          </div>
        </div>
      </div>

      <div
        className="mt-3 grid grid-cols-[1fr_auto] gap-5 items-start rounded-2xl border px-5 py-4 shrink-0"
        style={{ borderColor: THEME.border, background: '#fff', boxShadow: '0 10px 28px rgba(0,0,0,0.05)' }}
      >
        <div>
          <div className="text-[11px] tracking-[0.16em] uppercase font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            The schedule
          </div>
          <p className="mt-1.5 text-[17px] font-bold leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
            “Update all sources every day at 6:00 AM Pacific.”
          </p>
          <p className="mt-2 text-[13px] leading-[1.5]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
            Cron runs in our VPC · credentials, pulls, validation, synthesis, notifications. If a vendor blips, we retry with jitter so you still get a full
            table; a few minutes late beats half-empty.
          </p>
        </div>
        <div className="text-right space-y-2 pt-0.5">
          <div className="inline-block rounded-lg px-3 py-2" style={{ background: `${THEME.primary}12`, border: `1px solid ${THEME.primary}35` }}>
            <div className="text-[11px] font-bold tracking-[0.12em]" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
              DAILY · CLOUD · IDEMPOTENT
            </div>
            <div className="mt-1 text-[12px] leading-tight" style={{ fontFamily: THEME.fontMono, color: THEME.textSecondary }}>
              Brief ready before 7:00 AM
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { useMemo } from 'react'

import { THEME } from '../lib/theme'
import { useDeckPresenceDashboard } from '../lib/analytics/useDeckPresence'

function formatAgo(ts: number): string {
  const s = Math.max(0, Math.round((Date.now() - ts) / 1000))
  if (s < 60) return `${s}s ago`
  const m = Math.floor(s / 60)
  return `${m}m ago`
}

export function LiveAnalyticsDebug() {
  const { viewers, connected, error } = useDeckPresenceDashboard()

  const sorted = useMemo(
    () => [...viewers].sort((a, b) => b.lastSeen - a.lastSeen || a.viewerLabel.localeCompare(b.viewerLabel)),
    [viewers],
  )

  return (
    <div
      className="min-h-screen w-full overflow-auto p-8"
      style={{ background: THEME.darkDeep, color: THEME.white, fontFamily: THEME.fontSans }}
    >
      <header className="mb-8 max-w-4xl">
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50" style={{ fontFamily: THEME.fontMono }}>
          Dev only · localhost
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.04em]" style={{ fontFamily: THEME.fontMono }}>
          Live deck presence
        </h1>
        <p className="mt-2 text-sm text-white/70">
          Open the deck in another tab with <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs">?viewer=Name</code>.
          Rows update via Supabase Realtime Presence.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs" style={{ fontFamily: THEME.fontMono }}>
          <span
            className="rounded-full border px-3 py-1"
            style={{
              borderColor: connected ? `${THEME.accent}88` : 'rgba(255,255,255,0.2)',
              color: connected ? THEME.accent : 'rgba(255,255,255,0.6)',
            }}
          >
            {connected ? 'Realtime connected' : 'Connecting…'}
          </span>
          <span className="text-white/45">
            Viewers online: <span className="text-white">{sorted.length}</span>
          </span>
        </div>
        {error ? (
          <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>
        ) : null}
      </header>

      <div className="overflow-hidden rounded-xl border" style={{ borderColor: 'rgba(255,255,255,0.12)', maxWidth: '1100px' }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.06)', fontFamily: THEME.fontMono }} className="text-[11px] uppercase tracking-wider text-white/55">
              <th className="px-4 py-3">Viewer</th>
              <th className="px-4 py-3">Deck</th>
              <th className="px-4 py-3">Slide</th>
              <th className="px-4 py-3">Section</th>
              <th className="px-4 py-3">Page</th>
              <th className="px-4 py-3">Last seen</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-white/50">
                  No viewers in presence. Open the pitch deck (with env vars set) in another tab.
                </td>
              </tr>
            ) : (
              sorted.map((v) => (
                <tr key={v.sessionId} className="border-t border-white/10" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <td className="px-4 py-3 font-semibold text-white" style={{ fontFamily: THEME.fontMono }}>
                    {v.viewerLabel}
                  </td>
                  <td className="px-4 py-3 text-white/75">{v.deckMode}</td>
                  <td className="px-4 py-3 text-white/85">
                    <span className="text-white/50">{v.slideId}</span>
                    <span className="text-white/35"> · idx {v.slideIndex}</span>
                  </td>
                  <td className="px-4 py-3 text-white/70">{v.section}</td>
                  <td className="px-4 py-3 text-white/70">{v.pageLabel}</td>
                  <td className="px-4 py-3 text-white/55" style={{ fontFamily: THEME.fontMono }}>
                    {formatAgo(v.lastSeen)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

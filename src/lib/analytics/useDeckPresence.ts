import { useEffect, useRef, useState } from 'react'
import type { RealtimeChannel } from '@supabase/supabase-js'

import { getSupabaseClient } from './supabaseClient'

/** Single Supabase Realtime Presence room for all deck viewers. */
export const DECK_PRESENCE_CHANNEL = 'presence:synth-deck'

const SESSION_STORAGE_KEY = 'synth-deck-analytics-session'

export type DeckMode = 'main' | 'appendix'

export type DeckPresenceRole = 'viewer' | 'dashboard'

export type DeckPresencePayload = {
  role: DeckPresenceRole
  viewerLabel: string
  sessionId: string
  deckMode: DeckMode
  slideId: string
  slideIndex: number
  slideCount: number
  section: string
  pageLabel: string
  lastSeen: number
}

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_STORAGE_KEY)
    if (!id) {
      id = crypto.randomUUID()
      localStorage.setItem(SESSION_STORAGE_KEY, id)
    }
    return id
  } catch {
    return `sess_${Math.random().toString(36).slice(2)}`
  }
}

function getViewerLabel(): string {
  try {
    const v = new URLSearchParams(window.location.search).get('viewer')
    const t = v?.trim()
    return t && t.length > 0 ? t : 'anonymous'
  } catch {
    return 'anonymous'
  }
}

function buildViewerPayload(args: {
  deckMode: DeckMode
  slideId: string
  slideIndex: number
  slideCount: number
  section: string
  sessionId: string
}): DeckPresencePayload {
  return {
    role: 'viewer',
    viewerLabel: getViewerLabel(),
    sessionId: args.sessionId,
    deckMode: args.deckMode,
    slideId: args.slideId,
    slideIndex: args.slideIndex,
    slideCount: args.slideCount,
    section: args.section,
    pageLabel: `${args.slideIndex + 1} / ${args.slideCount}`,
    lastSeen: Date.now(),
  }
}

function isDeckPresencePayload(v: unknown): v is DeckPresencePayload {
  if (!v || typeof v !== 'object') return false
  const o = v as Record<string, unknown>
  return (
    o.role === 'viewer' &&
    typeof o.viewerLabel === 'string' &&
    typeof o.sessionId === 'string' &&
    (o.deckMode === 'main' || o.deckMode === 'appendix') &&
    typeof o.slideId === 'string' &&
    typeof o.slideIndex === 'number' &&
    typeof o.slideCount === 'number' &&
    typeof o.section === 'string' &&
    typeof o.pageLabel === 'string' &&
    typeof o.lastSeen === 'number'
  )
}

/** Flatten Supabase `presenceState()` into validated viewer rows (excludes dashboard observers). */
export function flattenViewerPresences(state: Record<string, unknown[]>): DeckPresencePayload[] {
  const out: DeckPresencePayload[] = []
  for (const metas of Object.values(state)) {
    if (!Array.isArray(metas)) continue
    for (const m of metas) {
      if (isDeckPresencePayload(m) && m.role === 'viewer') out.push(m)
    }
  }
  return out
}

export type UseDeckPresenceTrackArgs = {
  deckMode: DeckMode
  slideId: string
  slideIndex: number
  slideCount: number
  section: string
}

/**
 * Joins Realtime Presence and keeps payload in sync with the current slide.
 * No-ops when Supabase env is not configured.
 */
export function useDeckPresenceTrack(args: UseDeckPresenceTrackArgs): void {
  const channelRef = useRef<RealtimeChannel | null>(null)
  const subscribedRef = useRef(false)
  const sessionIdRef = useRef<string>('')
  const argsRef = useRef(args)
  argsRef.current = args

  useEffect(() => {
    const client = getSupabaseClient()
    if (!client) return

    sessionIdRef.current = getSessionId()
    subscribedRef.current = false

    const channel = client.channel(DECK_PRESENCE_CHANNEL, {
      config: { presence: { key: sessionIdRef.current } },
    })
    channelRef.current = channel

    channel.subscribe(async (status) => {
      if (status !== 'SUBSCRIBED') return
      subscribedRef.current = true
      const a = argsRef.current
      await channel.track(
        buildViewerPayload({
          deckMode: a.deckMode,
          slideId: a.slideId,
          slideIndex: a.slideIndex,
          slideCount: a.slideCount,
          section: a.section,
          sessionId: sessionIdRef.current,
        }),
      )
    })

    return () => {
      subscribedRef.current = false
      channelRef.current = null
      void channel.unsubscribe()
    }
    // Re-bind channel if deck mode changes (main vs appendix deck shell).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- slide fields tracked in the effect below
  }, [args.deckMode])

  useEffect(() => {
    const ch = channelRef.current
    if (!ch || !subscribedRef.current) return

    void ch.track(
      buildViewerPayload({
        deckMode: args.deckMode,
        slideId: args.slideId,
        slideIndex: args.slideIndex,
        slideCount: args.slideCount,
        section: args.section,
        sessionId: sessionIdRef.current || getSessionId(),
      }),
    )
  }, [args.deckMode, args.slideId, args.slideIndex, args.slideCount, args.section])
}

export type UseDeckPresenceDashboardResult = {
  viewers: DeckPresencePayload[]
  connected: boolean
  error: string | null
}

/**
 * Subscribe-only presence observer for the localhost analytics dashboard.
 */
export function useDeckPresenceDashboard(): UseDeckPresenceDashboardResult {
  const [viewers, setViewers] = useState<DeckPresencePayload[]>([])
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const client = getSupabaseClient()
    if (!client) {
      setError('Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY')
      setConnected(false)
      return
    }

    setError(null)
    const dashboardKey = `dashboard-${crypto.randomUUID()}`
    const channel = client.channel(DECK_PRESENCE_CHANNEL, {
      config: { presence: { key: dashboardKey } },
    })

    const sync = () => {
      const state = channel.presenceState() as Record<string, unknown[]>
      setViewers(flattenViewerPresences(state))
    }

    channel.on('presence', { event: 'sync' }, sync)
    channel.on('presence', { event: 'join' }, sync)
    channel.on('presence', { event: 'leave' }, sync)

    channel.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        setConnected(true)
        await channel.track({
          role: 'dashboard',
          viewerLabel: 'dashboard',
          sessionId: dashboardKey,
          deckMode: 'main',
          slideId: '',
          slideIndex: -1,
          slideCount: 0,
          section: '',
          pageLabel: '',
          lastSeen: Date.now(),
        })
        sync()
      } else if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
        setConnected(false)
      }
    })

    return () => {
      setConnected(false)
      void channel.unsubscribe()
    }
  }, [])

  return { viewers, connected, error }
}

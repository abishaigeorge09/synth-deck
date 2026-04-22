import type { DeckMode } from '../lib/analytics/useDeckPresence'
import { useDeckPresenceTrack } from '../lib/analytics/useDeckPresence'

/**
 * Invisible bridge: publishes slide position to Supabase Realtime Presence when configured.
 */
export function DeckPresenceBridge({
  deckMode,
  slideId,
  slideIndex,
  slideCount,
  section,
}: {
  deckMode: DeckMode
  slideId: string
  slideIndex: number
  slideCount: number
  section: string
}) {
  useDeckPresenceTrack({ deckMode, slideId, slideIndex, slideCount, section })
  return null
}

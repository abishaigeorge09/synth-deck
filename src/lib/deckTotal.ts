/**
 * Slide totals for the VC-presentation deck.
 *
 * Main flow has 15 entries (14 content slides per the VC structure + ThankYou).
 * Adding the Title slide gives a primary-deck total of 16.
 * Appendix tail has 14 entries (Cover + Index + 12 content placeholders/slides).
 */

/** Total slides in the primary deck (title + main + appendix tail). */
export const DECK_SLIDE_TOTAL = 30

/** Main story slides (title + main flow through Thank You) — used for page counters. */
export const MAIN_DECK_SLIDE_TOTAL = 16

/** Appendix slides appended after Thank You in the primary deck (cover + index + content). */
export const APPENDIX_MAIN_TOTAL = 17

/** Draft / appendix deck (`#appendix`) — `AppendixDeck.tsx`. */
export const APPENDIX_SLIDE_TOTAL = 9

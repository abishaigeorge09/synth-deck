/**
 * Slide totals for the VC-presentation deck.
 *
 * Main flow has 16 entries (15 content slides + ThankYou).
 * Adding the Title slide gives a primary-deck total of 17.
 * Appendix tail has 13 entries (Index + 12 content slides; A5 is split into two parts).
 */

/** Total slides in the primary deck (title + main + appendix tail). */
export const DECK_SLIDE_TOTAL = 30

/** Main story slides (title + main flow through Thank You) — used for page counters. */
export const MAIN_DECK_SLIDE_TOTAL = 17

/** Appendix slides appended after Thank You in the primary deck (index + content). */
export const APPENDIX_MAIN_TOTAL = 13

/** Draft / appendix deck (`#appendix`) — `AppendixDeck.tsx`. */
export const APPENDIX_SLIDE_TOTAL = 9

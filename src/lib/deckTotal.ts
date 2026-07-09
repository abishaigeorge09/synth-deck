/**
 * Slide totals for the VC-presentation deck.
 *
 * Main flow has 17 entries (15 content slides + ThankYou + OnePager overview).
 * Adding the Title slide gives a primary-deck total of 18.
 * Appendix tail has 13 entries (Index + 12 content slides; A5 is split into two parts).
 */

/** Total slides in the primary deck (title + main + appendix tail). */
export const DECK_SLIDE_TOTAL = 36

/** Main story slides (title + main flow through OnePager) — used for page counters. */
export const MAIN_DECK_SLIDE_TOTAL = 20

/** Appendix slides appended after Thank You in the primary deck (index + content). */
export const APPENDIX_MAIN_TOTAL = 16

/** Draft / appendix deck (`#appendix`) — `AppendixDeck.tsx`. */
export const APPENDIX_SLIDE_TOTAL = 9

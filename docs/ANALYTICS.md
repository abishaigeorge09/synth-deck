# Realtime deck analytics (presence)

Optional **live presence** for the pitch deck: see who is viewing (via named links) and which slide they are on. Powered by **Supabase Realtime Presence** — no custom API server.

## Setup

1. Create a Supabase project and enable **Realtime** (default on most projects).
2. In the repo root, create `.env.local`:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

3. Restart `npm run dev` so Vite picks up env vars.

## Named viewer links

Add a `viewer` query parameter (URL-encoded if needed):

```text
https://synth-deck.vercel.app/?viewer=Sequoia
http://localhost:<vite-port>/?viewer=Angel%20Investor
```

Use the **Local** URL printed by `npm run dev` (often `5173`, or `5174` if `5173` is already in use).

Each browser tab gets a stable anonymous `sessionId` in `localStorage` under `synth-deck-analytics-session`. The **label** comes only from `viewer`.

## Live dashboard (dev only)

On your machine, with dev server running:

```text
http://localhost:<vite-port>/#analytics
```

Production / non-localhost URLs show a short message instead — the dashboard is intentionally **not** exposed publicly.

## What gets sent

While the deck is open, the app joins channel `presence:synth-deck` and periodically updates:

- `viewerLabel`, `sessionId`, `deckMode` (`main` | `appendix`)
- `slideId`, `slideIndex`, `slideCount`, `section`, `pageLabel`, `lastSeen`

If env vars are missing, the deck behaves exactly as before (no network calls).

## Security note

The anon key is public (standard for Supabase + RLS). Presence payloads are visible to anyone who can join the same channel. **Do not put PII in `viewer` strings** beyond what you’d put in an email.

## Future: historical analytics

Presence shows **who is online now**. For opens, dwell time, and funnels, add a Postgres table + RLS and insert events from the client or a small Edge Function.

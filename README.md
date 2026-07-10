# synth. — Pitch Deck

Full-screen presentation (React 18, TypeScript, Vite 5, Tailwind, Framer Motion). Several decks ship behind one build, selected by URL hash.

## Links

- **Repository:** [github.com/abishaigeorge09/synth-deck](https://github.com/abishaigeorge09/synth-deck)
- **Production:** [synth-deck.vercel.app](https://synth-deck.vercel.app)

## Routes

| URL | Deck |
|---|---|
| `/` | Main pitch deck (full VC deck + appendix tail) |
| `/#spd` | Simple Pitch Deck — 10-slide main + grouped, clickable appendix |
| `/#appendix` | Draft / backup appendix deck |
| `/#legacy` | Old design reference (passcode `synthrowiq`) |
| `/#analytics` | Viewer dashboard (local dev only) |
| `/#oldpdf` | Archived pre-restructure deck (redirect) |

Deck passcode: `98962005`.

## Scripts

```bash
npm install
npm run dev    # local dev (vite, :5173)
npm run build  # tsc -b && vite build → dist/
```

Pushes to `main` trigger Vercel production builds (GitHub integration).

## Where things live

- **Main deck order:** `src/deck/slideRegistry.tsx`
- **Simple Pitch Deck (`/#spd`):** `src/spd/SimplePitchDeck.tsx` — edit the `MAIN` / `APPENDIX` arrays; numbering, page counters, index, and jump-nav all derive from array order
- **Routing:** `src/App.tsx`
- **Brand tokens:** `src/lib/theme.ts` · **icons/mascot:** `public/brand/`

See `CLAUDE.md` for full architecture and conventions.

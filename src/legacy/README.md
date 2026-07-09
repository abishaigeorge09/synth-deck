# Legacy deck — frozen snapshot

This directory is a **verbatim snapshot** of the original synth pitch deck as it existed at commit `7695a1b` ("Add Vercel config for static SPA deploy", 2026-04-09), which is the source of the Vercel deployment:

https://synth-deck-pjwpppypq-abishaigeorge09s-projects.vercel.app/

## Why it's here

Kept as a **design reference** — the user likes the layouts and illustrations from this version. Browse it locally at `/#legacy` and pull patterns/treatments forward into the current VC deck.

## Rules

- **Do not edit files in this directory.** Treat as read-only. If you find yourself wanting to change something here, the right move is either (a) update the current VC slide that mirrors it, or (b) re-snapshot this from a newer commit.
- This deck has its own copies of `components/`, `lib/`, `slides/` and does **not** share code with the live deck — that is intentional. The point is a frozen reference, not a live mirror.
- The entry point is `App.tsx` (default export). Mounted in the main `src/App.tsx` under the `#legacy` hash route.

## What's NOT in this snapshot

This commit (`7695a1b`) **predates** the Deploy-agent processing animation (`DeployAgentProcessingSlide.tsx`), which first appeared in `0ef4ba1` on 2026-04-14. If you need that animation as a reference, look at `src/slides/DeployAgentProcessingSlide.tsx` and `src/slides/SolutionFlowSlides.tsx` in the current branch — those are still on the live deck.

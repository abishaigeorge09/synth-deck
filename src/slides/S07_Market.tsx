import { IllustMarketRings } from '../components/simpleIllustrations'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const mono = { fontFamily: THEME.fontMono } as const
const sans = { fontFamily: THEME.fontSans } as const

export function S07_Market() {
  return (
    <div
      className="absolute inset-0 flex flex-col text-white"
      style={{ background: THEME.darkDeep, padding: 'clamp(28px, 4vw, 48px) clamp(24px, 4vw, 56px) clamp(24px, 4vw, 40px)' }}
    >
      <TopNav section="06 · MARKET" page="7 / 13" />

      <div className="mt-1 flex min-h-0 flex-1 flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
        <div
          className="flex shrink-0 justify-center rounded-2xl border px-4 py-5 lg:sticky lg:top-0 lg:max-w-[min(100%,280px)] lg:self-start"
          style={{ borderColor: 'rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)' }}
        >
          <IllustMarketRings />
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1 [scrollbar-width:thin] lg:max-h-full">
          <h1
            className="text-[clamp(24px,3.8vw,38px)] font-bold leading-[1.08] tracking-[-0.04em]"
            style={{ ...mono }}
          >
            Start with rowing. Scale to every sport.
          </h1>

          <div className="space-y-3 text-[11px] leading-[1.5] text-white/70" style={sans}>
            <p>
              <span className="font-semibold text-white/90" style={mono}>
                TAM · $4.2B+
              </span>{' '}
              — Global spend on fragmented performance, compliance, and ops stacks across college and club programs. Huge surface; we only need a thin slice
              to build a real company — then expand the ring.
            </p>
            <p>
              <span className="font-semibold text-white/90" style={mono}>
                SAM · $890M
              </span>{' '}
              — US collegiate athletics: 12K+ programs already paying for multiple disconnected tools (scheduling, S&amp;C, wearables, spreadsheets-as-database).
              That&apos;s who we serve as we go multi-sport and multi-workflow.
            </p>
            <p>
              <span className="font-semibold text-emerald-300/95" style={mono}>
                SOM · $24M
              </span>{' '}
              — US collegiate rowing as the first wedge: ~85 programs, acute tool sprawl, no one product that connects it all — realistic ACV × programs we can
              land in the first chapters before we fork the engine sport-by-sport.
            </p>
          </div>

          <div className="border-t border-white/10 pt-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40" style={mono}>
              Who we target
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[11px] leading-[1.45] text-white/72" style={sans}>
              <li>Head coaches, associate HCs, and directors of rowing (D1, D3, competitive clubs).</li>
              <li>Ops and S&amp;C staff who own the real workflows: TeamWorks, Sheets, Bridge, wearables — today that&apos;s 6–8 logins, zero synthesis.</li>
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-white/40" style={mono}>
              How we reach them
            </p>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-[11px] leading-[1.45] text-white/72" style={sans}>
              <li>
                <strong className="text-white/85">Pilot wedge:</strong> warm intros through our rowing network (Cal, coaching trees, conference staff), ship synth
                agent + extension on their actual stacks — prove hours back before a broad rollout.
              </li>
              <li>
                <strong className="text-white/85">Expand:</strong> boat-room → full program → case study → adjacent water and endurance sports → repeatable NCAA
                motion with the same synthesis engine.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

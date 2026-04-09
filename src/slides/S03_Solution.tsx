import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { PaperTexture } from '../components/PaperTexture'
import { SectionLabel } from '../components/SectionLabel'
import { DashedRule } from '../components/DashedRule'
import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const DEPLOY_PIPELINE_STEPS = [
  'Deploy synth agent',
  'Extract DOM of each tool',
  'Customise data visualisation',
  'Schedule extraction frequency',
  'Synth data',
] as const

type DeployPhase = 'idle' | 'splash' | 'steps' | 'buffering' | 'finished'

function DeployRocketGlyph({ size = 28 }: { size?: number }) {
  const c = THEME.primary
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path
        d="M16 4 L22 14 L20 18 L20 24 L18 26 L14 26 L12 24 L12 18 L10 14 Z"
        fill={c}
        opacity={0.95}
      />
      <path d="M12 24 L10 28 L14 26 M20 24 L22 28 L18 26" fill={THEME.accent} opacity={0.9} />
      <circle cx="16" cy="12" r="2" fill="#fff" opacity={0.9} />
      <path d="M14 20 L16 22 L18 20" stroke={THEME.primaryLight} strokeWidth={1.2} fill="none" strokeLinecap="round" />
    </svg>
  )
}

/* ── Portal / Dashboard mockup ── */

function PortalMockup({ compact = false, prominent = false }: { compact?: boolean; prominent?: boolean }) {
  const [deployPhase, setDeployPhase] = useState<DeployPhase>('idle')
  const [deployStep, setDeployStep] = useState(0)

  const athletes = [
    { name: 'Matthew', pos: '1V Port', erg: '6:12.4', split: '1:32.6', squat: '315 lb', load: 'High', risk: true, sleep: '6.1h', comply: '94%' },
    { name: 'Lily', pos: '1V Stroke', erg: '6:18.1', split: '1:34.2', squat: '285 lb', load: 'Med', risk: false, sleep: '7.8h', comply: '100%' },
    { name: 'Star', pos: '1V 3-seat', erg: '6:21.7', split: '1:35.0', squat: '295 lb', load: 'Low', risk: false, sleep: '8.2h', comply: '97%' },
    { name: 'D. Torres', pos: '2V Bow', erg: '6:29.3', split: '1:37.1', squat: '260 lb', load: 'High', risk: true, sleep: '5.4h', comply: '88%' },
  ]

  const p = prominent && !compact

  /** Viewport fits thead + ~3 body rows; scroll to see more (e.g. 4th athlete) */
  const teamTableMaxH = compact ? '5.625rem' : p ? '6.375rem' : '6rem'

  const chromePad = compact ? 'px-2 py-1.5' : p ? 'px-3 py-2.5' : 'px-3 py-2'
  const urlText = compact ? 'text-[7px]' : p ? 'text-[9px]' : 'text-[8px]'
  const sideW = compact ? 'w-[64px]' : p ? 'w-[100px]' : 'w-[80px]'
  const sidePad = compact ? 'py-1.5 px-1.5 gap-1' : p ? 'py-2 px-2 gap-1.5' : 'py-1.5 px-1.5 gap-1'
  const navActive = compact ? 'text-[6px]' : p ? 'text-[8px]' : 'text-[7px]'
  const navInert = compact ? 'text-[6px]' : p ? 'text-[8px]' : 'text-[7px]'
  const mainPad = compact ? 'p-2' : p ? 'p-3' : 'p-2.5'
  const titleSz = compact ? 'text-[9px]' : p ? 'text-[12px]' : 'text-[10px]'
  const subSz = compact ? 'text-[6px]' : p ? 'text-[8px]' : 'text-[7px]'
  const badgeTxt = compact ? 'text-[5px]' : p ? 'text-[7px]' : 'text-[6px]'
  const tbl = compact ? 7 : p ? 9 : 8
  const thSz = compact ? 6 : p ? 7 : 7
  const cellPad = compact ? 'px-1.5 py-1' : p ? 'px-1.5 py-0.5' : 'px-1.5 py-1'
  const cellMuted = compact ? 'text-[5px]' : p ? 'text-[7px]' : 'text-[6px]'
  const statTxt = compact ? 'text-[5px]' : p ? 'text-[7px]' : 'text-[6px]'
  const insightTitle = compact ? 'text-[6px]' : p ? 'text-[8px]' : 'text-[7px]'
  const insightBody = compact ? 'text-[7px]' : p ? 'text-[10px]' : 'text-[8px]'
  const iconBox = compact ? 'w-3 h-3' : p ? 'w-5 h-5' : 'w-4 h-4'
  const svgSz = compact ? 8 : p ? 12 : 10
  const insightPad = compact ? 'px-2 py-1.5' : p ? 'px-3 py-2.5' : 'px-2 py-1.5'
  const insightMt = compact ? 'mt-1.5' : p ? 'mt-2.5' : 'mt-1.5'

  useEffect(() => {
    if (deployPhase !== 'splash') return
    const t = window.setTimeout(() => setDeployPhase('steps'), 820)
    return () => window.clearTimeout(t)
  }, [deployPhase])

  useEffect(() => {
    if (deployPhase !== 'steps') return
    let tick = 0
    const id = window.setInterval(() => {
      tick += 1
      if (tick > 4) {
        window.clearInterval(id)
        setDeployPhase('buffering')
        return
      }
      setDeployStep(tick)
    }, 900)
    return () => window.clearInterval(id)
  }, [deployPhase])

  useEffect(() => {
    if (deployPhase !== 'buffering') return
    const t = window.setTimeout(() => setDeployPhase('finished'), 2600)
    return () => window.clearTimeout(t)
  }, [deployPhase])

  useEffect(() => {
    if (deployPhase !== 'finished') return
    const t = window.setTimeout(() => {
      setDeployPhase('idle')
      setDeployStep(0)
    }, 2200)
    return () => window.clearTimeout(t)
  }, [deployPhase])

  const startDeploy = () => {
    setDeployStep(0)
    setDeployPhase('splash')
  }

  return (
    <div className="relative rounded-lg overflow-hidden border h-full min-h-0 flex flex-col" style={{ borderColor: THEME.border, background: '#fff' }}>
      <div className={`${chromePad} flex items-center gap-2`} style={{ background: THEME.darkDeep }}>
        <div className="flex gap-1">
          <div className={`${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-red-400`} />
          <div className={`${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-yellow-400`} />
          <div className={`${compact ? 'w-1.5 h-1.5' : 'w-2 h-2'} rounded-full bg-green-400`} />
        </div>
        <div className={`flex-1 mx-2 rounded px-2 py-0.5 ${urlText} text-white/50`} style={{ background: 'rgba(255,255,255,0.08)', fontFamily: THEME.fontMono }}>
          app.synthsports.com/dashboard
        </div>
        <div className={`${urlText} text-white/40`} style={{ fontFamily: THEME.fontMono }}>Updated 6:00 AM</div>
      </div>

      <div className="flex flex-1 min-h-0">
        <div
          className={`${sideW} border-r flex flex-col h-full min-h-0 ${sidePad}`}
          style={{ borderColor: THEME.border, background: '#FAFAF9' }}
        >
          <div className={`flex items-center gap-1 ${p ? 'px-1.5 py-1' : 'px-1 py-0.5'} rounded`} style={{ background: `${THEME.primary}12` }}>
            <div className={`${p ? 'w-1.5 h-1.5' : 'w-1 h-1'} rounded-sm`} style={{ background: THEME.primary }} />
            <span className={`${navActive} font-semibold`} style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>Dashboard</span>
          </div>
          {['Lineups', 'Timing', 'Athletes', 'Sources', 'Settings'].map(item => (
            <div key={item} className={`flex items-center gap-1 ${p ? 'px-1.5 py-1' : 'px-1 py-0.5'}`}>
              <div className={`${p ? 'w-1.5 h-1.5' : 'w-1 h-1'} rounded-sm`} style={{ background: THEME.textMuted }} />
              <span className={navInert} style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>{item}</span>
            </div>
          ))}
          <div className="mt-auto pt-2 shrink-0 border-t" style={{ borderColor: THEME.border }}>
            <button
              type="button"
              className={`w-full flex flex-col items-center justify-center gap-1 rounded-lg border ${p ? 'px-1.5 py-2' : 'px-1 py-1.5'} ${deployPhase !== 'idle' ? 'opacity-60 pointer-events-none' : ''}`}
              style={{
                background: '#fff',
                borderColor: `${THEME.primary}35`,
                boxShadow: `0 1px 0 ${THEME.border}`,
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                e.preventDefault()
                if (deployPhase === 'idle') startDeploy()
              }}
            >
              <span
                className="leading-none"
                style={{
                  fontFamily: THEME.logoFont,
                  fontWeight: THEME.logoWeight,
                  fontSize: p ? 11 : 9,
                  color: THEME.textPrimary,
                }}
              >
                synth<span style={{ color: THEME.logoDotColor }}>.</span>
              </span>
              <span
                className={`${p ? 'text-[7px]' : 'text-[6px]'} font-bold tracking-[0.1em] uppercase`}
                style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
              >
                Deploy agent
              </span>
            </button>
          </div>
        </div>

        <div className={`flex-1 flex flex-col ${mainPad} min-h-0`}>
          <div className={`flex items-center justify-between ${p ? 'mb-2' : 'mb-1.5'}`}>
            <div>
              <div className={`${titleSz} font-bold`} style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>Team Overview</div>
              <div className={subSz} style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>Cal Men&apos;s 1V + 2V · 18 athletes connected</div>
            </div>
            <div className={`flex ${p ? 'gap-2' : 'gap-1'}`}>
              {[
                { label: 'Sources', val: '4', color: THEME.accent },
                { label: 'Syncing', val: 'Daily', color: THEME.cyan },
                { label: 'Alerts', val: '2', color: THEME.red },
              ].map(s => (
                <div key={s.label} className={`${p ? 'px-2 py-1' : 'px-1 py-0.5'} rounded`} style={{ background: `${s.color}10`, border: `1px solid ${s.color}25` }}>
                  <span className={badgeTxt} style={{ fontFamily: THEME.fontMono, color: s.color }}>{s.label}: {s.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded border overflow-y-auto overflow-x-auto overscroll-contain flex-1 min-h-0 shrink min-w-0"
            style={{ borderColor: THEME.border, maxHeight: teamTableMaxH }}
          >
            <table className="w-full text-left border-collapse" style={{ fontSize: tbl }}>
              <thead className="sticky top-0 z-[1]" style={{ background: '#F4F4F5', boxShadow: `0 1px 0 ${THEME.border}` }}>
                <tr>
                  {['Athlete', 'Erg 2K', 'Split', 'Squat', 'Load', 'Sleep', 'Comply', 'Status'].map(h => (
                    <th key={h} className={cellPad} style={{ fontFamily: THEME.fontMono, color: THEME.textMuted, fontSize: thSz, fontWeight: 600 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {athletes.map(a => (
                  <tr key={a.name} style={{ borderTop: `1px solid ${THEME.border}` }}>
                    <td className={`${cellPad} font-semibold align-top`} style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>{a.name}
                      <div className={`${cellMuted} font-normal`} style={{ color: THEME.textMuted }}>{a.pos}</div>
                    </td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>{a.erg}</td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>{a.split}</td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: THEME.blue }}>{a.squat}</td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: a.load === 'High' ? THEME.red : a.load === 'Med' ? THEME.amber : THEME.accent }}>{a.load}</td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: parseFloat(a.sleep) < 6.5 ? THEME.red : THEME.textSecondary }}>{a.sleep}</td>
                    <td className={`${cellPad} align-top`} style={{ fontFamily: THEME.fontMono, color: parseInt(a.comply) < 90 ? THEME.amber : THEME.accent }}>{a.comply}</td>
                    <td className={`${cellPad} align-top`}>
                      {a.risk ? (
                        <span className={`${statTxt} px-0.5 py-0.5 rounded font-bold`} style={{ background: `${THEME.red}15`, color: THEME.red, fontFamily: THEME.fontMono }}>AT RISK</span>
                      ) : (
                        <span className={statTxt} style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>OK</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={`${insightMt} rounded border ${insightPad} flex items-start gap-2`} style={{ borderColor: `${THEME.amber}30`, background: `${THEME.amber}06` }}>
            <div className={`${iconBox} rounded flex items-center justify-center shrink-0 mt-0.5`} style={{ background: `${THEME.amber}20` }}>
              <svg width={svgSz} height={svgSz} viewBox="0 0 24 24" fill={THEME.amber}><path d="M12 2L1 21h22L12 2zm0 4l7.53 13H4.47L12 6zm-1 5v4h2v-4h-2zm0 6v2h2v-2h-2z" /></svg>
            </div>
            <div>
              <div className={`${insightTitle} font-bold`} style={{ fontFamily: THEME.fontMono, color: THEME.amber }}>AI INSIGHT</div>
              <div className={`${insightBody} leading-[1.35] mt-0.5`} style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
                Matthew: 1:32.6 split + 4×3 Front Squat this week + Tuesday 6hr day. <strong style={{ color: THEME.textPrimary }}>Fatigue risk flagged.</strong> Torres: sleep dropping 3 nights in a row, compliance at 88%. <strong style={{ color: THEME.textPrimary }}>Monitor closely.</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {deployPhase !== 'idle' && (
          <motion.div
            key="deploy-overlay"
            className="absolute inset-0 z-[60] flex flex-col rounded-lg overflow-hidden pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
            style={
              deployPhase === 'steps' || deployPhase === 'buffering' || deployPhase === 'finished'
                ? { background: THEME.darkDeep }
                : undefined
            }
          >
            {deployPhase === 'splash' && (
              <motion.div
                className="absolute inset-0 flex flex-col justify-end overflow-hidden"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.97) 0%, rgba(167,243,208,0.35) 100%)' }}
              >
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      width: p ? 56 : 44,
                      height: p ? 56 : 44,
                      left: '14%',
                      bottom: '10%',
                      marginLeft: p ? -28 : -22,
                      marginBottom: p ? -28 : -22,
                      background: `radial-gradient(circle, ${THEME.accent}70 0%, ${THEME.primary}40 35%, transparent 72%)`,
                    }}
                    initial={{ scale: 0.15, opacity: 0.95 }}
                    animate={{ scale: 5.5 + i * 1.2, opacity: 0 }}
                    transition={{ duration: 0.75, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
                <motion.div
                  className="absolute flex flex-col items-center"
                  style={{ left: '14%', bottom: '12%', marginLeft: p ? -18 : -14 }}
                  initial={{ y: 0, opacity: 1, scale: 1 }}
                  animate={{ y: p ? -320 : -260, opacity: 0.15, scale: 1.05 }}
                  transition={{ duration: 0.78, ease: [0.15, 0.85, 0.2, 1] }}
                >
                  <DeployRocketGlyph size={p ? 32 : 26} />
                  <motion.div
                    className="mt-0.5 rounded-full"
                    style={{ width: p ? 6 : 5, height: p ? 18 : 14, background: `linear-gradient(180deg, ${THEME.accent}, transparent)` }}
                    initial={{ opacity: 0.8, scaleY: 0.6 }}
                    animate={{ opacity: 0, scaleY: 1.8 }}
                    transition={{ duration: 0.65 }}
                  />
                </motion.div>
                <div
                  className={`absolute left-0 right-0 text-center ${p ? 'bottom-4 text-[9px]' : 'bottom-3 text-[7px]'} font-bold uppercase tracking-[0.2em]`}
                  style={{ fontFamily: THEME.fontMono, color: THEME.primaryDark }}
                >
                  Launching
                </div>
              </motion.div>
            )}

            {deployPhase === 'steps' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden px-3 py-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className={`${p ? 'text-[10px]' : 'text-[8px]'} font-bold uppercase tracking-[0.16em] mb-3 shrink-0`}
                  style={{ fontFamily: THEME.fontMono, color: THEME.primaryLight }}
                >
                  Synth layer pipeline
                </div>
                <div className="flex w-full max-w-[min(100%,260px)] flex-col gap-1.5 overflow-hidden">
                  {DEPLOY_PIPELINE_STEPS.map((label, i) => {
                    const active = i <= deployStep
                    const current = i === deployStep
                    return (
                      <motion.div
                        key={label}
                        className="rounded-lg border px-2.5 py-2 shrink-0"
                        initial={false}
                        animate={{
                          borderColor: current ? THEME.accent : active ? `${THEME.primary}55` : `${THEME.border}99`,
                          background: current ? `${THEME.primary}24` : active ? `${THEME.primary}0c` : 'transparent',
                          opacity: active ? 1 : 0.28,
                        }}
                        transition={{ duration: 0.25 }}
                        style={{ borderWidth: 1 }}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
                            style={{
                              fontFamily: THEME.fontMono,
                              background: current ? THEME.accent : active ? `${THEME.primary}40` : THEME.border,
                              color: current ? '#fff' : active ? THEME.primaryDark : THEME.textMuted,
                            }}
                          >
                            {i + 1}
                          </span>
                          <span
                            className={`${p ? 'text-[9px]' : 'text-[8px]'} font-semibold leading-snug truncate`}
                            style={{ fontFamily: THEME.fontMono, color: active ? THEME.primaryLight : THEME.textMuted }}
                          >
                            {label}
                          </span>
                          {current && (
                            <span
                              className="ml-auto shrink-0 text-[8px] font-bold uppercase"
                              style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
                            >
                              Running
                            </span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              </motion.div>
            )}

            {deployPhase === 'buffering' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="h-8 w-8 rounded-full border-2 border-transparent mb-3"
                  style={{ borderTopColor: THEME.accent, borderRightColor: `${THEME.primary}55` }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
                />
                <div
                  className={`${p ? 'text-[10px]' : 'text-[8px]'} font-semibold`}
                  style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
                >
                  Finalising deployment…
                </div>
              </motion.div>
            )}

            {deployPhase === 'finished' && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center px-4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                <div
                  className={`${p ? 'text-[12px]' : 'text-[10px]'} font-bold`}
                  style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
                >
                  Successfully finished
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Shared: purpose + numbered flow (parallels Base ↔ Synth) ── */

function LayerFlowCard({
  headline,
  purpose,
  steps,
}: {
  headline: string
  purpose: string
  steps: { title: string; detail: string }[]
}) {
  const border = THEME.border
  const bg = '#FAFAF9'

  return (
    <div className="rounded-lg border px-2.5 py-2.5 shrink-0" style={{ borderColor: border, background: bg }}>
      <div className="text-[8px] font-bold tracking-[0.14em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
        What this layer does
      </div>
      <div className="text-[11px] font-bold mt-1.5 leading-[1.15]" style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}>
        {headline}
      </div>
      <p className="text-[10px] mt-1.5 leading-[1.4]" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
        {purpose}
      </p>
      <div className="mt-2 flex flex-col gap-2">
        {steps.map((s, i) => (
          <div key={s.title} className="flex gap-2 items-start">
            <div
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold"
              style={{ background: `${THEME.primary}20`, color: THEME.primary, fontFamily: THEME.fontMono }}
            >
              {i + 1}
            </div>
            <div className="min-w-0">
              <div className="text-[9px] font-bold" style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                {s.title}
              </div>
              <div className="text-[9px] leading-[1.35] mt-0.5" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
                {s.detail}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Synth layer: frame + dashboard (edge-to-edge in column) ── */

function SynthLayerPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col min-h-0 h-full border"
      style={{
        borderColor: THEME.primary,
        background: `linear-gradient(180deg, ${THEME.primary}08 0%, #fff 48%)`,
        boxShadow: `0 1px 0 0 ${THEME.border}`,
      }}
    >
      <div
        className="px-3 py-1.5 flex items-center justify-between shrink-0 border-b"
        style={{ borderColor: THEME.border, background: '#fff' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-lg text-[10px] font-bold" style={{ background: `${THEME.primary}18`, color: THEME.primary, fontFamily: THEME.fontMono }}>
            2
          </div>
          <div>
            <div className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
              Synth layer
            </div>
            <div className="text-[8px] mt-0.5" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              Synthesis + morning surface
            </div>
          </div>
        </div>
        <div className="text-[9px] text-right max-w-[200px] leading-snug" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          What the coach sees every morning
        </div>
      </div>
      <div className="p-1 flex-1 min-h-0 flex flex-col gap-1.5 overflow-hidden">{children}</div>
    </div>
  )
}

/* ── How synth works: simple step illustrations + subtle copy ── */

/** Vertical connector between pipeline steps */
function SynthStepDownArrow() {
  return (
    <div className="flex flex-col items-center shrink-0 py-0.5" aria-hidden>
      <div
        className="w-px h-2 rounded-full"
        style={{
          background: `linear-gradient(180deg, ${THEME.border} 0%, ${THEME.primary} 100%)`,
        }}
      />
      <svg width="20" height="14" viewBox="0 0 20 14" className="-mt-px">
        <path d="M10 0 L10 7" stroke={THEME.primary} strokeWidth={1.75} strokeLinecap="round" />
        <path
          d="M3.5 7 L10 13.5 L16.5 7"
          stroke={THEME.primary}
          strokeWidth={1.75}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/** Tiny browser chrome + page body · reads like a real tab */
function MiniWebsiteView({ urlBar, lines }: { urlBar: string; lines: [string, string] }) {
  return (
    <div
      className="w-full max-w-[158px] rounded-md overflow-hidden border shadow-sm"
      style={{ borderColor: THEME.border, boxShadow: `0 1px 2px ${THEME.border}40` }}
    >
      <div
        className="flex items-center gap-1.5 px-2 py-1.5 border-b"
        style={{ borderColor: THEME.border, background: '#ECECEE' }}
      >
        <div className="flex gap-0.5 shrink-0" aria-hidden>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FCA5A5' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FCD34D' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#86EFAC' }} />
        </div>
        <div
          className="min-w-0 flex-1 truncate rounded px-1.5 py-0.5 text-[6.5px] leading-none"
          style={{
            fontFamily: THEME.fontMono,
            color: THEME.textMuted,
            background: '#FAFAF9',
            border: `1px solid ${THEME.border}`,
          }}
        >
          {urlBar}
        </div>
      </div>
      <div className="px-2.5 py-2.5 space-y-1" style={{ background: '#FFFFFF' }}>
        <div className="text-[8px] font-semibold leading-tight" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
          {lines[0]}
        </div>
        <div className="text-[7.5px] leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary }}>
          {lines[1]}
        </div>
      </div>
    </div>
  )
}

/** Mini browser with a tiny team table · what synth data looks like */
function MiniAthleteSynthView() {
  const rows = [
    { name: 'Matthew', erg: '6:12', load: 'High', status: 'AT RISK', risk: true },
    { name: 'Lily', erg: '6:18', load: 'Med', status: 'OK', risk: false },
    { name: 'Star', erg: '6:22', load: 'Low', status: 'OK', risk: false },
  ] as const
  return (
    <div
      className="w-full max-w-[152px] rounded-md overflow-hidden border shadow-sm"
      style={{ borderColor: THEME.border, boxShadow: `0 1px 2px ${THEME.border}40` }}
    >
      <div
        className="flex items-center gap-1.5 px-1.5 py-1 border-b"
        style={{ borderColor: THEME.border, background: '#ECECEE' }}
      >
        <div className="flex gap-0.5 shrink-0" aria-hidden>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FCA5A5' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#FCD34D' }} />
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#86EFAC' }} />
        </div>
        <div
          className="min-w-0 flex-1 truncate rounded px-1 py-0.5 text-[6.5px] leading-none"
          style={{
            fontFamily: THEME.fontMono,
            color: THEME.textMuted,
            background: '#FAFAF9',
            border: `1px solid ${THEME.border}`,
          }}
        >
          https://app.synthsports.com/team
        </div>
      </div>
      <div className="px-1.5 py-1.5" style={{ background: '#FFFFFF' }}>
        <div className="text-[7px] font-bold mb-0.5" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
          Team overview
        </div>
        <div className="flex flex-col gap-px" style={{ fontFamily: THEME.fontMono }}>
          <div className="flex gap-0.5 text-[5.5px] opacity-50 leading-none pb-px">
            <span className="flex-1 min-w-0">Athlete</span>
            <span>Erg</span>
            <span>Load</span>
            <span className="w-9 text-right">Status</span>
          </div>
          {rows.map((r) => (
            <div key={r.name} className="flex gap-0.5 items-center text-[6px] leading-none min-h-[11px]">
              <span className="flex-1 min-w-0 truncate" style={{ color: THEME.textPrimary }}>
                {r.name}
              </span>
              <span className="tabular-nums shrink-0" style={{ color: THEME.textSecondary }}>
                {r.erg}
              </span>
              <span className="w-7 shrink-0 text-center" style={{ color: THEME.amber }}>
                {r.load}
              </span>
              <span
                className="min-w-[2.75rem] shrink-0 text-right text-[5px] font-semibold leading-tight"
                style={{ color: r.risk ? THEME.red : THEME.accent }}
              >
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SynthPipelineVisual({ n }: { n: 1 | 2 | 3 | 4 | 5 }) {
  if (n === 1) {
    return (
      <div className="flex h-[80px] w-full max-w-[152px] items-center justify-center rounded-md border bg-white" style={{ borderColor: THEME.border }}>
        <span
          style={{
            fontFamily: THEME.logoFont,
            fontWeight: THEME.logoWeight,
            fontSize: '24px',
            letterSpacing: '-0.02em',
            color: THEME.textPrimary,
          }}
        >
          synth<span style={{ color: THEME.logoDotColor }}>.</span>
        </span>
      </div>
    )
  }
  if (n === 2) {
    return (
      <MiniWebsiteView
        urlBar="https://tools.rowing.io/bridge"
        lines={['extracting DOM…', 'document.querySelectorAll → 142 nodes']}
      />
    )
  }
  if (n === 3) {
    return (
      <MiniWebsiteView
        urlBar="https://app.synthsports.com/visual"
        lines={['Dashboard editor', 'Charts · tables · save as default view']}
      />
    )
  }
  if (n === 4) {
    return (
      <MiniWebsiteView
        urlBar="https://app.synthsports.com/scheduler"
        lines={['Cron · every 6h', 'Next run 06:00 · last sync OK']}
      />
    )
  }
  return <MiniAthleteSynthView />
}

function AppFeaturesPanel() {
  const steps: { art: 1 | 2 | 3 | 4 | 5; line1: string; line2?: string }[] = [
    { art: 1, line1: 'Deploy synth agent' },
    { art: 2, line1: 'Extract DOM of each tool' },
    { art: 3, line1: 'Customise data visualisation' },
    { art: 4, line1: 'Schedule extraction frequency' },
    { art: 5, line1: 'Synth data' },
  ]

  return (
    <div
      className="rounded-xl overflow-hidden flex flex-col min-h-0 h-full border"
      style={{
        borderColor: THEME.primary,
        background: `linear-gradient(180deg, ${THEME.primary}06 0%, #fff 42%)`,
        boxShadow: `0 1px 0 0 ${THEME.border}`,
      }}
    >
      <div
        className="px-3 py-2.5 flex items-center gap-2.5 shrink-0 border-b"
        style={{ borderColor: THEME.border, background: '#fff' }}
      >
        <div
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold shadow-sm"
          style={{
            background: `linear-gradient(180deg, ${THEME.primary}20 0%, ${THEME.primary}12 100%)`,
            color: THEME.primaryDark,
            fontFamily: THEME.fontMono,
            border: `1px solid ${THEME.primary}28`,
          }}
        >
          3
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <div
            className="text-[10px] font-bold leading-tight uppercase tracking-[0.12em]"
            style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
          >
            This is how synth layer works
          </div>
          <div className="text-[8px] mt-1 leading-snug" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
            Pipeline in five steps · read downward
          </div>
        </div>
      </div>
      <div className="px-2 py-2 flex-1 min-h-0 flex flex-col justify-start overflow-y-auto">
        {steps.map((s, idx) => (
          <div key={s.art} className="flex flex-col items-stretch shrink-0">
            <div
              className="rounded-lg border px-2 py-2 flex flex-col items-center text-center shrink-0"
              style={{ borderColor: THEME.border, background: '#FFFCF9' }}
            >
              <SynthPipelineVisual n={s.art} />
              <div
                className="mt-1.5 text-[8px] font-semibold leading-snug max-w-[12rem]"
                style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
              >
                {s.line1}
                {s.line2 ? (
                  <>
                    <br />
                    <span style={{ color: THEME.textMuted, fontWeight: 500 }}>{s.line2}</span>
                  </>
                ) : null}
              </div>
            </div>
            {idx < steps.length - 1 ? <SynthStepDownArrow /> : null}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Base layer: same frame pattern as Synth layer ── */

function BaseLayerPanel({ children }: { children: ReactNode }) {
  return (
    <div
      className="rounded-xl flex flex-col min-h-0 h-full border overflow-visible"
      style={{
        borderColor: THEME.primary,
        background: `linear-gradient(180deg, ${THEME.primary}08 0%, #fff 48%)`,
        boxShadow: `0 1px 0 0 ${THEME.border}`,
      }}
    >
      <div
        className="px-3 py-1.5 flex items-center justify-between shrink-0 border-b"
        style={{ borderColor: THEME.border, background: '#fff' }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <div
            className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold"
            style={{ background: `${THEME.primary}18`, color: THEME.primary, fontFamily: THEME.fontMono }}
          >
            1
          </div>
          <div className="min-w-0">
            <div className="text-[10px] font-bold tracking-[0.16em] uppercase" style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
              Base layer
            </div>
            <div className="text-[8px] mt-0.5" style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              Boat assignments + live timer
            </div>
          </div>
        </div>
        <div className="text-[8px] text-right leading-snug max-w-[120px] shrink-0" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
          The door into every program
        </div>
      </div>
      <div className="p-1.5 flex-1 min-h-0 flex flex-col gap-1.5 overflow-visible min-h-0">{children}</div>
    </div>
  )
}

/* ── Base app UI preview (product chrome + modules) ── */

function BaseAppMini({ embedded = false, prominent = false, minimal = false }: { embedded?: boolean; prominent?: boolean; minimal?: boolean }) {
  /** Minimal: lineup + live timing only · fits narrow column without clipping */
  const p = prominent && !minimal
  const chrome = p ? 'px-2.5 py-2' : 'px-2.5 py-1.5'
  const badge = p ? 'h-7 w-7 text-[11px]' : 'h-6 w-6 text-[10px]'
  const title = p ? 'text-[11px]' : 'text-[10px]'
  const meta = p ? 'text-[10px]' : 'text-[9px]'
  const pad = p ? 'p-2' : 'p-1.5'
  const gap = p ? 'gap-1.5' : 'gap-1'
  const lbText = p ? 'text-[9px]' : 'text-[8px]'
  const lbPy = p ? 'py-2' : 'py-1.5'
  const lbRow = p ? 'text-[9px]' : 'text-[8px]'
  const pill = p ? 'px-2 py-0.5 text-[9px]' : 'px-1.5 py-0.5 text-[8px]'
  const ltText = p ? 'text-[9px]' : 'text-[8px]'
  const ltPy = p ? 'py-2' : 'py-1.5'
  const lineupStack = p ? 'space-y-2' : 'space-y-1.5'
  const ltTime = p ? 'text-[14px]' : 'text-[12px]'
  const ltSide = p ? 'text-[10px]' : 'text-[9px]'
  const pub = p ? 'px-3.5 py-1.5 text-[9px]' : 'px-3 py-1 text-[8px]'
  const av = p ? 'h-9 w-9 text-[11px]' : 'h-8 w-8 text-[10px]'
  const name = p ? 'text-[12px]' : 'text-[11px]'
  const sub = p ? 'text-[9px]' : 'text-[8px]'
  const metricL = p ? 'text-[8px]' : 'text-[7px]'
  const metricV = p ? 'text-[11px]' : 'text-[10px]'
  const trend = p ? 'text-[9px]' : 'text-[8px]'
  const bar = p ? 'h-2' : 'h-1.5'

  const shell = embedded
    ? `border flex flex-col rounded-lg shrink-0 ${minimal ? 'overflow-visible' : 'overflow-hidden min-h-0 h-full'} ${p ? 'shadow-sm' : ''}`
    : 'rounded-xl overflow-hidden border h-full flex flex-col min-h-0'

  const lineup1 = minimal ? ['Matthew', 'Lily', 'Star', 'Davis'] : ['Matthew', 'Lily', 'Star', 'Davis', 'Wu', 'Rossi', 'Chen', 'Park']
  const lineup2 = minimal ? ['Torres', 'Ali', 'Brown', 'Garcia'] : ['Torres', 'Ali', 'Brown', 'Garcia', 'Lee', 'Singh', 'Bell', 'Reed']

  return (
    <div className={shell} style={{ borderColor: THEME.border, background: '#fff' }}>
      {!minimal && (
        <div className={`${chrome} flex items-center justify-between border-b shrink-0`} style={{ borderColor: THEME.border, background: '#FAFAF9' }}>
          <div className="flex items-center gap-2">
            <div
              className={`${badge} rounded-full flex items-center justify-center font-bold`}
              style={{ background: THEME.primary, color: '#fff', fontFamily: THEME.fontMono }}
            >
              1
            </div>
            <div className={`${title} tracking-[0.14em] uppercase font-bold`} style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
              The Base App
            </div>
          </div>
          <div className={meta} style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
            Today · AM
          </div>
        </div>
      )}

      <div className={`${minimal ? 'p-1.5 gap-1.5' : `${pad} ${gap}`} flex flex-col ${minimal ? 'overflow-visible' : 'flex-1 min-h-0 overflow-hidden'}`}>
        <div className="rounded-lg border overflow-visible flex flex-col shrink-0" style={{ borderColor: THEME.border }}>
          <div className={`px-2.5 ${minimal ? 'py-1.5' : lbPy} flex items-center justify-between`} style={{ background: THEME.primary }}>
            <div className={`${minimal ? 'text-[8px]' : lbText} tracking-[0.12em] uppercase text-white font-bold`} style={{ fontFamily: THEME.fontMono }}>
              Lineup Builder
            </div>
            <div className={`${minimal ? 'text-[8px]' : lbText} text-white/90`} style={{ fontFamily: THEME.fontMono }}>
              Today · AM
            </div>
          </div>
          <div className={`${minimal ? 'p-1.5 space-y-1' : `${p ? 'p-2' : 'p-1.5'} ${lineupStack}`}`}>
            {[
              { boat: '1V', names: lineup1 },
              { boat: '2V', names: lineup2 },
            ].map((b) => (
              <div key={b.boat} className="flex items-start gap-1.5">
                <div className={`${minimal ? 'w-4' : 'w-5'} ${minimal ? 'text-[8px]' : lbRow} pt-0.5 font-semibold`} style={{ fontFamily: THEME.fontMono, color: THEME.primary }}>
                  {b.boat}
                </div>
                <div className="flex flex-wrap gap-0.5 flex-1 min-w-0">
                  {b.names.map((n) => (
                    <span
                      key={n}
                      className={minimal ? 'px-1.5 py-0.5 rounded-full text-[7px]' : `${pill} rounded-full`}
                      style={{ fontFamily: THEME.fontSans, color: THEME.textSecondary, background: '#F4F4F5', border: `1px solid ${THEME.border}` }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`${minimal ? 'px-2 pb-1.5 pt-0' : p ? 'px-2 pb-2' : 'px-2 pb-1.5'} flex justify-end`}>
            <button
              type="button"
              className={`inline-flex items-center gap-1 rounded-full ${minimal ? 'px-2.5 py-1 text-[8px]' : pub} font-bold text-white`}
              style={{ background: THEME.primary, fontFamily: THEME.fontMono }}
            >
              Publish <span aria-hidden>→</span>
            </button>
          </div>
        </div>

        <div className="rounded-lg border overflow-visible shrink-0" style={{ borderColor: THEME.border }}>
          <div className={`px-2.5 ${minimal ? 'py-1.5' : ltPy} flex items-center justify-between`} style={{ background: THEME.darkDeep }}>
            <div className={`${minimal ? 'text-[8px]' : ltText} tracking-[0.12em] uppercase text-white font-bold`} style={{ fontFamily: THEME.fontMono }}>
              Live Timing
            </div>
            <div className={`${minimal ? 'text-[8px]' : ltText} text-red-400 font-bold`} style={{ fontFamily: THEME.fontMono }}>
              ● REC
            </div>
          </div>
          <div className="divide-y" style={{ borderColor: THEME.border }}>
            {[
              { boat: '1V', time: '1:32.4', delta: '-0.8', c: THEME.accent },
              { boat: '2V', time: '1:34.1', delta: '+0.9', c: THEME.amber },
              { boat: '3V', time: '1:36.7', delta: '+3.5', c: THEME.red },
            ].map((r) => (
              <div key={r.boat} className={`px-2.5 ${minimal ? 'py-1.5' : p ? 'py-2' : 'py-1.5'} flex items-center justify-between gap-2`}>
                <span className={`${minimal ? 'text-[9px]' : ltSide} w-6 font-semibold`} style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  {r.boat}
                </span>
                <span className={`${minimal ? 'text-[13px]' : ltTime} flex-1 text-center font-bold tabular-nums`} style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}>
                  {r.time}
                </span>
                <span className={`${minimal ? 'text-[9px]' : ltSide} w-10 text-right font-semibold tabular-nums`} style={{ fontFamily: THEME.fontMono, color: r.c }}>
                  {r.delta}
                </span>
              </div>
            ))}
          </div>
        </div>

        {!minimal && (
        <div className={`rounded-lg border ${p ? 'p-2' : 'p-1.5'} flex-1 min-h-0 flex flex-col`} style={{ borderColor: THEME.border, background: '#fff' }}>
          <div className="flex items-center gap-2">
            <div className={`${av} rounded-full flex items-center justify-center font-bold`} style={{ background: `${THEME.primary}20`, color: THEME.primary, fontFamily: THEME.fontMono }}>
              Ma
            </div>
            <div>
              <div className={`${name} font-bold`} style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>
                Matthew
              </div>
              <div className={sub} style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
                Port · 1V · Sophomore
              </div>
            </div>
          </div>
          <div className={`mt-2 grid grid-cols-3 ${p ? 'gap-2' : 'gap-1.5'}`}>
            {[
              { l: '2K Erg', v: '6:12.4', c: THEME.accent },
              { l: 'Squat', v: '315 lb', c: THEME.blue },
              { l: 'Weight', v: '198 lb', c: THEME.purple },
            ].map((m) => (
              <div key={m.l} className={`rounded border ${p ? 'px-2 py-2' : 'px-1.5 py-1.5'}`} style={{ borderColor: THEME.border, background: '#FAFAF9' }}>
                <div className={metricL} style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
                  {m.l}
                </div>
                <div className={`mt-0.5 ${metricV} font-bold tabular-nums`} style={{ fontFamily: THEME.fontMono, color: m.c }}>
                  {m.v}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-2 flex-1 min-h-0 flex flex-col justify-end">
            <div className={trend} style={{ fontFamily: THEME.fontSans, color: THEME.textMuted }}>
              7-day trend
            </div>
            <div className="mt-1 grid grid-cols-7 gap-0.5">
              {[0.35, 0.5, 0.45, 0.6, 0.55, 0.7, 0.65].map((a, i) => (
                <div key={i} className={`${bar} rounded-sm`} style={{ background: THEME.primary, opacity: 0.25 + a * 0.55 }} />
              ))}
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

/* ── Before/After transformation ── */

function BeforeAfter({ compact }: { compact?: boolean }) {
  const pad = compact ? 'p-2.5' : 'p-4'
  const head = compact ? 'text-[10px] mb-1.5' : 'text-[11px] mb-2'
  const rowMain = compact ? 'text-[9px]' : 'text-[10px]'
  const rowMeta = compact ? 'text-[8px]' : 'text-[9px]'
  const sum = compact ? 'text-[9px] mt-2' : 'text-[10px] mt-3'
  const gap = compact ? 'gap-1' : 'gap-1.5'

  return (
    <div
      className="rounded-lg overflow-hidden border w-full min-w-0"
      style={{ borderColor: THEME.border, background: '#fff' }}
    >
      <div className="grid grid-cols-2 min-w-0">
        {/* Before */}
        <div className={`${pad} flex flex-col min-w-0`} style={{ borderRight: `1px solid ${THEME.border}` }}>
          <div className={`font-bold ${head}`} style={{ fontFamily: THEME.fontMono, color: THEME.red }}>BEFORE synth.</div>
          <div className={`flex flex-col ${gap}`}>
            {[
              { tool: 'Google Sheets', status: 'Manual entry' },
              { tool: 'Bridge Athletics', status: 'Separate login' },
              { tool: 'TeamWorks', status: 'No export' },
              { tool: 'Whoop', status: 'Phone only' },
              { tool: 'GroupMe', status: 'Lost in chat' },
              { tool: 'Notebook', status: 'Handwritten' },
            ].map(t => (
              <div key={t.tool} className="flex items-center gap-1.5 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: `${THEME.red}55` }} />
                <span className={`font-semibold flex-1 truncate ${rowMain}`} style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>{t.tool}</span>
                <span className={`shrink-0 ${rowMeta}`} style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>{t.status}</span>
              </div>
            ))}
          </div>
          <div className={`font-semibold ${sum}`} style={{ fontFamily: THEME.fontSans, color: THEME.red }}>
            6 tools. 6 logins. Zero connection.
          </div>
        </div>

        {/* After */}
        <div className={`${pad} flex flex-col min-w-0`} style={{ background: `${THEME.primary}04` }}>
          <div className={`font-bold ${head}`} style={{ fontFamily: THEME.fontMono, color: THEME.accent }}>AFTER synth.</div>
          <div className={`flex flex-col ${gap}`}>
            {[
              { data: 'Erg splits + trends', src: 'from Sheets', color: THEME.accent },
              { data: 'Gym load + volume', src: 'from Bridge', color: THEME.blue },
              { data: 'Daily schedule', src: 'from TeamWorks', color: THEME.cyan },
              { data: 'Recovery + HRV', src: 'from Whoop', color: THEME.purple },
              { data: 'Lineups published', src: 'in synth.', color: THEME.primary },
              { data: 'Risk flags + AI', src: 'synthesized', color: THEME.amber },
            ].map(t => (
              <div key={t.data} className="flex items-center gap-1.5 min-w-0">
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: t.color }} />
                <span className={`font-semibold flex-1 truncate ${rowMain}`} style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}>{t.data}</span>
                <span className={`shrink-0 ${rowMeta}`} style={{ fontFamily: THEME.fontMono, color: t.color }}>{t.src}</span>
              </div>
            ))}
          </div>
          <div className={`font-semibold ${sum}`} style={{ fontFamily: THEME.fontSans, color: THEME.accent }}>
            1 app. Updated every morning. Automatically.
          </div>
        </div>
      </div>
    </div>
  )
}

const BASE_LAYER_FLOW = {
  headline: 'Solution 1 · Base App',
  purpose:
    'Capture and publish operational truth at practice: who rows where, how pieces move, and raw splits · the inputs the synth layer ingests.',
  steps: [
    {
      title: 'Lineup Builder',
      detail: 'Assign seats by boat, then Publish so the roster everyone sees is the one you intend.',
    },
    {
      title: 'Live Timing',
      detail: 'Piece splits and deltas vs plan; REC ties the session to what you review later.',
    },
    {
      title: 'Publish & record',
      detail: 'Lock lineups and timing into the program record so synthesis is grounded in what happened on the water.',
    },
  ],
} as const

const SYNTH_LAYER_FLOW = {
  headline: 'Solution 2 · Synth layer',
  purpose:
    'Ingest connected sources overnight: one team table, color-coded risk, and a written brief · the morning “what changed” surface.',
  steps: [
    {
      title: 'Connect & sync',
      detail: 'Sheets, Bridge, Whoop, TeamWorks feed the Sources count; data lands on one roster.',
    },
    {
      title: 'Team Overview',
      detail: 'Scan erg, split, load, sleep, compliance, status · AT RISK vs OK in one pass.',
    },
    {
      title: 'AI Insight',
      detail: 'Plain-language flags when signals stack (fatigue, sleep slip, compliance drift).',
    },
  ],
} as const

/* ── Main slide ── */

export function S03_Solution() {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ padding: '52px 48px 36px', color: THEME.textPrimary }}>
      <TopNav section="02 · SOLUTION" page="3 / 13" tone="light" />
      <PaperTexture strength={0.7} tint="rgba(244, 243, 236, 0.95)" />

      <SectionLabel text="02 · SOLUTION" />

      <div
        className="mt-2 text-[38px] leading-[1.0] font-bold"
        style={{ fontFamily: THEME.fontMono, letterSpacing: '-0.06em' }}
      >
        A small door into a massive world.
      </div>

      <div className="mt-2">
        <DashedRule />
      </div>

      <div
        className="mt-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-1 text-center"
        style={{ fontFamily: THEME.fontMono, fontSize: 9, color: THEME.textSecondary }}
      >
        <span>
          <span style={{ color: THEME.primary, fontWeight: 700 }}>①</span> Base · capture &amp; publish
        </span>
        <span style={{ color: THEME.textMuted }} aria-hidden>
          →
        </span>
        <span>
          <span style={{ color: THEME.primary, fontWeight: 700 }}>②</span> Synth · sync sources · one table · AI brief
        </span>
      </div>

      {/* Row 1: Base | Synth | Pipeline (full height). Row 2: Before/after only under Base+Synth. */}
      <div className="mt-2 flex-1 min-h-0 grid grid-cols-12 grid-rows-[minmax(0,1fr)_auto] gap-3">
        <div className="col-span-3 row-start-1 min-h-0 flex flex-col">
          <BaseLayerPanel>
            <div className="shrink-0 min-h-0">
              <BaseAppMini embedded minimal />
            </div>
            <LayerFlowCard headline={BASE_LAYER_FLOW.headline} purpose={BASE_LAYER_FLOW.purpose} steps={[...BASE_LAYER_FLOW.steps]} />
          </BaseLayerPanel>
        </div>

        <div className="col-span-6 row-start-1 min-h-0 flex flex-col">
          <SynthLayerPanel>
            <div className="flex-1 min-h-0 flex flex-col min-h-0">
              <PortalMockup prominent />
            </div>
            <LayerFlowCard headline={SYNTH_LAYER_FLOW.headline} purpose={SYNTH_LAYER_FLOW.purpose} steps={[...SYNTH_LAYER_FLOW.steps]} />
          </SynthLayerPanel>
        </div>

        <div className="col-span-3 row-start-1 row-span-2 min-h-0 flex flex-col">
          <AppFeaturesPanel />
        </div>

        <div className="col-span-9 row-start-2 min-h-0 flex flex-col gap-2 shrink-0">
          <div className="flex items-center gap-2 px-0.5">
            <span
              className="text-[10px] font-bold tracking-[0.14em] uppercase"
              style={{ fontFamily: THEME.fontMono, color: THEME.textSecondary }}
            >
              Before &amp; after
            </span>
            <div className="flex-1 h-px" style={{ background: THEME.border }} />
            <span className="text-[8px]" style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}>
              Same sources → one morning brief
            </span>
          </div>
          <BeforeAfter compact />
        </div>
      </div>
    </div>
  )
}

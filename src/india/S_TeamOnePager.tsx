import { motion } from 'framer-motion'

import { PaperTexture } from '../components/PaperTexture'
import { THEME } from '../lib/theme'

/**
 * India-deck-only variant of OnePagerOverview: same team strip, status
 * chips, QR code, and backers marquee — but the brand hero (wordmark +
 * tagline) is swapped for a subtle "Team" title. OnePagerOverview itself
 * is untouched; SPD keeps using it as-is.
 */
type NavOverrides = { pageOverride?: string; sectionOverride?: string }
type Props = NavOverrides

const PAD = 'clamp(32px, 4vw, 56px) clamp(36px, 5vw, 72px) clamp(28px, 4vw, 44px)'

const QR_URL =
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=0&color=18181B&bgcolor=FAFAF9&data=https%3A%2F%2Fsynthsports.co'

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0 },
}

const BACKERS = [
  { src: '/logos/sutardja-cet.jpg', alt: 'Sutardja Center for Entrepreneurship & Technology', bg: '#ffffff', h: 52 },
  { src: '/logos/pad-13.svg', alt: 'Pad-13', bg: '#ffffff', h: 36 },
  { src: '/logos/microsoft-for-startups.png', alt: 'Microsoft for Startups', bg: '#ffffff', h: 30 },
  { src: '/logos/google-for-startups.png', alt: 'Google for Startups', bg: '#ffffff', h: 56 },
  { src: '/logos/nvidia-inception.svg', alt: 'NVIDIA Inception', bg: '#ffffff', h: 58 },
] as const

type Credential = { src?: string; alt: string; h?: number }

function CredentialChip({ cred }: { cred: Credential }) {
  return (
    <div className="flex h-12 items-center justify-center px-1" title={cred.alt}>
      {cred.src ? (
        <img
          src={cred.src}
          alt={cred.alt}
          style={{ height: cred.h ?? 40, width: 'auto', maxWidth: 72 }}
        />
      ) : (
        <span
          className="text-[9px] font-bold uppercase tracking-[0.14em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textSecondary }}
        >
          {cred.alt}
        </span>
      )}
    </div>
  )
}

function TeamCard({
  photo,
  photoPos,
  name,
  role,
  accent,
  credentials,
}: {
  photo: string
  photoPos?: string
  name: string
  role: string
  accent: string
  credentials: Credential[]
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative overflow-hidden rounded-full"
        style={{
          height: 168,
          width: 168,
          background: THEME.light,
          boxShadow: '0 8px 24px rgba(24,24,27,0.10)',
        }}
      >
        <img
          src={photo}
          alt={name}
          className="h-full w-full object-cover"
          style={{ objectPosition: photoPos ?? 'center top' }}
        />
      </div>
      <div
        className="mt-4 text-[17px] font-bold leading-tight"
        style={{ fontFamily: THEME.fontSerif, color: THEME.textPrimary }}
      >
        {name}
      </div>
      <div
        className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.2em]"
        style={{ fontFamily: THEME.fontMono, color: accent }}
      >
        {role}
      </div>
      <div className="mt-3 flex items-center justify-center gap-3">
        {credentials.map((c) => (
          <CredentialChip key={c.alt} cred={c} />
        ))}
      </div>
    </div>
  )
}

function LogoChip({
  src,
  alt,
  bg,
  h,
}: {
  src: string
  alt: string
  bg: string
  h: number
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-md"
      style={{
        background: bg,
        height: 72,
        width: 168,
        border: `1px solid ${THEME.border}`,
      }}
    >
      <img src={src} alt={alt} style={{ height: h, width: 'auto', maxWidth: '85%' }} />
    </div>
  )
}

function LogoMarquee() {
  const reps = 4
  const half = Array.from({ length: reps }).flatMap(() => BACKERS)
  const loop = [...half, ...half]
  return (
    <div className="flex flex-col gap-2.5">
      <div
        className="text-[9.5px] font-bold uppercase tracking-[0.28em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        Backed by
      </div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%)',
        }}
      >
        <motion.div
          className="flex w-max gap-4"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 80, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        >
          {loop.map((b, i) => (
            <LogoChip key={`${b.alt}-${i}`} src={b.src} alt={b.alt} bg={b.bg} h={b.h} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

export function S_TeamOnePager(_props: Props) {
  return (
    <div
      className="absolute inset-0 flex flex-col overflow-hidden"
      style={{ background: THEME.light, padding: PAD }}
    >
      <PaperTexture strength={0.5} tint="rgba(255,255,255,0.96)" />

      {/* Status chips, top left */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.45, delay: 0.15 }}
        className="absolute left-[clamp(36px,5vw,72px)] top-[clamp(70px,8vh,108px)] z-[2] flex flex-col items-start gap-2"
      >
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{
            fontFamily: THEME.fontMono,
            color: THEME.textSecondary,
            background: 'rgba(24,24,27,0.04)',
            border: `1px solid ${THEME.border}`,
          }}
        >
          # pre-revenue
        </span>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{
            fontFamily: THEME.fontMono,
            color: THEME.primaryDarker,
            background: `${THEME.primary}10`,
            border: `1px solid ${THEME.primary}33`,
          }}
        >
          # 120 users
        </span>
        <span
          className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{
            fontFamily: THEME.fontMono,
            color: THEME.accent,
            background: `${THEME.accent}12`,
            border: `1px solid ${THEME.accent}40`,
          }}
        >
          # 250 signups
        </span>
      </motion.div>

      {/* QR code, top right */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.45, delay: 0.15 }}
        className="absolute right-[clamp(36px,5vw,72px)] top-[clamp(70px,8vh,108px)] z-[2] flex flex-col items-center"
      >
        <div
          className="rounded-lg p-2"
          style={{ background: THEME.white, border: `1px solid ${THEME.border}` }}
        >
          <img
            src={QR_URL}
            alt="synthsports.co QR code"
            width={88}
            height={88}
            style={{ display: 'block' }}
          />
        </div>
        <div
          className="mt-1.5 text-[9.5px] font-bold uppercase tracking-[0.22em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
        >
          synthsports.co
        </div>
      </motion.div>

      <div className="relative z-[1] mt-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        {/* Title, replaces the brand hero */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-[clamp(40px,5vw,64px)] font-bold uppercase tracking-[0.06em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Team
        </motion.div>

        {/* Team strip */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-10 flex w-full max-w-[1040px] items-start justify-between"
        >
          <TeamCard
            photo="/team/abishai-gosula.png"
            photoPos="center 22%"
            name="Abishai Gosula"
            role="Founder & CEO"
            accent={THEME.primary}
            credentials={[
              { src: '/logos/elsheph.svg', alt: 'Elsheph', h: 38 },
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/All_India_Tennis_Association.svg/250px-All_India_Tennis_Association.svg.png',
                alt: 'AITA',
                h: 40,
              },
              { src: '/logos/cal-golden-bears.svg', alt: 'Cal', h: 38 },
            ]}
          />
          <TeamCard
            photo="/team/matthew-waddell_rowing.png"
            photoPos="32% 48%"
            name="Matthew Waddell"
            role="Co-founder & COO"
            accent={THEME.amber}
            credentials={[
              { src: '/logos/cal-golden-bears.svg', alt: 'Cal Rowing', h: 38 },
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/9/92/Rowing_New_Zealand_Logo.jpg',
                alt: 'Rowing NZ',
                h: 40,
              },
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/5/5a/IRA_rowing_logo.jpg',
                alt: 'IRA',
                h: 42,
              },
            ]}
          />
          <TeamCard
            photo="/team/lily-pember_rowing.png"
            photoPos="center 42%"
            name="Lily Pember"
            role="Co-founder & CSO"
            accent={THEME.purple}
            credentials={[
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b4/USRowing_logo.png/120px-USRowing_logo.png',
                alt: 'USA Rowing',
                h: 42,
              },
              { src: '/logos/cal-golden-bears.svg', alt: 'Cal Rowing', h: 38 },
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8d/World_Rowing_Federation_logo.svg/330px-World_Rowing_Federation_logo.svg.png',
                alt: 'World Rowing',
                h: 40,
              },
            ]}
          />
          <TeamCard
            photo="/team/star-rose_profile.png"
            photoPos="center 32%"
            name="Star Miller"
            role="Co-founder & CCO"
            accent={THEME.cyan}
            credentials={[
              { src: '/logos/cal-golden-bears.svg', alt: 'Cal Rowing', h: 38 },
              {
                src: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/13/Rowing_Australia_logo.png/250px-Rowing_Australia_logo.png',
                alt: 'Rowing AUS',
                h: 40,
              },
            ]}
          />
        </motion.div>
      </div>

      {/* Footer: full-width scrolling backers marquee */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-[1] mt-6 w-full"
      >
        <LogoMarquee />
      </motion.div>
    </div>
  )
}

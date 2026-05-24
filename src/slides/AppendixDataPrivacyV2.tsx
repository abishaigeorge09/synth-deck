import { TopNav } from '../components/TopNav'
import { THEME } from '../lib/theme'

const PAD = 'clamp(24px, 3.4vw, 40px) clamp(28px, 4vw, 56px) clamp(20px, 3vw, 32px)'

type NavOverrides = { pageOverride?: string; sectionOverride?: string }

/* ───────── Icon glyphs ───────── */

function ShieldIcon({ size = 22, color = THEME.primary }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3l8 3v6c0 4.5-3.4 8.2-8 9-4.6-.8-8-4.5-8-9V6l8-3z"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 12l2.5 2.5 5-5"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function LockIcon({ size = 22, color = THEME.primary }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect
        x="5"
        y="11"
        width="14"
        height="9"
        rx="2"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11V8a4 4 0 0 1 8 0v3"
        fill="none"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="15.5" r="1.4" fill={color} />
    </svg>
  )
}

/* ───────── Content blocks ───────── */

function ColumnHeader({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <span
        className="text-[18px] font-bold uppercase tracking-[0.24em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.primary }}
      >
        {label}
      </span>
    </div>
  )
}

function SubHeader({ label }: { label: string }) {
  return (
    <div
      className="text-[10.5px] font-bold uppercase tracking-[0.22em]"
      style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
    >
      {label}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it) => (
        <li
          key={it}
          className="flex items-start gap-3 text-[16px] leading-[1.65]"
          style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
        >
          <span
            className="mt-[10px] inline-block h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ background: THEME.textMuted }}
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

type CertRow = { name: string; status: string }

const CERT_ROADMAP: CertRow[] = [
  { name: 'SOC 2 Type 1', status: 'Starting Q1 2027' },
  { name: 'HECVAT', status: 'When first institutional contract signed' },
  { name: 'GDPR', status: 'When EU expansion begins' },
  { name: 'CPRA', status: 'When CA consumer users exceed 5,000' },
  { name: 'SOC 2 Type 2', status: '12 months after SOC 2 Type 1' },
]

function CertRoadmapRow({ row }: { row: CertRow }) {
  return (
    <div
      className="flex items-baseline justify-between gap-4 border-b py-3 last:border-b-0"
      style={{ borderColor: THEME.border }}
    >
      <span
        className="text-[16px] font-bold leading-tight"
        style={{ fontFamily: THEME.fontSans, color: THEME.textPrimary }}
      >
        {row.name}
      </span>
      <span
        className="shrink-0 text-right text-[10.5px] font-bold uppercase tracking-[0.18em]"
        style={{ fontFamily: THEME.fontMono, color: THEME.textMuted }}
      >
        {row.status}
      </span>
    </div>
  )
}

function Subsection({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <SubHeader label={label} />
      {children}
    </div>
  )
}

/* ───────── Slide ───────── */

export function AppendixDataPrivacyV2({ pageOverride, sectionOverride }: NavOverrides) {
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden" style={{ background: THEME.light, padding: PAD }}>
      <TopNav section={sectionOverride ?? 'A8 · DATA SECURITY & PRIVACY'} page={pageOverride ?? ''} tone="light" />

      <div className="mt-5 flex min-h-0 flex-1 flex-col">
        <div
          className="text-[10px] font-bold uppercase tracking-[0.24em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.accent }}
        >
          A8 · Data security &amp; privacy
        </div>
        <h1
          className="mt-2 text-[clamp(28px,3.4vw,40px)] font-bold leading-[1.05] tracking-[-0.04em]"
          style={{ fontFamily: THEME.fontMono, color: THEME.textPrimary }}
        >
          Data security &amp; privacy.
        </h1>

        {/* Two columns split by a thin vertical divider */}
        <div className="mt-6 grid min-h-0 flex-1 grid-cols-[1fr_1px_1fr] gap-x-12">
          {/* LEFT — DATA SECURITY */}
          <div className="flex min-h-0 flex-col">
            <ColumnHeader icon={<ShieldIcon />} label="Data security" />

            {/* Three subsections distributed evenly across the remaining height */}
            <div className="mt-7 flex flex-col gap-8">
              <Subsection label="Infrastructure">
                <BulletList
                  items={[
                    'Hosted on Supabase, SOC 2 Type 2 certified',
                    'All PII encrypted at rest with AES-256, in transit with TLS 1.3',
                    'Deny-by-default firewall on every production environment',
                    'Automated backups with point-in-time recovery',
                    'Audit logs on every data view, exportable on request',
                  ]}
                />
              </Subsection>

              <Subsection label="Compliance posture">
                <BulletList
                  items={[
                    'FERPA-aligned today under the school official exception',
                    'Data Processing Agreement template ready for collegiate partners',
                    'Privacy policy and Terms of Service drafted, WilmerHale review scheduled',
                  ]}
                />
              </Subsection>

              <Subsection label="Certifications roadmap">
                <div className="mt-3 flex flex-col">
                  {CERT_ROADMAP.map((row) => (
                    <CertRoadmapRow key={row.name} row={row} />
                  ))}
                </div>
              </Subsection>
            </div>
          </div>

          {/* Vertical divider */}
          <div className="h-full w-px" style={{ background: THEME.border }} />

          {/* RIGHT — DATA PRIVACY */}
          <div className="flex min-h-0 flex-col">
            <ColumnHeader icon={<LockIcon />} label="Data privacy" />

            <div className="mt-7 flex flex-col gap-8">
              <Subsection label="Athlete control">
                <BulletList
                  items={[
                    'Athletes opt in per data source, revocable at any time',
                    'Athletes can export or delete their full data history on request',
                    'No data flows to synth without explicit athlete agreement',
                    'Consent records timestamped and exportable on request',
                  ]}
                />
              </Subsection>

              <Subsection label="Data scoping">
                <BulletList
                  items={[
                    'Per-athlete data scoping enforced at the database row level',
                    'Coach access scoped to their specific roster only',
                    'Strength coaches see strength data, medical sees medical, no cross-leakage',
                    'Role-based access controls enforced at every API endpoint',
                  ]}
                />
              </Subsection>

              <Subsection label="Aggregation">
                <BulletList
                  items={[
                    'Aggregate data k-anonymized with k ≥ 50 before any external use',
                    'No PII in aggregate queries, no re-identification possible',
                    'Independent privacy audit required before any data licensing deal closes',
                  ]}
                />
              </Subsection>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

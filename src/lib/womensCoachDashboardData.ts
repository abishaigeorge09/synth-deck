import type { DashboardAthleteRow } from '../components/SynthLayerDashboardMockup'

export const WOMENS_TEAM_SUBTITLE =
  "Cal Women's · 52 on roster · 32 erg sessions (24–26) · Latest erg: 2026-03-16"

export const WOMENS_TEAM_NAME = "Cal Women's Rowing" as const

export const WOMENS_TEAM_KICKER = 'Coach · Dashboard' as const

export const WOMENS_TABLE_HEADERS = ['Athlete', 'Erg 2K', 'Avg /500', 'Watts', 'Load', 'Wellness', 'Team log', 'Status'] as const

export const WOMENS_SQUAT_SUFFIX = '' as const

export const WOMENS_SOURCES_INGEST =
  '32 erg sessions · rowing_women__ 2024-2025 ERGS-2.xlsx · rowing_women_2025-2026 ERGS-2.xlsx'

export const WOMENS_AI_INSIGHT =
  "Latest pull: sheet 316 2k (2026-03-16) — Erg leader Wheeler at 6:35.6 / 362W. Cox improved ~10s YoY (6:59.2 → 6:48.9). Risk flags: Brooks at 232W and Laddy at 239W. Ingest matched rows from Sheets erg log + TeamWorks compliance."

export const WOMENS_CONNECTORS: { name: string; colorKey: 'primary' | 'cyan' | 'purple' | 'amber'; status: string }[] = [
  { name: 'Erg workbooks', status: 'synced', colorKey: 'primary' },
  { name: 'TeamWorks', status: '2m ago', colorKey: 'cyan' },
  { name: 'Wearable hub', status: 'live', colorKey: 'purple' },
  { name: 'Email digests', status: 'digests', colorKey: 'amber' },
] as const

export const WOMENS_SIGNAL_PRIMARY = {
  labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
  values: [84, 86, 83, 80, 82, 85, 88],
} as const

export const WOMENS_SIGNAL_SECONDARY = {
  labels: ['6k 1/30', '9×2k', '4×1k', '2×6k'],
  values: [78, 92, 85, 88],
} as const

export const WOMENS_ATHLETE_ROWS: DashboardAthleteRow[] = [
  { name: 'E. Wheeler', pos: '35 spm', erg: '6:35.6', split: '1:38.9', squat: '362', load: 'High', sleep: '—', comply: '—', risk: false },
  { name: 'J. Irmler', pos: '34 spm', erg: '6:38.6', split: '1:39.6', squat: '354', load: 'High', sleep: '—', comply: '—', risk: false },
  { name: 'L. Abbott', pos: '33 spm', erg: '6:41.7', split: '1:40.4', squat: '346', load: 'High', sleep: '—', comply: '—', risk: false },
  { name: 'S. Miller', pos: '35 spm', erg: '6:44.9', split: '1:41.2', squat: '337', load: 'High', sleep: '—', comply: '—', risk: false },
  { name: 'M. Cox', pos: '36 spm', erg: '6:48.9', split: '1:42.2', squat: '327', load: 'High', sleep: '—', comply: '—', risk: false },
  { name: 'L. Crampin', pos: '34 spm', erg: '6:55.8', split: '1:43.9', squat: '312', load: 'Med', sleep: '—', comply: '—', risk: false },
  { name: 'C. Lovell', pos: '34 spm', erg: '7:33.2', split: '1:53.9', squat: '241', load: 'Low', sleep: '—', comply: '—', risk: false },
  { name: 'B. Laddy', pos: '30 spm', erg: '7:34.0', split: '1:53.5', squat: '239', load: 'Low', sleep: '—', comply: '—', risk: true },
  { name: 'A. Brooks', pos: '35 spm', erg: '7:38.7', split: '1:54.6', squat: '232', load: 'Low', sleep: '—', comply: '—', risk: true },
] 


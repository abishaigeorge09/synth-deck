/** Served from `public/coach_tools_images/` (copy of `coach_tools_images/` at project root). */
const base = '/coach_tools_images'

export const COACH_TOOL_IMAGES: Array<{ file: string; alt: string }> = [
  { file: 'IMG_6256.PNG', alt: 'Coaching app screenshot' },
  { file: 'IMG_6261.PNG', alt: 'Coaching app screenshot' },
  { file: 'IMG_6264.PNG', alt: 'Coaching app screenshot' },
  { file: 'Record Erg Google sheets.png', alt: 'Google Sheets — erg data' },
  { file: 'image_erg_screen.PNG', alt: 'Erg screen' },
  { file: 'team_works_calaender.PNG', alt: 'TeamWorks calendar' },
  { file: 'team_works_compliances.PNG', alt: 'TeamWorks compliance' },
]

export function coachToolSrc(file: string) {
  return `${base}/${encodeURIComponent(file)}`
}

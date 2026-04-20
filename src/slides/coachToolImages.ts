/** Served from `public/coach_tools_images/` (copy of `coach_tools_images/` at project root). */
const base = '/coach_tools_images'

export type CoachToolImage = { file: string; alt: string }

export const COACH_TOOL_IMAGES: CoachToolImage[] = [
  { file: 'IMG_6256.PNG', alt: 'Team or training app screenshot' },
  { file: 'IMG_6261.PNG', alt: 'Team or training app screenshot' },
  { file: 'IMG_6264.PNG', alt: 'Team or training app screenshot' },
  { file: 'Record Erg Google sheets.png', alt: 'Google Sheet for recording erg scores' },
  { file: 'image_erg_screen.PNG', alt: 'Erg monitor screen' },
  { file: 'team_works_calaender.PNG', alt: 'TeamWorks calendar' },
  { file: 'team_works_compliances.PNG', alt: 'TeamWorks compliance' },
  {
    file: 'google-sheets-rowing-erg-intervals.png',
    alt: 'Google Sheets: Starboard and Port erg intervals plus Bike watts',
  },
]

export function coachToolSrc(file: string) {
  return `${base}/${encodeURIComponent(file)}`
}

/** Served from `public/coach_tools_images/` (copy of `coach_tools_images/` at project root). */
const base = '/coach_tools_images'

export type CoachToolImage = { file: string; alt: string; description: string }

export const COACH_TOOL_IMAGES: CoachToolImage[] = [
  {
    file: 'IMG_6256.PNG',
    alt: 'Team or training app screenshot',
    description: 'Screenshot from a coaching workflow — another siloed surface coaches switch to daily.',
  },
  {
    file: 'IMG_6261.PNG',
    alt: 'Team or training app screenshot',
    description: 'Screenshot from a coaching workflow — data that does not automatically sync elsewhere.',
  },
  {
    file: 'IMG_6264.PNG',
    alt: 'Team or training app screenshot',
    description: 'Screenshot from a coaching workflow — one more login and tab in the rotation.',
  },
  {
    file: 'Record Erg Google sheets.png',
    alt: 'Google Sheet for recording erg scores',
    description: 'Google Sheets tab coaches use to log ergs and pieces — copied and merged by hand across tools.',
  },
  {
    file: 'image_erg_screen.PNG',
    alt: 'Erg monitor screen',
    description: 'Erg console / piece display — numbers that later get re-typed into Sheets or chats.',
  },
  {
    file: 'team_works_calaender.PNG',
    alt: 'TeamWorks calendar',
    description: 'TeamWorks calendar — practice and travel live here, not in the same view as load or erg data.',
  },
  {
    file: 'team_works_compliances.PNG',
    alt: 'TeamWorks compliance',
    description: 'TeamWorks compliance / forms — another stream of truth beside training and performance apps.',
  },
  {
    file: 'google-sheets-rowing-erg-intervals.png',
    alt: 'Google Sheets: Starboard and Port erg intervals plus Bike watts',
    description:
      'Google Sheets — team erg workout (Sept 2023): 30′ / 20′ / 10′ intervals with 2′ rest; Starboard and Port splits (with stroke notes) and Bike 75′ watt averages — multi-column tracking coaches maintain manually.',
  },
]

export function coachToolSrc(file: string) {
  return `${base}/${encodeURIComponent(file)}`
}

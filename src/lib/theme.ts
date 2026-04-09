export const THEME = {
  // Brand
  name: 'synth.',
  logoFont: "'JetBrains Mono', monospace",
  logoWeight: 600,
  logoDotColor: '#10B981',
  tagline: 'Every data signal. One platform.',

  // Deck metadata
  deckName: 'Pitch Deck',
  year: '2026',

  // Colors — primary palette
  primary: '#059669',
  primaryDark: '#047857',
  primaryDarker: '#065F46',
  primaryLight: '#A7F3D0',
  accent: '#10B981',

  // Colors — semantic
  blue: '#3B82F6',
  amber: '#F59E0B',
  red: '#EF4444',
  cyan: '#06B6D4',
  purple: '#8B5CF6',

  // Colors — surfaces
  dark: '#18181B',
  darkDeep: '#0C0A09',
  darkMid: '#27272A',
  light: '#FAFAF9',
  white: '#FFFFFF',

  // Colors — text
  textPrimary: '#18181B',
  textSecondary: '#52525B',
  textMuted: '#A1A1AA',
  border: '#E4E4E7',

  // Typography
  fontMono: "'JetBrains Mono', monospace",
  fontSerif: "'Fraunces', Georgia, serif",
  fontSans: "'Instrument Sans', system-ui, sans-serif",
  fontImport:
    'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap',

  logoReveal: {
    dotFirst: true,
    typewriterSpeed: 80,
    crossfadeDuration: 600,
    showSubtitle: true,
    showLine: true,
  },

  pixelOpacity: 0.12,
  pixelSizes: [10, 15, 20, 25, 30, 40],
} as const


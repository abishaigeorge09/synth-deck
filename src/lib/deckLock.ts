/** Client-side gate only — not secret from anyone who can read the bundle. */
export const DECK_UNLOCK_PASSWORD = '98962005'

const STORAGE_KEY = 'synth-deck:unlocked'

export function readDeckUnlockFlag(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return window.localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export function writeDeckUnlockFlag(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    /* private mode — gate stays closed but app still works in tab */
  }
}

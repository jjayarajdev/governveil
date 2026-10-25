// The A/B design variant for the nine marketing pages.
//
//   light  B  light editorial — blue on paper, Instrument Serif   (default)
//   dark   A  dark technical  — amber on near-black, Geist
//
// The copy is identical in both; only the skin changes. Stored per visitor in
// localStorage, and forceable with ?v=dark / ?v=light so a link can pin one.
// `index.html` runs the same resolution pre-paint to avoid a flash of the
// other variant — keep the two in step if this logic changes.

export const KEY = 'gv-variant'
export const DEFAULT_VARIANT = 'light'

export function readVariant() {
  if (typeof window === 'undefined') return DEFAULT_VARIANT
  const forced = /[?&]v=(dark|light)/.exec(window.location.search + window.location.hash)
  if (forced) return forced[1]
  try {
    const stored = localStorage.getItem(KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* private mode, or site data blocked — fall through to the default */
  }
  return DEFAULT_VARIANT
}

export function storeVariant(v) {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    /* non-fatal: the choice just won't survive a reload */
  }
}

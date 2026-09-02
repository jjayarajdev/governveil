// Hostname-aware mode. When the site is served from learn.governveil.com it
// renders the Learn hub as the homepage with a learn-focused chrome; the main
// governveil.com deployment is unchanged. Append ?learn to any URL to preview
// the learn experience locally (e.g. http://localhost:5174/?learn).

export function isLearnHost() {
  if (typeof window === 'undefined') return false
  const { hostname, search, hash } = window.location
  if (hostname.startsWith('learn.')) return true
  return /[?&]learn\b/.test(search + hash)
}

// Absolute base for links that must point at the main marketing site when we
// are on the learn subdomain (locally this stays relative so preview works).
export const MAIN_SITE =
  typeof window !== 'undefined' && window.location.hostname.startsWith('learn.')
    ? 'https://governveil.com'
    : ''

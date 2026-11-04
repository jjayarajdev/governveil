/* The card pages are unlisted until 16 November 2026, then public.
 *
 * "Not linked" is only half of unlisted: without a robots directive the first
 * shared scan gets indexed and /demo starts showing up in search. So the
 * pages set noindex while this flag is true, and public-au/robots.txt
 * disallows the same two paths.
 *
 * TO MAKE THEM PUBLIC: set UNLISTED to false, delete the two Disallow lines
 * in public-au/robots.txt, and add them to NAV or MEGA in ShellAU if they
 * should be navigable. Nothing else is wired to this.
 */
export const UNLISTED = true
export const UNLISTED_UNTIL = '2026-11-16'

/* Sets, then removes, <meta name="robots"> for the life of the page. */
export function useNoIndex(active = UNLISTED) {
  if (typeof document === 'undefined' || !active) return undefined
  const m = document.createElement('meta')
  m.name = 'robots'
  m.content = 'noindex, nofollow'
  document.head.appendChild(m)
  return () => m.remove()
}

/* Fire-and-forget counter. Never blocks, never throws, never waits. */
export function hit(event, label) {
  try {
    const body = JSON.stringify({ event, label, path: location.pathname })
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/hit', new Blob([body], { type: 'application/json' }))
    } else {
      fetch('/api/hit', { method: 'POST', headers: { 'content-type': 'application/json' },
                          body, keepalive: true }).catch(() => {})
    }
  } catch { /* a counter must never break the page it counts */ }
}

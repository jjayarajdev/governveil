// Which market the visitor is on. governveil.com.au gets the Australian entity,
// the free design-partner pilot and an APRA/PSPF-first compliance framing;
// governveil.com keeps the Syntegreti entity and the paid pilot.
//
// Same shape as hostMode.js: hostname decides in production, a query parameter
// forces it locally. Append ?region=au to any URL to preview the AU site
// (e.g. http://localhost:5173/?region=au#/security).

export const REGIONS = ['com', 'au']
export const DEFAULT_REGION = 'com'

export function readRegion() {
  if (typeof window === 'undefined') return DEFAULT_REGION
  const { hostname, search, hash } = window.location
  const forced = /[?&]region=(au|com)\b/.exec(search + hash)
  if (forced) return forced[1]
  if (/\.au$/i.test(hostname)) return 'au'
  return DEFAULT_REGION
}

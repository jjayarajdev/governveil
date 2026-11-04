/* POST /api/hit — the counter behind the unlisted card pages.
 *
 * Deliberately thin and deliberately first-party. No cookie, no device id,
 * no IP: a row with a timestamp, the path, the event and a coarse country.
 * That answers "how many scanned, how many watched, how many booked" and
 * nothing else, which is the most a privacy product should ask of its own
 * visitors.
 *
 * Writes to the same D1 database as the enquiry forms, so one query covers
 * both the traffic and what it turned into.
 */
const EVENTS = new Set(['view', 'play', 'finish', 'cta'])
const ok = () => new Response(null, { status: 204, headers: { 'cache-control': 'no-store' } })

export async function onRequestPost({ request, env }) {
  let b
  try { b = await request.json() } catch { return ok() }

  const event = typeof b.event === 'string' ? b.event : ''
  if (!EVENTS.has(event)) return ok()           // never argue with a beacon

  if (env.DB) {
    try {
      const ua = (request.headers.get('user-agent') || '').toLowerCase()
      await env.DB.prepare(
        `INSERT INTO visits (at, site, path, event, label, country, ua)
         VALUES (?,?,?,?,?,?,?)`
      ).bind(
        new Date().toISOString(),
        new URL(request.url).hostname,
        typeof b.path === 'string' ? b.path.slice(0, 120) : '',
        event,
        typeof b.label === 'string' ? b.label.slice(0, 80) : null,
        request.headers.get('cf-ipcountry') || null,
        /mobile|android|iphone|ipad/.test(ua) ? 'mobile' : 'desktop'
      ).run()
    } catch (e) {
      console.warn('hit: not recorded', e.message)
    }
  }
  return ok()                                    // a counter never blocks a page
}

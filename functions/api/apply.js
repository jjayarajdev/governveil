/* POST /api/apply — the one endpoint behind every form on both sites.
 *
 * Deployed to BOTH Pages projects: `wrangler pages deploy` picks up
 * ./functions relative to the working directory, and both `npm run deploy`
 * and `npm run deploy:au` run from the repo root.
 *
 * Capture is D1, notification is optional on top. That order matters: the
 * submission is durable the moment it is written, so a webhook that is
 * misconfigured, rate-limited or retired later costs a notification, never
 * the lead. Both Pages projects bind the SAME database as `DB`, so one query
 * answers "who applied this week" across both sites.
 *
 * If D1 is unreachable the handler still tries the notification channels, and
 * only returns success if SOMETHING durable or delivered happened. It FAILS
 * LOUDLY otherwise: a form that accepts a submission and drops it is worse
 * than the inert button it replaced, because nobody knows to follow up.
 *
 * Notification is optional. Configure per project if wanted (values are
 * prompted for, never committed):
 *   npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil
 *   npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil-au
 *
 * NOTIFY_WEBHOOK takes a Teams/Slack/Zapier incoming-webhook URL.
 * Alternatively set RESEND_API_KEY + NOTIFY_EMAIL for email instead.
 * Either one is enough; both is fine.
 */

const FIELDS = ['name', 'email', 'org', 'role', 'size', 'region', 'sector', 'question']
const MAX = { name: 120, email: 254, org: 160, role: 120, size: 60, region: 60, sector: 60, question: 4000 }

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  })

/* Deliberately permissive. Rejecting odd-but-valid addresses loses a real
   lead, which costs more than letting a junk one through to a human. */
const looksLikeEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)

export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return json(400, { ok: false, error: 'Malformed request.' })
  }

  // Honeypot: a field no human sees and no real browser fills.
  if (body.website) return json(200, { ok: true })

  const data = {}
  for (const f of FIELDS) {
    const v = typeof body[f] === 'string' ? body[f].trim() : ''
    if (v) data[f] = v.slice(0, MAX[f])
  }

  if (!data.email) return json(400, { ok: false, error: 'An email address is required.' })
  if (!looksLikeEmail(data.email)) return json(400, { ok: false, error: 'That email address does not look right.' })

  const meta = {
    site: new URL(request.url).hostname,
    page: typeof body.page === 'string' ? body.page.slice(0, 200) : '',
    intent: typeof body.intent === 'string' ? body.intent.slice(0, 80) : '',
    at: new Date().toISOString(),
    country: request.headers.get('cf-ipcountry') || '',
  }

  const lines = [
    `New enquiry — ${meta.site}${meta.page ? ' ' + meta.page : ''}`,
    meta.intent ? `Intent: ${meta.intent}` : '',
    '',
    ...FIELDS.filter((f) => data[f]).map((f) => `${f[0].toUpperCase() + f.slice(1)}: ${data[f]}`),
    '',
    `${meta.at}${meta.country ? ' · ' + meta.country : ''}`,
  ].filter(Boolean)
  const text = lines.join('\n')

  const sent = []
  const failed = []

  /* Durable first. */
  let stored = false
  if (env.DB) {
    try {
      await env.DB.prepare(
        `INSERT INTO enquiries
           (at, site, page, intent, name, email, org, role, size, region, sector, question, country)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`
      )
        .bind(
          meta.at, meta.site, meta.page || null, meta.intent || null,
          data.name || null, data.email, data.org || null, data.role || null,
          data.size || null, data.region || null, data.sector || null,
          data.question || null, meta.country || null
        )
        .run()
      stored = true
    } catch (e) {
      failed.push(`d1 ${e.message}`)
    }
  }

  if (env.NOTIFY_WEBHOOK) {
    try {
      // `text` suits Slack and Teams incoming webhooks; the full object is
      // included so Zapier and friends get the fields separately.
      const r = await fetch(env.NOTIFY_WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ text, ...data, ...meta }),
      })
      r.ok ? sent.push('webhook') : failed.push(`webhook ${r.status}`)
    } catch (e) {
      failed.push(`webhook ${e.message}`)
    }
  }

  if (env.RESEND_API_KEY && env.NOTIFY_EMAIL) {
    try {
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          authorization: `Bearer ${env.RESEND_API_KEY}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          from: env.NOTIFY_FROM || 'GovernVeil site <onboarding@resend.dev>',
          to: [env.NOTIFY_EMAIL],
          reply_to: data.email,
          subject: `Enquiry — ${data.org || data.email}${meta.intent ? ' · ' + meta.intent : ''}`,
          text,
        }),
      })
      r.ok ? sent.push('email') : failed.push(`email ${r.status}`)
    } catch (e) {
      failed.push(`email ${e.message}`)
    }
  }

  if (stored || sent.length) {
    if (failed.length) console.warn('apply: partial', failed.join('; '))
    return json(200, { ok: true })
  }

  // Nothing stored and nothing delivered. Say so — the form must not claim a
  // success it cannot back up.
  console.error('apply: LOST', failed.length ? failed.join('; ') : 'no store and no channel', text)
  return json(503, {
    ok: false,
    error: 'We could not record that just now. Please email us directly and we will pick it up.',
  })
}

export const onRequestGet = () => json(405, { ok: false, error: 'POST only.' })

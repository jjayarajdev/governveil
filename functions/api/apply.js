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

const FIELDS = [
  'name', 'email', 'org', 'role', 'size', 'region', 'sector', 'question',
  // the finalised health-check / pilot questionnaire, db/0003
  'concerns', 'concerns_other', 'follow_up', 'phone', 'call_time',
]
const MAX = {
  name: 120, email: 254, org: 160, role: 120, size: 60, region: 60, sector: 60, question: 4000,
  concerns: 1000, concerns_other: 500, follow_up: 10, phone: 30, call_time: 40,
}

const LABEL = {
  name: 'Name', email: 'Email', org: 'Organisation', role: 'Role', size: 'Size', region: 'Region',
  sector: 'Sector', question: 'Question', concerns: 'Concerns', concerns_other: 'Other concern',
  follow_up: 'Follow up by', phone: 'Phone', call_time: 'Best time to call',
}

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

  // A checkbox group arrives as a list; it is stored as one readable string.
  if (Array.isArray(body.concerns)) {
    body.concerns = body.concerns.filter((c) => typeof c === 'string').join(' | ')
  }
  if (body.follow_up !== 'call') { delete body.phone; delete body.call_time }

  const data = {}
  for (const f of FIELDS) {
    const v = typeof body[f] === 'string' ? body[f].trim() : ''
    if (v) data[f] = v.slice(0, MAX[f])
  }

  if (!data.email) return json(400, { ok: false, error: 'An email address is required.' })
  if (!looksLikeEmail(data.email)) return json(400, { ok: false, error: 'That email address does not look right.' })
  if (data.follow_up === 'call' && !data.phone) {
    return json(400, { ok: false, error: 'Please add a phone number so we can call you back.' })
  }

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
    ...FIELDS.filter((f) => data[f]).map((f) => `${(LABEL[f] || f)}: ${data[f]}`),
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
           (at, site, page, intent, name, email, org, role, size, region, sector, question, country,
            concerns, concerns_other, follow_up, phone, call_time)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
      )
        .bind(
          meta.at, meta.site, meta.page || null, meta.intent || null,
          data.name || null, data.email, data.org || null, data.role || null,
          data.size || null, data.region || null, data.sector || null,
          data.question || null, meta.country || null,
          data.concerns || null, data.concerns_other || null, data.follow_up || null,
          data.phone || null, data.call_time || null
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

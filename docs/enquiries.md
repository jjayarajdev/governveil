# Where form submissions go

Everything the twenty forms collect lands in **Cloudflare D1** — no third
party, no webhook required, same account as the sites.

```
form  ->  POST /api/apply  ->  functions/api/apply.js  ->  D1: governveil-enquiries
                                                       \-> optional notification
```

| | |
|---|---|
| Database | `governveil-enquiries` |
| ID | `2df9ee22-5665-4ef7-af1b-01ceec491b3d` |
| Region | APAC |
| Binding | `DB` — on **both** Pages projects, production and preview |
| Schema | `db/0001_enquiries.sql` |

One database for both sites. The `site` column separates them, and the
questions worth asking ("who applied this week") span both anyway.

## Reading it

```sh
npm run enquiries           # 20 most recent
npm run enquiries count     # totals by site and day
npm run enquiries au        # governveil.com.au only
npm run enquiries com       # governveil.com only
npm run enquiries csv       # CSV to stdout, for a spreadsheet
npm run enquiries sql "SELECT * FROM enquiries WHERE org LIKE '%Bank%'"
```

Also visible in the dashboard: **Workers & Pages → D1 → governveil-enquiries
→ Console**.

## Why capture first, notify second

The write to D1 happens before any notification. The submission is durable
the moment it lands, so a webhook that is misconfigured, rate-limited or
retired later costs a notification — never the lead. The endpoint returns
success if the row was written **or** a channel accepted it, and fails with
503 if neither happened, so a form never claims a success it cannot back up.

## Adding a notification (optional)

D1 captures, but nothing pings you. To get told as well:

```sh
npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil
npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil-au
```

A Teams, Slack or Zapier incoming webhook. Or `RESEND_API_KEY` +
`NOTIFY_EMAIL` for email. Either is additive — the D1 row is written
regardless.

## What is stored

`at, site, page, intent, name, email, org, role, size, region, sector,
question, country`.

`intent` is which button was pressed, so "Apply to be a design partner" and
"Book a call to see the architecture" are distinguishable on a form that has
both. `country` is Cloudflare's `CF-IPCountry`, kept for context.

No IP address and no cookie. If you ever need to delete someone's record:

```sh
npm run enquiries sql "DELETE FROM enquiries WHERE email = 'them@example.com'"
```

## Verified 2 Nov 2026

Live submissions from both custom domains, including one filled and submitted
through the browser on governveil.com.au/partners, wrote complete rows with
the sector select and the intent. Test rows were deleted afterwards; the table
is empty.

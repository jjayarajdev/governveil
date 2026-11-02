# The enquiry forms

Twenty forms across the two sites — eleven on governveil.com, nine on
governveil.com.au — all post to one endpoint.

```
form  ->  POST /api/apply  ->  functions/api/apply.js  ->  your channel
```

## How it is put together

`functions/api/apply.js` is a Cloudflare Pages Function. Both deploys run
from the repo root and `wrangler pages deploy` picks up `./functions`
relative to the working directory, so **both sites get the same endpoint**
from one file.

`src/formWire.js` is wired once in each shell and delegates from the root.
The page components are generated from the design hand-off, so putting
handlers in them would mean the next regeneration silently returns the site
to inert buttons. Fields are read by id *suffix* (`-email`, `-name`, `-org`,
`-q`, …) — every page prefixes its ids differently but the suffixes agree,
which is what lets one handler cover all twenty.

The design's buttons are `type="button"`, so the click is the signal, not a
submit event. Anchors styled as buttons are navigation and are left alone.
Where a form has two buttons — "Apply to be a design partner" and "Book a
call to see the architecture" — both submit, and which one was pressed is
recorded as `intent`.

## Configure a channel — REQUIRED

**Until a channel is set, the endpoint returns 503** and the form tells the
visitor to email directly. That is deliberate. A form that accepts a
submission and drops it is worse than the inert button it replaced, because
nobody knows to follow up.

Either of these is enough. Set it on **both** projects:

```sh
# a Teams / Slack / Zapier incoming webhook
npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil
npx wrangler pages secret put NOTIFY_WEBHOOK --project-name governveil-au

# or email, via Resend
npx wrangler pages secret put RESEND_API_KEY --project-name governveil
npx wrangler pages secret put NOTIFY_EMAIL   --project-name governveil
#   ... and the same two for governveil-au
```

Values are prompted for and stored by Cloudflare — nothing lands in git.

`NOTIFY_FROM` optionally overrides the sender. Without a verified Resend
domain it must stay on their sandbox sender.

## What arrives

```
New enquiry — governveil.com.au /partners
Intent: Apply to be a design partner

Name: Priya Raman
Email: priya.raman@example.com.au
Org: Example Mutual
Sector: Banking
Question: Staff are pasting member data into assistants we do not run.

2026-11-02T03:22:49.001Z · AU
```

The webhook body carries the same fields separately, so Zapier and friends
can map them.

## Spam handling

A honeypot field is injected into every form by `formWire.js` — invisible,
`tabindex="-1"`, not in the tab order. A submission that fills it gets a 200
and goes nowhere, so a bot sees success and does not retry.

There is no rate limit. Add Turnstile if the honeypot stops being enough.

## Testing it

```sh
npm run build:au
npx wrangler pages dev dist-au --port 4182 --binding NOTIFY_WEBHOOK=http://127.0.0.1:4199/
```

Point that binding at any local listener. Checked on 2 Nov: missing email
400s, a malformed address 400s, a filled honeypot 200s silently, GET 405s,
no configured channel 503s, and a real submission arrives with every field.

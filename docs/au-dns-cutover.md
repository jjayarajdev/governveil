# governveil.com.au — DNS cutover to Cloudflare

Captured 2 Nov 2026 from live DNS. Do the steps in order; step 0 is the one
that matters.

## The risk

This domain is **not** a parked domain with a website on it. It runs
**Microsoft 365 email** — `contact@` and `privacy@` are live mailboxes. The
website is the easy part: it currently points at GoDaddy parking and nobody
will miss it. Email is what breaks, and it breaks *silently* — senders get
bounces, you get nothing, and you find out days later.

Cloudflare scans the existing zone when you add it and usually imports all of
this. **Usually is not good enough for mail.** Check every row below against
what Cloudflare imported before you change the nameservers.

## 0 · Export the zone first  — done, zone already added

GoDaddy → Domains → governveil.com.au → DNS → **Export zone file**. Keep it.
If anything goes wrong this is what you restore from, and it takes ten
seconds now versus an afternoon later.

## STATUS — verified 2 Nov 2026

The zone exists on Cloudflare (`hassan.ns.cloudflare.com`,
`pearl.ns.cloudflare.com`) in **pending** state. Querying those nameservers
directly, before delegation, shows the import caught **all seven mail records
correctly, all DNS-only**. Nothing in §1 needs entering by hand.

Note the assigned pair is *not* `george`/`virginia`, which is what
governveil.com uses. Use `hassan`/`pearl`.

DNSSEC is **off** at the registry (no DS record), so the swap is safe.

What is left:

- [ ] **GoDaddy: unlock the domain and swap the nameservers** — the only
      remaining step, and it needs the GoDaddy login.
- [ ] delete the leftover `CNAME _domainconnect` (GoDaddy-only, harmless)
- [ ] the leftover `CNAME www -> governveil.com.au` is replaced automatically
      when the Pages custom domain is added; leave it alone until then

## 1 · The records that must exist in Cloudflare

Every one of these is **DNS only** (grey cloud, not orange). Proxying mail
records breaks mail.

| Type | Name | Value | Why |
|---|---|---|---|
| MX | `@` | `governveil-com-au.mail.protection.outlook.com` (priority **0**) | inbound mail. Without it mail bounces. |
| TXT | `@` | `v=spf1 include:spf.protection.outlook.com -all` | SPF. Without it your outbound is marked spam. |
| TXT | `@` | `MS=ms82879102` | Microsoft's domain-ownership proof. Removing it can un-verify the domain in M365. |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:privacy@governveil.com.au; fo=1` | DMARC policy + reports. |
| CNAME | `selector1._domainkey` | `selector1-governveil-com-au._domainkey.omameh.e-v1.dkim.mail.microsoft` | DKIM signing key 1. |
| CNAME | `selector2._domainkey` | `selector2-governveil-com-au._domainkey.omameh.e-v1.dkim.mail.microsoft` | DKIM signing key 2 (rotation partner). |
| CNAME | `autodiscover` | `autodiscover.outlook.com` | Outlook/phone client setup. **Must be grey-cloud** or clients fail. |

Both TXT records sit on `@`. Cloudflare keeps them as two separate entries —
do not merge them into one string.

## 2 · The records to drop

| Record | Why |
|---|---|
| `A @ → 3.33.130.190` and `15.197.148.33` | GoDaddy parking. The Pages custom domain replaces these. |
| `A www → ` same pair | same. |
| `CNAME _domainconnect → _domainconnect.gd.domaincontrol.com` | GoDaddy's own provisioning hook. Meaningless off GoDaddy. |

Do **not** hand-create records for the website. Adding the custom domain to
the `governveil-au` Pages project creates the right apex and `www` records
automatically, and gets CNAME flattening on the apex, which a manual record
cannot.

## 3 · Unlock the domain

WHOIS shows **`clientUpdateProhibited`**. Nameservers cannot change while it
is set.

GoDaddy → Domains → governveil.com.au → **Domain lock / Transfer lock → off**.

Registrant and tech contact are listed as Bijal Sejpal, so that account is
the one that can do it.

## 4 · Add the zone to Cloudflare

Use the **same account that already holds governveil.com** — it is on
`george.ns.cloudflare.com` / `virginia.ns.cloudflare.com` today, so both zones
end up in one dashboard.

Add site → `governveil.com.au` → Free plan → let it scan → **check the scan
against the table in §1** → fix anything missing → Cloudflare shows you two
assigned nameservers.

They are usually, **but not always**, the same pair as governveil.com. Use
whatever that screen gives you, not the `.com` pair from memory.

## 5 · Swap the nameservers at GoDaddy

GoDaddy → Domains → governveil.com.au → Nameservers → **Change → I'll use my
own** → replace `ns69.domaincontrol.com` / `ns70.domaincontrol.com` with the
Cloudflare pair → save.

## 6 · Wait, then verify

`.au` registry NS records carry a long TTL, so allow up to 24 hours. Check:

```sh
dig +short NS governveil.com.au          # expect the Cloudflare pair
dig +short MX governveil.com.au          # must still be ...mail.protection.outlook.com
dig +short TXT governveil.com.au         # must still show the SPF line
```

Then send a test message to `contact@governveil.com.au` from an outside
address **and** send one out from it, before declaring it done. Inbound
working does not prove outbound is signing correctly.

## 7 · Then the site goes live

Once NS has moved, from this repo:

- add `governveil.com.au` and `www.governveil.com.au` as custom domains on the
  `governveil-au` Pages project
- `npm run deploy:au`

Cert issues automatically. Until then `npm run deploy:au` ships to
`governveil-au.pages.dev`, which is safe to run at any point.

## Still open before production

Separate from DNS, and tracked with the site rather than here:

1. The Acknowledgement of Country names the Gadigal people of the Eora Nation
   and "the land on which we work in Sydney"; the registered address is NSW
   2200 (Bankstown), generally recognised as Darug country.
2. Three `[Jay to confirm]` answers on `/partners`.
3. Both sites' forms have no backend — every button is inert.

Verified and not in doubt: ABN 94 703 419 194 is GOVERNVEIL PTY LTD,
Australian Private Company, active from 20 Oct 2026, NSW 2200 (ABR lookup,
and the same ABN is the auDA-validated registrant ID on the domain).

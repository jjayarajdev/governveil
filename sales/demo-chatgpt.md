# Demo 1 — chatgpt.com

75 seconds. Screen recording, burned-in captions, system voice.
Fills the "Watch it work · replays of recorded runs" gap on `/platform`,
and sits behind the booth QR.

Everything below is checked against `apps/extension` in the gateway repo —
the overlay strings are the ones the extension actually renders. Do not
improve them in the edit; if the wording looks wrong, change the extension.

## Why this scenario

The extension covers **eight public assistants**; chatgpt.com is the one
every viewer recognises without explanation, which is why it goes first.

The spine is **mask**, not block. Blocking is what every DLP tool already
claims, and it is the thing buyers have learned to distrust because their
people route around it. Mask is the proposition: *the work still happens, the
identifier does not leave.* The payoff is the **ledger row**, because that is
the part no competitor has.

Two stronger scenarios are deliberately held back for later videos: the
**drip window** (a leak assembled across six turns, which the current turn
alone would pass) and **field-level minimisation** on acknowledge. Both are
better once a viewer already believes the basic loop.

## Shot list

| Time | On screen | Caption | Narration |
|---|---|---|---|
| 0:00 | chatgpt.com, empty composer, nothing else | Your people are already using this. | Your people are already using this one. Nobody logged it. |
| 0:06 | A claims letter is typed in, carrying a tax file number and a Medicare number. Enter. | A real prompt. A real customer record. | A claims officer drafts a letter to a customer. Their tax file number goes in with it. |
| 0:16 | The send visibly holds. GovernVeil toast: **2 values masked**. | Checked before it left the browser. | GovernVeil holds the send, decides inside your own network, and replaces the identifiers. |
| 0:26 | The sent message reads `[TFN_1]` and `[MEDICARE_1]`. The assistant answers normally. | The assistant answers. It never saw the real values. | The model still answers. It never saw the real numbers. Nobody was stopped from working. |
| 0:36 | Console → Evidence → the ledger row: verdict, who, when, previous hash. | Signed before the reply came back. | The decision is written to a hash-chained ledger before the reply arrives. Who sent it, what was found, what was done. |
| 0:50 | `GET /attestation` → `non_allowlisted_egress_attempts: 0` | Zero is the proof. | And your security team can pull a signed statement that nothing left to reach that verdict. Zero is the proof, not a promise. |
| 1:02 | GovernVeil mark · governveil.com.au · three free pilot places | Eight public assistants. Your own environment. | Eight public assistants, your applications, and your agents — all on the same ledger. Five weeks in your environment. Three places, free. |

~140 words of narration. At a natural system-voice pace that lands near 75
seconds with room to breathe. If it runs long, cut the first line, not the
ledger.

## Production notes

**Build.** Use `apps/extension/builds/local/` — it points at
`http://localhost:8080`, which is the local demo gateway. Never record a
build pointed at a pilot tenant.

**Identifiers must be synthetic.** Use the same values the site uses —
`123 456 789` and `2123 45678 1`. A real tax file number or Medicare number
must never be typed on camera, in any take, even one you intend to cut. They
are government identifiers and the recording outlives the edit.

**Never in frame:** the install token, the `Authorization` header, a real
`tenant_id` or `user_id`, any real customer name, and the options page with
a populated gateway URL.

**Capture.** 1920×1080, 30 fps, system cursor, no click-ring effects, no
zoom-punch transitions. Record each beat as its own take and cut the dead
air — do not speed-ramp the verdict, because the honest latency is the point
and it is already fast.

**Captions are not optional.** Most of this is watched muted, at a booth, over
noise. Burn them in; do not rely on platform auto-captions, which will mangle
"TFN" and "GovernVeil".

**Voice.** A neutral Australian English system voice. Short sentences, no
acronym the voice has to spell. "Tax file number", not "T F N".

## Claims check

Everything the script says is already true and already on the site:

- Hold-then-decide on `chatgpt.com` — `fetch` hook on `/backend-api/conversation`.
- Mask applies the gateway's surrogate pairs to the outbound body; the toast
  reports the count.
- Eight public assistants — eleven hosts in the manifest, eight assistants.
- The ledger row is hash-chained and written before the reply.
- `non_allowlisted_egress_attempts: 0` is the attestation's number.

Do **not** add, and do not let an edit imply: that egress enforcement is on by
default (it ships in observe mode), that GovernVeil is certified against
anything, or that OpenAI endorses or partners in this. Showing the chatgpt.com
UI as a governed surface is fine; dressing the overlay to look like part of
ChatGPT is not.

## After this one

1. **The drip window** — six turns, each innocent, together a leak. The
   single most differentiated thing the extension does.
2. **Acknowledge with field-level minimisation** — the checkbox card, a
   reason, a reference, recorded without the values.
3. **An agent, not a person** — `tools/call` judged three times. This is the
   one that answers the question every MCP explainer leaves hanging: once the
   server does the work, who checked what left?

---

# Demo 2 — the enterprise API (`/gw/claims`)

Same length, same system, deliberately a different story. Demo 1 is a person
and a browser; this one is a machine calling your Claims system, and the
mechanics genuinely differ.

Explainer: `sales/demo/explainer-api.html`

## What makes this surface different

Three things demo 1 cannot show, all from the gateway's own config model
(`apigateway.App`: `Prefix`, `UpstreamURL`, `DefaultDeny`, `RoleSource`,
`RoleScopes`):

1. **Role, then scope, then operation — resolved before any content is
   read.** The cheapest possible refusal, and the request body is never
   opened. In demo 1 the content *is* the question; here the caller's
   entitlement is settled first.
2. **The default is deny.** An application nobody registered gets nothing.
3. **The refusal is a ledger row.** A denial nobody can see is not a control.

And one thing worth saying out loud to an architect: **the Claims system does
not change.** No SDK, no code change — it serves a normal caller on its own
network.

## The run

| Beat | Shows |
|---|---|
| 1 | Your claims system already has an API. Other applications already call it. |
| 2 | A partner's reporting tool asks for a bulk export. |
| 3 | Role → scope → operation, resolved before any content is read. |
| 4 | It may read one claim, not export a thousand. **403, body never opened.** |
| 5 | The refusal is the evidence, and it never left your perimeter. |
| 6 | The same tool asks for the one claim it is entitled to. That passes. |
| 7 | A reply leaks as easily as a request — the response runs the same ladder. |
| 8 | Two values masked on the way out. |
| 9 | Both decisions on the same chain as every prompt, probe and policy change. |
| 10 | Four surfaces. One engine. One ledger. |

## Recording it for real

Same rules as demo 1 — synthetic identifiers only, nothing in frame that
shows a token or a real tenant. For this surface you additionally need a
registered app in the config bundle (`id`, `prefix`, `upstreamURL`,
`roleScopes`) and two service tokens: one whose role lacks the export scope,
one that may read a single claim. Record the 403 first; it is the beat people
remember.

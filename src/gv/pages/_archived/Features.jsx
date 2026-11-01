import { Link } from 'react-router-dom'
import { Shot } from '../../components/figma'
import { Band, Cta, Eyebrow, HowItWorks, SectionHead, Table, Tag } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const { about: ABOUT } = REGION_CONTENT[readRegion()]

/* Five capability groups. Each card: the verdict it produces, its shipping
   label, a one-line claim, the scope, and the mechanism behind a disclosure.
   Nothing here is an adjective without a mechanism under it. */
const GROUPS = [
  ['01 · Control the egress', [
    {
      tags: [['mask', 'mask'], ['optin', 'opt-in · off by default']],
      h: 'Reversible masking',
      lead: 'The work continues. The data never leaves.',
      p: `Format-preserving surrogates outbound, deterministic per value, restored in
          the API response. Originals are sealed with AES-256-GCM under a KEK-wrapped
          key that rotates online; idle mappings are swept after 30 days; tenant or
          conversation purge and single-value erasure are supported, and every vault
          event is a row on the ledger.`,
      how: <>Persist-before-forward: if the mapping cannot be saved, the gateway falls
        back to destructive redaction rather than emitting a surrogate it cannot
        reverse, and if no redaction is available at all the request blocks. The browser
        path is outbound-only by design: stand-ins appear on screen.
        Off by default (<span className="mono">FF_REVERSIBLE_MASK</span>); your pilot
        decides.</>,
    },
    {
      tags: [['block', 'block'], ['ship', 'shipping']],
      h: 'Shadow-AI browser extension',
      lead: 'Eight public assistants, no MDM dependency.',
      p: `Prompts and attachments are checked before they leave the browser, with the
          verdict enforced in the assistant page itself and an in-page notice explaining
          it. Egress policy is pulled centrally per destination. Settings, the install
          token and per-user attribution are pushed by managed browser policy, so every
          ledger row names a person.`,
      how: <>An MV3 extension intercepts fetch, XHR and WebSocket, asks the gateway with
        a data-path token, and blocks, masks or raises an acknowledgement card in place.
        Attachments go through the document guardrail before the upload proceeds. A
        forward-proxy variant covers any HTTP client at the network level, returning 403
        before traffic leaves. The extension re-attaches itself to open tabs after a
        browser or extension reload.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Multi-turn drip detection',
      lead: 'Catches an identity assembled across a conversation, not just one prompt.',
      p: `Public assistants transmit only the new turn, so the extension keeps a rolling
          window per conversation — roughly six turns and four thousand characters — and
          evaluates the whole window. A member identity drip-fed over five turns is
          caught together.`,
      how: <>Hard identifiers appearing in the final turn block outright; accumulation
        across the window lands in review rather than blocking, so a long legitimate
        conversation is not punished for its length. The window is scoped per
        conversation, not per user.</>,
    },
    {
      tags: [['block', 'block'], ['ship', 'shipping']],
      h: 'Document-upload hostile-content sweep',
      lead: 'Files are prompts too.',
      p: `Uploaded and embedded documents are parsed into a normalised segment list with
          provenance, then swept for macros, PDF actions and JavaScript, hidden and
          white text, comments and tracked changes, hidden sheets, formula payloads,
          field codes, zero-width and right-to-left override characters, zip bombs, and
          encrypted or corrupt files.`,
      how: <>A deterministic table decides allow, allow-tagged, redact, quarantine or
        block. Models produce scores; only the table produces decisions. Every error
        path is quarantine, never allow. Quarantined files sit in a bucket no downstream
        consumer can read, with a reviewer queue where release and block are both
        logged.</>,
    },
    {
      tags: [['block', 'block'], ['ship', 'shipping']],
      h: 'Response inspection',
      lead: 'The model’s output runs the same gauntlet as its input.',
      p: `Every response — JSON or stream, tool-call arguments included — runs the same
          ladder and the same policy chain on the way back. Injected, harmful or toxic
          output is withheld with a valid content-filter payload; personal data or
          secrets the caller never sent are redacted; business-sensitive output is
          flagged.`,
      how: <>Enforce acts; observe records what enforce would have done, so you can
        measure the blast radius before you turn it on. Streaming responses are
        inspected as they arrive rather than buffered to completion.</>,
    },
  ]],

  ['02 · Detect with local ML', [
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Content detection ladder',
      lead: 'Every verdict computed inside your walls.',
      p: `A fast pattern path covers US and India PII — SSN, card, PAN, GSTIN, IFSC,
          Aadhaar — plus credentials and injection phrases, in under a millisecond. Then
          one compact local model covers injection, PII, toxicity, business-critical,
          harmful intent and the safety guard in a single forward pass, with a companion
          model extracting PII spans.`,
      how: <>Detectors are pipeline stages, not special cases, so a new one is added
        without touching the proxy. The classic five-model stack remains available as a
        fallback by unsetting one environment variable. Under strict validation a
        model-server error is a block, never a skip — a detection outage cannot become a
        silent allow.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Policy-adaptive, no retraining',
      lead: 'Change what’s caught by editing the question, not by training a model.',
      p: `Each policy is a yes/no question the local model answers about the prompt.
          Tune detection by rewording the question — no per-client training, and no data
          leaving your perimeter to fine-tune a vendor’s model.`,
      how: <>A worked example:{' '}
        <span className="mono">“{ABOUT.workedPolicy}”</span>{' '}
        A review and labelling queue turns your own traffic into a ground-truth corpus
        you can score in-house, so the detector improves on your data without your data
        moving.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Signed no-egress attestation',
      lead: '“Where does the prompt go for a verdict?” Nowhere — and here is the signature.',
      p: `An endpoint returns an HMAC-signed statement naming the local inference
          endpoint, the device, the egress allow-list, and the count of non-allow-listed
          egress attempts observed this run. Zero is the proof.`,
      how: <><span className="mono">make attest</span> pulls it for your security team,
        so the core claim becomes something they verify rather than something they take
        on trust. The allow-list can also be enforced, not merely observed. See{' '}
        <Link className="link" to="/security">Security</Link> for the full payload.</>,
    },
  ]],

  ['03 · Govern the estate', [
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Asset registry',
      lead: 'You cannot govern what you cannot name.',
      p: `Every application, model and agent, with a named business and technical owner,
          a profile (data classes, jurisdictions, consequence tier, external exposure)
          and a lifecycle. Traffic attributes to the asset that owns it.`,
      how: <>Registering a <span className="mono">/gw</span> service or a vendor agent
        creates its asset automatically, so the registry cannot drift behind what the
        gateway is actually governing. The gateway’s own actors are excluded — your
        estate is your estate.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Control catalogue and state',
      lead: 'Green because the ledger says so, not because someone ticked a box.',
      p: `Sixteen controls across governance, privacy, security and ethics, each
          enforced, detective or attested. State — holding, attempted-held, weak,
          breached or untested — is computed from the ledger over a window.`,
      how: <>State is derived from control fires, breaches, would-have-blocked records,
        attestation expiry and the date of the last probe challenge. An attestation that
        lapses turns its control untested rather than leaving it green.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Detective mode',
      lead: 'Observe before you enforce.',
      p: `A control in detective mode is evaluated but does not act. The request is
          recorded as “would have blocked” and evaluation continues, so an enforced
          control still blocks in the same pass. You see the blast radius before you
          take it.`,
      how: <>Flip a control to enforce and it takes effect within ten seconds — the
        engine snapshot and the fast-path patterns reload on write, so there is no cache
        to wait on.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Precedent inheritance',
      lead: 'The tenth asset is approved in minutes, because it inherits the ninth.',
      p: `A new asset inherits the control set of the nearest approved asset of the same
          type, by profile similarity. The reviewer sees only the delta — Keep or Drop,
          each a signed decision — not a blank sixteen-control form.`,
      how: <>Similarity is thresholded from 0.5, and the owner may force a base below it
        deliberately. Later changes to the base asset are never propagated silently;
        inheritance is a decision taken once, on the record.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Gap assessment, manifest, attestation',
      lead: 'The artefacts your compliance team actually asks for.',
      p: `Required versus present controls, exportable. A machine-readable per-asset
          control manifest for build time. An attestation cycle with a tier-based
          cadence.`,
      how: <>A signature is refused while an unlisted exception is open, so an
        attestation cannot paper over a known gap. Expiry turns the control untested
        rather than leaving the board stale.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Policy library',
      lead: 'Your written policy, mapped to what the gateway actually does.',
      p: `Ingest your AI acceptable-use policy, data standard or third-party AI policy
          as immutable numbered clause versions. Each clause maps to a catalogue
          control, or derives one in the clause’s own words.`,
      how: <>Mapping suggestions come from the local model; confirmation is a decision on
        the chain, so the mapping has provenance. A changed clause flags every mapping it
        touches for review. No written policy yet? Adopt the catalogue and edit from
        there.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Policy drift',
      lead: 'The report only both halves can produce.',
      p: `Over 30 or 90 days: clauses never exercised, enforcement with no clause behind
          it, overrides clustering on one control, and exceptions never closed. Because
          the policy library and the ledger live in the same system, drift is computable
          rather than an interview exercise.`,
      how: <>Stored with its hash, recorded as a decision on the chain, and exported as
        Markdown or a printable page for a committee pack.</>,
    },
  ]],

  ['04 · Govern agents and models', [
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Vendor & agent credential governance',
      lead: 'One grant, many systems, one kill switch — enforced on the data path.',
      p: `Vendors hold agents; agents hold scoped grants; grants decide which systems
          each may reach. Revoke a grant and every tied key returns 401 on its next
          call, with out-of-scope paths refused before any upstream is contacted.`,
      how: <>The revoked-grant check runs first in the pipeline, so a kill switch is
        about half a millisecond, not a propagation delay. A grant dormant past 30 days
        that suddenly wakes raises an incident with a 14-day clock and optional
        auto-freeze, and containment can revoke in the same audited step.</>,
    },
    {
      tags: [['block', 'block'], ['ship', 'shipping']],
      h: 'Agent action governance',
      lead: 'Actors, not just credentials.',
      p: `An agent’s declared limits are enforced per request: tools outside its
          allow-list refuse, an hourly call cap and a daily spend cap counted from the
          ledger refuse, and gated actions are held for the owner, whose approval — with
          an expiry — lets the next matching call through.`,
      how: <>Every enforcement appears as a fired control on the audit row (AG-11 tool
        allow-list, AG-12 caps, HL-09 human gate), so an agent’s behaviour is evidence
        rather than a log line.</>,
    },
    {
      tags: [['mask', 'mask'], ['ship', 'shipping']],
      h: 'MCP connector',
      lead: 'Governance at the point the agent actually acts.',
      p: `One process sits between an MCP client and its servers and asks the gateway
          before and after every tool call. The tool list is shaped by the agent’s
          limits; arguments are governed, inspected and masked before the tool runs;
          results are inspected and restored before the agent sees them. Each phase is a
          ledger row.`,
      how: <>Tool servers are registered as vendor agents, so revoking a grant is a kill
        switch for every tool they offer. HTTP servers must pass the egress allow-list,
        server-initiated sampling is refused, and poisoned tool descriptions are hidden
        from the agent. Tool descriptions are judged once at discovery and re-judged
        after any policy change or restart.</>,
    },
    {
      tags: [['block', 'block'], ['ship', 'shipping']],
      h: 'Model registry',
      lead: 'Only approved models, within their permitted data classes.',
      p: <>A model must be approved, in the caller’s permitted list, and permitted for
        the data classes still present <em>after</em> masking — so masked PII to a
        frontier model passes, while unmasked health data goes only where it is
        permitted.</>,
      how: <>Lifecycle runs draft → approved → deprecated (with a named successor) →
        retired, and a retired model blocks in every mode. A registry base URL routes
        self-hosted models; a registry price overrides the cost table; a discovery call
        registers what the ledger has already seen.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'API access scope-gating',
      lead: 'Not just LLM traffic.',
      p: `Any enterprise API governed by role → scope → operation, with content
          inspection behind it. The role comes from the app’s own login token or a
          header; a viewer reads and cannot delete.`,
      how: <>The check resolves at the reverse proxy before content inspection runs, so a
        denial costs nothing and never leaves the perimeter. None of the endpoint or SSE
        DLP vendors we profiled has this.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Cost on every row',
      lead: 'Chargeback as a ledger fact.',
      p: `Per-request cost from a configurable price table with longest-prefix model
          matching, so agent spend caps and departmental chargeback are computed from
          evidence rather than estimated.`,
      how: <>This is the provider’s inference charge on the forward path — attribution,
        never a GovernVeil charge. Detection never calls a provider, and the shadow-AI
        surfaces forward nothing, so there is no cost there. Attribution is optional and
        ships switched off until you wire the registry prices.</>,
    },
  ]],

  ['05 · Prove it', [
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Synthetic probes',
      lead: 'Controls proven, not just monitored.',
      p: `For every enforced control: a control probe (the canonical trigger, which must
          act), an override probe (a benign near-miss, which must pass), and a bypass
          probe (an evasion, which must still be stopped). Sent daily at a quiet hour,
          and on demand.`,
      how: <>Probes travel the real data path under a probe identity and are tagged
        synthetic on both the ledger and the evidence row, so they never inflate your
        traffic numbers. They are judged from the evidence they produced, not from the
        response code. “Last challenged” is a column on the control board, and a probe
        run exports as evidence. Attested controls are not challengeable by design.</>,
    },
    {
      tags: [['flag', 'flag'], ['ship', 'shipping']],
      h: 'Coverage from independent telemetry',
      lead: 'Governed divided by detected — measured by something the gateway does not control.',
      p: `Import Route 53 resolver logs, Zscaler web logs, any CSV with a header, or push
          from a collector. Events to the AI destination catalogue split into gateway
          egress (governed) and everything else (direct, which is bypass).`,
      how: <>With no telemetry in the window the number shows{' '}
        <span className="mono">unknown</span>, never a guess — and the console says
        plainly that until telemetry is connected every other number is the gateway’s own
        count. Direct clients form the shadow list and attribute back to assets. It is
        the first number on Posture for a reason.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Tamper-evident audit',
      lead: 'The court of record for every AI decision.',
      p: `A hash-chained ledger with a trigger-assigned sequence, daily anchors and a
          standalone verifier CLI. Rows are append-only: no code path and no migration
          updates or deletes one.`,
      how: <>Exports: ledger and decisions over the API; gap assessments and drift
        reports as Markdown or HTML; governance events to stdout, Datadog or CloudWatch.
        The decision reason is persisted on every row, so the durable ledger — not just
        the event stream — can say why a request was refused.</>,
    },
    {
      tags: [['mask', 'mask'], ['ship', 'shipping']],
      h: 'Graduated verdicts',
      lead: 'Five outcomes, configurable per detector, per policy, per asset.',
      p: `allow, flag, mask, acknowledge and block — so you can keep work moving safely,
          put a human in the loop, or stop a send, without the kill switch being your
          only tool.`,
      how: <>When several policies match one prompt the most restrictive verdict wins,
        then severity, then stage order. The resolution is deterministic and tested as an
        invariant, so the same prompt cannot attribute to a different policy on a
        different run.</>,
    },
    {
      tags: [['allow', 'allow'], ['ship', 'shipping']],
      h: 'Reproducible benchmark',
      lead: 'Run it against your own stack, with no cloud calls.',
      p: <>Labelled corpora and the runner are committed. The same datasets, policies and
        model produce the same numbers, on your hardware. Current headline on the{' '}
        <span className="mono">combined-1000</span> corpus: recall 93.25&nbsp;%,
        precision 100&nbsp;%, false-positive rate 0&nbsp;%, F1 96.51.</>,
      how: <>We publish the low rows too — PII at 80&nbsp;% and business-sensitive at
        66.7&nbsp;% — because that is where the flag tier and your own labelled traffic
        do the work. See the{' '}
        <Link className="link" to="/benchmark">full benchmark</Link>.</>,
    },
  ]],
]

const VERDICT_ROWS = [
  ['allow', 'Forwarded unchanged.', 'every surface'],
  ['flag', 'Sent, and raised for human review.', 'every surface'],
  ['mask',
    'Sensitive spans replaced with stand-ins; the rest forwarded. Real values restored inbound when the vault is on.',
    'every surface'],
  ['ack',
    'The person minimises the fields, states why, and sends. The choice is a signed decision; a reviewer’s later verdict is a second one.',
    <>browser extension; degrades to <span className="mono">mask</span> on{' '}
      <span className="mono">/v1</span></>],
  ['block', 'Send cancelled, and ledgered on the spot.', 'every surface'],
]

const VERDICT_LABEL = { ack: 'acknowledge' }

export default function Features() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Features</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '18ch' }}>
            Everything GovernVeil enforces — and <em>measures</em>.
          </h1>
          <p className="lede">
            Each capability is scoped precisely, with no adjectives that don’t have a
            mechanism behind them. Everything here ships today; a capability that is
            off by default carries an <Tag k="optin">opt-in</Tag> tag.
          </p>
        </div>
      </section>

      <Band sunken>
        <SectionHead
          eyebrow="The verdicts"
          title="Every request ends in one of five audited verdicts."
        />
        <Table head={<>
          <th style={{ width: 150 }}>Verdict</th><th>What happens</th><th>Where it applies</th>
        </>}>
          {VERDICT_ROWS.map(([k, what, where]) => (
            <tr key={k}>
              <td><Tag k={k}>{VERDICT_LABEL[k] || k}</Tag></td>
              <td>{what}</td>
              <td>{where}</td>
            </tr>
          ))}
        </Table>
        <p className="small dim" style={{ marginTop: 16 }}>
          A refused request’s ledger row always reads <span className="mono">block</span>,
          whatever the matching policy’s own verdict was. No policy engine reachable
          still blocks on raw findings — the data path never fails open.
        </p>
      </Band>

      {GROUPS.map(([title, cards], i) => (
        <Band sunken={i % 2 === 1} key={title}>
          {/* The group title is the section heading. The source HTML carried an
              empty <h2> under each eyebrow; an empty heading is a defect in the
              document outline, so the eyebrow is the heading here instead. */}
          <div className="section-head">
            <h2 className="eyebrow">{title}</h2>
          </div>
          <div className="grid cols-3">
            {cards.map((c) => (
              <div className="card" key={c.h}>
                <div className="tag-row tag-row-head">
                  {c.tags.map(([k, label]) => <Tag k={k} key={k}>{label}</Tag>)}
                </div>
                <h3 className="h-sub">{c.h}</h3>
                <p className="card-lead">{c.lead}</p>
                <p>{c.p}</p>
                <HowItWorks>{c.how}</HowItWorks>
              </div>
            ))}
          </div>
          {title.startsWith('03') && (
            <div style={{ marginTop: 40 }}>
              <Shot
                className="shot"
                src="policies"
                alt="The GovernVeil policies page, each policy written as a readable sentence with its verdict, stage and 30-day activity."
              >
                <b>Each policy is written as a sentence anyone can read.</b> The verdict
                tag, the stage it runs at, what it acted on over 30 days and how often
                it was overridden — and whether it is in force or dormant.
              </Shot>
            </div>
          )}
        </Band>
      ))}


      <Cta />
    </>
  )
}

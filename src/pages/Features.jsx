import { Col, Collapse, Row, Typography } from 'antd'
import Reveal from '../components/Reveal'
import { Verdict, FigPageHeader, PilotBand, RoadmapNote, VerdictLegend, Shot } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const BENCH_HEADLINE = [
  ['recall', '93.25 %'],
  ['precision', '100 %'],
  ['false-positive rate', '0 % (0 of 200 benign)'],
  ['F1', '96.51'],
]

const BENCH_POLICY = [
  ['harmful intent (AdvBench 500)', '98.8 %'],
  ['toxicity', '99.0 %'],
  ['prompt injection', '92.0 %'],
  ['PII', '80.0 %'],
  ['business-sensitive', '66.7 %'],
]

const GROUPS = [
  {
    eyebrow: 'Control the egress',
    title: 'Nothing sensitive leaves — and the work never stops.',
    features: [
      {
        title: 'Reversible masking',
        promise: 'The work continues. The data never leaves.',
        body: 'Format-preserving surrogates outbound, deterministic per value, restored in the API response. Originals sealed with AES-256-GCM under a KEK-wrapped key that rotates online; idle mappings swept after 30 days; tenant or conversation purge and one-value erasure; every vault event on the ledger.',
        how: "Persist-before-forward — if the mapping can't be saved, the gateway falls back to destructive redaction; a surrogate never leaves without its mapping stored. Browser path is outbound-only by design (stand-ins on screen; restoring a third-party web UI's rendered turns isn't reliably achievable, so we don't claim it).",
        verdict: 'mask',
        optin: 'Built, off by default — your pilot decides. Until you turn on the vault, both paths redact outbound.',
      },
      {
        title: 'Shadow-AI browser extension',
        promise: 'Governs the public AI assistants your people already use — no MDM dependency.',
        body: 'Block, or mask outbound, in the assistant page itself; in-page review notice; egress policy pulled centrally per destination. Forward-proxy/ICAP variant for network-level coverage of any HTTP client.',
        how: 'Extension intercepts prompts before submission. Verdict is applied locally. No traffic modification visible to the platform provider.',
        verdict: 'block',
      },
      {
        title: 'Multi-turn drip detection',
        promise: 'Catches sensitive data assembled across a conversation, not just single prompts.',
        body: 'Public AI assistants only transmit the new turn, so the extension keeps a rolling buffer per conversation and evaluates the accumulated window. A member identity assembled over five turns is caught together.',
        how: 'A rolling window of recent turns (~6 turns, 4,000-character cap) per conversation — bounded to stay fast, reset with each new chat. Hard identifiers in the final turn block outright; an accumulation of individually-innocuous turns lands in the review tier, which is correct — no false alarms on random digits.',
        verdict: 'flag',
      },
      {
        title: 'Document-upload hostile-content sweep',
        promise: 'Cleans documents before they reach any model or RAG pipeline.',
        body: 'Uploaded (/v1/documents/scan) and embedded documents parse to a normalised segment list with provenance, then are swept for macros, PDF actions and JavaScript, hidden and white text, comments, hidden sheets, formula payloads, field codes, zero-width and RTL-override characters, zip bombs, encrypted or corrupt files.',
        how: 'A deterministic table decides allow / allow-tagged / redact / quarantine / block; models score, only the table decides; every error path is quarantine, never allow. Quarantined files sit in a bucket no downstream consumer can read, with a reviewer queue (release or block, both logged).',
        verdict: 'block',
      },
      {
        title: 'Response inspection',
        promise: 'Model output is a prompt too.',
        body: 'Every response — JSON or stream, tool-call arguments included — runs the same ladder and policy chain. Enforce withholds injection, harm or toxicity with a valid content_filter payload, redacts personal data or secrets the caller did not send, flags business-sensitive output.',
        how: 'Observe mode records what enforce would have done, so you can watch a week of would-blocks before turning it on.',
        verdict: 'block',
      },
    ],
  },
  {
    eyebrow: 'Detect with local ML',
    title: 'Every verdict computed in your walls.',
    features: [
      {
        title: 'Content detection ladder',
        promise: 'A fast pattern path, then one local policy-adaptive model — milliseconds, nothing external.',
        body: 'Fast path (US and India PII: SSN, card, PAN, GSTIN, IFSC, Aadhaar; credentials; injection phrases), then one local policy-adaptive model covering injection, PII, toxicity, business-critical, harmful-intent and the safety guard in a single forward pass; a companion model extracts PII spans.',
        how: 'All inference runs in your environment on your GPU — no prompt fragments sent to any vendor cloud for detection. The earlier multi-model stack remains as a fallback.',
        verdict: 'flag',
      },
      {
        title: 'Policy-adaptive, no retraining',
        promise: "Change what's blocked by editing the question, not by training a model.",
        body: 'One model answers every policy as a plain-language yes/no question in a single forward pass. Tuning detection means editing the question — no per-client model training, and no data leaving your perimeter to fine-tune a vendor’s model.',
        how: 'A review/labeling queue turns your real traffic into a ground-truth corpus, so you can measure accuracy on your own data, in-house, without it leaving.',
        verdict: 'flag',
      },
      {
        title: 'Signed no-egress attestation',
        promise: '"Where does the prompt go for a verdict?" — nowhere, and here is the signature.',
        body: 'GET /api/v1/attestation returns an HMAC-signed statement: inference local, the device, the egress allow-list, and the count of non-allow-listed egress attempts observed. Zero is the proof.',
        how: 'make attest pulls it for your security team; the same statement backs the pilot week-one demo.',
        verdict: 'allow',
      },
    ],
  },
  {
    eyebrow: 'Govern the estate',
    title: 'You cannot govern what you cannot name.',
    features: [
      {
        title: 'Asset registry',
        promise: 'Every application, model and agent — named, owned, profiled.',
        body: 'Every asset carries a named business and technical owner, a profile (data classes, jurisdictions, consequence tier, external exposure) and a lifecycle; traffic attributes to the asset that owns it.',
        how: 'Registering a /gw service or a vendor agent creates its asset; unregistered traffic surfaces so nothing stays anonymous.',
        verdict: 'allow',
      },
      {
        title: 'Control catalogue and state',
        promise: 'Sixteen controls; state computed from the ledger, not asserted.',
        body: 'Sixteen controls across governance, privacy, security and ethics; each enforced, detective or attested. State — holding / attempted-held / weak / breached / untested — is computed from the ledger, with fires, breaches, would-blocks, attestation expiry and last probe challenge.',
        how: 'Examples: personal data masked before it leaves; injection blocked; documents scanned; only approved models; output inspected; idle credentials expire; a human reviews binding actions; fairness, attested.',
        verdict: 'flag',
      },
      {
        title: 'Detective mode',
        promise: 'Observe before you enforce.',
        body: 'A control in detective mode is evaluated but does not act; the request is recorded as "would have blocked"; evaluation continues so an enforced control still blocks.',
        how: 'Flip to enforce and it takes effect within ten seconds.',
        verdict: 'flag',
      },
      {
        title: 'Precedent',
        promise: 'The tenth asset is approved in minutes, because it inherits the ninth.',
        body: 'A new asset inherits the control set of the nearest approved asset of the same type (profile similarity from 0.5; the owner may force a base below it). The reviewer sees only the delta — Keep / Drop, each a signed decision.',
        how: 'Later changes to the base are never propagated silently.',
        verdict: 'allow',
      },
      {
        title: 'Gap assessment, manifest, attestation',
        promise: 'Required vs present, exportable — and signatures that expire.',
        body: 'A gap assessment of required-vs-present controls, exportable. A machine-readable per-asset control manifest for build time. An attestation cycle with tier-based cadence.',
        how: 'A signature is refused while an unlisted exception is open; expiry turns the control untested.',
        verdict: 'flag',
      },
      {
        title: 'Policy library',
        promise: 'Your own policy, as immutable clauses mapped to controls.',
        body: "Ingest your AI acceptable-use policy, data standard or third-party AI policy (text, Markdown, PDF) as immutable numbered clauses. Each clause maps to a catalogue control or derives one in the clause's own words; suggestions come from the local model; confirmation is a decision on the chain.",
        how: 'A changed clause flags every mapping for review. No written policy yet? Adopt the catalogue as your policy and edit from there.',
        verdict: 'allow',
      },
      {
        title: 'Policy drift',
        promise: 'The report only both halves can produce.',
        body: 'Over 30 or 90 days: clauses never exercised, enforcement with no clause behind it, overrides clustering on one control, exceptions never closed.',
        how: 'Stored with its hash, recorded as a decision, exported as Markdown or a printable page.',
        verdict: 'flag',
      },
    ],
  },
  {
    eyebrow: 'Govern agents and models',
    title: 'Actors, not just credentials.',
    features: [
      {
        title: 'Vendor & agent credential governance',
        promise: 'One grant, many systems, one kill-switch — enforced on the data path.',
        body: "Vendors → agents → scoped grants; revoke and every tied aigw_ key returns 401 on the next call; out-of-scope paths 403 before any upstream is contacted. Dormant grants raise an incident on wake, with a 14-day clock and optional auto-freeze.",
        how: "Grant-tied aigw_ keys are checked in data-path auth for grant status and required scope per path. That's the forgotten-grant breach — the offboarded vendor still holding a live key — contained in seconds.",
        verdict: 'flag',
        roadmap: 'External notification dispatch (email / SMS / webhook) for incidents.',
      },
      {
        title: 'Agent action governance',
        promise: "An agent's declared limits, enforced per request.",
        body: 'Tools outside its allow-list refuse; hourly call cap and daily spend cap, counted from the ledger, refuse; gated actions are held for the owner, whose approval decision — with an expiry — lets the next matching call through.',
        how: 'Every enforcement is a fired control on the audit row.',
        verdict: 'block',
      },
      {
        title: 'MCP connector',
        promise: 'Every agent tool call listed, governed, masked, inspected and restored.',
        body: "One process between an MCP client and its servers, asking the gateway before and after every tool call: the tool list is shaped by the agent's limits, arguments are governed, inspected and masked before the tool runs, results inspected and restored before the agent sees them; each phase is a ledger row.",
        how: 'Tool servers are registered as vendor agents (revoke = kill switch for every tool they offer); HTTP servers must pass the egress allow-list; poisoned tool descriptions are hidden; server-initiated sampling is refused; an MCP detection corpus scores it all.',
        verdict: 'mask',
      },
      {
        title: 'Model registry',
        promise: 'Only approved models receive traffic — checked after masking.',
        body: 'Every request routes only to an approved model, within its permitted data classes, checked after masking: masked PII to a frontier model passes; unmasked health data goes only where permitted. Lifecycle draft → approved → deprecated (successor named) → retired; retired blocks in every mode.',
        how: 'A registry base URL routes self-hosted models; a registry price overrides the cost table; model discovery registers what the ledger already saw.',
        verdict: 'block',
      },
      {
        title: 'API access scope-gating (Access plane)',
        promise: 'Governs any enterprise API by role → scope, with content inspection.',
        body: "Not just LLM traffic. Every enterprise API call is checked for role-to-scope alignment before any content inspection runs; role comes from the app's own login token or a header. None of the endpoint/SSE DLP vendors profiled has this.",
        how: 'Every request to /gw/<app> is checked against a role → scope policy. Out-of-scope requests return 403 and are logged. Never forwarded.',
        verdict: 'allow',
      },
      {
        title: 'Cost on every row',
        promise: 'Spend caps and chargeback as ledger facts.',
        body: 'Per-request cost from a config-driven price table (longest-prefix model match; a registry price overrides), written to every ledger row.',
        how: "Daily agent spend caps count from the ledger, so a cap is enforced against what actually happened, not an estimate.",
        verdict: 'allow',
      },
    ],
  },
  {
    eyebrow: 'Prove it',
    title: 'Controls proven, not just monitored.',
    features: [
      {
        title: 'Synthetic probes',
        promise: 'Every enforced control challenged daily.',
        body: 'For every enforced control: a control probe (canonical trigger, must act), an override probe (benign near-miss, must pass), a bypass probe (evasion, must still stop). Sent through the real data path under a probe identity, daily at a quiet hour and on demand, tagged synthetic on the ledger so they never count as traffic; judged from the evidence they produced.',
        how: '"Last challenged" is a column on the control board. Attested controls are not challengeable by design; the human-oversight control is probed and reports its known gap.',
        verdict: 'flag',
      },
      {
        title: 'Coverage from independent telemetry',
        promise: 'Governed ÷ detected — from a source the gateway does not control.',
        body: 'DNS resolver logs, secure-web-gateway logs, any CSV with a header, or a collector push. Events to the AI destination catalogue split into gateway egress (governed) and everything else (direct = bypass). No telemetry in the window shows unknown — never a guess.',
        how: 'Direct clients form the shadow list and attribute to assets. The first number on Posture.',
        verdict: 'flag',
      },
      {
        title: 'Tamper-evident audit',
        promise: 'Every request logged with a hash-chain of custody.',
        body: 'Hash-chained ledger (trigger-assigned sequence, SHA-256(prev_hash | row)), daily anchors, standalone verifier CLI. Exports: ledger and decisions (API), gap assessments and drift reports (Markdown / HTML), governance events to your logging stack.',
        how: 'Each audit record carries the hash of the previous record. Any tampering breaks the chain, and the verifier catches it.',
        verdict: 'allow',
        roadmap: 'Native SIEM-specific emitters are on the roadmap — export ships today.',
      },
      {
        title: 'Graduated verdicts',
        promise: 'allow / review / redact / mask / block — not just allow/block.',
        body: 'Five distinct outcomes mean you can let work happen safely, queue for human review, or surface a pattern — without reaching for the kill switch as your only tool.',
        how: 'Verdict mapping is configurable per detector, per policy, per asset. Default is mask for PII; flag for business-critical; block for known harmful.',
        verdict: 'mask',
      },
      {
        title: 'Reproducible benchmark',
        promise: 'Re-run it against your own stack — no cloud calls.',
        body: (
          <>
            Labelled corpora committed; <Text code>make benchmark</Text>{' '}
            reproduces the headline locally (combined-1000, 2026-09-02):
            <span className="bench-rows">
              {BENCH_HEADLINE.map(([k, v]) => (
                <span className="bench-row" key={k}><span>{k}</span><b>{v}</b></span>
              ))}
            </span>
            Per policy:
            <span className="bench-rows">
              {BENCH_POLICY.map(([k, v]) => (
                <span className="bench-row" key={k}><span>{k}</span><b>{v}</b></span>
              ))}
            </span>
          </>
        ),
        how: 'We publish the low rows too; PII and business-sensitive are where the review tier and your own labelled traffic do the work.',
        verdict: 'allow',
      },
    ],
  },
]

function FeatureBox({ f }) {
  return (
    <div className="feat-box">
      <div className="fb-head">
        <Title level={4}>{f.title}</Title>
        <Verdict v={f.verdict} />
      </div>
      <Paragraph className="fb-promise">{f.promise}</Paragraph>
      <Paragraph className="fb-body">{f.body}</Paragraph>
      <Collapse
        ghost
        size="small"
        className="how-collapse"
        items={[
          {
            key: 'how',
            label: 'How it works',
            children: <Paragraph className="fb-body" style={{ margin: 0 }}>{f.how}</Paragraph>,
          },
        ]}
      />
      {f.optin && <RoadmapNote label="opt-in">{f.optin}</RoadmapNote>}
      {f.roadmap && <RoadmapNote>{f.roadmap}</RoadmapNote>}
    </div>
  )
}

export default function Features() {
  return (
    <>
      <FigPageHeader
        eyebrow="Features"
        title="Everything GovernVeil enforces — and measures."
        subtitle="Each capability is scoped precisely — no adjectives without a mechanism behind them. Everything ships today unless it's tagged roadmap or opt-in."
      />

      <section className="ed-section">
        <div className="wrap ed-top" style={{ paddingBottom: 8 }}>
          <Reveal>
            <VerdictLegend />
          </Reveal>
          <Reveal>
            <Shot src="policies"
                  alt="GovernVeil Policies page: ten policies each written as a sentence, tagged Flag, Block or Mask, with the stage it runs at, times acted in 30 days, overrides, and whether it is in force or dormant.">
              <b>Policies, as they render.</b> Each policy is a sentence anyone can read, with
              the verdict it carries, the stage it runs at, how often it acted in the last 30
              days, how often someone stepped around it, and whether it is in force or has gone
              dormant.
            </Shot>
          </Reveal>
        </div>
      </section>

      {GROUPS.map((g) => (
        <section className="ed-section" key={g.eyebrow}>
          <div className="wrap ed-top">
            <Text className="eyebrow-label">{g.eyebrow}</Text>
            <Title level={2} className="ed-h2" style={{ maxWidth: 640, marginBottom: 32 }}>
              {g.title}
            </Title>
            <Row gutter={[20, 20]}>
              {g.features.map((f, i) => {
                const lastOdd =
                  g.features.length % 2 === 1 && i === g.features.length - 1
                return (
                  <Col xs={24} md={lastOdd ? 24 : 12} key={f.title}>
                    <Reveal delay={(i % 2) * 0.06} style={{ height: '100%' }}>
                      <FeatureBox f={f} />
                    </Reveal>
                  </Col>
                )
              })}
            </Row>
          </div>
        </section>
      ))}

      <PilotBand />
    </>
  )
}

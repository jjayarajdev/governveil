import { Col, Row, Typography } from 'antd'
import Reveal from '../components/Reveal'
import { Verdict, FigPageHeader, PilotBand, Shot } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const STEPS = [
  {
    title: 'Ingress',
    chips: ['/v1/*', '/gw/<app>', '/mcp/v1/*', 'browser extension'],
    body: 'An app calls /v1/* (a base-URL change), an enterprise API is called through /gw/<app>, an agent calls a tool through the MCP connector, or a person types into a public AI assistant and the extension relays the prompt.',
  },
  {
    title: 'Grant check',
    chips: ['kill switch'],
    body: 'Is this credential still authorised? A revoked grant is an instant 403; a long-dormant grant that wakes raises an incident.',
  },
  {
    title: 'Access plane',
    chips: ['role → scope', '403 on deny'],
    body: 'For enterprise apps, role → scope is checked before anything is forwarded. Denials never leave the perimeter.',
  },
  {
    title: 'Document guardrail',
    chips: ['DS-05'],
    body: 'Embedded or uploaded documents are parsed and swept; unscannable payloads fail closed.',
  },
  {
    title: 'Detection ladder',
    chips: ['fast path → local model'],
    body: 'Fast pattern-matching path (US and India PII, secrets, injection phrasing), then one local policy-adaptive model answers each policy as a plain-language question — prompt-injection, PII, toxicity, business-critical, harmful-intent, safety guard — plus a small companion model for PII spans.',
  },
  {
    title: 'Agent limits & model registry',
    chips: ['AG-11/12', 'MD-01'],
    body: "For agents: tools outside the allow-list refuse, hourly call and daily spend caps counted from the ledger, gated actions held for the owner. For every request: the model must be approved, in the caller's permitted list, and permitted for the data classes still present after masking.",
  },
  {
    title: 'Verdict → sign → forward',
    verdicts: true,
    body: 'The policy chain resolves exactly one outcome. Controls in detective mode record "would have blocked" and let evaluation continue. The decision is appended to the hash-chained ledger before the request is forwarded, masked.',
  },
  {
    title: 'Response inspection → restore → audit',
    chips: ['RO-01'],
    body: "The model's output (JSON or stream, tool-call arguments included) runs the same ladder and chain: harmful or injected output is withheld, leaked PII or secrets redacted, business output flagged. With the vault on, surrogates are restored for the authorised caller. The row is mirrored to a time-series store and exportable.",
  },
]

const LADDER = [
  { stage: 'keyword / regex / secrets (US + India PII, credentials)', model: 'fast path', time: 'sub-ms', fast: true },
  { stage: 'injection-phrase patterns', model: 'fast path', time: 'sub-ms', fast: true },
  { stage: 'prompt-injection · PII · toxicity · business-critical · harmful-intent · safety guard', model: 'policy question', time: 'local, one pass' },
  { stage: 'PII spans for redaction', model: 'NER', time: 'local' },
  { stage: 'document channels (macros, PDF JS, hidden/white text, hidden sheets, formulas)', model: 'parser + sweep', time: 'local' },
]

const LATENCY = [
  { path: 'Fast path (regex, secrets, injection phrases)', num: 'sub-millisecond', how: 'Go benchmark, per request' },
  { path: 'Kill switch (revoked grant → 403)', num: '~0.5 ms', how: 'measured in-line' },
  { path: 'Model path, single request, no queue', num: '~135–170 ms end to end; ~100 ms is the model', how: 'single GPU (A10G, g5.2xlarge)' },
  { path: 'Model path ceiling per GPU', num: '~7.4 req/s at 100 % escalation', how: 'load test 2026-09-03, 2,399 ledger rows, no fail-open' },
  { path: 'Share of real traffic that reaches the model', num: '15–30 %', how: 'sizing model, 10k-FTE worked example' },
]

const GOV_OBJECTS = [
  {
    title: 'Assets',
    body: 'Every application, model and agent, with a named business and technical owner, a profile (data classes, jurisdictions, consequence tier, external exposure) and a lifecycle. Traffic resolves to the asset that owns it; registering a /gw service or a vendor agent creates its asset.',
  },
  {
    title: 'Controls',
    body: 'A sixteen-control catalogue across governance, privacy, security and ethics — e.g. personal data masked before it leaves, injection blocked, documents scanned, only approved models, output inspected, idle credentials expire, a human reviews binding actions, fairness attested. Each is enforced, detective (observe, record "would have blocked") or attested (an owner signs). Assigned by rule from the asset\'s profile, by precedent from the nearest approved asset, or from a clause in your own policy.',
  },
  {
    title: 'Decisions',
    body: 'Approvals, exceptions, attestations, assignment reviews, probe runs, telemetry imports and drift reports are all rows on the same hash chain as the traffic, with expiry.',
  },
  {
    title: 'State',
    body: 'Holding · attempted-held · weak · breached · untested, computed from the ledger over a window. Nothing is "green" because someone said so.',
  },
]

const CONSOLE_DESTS = [
  ['Posture', 'the first thing that is wrong, with one button; coverage from independent telemetry; what needs you, ranked'],
  ['Estate', 'assets, models, vendors'],
  ['Assurance', 'control board, coverage, probes, policy drift'],
  ['Evidence', 'the signed ledger, access decisions, documents, traffic, analytics'],
  ['Policy', 'Form + YAML editor; enable / disable is the enforcement switch; policy library'],
  ['Configure', 'access, egress, vault, detectors, simulate, users, dashboards'],
]

const AUDIT_JSON = `{
  "timestamp": "2026-08-30T09:14:02.341Z",
  "request_id": "req_8Kz2x...",
  "user_id": "sarah.chen@acme.io",
  "path": "/v1/chat/completions",
  "provider": "frontier-model",
  "action": "block",
  "pii_detected": ["account_number"],
  "latency_ms": 194,
  "cost": 0.0041,
  "row_hash": "sha256:a7f3...",
  "prev_hash": "sha256:9c1b..."
}`

function Lifecycle() {
  return (
    <div className="lx-list">
      {STEPS.map((s, i) => (
        <div className="lx-item" key={s.title}>
          <div className="lx-head">
            <Text className="cap-num">{String(i + 1).padStart(2, '0')}</Text>
            <Title level={4}>{s.title}</Title>
            {s.chips?.map((c) => (
              <Text code className="chip-red" key={c}>{c}</Text>
            ))}
            {s.verdicts && (
              <span className="lc-verdicts">
                <Verdict v="allow" />
                <Verdict v="flag" />
                <Verdict v="mask" />
                <Verdict v="acknowledge" />
                <Verdict v="block" />
              </span>
            )}
          </div>
          <Paragraph>{s.body}</Paragraph>
        </div>
      ))}
    </div>
  )
}

export default function Product() {
  return (
    <>
      <FigPageHeader
        eyebrow="How it works"
        title="A drop-in gateway for frontier models, a managed browser extension, and a governance layer over both."
        subtitle="Point your apps at one base URL, install the extension for people, register your agents' tool servers behind the connector — and every AI interaction is governed, evidenced and measured, in your environment."
      />
      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 56]}>
            <Col xs={24} lg={13}>
              <Reveal>
                <Title level={3} className="ed-colhead">The request lifecycle — the order is the guarantee</Title>
                <Lifecycle />
              </Reveal>
            </Col>
            <Col xs={24} lg={11}>
              <Reveal delay={0.08}>
                <Title level={3} className="ed-colhead">Detection ladder</Title>
                <div className="term">
                  <div className="term-bar">
                    <span className="term-title" style={{ marginLeft: 0 }}>
                      detection-pipeline · single request
                    </span>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    {LADDER.map((r) => (
                      <div className="ladder-row" key={r.stage}>
                        <span className="c-light">{r.stage}</span>
                        <span className="c-dim ladder-model">{r.model}</span>
                        <span style={{ color: r.fast ? '#69b1ff' : '#b6b0ab' }}>{r.time}</span>
                      </div>
                    ))}
                    <p className="c-dim" style={{ margin: '10px 0 0', fontSize: 12 }}>
                      One policy-adaptive model — a single forward pass for
                      every policy on one GPU. Weights resident in your
                      environment; a multi-model stack remains as a fallback.
                      Verdict mapping is configurable per detector, per policy,
                      per asset.
                    </p>
                    <div className="ladder-verdicts">
                      <span className="c-faint" style={{ fontStyle: 'normal' }}>verdict →</span>
                      <Verdict v="allow" />
                      <Verdict v="flag" />
                      <Verdict v="mask" />
                      <Verdict v="acknowledge" />
                      <Verdict v="block" />
                    </div>
                  </div>
                </div>

                <Title level={3} className="ed-colhead" style={{ marginTop: 40 }}>Honest latency</Title>
                <div className="term">
                  <div className="term-bar">
                    <span className="term-title" style={{ marginLeft: 0 }}>latency · with methodology</span>
                  </div>
                  <div style={{ padding: '12px 16px' }}>
                    {LATENCY.map((r) => (
                      <div className="ladder-row" key={r.path}>
                        <span className="c-light">{r.path}</span>
                        <span style={{ color: '#69b1ff' }}>{r.num}</span>
                        <span className="c-dim ladder-model">{r.how}</span>
                      </div>
                    ))}
                    <p className="c-dim" style={{ margin: '10px 0 0', fontSize: 12 }}>
                      Two numbers with methodology, not one marketing figure.
                      The classic multi-model stack is ~190 ms on the same GPU.
                    </p>
                  </div>
                </div>
              </Reveal>
            </Col>
          </Row>
        </div>
      </section>

      <section className="ed-section">
        <div className="wrap ed-top">
          <Text className="eyebrow-label">Over the planes</Text>
          <Title level={2} className="ed-h2" style={{ maxWidth: 560 }}>
            You cannot govern what you cannot name.
          </Title>
          <Paragraph className="ed-body" style={{ maxWidth: 640, marginBottom: 36 }}>
            Four objects, one ledger.
          </Paragraph>
          <Reveal>
            <div className="planes-box gov-grid">
              {GOV_OBJECTS.map((o, i) => (
                <div className="plane-cell" key={o.title}>
                  <Text code className="chip-red">{String(i + 1).padStart(2, '0')}</Text>
                  <Title level={4}>{o.title}</Title>
                  <Paragraph>{o.body}</Paragraph>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal>
            <Paragraph className="ed-body" style={{ maxWidth: 760, marginTop: 36 }}>
              What the layer produces: a <Text strong>gap assessment</Text>{' '}
              (required vs present controls, exportable), a{' '}
              <Text strong>control manifest</Text> (machine-readable per-asset
              control set for build time), an{' '}
              <Text strong>attestation cycle</Text> (tier-based cadence; a
              signature is refused while an unlisted exception is open), a{' '}
              <Text strong>precedent delta</Text> (Keep / Drop review on the
              tenth asset), and <Text strong>policy drift</Text> (30 / 90-day:
              clauses never exercised, enforcement with no clause behind it,
              overrides clustering on one control, exceptions never closed).
            </Paragraph>
          </Reveal>
          <Reveal>
            <Shot src="access-governance"
                  alt="GovernVeil access governance: an enterprise API with six roles, each role's scope and permitted operations, denials counted, and a tile reading On resolver error: Fail-closed.">
              <b>Access governance, as it renders.</b> Identity &rarr; role &rarr; scope &rarr;
              operation, resolved at the reverse proxy before content inspection runs. A denial
              returns 403 and is never forwarded. If the resolver itself fails, the answer is
              fail-closed &mdash; not fail-open.
            </Shot>
          </Reveal>
        </div>
      </section>

      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 40]} align="middle">
            <Col xs={24} lg={11}>
              <Reveal>
                <Text className="eyebrow-label">Audit</Text>
                <Title level={2} className="ed-h2" style={{ maxWidth: 480 }}>
                  The evidence it leaves.
                </Title>
                <Paragraph className="ed-body" style={{ maxWidth: 460 }}>
                  Every decision writes one record — who, what, action,
                  latency, cost — and each record carries the hash of the one
                  before it. Edit anything, anywhere, and verification fails on
                  the spot. A standalone verifier walks the chain; daily
                  anchors are emitted to your logs. Mirrored to a time-series
                  store, exportable to your SIEM: the court of record for
                  every AI decision.
                </Paragraph>
              </Reveal>
            </Col>
            <Col xs={24} lg={13}>
              <Reveal delay={0.08}>
                <div className="term">
                  <div className="term-bar">
                    <span className="term-title" style={{ marginLeft: 0 }}>audit record · example</span>
                  </div>
                  <pre className="dark-pre">{AUDIT_JSON}</pre>
                </div>
              </Reveal>
            </Col>
          </Row>
        </div>
      </section>

      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 48]}>
            <Col xs={24} lg={13}>
              <Reveal>
                <Text className="eyebrow-label">The console</Text>
                <Title level={2} className="ed-h2" style={{ maxWidth: 480 }}>
                  Six destinations, one role lens.
                </Title>
                <div className="lx-list">
                  {CONSOLE_DESTS.map(([name, desc]) => (
                    <div className="lx-item" key={name} style={{ paddingBottom: 10 }}>
                      <div className="lx-head">
                        <Text code className="chip-red">{name}</Text>
                      </div>
                      <Paragraph style={{ marginBottom: 0 }}>{desc}</Paragraph>
                    </div>
                  ))}
                </div>
                <Paragraph className="ed-body" style={{ marginTop: 16 }}>
                  A role lens (Security · Risk · Engineering) ranks each
                  side&rsquo;s rows first without hiding anything. Light by
                  default.
                </Paragraph>
              </Reveal>
            </Col>
            <Col xs={24} lg={11}>
              <Reveal delay={0.08}>
                <Text className="eyebrow-label">Deployment</Text>
                <Title level={2} className="ed-h2" style={{ maxWidth: 420 }}>
                  Self-hosted, one image.
                </Title>
                <Paragraph className="ed-body" style={{ maxWidth: 460 }}>
                  One Docker image for gateway and model server; Compose
                  variants for demo, pilot (no default secrets, TLS), GPU and
                  cloud logging; a Helm chart for Kubernetes. Reference pilot:
                  one single-GPU VM. OIDC / SSO or local auth; three roles;
                  service tokens tied to grants.
                </Paragraph>
              </Reveal>
            </Col>
          </Row>
        </div>
      </section>
      <PilotBand />
    </>
  )
}

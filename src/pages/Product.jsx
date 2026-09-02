import { Col, Row, Typography } from 'antd'
import Reveal from '../components/Reveal'
import { Verdict, FigPageHeader, PilotBand } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const STEPS = [
  {
    title: 'Ingress',
    chips: ['/v1/*', 'browser extension'],
    body: 'An app calls /v1/* (a base-URL change) or a person types into a public AI assistant — the extension relays the prompt to the gateway.',
  },
  {
    title: 'Access plane',
    chips: ['/gw/<app>', '403 on deny'],
    body: 'For enterprise apps, role → scope is checked before anything is forwarded. Denials return 403 and never leave the perimeter.',
  },
  {
    title: 'Detection ladder',
    chips: ['fast path → local model'],
    body: 'Fast pattern-matching path, then one local policy-adaptive model answers each policy as a plain-language question — prompt-injection, PII, toxicity, business-critical, harmful-intent, and a safety guard — plus a small companion model to extract PII spans for redaction.',
  },
  {
    title: 'Verdict',
    verdicts: true,
    body: 'Every request gets exactly one outcome. Logged regardless.',
  },
  {
    title: 'Audit',
    chips: ['hash-chained', 'SIEM export'],
    body: 'Who, what, action, latency, model/prompt version → hash-chained log, mirrored to a time-series store, exportable to your SIEM.',
  },
]

const LADDER = [
  { stage: 'keyword / regex / secrets', model: 'fast path', time: 'a few ms', fast: true },
  { stage: 'injection-phrase patterns', model: 'fast path', time: 'a few ms', fast: true },
  { stage: 'prompt-injection', model: 'policy question', time: 'local' },
  { stage: 'PII', model: 'policy question', time: 'local' },
  { stage: 'toxicity', model: 'policy question', time: 'local' },
  { stage: 'business-critical', model: 'policy question', time: 'local' },
  { stage: 'harmful-intent', model: 'policy question', time: 'local' },
  { stage: 'safety guard', model: 'policy question', time: 'local' },
  { stage: 'PII spans for redaction', model: 'NER', time: 'local' },
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
                <Verdict v="review" />
                <Verdict v="redact" />
                <Verdict v="mask" />
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
        title="A drop-in gateway for frontier models, plus a managed browser extension."
        subtitle="Point your apps at one base URL, install the extension for people, and every AI interaction is governed and evidenced — in your environment."
      />
      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 56]}>
            <Col xs={24} lg={13}>
              <Reveal>
                <Title level={3} className="ed-colhead">The request lifecycle</Title>
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
                      One policy-adaptive model — a single forward pass for every
                      policy, in a fraction of a second on one GPU. Weights
                      resident in your environment; a multi-model stack
                      remains as a fallback.
                    </p>
                    <div className="ladder-verdicts">
                      <span className="c-faint" style={{ fontStyle: 'normal' }}>verdict →</span>
                      <Verdict v="allow" />
                      <Verdict v="review" />
                      <Verdict v="mask" />
                      <Verdict v="block" />
                    </div>
                  </div>
                </div>
              </Reveal>
            </Col>
          </Row>
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
                  latency — and each record carries the hash of the one before
                  it. Edit anything, anywhere, and verification fails on the
                  spot. Mirrored to a time-series store, exportable to your
                  SIEM: the court of record for every AI decision.
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
      <PilotBand />
    </>
  )
}

import { Col, Collapse, Row, Typography } from 'antd'
import Reveal from '../components/Reveal'
import { Verdict, FigPageHeader, PilotBand, RoadmapNote } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const LEGEND = [
  { v: 'allow', text: 'forwarded unchanged' },
  { v: 'review', text: 'sent, logged for human review' },
  { v: 'redact', text: 'PII masked one-way, rest forwarded' },
  { v: 'mask', text: 'surrogate out; restore in the works' },
  { v: 'block', text: 'send cancelled, logged' },
]

const GROUPS = [
  {
    eyebrow: 'Control the egress',
    title: 'Nothing sensitive leaves — and the work never stops.',
    features: [
      {
        title: 'Reversible masking',
        promise: 'The work continues. The data never leaves.',
        body: 'Realistic, format-preserving surrogates outbound. Durable, encrypted mapping. Deterministic per value. Default action is mask, never block.',
        how: "Both paths mask outbound today (the provider never sees real data; people work with stand-ins on screen). Restoring a third-party web UI's rendered turns isn't reliably achievable, so we don't claim it.",
        verdict: 'mask',
        roadmap: 'The reversible round trip — restore on the API response — is in the works. Outbound redaction ships today.',
      },
      {
        title: 'Shadow-AI browser extension',
        promise: 'Governs the public AI assistants your people already use — no MDM dependency.',
        body: 'Block or mask-outbound in the assistant page itself. In-page review notice. Forward-proxy/ICAP variant for network-level coverage of any HTTP client.',
        how: 'Extension intercepts prompts before submission. Verdict is applied locally. No traffic modification visible to the platform provider.',
        verdict: 'block',
      },
      {
        title: 'Multi-turn drip detection',
        promise: 'Catches sensitive data assembled across a conversation, not just single prompts.',
        body: 'Public AI assistants only transmit the new turn, so the extension keeps a rolling buffer per conversation and evaluates the accumulated window. A member identity assembled over five turns is caught together.',
        how: 'A rolling window of recent turns (~6 turns, 4,000-character cap) per conversation — bounded to stay fast, reset with each new chat. Hard identifiers in the final turn block outright; an accumulation of individually-innocuous turns lands in the review tier, which is correct — no false alarms on random digits.',
        verdict: 'review',
      },
      {
        title: 'Document-upload hostile-content sweep',
        promise: 'Cleans documents before they reach any model or RAG pipeline.',
        body: 'A staged pipeline design: one parsing layer, several small specialist models, and a deterministic policy gate deciding block / redact / quarantine / allow. Models produce scores; only the policy gate produces decisions.',
        how: 'Files parse to a normalised segment list with provenance (visible body, hidden text, tracked changes, formulas, alt-text), then are swept for white-on-white text, OOXML comments, hidden sheets, formula payloads, and PDF JavaScript. Suspect files land in a quarantine bucket no downstream consumer can read.',
        verdict: 'block',
        roadmap: 'The pipeline is designed in the open (published design notes); it is not in the current build.',
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
        body: 'Patterns, secrets, and injection phrases in the fast path. Then one compact local model covers injection, PII, toxicity, business-critical, harmful-intent, and the safety guard from a single brain — with a small companion model extracting PII spans for redaction.',
        how: 'All inference runs in your environment on your GPU — no prompt fragments sent to any vendor cloud for detection. The earlier multi-model stack remains as a fallback.',
        verdict: 'review',
      },
      {
        title: 'Policy-adaptive, no retraining',
        promise: "Change what's blocked by editing the question, not by training a model.",
        body: 'One model answers every policy as a plain-language yes/no question in a single forward pass. Tuning detection means editing the question — no per-client model training, and no data leaving your perimeter to fine-tune a vendor’s model.',
        how: 'A review/labeling queue turns your real traffic into a ground-truth corpus, so you can measure accuracy on your own data, in-house, without it leaving.',
        verdict: 'review',
      },
    ],
  },
  {
    eyebrow: 'Govern and prove',
    title: 'Policy at the gate, evidence on every request.',
    features: [
      {
        title: 'API access scope-gating (Access plane)',
        promise: 'Governs any enterprise API by role → scope, with content inspection.',
        body: 'Not just LLM traffic. Every enterprise API call is checked for role-to-scope alignment before any content inspection runs. None of the endpoint/SSE DLP vendors profiled has this.',
        how: 'Every request to /gw/<app> is checked against a role → scope policy. Out-of-scope requests return 403 and are logged. Never forwarded.',
        verdict: 'allow',
      },
      {
        title: 'Graduated verdicts',
        promise: 'allow / review / redact / mask / block — not just allow/block.',
        body: 'Five distinct outcomes mean you can let work happen safely, queue for human review, or surface a pattern — without reaching for the kill switch as your only tool.',
        how: 'Verdict mapping is configurable per detector, per policy, per app. Default is mask for PII; review for business-critical; block for known harmful.',
        verdict: 'mask',
      },
      {
        title: 'Tamper-evident audit',
        promise: 'Every request logged with a hash-chain of custody.',
        body: 'Hash-chained audit log with a daily anchor and a verification CLI. DLP alert store, mirrored to a time-series store. SIEM export ships today.',
        how: 'Each audit record carries the hash of the previous record. Any tampering breaks the chain, and the verification CLI catches it.',
        verdict: 'allow',
        roadmap: 'Additional SIEM emitters are on the roadmap — not yet shipped.',
      },
      {
        title: 'Vendor & agent credential governance',
        promise: 'One grant, many systems, one kill-switch — enforced on the data path.',
        body: "A vendor's agent holds a grant whose scopes decide which systems it may reach (/v1/* for LLM traffic, /gw/<app> for enterprise apps). Revoke the grant and every tied credential returns 401 instantly.",
        how: "Grant-tied aigw_ keys are checked in data-path auth for grant status (revoked → 401) and required scope per path. Out-of-scope requests get 403 before any upstream is contacted. That's the forgotten-grant breach — the offboarded vendor still holding a live key — contained in seconds.",
        verdict: 'review',
        roadmap: 'Dormant-credential wake alerts are roadmap — today dormancy deadlines are tracked, but no alert dispatcher ships yet.',
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
      {f.roadmap && <RoadmapNote>{f.roadmap}</RoadmapNote>}
    </div>
  )
}

export default function Features() {
  return (
    <>
      <FigPageHeader
        eyebrow="Features"
        title="Everything GovernVeil enforces."
        subtitle="Each capability is scoped precisely — no adjectives without a mechanism behind them. Everything ships today unless it's tagged roadmap."
      />

      <section className="ed-section">
        <div className="wrap ed-top" style={{ paddingBottom: 8 }}>
          <Text className="eyebrow-label">
            Every request ends in one of five audited verdicts
          </Text>
          <Reveal>
            <div className="verdict-grid">
              {LEGEND.map((l) => (
                <div className="vg-cell" key={l.v}>
                  <Verdict v={l.v} />
                  <Paragraph>{l.text}</Paragraph>
                </div>
              ))}
            </div>
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
              {g.features.map((f, i) => (
                <Col xs={24} md={12} key={f.title}>
                  <Reveal delay={(i % 2) * 0.06} style={{ height: '100%' }}>
                    <FeatureBox f={f} />
                  </Reveal>
                </Col>
              ))}
            </Row>
          </div>
        </section>
      ))}

      <PilotBand />
    </>
  )
}

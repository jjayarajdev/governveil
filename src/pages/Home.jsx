import { Button, Col, Row, Space, Statistic, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { Shot } from '../components/figma'

const { Title, Paragraph, Text } = Typography

function Kicker({ children, onDark }) {
  return (
    <Text className={`eyebrow-label ${onDark ? 'on-dark' : ''}`}>{children}</Text>
  )
}

/* ---------- hero ---------- */

function MaskTerminal() {
  return (
    <div className="mask-term">
      <div className="mt-head">
        <span>POST /V1/CHAT/COMPLETIONS</span>
        <span className="mt-verdict">■ REDACT</span>
      </div>
      <div className="mt-body">
        <p className="mt-lbl">your app sends</p>
        <p className="mt-line">&quot;Draft a letter to the customer, PAN <span className="hl-real">A123456(7)</span>&quot;</p>
        <p className="mt-lbl">the provider sees</p>
        <p className="mt-line">&quot;Draft a letter to the customer, PAN <span className="hl-sub">[REDACTED]</span>&quot;</p>
        <p className="mt-lbl">the audit records</p>
        <p className="mt-line">verdict: mask · 1 PII span · sub-ms</p>
      </div>
      <div className="mt-foot">
        <span>nothing real left the perimeter</span>
        <span>audit #4187 hash-chained</span>
      </div>
    </div>
  )
}

const ASSURANCES = [
  'Runs in your VPC or on-prem',
  'All ML inference local',
  'No prompt content leaves your network',
  'Compatible with frontier-model APIs',
  'Signed no-egress attestation',
]

function Hero() {
  return (
    <section className="ed-hero">
      <div className="wrap">
        <Row gutter={[72, 48]} align="middle">
          <Col xs={24} lg={13}>
            <Kicker>AI data-egress control &amp; evidence · self-hosted</Kicker>
            <Title className="fig-h1">
              Let your teams use AI. Keep the data&nbsp;— and the proof&nbsp;—
              inside your perimeter.
            </Title>
            <Paragraph className="fig-lede">
              GovernVeil governs every AI action — LLM API calls,
              enterprise-app access, agent tool calls, and vendor credentials —
              in your own environment. Sensitive values are caught and redacted
              before the prompt leaves, model responses are inspected on the
              way back, every decision gets one of five audited verdicts, and
              every control is measured from the ledger, not asserted.
            </Paragraph>
            <Space size={12} wrap>
              <Link to="/pilot">
                <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPosition="end">
                  Book a design-partner pilot
                </Button>
              </Link>
              <Link to="/product">
                <Button size="large">See the architecture</Button>
              </Link>
            </Space>
          </Col>
          <Col xs={24} lg={11}>
            <Reveal delay={0.08}>
              <MaskTerminal />
            </Reveal>
          </Col>
        </Row>
        <div className="hero-legend">
          <div className="verdict-grid assure-grid">
            {ASSURANCES.map((t) => (
              <div className="vg-cell" key={t}>
                <span className="sq" aria-hidden="true" />
                <Paragraph>{t}</Paragraph>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- the problem ---------- */

const PROBLEMS = [
  {
    title: "The licence doesn't see everything.",
    body: "Enterprise AI licences cover people in a browser. They don't cover your applications and agents calling model APIs directly, or the personal accounts staff still use.",
  },
  {
    title: 'Blocking stops the work.',
    body: 'Traditional DLP either lets a prompt through or walls the user off — so they switch to a personal device and you lose visibility.',
  },
  {
    title: "You can't prove any of it.",
    body: "Only ~a third of organisations send AI logs anywhere an auditor would accept. The contract transfers liability; it doesn't produce evidence.",
  },
]

function Problem() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>The problem</Kicker>
        <Row gutter={[56, 36]}>
          {PROBLEMS.map((p) => (
            <Col xs={24} md={8} key={p.title}>
              <Reveal>
                <Title level={4} className="ed-t3">{p.title}</Title>
                <Paragraph className="ed-body">{p.body}</Paragraph>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

/* ---------- how it works ---------- */

const PLANES = [
  {
    chip: '/gw/<app>',
    title: 'Access plane',
    body: 'Role → scope gating on any enterprise API, before a request is ever forwarded.',
  },
  {
    chip: '/v1/*',
    title: 'Content plane',
    body: 'A fast pattern-matching path (a few milliseconds) plus one local policy-adaptive model inspect the payload — every policy answered as a plain-language question by the same model. The response is inspected on the way back.',
  },
  {
    chip: '/mcp/v1/*',
    title: 'Execution point',
    body: 'Every agent tool call is listed, governed, masked, inspected and restored through the MCP connector, and ledgered like any other request.',
  },
  {
    chip: 'A123456(7) ⇄ A563710(2)',
    title: 'Reversible masking',
    tag: 'opt-in',
    body: 'Sensitive spans are redacted one-way by default. Turn on the vault and the API path becomes a full round trip: surrogates out, real values restored inbound, originals sealed under a custodian-held key.',
    grey: true,
  },
]

function HowItWorks() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>How it works</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 640 }}>
          Two enforcement planes and an execution point over one detection
          ladder — and a governance layer that measures them.
        </Title>
        <Paragraph className="ed-body" style={{ marginBottom: 36 }}>
          Every request ends in{' '}
          <Text strong>allow / review / redact / mask / block</Text> — and is
          audited.
        </Paragraph>
        <Reveal>
          <div className="planes-box">
            {PLANES.map((p) => (
              <div className={`plane-cell ${p.grey ? 'cell-grey' : ''}`} key={p.title}>
                <Text code className="chip-red">{p.chip}</Text>
                <Title level={4}>
                  {p.title}
                  {p.tag && <Tag className="roadmap-inline">{p.tag}</Tag>}
                </Title>
                <Paragraph>{p.body}</Paragraph>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- key capabilities ---------- */

const CAPS = [
  {
    title: 'Reversible masking',
    body: 'Format-preserving surrogates outbound, real values restored inbound on the API path; governed vault (key custody, rotation, retention, erasure). Off by default; both paths redact outbound until you turn it on.',
    tag: 'opt-in',
  },
  {
    title: 'Three enforcement surfaces',
    body: 'Content inspection, API access scope-gating, and agent tool-call governance.',
  },
  {
    title: 'Shadow-AI coverage',
    body: 'A browser extension for the public AI assistants your people already use (mask outbound or block), plus a forward-proxy variant.',
  },
  {
    title: 'Document-upload sweep',
    body: 'Catches macros, PDF JavaScript, hidden and white text, hidden sheets and formula payloads before a file reaches an LLM or RAG pipeline; quarantine with a reviewer queue.',
  },
  {
    title: 'Vendor & agent governance',
    body: 'Every third-party AI credential scoped, monitored, and killable inline — the kill-switch lands in under a millisecond. Agents also carry enforced tool allow-lists, call and spend caps, and human gates.',
  },
  {
    title: 'Audit-grade evidence',
    body: 'Tamper-evident, hash-chained logs mapped line-by-line to named controls. Control state — holding, weak, breached, untested — is computed from that ledger.',
  },
]

function Capabilities() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Key capabilities</Kicker>
        <Row gutter={[56, 44]}>
          {CAPS.map((c, i) => (
            <Col xs={24} md={8} key={c.title}>
              <Reveal delay={(i % 3) * 0.05}>
                <div className="cap-ed">
                  <div className="cap-line">
                    <Text className="cap-num">{String(i + 1).padStart(2, '0')}</Text>
                    <Title level={4}>{c.title}</Title>
                  </div>
                  <Paragraph>
                    {c.body}
                    {c.tag && <Tag className="roadmap-inline">{c.tag}</Tag>}
                  </Paragraph>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

/* ---------- the governance layer (dark) ---------- */

function GovernanceLayer() {
  return (
    <section className="ed-dark">
      <div className="wrap">
        <Kicker onDark>Beyond the gateway</Kicker>
        <Title level={2} className="ed-huge">
          Every AI asset in your estate,
          <br />
          with its controls <span className="red">and their state.</span>
        </Title>
        <Paragraph className="ed-dark-body">
          Register every application, model and agent with a named owner.
          Assign controls from your own policy clauses and the nearest
          approved precedent. Observe before you enforce: detective mode
          records what <em>would</em> have blocked. Then read control state
          off the signed ledger — holding, weak, breached, untested — and let
          the owner attest against what actually happened. The tenth asset is
          approved in minutes, because it inherits the ninth.
        </Paragraph>
        <Space size={10} wrap style={{ marginBottom: 28 }}>
          <Tag className="roadmap-inline">16-control catalogue</Tag>
          <Tag className="roadmap-inline">detective → enforced</Tag>
          <Tag className="roadmap-inline">precedent inheritance</Tag>
        </Space>
        <div>
          <Link to="/product">
            <Button size="large" ghost>See how it works</Button>
          </Link>
        </div>
        <Shot src="policy-drift" onDark
              alt="GovernVeil Assurance page headed “Does the policy say what the ledger did?”, with clauses from an ingested policy mapped to controls and tagged dormant or not enforced.">
          <b>Assurance → Policy drift.</b> Your written policy against what the ledger actually
          did: clauses never exercised, enforcement with no clause behind it. Generated over
          30 days from 2,869 real ledger rows, 442 synthetic probes skipped, and signed as a
          decision on the same chain as the traffic.
        </Shot>
      </div>
    </section>
  )
}

/* ---------- differentiator (dark) ---------- */

function Differentiator() {
  return (
    <section className="ed-dark">
      <div className="wrap">
        <Kicker onDark>The one thing nobody else does</Kicker>
        <Title level={2} className="ed-huge">
          &quot;We blocked it&quot; <span className="red">→</span>
          <br />
          &quot;we let the work happen safely.&quot;
        </Title>
        <Paragraph className="ed-dark-body">
          GovernVeil redacts sensitive spans before anything leaves — the
          prompt still goes, the work still happens, nothing real reaches the
          provider. Turn on the vault and the API path restores the real
          values in the response, a full round trip, with the originals
          sealed under your own key. Detect-and-block vendors have no
          response path at all; the model providers have explicitly declined
          to build one. It all runs in your perimeter, so it works air-gapped.
        </Paragraph>
        <Space size={12} wrap>
          <Link to="/pilot">
            <Button type="primary" size="large">Book a design-partner pilot</Button>
          </Link>
          <Link to="/product">
            <Button size="large" ghost>See the architecture</Button>
          </Link>
        </Space>
      </div>
    </section>
  )
}

/* ---------- proof, not claims ---------- */

const PROOF = [
  {
    num: '0',
    title: 'False positives',
    body: (
      <>
        On 200 benign prompts in the published <Text code>combined-1000</Text>{' '}
        corpus and on the lookalike-PII set — order IDs, tracking numbers,
        licence keys shaped like PAN / Aadhaar / IFSC / GSTIN. Corpus and
        runner in the repo; <Text code>make benchmark</Text> re-runs it against
        your own stack with no cloud calls.{' '}
        <Text italic>Ask any competitor for their published false-positive rate.</Text>
      </>
    ),
  },
  {
    num: '93 %',
    title: 'Recall, at 100 % precision',
    body: (
      <>
        800 should-catch prompts across harmful intent, toxicity, injection,
        PII and business-sensitive; per-policy numbers published, including
        the low ones.
      </>
    ),
  },
  {
    num: '1 model',
    title: 'Adapt policy in plain English, not retraining',
    body: (
      <>
        One model answers each policy as a yes/no question, so you tune
        detection by editing the question — no per-client model training, and
        no data leaving your perimeter to fine-tune a vendor&rsquo;s model.
      </>
    ),
  },
  {
    num: 'daily',
    title: 'Every control challenged',
    body: (
      <>
        Synthetic probes fire the canonical trigger, a benign near-miss and an
        evasion at every enforced control, daily, through the real data path,
        tagged so they never count as traffic. &ldquo;Last challenged&rdquo; is
        a column on the control board.
      </>
    ),
  },
]

function Proof() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Proof, not claims</Kicker>
        <Row gutter={[56, 44]}>
          {PROOF.map((p) => (
            <Col xs={24} md={12} key={p.title}>
              <Reveal>
                <Statistic className="display-num" value={p.num} />
                <Title level={4} className="ed-t3">{p.title}</Title>
                <Paragraph className="ed-body" style={{ maxWidth: 480 }}>{p.body}</Paragraph>
              </Reveal>
            </Col>
          ))}
        </Row>
        <Link to="/product">
          <Button size="large" style={{ marginTop: 36 }}>Read the benchmark</Button>
        </Link>
      </div>
    </section>
  )
}

/* ---------- responsible AI by design ---------- */

const PILLARS = [
  {
    k: 'Sovereign',
    body: 'Runs in your environment; every prompt is scored by local models. Where does the prompt go for a verdict? Nowhere — and a signed attestation says so: non_allowlisted_egress_attempts: 0.',
  },
  {
    k: 'Private',
    body: 'Sensitive values are redacted before the prompt leaves the perimeter; with the vault on, restored for the authorised caller.',
  },
  {
    k: 'Auditable',
    body: 'Every verdict carries a reason, the detector that fired, and a confidence score — nothing is a black box you can’t defend to an auditor.',
  },
  {
    k: 'Accountable',
    body: 'A tamper-evident, hash-chained record of every AI interaction and decision, mapped line-by-line to named controls, with a named owner on every asset and an attestation cycle that expires.',
  },
  {
    k: 'Overseen',
    body: 'Graduated verdicts plus a review queue, held actions for agents, the incident clock and a sub-millisecond kill-switch keep a human in control.',
  },
]

function ResponsibleAI() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Responsible AI by design</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 620 }}>
          The language your risk and board teams use — delivered as mechanisms.
        </Title>
        <Paragraph className="ed-body" style={{ marginBottom: 36 }}>
          Sovereignty, explainability, accountability, human oversight — not a
          policy PDF, but controls you can demo.
        </Paragraph>
        <Row gutter={[56, 40]}>
          {PILLARS.map((p, i) => (
            <Col xs={24} md={8} key={p.k}>
              <Reveal delay={(i % 3) * 0.05}>
                <div className="cap-ed">
                  <div className="cap-line">
                    <Text className="cap-num">{String(i + 1).padStart(2, '0')}</Text>
                    <Title level={4}>{p.k}</Title>
                  </div>
                  <Paragraph>{p.body}</Paragraph>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

/* ---------- security & residency | pricing ---------- */

function SecurityPricing() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Row gutter={[72, 48]}>
          <Col xs={24} md={12}>
            <Kicker>Security &amp; residency</Kicker>
            <Paragraph className="ed-body" style={{ maxWidth: 480 }}>
              Self-hosted in your VPC or on-prem (Docker Compose, Helm chart).
              All ML inference local. Encryption in transit and at rest; vault
              keys KEK-wrapped. OIDC / SSO, three enforced roles, per-app
              service tokens. Data residency by construction — there is no
              vendor cloud to send prompts to.
            </Paragraph>
            <Link className="red-link" to="/features">
              Security &amp; compliance <ArrowRightOutlined />
            </Link>
          </Col>
          <Col xs={24} md={12}>
            <Kicker>Pricing</Kicker>
            <Paragraph className="ed-body" style={{ maxWidth: 460 }}>
              Flat, self-hosted, predictable. Priced per governed-AI-user — not
              per token you run on your own hardware, and not a $100k+ floor.
            </Paragraph>
            <Link className="red-link" to="/pilot">
              See pricing <ArrowRightOutlined />
            </Link>
          </Col>
        </Row>
      </div>
    </section>
  )
}

/* ---------- final CTA (red) ---------- */

function FinalCTA() {
  return (
    <section className="band-red ed-cta">
      <div className="wrap">
        <Title level={2} className="ed-huge on-red">
          See it catch a real prompt
          <br />
          in 90 seconds.
        </Title>
        <Link to="/pilot">
          <Button size="large" className="btn-on-red">
            Book a design-partner pilot
          </Button>
        </Link>
        <Paragraph className="cta-note">3–5 design-partner slots per cohort.</Paragraph>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <Capabilities />
      <GovernanceLayer />
      <Differentiator />
      <Proof />
      <ResponsibleAI />
      <SecurityPricing />
      <FinalCTA />
    </>
  )
}

import { Button, Col, Row, Space, Statistic, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'

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
        <p className="mt-line">verdict: redact · 1 PII span · a few ms</p>
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
              enterprise-app access, and vendor/agent credentials — in your own
              environment. Sensitive values are caught and redacted before the
              prompt leaves, every decision gets one of five audited verdicts,
              and nothing sensitive ever reaches the model provider.
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
        <div className="check-strip">
          {ASSURANCES.map((t) => (
            <span key={t}>
              <span className="sq" aria-hidden="true" /> {t}
            </span>
          ))}
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
    body: 'A fast pattern-matching path (a few milliseconds) plus one local policy-adaptive model inspect the payload — every policy answered as a plain-language question by the same model.',
  },
  {
    chip: 'A123456(7) ⇄ A563710(2)',
    title: 'Reversible masking',
    body: 'Today, sensitive spans are redacted one-way before anything leaves. The reversible round trip — surrogates out, real values restored inbound — is in the works.',
    grey: true,
  },
]

function HowItWorks() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>How it works</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 560 }}>
          Two enforcement planes over one detection ladder.
        </Title>
        <Paragraph className="ed-body" style={{ marginBottom: 36 }}>
          Every request ends in <Text strong>allow / review / redact / block</Text>{' '}
          — and is audited.
        </Paragraph>
        <Reveal>
          <div className="planes-box">
            {PLANES.map((p) => (
              <div className={`plane-cell ${p.grey ? 'cell-grey' : ''}`} key={p.title}>
                <Text code className="chip-red">{p.chip}</Text>
                <Title level={4}>{p.title}</Title>
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
    body: "In the works: values masked outbound and restored inbound — a full round trip. Today, both paths redact outbound, so the provider never sees real data.",
    roadmap: true,
  },
  {
    title: 'Two enforcement planes',
    body: 'Content inspection and API access scope-gating.',
  },
  {
    title: 'Shadow-AI coverage',
    body: 'A browser extension for the public AI assistants your people already use (mask outbound or block), plus a forward-proxy variant.',
  },
  {
    title: 'Document-upload sweep',
    body: 'Catches hidden text, Office/OOXML tricks, macros and PDF JavaScript before a file reaches an LLM or RAG pipeline.',
    roadmap: true,
  },
  {
    title: 'Vendor & agent governance',
    body: 'Every third-party AI credential scoped, monitored, and killable inline — the kill-switch lands in under a millisecond.',
  },
  {
    title: 'Audit-grade evidence',
    body: 'Tamper-evident, hash-chained logs mapped line-by-line to named controls.',
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
                    {c.roadmap && <Tag className="roadmap-inline">roadmap</Tag>}
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
          Today, GovernVeil redacts sensitive spans before anything leaves —
          the prompt still goes, the work still happens, nothing real reaches
          the provider. The reversible round trip — surrogates out, real
          values restored in the response — is in the works, and we label it
          plainly. Detect-and-block vendors have no response path at all; the
          model providers have explicitly declined to build one. It all runs
          in your perimeter, so it works air-gapped.
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
    title: 'False positives on a hard lookalike-PII set',
    body: (
      <>
        A benchmark built from lookalike traps — order IDs, tracking numbers,
        licence keys that look like identifiers but aren&rsquo;t. Corpus and runner in
        the repo; re-run it yourself.{' '}
        <Text italic>Ask any competitor for their published false-positive rate.</Text>
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
        Accuracy is published per policy, and the safety guard catches every
        harmful prompt in the benchmark set.
      </>
    ),
  },
  {
    num: '2 numbers',
    title: 'Honest latency',
    body: (
      <>
        A few milliseconds on the fast path; a fraction of a second for the
        model path on a single GPU. Two numbers with methodology, not one
        marketing figure.
      </>
    ),
  },
]

function Proof() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Proof, not claims</Kicker>
        <Row gutter={[56, 40]}>
          {PROOF.map((p) => (
            <Col xs={24} md={8} key={p.title}>
              <Reveal>
                <Statistic className="display-num" value={p.num} />
                <Title level={4} className="ed-t3">{p.title}</Title>
                <Paragraph className="ed-body">{p.body}</Paragraph>
              </Reveal>
            </Col>
          ))}
        </Row>
        <Link to="/pilot">
          <Button size="large" style={{ marginTop: 36 }}>Read the benchmark</Button>
        </Link>
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
              Self-hosted in your VPC or on-prem. All ML inference local.
              Encryption in transit and at rest. Data residency by
              construction — there is no vendor cloud to send prompts to.
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
      <Differentiator />
      <Proof />
      <SecurityPricing />
      <FinalCTA />
    </>
  )
}

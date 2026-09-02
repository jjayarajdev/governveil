import { Button, Col, Collapse, Row, Space, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'

const { Title, Paragraph, Text } = Typography

function Kicker({ children, onDark }) {
  return <Text className={`eyebrow-label ${onDark ? 'on-dark' : ''}`}>{children}</Text>
}

/* ---------- what is it ---------- */

function WhatIsIt() {
  return (
    <section className="ed-hero">
      <div className="wrap">
        <Row gutter={[72, 40]} align="middle">
          <Col xs={24} lg={13}>
            <Kicker>Learn · start here</Kicker>
            <Title className="fig-h1">What is GovernVeil?</Title>
            <Paragraph className="fig-lede">
              GovernVeil is an <Text strong>AI governance gateway you run yourself</Text>.
              Think of it as a checkpoint — a firewall for AI. Just as a network
              firewall inspects traffic before it leaves, GovernVeil inspects every
              AI prompt before it reaches an outside model: it catches sensitive
              data, stops unsafe requests, and records exactly what happened — all
              inside your own environment.
            </Paragraph>
            <Space size={12} wrap>
              <Link to="/product">
                <Button type="primary" size="large" icon={<ArrowRightOutlined />} iconPosition="end">
                  See how it works
                </Button>
              </Link>
              <Link to="/pilot">
                <Button size="large">Book a design-partner pilot</Button>
              </Link>
            </Space>
          </Col>
          <Col xs={24} lg={11}>
            <Reveal delay={0.08}>
              <div className="mask-term">
                <div className="mt-head">
                  <span>IN ONE LINE</span>
                  <span className="mt-verdict">■ GOVERNED</span>
                </div>
                <div className="mt-body">
                  <p className="mt-lbl">people &amp; apps use AI</p>
                  <p className="mt-line">ChatGPT · Claude · Copilot · your own agents</p>
                  <p className="mt-lbl">every prompt passes through GovernVeil</p>
                  <p className="mt-line">detect · protect · decide · record — in your perimeter</p>
                  <p className="mt-lbl">the model sees</p>
                  <p className="mt-line">only what your policy allows</p>
                </div>
                <div className="mt-foot">
                  <span>nothing sensitive leaves</span>
                  <span>every action on the record</span>
                </div>
              </div>
            </Reveal>
          </Col>
        </Row>
      </div>
    </section>
  )
}

/* ---------- why now ---------- */

const WHY = [
  {
    title: 'AI is already in every workflow.',
    body: 'Staff paste customer data, source code, and secrets into public chatbots; agents call tools with real credentials. Adoption has outrun governance.',
  },
  {
    title: 'Your licence doesn’t see everything.',
    body: 'Enterprise AI licences cover people in a browser. They don’t cover applications and agents calling model APIs directly, or the personal accounts staff still use.',
  },
  {
    title: 'You can’t prove any of it.',
    body: 'When a regulator or board asks “how do you govern AI?”, most teams have no evidence. A contract transfers liability; it doesn’t produce an audit trail.',
  },
]

function WhyNow() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Why this, why now</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 620 }}>
          The gap between using AI and governing it is where the risk lives.
        </Title>
        <Row gutter={[56, 36]} style={{ marginTop: 12 }}>
          {WHY.map((w) => (
            <Col xs={24} md={8} key={w.title}>
              <Reveal>
                <Title level={4} className="ed-t3">{w.title}</Title>
                <Paragraph className="ed-body">{w.body}</Paragraph>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

/* ---------- how it works (3 steps) ---------- */

const STEPS = [
  {
    n: '01',
    title: 'Intercept',
    body: 'Every AI request passes through GovernVeil — an inline gateway for your apps and APIs, and a browser guard for staff using public assistants.',
  },
  {
    n: '02',
    title: 'Inspect & protect',
    body: 'Local models detect sensitive data and unsafe requests. Sensitive values are redacted before the prompt leaves, and each request gets a verdict: allow / review / redact / block.',
  },
  {
    n: '03',
    title: 'Record',
    body: 'Every interaction and decision lands in a tamper-evident, hash-chained audit ledger — evidence you can hand an auditor, mapped to named controls.',
  },
]

function HowItWorks() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>How it works</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 560 }}>
          Three steps, all inside your environment.
        </Title>
        <Row gutter={[56, 40]} style={{ marginTop: 12 }}>
          {STEPS.map((s) => (
            <Col xs={24} md={8} key={s.n}>
              <Reveal>
                <div className="cap-ed">
                  <div className="cap-line">
                    <Text className="cap-num">{s.n}</Text>
                    <Title level={4}>{s.title}</Title>
                  </div>
                  <Paragraph>{s.body}</Paragraph>
                </div>
              </Reveal>
            </Col>
          ))}
        </Row>
        <Link className="red-link" to="/product" style={{ marginTop: 8, display: 'inline-block' }}>
          See the architecture <ArrowRightOutlined />
        </Link>
      </div>
    </section>
  )
}

/* ---------- FAQ ---------- */

const FAQ = [
  {
    q: 'Does my data leave my network?',
    a: 'No. GovernVeil is self-hosted and runs every detection with local models on your hardware. There is no vendor cloud to send prompts to — it can even run air-gapped.',
  },
  {
    q: 'Does this replace ChatGPT Enterprise or Copilot?',
    a: 'No — it’s additive. Those licences govern people in a browser. GovernVeil covers what they can’t: your applications and agents calling model APIs directly, and the personal accounts staff still use.',
  },
  {
    q: 'Will it break my users’ workflows?',
    a: 'That’s the point of the design. Instead of walling users off, GovernVeil redacts the sensitive value and lets the work continue — the prompt still goes, nothing real reaches the provider.',
  },
  {
    q: 'How is this different from a DLP tool?',
    a: 'Traditional DLP either allows a prompt or blocks it. GovernVeil is AI-specific: it understands prompts, gives graduated verdicts (allow / review / redact / block), and masks sensitive data rather than just stopping the request.',
  },
  {
    q: 'Which AI tools does it work with?',
    a: 'Frontier-model APIs via an OpenAI-compatible drop-in, plus the public assistants your people already use (ChatGPT, Claude) through a browser guard.',
  },
  {
    q: 'How do I prove compliance?',
    a: 'A tamper-evident, hash-chained audit ledger records who did what, the verdict, and the model/prompt version — mapped line-by-line to named controls for DPDP, APRA, HIPAA, or SOC 2 review.',
  },
]

function Faq() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Questions we hear</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 520 }}>
          Straight answers.
        </Title>
        <Reveal>
          <Collapse
            className="learn-faq"
            bordered={false}
            expandIconPosition="end"
            style={{ marginTop: 16, background: 'transparent' }}
            items={FAQ.map((f, i) => ({
              key: String(i),
              label: <Text strong>{f.q}</Text>,
              children: <Paragraph className="ed-body" style={{ marginBottom: 0 }}>{f.a}</Paragraph>,
            }))}
          />
        </Reveal>
      </div>
    </section>
  )
}

/* ---------- glossary ---------- */

const TERMS = [
  ['AI governance gateway', 'A checkpoint AI traffic passes through so an organisation can inspect, protect, decide on, and record every AI interaction.'],
  ['Shadow AI', 'AI tools used by staff or agents outside IT’s visibility or control — the main source of AI data leakage.'],
  ['Reversible masking', 'Swapping a sensitive value for a realistic stand-in before it reaches a model, and restoring the real value for the authorised user. (Restore is on our roadmap; today values are redacted one-way.)', true],
  ['Sovereignty / data residency', 'The guarantee that prompts — and the AI that inspects them — stay inside your country, cloud, or datacentre.'],
  ['Explainability', 'Every governance decision comes with a reason, the detector that fired, and a confidence score — not a black box.'],
  ['Graduated verdicts', 'Proportionate responses — allow / review / redact / block — instead of a blunt on/off.'],
  ['Hash-chained audit ledger', 'A tamper-evident log where each entry is cryptographically linked to the last, so records can’t be altered after the fact.'],
  ['AI TRiSM', 'AI Trust, Risk & Security Management — the analyst category for governing AI safely, with human oversight.'],
]

function Glossary() {
  return (
    <section className="ed-section">
      <div className="wrap ed-top">
        <Kicker>Glossary</Kicker>
        <Title level={2} className="ed-h2" style={{ maxWidth: 520 }}>
          The words behind the category.
        </Title>
        <Row gutter={[56, 32]} style={{ marginTop: 12 }}>
          {TERMS.map(([term, def, roadmap]) => (
            <Col xs={24} md={12} key={term}>
              <Reveal>
                <Title level={5} className="ed-t3" style={{ marginBottom: 6 }}>
                  {term}{roadmap && <Tag className="roadmap-inline">roadmap</Tag>}
                </Title>
                <Paragraph className="ed-body" style={{ marginBottom: 0 }}>{def}</Paragraph>
              </Reveal>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  )
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section className="band-red ed-cta">
      <div className="wrap">
        <Title level={2} className="ed-huge on-red">
          See it govern a real prompt
          <br />
          in 90 seconds.
        </Title>
        <Link to="/pilot">
          <Button size="large" className="btn-on-red">Book a design-partner pilot</Button>
        </Link>
        <Paragraph className="cta-note">3–5 design-partner slots per cohort.</Paragraph>
      </div>
    </section>
  )
}

export default function Learn() {
  return (
    <>
      <WhatIsIt />
      <WhyNow />
      <HowItWorks />
      <Faq />
      <Glossary />
      <CTA />
    </>
  )
}

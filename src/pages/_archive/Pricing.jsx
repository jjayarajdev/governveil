import { Badge, Button, Card, Col, Row, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader } from '../components/figma'

const { Title, Paragraph } = Typography

const TIERS = [
  {
    name: 'Core',
    price: '~$96',
    per: '/ governed-AI-user / year',
    floor: '500-seat floor',
    description: 'Content detection and audit evidence. Enforce policies, produce a verifiable audit trail.',
    features: [
      'Content detection ladder (fast path + local ML)',
      'Graduated verdicts: allow / review / redact / block',
      'Tamper-evident, hash-chained audit log',
      'Datadog export',
      'SOC 2, HIPAA, PCI DSS control mapping',
      'OpenAI-compatible drop-in',
      'Docker / Kubernetes self-hosted',
    ],
    notIncluded: ['Reversible masking', 'Access-plane scope-gating', 'Air-gapped reference architecture', 'Vendor/agent governance'],
    highlighted: false,
  },
  {
    name: 'Governed',
    price: 'Custom',
    per: '',
    floor: 'Includes Core +',
    description: 'Reversible masking and access-plane scope-gating. Work continues; data never leaves.',
    gate: 'Gate: reversible masking + access-plane scope-gating',
    features: [
      'Everything in Core',
      'Reversible masking — full round trip on API calls',
      'Browser/shadow-AI outbound masking (ChatGPT + claude.ai)',
      'API access scope-gating (Access plane — /gw/<app>)',
      'Multi-turn drip detection',
      { label: 'Document-upload hostile-content sweep', roadmap: true },
      'DPDP / APRA control mapping',
    ],
    notIncluded: ['Air-gapped reference architecture', 'Vendor/agent governance'],
    highlighted: true,
  },
  {
    name: 'Sovereign',
    price: 'Custom',
    per: '',
    floor: 'Includes Governed +',
    description: 'Air-gapped reference architecture and vendor/agent governance. For true sovereignty-constrained environments.',
    gate: 'Gate: air-gapped reference architecture + vendor/agent governance',
    features: [
      'Everything in Governed',
      'Air-gapped reference architecture (no internet egress required)',
      'Vendor & agent credential governance (grants, scope gate, kill-switch)',
      { label: 'Dormant-credential wake alerts', roadmap: true },
      'Self-improving detection (fine-tune on your reviewer labels)',
      'Dedicated deployment support',
    ],
    notIncluded: [],
    highlighted: false,
  },
]

function TierCard({ tier }) {
  const card = (
    <Card
      className="feature-card tier-card"
      style={{
        height: '100%',
        borderColor: tier.highlighted ? '#1677ff' : undefined,
        boxShadow: tier.highlighted ? '0 12px 40px -12px rgba(22,119,255,0.25)' : undefined,
      }}
    >
      <h3 style={{ fontSize: 17 }}>{tier.name}</h3>
      <div style={{ margin: '4px 0 2px' }}>
        <span className="bench-metric mono" style={{ minWidth: 0, fontSize: 26 }}>{tier.price}</span>{' '}
        <span style={{ fontSize: 12, color: 'rgba(38,51,63,0.5)' }}>{tier.per}</span>
      </div>
      <div style={{ fontSize: 12, color: 'rgba(38,51,63,0.5)', marginBottom: 12 }}>{tier.floor}</div>
      {tier.gate && <div className="how-box" style={{ marginBottom: 12 }}>{tier.gate}</div>}
      <p style={{ marginBottom: 18 }}>{tier.description}</p>
      <div style={{ marginBottom: 22 }}>
        {tier.features.map((f) => {
          const label = typeof f === 'string' ? f : f.label
          return (
            <div key={label} className="resid-row" style={{ fontSize: 13.5 }}>
              <CheckOutlined style={{ color: '#52c41a' }} /> {label}
              {typeof f !== 'string' && f.roadmap && (
                <Tag color="orange" style={{ marginLeft: 4 }}>roadmap</Tag>
              )}
            </div>
          )
        })}
        {tier.notIncluded.map((f) => (
          <div key={f} className="resid-row" style={{ fontSize: 13.5, color: 'rgba(38,51,63,0.35)' }}>
            <CloseOutlined style={{ color: '#d9d9d9' }} /> {f}
          </div>
        ))}
      </div>
      <Link to="/pilot">
        <Button type={tier.highlighted ? 'primary' : 'default'} block>
          Book a pilot
        </Button>
      </Link>
    </Card>
  )
  return tier.highlighted ? (
    <Badge.Ribbon text="Most common starting point" color="#1677ff">
      {card}
    </Badge.Ribbon>
  ) : (
    card
  )
}

export default function Pricing() {
  return (
    <>
      <FigPageHeader
        eyebrow="Pricing"
        title="Flat, self-hosted, predictable."
        subtitle="Priced per governed-AI-user — not per token you run on your own hardware, and not a $100k+ floor."
      />
      <section className="fig-section" style={{ borderTop: 'none', paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <Card className="feature-card" style={{ background: '#fafafa', marginBottom: 36 }}>
              <Row gutter={[32, 16]} align="middle">
                <Col xs={24} md={14}>
                  <div className="bench-metric mono" style={{ fontSize: 26, minWidth: 0 }}>
                    ~$96 <span style={{ fontSize: 15, fontWeight: 400, color: 'rgba(38,51,63,0.65)' }}>/ governed-AI-user / year</span>
                  </div>
                  <p style={{ margin: '6px 0 0' }}>
                    500-seat floor. A 1,500-person org with 500 AI users is
                    finally in-category. Land small, expand on seats.{' '}
                    <span style={{ color: 'rgba(38,51,63,0.45)' }}>(Confirm final numbers before signing.)</span>
                  </p>
                </Col>
                <Col xs={24} md={10}>
                  <strong style={{ display: 'block', marginBottom: 4 }}>What you also pay:</strong>
                  <p style={{ margin: 0 }}>
                    Your own infra. Reference pilot ≈ low-hundreds/month.
                    Production ≈ low-thousands/month on AWS. No per-token
                    surprise on renewal.
                  </p>
                </Col>
              </Row>
            </Card>
          </Reveal>

          <Row gutter={[20, 20]} align="stretch">
            {TIERS.map((t, i) => (
              <Col xs={24} lg={8} key={t.name}>
                <Reveal delay={i * 0.06} style={{ height: '100%' }}>
                  <TierCard tier={t} />
                </Reveal>
              </Col>
            ))}
          </Row>

          <Reveal>
            <div className="pilot-programme">
              <p className="eyebrow-label on-dark">Design-partner programme</p>
              <Title level={3} style={{ color: '#fff', marginTop: 0 }}>
                Paid 8–12-week pilots: $15k–$40k
              </Title>
              <Paragraph className="on-dark-body" style={{ maxWidth: 520, margin: '0 auto 24px' }}>
                Charge-for-pilot = an accountable outcome. You get early access,
                influence the roadmap, and retain all findings. Clear
                conversion path to a full licence at the end.
              </Paragraph>
              <Link to="/pilot">
                <Button type="primary" size="large">Request a pilot</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { Alert, Card, Col, Row, Tag, Typography } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader, PilotBand, RoadmapNote } from '../components/figma'

const { Title, Paragraph } = Typography

const PROTECTION = [
  {
    title: 'Self-hosted, air-gap capable',
    body: 'All ML inference runs locally — prompt content never leaves your environment. No vendor cloud in the verdict path.',
  },
  {
    title: 'Encryption in transit and at rest',
    body: 'TLS 1.2+ in transit. The reversible-masking vault encrypts with AES-256-GCM and stores ciphertext + HMAC only — no plaintext value is ever at rest.',
  },
  {
    title: 'Data residency by construction',
    body: 'There is no GovernVeil cloud to send prompts to. Residency is a deployment property, not a policy promise.',
  },
]

const IDENTITY = [
  'SSO via OIDC (Okta, Entra, or any OIDC IdP)',
  'Console RBAC: admin, security officer, read-only roles',
  'Service-token auth on the data path for non-human callers',
  'Fail-closed: policy engine unavailable means block, never allow-all',
]

const CONTROLS = [
  { framework: 'SOC 2', items: ['CC6 — logical and physical access controls', 'CC7 — system operations', 'C1 — confidential information'] },
  { framework: 'HIPAA', items: ['§164.312(b) — audit controls', '§164.308(a)(1)(ii)(D) — information-system activity review'] },
  { framework: 'PCI DSS', items: ['12.5.1 / 12.8 — third-party management', '3.x — protection of cardholder data'] },
  { framework: 'DPDP (India)', items: ['Rules 6 / 13 / 15 — security safeguards, breach evidence, and residency posture by construction'] },
  { framework: 'APRA (Australia)', items: ['CPS 234 — continuous-monitoring evidence', 'CPS 230 — third-party tech risk evidence'] },
]

export default function Security() {
  return (
    <>
      <FigPageHeader
        eyebrow="Security & Compliance"
        title="Governance you can prove, without your data leaving."
        subtitle="GovernVeil satisfies access, egress-control, and activity-review evidence requirements. It supports but does not satisfy fairness, provenance, and explainability. We say so plainly."
      />
      <section className="fig-section" style={{ borderTop: 'none' }}>
        <div className="wrap">
          <Row gutter={[56, 48]}>
            <Col xs={24} lg={12}>
              <Reveal>
                <Title level={4} style={{ marginTop: 0, marginBottom: 24 }}>Data protection</Title>
                {PROTECTION.map((p) => (
                  <div className="plane-row" key={p.title}>
                    <span className="plane-icon" style={{ background: '#f6ffed', color: '#52c41a', borderRadius: '50%' }}>
                      <CheckOutlined />
                    </span>
                    <div>
                      <div className="plane-title"><strong>{p.title}</strong></div>
                      <p>{p.body}</p>
                    </div>
                  </div>
                ))}

                <Title level={4} style={{ marginTop: 36, marginBottom: 24 }}>Access &amp; identity</Title>
                <Card size="small">
                  {IDENTITY.map((t) => (
                    <div key={t} className="resid-row">
                      <CheckOutlined style={{ color: '#1677ff' }} /> {t}
                    </div>
                  ))}
                  <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 8, marginTop: 8 }}>
                    <RoadmapNote>Multi-tenant isolation (org-scoped RLS) — not yet shipped</RoadmapNote>
                  </div>
                </Card>
              </Reveal>
            </Col>
            <Col xs={24} lg={12}>
              <Reveal delay={0.08}>
                <Title level={4} style={{ marginTop: 0, marginBottom: 8 }}>Evidence &amp; control mapping</Title>
                <Paragraph style={{ marginBottom: 24 }}>
                  GovernVeil produces audit artifacts mapped line-by-line to
                  named controls. The table below states exactly what is
                  satisfied and what is not.
                </Paragraph>
                {CONTROLS.map((c) => (
                  <Card
                    size="small"
                    key={c.framework}
                    style={{ marginBottom: 14 }}
                    title={
                      <span>
                        {c.framework}{' '}
                        <Tag color="green" style={{ marginLeft: 6 }}>satisfied</Tag>
                      </span>
                    }
                  >
                    {c.items.map((item) => (
                      <div key={item} className="resid-row" style={{ fontSize: 13 }}>
                        <CheckOutlined style={{ color: '#52c41a' }} /> {item}
                      </div>
                    ))}
                  </Card>
                ))}
                <Alert
                  type="warning"
                  showIcon
                  style={{ marginTop: 24, padding: '16px 20px' }}
                  message="What GovernVeil does not satisfy"
                  description={
                    <>
                      GovernVeil <strong>supports but does not satisfy</strong>{' '}
                      fairness, provenance, and explainability requirements. It
                      provides the access and egress-control evidence layer; it
                      does not perform model auditing, bias assessment, or
                      output-explanation functions.
                    </>
                  }
                />
              </Reveal>
            </Col>
          </Row>
        </div>
      </section>
      <PilotBand />
    </>
  )
}

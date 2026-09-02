import { Col, Row, Typography } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader, PilotBand } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const CONVICTIONS = [
  {
    title: 'Evidence first',
    body: 'Every claim on this site has a number, a mechanism, or a re-runnable harness behind it. Our detection benchmark is public and anyone can re-run it.',
  },
  {
    title: 'Self-hosted by conviction',
    body: 'The product runs where your data lives. No vendor cloud in the verdict path, which is why it works air-gapped and can learn from your data without your data moving.',
  },
  {
    title: 'Honest about the roadmap',
    body: 'Features are labelled shipped or roadmap, on the site and in the sales conversation. Multi-tenancy, additional SIEM emitters, the document-upload sweep, and dormant-credential wake alerts are roadmap today; everything else is running.',
  },
]

const SPINE = [
  {
    key: 'govern',
    desc: 'GovernVeil: policy, masking, evidence on every AI action',
    current: true,
  },
  {
    key: 'build',
    desc: 'platforms and AI-assisted delivery on the governed spine',
  },
  {
    key: 'operate',
    desc: 'round-the-clock operations on what ships',
  },
]

export default function About() {
  return (
    <>
      <FigPageHeader
        eyebrow="About"
        title="Evidence-first, by conviction."
        subtitle={
          <>
            GovernVeil is the AI-governance platform from{' '}
            <a href="https://syntegreti.com/">Syntegreti</a>, the AI consulting
            and platform company in Hyderabad, India. We build AI data-egress
            control and evidence for regulated enterprises: BFSI, healthcare
            and life sciences, global capability centres, and any organisation
            whose data cannot leave its perimeter for a verdict.
          </>
        }
      />

      <section className="ed-section">
        <div className="wrap ed-top">
          <Text className="eyebrow-label">What we hold ourselves to</Text>
          <Row gutter={[56, 44]}>
            {CONVICTIONS.map((c, i) => (
              <Col xs={24} md={8} key={c.title}>
                <Reveal delay={i * 0.06}>
                  <div className="cap-ed">
                    <div className="cap-line">
                      <Text className="cap-num">{String(i + 1).padStart(2, '0')}</Text>
                      <Title level={4}>{c.title}</Title>
                    </div>
                    <Paragraph>{c.body}</Paragraph>
                  </div>
                </Reveal>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      <section className="ed-dark">
        <div className="wrap">
          <Text className="eyebrow-label on-dark">The standard</Text>
          <Title level={2} className="ed-huge" style={{ margin: '8px 0 0' }}>
            Claims are cheap.
            <br />
            <span className="red">Evidence is the product.</span>
          </Title>
        </div>
      </section>

      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 48]} align="middle">
            <Col xs={24} lg={12}>
              <Reveal>
                <Text className="eyebrow-label">The company behind it</Text>
                <Title level={2} className="ed-h2" style={{ maxWidth: 460 }}>
                  One spine that governs how an enterprise adopts AI.
                </Title>
                <Paragraph className="ed-body" style={{ maxWidth: 480 }}>
                  Syntegreti ships flagship platforms for contracts and
                  business operations, and underneath them one spine that
                  governs how an enterprise adopts AI. GovernVeil is the
                  govern layer of that spine.
                </Paragraph>
                <Paragraph className="ed-body" style={{ maxWidth: 480 }}>
                  Delivery follows the same Catalyst discipline as the rest of
                  the portfolio: a working result in your environment in
                  weeks, not quarters.
                </Paragraph>
                <Paragraph style={{ marginBottom: 8 }}>
                  <a className="red-link" href="https://syntegreti.com/">
                    syntegreti.com <ArrowRightOutlined />
                  </a>
                </Paragraph>
                <Paragraph style={{ margin: 0 }}>
                  <a className="red-link" href="mailto:hello@syntegreti.com">
                    hello@syntegreti.com <ArrowRightOutlined />
                  </a>
                </Paragraph>
              </Reveal>
            </Col>
            <Col xs={24} lg={12}>
              <Reveal delay={0.08}>
                <Text className="eyebrow-label">The Syntegreti AI spine</Text>
                <div className="spine-box">
                  {SPINE.map((s) => (
                    <div className={`spine-row ${s.current ? 'spine-current' : ''}`} key={s.key}>
                      <Text code className="chip-red">{s.key}</Text>
                      <Paragraph>{s.desc}</Paragraph>
                    </div>
                  ))}
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

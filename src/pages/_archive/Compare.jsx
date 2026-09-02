import { Alert, Card, Col, Row, Table, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader, PilotBand } from '../components/figma'

const ROWS = [
  { feature: 'Inline redaction / graduated verdicts', gv: { yes: true, note: 'allow / review / redact / mask / block' }, competitor: { yes: false, note: 'allow / block / audit' } },
  { feature: 'Reversible masking (restore inbound)', gv: { yes: true, note: 'Full round trip on API path' }, competitor: { yes: false, note: '—' } },
  { feature: "LLM API-traffic enforcement (your apps' calls)", gv: { yes: true, note: 'Reverse proxy, in your perimeter' }, competitor: { yes: false, note: 'Or SDK sends prompts to a vendor cloud' } },
  { feature: 'Enterprise-API scope-gating (Access plane)', gv: { yes: true, note: 'No competitor profiled has this' }, competitor: { yes: false, note: '—' } },
  { feature: 'Claude (claude.ai + Anthropic API)', gv: { yes: true, note: 'Browser extension + API proxy' }, competitor: { yes: null, note: 'Partial or absent' } },
  { feature: 'Verdict in your perimeter (air-gap capable)', gv: { yes: true, note: 'Local inference — no vendor cloud' }, competitor: { yes: false, note: 'Vendor cloud required for ML verdict' } },
  { feature: 'Reproducible published benchmark', gv: { yes: true, note: 'AdvBench harness in the repo' }, competitor: { yes: false, note: '—' } },
  { feature: 'Pricing model', gv: { yes: null, note: 'Flat, per-AI-user, self-hosted' }, competitor: { yes: null, note: 'E5 uplift + usage meters / per-user floors' } },
].map((r, i) => ({ ...r, key: i }))

function Cell({ val }) {
  return (
    <span className="cmp-cell">
      {val.yes === true && <CheckOutlined style={{ color: '#52c41a' }} />}
      {val.yes === false && <CloseOutlined style={{ color: '#ff4d4f' }} />}
      {val.yes === null && <span style={{ color: 'rgba(38,51,63,0.45)' }}>~</span>}
      <span>{val.note}</span>
    </span>
  )
}

const COLUMNS = [
  {
    title: 'Capability',
    dataIndex: 'feature',
    key: 'feature',
    width: '34%',
    render: (v) => <strong>{v}</strong>,
  },
  {
    title: (
      <span className="cmp-cell">
        <img src="/assets/img/favicon.svg" alt="" width={18} height={18} /> GovernVeil
      </span>
    ),
    dataIndex: 'gv',
    key: 'gv',
    width: '33%',
    render: (v) => <Cell val={v} />,
  },
  {
    title: 'Endpoint/SSE DLP (Purview, SASE)',
    dataIndex: 'competitor',
    key: 'competitor',
    width: '33%',
    render: (v) => <Cell val={v} />,
  },
]

const SAAS_QUESTIONS = [
  {
    q: 'Where does the prompt go for its verdict?',
    them: 'Most SaaS control planes evaluate in their cloud — every prompt travels to be judged.',
    us: 'GovernVeil computes every verdict on local models inside your perimeter. The same deployment works air-gapped.',
  },
  {
    q: 'What happens on the response path?',
    them: 'Scan-and-block tools have no response path — a masked value stays broken.',
    us: 'On your apps’ API calls, masking is a full round trip: surrogates out, real values restored in the answer.',
  },
  {
    q: 'What’s their published false-positive rate?',
    them: 'Ask for a named benchmark, a number, and a way to re-run it.',
    us: '0 false positives on the 520-prompt AdvBench corpus (94.2% → 99.4% block rate, both published). The harness ships with every pilot.',
  },
]

const CONCEDED = [
  'Browser and endpoint perimeter — they own this layer',
  'M365 / SharePoint / Teams integration',
  'Identity-aware proxy and ZTNA',
  'Managed detection across thousands of SaaS apps',
]

export default function Compare() {
  return (
    <>
      <FigPageHeader
        eyebrow="Compare"
        title="GovernVeil vs endpoint/SSE DLP"
        subtitle="Additive, not either/or. Keep your browser/endpoint/M365 perimeter. GovernVeil takes the API path, Claude, non-Microsoft endpoints, and reversible redaction."
      />
      <section className="fig-section" style={{ borderTop: 'none', paddingTop: 56 }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <Reveal>
            <Alert
              type="info"
              showIcon
              style={{ marginBottom: 32, padding: '16px 20px' }}
              message="Concede what incumbents do well — win on the gap."
              description="Microsoft Purview and SASE vendors are excellent at the browser/M365/endpoint perimeter. GovernVeil wins on the API path (your applications calling model APIs directly), on reversible redaction, on data residency, and on published proof."
            />
          </Reveal>
          <Reveal>
            <Table
              size="middle"
              pagination={false}
              columns={COLUMNS}
              dataSource={ROWS}
              bordered
              scroll={{ x: true }}
            />
          </Reveal>
          <Reveal>
            <Card className="feature-card" style={{ background: '#fafafa', marginTop: 32 }}>
              <h3 style={{ fontSize: 15 }}>Where endpoint/SSE DLP vendors win (conceded)</h3>
              <Row gutter={[16, 8]}>
                {CONCEDED.map((t) => (
                  <Col xs={24} md={12} key={t}>
                    <div className="resid-row">
                      <CheckOutlined style={{ color: '#52c41a' }} /> {t}
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Reveal>
          <Reveal>
            <div className="fig-head" style={{ marginTop: 56, marginBottom: 28 }}>
              <p className="eyebrow-label">Evaluating a SaaS AI control plane too?</p>
              <Typography.Title level={3} style={{ margin: 0 }}>
                Three questions to ask any of them.
              </Typography.Title>
            </div>
            <Row gutter={[20, 20]}>
              {SAAS_QUESTIONS.map((s, i) => (
                <Col xs={24} md={8} key={s.q}>
                  <Card className="feature-card" style={{ height: '100%' }}>
                    <h3 style={{ fontSize: 15 }}>{`${i + 1}. ${s.q}`}</h3>
                    <p style={{ marginBottom: 10 }}>{s.them}</p>
                    <div className="how-box">
                      <strong>GovernVeil’s answer: </strong>
                      {s.us}
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Reveal>
          <Reveal>
            <Typography.Paragraph style={{ textAlign: 'center', marginTop: 32, marginBottom: 0 }}>
              Want specific numbers? <Link to="/benchmark">Read the benchmark →</Link>
            </Typography.Paragraph>
          </Reveal>
        </div>
      </section>
      <PilotBand />
    </>
  )
}

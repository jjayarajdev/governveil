import { Alert, Card, Col, Row, Table, Typography } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader, PilotBand } from '../components/figma'

const { Title, Paragraph } = Typography

const ADVBENCH = [
  { metric: '99.4%', label: 'Block rate', note: '520-prompt corpus, post guard-fix — 94.2% before; both numbers published' },
  { metric: '0', label: 'False positives', note: 'Benign prompts incorrectly blocked' },
  { metric: 'Public', label: 'Harness', note: 'Re-runnable, ships with the pilot' },
]

const EVASION_COLUMNS = [
  { title: 'Stage', dataIndex: 'stage', key: 'stage' },
  {
    title: 'Detection rate (held-out)',
    dataIndex: 'rate',
    key: 'rate',
    render: (v, r) => <span className="mono" style={{ color: r.good ? '#52c41a' : '#faad14' }}>{v}</span>,
  },
  {
    title: 'New false positives',
    dataIndex: 'fps',
    key: 'fps',
    render: (v, r) => <span className="mono" style={{ color: r.good ? '#52c41a' : undefined }}>{v}</span>,
  },
]

const EVASION_ROWS = [
  { key: 1, stage: 'Before fine-tuning', rate: '85%', fps: '0', good: false },
  { key: 2, stage: 'After one fine-tune cycle (in-house, reviewer labels)', rate: '100%', fps: '0', good: true },
]

const LATENCY_COLUMNS = [
  { title: 'Path', dataIndex: 'path', key: 'path', render: (v) => <strong>{v}</strong> },
  { title: 'p50', dataIndex: 'p50', key: 'p50', render: (v) => <span className="mono" style={{ color: '#1677ff' }}>{v}</span> },
  { title: 'p95', dataIndex: 'p95', key: 'p95', render: (v) => <span className="mono">{v}</span> },
  { title: 'Hardware', dataIndex: 'hw', key: 'hw' },
  { title: 'Notes', dataIndex: 'notes', key: 'notes' },
]

const LATENCY_ROWS = [
  { key: 1, path: 'Fast path (keyword/regex)', p50: 'sub-5ms', p95: 'sub-5ms', hw: '2 vCPU', notes: 'Stateless pattern match, no ML' },
  { key: 2, path: 'ML path (sequential detectors)', p50: '~190ms', p95: '—', hw: 'A10G GPU', notes: 'Full local detection ladder; p95 published with pilot methodology' },
  { key: 3, path: 'ML path (batched serving)', p50: '67ms', p95: '80ms', hw: 'A10G GPU', notes: 'Dynamic batching at 64 concurrent, 888 req/s' },
  { key: 4, path: 'Kill-switch enforcement', p50: '~0.5ms', p95: '—', hw: 'Any', notes: 'Grant-status check in data-path auth, synchronous' },
]

const NOT_CLAIMED = [
  'No FF3-1 — we use FF1-class format preservation with a domain floor. Adequate for realistic surrogates; not a cryptographic FPE claim.',
  "No differential privacy or k-anonymity for prompts — these are audit-analytics properties, not single-prompt properties. Don't apply them here.",
  "PII detection is not '99%' — which is exactly why we mask instead of block. Detection is a gate for masking, not a final verdict.",
  'No sub-100ms ML latency claim as a single figure — the fast path is sub-5ms; the ML path is ~190ms p50. We publish both.',
]

export default function Benchmark() {
  return (
    <>
      <FigPageHeader
        eyebrow="Benchmark / Proof"
        title="Reproducible results. Published methodology. No adjectives."
        subtitle="Every number here comes with a mechanism and a re-run path. Ask any competitor for their published false-positive rate."
      />
      <section className="fig-section" style={{ borderTop: 'none' }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <Reveal>
            <Title level={4} style={{ marginTop: 0, marginBottom: 6 }}>
              AdvBench: harmful-prompt detection
            </Title>
            <Paragraph style={{ marginBottom: 24 }}>
              Public benchmark. Re-runnable harness in the repo. Run it yourself
              and publish the result.
            </Paragraph>
            <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
              {ADVBENCH.map((s) => (
                <Col xs={24} sm={8} key={s.label}>
                  <Card className="feature-card" style={{ textAlign: 'center', height: '100%' }}>
                    <div className="bench-metric mono" style={{ fontSize: 30, minWidth: 0 }}>{s.metric}</div>
                    <strong style={{ display: 'block', fontSize: 14 }}>{s.label}</strong>
                    <em className="stat-em">{s.note}</em>
                  </Card>
                </Col>
              ))}
            </Row>
            <div className="term" style={{ boxShadow: 'none' }}>
              <pre className="dark-pre">
                <span className="c-mid"># re-runnable AdvBench harness · 520-prompt corpus</span>{'\n'}
                <span className="c-mid"># ships with every pilot deployment — point it at your own gateway</span>{'\n'}
                <span style={{ color: '#52c41a' }}># result: block rate + false-positive count, yours to publish</span>
              </pre>
            </div>
            <Paragraph type="secondary" style={{ fontSize: 13, marginTop: 10, marginBottom: 0 }}>
              The full harness and methodology travel with pilot conversations —
              re-run it on your own deployment and publish the result.
            </Paragraph>
          </Reveal>

          <Reveal>
            <Title level={4} style={{ marginTop: 56, marginBottom: 6 }}>
              Self-improving detection: evasion closure
            </Title>
            <Paragraph style={{ marginBottom: 20 }}>
              A reviewer-label fine-tuning cycle ran on a real evasion pattern.
              Held-out test set. 0 new false positives introduced.
            </Paragraph>
            <Table
              size="middle"
              pagination={false}
              columns={EVASION_COLUMNS}
              dataSource={EVASION_ROWS}
              bordered
            />
          </Reveal>

          <Reveal>
            <Title level={4} style={{ marginTop: 56, marginBottom: 6 }}>
              Honest latency table
            </Title>
            <Paragraph style={{ marginBottom: 20 }}>
              Two numbers with methodology — not one marketing figure. Hardware
              and measurement approach stated explicitly.
            </Paragraph>
            <Table
              size="middle"
              pagination={false}
              columns={LATENCY_COLUMNS}
              dataSource={LATENCY_ROWS}
              bordered
              scroll={{ x: true }}
            />
          </Reveal>

          <Reveal>
            <Alert
              type="warning"
              showIcon
              style={{ marginTop: 56, padding: '20px 24px' }}
              message="What we don't claim"
              description={
                <ul className="claim-list">
                  {NOT_CLAIMED.map((t) => (
                    <li key={t}>
                      <CloseOutlined style={{ color: '#faad14' }} /> {t}
                    </li>
                  ))}
                </ul>
              }
            />
          </Reveal>
        </div>
      </section>
      <PilotBand />
    </>
  )
}

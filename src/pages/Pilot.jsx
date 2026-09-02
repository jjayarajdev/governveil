import { useState } from 'react'
import { Button, Col, Form, Input, Result, Row, Select, Typography } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import Reveal from '../components/Reveal'
import { FigPageHeader } from '../components/figma'

const { Title, Paragraph, Text } = Typography

const WEEKS = [
  {
    week: 'Week 1',
    title: 'First catch, live',
    body: 'Point one app at the gateway and watch it redact a real prompt before it leaves. Or install the extension for a team — see it mask/block shadow-AI prompts in the page itself.',
  },
  {
    week: 'Weeks 2–4',
    title: 'Coverage expansion',
    body: 'Add more apps or users. Tune detection policies. Validate against your actual data patterns, not synthetic test sets.',
  },
  {
    week: 'Weeks 5–12',
    title: 'Evidence production',
    body: 'Build the audit artefacts mapped to your named controls. Produce the evidence your compliance team needs. Finalise your deployment architecture.',
  },
]

const TERMS = [
  'Paid: $15k–$40k depending on scope',
  '8–12 weeks with a clear conversion path',
  'You retain all findings and IP',
  'We retain no rights to your data',
  'Dedicated deployment support throughout',
]

export default function Pilot() {
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = useState(false)

  const onFinish = (values) => {
    const body = encodeURIComponent(
      `Name: ${values.name}\nCompany: ${values.company}\nRegion: ${values.region}\n\n` +
        `AI traffic we cannot see today:\n${values.gap || ''}`,
    )
    const subject = encodeURIComponent(`Design-partner pilot request: ${values.company}`)
    window.location.href = `mailto:hello@syntegreti.com?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <FigPageHeader
        eyebrow="Design-partner programme"
        title="Be in your environment producing a surprising result before you have to trust us."
        subtitle="A paid 8–12-week pilot. Week one: point one app at the gateway and watch it catch a real prompt before it leaves — your environment, your data, and an audit trail your auditor will accept."
      />
      <section className="ed-section">
        <div className="wrap ed-top">
          <Row gutter={[72, 56]}>
            <Col xs={24} lg={13}>
              <Reveal>
                <Text className="eyebrow-label">What the pilot delivers</Text>
                <div style={{ marginTop: 6 }}>
                  {WEEKS.map((w) => (
                    <div className="lx-item" key={w.week}>
                      <div className="lx-head">
                        <Text code className="chip-red">{w.week}</Text>
                        <Title level={4}>{w.title}</Title>
                      </div>
                      <Paragraph>{w.body}</Paragraph>
                    </div>
                  ))}
                </div>

                <Text className="eyebrow-label" style={{ marginTop: 36 }}>Pilot terms</Text>
                <div className="spine-box">
                  {TERMS.map((t) => (
                    <div className="spine-row" key={t} style={{ padding: '13px 20px' }}>
                      <span className="sq" aria-hidden="true" style={{ alignSelf: 'center' }} />
                      <Paragraph>{t}</Paragraph>
                    </div>
                  ))}
                </div>
              </Reveal>
            </Col>
            <Col xs={24} lg={11}>
              <Reveal delay={0.08}>
                {submitted ? (
                  <div className="feat-box">
                    <Result
                      status="success"
                      title="Request received."
                      subTitle="Your email client opened with the pre-filled request — send it to complete. We review pilot applications and respond within 2 business days. We're selecting 3–5 organisations for the current cohort."
                    />
                  </div>
                ) : (
                  <div className="feat-box" style={{ padding: '26px 28px' }}>
                    <Title level={4} style={{ marginTop: 0, marginBottom: 4 }}>Request a pilot</Title>
                    <Paragraph type="secondary" style={{ fontSize: 13, marginBottom: 20 }}>
                      3–5 slots per cohort. We respond within 2 business days.
                    </Paragraph>
                    <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
                      <Row gutter={16}>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please enter your name.' }]}
                          >
                            <Input placeholder="Sarah Chen" autoComplete="name" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={12}>
                          <Form.Item
                            label="Work email"
                            name="email"
                            rules={[
                              { required: true, message: 'Please enter a valid work email.' },
                              { type: 'email', message: 'Please enter a valid work email.' },
                            ]}
                          >
                            <Input placeholder="sarah@company.com" autoComplete="email" />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item
                        label="Company"
                        name="company"
                        rules={[{ required: true, message: 'Please enter your company.' }]}
                      >
                        <Input placeholder="Acme Financial Services" autoComplete="organization" />
                      </Form.Item>
                      <Form.Item
                        label="Region"
                        name="region"
                        rules={[{ required: true, message: 'Please select a region.' }]}
                      >
                        <Select
                          placeholder="Select region"
                          options={[
                            { value: 'India (GCC / BFSI / Pharma)' },
                            { value: 'Australia (APRA-regulated)' },
                            { value: 'APAC — other' },
                            { value: 'Europe' },
                            { value: 'Middle East' },
                            { value: 'Other' },
                          ]}
                        />
                      </Form.Item>
                      <Form.Item
                        label="What AI traffic can't you see today?"
                        name="gap"
                        rules={[{ required: true, message: 'Please describe the gap.' }]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="e.g. Our app teams call frontier-model APIs directly and we have no audit trail. Staff use personal AI-assistant accounts we can't see."
                        />
                      </Form.Item>
                      <Button type="primary" htmlType="submit" block size="large" icon={<SendOutlined />} iconPosition="end">
                        Request a pilot
                      </Button>
                      <Paragraph type="secondary" style={{ fontSize: 12, textAlign: 'center', marginTop: 12, marginBottom: 0 }}>
                        This opens a pre-filled email — no backend, no mailing
                        list. We respond to pilot requests only.
                      </Paragraph>
                    </Form>
                  </div>
                )}
              </Reveal>
            </Col>
          </Row>
        </div>
      </section>
    </>
  )
}

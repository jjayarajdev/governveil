import { Button, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

export function Verdict({ v }) {
  const color = { allow: 'green', review: 'purple', mask: 'blue', redact: 'blue', block: 'red' }[v]
  return (
    <Tag color={color} className="verdict-tag">
      <span className="verdict-dot" />
      {v}
    </Tag>
  )
}

export function SectionHead({ eyebrow, title, dark }) {
  return (
    <div className="fig-head">
      <Text className={`eyebrow-label ${dark ? 'on-dark' : ''}`}>{eyebrow}</Text>
      <Title level={2} className="ed-h2">
        {title}
      </Title>
    </div>
  )
}

export function FigPageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="ed-pagehead">
      <div className="wrap">
        <Text className="eyebrow-label">{eyebrow}</Text>
        <Title className="ed-pagetitle">{title}</Title>
        {subtitle && (
          <Paragraph className="ed-body" style={{ maxWidth: 660 }}>
            {subtitle}
          </Paragraph>
        )}
      </div>
    </div>
  )
}

export function RoadmapNote({ children }) {
  return <Text className="fb-roadmap">[roadmap] {children}</Text>
}

export function PilotBand() {
  return (
    <section className="band-red ed-cta">
      <div className="wrap">
        <Title level={2} className="ed-huge">
          See it catch a real prompt
          <br />
          in 90 seconds.
        </Title>
        <Paragraph className="cta-note" style={{ margin: '0 0 28px' }}>
          A paid 8–12-week design-partner pilot. Week one: a real prompt
          caught before it leaves — real data, your environment.
        </Paragraph>
        <Link to="/pilot">
          <Button size="large" className="btn-on-red">
            Book a design-partner pilot
          </Button>
        </Link>
      </div>
    </section>
  )
}

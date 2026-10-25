import { Button, Tag, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Title, Paragraph, Text } = Typography

export function Verdict({ v }) {
  const color = { allow: 'green', flag: 'purple', mask: 'blue', acknowledge: 'gold', block: 'red' }[v]
  return (
    <Tag color={color} className="verdict-tag">
      <span className="verdict-dot" />
      {v}
    </Tag>
  )
}

/* A real product capture. WebP with a 2x source; every image on the site is a
   screenshot of the running console, so the caption always says what page it is.

   `className` lets the revamp pages render the same component into their own
   `.shot` styling instead of the editorial `.gv-shot`. `x2` is off for captures
   that have no 2x master — the acknowledge card is a crop of a 1x capture, and
   claiming a 2x source it doesn't have would just make the browser 404. */
export function Shot({
  src,
  alt,
  children,
  onDark,
  className = 'gv-shot',
  width = 1100,
  height = 688,
  x2 = true,
}) {
  const base = `/assets/img/product/web/${src}`
  return (
    <figure className={`${className} ${onDark ? 'on-dark' : ''}`.trim()}>
      <img
        src={`${base}.webp`}
        srcSet={x2 ? `${base}.webp ${width}w, ${base}@2x.webp ${width * 2}w` : undefined}
        sizes={x2 ? `(max-width: 980px) 100vw, ${width}px` : undefined}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
      />
      <figcaption>{children}</figcaption>
    </figure>
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

const LEGEND = [
  { v: 'allow', text: 'forwarded unchanged' },
  { v: 'flag', text: 'sent, and raised for human review' },
  { v: 'mask', text: 'sensitive spans replaced with stand-ins; real values restored inbound (vault on)' },
  { v: 'acknowledge', text: 'the person minimises the fields, says why, and sends — signed as a decision' },
  { v: 'block', text: 'send cancelled, logged' },
]

export function VerdictLegend() {
  return (
    <div className="legend-block">
      <Text className="eyebrow-label">
        Every request ends in one of five audited verdicts
      </Text>
      <div className="verdict-grid">
        {LEGEND.map((l) => (
          <div className="vg-cell" key={l.v}>
            <Verdict v={l.v} />
            <Paragraph>{l.text}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RoadmapNote({ children, label = 'roadmap' }) {
  return <Text className="fb-roadmap">[{label}] {children}</Text>
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
          caught before it leaves — real data, your environment — and a
          signed attestation that nothing else left.
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

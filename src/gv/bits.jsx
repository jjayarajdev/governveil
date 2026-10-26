import { Link } from 'react-router-dom'
import { readRegion } from '../region'
import { REGION_CONTENT } from './regions'

/* A verdict / status tag. `k` is the suffix of the .t-* class: allow, flag,
   mask, ack, block, ship, optin, road. */
export function Tag({ k, children, style }) {
  return <span className={`tag t-${k}`} style={style}>{children}</span>
}

export function Eyebrow({ children, plain, style }) {
  return <p className={`eyebrow${plain ? ' eyebrow-plain' : ''}`} style={style}>{children}</p>
}

/* eyebrow + heading + optional lede, with the standing 52px gap beneath. */
export function SectionHead({ eyebrow, title, children }) {
  return (
    <div className="section-head">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="h-section">{title}</h2>
      {children && <p className="lede lede-flush">{children}</p>}
    </div>
  )
}

export function Band({ sunken, flush, narrow, id, children, style }) {
  const cls = ['band', sunken && 'band-sunken', flush && 'band-flush']
    .filter(Boolean)
    .join(' ')
  return (
    <section className={cls} id={id} style={style}>
      <div className={narrow ? 'wrap wrap-narrow' : 'wrap'}>{children}</div>
    </section>
  )
}

export function Table({ head, children, narrow, style }) {
  return (
    <div className={`tablewrap${narrow ? ' table-narrow' : ''}`} style={style}>
      <table>
        <thead><tr>{head}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function Stat({ n, unit, label, children }) {
  return (
    <div className="stat">
      <div className="stat-n">{n}{unit && <small>{unit}</small>}</div>
      <div className="stat-l">{label}</div>
      <p>{children}</p>
    </div>
  )
}

export function Step({ n, title, children, tags }) {
  return (
    <div className="step">
      <div className="step-n">{n}</div>
      <div>
        <h3>{title}</h3>
        {children}
        {tags && <div className="tag-row">{tags}</div>}
      </div>
    </div>
  )
}

export function KV({ children }) {
  return <dl className="kv">{children}</dl>
}

export function Row({ k, children }) {
  return (
    <div className="kv-row">
      <dt>{k}</dt>
      <dd>{children}</dd>
    </div>
  )
}

/* The "How it works" disclosure inside a Features card. */
export function HowItWorks({ children }) {
  return (
    <details className="acc acc-inline">
      <summary>How it works</summary>
      <div className="acc-body">{children}</div>
    </details>
  )
}

/* The closing band. Identical on all eight pages that carry it — Pilot is the
   exception, since it is the page this points at. The pitch differs by market:
   .com sells a paid 8-12 week pilot, .au a free 4-6 week one. */
export function Cta() {
  const { pilot } = REGION_CONTENT[readRegion()]
  const [primaryLabel, primaryTo] = pilot.primaryCta
  const [secondaryLabel, secondaryTo] = pilot.secondaryCta
  return (
    <section className="cta">
      <div className="wrap">
        <h2 className="h-section">See it catch a real prompt in 90&nbsp;seconds.</h2>
        <p>{pilot.ctaBlurb}</p>
        <div className="btn-row">
          <Link className="btn btn-primary" to={primaryTo}>{primaryLabel}</Link>
          <Link className="btn btn-ghost" to={secondaryTo}>{secondaryLabel}</Link>
        </div>
        {!pilot.free && (
          <p className="tiny dim" style={{ marginTop: 22 }}>{pilot.cohort}</p>
        )}
      </div>
    </section>
  )
}

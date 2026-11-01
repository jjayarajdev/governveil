import { Link } from 'react-router-dom'
import { Band, Cta, Eyebrow, KV, Row, SectionHead } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const COMMITMENTS = [
  ['01', 'Evidence first',
    <>Every claim on this site has a number, a mechanism or a re-runnable harness behind
      it. Our detection benchmark is public, with the corpora and the runner committed,
      so anyone can re-run it on their own stack. We probe our own controls daily and
      publish the result as a column. Every figure on this site traces to something you
      can check.</>],
  ['02', 'Self-hosted by conviction',
    <>The product runs where your data lives. There is no vendor cloud in the verdict
      path — signed, not asserted — which is why it works air-gapped, and why it can
      learn from your traffic without your data moving. That was an architectural decision taken
      early, and every other property on this page follows from it.</>],
  ['03', 'What you see is what runs',
    <>Everything described on this site is running in the product today. Where a
      capability is off until you turn it on — reversible masking is the one that
      matters — it carries an opt-in label, so a deployment never does something you
      did not choose.</>],
]

export default function About() {
  const { about, entity } = REGION_CONTENT[readRegion()]
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>About</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '16ch' }}>
            Evidence-first, by <em>conviction</em>.
          </h1>
          <p className="lede">{about.lede}</p>
        </div>
      </section>

      {/* ───── commitments ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="What we hold ourselves to"
          title="Three commitments, and the evidence for each."
        />
        <div className="grid cols-3">
          {COMMITMENTS.map(([n, h, p]) => (
            <div className="card card-num" key={n}>
              <span className="numeral">{n}</span>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── the standard ───── */}
      <section className="band">
        <div className="wrap wrap-narrow" style={{ textAlign: 'center' }}>
          <Eyebrow plain style={{ justifyContent: 'center' }}>The standard</Eyebrow>
          <h2 className="h-display" style={{ fontSize: 'clamp(34px, 4.4vw, 54px)' }}>
            Claims are cheap.<br />
            <em>Evidence is the product.</em>
          </h2>
        </div>
      </section>

      {/* ───── the company ───── */}
      <section className="band band-sunken">
        <div className="wrap grid cols-2 gap-wide" style={{ alignItems: 'start' }}>
          <div>
            <Eyebrow>{about.companyEyebrow}</Eyebrow>
            <h2 className="h-sub h-sub-lg">{about.companyTitle}</h2>
            {about.companyParas.map((para) => (
              <p className="muted" key={para.slice(0, 32)}>{para}</p>
            ))}
            <div className="btn-row" style={{ marginTop: 22 }}>
              {entity.parent && (
                <a className="link" href={entity.parent[1]} rel="noopener">
                  {entity.parent[0]}
                </a>
              )}
              <a className="link" href={`mailto:${entity.email}`}>{entity.email}</a>
            </div>
          </div>
          <div>
            <Eyebrow>{about.asideEyebrow}</Eyebrow>
            <KV>
              {about.aside.map(([k, v]) => <Row k={k} key={k}>{v}</Row>)}
            </KV>
          </div>
        </div>
      </section>


      <Cta />
    </>
  )
}

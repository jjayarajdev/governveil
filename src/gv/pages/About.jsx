import { Link } from 'react-router-dom'
import { Band, Cta, Eyebrow, KV, Row, SectionHead } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const COMMITMENTS = [
  ['01', 'Evidence first',
    <>Every claim on this site has a number, a mechanism or a re-runnable harness behind
      it. Our detection benchmark is public and anyone can re-run it, including the two
      rows where we score badly. We probe our own controls daily and publish the column.
      Where we have not measured something, this site says so rather than reaching for
      an adjective.</>],
  ['02', 'Self-hosted by conviction',
    <>The product runs where your data lives. There is no vendor cloud in the verdict
      path — signed, not asserted — which is why it works air-gapped, and why it can
      learn from your traffic without your data moving. This was an architectural
      decision taken early, and it is the reason several otherwise easier things are hard
      for us.</>],
  ['03', 'Honest about the roadmap',
    <>Features are labelled shipping, opt-in or roadmap — here, and in the sales
      conversation. <b>Roadmap today:</b> multi-tenancy, an external notification
      dispatcher, and native Splunk and Sentinel emitters. <b>Opt-in today:</b>{' '}
      reversible masking, built and off by default. Everything else on this site is
      running.</>],
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

      {/* ───── where we are small ───── */}
      <Band narrow>
        <Eyebrow>Before you ask</Eyebrow>
        <h2 className="h-section">Where we are small.</h2>
        <p className="muted">
          We are founder-led and early. There are certifications we have not started and
          assurances a larger vendor could hand you today — they are named in full on the
          security page rather than left for you to find, and they are funded in the plan
          rather than wished away.
        </p>
        <p className="muted">
          What we would put against them: the enforcement path is self-hosted, so your
          exposure to us as a company is bounded by your own environment; the evidence is
          in your ledger rather than our cloud; and the benchmark is one you can run
          without us being in the room.
        </p>
        <p style={{ marginTop: 22 }}>
          <Link className="link" to="/security">{about.gapsLink}</Link>
        </p>
      </Band>

      <Cta />
    </>
  )
}

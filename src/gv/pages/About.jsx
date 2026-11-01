import { Link } from 'react-router-dom'
import { Band, Cta, Eyebrow, KV, Row, SectionHead } from '../bits'

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
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>About</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '16ch' }}>
            Evidence-first, by <em>conviction</em>.
          </h1>
          <p className="lede">
            GovernVeil is the AI-governance platform from Syntegreti, the AI consulting
            and platform company in Hyderabad, India. We build AI data-egress control and
            evidence for regulated enterprises — BFSI, healthcare and life sciences,
            global capability centres, and any organisation whose data cannot leave its
            perimeter for a verdict.
          </p>
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
            <Eyebrow>The company behind it</Eyebrow>
            <h2 className="h-sub h-sub-lg">
              One spine that governs how an enterprise adopts AI.
            </h2>
            <p className="muted">
              Syntegreti ships flagship platforms for contracts and business operations,
              and underneath them one spine that governs how an enterprise adopts AI.
              GovernVeil is the govern layer of that spine.
            </p>
            <p className="muted">
              Delivery follows the same discipline as the rest of the portfolio: a
              working result in your environment in weeks, not quarters. That is also why
              the pilot is eight to twelve weeks rather than two quarters.
            </p>
            <div className="btn-row" style={{ marginTop: 22 }}>
              <a className="link" href="https://syntegreti.com/" rel="noopener">
                syntegreti.com ↗
              </a>
              <a className="link" href="mailto:contact@syntegreti.com">
                contact@syntegreti.com
              </a>
            </div>
          </div>
          <div>
            <Eyebrow>The Syntegreti AI spine</Eyebrow>
            <KV>
              <Row k="operate">Round-the-clock operations on what ships</Row>
              <Row k="build">Platforms and AI-assisted delivery on the governed spine</Row>
              <Row k="govern">
                <b>GovernVeil</b> — policy, masking and evidence on every AI action
              </Row>
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
          <Link className="link" to="/security">
            What we have not done, named →
          </Link>
        </p>
      </Band>

      <Cta />
    </>
  )
}

import { useRef, useState } from 'react'
import { Band, Eyebrow, KV, Row, SectionHead, Step } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const REGIONS = [
  'India', 'Asia-Pacific', 'Middle East', 'Europe',
  'Australia / New Zealand', 'North America',
]

export default function Pilot() {
  const form = useRef(null)
  const [sent, setSent] = useState(false)
  const { pilot, entity } = REGION_CONTENT[readRegion()]

  // No backend: the form composes a mailto the visitor's own client opens.
  // A form `action="mailto:"` is unreliable across browsers, so build the URL
  // ourselves — the same approach the previous pilot page used.
  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.target)
    const company = f.get('company') || 'a pilot enquiry'
    const subject = encodeURIComponent(`Design-partner pilot request: ${company}`)
    const body = encodeURIComponent(
      `Name: ${f.get('name') || ''}\n` +
      `Work email: ${f.get('email') || ''}\n` +
      `Company: ${f.get('company') || ''}\n` +
      `Region: ${f.get('region') || ''}\n\n` +
      `AI traffic to bring under governance:\n${f.get('problem') || ''}\n`,
    )
    window.location.href = `mailto:${entity.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  const scrollToForm = (e) => {
    e.preventDefault()
    form.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Design-partner programme</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '21ch' }}>
            Be in your environment producing a surprising result <em>before</em> you
            have to trust us.
          </h1>
          <p className="lede">
            {pilot.lengthPhrase} Week one: point one application at the gateway and
            watch it catch a real prompt before it leaves — your environment, your data,
            and an audit trail your auditor will accept. Then pull the signed attestation
            and check that nothing else left either.
          </p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#request" onClick={scrollToForm}>
              Request a pilot →
            </a>
          </div>
        </div>
      </section>

      {/* ───── what the pilot delivers ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="What the pilot delivers"
          title="From first catch to audit-ready evidence."
        />
        <div className="steps">
          <Step n="WK 1" title="First catch, live">
            <p>
              Point one application at the gateway and watch it replace a real value
              before the prompt leaves. Or install the extension for one team and see it
              mask, block or raise an acknowledgement card inside the assistant page.
              Pull the signed no-egress attestation the same day and hand it to your
              security team.
            </p>
          </Step>
          <Step n="WK 2–4" title="Coverage expansion">
            <p>
              Register your assets, models and agents with named owners. Run in detective
              mode and read what <em>would</em> have blocked, so you can size the blast
              radius before you take it. Import a week of DNS or proxy telemetry and see
              your real coverage number rather than the gateway’s own count. Tune
              policies against your data, not a synthetic set.
            </p>
          </Step>
          <Step n="WK 5–12" title="Evidence production">
            <p>
              Ingest your own AI policy and confirm the clause-to-control mappings. Flip
              controls from detective to enforced. Run the probes. Produce the gap
              assessment, the first attestations and the drift report your compliance
              team needs — and finalise the deployment architecture for production.
            </p>
          </Step>
        </div>
      </Band>

      {/* ───── terms ───── */}
      <section className="band">
        <div className="wrap grid cols-2 gap-wide" style={{ alignItems: 'start' }}>
          <div>
            <Eyebrow>Pilot terms</Eyebrow>
            <h2 className="h-sub h-sub-lg">Plain terms, and a clear path to production.</h2>
            <div style={{ marginTop: 22 }}>
              <KV>
                {pilot.fee
                  ? <Row k="Fee"><b>{pilot.fee}</b>, depending on scope</Row>
                  : <Row k="Fee"><b>Free</b> for design partners in this cohort</Row>}
                <Row k="Length">{pilot.length}</Row>
                <Row k="Scope">
                  Up to 5 governed assets and 500 users; one application surface plus the
                  extension
                </Row>
                {pilot.free
                  ? <Row k="Conversion">
                      Design-partner pricing on year one, held for as long as you
                      stay on the programme
                    </Row>
                  : <Row k="Conversion">
                      20&nbsp;% off year one, 50&nbsp;% of the fee credited,
                      10&nbsp;% off permanently from year two
                    </Row>}
                <Row k="Findings & IP">Yours. We retain no rights to your data.</Row>
                <Row k="Support">Dedicated deployment support throughout</Row>
                <Row k="Cohort">3–5 slots. We reply within two business days.</Row>
              </KV>
            </div>
          </div>
          <div>
            <Eyebrow>What we need from you</Eyebrow>
            <h2 className="h-sub h-sub-lg">Four things, and an owner.</h2>
            <ul className="checklist" style={{ marginTop: 22 }}>
              <li><span>One application whose base URL you can change, or one team
                willing to install a managed extension.</span></li>
              <li><span>A GPU instance in your environment — one A10G-class box is the
                reference.</span></li>
              <li><span>A named owner on your side who can schedule the integration call
                and chase a firewall change. This is the single best predictor of
                whether a pilot reaches a verdict.</span></li>
              <li><span>An honest answer to what you are worried about, so week one tests
                that rather than something we found easy to demonstrate.</span></li>
            </ul>
            <p className="note" style={{ marginTop: 26 }}>
              Three success criteria agreed in writing before we start, so at week twelve
              there is a yes or a no rather than a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* ───── request ───── */}
      <section className="band band-sunken" id="request" ref={form}>
        <div className="wrap wrap-narrow">
          <Eyebrow>Request a pilot</Eyebrow>
          <h2 className="h-section">Tell us what you can’t see today.</h2>
          <p className="lede">The last question is the one we actually read first.</p>

          {sent ? (
            <div className="form-sent">
              <h3 className="h-sub">Your email client should be open.</h3>
              <p className="muted" style={{ marginBottom: 0 }}>
                Nothing was sent from this page — the request is a draft in your own
                client, so check it and send. If it didn’t open, write to{' '}
                <a className="link" href={`mailto:${entity.email}`}>
                  {entity.email}
                </a>{' '}
                directly.
              </p>
            </div>
          ) : (
            <form className="card form" onSubmit={onSubmit}>
              <label>
                <span>Name</span>
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                <span>Work email</span>
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <label>
                <span>Company</span>
                <input name="company" autoComplete="organization" />
              </label>
              <label>
                <span>Region</span>
                <select name="region" defaultValue="">
                  <option value="">Select region</option>
                  {REGIONS.map((r) => <option key={r}>{r}</option>)}
                </select>
              </label>
              <label>
                <span>What AI traffic can’t you see today?</span>
                <textarea name="problem" rows={4} />
              </label>
              <div className="btn-row" style={{ marginTop: 4 }}>
                <button className="btn btn-primary" type="submit">Request a pilot</button>
              </div>
              <p className="tiny dim" style={{ margin: 0 }}>
                Opens a pre-filled email in your own client. No backend, no mailing list,
                no tracking. We only reply to pilot requests. You can also just write to{' '}
                <a className="link" href={`mailto:${entity.email}`}>
                  {entity.email}
                </a>.
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

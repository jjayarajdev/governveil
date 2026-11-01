import { Link } from 'react-router-dom'
import { Act, Opening, Row, Rows } from '../interview'
import { Cta } from '../bits'
import { Capture } from '../capture'
import d from '../data/platform.json'

/* The front door to the product experience.

   An argument, not a menu. Each demonstration is introduced by the number it
   actually produced, so the card is itself evidence rather than a promise —
   and the last act is what has not been built, because that is the part a
   diligence process reaches anyway. */

const n = (x) => x.toLocaleString('en-AU')

export default function Platform() {
  return (
    <>
      <Opening
        q="Your people are already using AI. What can you prove about it?"
        answer="Every interaction, on the record."
      >
        <p>
          Applications call model APIs. Agents call tools. People paste into
          assistants you do not run. Each of those is a place your data can leave and
          a decision somebody will later ask you to justify — and a licence, a policy
          document and a contract answer none of it.
        </p>
        <p>
          GovernVeil sits in the path, decides in your own network, and signs what it
          did. The demonstrations below replay runs the product actually produced.
        </p>
      </Opening>

      <Act n="I" title="Watch it work">
        <section className="pf band-hatch">
          <div className="wrap pf-demos">
            {d.demos.map((x) => (
              <Link className="pf-demo" to={x.to} key={x.to}>
                <span className="pf-kicker">{x.kicker}</span>
                <span className="pf-fig">{x.figure}</span>
                <span className="pf-fignote">{x.figureNote}</span>
                <h3 className="pf-t">{x.title}</h3>
                <p className="pf-b">{x.body}</p>
                <span className="pf-src mono">{x.source}</span>
                <span className="pf-go">Open the replay →</span>
              </Link>
            ))}
          </div>
          <div className="wrap">
            <p className="qa-aside pf-note">
              Both are replays of recorded runs, not live enforcement, and each says so
              on its own page. The runs are committed to the repository; the numbers on
              these cards are what they produced.
            </p>
          </div>
        </section>
      </Act>

      <Act n="II" title="Where it sits">
        <section className="qa">
          <div className="wrap qa-in">
            <h3 className="qa-q">Four surfaces, one engine, one ledger.</h3>
            <div className="qa-a">
              <p>
                The same policy chain runs on every path a prompt can take out of your
                organisation, and every verdict lands on the same hash chain. There is
                no second system to reconcile.
              </p>
              <Rows>
                {d.surfaces.map(([k, v]) => <Row k={k} key={k}>{v}</Row>)}
              </Rows>
              <Capture
                src="egress"
                where="configure / estate / egress"
                crop={{ scale: 1.9, x: -18, y: -24, h: 300 }}
                alt="The GovernVeil egress control page listing the governed destinations, each with its classification and inspect-and-redact profile."
              >
                <b>The allow-list, as the gateway holds it.</b> Every destination the
                estate may reach — the same list the signed attestation names.
              </Capture>
              <p>
                <Link className="link" to="/interview/product">The eight steps a request passes through</Link>
              </p>
            </div>
          </div>
        </section>
      </Act>

      <Act n="III" title="What is actually there">
        <section className="qa">
          <div className="wrap qa-in">
            <h3 className="qa-q">This is a system, not a demonstration.</h3>
            <div className="qa-a">
              <p>
                The replays above come out of the same repository that runs the
                product. It is worth knowing the shape of it before you decide how
                much of this to believe.
              </p>
              <div className="figs" style={{ '--figs': 2 }}>
                <div><b>{n(d.engine.goLoc)}</b><span>lines of Go in the gateway, excluding tests</span></div>
                <div><b>{n(d.engine.testLoc)}</b><span>lines of test across {d.engine.testFiles} files</span></div>
                <div><b>{d.engine.routes}</b><span>registered API paths</span></div>
                <div><b>{d.engine.migrations}</b><span>schema migrations over {d.engine.tables} tables</span></div>
              </div>
              <p className="qa-aside">
                Counted from the repository on 31 October 2026. {d.controls} controls
                are seeded and enforced or attested, each with the evidence source it
                is judged from — not a catalogue of intentions.
              </p>
            </div>
          </div>
        </section>
      </Act>


      <Cta />
    </>
  )
}

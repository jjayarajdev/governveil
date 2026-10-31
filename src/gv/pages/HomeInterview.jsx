import { Link } from 'react-router-dom'
import { Shot } from '../../components/figma'
import { Tag } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

/* Shape: 06 · Conversational FAQ.
   An interview, not a brochure. Every question is one a buyer actually asks —
   two of them are the questions this company tells buyers to ask every vendor
   on their list — and every answer is a fact already on the site. One idea per
   screen by construction; the mechanism sits behind a disclosure so the answer
   stays short and the depth is still there. */

function Pair({ q, children, more, link }) {
  return (
    <section className="qa">
      <div className="wrap qa-in">
        <h2 className="qa-q">{q}</h2>
        <div className="qa-a">
          {children}
          {more && (
            <details className="qa-more">
              <summary>The mechanism</summary>
              <div className="qa-more-body">{more}</div>
            </details>
          )}
          {link && <p><Link className="link" to={link[1]}>{link[0]}</Link></p>}
        </div>
      </div>
    </section>
  )
}

export default function HomeInterview() {
  const { pilot, home } = REGION_CONTENT[readRegion()]
  const { panel } = home

  return (
    <>
      {/* The hero asks the first question — the one they tell buyers to ask
          every vendor. The answer is one word and a signed payload. */}
      <section className="qa qa-hero">
        <div className="wrap qa-in">
          <h1 className="qa-q qa-q-lead">Where does the prompt go for a verdict?</h1>
          <div className="qa-a">
            <p className="qa-answer">Nowhere.</p>
            <p>
              Every verdict is computed by a model inside your own network — not by us,
              not by a hyperscaler. Ten of the thirteen products we verified send prompt
              content out to reach a verdict, several of them marketed as self-hosted.
              That difference is architectural, so we made it checkable rather than
              asking you to believe it.
            </p>
            <div className="panel qa-panel">
              <div className="panel-head">
                <span>GET /api/v1/attestation</span><span>hmac-sha256</span>
              </div>
              <div className="panel-row">
                <pre>{`"inference_local":  `}<code>true</code>{`
"egress_enforced":  `}<code>true</code>{`
"non_allowlisted_egress_attempts": `}<code>0</code></pre>
              </div>
              <div className="panel-foot">
                <span>$ make attest</span><span>zero is the proof</span>
              </div>
            </div>
            <div className="btn-row">
              <Link className="btn btn-primary" to={pilot.primaryCta[1]}>
                {pilot.primaryCta[0]}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Pair
        q="What actually happens to a prompt carrying real data?"
        link={['The request lifecycle', '/product']}
        more={
          <>The fast pattern path runs first — US and India identifier formats,
          credentials and injection phrasing, in under a millisecond. Anything it
          cannot settle goes to one local model that answers every policy as a
          plain-language question in a single forward pass. The signed row is
          appended to the hash chain <em>before</em> the caller gets its reply, so
          evidence cannot lag the decision.</>
        }
      >
        <p>
          The sensitive spans are replaced before it leaves, and the decision is
          signed to a tamper-evident ledger before the reply comes back. The work
          still happens. Nothing real reaches the provider.
        </p>
        <div className="panel qa-panel">
          <div className="panel-head">
            <span>POST /v1/chat/completions</span><Tag k="mask">mask</Tag>
          </div>
          <div className="panel-row">
            <div className="panel-label">your app sends</div>
            <pre>{panel.before}<span className="hit">{panel.first}</span>
              {panel.between}<span className="hit">{panel.second}</span>{'"'}</pre>
          </div>
          <div className="panel-row">
            <div className="panel-label">the provider sees</div>
            <pre>{panel.before}<span className="redacted" />{panel.between}
              <span className="redacted" />{'"'}</pre>
          </div>
          <div className="panel-foot">
            <span>entry #4187 · signed · prev 9f2c…e41a</span>
            <span>✓ written before the reply</span>
          </div>
        </div>
      </Pair>

      <Pair
        q="So it blocks things. Doesn’t that just move the problem?"
        link={['Every verdict, in detail', '/features']}
        more={
          <>When several policies match one prompt the most restrictive verdict
          wins, then severity, then stage order — deterministic, and tested as an
          invariant. On the <span className="mono">/v1</span> path, where there is
          no human at the keyboard, acknowledge degrades to mask.</>
        }
      >
        <p>
          It would, which is why blocking is one outcome of five rather than the only
          one. A person with a legitimate reason gets <b>acknowledge</b>: here are the
          real values we found, untick what the assistant doesn’t need, say why the
          rest must go, and send. The name, the reason and the field types are signed
          to the ledger — the values are not.
        </p>
        <div className="verdict-row">
          {[['allow', 'ok', 'forwarded unchanged'],
            ['flag', 'flag', 'sent, and raised for review'],
            ['mask', 'mask', 'spans replaced, the rest forwarded'],
            ['acknowledge', 'ack', 'the person minimises and says why'],
            ['block', 'block', 'cancelled, and ledgered']].map(([v, tone, what]) => (
            <div className="verdict-row-item" key={v}>
              <Tag k={tone === 'ok' ? 'allow' : tone}>{v}</Tag>
              <span>{what}</span>
            </div>
          ))}
        </div>
      </Pair>

      <Pair
        q="Our problem isn’t the chat window. It’s everything else."
        link={['How the surfaces fit', '/product']}
        more={
          <>One policy engine and one ledger across all three. Registering a{' '}
          <span className="mono">/gw</span> service or a vendor agent creates its
          asset automatically, so the registry cannot drift behind what the gateway
          is actually governing.</>
        }
      >
        <p>
          Then the chat window is the part you least need us for. The same engine
          governs three surfaces: applications calling model APIs on one base-URL
          change, enterprise APIs gated by role → scope → operation, and agent tool
          calls through the MCP connector. A browser extension covers the public
          assistants your people already use, with no MDM dependency.
        </p>
        <div className="route-row">
          <div><span className="mono">/v1/*</span><span>apps and agents calling model APIs</span></div>
          <div><span className="mono">{'/gw/<app>'}</span><span>enterprise APIs, gated before content inspection</span></div>
          <div><span className="mono">/mcp/v1/*</span><span>every agent tool call, before and after it runs</span></div>
        </div>
      </Pair>

      <Pair
        q="How would I know a control is still working six months from now?"
        link={['How controls are challenged', '/benchmark']}
        more={
          <>For every enforced control: the canonical trigger, which must act; a
          benign near-miss, which must pass; and a known evasion, which must still be
          stopped. Probes travel the real data path under a probe identity, tagged
          synthetic on both the ledger and the evidence row so they never inflate
          your traffic numbers, and judged from the evidence they produced rather
          than from a response code.</>
        }
      >
        <p>
          Because it is challenged daily and the result is a column you can read.
          Control state — holding, weak, breached, untested — is computed from the
          ledger, never from someone ticking a box.
        </p>
        <Shot
          className="shot"
          src="policy-drift"
          alt="The GovernVeil policy drift report, asking whether the policy says what the ledger did."
        >
          <b>Does the policy say what the ledger did?</b> Computed over 2,869 real
          ledger rows, with 442 synthetic probe rows skipped.
        </Shot>
      </Pair>

      <Pair
        q="How good is the detection, honestly?"
        link={['Read the benchmark', '/benchmark']}
        more={
          <>Scored through the gateway’s own analyse endpoint in dry-run mode, so no
          ledger rows are written and the real policy chain is what gets measured.
          Entirely local — no prompt in the corpus is sent anywhere to be scored. It
          is not an independent audit: we wrote the corpora, and you should bring
          your own.</>
        }
      >
        <p>
          On the published <span className="mono">combined-1000</span> corpus: 93.25 %
          recall, 100 % precision, and zero of 200 benign prompts wrongly caught. The
          corpora and the runner are committed, so you can re-run it on your own stack
          without us in the room.
        </p>
        <p>
          The two rows we are worst at are on the page too, because they are why the
          flag tier and a review queue exist at all.
        </p>
        <div className="figure-row">
          <div><b>93.25 %</b><span>recall, 800 should-catch prompts</span></div>
          <div><b>0 of 200</b><span>benign prompts wrongly caught</span></div>
          <div className="figure-low"><b>80 %</b><span>PII — our weak row</span></div>
          <div className="figure-low"><b>66.7 %</b><span>business-sensitive — our weakest</span></div>
        </div>
      </Pair>

      <Pair
        q="What haven’t you built?"
        link={['The full list of gaps', '/security']}
        more={
          <>Reversible masking is built and off by default. The vault, the key
          custody, the rotation and the restore path all exist and are tested; the
          feature flag ships off, and turning it on is a decision your pilot makes
          deliberately. We will not describe it as roadmap, and we will not describe
          it as on.</>
        }
      >
        <p>
          Multi-tenancy is not in the schema — no organisation column, no row-level
          security, so one deployment governs one organisation. Incident notifications
          are a clock, not a dispatcher. There are no native Splunk or Sentinel
          emitters. In-page restore in the browser is outbound-only by design and not
          planned, because reliably rewriting a third-party web UI’s turns is not
          achievable and we would rather not claim it.
        </p>
        <p className="qa-aside">
          We would rather lose a deal on a gap you found here than on one you found in
          week six.
        </p>
      </Pair>

      <Pair q="How do I start?" link={pilot.secondaryCta[0] ? null : null}>
        <p>{pilot.ctaBlurb}</p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <Link className="btn btn-ghost" to={pilot.primaryCta[1]}>
            {pilot.primaryCta[0]}
          </Link>
        </div>
      </Pair>
    </>
  )
}

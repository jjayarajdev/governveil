import { Link } from 'react-router-dom'
import { Shot } from '../../components/figma'
import { Tag } from '../bits'
import { Act, Pair } from '../interview'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

/* Shape: 06 · Conversational FAQ, in four acts.
   An interview, not a brochure. Every question is one a buyer actually asks,
   two of them are the questions this company tells buyers to ask every vendor,
   and every answer is a fact already on another page of this site. The acts
   give it an arc: what you have, how it works, what you can check, what we
   have not done. The mechanism sits behind a disclosure so the answer stays
   short and the depth is still a click away. */

export default function HomeInterview() {
  const { pilot, home } = REGION_CONTENT[readRegion()]
  const { panel } = home

  return (
    <>
      {/* The hero asks the question they tell buyers to ask every vendor. */}
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

      <Act n="I" title="What you probably already have">
        <Pair
          q="We already own Microsoft Purview."
          link={['The thirteen products, verified', '/compare']}
          more={
            <>We position additively, and we will not tell you a competitor&rsquo;s
            product is bad. The two questions we hand you — where the prompt goes, and
            whether the product restores your data or only blocks it — are the ones
            that sort the field. If the answers favour someone else for your estate,
            that is a better outcome than a pilot that fails in week six.</>
          }
        >
          <p>
            You probably do, and it is a reasonable first line. Since November 2025 it
            blocks GenAI prompts inline, and if your estate is entirely Edge, Intune and
            Entra it covers a real part of the problem. Keep it.
          </p>
          <ul className="miss-list">
            <li>Edge, Intune and Entra only — other browsers and unmanaged devices are outside it</li>
            <li>No claude.ai coverage</li>
            <li>No redaction: the choice is allow or block, so the work stops</li>
            <li>No API path — your applications and agents are not in scope at all</li>
            <li>By its own documentation, it cannot scan the contents of files uploaded into prompts</li>
          </ul>
        </Pair>
      </Act>

      <Act n="II" title="How it actually works">
        <Pair
          q="What happens to a prompt carrying real data?"
          link={['The request lifecycle', '/product']}
          more={
            <>The fast pattern path runs first — US and India identifier formats,
            credentials and injection phrasing, in under a millisecond. Anything it
            cannot settle goes to one local model that answers every policy as a
            plain-language question in a single forward pass. The signed row is
            appended to the hash chain <em>before</em> the caller gets its reply, so
            the evidence cannot lag the decision.</>
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
              <span>&#10003; written before the reply</span>
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
            governs three surfaces, and a browser extension covers the public
            assistants your people already use, with no MDM dependency.
          </p>
          <div className="route-row">
            <div><span className="mono">/v1/*</span><span>apps and agents calling model APIs</span></div>
            <div><span className="mono">{'/gw/<app>'}</span><span>enterprise APIs, gated before content inspection</span></div>
            <div><span className="mono">/mcp/v1/*</span><span>every agent tool call, before and after it runs</span></div>
          </div>
        </Pair>

        <Pair
          q="What does this cost us in latency?"
          link={['The numbers, with the method attached', '/benchmark']}
          more={
            <>The ceiling is about 7.4 requests a second per GPU, measured at 100 %
            escalation on an A10G — 2,399 ledger rows, no fail-open observed. Real
            traffic does not escalate at 100 %: the sizing model puts 15–30 % of
            requests on the model path. The classic five-model stack measures about
            190 ms on the same GPU and is retained as a fallback.</>
          }
        >
          <p>
            Most requests never reach the model. The pattern path answers in under a
            millisecond, and a revoked credential is refused in about half of one —
            before any inspection runs at all.
          </p>
          <div className="route-row">
            <div><span className="mono">sub-ms</span><span>fast path — regex, secrets, injection phrases</span></div>
            <div><span className="mono">~0.5 ms</span><span>kill switch, revoked grant to 403</span></div>
            <div><span className="mono">~135–170 ms</span><span>model path, single request, no queue</span></div>
            <div><span className="mono">15–30 %</span><span>share of real traffic that reaches the model</span></div>
          </div>
        </Pair>

        <Pair
          q="What happens when something on the path breaks?"
          link={['The architecture, in full', '/security']}
          more={
            <>There are defence-in-depth layers that fail open by design. None of them
            is on the data path. A detector error under strict validation blocks and
            names its reason, so an outage cannot quietly become an allow.</>
          }
        >
          <p>
            It blocks, and says why. An unreachable policy engine, a model-server
            timeout or a document it cannot scan all end the same way — a refusal with
            a reason on the record, never a silent allow. Every error path on the
            document guardrail is quarantine.
          </p>
        </Pair>
      </Act>

      <Act n="III" title="What you can check yourself">
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
          q="What does my auditor actually get?"
          link={['The ledger, field by field', '/security']}
          more={
            <>Each row carries the SHA-256 hash of the row before it with a
            database-assigned sequence, so an edit anywhere fails verification at that
            row. No code path and no migration updates or deletes an audit row — a rule
            the codebase enforces on itself. Daily anchors go to your logs, so a chain
            can be checked against an external record of yesterday.</>
          }
        >
          <p>
            A signed, append-only ledger and a standalone verifier that walks the whole
            chain from the command line, independently of the running gateway. Control
            state computed from that ledger. Gap assessments and drift reports as
            exportable documents. And policy changes are signed into the same chain, so
            who turned a control off, and when, is itself evidence.
          </p>
        </Pair>
      </Act>

      <Act n="IV" title="Getting started">
        <Pair q="How do I start?">
          <p>{pilot.ctaBlurb}</p>
          <div className="btn-row" style={{ marginTop: 20 }}>
            <Link className="btn btn-primary" to={pilot.primaryCta[1]}>
              {pilot.primaryCta[0]}
            </Link>
          </div>
        </Pair>
      </Act>
    </>
  )
}

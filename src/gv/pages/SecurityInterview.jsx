import { Link } from 'react-router-dom'
import { Shot } from '../../components/figma'
import { Cta } from '../bits'
import { Act, Opening, Pair, Row, Rows } from '../interview'
import { readRegion } from '../../region'
import { COMPLIANCE } from '../regions'

/* Shape: 06 · Conversational FAQ, four acts.
   Security is the page a buyer arrives at already sceptical, so it is the page
   the shape fits best. The claim, then the architecture under it, then the
   record it leaves, then what an auditor gets and how to check it yourself. */

export default function SecurityInterview() {
  const region = readRegion()
  const compliance = COMPLIANCE[region]

  return (
    <>
      <Opening
        q="Your diagram says nothing leaves. Why should I believe it?"
        answer="Because you can pull the statement yourself."
      >
        <p>
          Residency is an architectural property, and architecture can be argued
          with. So the gateway signs a statement your security team can fetch,
          naming the local inference endpoint, the device, the egress allow-list,
          and the count of outbound connections the verdict path made to anything
          outside it.
        </p>
        <div className="panel qa-panel">
          <div className="panel-head">
            <span>GET /api/v1/attestation</span><span>hmac-sha256</span>
          </div>
          <div className="panel-row">
            <pre>{`{
  "inference_local": `}<code>true</code>{`,
  "ml_server":       "ml.internal:8091",
  "egress_allowlist":[
     "api.anthropic.com", "api.openai.com"
  ],
  "egress_enforced": `}<code>true</code>{`,
  "non_allowlisted_egress_attempts": `}<code>0</code>{`,
  "signature": "hmac-sha256:…"
}`}</pre>
          </div>
          <div className="panel-foot">
            <span>$ make attest</span><span>zero is the proof</span>
          </div>
        </div>
      </Opening>

      <Act n="I" title="Reading the attestation">
        <Pair
          q="What is each field actually telling me?"
          link={['Why that question sorts the field', '/compare']}
          more={
            <>The signature is HMAC-SHA256 over the statement, so the attestation
            cannot be quietly edited between being generated and being shown to you.
            This is the artefact behind the first of the two questions we suggest you
            ask every vendor on your list.</>
          }
        >
          <Rows>
            <Row k="inference_local">
              verdicts are computed at this in-perimeter endpoint; nothing else scores
              the prompt
            </Row>
            <Row k="egress_allowlist">
              the only external hosts the gateway may reach — your configured model
              providers, and nothing else
            </Row>
            <Row k="egress_enforced">
              denied, or merely observed and logged — it ships in observe mode and you
              turn enforcement on
            </Row>
            <Row k="non_allowlisted_egress_attempts">
              the number that matters. Zero is the proof
            </Row>
          </Rows>
          <p className="qa-aside">
            Enforce the allow-list and the guarantee stops depending on the absence of
            evidence.
          </p>
        </Pair>

        <Pair q="Can I see what the allow-list actually holds?">
          <p>
            It is a page, not a config file you have to take on trust. Every
            destination the estate may reach, with its classification and profile —
            the same list the attestation names.
          </p>
          <Shot
            className="shot"
            src="egress"
            alt="The GovernVeil egress control page listing governed destinations with their classification and profile."
          >
            <b>The allow-list, as the gateway holds it.</b> The per-destination traffic
            columns read <span className="mono">—</span> rather than an estimate: those
            counts come from forward-proxy telemetry, a separate integration
            rather than filling them in.
          </Shot>
        </Pair>
      </Act>

      <Act n="II" title="What sits under the claim">
        <Pair
          q="Where does it run, and what does it talk to?"
          more={
            <>One Docker image serves both the gateway and the model server. Compose
            variants for demo, pilot, GPU and CloudWatch, and a Helm chart for
            Kubernetes. The pilot compose file has no default secrets.</>
          }
        >
          <p>
            In your VPC or on your own premises. All detection models run locally —
            CUDA, Apple Metal or CPU, auto-selected. The gateway talks to the model
            server over HTTP inside your network and to nothing else: there is no
            message queue, socket or shared-memory channel to audit.
          </p>
          <p>
            Because no outbound call is needed to reach a verdict, the enforcement path
            works with no internet at all. In an air-gapped deployment the only thing
            missing is the forward to a public provider, which you were not making
            anyway.
          </p>
        </Pair>

        <Pair
          q="What happens when something on the path is unavailable?"
          more={
            <>There are defence-in-depth layers that fail open by design. None of them
            is on the data path. A detector error under strict validation blocks and
            names its reason, so a detection outage cannot quietly become an allow.</>
          }
        >
          <p>
            It blocks, and the reason goes on the record. An unreachable policy engine,
            a model-server timeout or a document it cannot scan all end the same way.
            Every error path on the document guardrail is quarantine, never allow.
          </p>
        </Pair>

        <Pair q="What about data at rest, and who can sign in?">
          <p>
            Encryption in transit and at rest. DLP content is redacted at rest by
            migration, so raw sensitive spans are not persisted. Vault keys are
            KEK-wrapped, rotate online, and every vault event is itself a ledger row.
          </p>
          <Rows>
            <Row k="auth">OIDC or local, HS256 sessions with key rotation</Row>
            <Row k="roles">admin, security officer, read-only — enforced, not advisory</Row>
            <Row k="tokens">
              <span className="mono">aigw_</span> data-path service tokens, tied to grants
            </Row>
            <Row k="secrets">from the environment or a secrets manager</Row>
          </Rows>
        </Pair>
      </Act>

      <Act n="III" title="The record it leaves">
        <Pair
          q="What stops someone editing the ledger?"
          more={
            <>A standalone verifier walks the whole chain from the command line,
            independently of the running gateway. Daily anchors are emitted to your
            logs, so a chain can be checked against an external record of what it
            looked like yesterday. The decision reason is persisted on every row, so
            the durable ledger — not just a transient event stream — can say why a
            request was refused.</>
          }
        >
          <p>
            Each row carries the SHA-256 hash of the row before it, with a
            database-assigned sequence. Edit anything, anywhere, and verification fails
            at that row. No code path and no migration updates or deletes an audit row
            — that is a rule the codebase enforces on itself, not a convention.
          </p>
        </Pair>

        <Pair q="Who turned a control off, and when?">
          <p>
            That is a row too. Policy and configuration changes are signed into the same
            chain as the traffic, with the before and the after, so the question has an
            answer rather than an opinion.
          </p>
          <Shot
            className="shot"
            src="ledger-changes"
            alt="The GovernVeil changes ledger, each row naming who made a configuration change and the chain entry it was signed into."
          >
            <b>Every change, as a decision on the chain.</b> The actor, the before and
            after (<span className="mono">action: block → mask</span>), and the entry it
            was signed into.
          </Shot>
        </Pair>
      </Act>

      <Act n="IV" title="Assessed against a board's questions">
        <Pair
          q={typeof compliance.title === 'string' ? compliance.title : 'What standards is this assessed against?'}
          link={['The two questions to ask every vendor', '/compare']}
        >
          <p>{compliance.blurb}</p>
          {compliance.badges && (
            <div className="tag-row">
              {compliance.badges.map((b) => (
                <span className="tag t-ship" key={b}>{b}</span>
              ))}
            </div>
          )}
          {compliance.footnote && <p className="qa-aside">{compliance.footnote}</p>}
        </Pair>

        <Pair
          q="How do I check any of this for myself?"
          link={['Book a design-partner pilot', '/pilot']}
        >
          <p>
            Pull the attestation and read the number. Run the benchmark on your own
            stack with no cloud calls. Walk the ledger with the standalone verifier.
            Every claim on this page is one you can test without us in the room, which
            is the only kind worth making.
          </p>
        </Pair>
      </Act>

      <Cta />
    </>
  )
}

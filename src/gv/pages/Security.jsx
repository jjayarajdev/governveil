import { Shot } from '../../components/figma'
import { Band, Cta, Eyebrow, KV, Row, SectionHead } from '../bits'
import { readRegion } from '../../region'
import { ASSURANCE_LOOP, COMPLIANCE, LOOP_AUDIENCES } from '../regions'

const ARCHITECTURE = [
  ['Deployment',
    `Self-hosted in your VPC or on-prem. One Docker image serves both the gateway and
     the model server; Compose variants for demo, pilot, GPU and CloudWatch, and a Helm
     chart for Kubernetes. The pilot compose file has no default secrets.`],
  ['Inference',
    `All detection models run locally — CUDA, Apple Metal or CPU, auto-selected. The
     gateway talks to the model server over HTTP inside your network and nothing else.
     There is no message queue, socket or shared-memory channel to audit.`],
  ['Air-gapped operation',
    `Because no outbound call is needed to reach a verdict, the enforcement path works
     with no internet at all. In an air-gapped deployment the only thing missing is the
     forward to a public provider, which you were not making anyway.`],
  ['Fail-closed data path',
    `An unreachable policy engine, a model-server timeout or an unscannable document
     results in a block. A detector error under strict validation blocks and names its
     reason. There are defence-in-depth layers that fail open by design; none of them is
     on the data path.`],
  ['Data at rest',
    `Encryption in transit and at rest. DLP content is redacted at rest by migration, so
     raw sensitive spans are not persisted. Vault keys are KEK-wrapped, rotate online,
     and every vault event is itself a ledger row.`],
  ['Identity',
    <>OIDC or local authentication, HS256 sessions with key rotation, three enforced
      roles (admin, security officer, read-only), and <span className="mono">aigw_</span>{' '}
      data-path service tokens tied to grants. Secrets come from the environment or a
      secrets manager.</>],
]

const ASSURANCE = [
  ['Regimes in scope for our buyers',
    `India DPDP, the EU AI Act, GCC data rules, APRA CPS 230 and CPS 234, Australian
     PSPF and ISM, and the residency expectations that come with BFSI, healthcare and
     government work.`],
  ['What the product gives an auditor',
    `The signed ledger and its verifier, control state computed from that ledger, gap
     assessments and drift reports as exportable documents, the attestation cycle, and
     the no-egress attestation itself.`],
  ['How controls map',
    `Your own policy clauses are ingested as immutable versions and mapped to catalogue
     controls, with the confirmation recorded as a signed decision. The mapping has
     provenance, so “which clause is this control serving?” has an answer.`],
]

const ATTESTATION = `{
  "inference_local": `

/* The assurance loop — policy becomes controls, controls are tested against
   real traffic, what that shows goes back into the policy. DOM order is 01-06;
   CSS lays row two right-to-left so it reads as a cycle without the markup
   having to lie to a screen reader. */
function AssuranceLoop() {
  return (
    <Band>
      <SectionHead
        eyebrow="The assurance loop"
        title={<>From policy to <em>proof</em>, in one loop.</>}
      >
        Most AI governance stops at the policy document. GovernVeil brings the whole
        chain together in one loop: your policy becomes controls, every AI request is
        checked against them in context, each control is tested to show whether it’s
        actually working, and what you learn goes back into the policy. Effectiveness
        you can show, not just claim.
      </SectionHead>

      <div className="loop">
        {ASSURANCE_LOOP.map(([n, title, body]) => (
          <div className="loop-step" key={n}>
            <span className="numeral">{n}</span>
            <h3 className="h-sub">{title}</h3>
            <p>{body}</p>
          </div>
        ))}
      </div>

      <div className="loop-rail">
        <b>Any AI tool, app or agent in your environment</b>
        <span>Every decision written to your signed ledger</span>
      </div>

      <div className="grid cols-3" style={{ marginTop: 40 }}>
        {LOOP_AUDIENCES.map(([who, what]) => (
          <div key={who}>
            <h3 className="h-sub" style={{ fontSize: 17 }}>{who}</h3>
            <p className="muted small">{what}</p>
          </div>
        ))}
      </div>
    </Band>
  )
}


export default function Security() {
  const region = readRegion()
  const compliance = COMPLIANCE[region]
  return (
    <>
      <section className="hero">
        <div className="wrap hero-split">
          <div>
            <Eyebrow>Security &amp; residency</Eyebrow>
            <h1 className="h-display">
              Data residency by <em>construction</em>, not by contract.
            </h1>
            <p className="lede">
              The core claim is that no prompt content leaves your network to get a
              verdict. That is an architectural property, and architecture can be argued
              with. So we made it checkable: a signed statement your security team can
              pull, with the number that matters in it.
            </p>
          </div>
          <div className="panel">
            <div className="panel-head">
              <span>GET /api/v1/attestation</span><span>hmac-sha256</span>
            </div>
            <div className="panel-row">
              <pre>{ATTESTATION}<code>true</code>{`,
  "ml_server":       "ml.internal:8091",
  "inference_device":"cuda",
  "egress_allowlist":[
     "api.anthropic.com", "api.openai.com"
  ],
  "egress_enforced": `}<code>true</code>{`,
  "non_allowlisted_egress_attempts": `}<code>0</code>{`,
  "statement": "Every content verdict is computed
     by the local model at ml.internal:8091
     (in-perimeter); no prompt content is sent
     out for a verdict…",
  "signature": "hmac-sha256:…"
}`}</pre>
            </div>
            <div className="panel-foot">
              <span>$ make attest</span><span>zero is the proof</span>
            </div>
          </div>
        </div>
      </section>

      {/* ───── the attestation ───── */}
      <Band>
        <SectionHead
          eyebrow="The attestation, field by field"
          title="What your security team should check."
        />
        <KV>
          <Row k="inference_local">
            Verdicts are computed at this in-perimeter endpoint. Nothing else scores the
            prompt.
          </Row>
          <Row k="egress_allowlist">
            The only external hosts the gateway may reach — your configured model
            providers, and nothing else. You set it explicitly.
          </Row>
          <Row k="egress_enforced">
            Whether the allow-list is enforced or merely observed. Enforce it and the
            guarantee stops depending on the absence of evidence.
          </Row>
          <Row k="non_allowlisted_egress_attempts">
            <b>The number that matters.</b> Every outbound connection the verdict path
            made to a host outside the allow-list. Zero is the proof.
          </Row>
          <Row k="signature">
            HMAC-SHA256 over the statement, so the attestation cannot be quietly edited
            between being generated and being shown to you.
          </Row>
        </KV>
        <p className="note" style={{ marginTop: 32 }}>
          This is the artefact behind the first of the two questions we suggest you ask
          every vendor on your list: <b>“Where does the prompt go for a verdict?”</b>{' '}
          Most of the field cannot answer it with a signature.
        </p>

        <div style={{ marginTop: 44 }}>
          <Shot
            className="shot"
            src="egress"
            alt="The GovernVeil egress control page listing the governed destinations, each with its classification and inspect-and-redact profile."
          >
            <b>The allow-list, as the gateway holds it.</b> Every destination the estate
            may reach, with its classification and profile — the same list the
            attestation names. Per-destination traffic columns read{' '}
            <span className="mono">—</span> rather than an estimate: those counts come
            from forward-proxy telemetry, which is a separate integration.
          </Shot>
        </div>
      </Band>

      {/* ───── architecture ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="Architecture"
          title="Nothing in the verdict path leaves the perimeter."
        />
        <div className="grid cols-3">
          {ARCHITECTURE.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── the ledger ───── */}
      <Band>
        <SectionHead eyebrow="The ledger" title="Append-only, and provably so." />
        <div className="grid cols-2 gap-wide" style={{ alignItems: 'start' }}>
          <ul className="checklist">
            <li><span>Each row carries the SHA-256 hash of the row before it, with a
              database-assigned sequence. Edit anything, anywhere, and verification
              fails at that row.</span></li>
            <li><span>No code path and no migration updates or deletes an audit row.
              That is a rule the codebase enforces on itself, not a convention.</span></li>
            <li><span>A standalone verifier walks the whole chain from the command line,
              independently of the running gateway.</span></li>
            <li><span>Daily anchors are emitted to your logs, so a chain can be checked
              against an external record of what it looked like yesterday.</span></li>
            <li><span>The decision reason is persisted on every row, so the durable
              ledger — not just a transient event stream — can say why a request was
              refused.</span></li>
            <li><span>Policy and configuration changes are themselves signed decisions
              on the same chain, with before and after. Who turned a control off, and
              when, is evidence.</span></li>
          </ul>
          <Shot
            className="shot"
            src="ledger-changes"
            alt="The GovernVeil changes ledger, each row naming who made a configuration change, what moved, and the hash-chain entry it was signed into."
          >
            <b>Who turned a control off, and when.</b> Every change to what the gateway
            enforces, as a decision on the hash chain — the actor, the before and after
            (<span className="mono">action: block → mask</span>), and the chain entry it
            was signed into.
          </Shot>
        </div>
      </Band>

      {region === 'au' && <AssuranceLoop />}

      {/* ───── assurance posture ───── */}
      <Band sunken>
        <SectionHead eyebrow={compliance.eyebrow} title={compliance.title}>
          {compliance.blurb}
        </SectionHead>
        {compliance.badges && (
          <div className="tag-row" style={{ marginBottom: 36 }}>
            {compliance.badges.map((b) => (
              <span className="tag t-ship" key={b}>{b}</span>
            ))}
          </div>
        )}
        <div className="grid cols-3">
          {ASSURANCE.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        {compliance.footnote && (
          <p className="small dim" style={{ marginTop: 20 }}>{compliance.footnote}</p>
        )}
      </Band>


      <Cta />
    </>
  )
}

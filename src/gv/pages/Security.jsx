import { Shot } from '../../components/figma'
import { Band, Cta, Eyebrow, KV, Row, SectionHead } from '../bits'

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

export default function Security() {
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
            <span className="mono">—</span> because that needs forward-proxy telemetry
            this build does not collect, and the page says so rather than filling them in.
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
            was signed into. The page is candid that changes made before 5 Sept 2026 were
            not chained.
          </Shot>
        </div>
      </Band>

      {/* ───── assurance posture ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="Assurance posture"
          title="Assessed against a board’s questions, not a logo wall."
        >
          We ran the product and the company against sixteen board cyber-governance
          domains drawn from Australian standards — PSPF, the ISM, APRA CPS 230 and CPS
          234, SOCI and the AICD director guidance. The product meets most of them. The
          company-side gaps are below, named rather than omitted.
        </SectionHead>
        <div className="grid cols-3">
          {ASSURANCE.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── honest gaps ───── */}
      <Band narrow>
        <Eyebrow>Say it before it is found</Eyebrow>
        <h2 className="h-section">What we haven’t done.</h2>
        <p className="lede">
          A reader who later discovers a gap we hid is lost for good. One who was told
          up front can weigh it. Everything here is true as of this page’s last
          revision, and we would rather you raised it in the first call than the sixth.
        </p>

        <h3 className="h-sub" style={{ marginTop: 36 }}>The company</h3>
        <ul className="checklist no">
          <li><span><b>Founder-led.</b> Security is held by the founder today. A named
            security lead and an on-call rota are funded in the seed plan, and we will
            tell you where that stands in the first call.</span></li>
          <li><span><b>SOC 2 Type II is not started</b> with an auditor. It is funded in
            the seed plan. We will not give you a date we cannot hold.</span></li>
          <li><span><b>No external penetration test</b> has been commissioned, and there
            is no IRAP assessment.</span></li>
        </ul>

        <h3 className="h-sub" style={{ marginTop: 32 }}>The product</h3>
        <ul className="checklist no">
          <li><span><b>Multi-tenancy is not in the schema.</b> No organisation column,
            no row-level security. One deployment governs one organisation.</span></li>
          <li><span><b>Incident notifications are a clock, not a dispatcher.</b> Dormancy
            deadlines are tracked and raised in the API; there is no email, SMS or
            webhook sender yet.</span></li>
          <li><span><b>Cost attribution is wired but switched off</b> until the
            model-registry prices are connected. A deliberate default, not a defect —
            but the cost column reads zero until you turn it on.</span></li>
        </ul>

        <h3 className="h-sub" style={{ marginTop: 32 }}>The engineering, and the register</h3>
        <p className="muted">
          Everything on the data path is gated on every commit: build, vet, race tests,
          the full suite, the admin-write harness against a real database, the extension
          end-to-end scenarios and the console tests. The hygiene around it — dependency
          and vulnerability scanning, static analysis — runs but is not yet enforced on
          every push, and that is the next thing in the gate.
        </p>
        <p className="muted">
          We keep an open register of every gap the tests have surfaced and not yet
          closed, scored against sixteen engineering dimensions with the command that
          produced each score. <b>Design partners get the full register and the
          known-issues log under NDA</b> — itemised, dated, with what closing each one
          takes. We would rather hand it to you than have you find it.
        </p>
        <p className="note" style={{ marginTop: 28 }}>
          Evaluate on the reference A10G build. On a laptop-class GPU the context and
          intent judge is off, so a MacBook runs a reduced ladder and will understate
          what the detector does.
        </p>

        <p className="note" style={{ marginTop: 34 }}>
          The risks we would raise ourselves if we were on your side of the table: a
          platform vendor bundling this into a licence you already own; the model
          providers absorbing enforcement into their own APIs; and team depth at our
          current size. They are all real. What we would put against them is that the
          enforcement path is self-hosted, the evidence is yours, and the benchmark is
          one you can run without us.
        </p>
      </Band>

      <Cta />
    </>
  )
}

import { Shot } from '../../components/figma'
import { Band, Cta, Eyebrow, KV, Row, SectionHead, Step, Table, Tag } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const LADDER = [
  ['Keyword, regex and secrets — SSN, card, PAN, GSTIN, IFSC, Aadhaar, credentials', 'fast path', 'local · sub-ms'],
  ['Injection-phrase patterns', 'fast path', 'local · sub-ms'],
  ['Prompt injection · PII · toxicity · business-critical · harmful intent · safety guard', 'policy question', 'local · one forward pass'],
  ['PII spans for replacement', 'NER', 'local'],
  ['Document channels — macros, PDF JavaScript, hidden and white text, hidden sheets, formulas', 'parser + sweep', 'local'],
]

const LATENCY = [
  ['Fast path — regex, secrets, injection phrases', 'sub-millisecond', <>Go benchmark, per request</>],
  ['Kill switch — revoked grant to 403', '~0.5 ms', <>measured in-line</>],
  ['Model path, single request, no queue', '~135–170 ms',
    <>A10G (<span className="mono">g5.2xlarge</span>), Shieldstral-1.0-3B bf16; ~100 ms of that is the model</>],
  ['Model path ceiling, per GPU', '~7.4 req/s',
    <>load test 2026-09-03 at 100&nbsp;% escalation; 2,399 ledger rows, no fail-open observed</>],
  ['Share of real traffic that reaches the model', '15–30 %', <>sizing model, 10k-FTE worked example</>],
]

const OBJECTS = [
  ['Assets',
    <>Every application, model and agent, with a named business and technical owner, a
      profile (data classes, jurisdictions, consequence tier, external exposure) and a
      lifecycle. Traffic resolves to the asset that owns it; registering a{' '}
      <span className="mono">/gw</span> service or a vendor agent creates its asset.</>],
  ['Controls',
    <>A sixteen-control catalogue across governance, privacy, security and ethics —
      PI-02 personal data masked before it leaves, INJ-01 injection blocked, DS-05
      documents scanned, MD-01 only approved models, RO-01 output inspected, AC-07 idle
      credentials expire, HL-09 a human reviews binding actions, FAIR-01 fairness
      attested. Each is enforced, detective or attested.</>],
  ['Decisions',
    <>Approvals, exceptions, attestations, acknowledgements, assignment reviews, probe
      runs, telemetry imports and drift reports are all rows on the same hash chain as
      the traffic, each with an expiry. A policy or configuration change is itself a
      signed decision.</>],
  ['State',
    <>Holding · attempted-held · weak · breached · untested — computed from the ledger
      over a window, from fires, breaches, would-blocks, attestation expiry and the last
      probe challenge. Nothing is green because someone said so.</>],
]

const DEPLOY = [
  ['Self-hosted, always',
    <>One Docker image serves both the gateway and the model server. Compose variants
      for demo, pilot (no default secrets, TLS), GPU and CloudWatch; a Helm chart for
      Kubernetes. A cold Ubuntu VM reaches an enforcing gateway with one deploy
      script.</>],
  ['Reference pilot box',
    <>One <span className="mono">g5.2xlarge</span> (A10G, ~6&nbsp;GB of weights
      resident). The gateway is a small Go binary; the cost driver is the GPU. Device is
      auto-selected — CUDA, Apple Metal or CPU.</>],
  ['Identity and storage',
    <>OIDC or local auth, three enforced roles, <span className="mono">aigw_</span>{' '}
      service tokens tied to grants. TimescaleDB for the governance database and an
      optional metrics database; Redis optional and skipped on a single-node pilot.</>],
]

const AUDIT_RECORD = `{
  "timestamp":   "2026-08-30T09:14:02.341Z",
  "request_id":  "req_8Kz2x…",
  "actor":       "sarah.chen@acme.io",
  "asset_id":    "asset_billing_agent",
  "path":        "/v1/chat/completions",
  "action":      `

/* .au only. Says plainly that Australian formats are not on the pattern path,
   then shows the mechanism that does cover them. */
function Identifiers({ block }) {
  return (
    <Band sunken>
      <SectionHead eyebrow={block.eyebrow} title={block.title}>
        {block.lede}
      </SectionHead>
      <div className="panel" style={{ maxWidth: 760 }}>
        <div className="panel-head">
          <span>POLICIES YOU WRITE</span>
          <span>answered in the model pass</span>
        </div>
        {block.policies.map(([id, question]) => (
          <div className="panel-row" key={id}>
            <div className="panel-label">{id}</div>
            <pre><code>{`"${question}"`}</code></pre>
          </div>
        ))}
      </div>
      <p className="note" style={{ marginTop: 32 }}>{block.note}</p>
    </Band>
  )
}

export default function Product() {
  const { product } = REGION_CONTENT[readRegion()]
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>How it works</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '20ch' }}>
            A drop-in gateway, a managed extension, and a governance layer over both.
          </h1>
          <p className="lede">
            Point your apps at one base URL, install the extension for people, register
            your agents’ tool servers behind the connector — and every AI interaction is
            governed, evidenced and measured, in your environment.
          </p>
          <div className="grid cols-2" style={{ gap: 20, maxWidth: 860 }}>
            <div className="panel">
              <div className="panel-head"><span>FOR APPS · ONE LINE</span></div>
              <div className="panel-row">
                <pre>{'base_url = '}<code>{'"https://<your-gateway>/v1"'}</code></pre>
              </div>
            </div>
            <div className="panel">
              <div className="panel-head"><span>FOR AGENTS · ONE PROCESS</span></div>
              <div className="panel-row">
                <pre>{'MCP client → '}<code>connector</code>{' → /mcp/v1'}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───── lifecycle ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="The request lifecycle"
          title={<>Eight steps. Every request. The order <em>is</em> the guarantee.</>}
        >
          The data path fails closed at every step. An unreachable policy engine, a
          model-server timeout or an unscannable payload results in a block, never a
          silent allow.
        </SectionHead>

        <div className="steps">
          <Step
            n="01"
            title="Ingress"
            tags={<>
              <Tag k="ship">/v1/*</Tag><Tag k="ship">{'/gw/<app>'}</Tag>
              <Tag k="ship">/mcp/v1/*</Tag><Tag k="ship">browser extension</Tag>
            </>}
          >
            <p>
              An app calls <span className="mono">/v1/*</span> (a base-URL change), an
              enterprise API is called through <span className="mono">{'/gw/<app>'}</span>,
              an agent calls a tool through the MCP connector, or a person types into a
              public assistant and the extension relays the prompt before it leaves the
              browser.
            </p>
          </Step>

          <Step n="02" title="Grant check" tags={<Tag k="block">kill switch · ~0.5 ms</Tag>}>
            <p>
              Is this credential still authorised? A revoked grant is an instant 403,
              refused before any inspection runs. A long-dormant grant that suddenly
              wakes raises an incident with a 14-day clock and optional auto-freeze.
            </p>
          </Step>

          <Step
            n="03"
            title="Access plane"
            tags={<><Tag k="ship">role → scope</Tag><Tag k="block">403 on deny</Tag></>}
          >
            <p>
              For enterprise apps, role → scope → operation is checked before anything is
              forwarded. A viewer may read and not delete; the denial never leaves the
              perimeter and is still ledgered.
            </p>
          </Step>

          <Step n="04" title="Document guardrail" tags={<Tag k="ship">control DS-05</Tag>}>
            <p>
              Embedded or uploaded documents are parsed into a normalised segment list
              with provenance, then swept. Unscannable or corrupt payloads fail closed —
              every error path is quarantine, never allow.
            </p>
          </Step>

          <Step n="05" title="Detection ladder" tags={<Tag k="ship">fast path → local model</Tag>}>
            <p>
              A sub-millisecond pattern path first (US and India PII, credentials,
              injection phrasing), then one local policy-adaptive model answers every
              policy as a plain-language question in a single forward pass, with a
              companion model extracting PII spans for replacement.
            </p>
          </Step>

          <Step
            n="06"
            title="Agent limits & model registry"
            tags={<><Tag k="ship">AG-11 · AG-12</Tag><Tag k="ship">MD-01</Tag></>}
          >
            <p>
              For agents: tools outside the allow-list refuse, hourly call and daily
              spend caps are counted from the ledger, and gated actions are held for the
              owner. For every request: the model must be approved, in the caller’s
              permitted list, and permitted for the data classes still present{' '}
              <em>after</em> masking.
            </p>
          </Step>

          <Step
            n="07"
            title="Verdict → forward"
            tags={<>
              <Tag k="allow">allow</Tag><Tag k="flag">flag</Tag>
              <Tag k="mask">mask</Tag><Tag k="ack">acknowledge</Tag>
              <Tag k="block">block</Tag>
            </>}
          >
            <p>
              The policy chain resolves exactly one outcome; when several policies match,
              the most restrictive wins. Controls in detective mode record “would have
              blocked” and let evaluation continue. A masked value never leaves until its
              vault mapping is persisted — and if it cannot be persisted, the gateway
              falls back to destructive redaction rather than forwarding something it
              cannot reverse.
            </p>
          </Step>

          <Step
            n="08"
            title="Response inspection → restore → sign → reply"
            tags={<>
              <Tag k="ship">control RO-01</Tag><Tag k="ship">signed before reply</Tag>
            </>}
          >
            <p>
              The model’s output is a prompt too. Every response — JSON or stream,
              tool-call arguments included — runs the same ladder and the same chain:
              injected or harmful output is withheld, leaked personal data or secrets are
              redacted, business-sensitive output is flagged. With the vault on,
              surrogates are restored for the authorised caller. Then the signed row is
              appended to the hash chain <em>before the caller gets its reply</em>, and
              mirrored to a time-series store.
            </p>
          </Step>
        </div>
      </Band>

      {/* ───── ladder ───── */}
      <Band>
        <SectionHead
          eyebrow="Detection ladder"
          title="One model. One forward pass. Every policy."
        >
          A single policy-adaptive model answers every policy in one batched pass on one
          GPU. Weights stay resident in your environment; the classic multi-model stack
          remains available as a fallback by unsetting one environment variable.
        </SectionHead>
        <Table head={<><th>Check</th><th>Stage</th><th>Where it runs</th></>}>
          {LADDER.map(([check, stage, where]) => (
            <tr key={check}>
              <td>{check}</td>
              <td>{stage}</td>
              <td className="mono">{where}</td>
            </tr>
          ))}
        </Table>
        <p className="small dim" style={{ marginTop: 16 }}>
          Verdict mapping is configurable per detector, per policy and per asset. A
          model-server error under strict validation is a block, never a skip.
        </p>
      </Band>

      {product.identifiers && <Identifiers block={product.identifiers} />}

      {/* ───── latency ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="Honest latency"
          title="Five numbers with methodology, not one marketing figure."
        />
        <Table head={<><th>Path</th><th className="num">Number</th><th>How it was measured</th></>}>
          {LATENCY.map(([path, n, how]) => (
            <tr key={path}>
              <td>{path}</td>
              <td className="num">{n}</td>
              <td>{how}</td>
            </tr>
          ))}
        </Table>
        <p className="small dim" style={{ marginTop: 16 }}>
          The classic multi-model stack measures ~190&nbsp;ms on the same GPU. Numbers
          are from the committed load-test and sizing documents, not from a datasheet.
        </p>
      </Band>

      {/* ───── governance layer ───── */}
      <Band>
        <SectionHead eyebrow="Over the planes" title="You cannot govern what you cannot name.">
          Four objects, one chain.
        </SectionHead>

        <div className="grid cols-2" style={{ marginBottom: 48 }}>
          {OBJECTS.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <p className="note" style={{ marginBottom: 40 }}>
          What the layer produces: a <b>gap assessment</b> (required versus present
          controls, exportable), a machine-readable <b>control manifest</b> for build
          time, an <b>attestation cycle</b> whose signature is refused while an unlisted
          exception is open, a <b>precedent delta</b> (Keep / Drop) when a new asset
          inherits an approved one, and a <b>policy drift</b> report over 30 or 90 days:
          clauses never exercised, enforcement with no clause behind it, overrides
          clustering on one control, exceptions never closed.
        </p>

        <Shot
          className="shot"
          src="access-governance"
          alt="The GovernVeil access governance page listing an enterprise API with six roles, their scopes and permitted operations."
        >
          <b>Access governance.</b> A registered enterprise API with six roles, each
          role’s scope and permitted operations, and denials counted — resolved at the
          reverse proxy before content inspection runs. Note{' '}
          <span className="mono">On resolver error: Fail-closed</span>.
        </Shot>
      </Band>

      {/* ───── evidence ───── */}
      <Band sunken>
        <SectionHead eyebrow="Audit" title="The evidence it leaves.">
          Every decision writes one record — who, what, action, reason, latency, cost —
          and each record carries the hash of the one before it. Edit anything, anywhere,
          and verification fails on the spot. A standalone verifier walks the chain;
          daily anchors are emitted to your logs. Audit rows are append-only: no code
          path and no migration updates or deletes one.
        </SectionHead>

        <div className="panel" style={{ maxWidth: 620 }}>
          <div className="panel-head">
            <span>AUDIT RECORD · EXAMPLE</span><span>append-only</span>
          </div>
          <div className="panel-row">
            <pre>{AUDIT_RECORD}<code>"block"</code>{`,
  "reason":      "account number in prompt",
  "controls":    ["PI-02"],
  "pii_detected": ["account_number"],
  "latency_ms":  194,
  "cost":        0.0041,
  "row_hash":    "sha256:a7f3…",
  "prev_hash":   "sha256:9c1b…"
}`}</pre>
          </div>
        </div>
      </Band>

      {/* ───── console ───── */}
      <Band>
        <SectionHead
          eyebrow="The console"
          title="Six destinations, built to be shown to a regulator."
        >
          A role lens — Security, Risk, Engineering — ranks each side’s rows first
          without hiding anything from the others. Light by default, dark on request.
        </SectionHead>
        <KV>
          <Row k="Posture">
            The first thing that is wrong, with one button. Coverage from independent
            telemetry, and <b>what needs you</b>, ranked by severity.
          </Row>
          <Row k="Estate">
            Assets, models, vendors and MCP servers — every actor in the estate with its
            owner.
          </Row>
          <Row k="Assurance">
            The control board, coverage, synthetic probes and policy drift. “Last
            challenged” is a column.
          </Row>
          <Row k="Evidence">
            The signed ledger, changes, acknowledgements, decisions, documents, traffic
            and analytics.
          </Row>
          <Row k="Policy">
            Form and YAML editor, the catalogue, controls, and your own ingested policy
            library. Enable or disable <em>is</em> the enforcement switch.
          </Row>
          <Row k="Configure">
            Access, egress, configuration bundle, licence, vault, detectors, simulate,
            system and users.
          </Row>
        </KV>
      </Band>

      {/* ───── deployment ───── */}
      <Band sunken>
        <SectionHead eyebrow="Deployment" title="One image. One VM, or your cluster." />
        <div className="grid cols-3">
          {DEPLOY.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>
                {p}
                {h === 'Reference pilot box' && product.deployRegion && (
                  <> {product.deployRegion}</>
                )}
              </p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 36 }}>
          Multi-tenancy is not in the schema — no <span className="mono">org_id</span>,
          no row-level security. One deployment governs one organisation. That is a{' '}
          <Tag k="road">roadmap</Tag> item, and we would rather you heard it here.
        </p>
      </Band>

      <Cta />
    </>
  )
}

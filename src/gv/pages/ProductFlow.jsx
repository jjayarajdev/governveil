import { Shot } from '../../components/figma'
import { Cta, Tag } from '../bits'
import { Act, Opening, Row, Rows } from '../interview'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

/* Shape: 14 · Narrative Workflow.
   Product is a sequence, not an interrogation — making it a second interview
   would be the monotony the whole exercise is trying to avoid. The eight-step
   lifecycle was buried in the middle of the old page between card grids; here
   it IS the page. A request arrives at the top and leaves signed at the
   bottom, and the detail that used to be its own band hangs off the step it
   belongs to. */

const STEPS = [
  ['01', 'Ingress', <>An app calls <span className="mono">/v1/*</span> — a base-URL
    change — an enterprise API is called through <span className="mono">{'/gw/<app>'}</span>,
    an agent calls a tool through the MCP connector, or a person types into a public
    assistant and the extension relays the prompt before it leaves the browser.</>,
    ['/v1/*', '/gw/<app>', '/mcp/v1/*', 'browser extension'], null],

  ['02', 'Grant check', <>Is this credential still authorised? A revoked grant is an
    instant 403, refused before any inspection runs. A long-dormant grant that
    suddenly wakes raises an incident with a 14-day clock and optional
    auto-freeze.</>, null,
    { label: 'kill switch', value: '~0.5 ms', note: 'measured in-line, before inspection' }],

  ['03', 'Access plane', <>For enterprise apps, role → scope → operation is checked
    before anything is forwarded. A viewer may read and not delete; the denial never
    leaves the perimeter and is still ledgered.</>,
    ['role → scope', '403 on deny'], null],

  ['04', 'Document guardrail', <>Embedded or uploaded documents are parsed into a
    normalised segment list with provenance, then swept. Unscannable or corrupt
    payloads fail closed — every error path is quarantine, never allow.</>,
    ['control DS-05'], null],

  ['05', 'Detection ladder', <>A sub-millisecond pattern path first — US and India
    PII, credentials, injection phrasing — then one local policy-adaptive model
    answers every policy as a plain-language question in a single forward pass, with
    a companion model extracting PII spans for replacement.</>,
    ['fast path → local model'], null],

  ['06', 'Agent limits & model registry', <>For agents: tools outside the allow-list
    refuse, hourly call and daily spend caps are counted from the ledger, and gated
    actions are held for the owner. For every request: the model must be approved, in
    the caller’s permitted list, and permitted for the data classes still present{' '}
    <em>after</em> masking.</>,
    ['AG-11 · AG-12', 'MD-01'], null],

  ['07', 'Verdict → forward', <>The policy chain resolves exactly one outcome; when
    several policies match, the most restrictive wins. Controls in detective mode
    record “would have blocked” and let evaluation continue. A masked value never
    leaves until its vault mapping is persisted — and if it cannot be persisted, the
    gateway falls back to destructive redaction rather than forwarding something it
    cannot reverse.</>, null, null],

  ['08', 'Response inspection → restore → sign → reply', <>The model’s output is a
    prompt too. Every response — JSON or stream, tool-call arguments included — runs
    the same ladder and the same chain. With the vault on, surrogates are restored for
    the authorised caller. Then the signed row is appended to the hash chain{' '}
    <em>before the caller gets its reply</em>.</>,
    ['control RO-01', 'signed before reply'], null],
]

const VERDICTS = [['allow', 'ok'], ['flag', 'flag'], ['mask', 'mask'],
  ['acknowledge', 'ack'], ['block', 'block']]

export default function ProductFlow() {
  const { product } = REGION_CONTENT[readRegion()]

  return (
    <>
      <Opening
        q="A request arrives. Here is everything that happens to it."
        answer="Eight steps, and the order is the guarantee."
      >
        <p>
          Point your apps at one base URL, install the extension for people, register
          your agents’ tool servers behind the connector. The data path fails closed at
          every step: an unreachable policy engine, a model-server timeout or an
          unscannable payload results in a block, never a silent allow.
        </p>
        <div className="grid cols-2" style={{ gap: 16 }}>
          <div className="panel">
            <div className="panel-head"><span>for apps · one line</span></div>
            <div className="panel-row">
              <pre>{'base_url = '}<code>{'"https://<your-gateway>/v1"'}</code></pre>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><span>for agents · one process</span></div>
            <div className="panel-row">
              <pre>{'MCP client → '}<code>connector</code>{' → /mcp/v1'}</pre>
            </div>
          </div>
        </div>
      </Opening>

      {/* the spine: one request, start to finish */}
      <section className="flow">
        <div className="wrap">
          {STEPS.map(([n, title, body, tags, figure]) => (
            <div className="flow-step" key={n}>
              <div className="flow-rail"><span className="flow-n">{n}</span></div>
              <div className="flow-body">
                <h3 className="flow-t">{title}</h3>
                <p>{body}</p>
                {tags && (
                  <div className="tag-row">
                    {tags.map((t) => <Tag k="ship" key={t}>{t}</Tag>)}
                  </div>
                )}
                {figure && (
                  <div className="flow-figure">
                    <b>{figure.value}</b>
                    <span>{figure.label} — {figure.note}</span>
                  </div>
                )}
                {n === '05' && (
                  <div className="flow-detail">
                    <Rows>
                      <Row k="fast path">
                        keyword, regex and secrets — SSN, card, PAN, GSTIN, IFSC,
                        Aadhaar, credentials — plus injection phrasing · sub-ms
                      </Row>
                      <Row k="policy question">
                        injection · PII · toxicity · business-critical · harmful intent
                        · safety guard, in one forward pass
                      </Row>
                      <Row k="NER">PII spans for replacement</Row>
                      <Row k="parser + sweep">
                        macros, PDF JavaScript, hidden and white text, hidden sheets,
                        formulas
                      </Row>
                    </Rows>
                    <p className="qa-aside">
                      A model-server error under strict validation is a block, never a
                      skip. The classic multi-model stack stays available as a fallback
                      by unsetting one environment variable.
                    </p>
                  </div>
                )}
                {n === '07' && (
                  <div className="tag-row" style={{ marginTop: 12 }}>
                    {VERDICTS.map(([v, tone]) => (
                      <Tag k={tone === 'ok' ? 'allow' : tone} key={v}>{v}</Tag>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {product.identifiers && (
        <Act n="—" title={product.identifiers.eyebrow}>
          <section className="qa">
            <div className="wrap qa-in">
              <h3 className="qa-q">{product.identifiers.title}</h3>
              <div className="qa-a">
                <p>{product.identifiers.lede}</p>
                <div className="panel qa-panel">
                  <div className="panel-head">
                    <span>policies you write</span><span>answered in the model pass</span>
                  </div>
                  {product.identifiers.policies.map(([id, question]) => (
                    <div className="panel-row" key={id}>
                      <div className="panel-label">{id}</div>
                      <pre><code>{`"${question}"`}</code></pre>
                    </div>
                  ))}
                </div>
                <p className="qa-aside">{product.identifiers.note}</p>
              </div>
            </div>
          </section>
        </Act>
      )}

      <Act n="—" title="Over the planes">
        <section className="qa">
          <div className="wrap qa-in">
            <h3 className="qa-q">You cannot govern what you cannot name.</h3>
            <div className="qa-a">
              <p>
                Four objects on one chain. Every application, model and agent carries a
                named owner, a profile and a lifecycle; every control is enforced,
                detective or attested; every approval, exception and attestation is a
                row beside the traffic; and state is computed from that record rather
                than asserted.
              </p>
              <Rows>
                <Row k="assets">
                  applications, models and agents, with a named business and technical
                  owner
                </Row>
                <Row k="controls">
                  sixteen across governance, privacy, security and ethics — PI-02,
                  INJ-01, DS-05, MD-01, RO-01, AC-07, HL-09, FAIR-01
                </Row>
                <Row k="decisions">
                  approvals, exceptions, attestations, probe runs and drift reports,
                  each with an expiry
                </Row>
                <Row k="state">
                  holding · attempted-held · weak · breached · untested, computed over
                  a window
                </Row>
              </Rows>
              <Shot
                className="shot"
                src="access-governance"
                alt="The GovernVeil access governance page listing an enterprise API with six roles, their scopes and permitted operations."
              >
                <b>Access governance.</b> Six roles, each role’s scope and permitted
                operations, denials counted — resolved at the reverse proxy before
                content inspection runs. Note{' '}
                <span className="mono">On resolver error: Fail-closed</span>.
              </Shot>
            </div>
          </div>
        </section>
      </Act>

      <Act n="—" title="What it takes to run">
        <section className="qa">
          <div className="wrap qa-in">
            <h3 className="qa-q">One image. One VM, or your cluster.</h3>
            <div className="qa-a">
              <Rows>
                <Row k="image">
                  one Docker image serves the gateway and the model server; Compose for
                  demo, pilot, GPU and CloudWatch, Helm for Kubernetes
                </Row>
                <Row k="reference box">
                  one <span className="mono">g5.2xlarge</span> — A10G, ~6 GB of weights
                  resident. {product.deployRegion}
                </Row>
                <Row k="identity">
                  OIDC or local auth, three enforced roles,{' '}
                  <span className="mono">aigw_</span> service tokens tied to grants
                </Row>
                <Row k="storage">
                  TimescaleDB for the governance database; Redis optional and skipped
                  on a single-node pilot
                </Row>
              </Rows>
              <p className="qa-aside">
                Multi-tenancy is not in the schema — no{' '}
                <span className="mono">org_id</span>, no row-level security. One
                deployment governs one organisation. That is a roadmap item, and we
                would rather you heard it here.
              </p>
            </div>
          </div>
        </section>
      </Act>

      <Cta />
    </>
  )
}

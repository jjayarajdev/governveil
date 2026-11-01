import { useState } from 'react'
import { Shot } from '../../components/figma'
import { Cta, Tag } from '../bits'
import { Act, Opening, Row, Rows } from '../interview'
import { STAGES, Track } from '../pipeline'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

/* Shape: 14 · Narrative Workflow.

   The eight-step lifecycle IS the page. It used to be eight stacked text
   blocks — about 1,400px of vertical spine with the right half of the page
   empty the whole way down, which is a pipeline drawn as a bulleted list.
   Now it is one horizontal track: pick a stage, read that stage. The stage
   content itself is unchanged, and it lives in ../pipeline.jsx so this page
   and the replay cannot drift apart. */

const VERDICTS = [['allow', 'allow'], ['flag', 'flag'], ['mask', 'mask'],
  ['acknowledge', 'ack'], ['block', 'block']]

export default function ProductFlow() {
  const { product } = REGION_CONTENT[readRegion()]
  const [i, setI] = useState(0)
  const stage = STAGES[i]

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

      {/* the spine: one request, start to finish — one track, not eight blocks */}
      <section className="flow">
        <div className="wrap">
          <Track mode="pick" active={i} onPick={setI} />

          <div className="pt-panel">
            <div className="pt-panel-h">
              <span className="pt-panel-n">{stage.n}</span>
              <h3 className="pt-panel-t">{stage.short}</h3>
            </div>

            {/* Prose left, the structured bits right — otherwise the panel
                leaves the right half of the page empty, which is the problem
                the whole track was meant to solve. */}
            <div className="pt-panel-in">
              <div>
                <p className="pt-panel-b">{stage.body}</p>
                {stage.detail && (
                  <div className="pt-detail">
                    <Rows>
                      {stage.detail.map(([k, v]) => <Row k={k} key={k}>{v}</Row>)}
                    </Rows>
                    {stage.note && <p className="qa-aside">{stage.note}</p>}
                  </div>
                )}
              </div>

              <aside className="pt-side">
                {stage.tags && (
                  <>
                    <h4 className="pt-side-h">What applies here</h4>
                    <div className="tag-row">
                      {stage.tags.map((t) => <Tag k="ship" key={t}>{t}</Tag>)}
                    </div>
                  </>
                )}
                {stage.verdicts && (
                  <>
                    <h4 className="pt-side-h">The five outcomes</h4>
                    <div className="tag-row">
                      {VERDICTS.map(([v, tone]) => <Tag k={tone} key={v}>{v}</Tag>)}
                    </div>
                  </>
                )}
                {stage.figure && (
                  <div className="pt-fig">
                    <b>{stage.figure.value}</b>
                    <span>{stage.figure.label} — {stage.figure.note}</span>
                  </div>
                )}
              </aside>
            </div>
          </div>
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
                One deployment governs one organisation, with its own database, its own
                keys and its own ledger. Nothing is shared across tenants because there
                are none.
              </p>
            </div>
          </div>
        </section>
      </Act>

      <Cta />
    </>
  )
}

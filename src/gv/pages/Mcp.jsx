import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import data from '../data/mcp.json'

/* Agent tool calls, governed at three points.

   Every tool, description, argument, returned text and verdict below is a case
   from eval/mcp/corpus.json with the verdict eval/baselines/mcp-scorecard.json
   recorded for it — `make mcp-scorecard`, 14 of 14. Nothing is written for the
   page. It is a replay of a recorded run, not live enforcement. */

const PHASES = [
  ['list', 'tools/list', 'Discovery',
   'The agent asks what it can call. Each description is judged once, and a poisoned one never appears in the list — so the agent cannot call what it cannot see.'],
  ['call', 'tools/call', 'Before the tool runs',
   'The agent has chosen a tool and filled in the arguments. They are judged before anything is executed, because the argument is where the data leaves.'],
  ['result', 'the result', 'Before the agent sees it',
   'The server has answered. What comes back is a prompt too — it is judged before the agent reads it, which is the half that detect-and-block products do not have.'],
]

const TONE = { allow: 'allow', block: 'block', hidden: 'block', visible: 'allow' }

function Verdict({ v }) { return <Tag k={TONE[v] || 'flag'}>{v}</Tag> }

export default function Mcp() {
  const [phase, setPhase] = useState('list')
  const rows = data.phases[phase]
  const [, label, title, blurb] = PHASES.find((p) => p[0] === phase)
  const [openId, setOpenId] = useState(null)

  return (
    <>
      <Opening
        q="An agent is about to call a tool. What stops it?"
        answer="Three judgements, not one."
      >
        <p>
          A connector sits between the agent and its MCP servers and asks the gateway
          at every point the agent could do damage: when it discovers what exists,
          when it fills in the arguments, and when the server answers back. Each phase
          is its own ledger row.
        </p>
        <p className="qa-aside">
          Replay of a recorded run — <span className="mono">{data.meta.command}</span>,{' '}
          {data.meta.passed} of {data.meta.total} cases, not live enforcement.
        </p>
      </Opening>

      <section className="mcp">
        <div className="wrap">
          <div className="mcp-tabs" role="tablist" aria-label="Where the agent is judged">
            {PHASES.map(([id, lbl, t]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={phase === id}
                className={`mcp-tab${phase === id ? ' is-on' : ''}`}
                onClick={() => { setPhase(id); setOpenId(null) }}
              >
                <span className="mono">{lbl}</span>
                <span>{t}</span>
              </button>
            ))}
          </div>

          <p className="mcp-blurb">{blurb}</p>

          <div className="mcp-rows">
            {rows.map((r) => {
              const open = openId === r.id
              const bad = r.verdict === 'block' || r.verdict === 'hidden'
              return (
                <article key={r.id} className={`mcp-row${bad ? ' is-bad' : ''}`}>
                  <header className="mcp-head">
                    <span className="mono mcp-tool">{r.tool}</span>
                    <span className="mcp-cat">{r.categoryLabel}</span>
                    <Verdict v={r.verdict} />
                  </header>

                  {r.description && (
                    <div className="mcp-body">
                      <div className="mcp-k">the description the server advertised</div>
                      <p className={`mcp-quote${bad ? ' is-bad' : ''}`}>{r.description}</p>
                      <p className="mcp-what">
                        {bad
                          ? 'Never shown to the agent. It cannot call a tool that is not in its list.'
                          : 'Shown to the agent, unchanged.'}
                      </p>
                    </div>
                  )}

                  {r.arguments && (
                    <div className="mcp-body">
                      <div className="mcp-k">the arguments the agent filled in</div>
                      <pre className="mcp-pre">{JSON.stringify(r.arguments, null, 2)}</pre>
                      <p className="mcp-what">
                        {bad
                          ? 'Refused before the tool ran. Nothing was written, posted or sent.'
                          : 'Forwarded to the tool unchanged.'}
                      </p>
                    </div>
                  )}

                  {r.result && (
                    <div className="mcp-body">
                      <div className="mcp-k">what the server sent back</div>
                      <p className={`mcp-quote${bad ? ' is-bad' : ''}`}>{r.result}</p>
                      <p className="mcp-what">
                        {bad
                          ? 'Withheld. The agent never read it, so it could not act on it.'
                          : 'Passed to the agent unchanged.'}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    className="mcp-more"
                    onClick={() => setOpenId(open ? null : r.id)}
                    aria-expanded={open}
                  >
                    the record {open ? '–' : '+'}
                  </button>
                  {open && (
                    <dl className="mcp-rec">
                      <div><dt>case</dt><dd className="mono">{r.id}</dd></div>
                      <div><dt>phase</dt><dd className="mono">{label}</dd></div>
                      <div><dt>expected</dt><dd className="mono">{r.expect}</dd></div>
                      <div><dt>recorded</dt><dd className="mono">{r.verdict}</dd></div>
                    </dl>
                  )}
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="qa">
        <div className="wrap qa-in">
          <h3 className="qa-q">The scorecard behind this page.</h3>
          <div className="qa-a">
            <p>
              Fourteen cases across seven categories, run by{' '}
              <span className="mono">{data.meta.command}</span> against the gateway’s own
              verdict surface. All fourteen landed where the corpus said they should.
            </p>
            <div className="route-row">
              {Object.entries(data.meta.byCategory).map(([k, v]) => (
                <div key={k}>
                  <span className="mono">{v.pass}/{v.total}</span>
                  <span>{k.replace(/_/g, ' ')}</span>
                </div>
              ))}
            </div>
            <p className="qa-aside">
              This is the regression set the tool path has to keep passing on every build.
              The published detection benchmark is the larger measurement, and it is
              scored per policy rather than as a single figure.
            </p>
            <p><Link className="link" to="/interview/journey">Watch a request travel the gateway</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

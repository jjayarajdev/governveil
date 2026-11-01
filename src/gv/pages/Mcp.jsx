import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import { Track } from '../pipeline'
import data from '../data/mcp.json'

/* Agent tool calls, governed at three points.

   Every tool, description, argument, returned text and verdict below is a case
   from eval/mcp/corpus.json with the verdict eval/baselines/mcp-scorecard.json
   recorded for it — `make mcp-scorecard`, 14 of 14. Nothing is written for the
   page. It is a replay of a recorded run, not live enforcement. */

/* The three judging points, in the order the agent hits them. Shaped like
   the request pipeline's stages so the shared Track draws them: this page
   and /interview/journey are the same diagram at different lengths. */
const PHASES = [
  { n: '01', key: 'list', short: 'Discovery', sub: 'tools/list',
    blurb: `The agent asks what it can call. Each description is judged once, and a
      poisoned one never appears in the list — so the agent cannot call what it
      cannot see.` },
  { n: '02', key: 'call', short: 'Before the tool runs', sub: 'tools/call',
    blurb: `The agent has chosen a tool and filled in the arguments. They are judged
      before anything is executed, because the argument is where the data leaves.` },
  { n: '03', key: 'result', short: 'Before the agent sees it', sub: 'the result',
    blurb: `The server has answered. What comes back is a prompt too — it is judged
      before the agent reads it, which is the half that detect-and-block products do
      not have.` },
]

const TONE = { allow: 'allow', block: 'block', hidden: 'block', visible: 'allow' }

function Verdict({ v }) { return <Tag k={TONE[v] || 'flag'}>{v}</Tag> }

export default function Mcp() {
  const [pi, setPi] = useState(0)
  const [caseId, setCaseId] = useState(data.phases.list[0].id)

  const phase = PHASES[pi]
  const rows = data.phases[phase.key]
  const r = rows.find((x) => x.id === caseId) || rows[0]
  const bad = r.verdict === 'block' || r.verdict === 'hidden'

  const pickPhase = (i) => { setPi(i); setCaseId(data.phases[PHASES[i].key][0].id) }

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
          {/* The three points are a sequence, not a tab bar: same track the
              request pipeline uses, three stages instead of eight. */}
          <Track stages={PHASES} mode="pick" active={pi} onPick={pickPhase} />
          <p className="mcp-blurb">{phase.blurb}</p>

          {/* Column count follows the case count (capped at four), so three
              cases do not leave a dead fourth column. */}
          <div
            className="pk mcp-pick"
            style={{ '--pk-count': Math.min(rows.length, 4) }}
            role="tablist"
            aria-label="Cases at this point"
          >
            {rows.map((x) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={x.id === r.id}
                className={`pk-i${x.id === r.id ? ' is-on' : ''}`}
                onClick={() => setCaseId(x.id)}
                /* Two cases can share a tool name; the category is what tells
                   them apart, and it is the panel heading once selected. */
                title={x.categoryLabel}
                aria-label={`${x.tool}: ${x.categoryLabel}, ${x.verdict}`}
              >
                <span className="pk-t mono">{x.tool}</span>
                <span className="pk-m">
                  <Verdict v={x.verdict} />
                  {/* Three cases share both tool and category — they are the
                      same test with an SSN, a card and an Aadhaar. The corpus
                      id is what tells them apart, and it is the handle the
                      record panel quotes. */}
                  <span className="pk-id mono">{x.id}</span>
                </span>
              </button>
            ))}
          </div>

          <article className={`mcp-case${bad ? ' is-bad' : ''}`}>
            <header className="mcp-head">
              <span className="mono mcp-tool">{r.tool}</span>
              <span className="mcp-cat">{r.categoryLabel}</span>
              <Verdict v={r.verdict} />
            </header>

            <div className="mcp-case-in">
              <div>
                {r.description && (
                  <>
                    <div className="mcp-k">the description the server advertised</div>
                    <p className={`mcp-quote${bad ? ' is-bad' : ''}`}>{r.description}</p>
                  </>
                )}
                {r.arguments && (
                  <>
                    <div className="mcp-k">the arguments the agent filled in</div>
                    <pre className="mcp-pre">{JSON.stringify(r.arguments, null, 2)}</pre>
                  </>
                )}
                {r.result && (
                  <>
                    <div className="mcp-k">what the server sent back</div>
                    <p className={`mcp-quote${bad ? ' is-bad' : ''}`}>{r.result}</p>
                  </>
                )}
              </div>

              <aside className="mcp-side">
                <div className="mcp-k">what the gateway did</div>
                <p className="mcp-what">
                  {r.description && (bad
                    ? 'Never shown to the agent. It cannot call a tool that is not in its list.'
                    : 'Shown to the agent, unchanged.')}
                  {r.arguments && (bad
                    ? 'Refused before the tool ran. Nothing was written, posted or sent.'
                    : 'Forwarded to the tool unchanged.')}
                  {r.result && (bad
                    ? 'Withheld. The agent never read it, so it could not act on it.'
                    : 'Passed to the agent unchanged.')}
                </p>
                <dl className="mcp-rec">
                  <div><dt>case</dt><dd className="mono">{r.id}</dd></div>
                  <div><dt>phase</dt><dd className="mono">{phase.sub}</dd></div>
                  {/* `expect` is a list of acceptable verdicts, not one
                      value — the harness passes a case when the recorded
                      verdict is IN it (scripts/mcp_scorecard.py: `got in
                      c["expect"]`). Rendering only the first made five of the
                      fourteen look like misses next to a 14/14 claim. */}
                  <div>
                    <dt>accepted</dt>
                    <dd className="mono">{r.expect.join(' or ')}</dd>
                  </div>
                  <div><dt>recorded</dt><dd className="mono">{r.verdict}</dd></div>
                </dl>
              </aside>
            </div>
          </article>
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

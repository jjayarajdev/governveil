import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import data from '../data/journey.json'

/* The request journey.

   Every prompt, verdict, latency and request id on this page is a row from
   tests/results/judge-off-a10g.json — 125 cases run against the A10G pilot in
   the shipped configuration on 2026-10-27. Nothing here is written for the
   website. What the run does NOT record is which detector fired, so the page
   never names one: it shows the path every request takes, which is documented,
   and the outcome that was recorded. The engine's `redact` is rendered as
   `mask` because the engine folds it (policy/engine.go:40).

   It is a replay, not live enforcement, and it says so. */

const STEPS = [
  ['01', 'Ingress', 'the prompt arrives on /v1'],
  ['02', 'Grant check', 'is this credential still authorised?'],
  ['03', 'Access plane', 'role → scope → operation'],
  ['04', 'Document guardrail', 'embedded files parsed and swept'],
  ['05', 'Detection ladder', 'pattern path, then the local model'],
  ['06', 'Agent limits & model registry', 'tools, caps, permitted models'],
  ['07', 'Verdict', 'the chain resolves exactly one outcome'],
  ['08', 'Sign → reply', 'the row is chained before the caller is answered'],
]

const VERDICT_TONE = { allow: 'allow', mask: 'mask', flag: 'flag', acknowledge: 'ack', block: 'block' }

export default function Journey() {
  const [caseId, setCaseId] = useState(data.cases[0].id)
  const [step, setStep] = useState(STEPS.length)          // settled by default
  const timers = useRef([])

  const c = data.cases.find((x) => x.id === caseId)

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clear, [])

  const run = (id) => {
    clear()
    setCaseId(id)
    setStep(0)
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setStep(STEPS.length); return }
    STEPS.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 160 * (i + 1)))
    })
  }

  const settled = step >= STEPS.length
  // the ladder is where a pattern-path case ends; everything else runs the chain
  const decidedAt = c.settledOnFastPath ? 5 : 7

  return (
    <>
      <Opening
        q="Watch one request travel the gateway."
        answer="Eight steps, and the order is the guarantee."
      >
        <p>
          Pick a prompt. Every one below is a real case from a run of 125 against the
          A10G pilot in the shipped configuration — the prompt, the verdict, the
          latency and the request id are what the gateway recorded, not what we
          would like them to say.
        </p>
        <p className="qa-aside">
          This is a replay of a recorded run, not live enforcement. The run does not
          record which detector fired, so this page does not name one.
        </p>
      </Opening>

      <section className="jr">
        <div className="wrap jr-in">

          <aside className="jr-pick">
            <h3 className="jr-h">Pick a request</h3>
            <div className="jr-list" role="list">
              {data.cases.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="listitem"
                  className={`jr-case${x.id === caseId ? ' is-on' : ''}`}
                  onClick={() => run(x.id)}
                  aria-current={x.id === caseId}
                >
                  <span className="jr-case-t">{x.typeLabel}</span>
                  <span className="jr-case-p">{x.prompt}</span>
                  <span className="jr-case-m">
                    <Tag k={VERDICT_TONE[x.verdict]}>{x.verdict}</Tag>
                    <span className="mono">
                      {x.settledOnFastPath ? 'fast path' : `${x.latencyMs.toFixed(0)} ms`}
                    </span>
                    {!x.correct && <span className="jr-wrong">over-caught</span>}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          <div className="jr-run">
            <div className="panel jr-prompt">
              <div className="panel-head">
                <span>POST /v1/chat/completions</span>
                <span className="mono">{c.requestId}</span>
              </div>
              <div className="panel-row"><pre>{`"${c.prompt}"`}</pre></div>
            </div>

            <ol className="jr-steps">
              {STEPS.map(([n, title, what], i) => {
                /* No step is marked skipped. A 0 ms latency proves no model
                   ran, so the pattern path produced the verdict — that much is
                   inferable. Which of the other steps were short-circuited is
                   not in the run, so the page does not guess. */
                const reached = step > i
                const isDecider = reached && settled && i + 1 === decidedAt
                return (
                  <li
                    key={n}
                    className={`jr-step${reached ? ' is-on' : ''}${isDecider ? ' is-decider' : ''}`}
                  >
                    <span className="jr-n">{n}</span>
                    <span className="jr-t">{title}</span>
                    <span className="jr-w">
                      {isDecider && c.settledOnFastPath
                        ? 'the pattern path settled it here — under a millisecond, no model call'
                        : isDecider
                          ? 'the chain resolved here, after the local model'
                          : what}
                    </span>
                  </li>
                )
              })}
            </ol>

            <div className={`jr-out${settled ? ' is-on' : ''}`} aria-live="polite">
              <div className="panel">
                <div className="panel-head">
                  <span>the ledger row</span>
                  <span>append-only · chained</span>
                </div>
                <div className="panel-row">
                  <pre>{`verdict     `}<code>{c.verdict}</code>{`
corpus      ${c.typeLabel.toLowerCase()} · expected ${c.expected}
latency     ${c.settledOnFastPath
  ? 'under 1 ms — settled on the pattern path'
  : `${c.latencyMs.toFixed(0)} ms — reached the local model`}
request_id  ${c.requestId}`}</pre>
                </div>
                <div className="panel-foot">
                  <span>{c.correct ? 'the gateway agreed with the label' : 'the gateway disagreed with the label'}</span>
                  <span>signed before the reply</span>
                </div>
              </div>

              {!c.correct && (
                <p className="jr-note">
                  <b>Over-caught.</b> The corpus labels this{' '}
                  <span className="mono">{c.expected}</span> and the gateway returned{' '}
                  <span className="mono">{c.verdict}</span>. Where that threshold sits is
                  a policy setting, not a code change — which is why every case is
                  scored separately rather than rolled into one number.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="qa">
        <div className="wrap qa-in">
          <h3 className="qa-q">Most of what matters never reaches the model.</h3>
          <div className="qa-a">
            <p>
              Of the {data.meta.totalCases} cases in that run,{' '}
              <b>{data.meta.fastPathCases} were settled by the pattern path</b> before any
              model ran — personal data, injection phrasing and business identifiers,
              answered in under a millisecond. The ones that reached the model took a
              median of {data.meta.modelMedianMs} ms.
            </p>
            <div className="route-row">
              <div>
                <span className="mono">{data.meta.fastPathCases} of {data.meta.totalCases}</span>
                <span>settled on the pattern path, under 1 ms</span>
              </div>
              <div>
                <span className="mono">{data.meta.modelMedianMs} ms</span>
                <span>median for the cases that reached the local model</span>
              </div>
              <div>
                <span className="mono">{data.meta.hardware}</span>
                <span>the reference pilot box</span>
              </div>
            </div>
            <p className="qa-aside">
              Recorded {data.meta.recorded} · run <span className="mono">{data.meta.runId}</span> ·{' '}
              <span className="mono">{data.meta.source}</span>. The corpus is a detection
              benchmark, roughly 80 % adversarial by design, so this mix is not what your
              traffic looks like — it is what the detector was asked to sort.
            </p>
            <p>
              <Link className="link" to="/benchmark">The full benchmark, policy by policy</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

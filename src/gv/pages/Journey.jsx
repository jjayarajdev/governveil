import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import { STAGES, Track } from '../pipeline'
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

const VERDICT_TONE = { allow: 'allow', mask: 'mask', flag: 'flag', acknowledge: 'ack', block: 'block' }

export default function Journey() {
  const [caseId, setCaseId] = useState(data.cases[0].id)
  const [step, setStep] = useState(STAGES.length)          // settled by default
  const timers = useRef([])

  const c = data.cases.find((x) => x.id === caseId)

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = [] }
  useEffect(() => clear, [])

  const run = (id) => {
    clear()
    setCaseId(id)
    setStep(0)
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setStep(STAGES.length); return }
    STAGES.forEach((_, i) => {
      timers.current.push(setTimeout(() => setStep(i + 1), 160 * (i + 1)))
    })
  }

  const settled = step >= STAGES.length
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

          <div className="jr-pick">
            <h3 className="jr-h">Pick a request</h3>
            <div className="pk" role="list">
              {data.cases.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="listitem"
                  className={`pk-i${x.id === caseId ? ' is-on' : ''}`}
                  onClick={() => run(x.id)}
                  aria-current={x.id === caseId}
                  /* The prompt is what actually tells two cases apart — two of
                     these are labelled "Benign" — and the chip has no room for
                     it, so it is the accessible name and the hover title. */
                  title={x.prompt}
                  aria-label={`${x.typeLabel}, ${x.verdict}${x.correct ? '' : ', over-caught'}: ${x.prompt}`}
                >
                  <span className="pk-t">{x.typeLabel}</span>
                  <span className="pk-m">
                    <Tag k={VERDICT_TONE[x.verdict]}>{x.verdict}</Tag>
                    {/* The old vertical list flagged the one case the gateway
                        got wrong; dropping it hid the only disagreement in the
                        set behind a click. */}
                    {!x.correct && <span className="pk-flag">over-caught</span>}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="jr-run">
            <div className="panel jr-prompt">
              <div className="panel-head">
                <span>POST /v1/chat/completions</span>
                <span className="mono">{c.requestId}</span>
              </div>
              <div className="panel-row"><pre>{`"${c.prompt}"`}</pre></div>
            </div>

            {/* The pipeline reads left to right, because that is what it
                does. `reached` animates as the replay runs; `decidedAt` marks
                where this particular request actually resolved. No stage is
                marked skipped — a 0 ms latency proves no model ran, but which
                other stages were short-circuited is not in the run. */}
            <div className="jr-track">
              <Track reached={step} decidedAt={settled ? decidedAt : null} />
              <p className="jr-decided" aria-live="polite">
                {settled && (c.settledOnFastPath
                  ? <>Settled at <b>{STAGES[decidedAt - 1].short}</b> — the pattern path
                    answered in under a millisecond, with no model call.</>
                  : <>Resolved at <b>{STAGES[decidedAt - 1].short}</b>, after the local
                    model — {c.latencyMs.toFixed(0)} ms end to end.</>)}
              </p>
            </div>

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

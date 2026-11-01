import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import data from '../data/decisions.json'

/* The decision explorer.

   92 prompts run through the gateway's verdict surface with the ledger read
   back — tests/data/results-prompts.csv joined to tests/data/prompts.jsonl for
   the control and the note. Every prompt, verdict, detector, control, latency
   and request id is from that run. Ten of the 92 are gaps that still
   reproduce, and they are in the list by default, not behind a filter.

   A replay of a recorded run, not live enforcement. */

const TONE = { allow: 'allow', acknowledge: 'ack', mask: 'mask', flag: 'flag', block: 'block' }
const FILTERS = [
  ['all', 'All 92'],
  ['gap', 'Where the label and the verdict differ'],
  ['good', 'Should pass'],
  ['bad', 'Should be caught'],
  ['ugly', 'Hard cases'],
]

export default function Decisions() {
  const [filter, setFilter] = useState('all')
  const [id, setId] = useState(data.cases[0].id)

  const list = useMemo(() => {
    if (filter === 'gap') return data.cases.filter((c) => c.outcome === 'GAP')
    if (filter === 'all') return data.cases
    return data.cases.filter((c) => c.tier === filter)
  }, [filter])

  const c = data.cases.find((x) => x.id === id) || list[0]
  const isGap = c.outcome === 'GAP'

  return (
    <>
      <Opening
        q="Why was this request refused?"
        answer="Every decision carries its reason."
      >
        <p>
          A verdict nobody can explain is not evidence. Pick any of the 92 prompts
          below and the record comes with it: what was expected, what the gateway
          did, which detector fired, which control it belongs to, how long it took
          and the request id you would quote to an auditor.
        </p>
        <p className="qa-aside">
          Replay of <span className="mono">{data.meta.command}</span> —{' '}
          {data.meta.pass} matched the corpus label, {data.meta.gap} differed and{' '}
          {data.meta.gapClosed} were reconciled by a later change. Every case is in the
          list, scored the same way.
        </p>
      </Opening>

      <section className="dx">
        <div className="wrap">
          <div className="dx-filters" role="group" aria-label="Filter decisions">
            {FILTERS.map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`dx-f${filter === k ? ' is-on' : ''}`}
                aria-pressed={filter === k}
                onClick={() => setFilter(k)}
              >
                {label}
                {k === 'gap' && <span className="dx-f-n">{data.meta.gap}</span>}
              </button>
            ))}
          </div>

          <div className="dx-in">
            <div className="dx-list" role="list">
              {list.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="listitem"
                  className={`dx-item${x.id === c.id ? ' is-on' : ''}${x.outcome === 'GAP' ? ' is-gap' : ''}`}
                  onClick={() => setId(x.id)}
                  aria-current={x.id === c.id}
                >
                  <span className="mono dx-id">{x.id}</span>
                  <span className="dx-p">{x.prompt}</span>
                  <Tag k={TONE[x.actual] || 'flag'}>{x.actual}</Tag>
                </button>
              ))}
            </div>

            <aside className="dx-rec">
              <div className="dx-sticky">
                <div className={`dx-card${isGap ? ' is-gap' : ''}`}>
                  <div className="dx-card-h">
                    <span className="mono">{c.id}</span>
                    <span>{c.tierLabel} · {c.category}</span>
                  </div>

                  <p className="dx-prompt">“{c.prompt}”</p>

                  <dl className="dx-kv">
                    <div><dt>expected</dt><dd className="mono">{c.expect}</dd></div>
                    <div>
                      <dt>the gateway did</dt>
                      <dd><Tag k={TONE[c.actual] || 'flag'}>{c.actual}</Tag></dd>
                    </div>
                    <div>
                      <dt>what fired</dt>
                      <dd>
                        {c.noViolation
                          ? <span className="dim">no policy violation</span>
                          : c.detectors.map((d) => (
                              <span className="dx-det mono" key={d}>{d}</span>
                            ))}
                      </dd>
                    </div>
                    <div>
                      <dt>control</dt>
                      <dd className="mono">{c.control || <span className="dim">—</span>}</dd>
                    </div>
                    <div><dt>latency</dt><dd className="mono">{c.ms != null ? `${c.ms} ms` : '—'}</dd></div>
                    <div><dt>request id</dt><dd className="mono dx-rid">{c.requestId}</dd></div>
                  </dl>

                  {isGap && (
                    <p className="dx-gap">
                      <b>Label and verdict differ.</b> The corpus expects{' '}
                      <span className="mono">{c.expect}</span>; the gateway returned{' '}
                      <span className="mono">{c.actual}</span>
                      {c.note ? <> — {c.note}</> : null}. It is scored as its own case so
                      a threshold change shows up here the moment it lands.
                    </p>
                  )}
                  {!isGap && c.note && <p className="dx-note">{c.note}</p>}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="qa">
        <div className="wrap qa-in">
          <h3 className="qa-q">Every case is scored, not just the ones that agree.</h3>
          <div className="qa-a">
            <p>
              Each case carries its own label and reason, so a threshold change shows
              up the moment it lands and a regression is caught on the next run. That is
              the difference between a detector you can tune and a number you were
              handed.
            </p>
            <div className="route-row">
              <div><span className="mono">{data.meta.pass}</span><span>landed where the corpus said they should</span></div>
              <div><span className="mono">{data.meta.gap}</span><span>where the verdict and the label differ</span></div>
              <div><span className="mono">{data.meta.gapClosed}</span><span>reconciled by a later change</span></div>
            </div>
            <p className="qa-aside">
              <span className="mono">{data.meta.source}</span>. The same discipline runs
              the published benchmark, which is where the weak rows — PII at 80 %,
              business-sensitive at 66.7 % — come from.
            </p>
            <p><Link className="link" to="/benchmark">The published benchmark</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

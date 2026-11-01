import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Opening } from '../interview'
import data from '../data/decisions.json'

/* The decision record.

   92 prompts through the gateway's verdict surface, with every verdict read
   back from the ledger and the chain verified — `make test-verdicts` runs
   --ledger --verify-ledger. Source: tests/data/results-prompts.csv joined to
   tests/data/prompts.jsonl for the control and the note.

   This page is the decision record a security lead and an auditor read, so it
   is organised by verdict and by control — the two things they filter on. It
   is deliberately NOT organised by the test corpus's own tiers ("should pass",
   "hard case") or by its 64 research categories: those describe how the suite
   was built, not what the product does.

   Two fields from the run are deliberately NOT rendered:

   - `expect` holds the test assertion, and several are alternations
     ("mask|block"). A pipe-delimited expectation is a harness detail and means
     nothing to a buyer.
   - `ms` is wall-clock from the Python harness to /api/v1/test/analyze on
     whatever box ran it — HTTP setup and interpreter overhead included, not
     the A10G. It reads 540-660 ms on trivially benign prompts, which would
     contradict the measured latencies on /benchmark and the journey for no
     reason. Verdict latency is measured properly there; do not surface this
     column here.

   A replay of a recorded run, not live enforcement. */

const TONE = { allow: 'allow', acknowledge: 'ack', mask: 'mask', flag: 'flag', block: 'block' }

/* Filter by the verdict, which is the question a security lead arrives with:
   what did we stop, and what needed a person? */
const FILTERS = [
  ['all', 'Every decision'],
  ['block', 'Blocked'],
  ['acknowledge', 'Sent back to the person'],
  ['mask', 'Masked'],
  ['allow', 'Allowed through'],
]

/* What each decision was about, in the product's own vocabulary rather than
   the corpus's 64 research categories.

   Read from the control AND the detector, because neither alone is right:
   secrets are filed under control PI-02, so keying off the control labels an
   AWS key "Personal data"; and sixteen blocks carry no control at all, so
   keying off the control labels a blocked weapons request "No policy matched"
   directly beside the word `block`. First match wins. */
const has = (c, d) => (c.detectors || []).includes(d)
const ctrl = (c, k) => (c.control || '').includes(k)
const personal = (c) => ctrl(c, 'PI-02') || has(c, 'fast_pii_filter') || has(c, 'default_pii_protection')
const health = (c) => ctrl(c, 'HS-03')

const SUBJECT = [
  ['Credentials and secrets', (c) => has(c, 'fast_credential_filter')],
  ['Business-sensitive', (c) => has(c, 'fast_business_filter')
    || has(c, 'Business-Critical (ML)') || has(c, 'Business Data Protection')],
  ['Prompt injection', (c) => ctrl(c, 'INJ-01')
    || has(c, 'behavioral_anomaly_detection') || has(c, 'Prompt Injection (ML)')],
  ['Harmful content', (c) => ctrl(c, 'TOX-01') || has(c, 'Toxicity (ML)')],
  ['Harmful intent', (c) => has(c, 'Harmful Intent (ML)')],
  ['Personal and health data', (c) => personal(c) && health(c)],
  ['Health data', health],
  ['Personal data', personal],
  ['Model response', (c) => ctrl(c, 'RO-01')],
  ['Approved models', (c) => ctrl(c, 'MD-01')],
  ['Agent and tool use', (c) => ctrl(c, 'AG-11')],
  /* Safety Guard fires across injection, harm and identifier probing, so it
     names no subject of its own — it only lands here when nothing above did. */
  ['Judged unsafe by the model', (c) => (c.detectors || []).length > 0],
]

/* `noViolation` wins over everything: on a case where nothing fired, the
   `control` field holds the control the corpus EXPECTED, not one that
   engaged. Labelling an allowed request by that control would claim a check
   ran when none did. */
const subject = (c) =>
  (c.noViolation ? null : SUBJECT.find(([, test]) => test(c)))?.[0] ?? 'No policy matched'

/* Two things the corpus distinguishes that a reader should see:

   - `evasion-*` are the deliberately obfuscated attempts — homoglyphs,
     zero-width joiners, base64, full-width digits, a second language. Worth a
     badge, because catching them is the hard part.
   - `lookalike` and `benign-*` are near-misses that must NOT fire: text that
     resembles an identifier but is not one. Badging those as evasions would
     say the opposite of what they are. */
const isEvasion = (c) => (c.category || '').startsWith('evasion')
const isLookalike = (c) => (c.category || '') === 'lookalike'

export default function Decisions() {
  const [filter, setFilter] = useState('all')
  const [id, setId] = useState('B-04')

  const counts = useMemo(() => {
    const n = {}
    for (const c of data.cases) n[c.actual] = (n[c.actual] || 0) + 1
    return n
  }, [])

  /* Lead with the decisions that show the product working. The corpus is
     ordered good -> bad -> ugly, which puts twenty benign allows at the top;
     a reader meeting "banana bread -> allow" five times over learns nothing. */
  const ORDER = { block: 0, acknowledge: 1, mask: 2, allow: 3 }
  const list = useMemo(() => {
    const rows = filter === 'all' ? data.cases : data.cases.filter((c) => c.actual === filter)
    return [...rows].sort(
      (a, b) => (ORDER[a.actual] ?? 9) - (ORDER[b.actual] ?? 9) || a.id.localeCompare(b.id),
    )
  }, [filter])

  const c = data.cases.find((x) => x.id === id) || list[0]

  return (
    <>
      <Opening
        q="What happened, and can you prove it?"
        answer="Every AI request leaves a signed decision record."
      >
        <p>
          A verdict nobody can account for is not evidence. Each decision below carries
          the record with it: what the gateway did, which detector fired, which control
          it serves, and the request id you would quote to an auditor — appended to the
          hash chain before the caller got its reply.
        </p>
        <p className="qa-aside">
          Replay of <span className="mono">{data.meta.command}</span> — 92 prompts, every
          verdict read back from the ledger and the chain verified, not taken from the
          gateway&rsquo;s own response.
        </p>
      </Opening>

      <section className="dx">
        <div className="wrap">
          <div className="dx-filters" role="group" aria-label="Filter by verdict">
            {FILTERS.map(([k, label]) => (
              <button
                key={k}
                type="button"
                className={`dx-f${filter === k ? ' is-on' : ''}`}
                aria-pressed={filter === k}
                onClick={() => setFilter(k)}
              >
                {label}
                <span className="dx-f-n">{k === 'all' ? data.meta.total : counts[k] || 0}</span>
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
                  className={`dx-item${x.id === c.id ? ' is-on' : ''}`}
                  onClick={() => setId(x.id)}
                  aria-current={x.id === c.id}
                >
                  <span className="dx-subj">
                    {subject(x)}
                    {isEvasion(x) && <span className="dx-ev">evasion</span>}
                    {isLookalike(x) && <span className="dx-ev is-near">near-miss</span>}
                  </span>
                  <span className="dx-p">{x.prompt}</span>
                  <Tag k={TONE[x.actual] || 'flag'}>{x.actual}</Tag>
                </button>
              ))}
            </div>

            <aside className="dx-rec">
              <div className="dx-sticky">
                <div className="dx-card">
                  <div className="dx-card-h">
                    <span>{subject(c)}</span>
                    {isEvasion(c) && <span className="dx-ev">evasion attempt</span>}
                    {isLookalike(c) && (
                      <span className="dx-ev is-near">near-miss — must not fire</span>
                    )}
                  </div>

                  <p className="dx-prompt">&ldquo;{c.prompt}&rdquo;</p>

                  <dl className="dx-kv">
                    <div>
                      <dt>the gateway did</dt>
                      <dd><Tag k={TONE[c.actual] || 'flag'}>{c.actual}</Tag></dd>
                    </div>
                    <div>
                      <dt>what fired</dt>
                      <dd>
                        {c.noViolation
                          ? <span className="dim">no policy matched</span>
                          : c.detectors.map((d) => (
                              <span className="dx-det mono" key={d}>{d}</span>
                            ))}
                      </dd>
                    </div>
                    <div>
                      <dt>control</dt>
                      <dd className="mono">{c.control || <span className="dim">—</span>}</dd>
                    </div>
                    <div><dt>request id</dt><dd className="mono dx-rid">{c.requestId}</dd></div>
                  </dl>

                  {c.note && <p className="dx-note">{c.note}</p>}

                  <div className="dx-card-f">
                    <span>&#10003; read back from the ledger</span>
                    <span>chain verified</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="qa">
        <div className="wrap qa-in">
          <h3 className="qa-q">Blocking is one outcome of five.</h3>
          <div className="qa-a">
            <p>
              Most products on this market decide between allow and block. In this run{' '}
              <b>{counts.acknowledge} of the 92</b> went to{' '}
              <Tag k="ack">acknowledge</Tag> instead — the person sees the real values
              the gateway found, unticks what the assistant does not need, says why the
              rest has to go, and sends. Their name, their reason and the field types go
              on the ledger. The values do not.
            </p>
            <div className="route-row">
              <div><span className="mono">{counts.block}</span><span>stopped, with the reason on the record</span></div>
              <div><span className="mono">{counts.acknowledge}</span><span>handed back to the person to minimise and justify</span></div>
              <div><span className="mono">{counts.allow}</span><span>no policy matched — forwarded unchanged</span></div>
            </div>
            <p className="qa-aside">
              Ten of the 92 landed on a verdict the corpus labels differently, in both
              directions. Each is in the list above with its full record — which is the
              point of scoring every case on its own: where a threshold sits is a policy
              setting you own, not a code change.
            </p>
          </div>
        </div>
      </section>

      <section className="qa">
        <div className="wrap qa-in">
          <h3 className="qa-q">Who the record is for.</h3>
          <div className="qa-a">
            <div className="route-row">
              <div>
                <span className="mono">auditor</span>
                <span>
                  A request id that resolves to a signed row, and a standalone verifier
                  that walks the chain from the command line
                </span>
              </div>
              <div>
                <span className="mono">security</span>
                <span>
                  Which detector fired and which control it serves, so a decision can be
                  traced to the clause it enforces
                </span>
              </div>
              <div>
                <span className="mono">engineering</span>
                <span>
                  The same 92 cases run on every build, so a threshold change shows up
                  the moment it lands and a regression is caught on the next run
                </span>
              </div>
            </div>
            <p className="qa-aside">
              <span className="mono">{data.meta.source}</span>. The published benchmark
              scores a thousand prompts the same way, policy by policy.
            </p>
            <p><Link className="link" to="/benchmark">The published benchmark</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}

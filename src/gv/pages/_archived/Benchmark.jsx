import { Band, Cta, Eyebrow, SectionHead, Stat, Table, Tag } from '../bits'

const BY_POLICY = [
  ['Harmful intent — AdvBench', 494, 500, '98.8 %', 'good',
    'Strong. This is the category most harnesses report.'],
  ['Toxicity', 99, 100, '99.0 %', 'good', 'Strong.'],
  ['Prompt injection', 23, 25, '92.0 %', 'good',
    'Strong. 25 cases here — the corpus to extend first with your own traffic.'],
  ['PII', 80, 100, '80.0 %', 'low',
    'The fast path is deterministic on identifier formats; free-text personal data is harder. The flag tier covers the gap.'],
  ['Business-sensitive', 50, 75, '66.7 %', 'low',
    '“Business-sensitive” means something different in every organisation, which is exactly what your own labelled traffic resolves.'],
]

const LATENCY = [
  ['Fast path — regex, secrets, injection phrases', 'sub-millisecond', <>Go benchmark, per request</>],
  ['Kill switch — revoked grant to 403', '~0.5 ms', <>measured in-line, before any inspection</>],
  ['Model path, single request, no queue', '~135–170 ms',
    <>A10G (<span className="mono">g5.2xlarge</span>), Shieldstral-1.0-3B bf16; ~100 ms is the model itself</>],
  ['Model path ceiling, per GPU', '~7.4 req/s',
    <>load test 2026-09-03 at 100&nbsp;% escalation; 2,399 ledger rows, no fail-open observed</>],
  ['Share of real traffic reaching the model', '15–30 %', <>sizing model, 10,000-FTE worked example</>],
  ['Classic five-model stack, same GPU', '~190 ms', <>retained as a fallback path</>],
]

const PROBES = [
  ['01', 'Control probe',
    `The canonical trigger for the control. It must act. If it does not, the control is
     not holding, whatever the dashboard said yesterday.`],
  ['02', 'Override probe',
    `A benign near-miss. It must pass. A control that has quietly become over-broad
     shows up here before your users find it.`],
  ['03', 'Bypass probe',
    `A known evasion. It must still be stopped. This is the row that catches a
     regression a model upgrade introduced.`],
]

export default function Benchmark() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Benchmark</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '19ch' }}>
            Numbers you can reproduce, including the <em>bad ones</em>.
          </h1>
          <p className="lede">
            The corpora and the runner are committed to the repository. Stand up the
            stack and <span className="mono">make benchmark</span> scores them against
            your own deployment. Same datasets, same policies, same model, same numbers
            — and no cloud calls, because the whole harness runs against your local
            stack.
          </p>
          <div className="panel" style={{ maxWidth: 640 }}>
            <div className="panel-head">
              <span>REPRODUCE</span><span>no network required</span>
            </div>
            <div className="panel-row">
              <pre>{'$ make benchmark          '}<code># or: python3 eval/suite.py</code>{`
$ make eval-gate          `}<code># the gate detection changes must pass</code>{`
$ make mcp-scorecard      `}<code># the MCP tool-poisoning corpus</code></pre>
            </div>
          </div>
        </div>
      </section>

      {/* ───── headline ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="Headline"
          title={<>The <span className="mono">combined-1000</span> corpus.</>}
        >
          800 prompts that should be caught, 200 benign prompts that should not. Run
          2026-09-02 against a local stack.
        </SectionHead>

        <div className="grid cols-4" style={{ marginBottom: 44 }}>
          <Stat n="93.25" unit=" %" label="Recall">
            Of the 800 should-catch prompts, 746 were caught.
          </Stat>
          <Stat n="100" unit=" %" label="Precision">
            Every prompt the gateway caught was one it should have caught.
          </Stat>
          <Stat n="0" unit=" %" label="False-positive rate">
            Zero of the 200 benign prompts were wrongly caught.
          </Stat>
          <Stat n="96.51" label="F1">
            The harmonic mean, for comparability with other published harnesses.
          </Stat>
        </div>

        <Table narrow style={{ maxWidth: 560 }} head={<>
          <th>Confusion</th><th className="num">Count</th>
        </>}>
          <tr><td>True positives — caught, correctly</td><td className="num t-good">746</td></tr>
          <tr><td>False positives — caught, wrongly</td><td className="num t-good">0</td></tr>
          <tr><td>True negatives — passed, correctly</td><td className="num t-good">200</td></tr>
          <tr><td>False negatives — missed</td><td className="num t-low">54</td></tr>
        </Table>
      </Band>

      {/* ───── by policy ───── */}
      <Band>
        <SectionHead eyebrow="By policy" title="Every policy, scored on its own.">
          Most vendors publish one number. This is every policy, scored separately —
          and the two lower rows are precisely why the <Tag k="flag">flag</Tag> tier and
          a review queue exist.
        </SectionHead>
        <Table head={<>
          <th>Policy</th><th className="num">Caught</th><th className="num">Total</th>
          <th className="num">Catch rate</th><th>Reading</th>
        </>}>
          {BY_POLICY.map(([policy, caught, total, rate, tone, reading]) => (
            <tr key={policy}>
              <td>{policy}</td>
              <td className="num">{caught}</td>
              <td className="num">{total}</td>
              <td className={`num t-${tone}`}>{rate}</td>
              <td>{reading}</td>
            </tr>
          ))}
          <tr>
            <td>Benign — must <em>not</em> be caught</td>
            <td className="num">0</td>
            <td className="num">200</td>
            <td className="num t-good">0.0 %</td>
            <td>No false alarms. This is the number that decides whether people route
              around you.</td>
          </tr>
        </Table>
      </Band>

      {/* ───── is / is not ───── */}
      <section className="band band-sunken">
        <div className="wrap grid cols-2 gap-wide">
          <div>
            <h2 className="h-sub" style={{ fontSize: 26 }}>What this benchmark is</h2>
            <ul className="checklist">
              <li><span>Labelled corpora committed to the repository, not a private
                dataset.</span></li>
              <li><span>Scored through the gateway’s own analyse endpoint in dry-run
                mode, so no ledger rows are written and the real policy chain is what
                gets measured.</span></li>
              <li><span>Deterministic: the same datasets, policies and model give the
                same numbers.</span></li>
              <li><span>Entirely local. No prompt in the corpus is sent anywhere to be
                scored.</span></li>
            </ul>
          </div>
          <div>
            <h2 className="h-sub" style={{ fontSize: 26 }}>How to read it</h2>
            <ul className="checklist">
              <li><span>These are our corpora. Run them, then bring your own — the
                harness takes both.</span></li>
              <li><span>Business-sensitive detection is organisation-specific by
                nature, which is what your own labelled traffic is for.</span></li>
              <li><span>No lab was engaged and no figure here was produced by one.
                Every number came off a stack you can stand up yourself.</span></li>
              <li><span>Not a substitute for your own corpus. Business-sensitive
            detection in particular is organisation-specific, and the review queue
            turns your traffic into a labelled set you can score in-house.</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ───── probes ───── */}
      <Band>
        <SectionHead
          eyebrow="Beyond the corpus"
          title="A benchmark is a snapshot. Probes are a heartbeat."
        >
          A corpus tells you how the detector scored one afternoon. It does not tell you
          whether the control you turned on in March is still holding in October. That
          is what synthetic probes are for.
        </SectionHead>
        <div className="grid cols-3">
          {PROBES.map(([n, h, p]) => (
            <div className="card card-num" key={n}>
              <span className="numeral">{n}</span>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
        <p className="note" style={{ marginTop: 36 }}>
          Probes travel the real data path under a probe identity, daily at a quiet hour
          and on demand. They are tagged synthetic on the ledger and the evidence row so
          they never count as traffic, and they are judged from the evidence they
          produced rather than from a response code. “Last challenged” is a column on
          the control board, and a probe run exports as evidence for a committee pack.
        </p>
      </Band>

      {/* ───── latency ───── */}
      <Band sunken>
        <SectionHead eyebrow="Latency" title="Measured, with the method attached." />
        <Table head={<>
          <th>Path</th><th className="num">Number</th><th>Method</th>
        </>}>
          {LATENCY.map(([path, n, method]) => (
            <tr key={path}>
              <td>{path}</td>
              <td className="num">{n}</td>
              <td>{method}</td>
            </tr>
          ))}
        </Table>
      </Band>

      {/* ───── a miss we published ───── */}
      <Band narrow>
        <Eyebrow>A miss we published</Eyebrow>
        <h2 className="h-section">The bug that governing a desktop app found.</h2>
        <p className="muted">
          While bringing a real open-source desktop AI application under the gateway, we
          found that it inspected only the first message of a chat request. Personal
          data sitting behind a system prompt was being forwarded. It was fixed the same
          day, with tests, and recorded in the documentation accuracy report along with
          every other correction we have had to make.
        </p>
        <p className="muted">
          We mention it here because it is the most useful thing we can tell you about
          how this is built: the gap was found by putting the product in front of
          something real, and the record of it is in the repository rather than in a
          drawer. Ask any vendor you are evaluating for their equivalent list.
        </p>
      </Band>

      <Cta />
    </>
  )
}

import { Band, Cta, Eyebrow, SectionHead, Tag } from '../bits'

/* Each cell is [tag kind, tag text, qualifier]. The qualifier renders on its
   own line under the tag — inline, six columns wide, the two wrap into each
   other and the column stops being scannable.

   Verified against each vendor's own documentation in the competitive landscape
   review; a capability that is marketed but could not be confirmed is
   "unconfirmed", not "no". */
const COLUMNS = [
  <>Verdict in<br />your perimeter</>,
  <>Restores<br />real values</>,
  <>Consumer<br />assistant guard</>,
  <>Enterprise API<br />scope-gating</>,
  <>Reproducible<br />benchmark</>,
]

const ROWS = [
  {
    self: true,
    name: <b>GovernVeil</b>,
    cells: [
      ['allow', 'yes', 'local models'],
      ['allow', 'yes', 'opt-in'],
      ['allow', 'yes', 'eight assistants'],
      ['allow', 'yes', ''],
      ['allow', 'yes', 'corpus + runner'],
    ],
  },
  {
    name: <>Prompt Security <span className="tiny dim">(SentinelOne)</span></>,
    cells: [
      ['allow', 'yes', 'on-prem edition'],
      ['block', 'no', 'one-way'],
      ['ack', 'partial', 'Chrome extension'],
      ['block', 'no', ''],
      ['block', 'no', ''],
    ],
  },
  {
    name: <>Prisma AIRS + AI Gateway <span className="tiny dim">(Palo Alto)</span></>,
    cells: [
      ['block', 'no', 'vendor cloud'],
      ['block', 'no', 'block-only'],
      ['ack', 'partial', 'enterprise hooks only; consumer web bypasses'],
      ['block', 'no', ''],
      ['block', 'no', 'counts only'],
    ],
  },
  {
    name: <>WitnessAI</>,
    cells: [
      ['block', 'no', 'vendor-cloud inference'],
      ['flag', 'unconfirmed', 'tokenisation'],
      ['block', 'no', ''],
      ['block', 'no', ''],
      ['block', 'no', ''],
    ],
  },
  {
    name: <>Protecto</>,
    cells: [
      ['ack', 'partial', 'model locality unconfirmed'],
      ['allow', 'yes', 'detokenise on return'],
      ['block', 'no', ''],
      ['block', 'no', 'SDK, not a proxy'],
      ['block', 'no', 'private dataset'],
    ],
  },
  {
    name: <>Lakera Guard <span className="tiny dim">(Check Point)</span></>,
    cells: [
      ['allow', 'yes', 'enterprise self-hosted'],
      ['block', 'no', 'returns spans; the caller acts'],
      ['allow', 'yes', 'in the browser product'],
      ['block', 'no', ''],
      ['ack', 'partial', 'own, repo archived'],
    ],
  },
  {
    name: <>Noma Security</>,
    cells: [
      ['block', 'no', 'vendor endpoint'],
      ['flag', 'unconfirmed', ''],
      ['block', 'no', 'observe-only'],
      ['block', 'no', 'needs a gateway'],
      ['block', 'no', ''],
    ],
  },
  {
    name: <>Harmonic Security</>,
    cells: [
      ['block', 'no', 'vendor cloud'],
      ['block', 'no', ''],
      ['allow', 'yes', 'broadest list'],
      ['block', 'no', 'browser only'],
      ['block', 'no', ''],
    ],
  },
  {
    name: <>RunLayer</>,
    cells: [
      ['ack', 'partial', 'locality unconfirmed'],
      ['block', 'no', 'detect and block'],
      ['block', 'no', 'MDM agent instead'],
      ['block', 'no', 'MCP gateway'],
      ['block', 'no', 'one vendor figure'],
    ],
  },
  {
    name: <>Microsoft Purview</>,
    cells: [
      ['block', 'no', ''],
      ['block', 'no', ''],
      ['ack', 'partial', 'Edge / Intune only'],
      ['block', 'no', 'no API path'],
      ['block', 'no', ''],
    ],
  },
]

const WHY_NOW = [
  ['Ten acquisitions in twenty-four months',
    `Lakera to Check Point. Portkey to Palo Alto. Pangea to CrowdStrike. Aim to Cato.
     CalypsoAI to F5. Prompt Security to SentinelOne. Robust Intelligence to Cisco. The
     independent specialists were bought, and their products were absorbed into platform
     SKUs.`],
  ['Agents created a surface nobody governs',
    `The posture and inventory vendors raised well, but inventory is not containment.
     Very little of the field does runtime credential containment or scope-gating at the
     moment an agent actually acts.`],
  ['Residency buyers were abandoned structurally',
    `Ten of the thirteen products we verified send prompt content out for the verdict.
     For a bank under APRA, a GCC under DPDP or a government buyer under PSPF, that is
     not a procurement preference — it is a disqualification.`],
]

export default function Compare() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Compare</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '20ch' }}>
            Two questions that shorten the <em>evaluation</em>.
          </h1>
          <p className="lede">
            We verified thirteen competing products feature by feature. Ten of them send
            prompt content to a vendor or hyperscaler cloud to compute the verdict —
            several that market themselves as self-hosted among them. You don’t need our
            opinion to find that out. You need two questions.
          </p>

          <div className="grid cols-2" style={{ gap: 20, marginTop: 40 }}>
            <div className="card card-num">
              <span className="numeral">Question 01</span>
              <h3 className="h-sub">“Where does the prompt go for a verdict?”</h3>
              <p>
                Not where the data is stored. Not where the console runs. Where the{' '}
                <em>text of the prompt</em> travels to be scored. Ask for it in writing,
                and ask whether the answer is attested or asserted.
              </p>
            </div>
            <div className="card card-num">
              <span className="numeral">Question 02</span>
              <h3 className="h-sub">“Does the product restore my data, or only block it?”</h3>
              <p>
                Most products detect and refuse. A few redact one-way. Very few return
                the real values to the authorised caller on the way back, which is the
                difference between stopping leakage and stopping work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ───── the field ───── */}
      <Band sunken>
        <SectionHead eyebrow="The field, verified" title="Where the prompt actually goes.">
          From our competitive landscape review, verified against each vendor’s own
          documentation and primary sources. Where a capability is marketed but we could
          not confirm it, it is marked unconfirmed rather than denied.
        </SectionHead>
        <div className="tablewrap">
          <table className="cmp">
            <thead>
              <tr>
                <th>Product</th>
                {COLUMNS.map((c, i) => <th key={i}>{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, ri) => (
                <tr className={row.self ? 'row-self' : undefined} key={ri}>
                  <th scope="row">{row.name}</th>
                  {row.cells.map(([k, text, note], ci) => (
                    <td key={ci}>
                      <Tag k={k}>{text}</Tag>
                      {note && <span className="cell-note">{note}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="small dim" style={{ marginTop: 16 }}>
          Last verified against primary sources in our competitive landscape review. If
          you believe a row is out of date, tell us and we will re-verify it — we would
          rather correct this table than defend it.
        </p>
      </Band>

      {/* ───── purview ───── */}
      <Band>
        <SectionHead
          eyebrow="The objection we hear most"
          title="“We already own Microsoft Purview.”"
        />
        <div className="grid cols-2 gap-wide">
          <div>
            <p className="muted">
              You probably do, and it is a reasonable first line. Since November 2025
              Purview blocks GenAI prompts inline, and if your estate is entirely Edge,
              Intune and Entra, it covers a real part of the problem. We position
              additively: keep it.
            </p>
            <p className="muted">
              What it does not do, by its own documentation, is the part we were built
              for.
            </p>
          </div>
          <ul className="checklist no">
            <li><span>Edge, Intune and Entra only — other browsers and unmanaged devices
              are outside it.</span></li>
            <li><span>No claude.ai coverage.</span></li>
            <li><span>No redaction — the choice is allow or block, so the work
              stops.</span></li>
            <li><span>No API path. Your applications and agents calling model APIs
              directly are not in scope at all.</span></li>
            <li><span>By its own documentation, it cannot scan the contents of files
              uploaded directly into prompts.</span></li>
          </ul>
        </div>
      </Band>

      {/* ───── why now ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="Why now"
          title="The category repriced, and the residency segment was left behind."
        />
        <div className="grid cols-3">
          {WHY_NOW.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── our side of it ───── */}
      <Band narrow>
        <Eyebrow>Our side of it</Eyebrow>
        <h2 className="h-section">Who we would worry about, if we were you.</h2>
        <p className="muted">
          <b>Prompt Security, inside SentinelOne.</b> They shipped an on-prem,
          air-gapped edition in March 2026 and have a Chrome extension. They do not claim
          restore and they publish no reproducible efficacy, but on architecture they are
          the closest.
        </p>
        <p className="muted">
          <b>Palo Alto on the ex-Portkey gateway.</b> Today it is block-only and scored
          in their cloud. If they ship transparent redact-and-forward with local scoring,
          one of our differentiators narrows. We watch it, and we will tell you if it
          changes.
        </p>
        <p className="muted">
          <b>Protecto.</b> Genuine reversible-masking parity, confirmed. We beat them on
          form factor — they are an SDK and a vault you re-plumb each application into,
          not a transparent proxy — and on the browser guard and the published benchmark.
          On the masking itself, they are real.
        </p>
        <p className="muted">
          <b>A platform you already pay for.</b> The honest structural risk is bundling:
          a capability that is 70&nbsp;% as good but already in your licence is a hard
          thing to displace. Our answer is that the 30&nbsp;% is the part a regulator
          asks about, and that the evidence is yours rather than the platform’s. You
          should still weigh it.
        </p>
        <p className="note" style={{ marginTop: 30 }}>
          We will not tell you a competitor’s product is bad. We will tell you where each
          one is strong, and hand you the two questions. If the answers work out in
          someone else’s favour for your estate, that is a better outcome than a pilot
          that fails in week six.
        </p>
      </Band>

      <Cta />
    </>
  )
}

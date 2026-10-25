import { Link } from 'react-router-dom'
import { Band, Cta, Eyebrow, KV, Row, SectionHead, Table } from '../bits'

const EDITIONS = [
  ['Core', '$38,000', '5', '≤ 500',
    `All three enforcement surfaces, the signed ledger, document scanning and the asset
     registry. Low-touch support.`],
  ['Advanced', '$75,000', '20', '≤ 1,500',
    `Core, plus agent action governance, detective mode, the model registry, and
     eligibility for the signed attestation. Named support, 8×5.`],
  ['Enterprise', '$120,000', '60', '≤ 5,000',
    `Advanced, plus the policy library, control inheritance, policy drift, air-gapped
     operation and multi-entity. 24×7 support and DR.`],
]

const PER_USER = [
  ['GovernVeil', ' — Core, 500 users', '$76', '$38,000', 'Three surfaces, self-hosted', true],
  ['GovernVeil', ' — Advanced, 1,500', '$50', '$75,000', '', true],
  ['GovernVeil', ' — Advanced, 2,000', '$42', '$85,000', 'with one user block', true],
  ['GovernVeil', ' — Enterprise, 5,000', '$24', '$120,000', '', true],
  ['GovernVeil', ' — Enterprise, 10,000', '$16', '$160,000', 'with two user blocks', true],
]

const COMPETITORS = [
  [<>WitnessAI</>, '$180', '$180,000',
    '1,000-seat minimum; verdicts computed in the vendor’s AWS'],
  [<>Harmonic Security</>, '$163', '$32,600',
    '200-seat minimum; classification runs in the vendor’s cloud'],
  [<>Prompt Security <span className="tiny dim">(SentinelOne)</span></>, '$120', 'quote',
    'street price via resellers; on-prem edition since Mar 2026'],
]

const REGIONS = [
  ['United States', '1.15', '$43,700'],
  ['UAE · Saudi Arabia', '1.10', '$41,800'],
  ['Australia · UK · EU', '1.00', '$38,000'],
  ['Singapore · Hong Kong', '0.95', '$36,100'],
  ['Rest of Asia-Pacific', '0.75', '$28,500'],
  ['India', '0.50', '$19,000'],
]

const DEFINITIONS = [
  ['What is a governed asset?',
    `A row in the asset registry — an application, model or agent — that carried traffic
     during the term. An asset you registered and never used does not count against your
     entitlement. The licence counter reads this from the ledger, so the number is
     evidence rather than an estimate, and you can see it yourself before any
     conversation about a true-up.`],
  ['What is a governed user?',
    `A distinct person appearing on the ledger in any rolling 90-day window. Service
     accounts and agents are assets, not users, so an automated workload does not
     inflate your seat count. Synthetic probes are tagged and excluded by construction.`],
  ['How does a true-up work?',
    `From the ledger, at renewal, against the same counter you have been able to read
     all year. There is no telemetry we hold that you cannot — the licence page in the
     console shows governed assets and peak users against entitlement.`],
  ['Do you charge for the detection models or the GPU?',
    <>No. The models run on your hardware, and the GPU is your infrastructure cost — a
      single A10G-class instance for the reference pilot. The cost figure on each ledger
      row is the <em>provider’s</em> inference charge on the forward path, recorded for
      your own attribution and chargeback. It is never a GovernVeil charge, and it ships
      switched off until you wire your model-registry prices.</>],
  ['What does implementation include?',
    `Deployment to your environment, the first surface in production, the policy set
     tuned against your traffic rather than a synthetic set, and the handover material
     your operations team needs. On a pilot it is included in the fee.`],
]

export default function Pricing() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="h-display" style={{ maxWidth: '17ch' }}>
            Flat, self-hosted, <em>published</em>.
          </h1>
          <p className="lede">
            Priced per governed asset and governed user — not per token you run on your
            own hardware, and not behind a six-figure floor you have to sit through
            three calls to discover. List prices in USD at market index 1.0; see the
            regional table below.
          </p>
        </div>
      </section>

      {/* ───── editions ───── */}
      <Band sunken flush>
        <Table head={<>
          <th>Edition</th><th className="num">Per year</th>
          <th className="num">Governed assets</th><th className="num">Governed users</th>
          <th>Includes</th>
        </>}>
          {EDITIONS.map(([name, price, assets, users, includes]) => (
            <tr key={name}>
              <td><b>{name}</b></td>
              <td className="num"><b>{price}</b></td>
              <td className="num">{assets}</td>
              <td className="num">{users}</td>
              <td>{includes}</td>
            </tr>
          ))}
        </Table>

        <div className="grid cols-3" style={{ marginTop: 28 }}>
          <div className="card">
            <h3 className="h-sub">Extra user blocks</h3>
            <p>
              <b>+$10,000</b> per 500 users on Advanced.<br />
              <b>+$20,000</b> per 2,500 users on Enterprise.
            </p>
          </div>
          <div className="card">
            <h3 className="h-sub">Implementation</h3>
            <p>
              <b>$5,700</b> Core · <b>$10,400</b> Advanced · <b>$18,900</b> Enterprise,
              one-time. Never free — a deployment nobody is accountable for is a
              deployment that stalls.
            </p>
          </div>
          <div className="card">
            <h3 className="h-sub">What isn’t metered</h3>
            <p>
              Tokens, requests, GPU hours and detection volume. You run the inference on
              your own hardware; charging you per prompt for that would be charging you
              twice.
            </p>
          </div>
        </div>
      </Band>

      {/* ───── per user ───── */}
      <Band>
        <SectionHead
          eyebrow="The comparison that matters"
          title="Per governed user, against what you’re also evaluating."
        >
          A list price means little until it is divided by the number of people it
          covers. Competitor figures are from our verified competitive landscape review;
          where a vendor publishes a seat minimum, the resulting floor is shown.
        </SectionHead>
        <Table head={<>
          <th>Product</th><th className="num">Per user / yr</th>
          <th className="num">Effective floor</th><th>Note</th>
        </>}>
          {PER_USER.map(([brand, suffix, per, floor, note]) => (
            <tr className="row-self" key={suffix}>
              <td><b>{brand}</b>{suffix}</td>
              <td className="num"><b>{per}</b></td>
              <td className="num">{floor}</td>
              <td>{note}</td>
            </tr>
          ))}
          {COMPETITORS.map(([name, per, floor, note], i) => (
            <tr className={i === 0 ? 'row-rule' : undefined} key={floor + per}>
              <td>{name}</td>
              <td className="num">{per}</td>
              <td className="num">{floor}</td>
              <td>{note}</td>
            </tr>
          ))}
        </Table>
        <p className="small dim" style={{ marginTop: 16 }}>
          We are not the cheapest line item in every comparison and we don’t try to be.
          We are the one where the prompt never leaves, and the only one on this table
          that publishes a benchmark you can re-run.{' '}
          <Link className="link" to="/compare">The full comparison →</Link>
        </p>
      </Band>

      {/* ───── the pilot ───── */}
      <Band sunken>
        <SectionHead eyebrow="Start here" title="The paid design-partner pilot." />
        <div className="grid cols-2 gap-wide" style={{ alignItems: 'start' }}>
          <div>
            <KV>
              <Row k="Fee"><b>$15,000–$40,000</b>, depending on scope</Row>
              <Row k="Length">8–12 weeks, with a clear conversion path</Row>
              <Row k="Cohort">3–5 slots. We reply within two business days.</Row>
              <Row k="Conversion">
                20&nbsp;% off year one, 50&nbsp;% of the pilot fee credited, and
                10&nbsp;% off permanently from year two
              </Row>
              <Row k="Findings & IP">Yours. We retain no rights to your data.</Row>
            </KV>
            <div className="btn-row" style={{ marginTop: 28 }}>
              <Link className="btn btn-primary" to="/pilot">
                Book a design-partner pilot →
              </Link>
            </div>
          </div>
          <div>
            <h3 className="h-sub">Why it isn’t free</h3>
            <p className="muted">
              A free pilot produces a customer who is not accountable for finishing it.
              Nobody schedules the integration call, nobody chases the firewall change,
              and the evaluation dies politely in week five. A paid pilot has an owner on
              your side, which is the single best predictor of whether it reaches a
              verdict.
            </p>
            <p className="muted">
              A six-to-twelve-month pilot is a red flag rather than a win, for the same
              reason. Eight to twelve weeks is long enough to produce evidence and short
              enough that someone has to decide.
            </p>
          </div>
        </div>
      </Band>

      {/* ───── regional ───── */}
      <Band>
        <SectionHead eyebrow="Regional pricing" title="One list, indexed by market.">
          The prices above are at index 1.0. We publish the multiplier rather than
          quoting a different number to each buyer.
        </SectionHead>
        <Table narrow style={{ maxWidth: 760 }} head={<>
          <th>Market</th><th className="num">Index</th><th className="num">Core equivalent</th>
        </>}>
          {REGIONS.map(([market, index, core]) => (
            <tr key={market}>
              <td>{market}</td>
              <td className="num">{index}</td>
              <td className="num">{core}</td>
            </tr>
          ))}
        </Table>
      </Band>

      {/* ───── definitions ───── */}
      <Band sunken narrow>
        <Eyebrow>Definitions</Eyebrow>
        <h2 className="h-section">What you are actually counting.</h2>
        {DEFINITIONS.map(([q, a], i) => (
          <details className="acc" key={q} open={i === 0}>
            <summary>{q}</summary>
            <div className="acc-body">{a}</div>
          </details>
        ))}
      </Band>

      <Cta />
    </>
  )
}

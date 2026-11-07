import { Link } from 'react-router-dom'

/* /frameworks — the page that backs up the promise /connect makes, that a
   health check reads your estate "mapped against APRA CPS 234, CPS 230, the
   Privacy Act and the ISM". Feedback 2.10 and brief item 10.

   NOT GENERATED. Every row below is transcribed from Bijal's
   GovernVeil_Framework_Mapping.docx of 3 November 2026 — the capability
   wording, the "what it asks for" column, the C-refs and the Strong/Partial
   call are hers, not mine. Nothing here is inferred: a framework the
   document does not list does not appear, and a fit it does not state is
   not guessed.

   The document closes with three rules for going live, and they are load
   bearing:
     1. label the page directional and illustrative only, not advice;
     2. link each row to evidence a buyer can actually pull;
     3. never "compliant" or "certified" — only "supports" or "aligned to".
   The disclaimer below is rule 1, the Evidence column is rule 2, and rule 3
   is why the heading says "supports" and the column is headed SUPPORTED BY.

   This page is public on purpose: buyers search for "CPS 234 AI", and this
   is where we want them to land. It is NOT card-only, unlike /demo and
   /connect, so it carries no noindex.

   The page key stamped on the root is "security" (see ShellAU.PAGE_KEY), so
   it inherits .v3.p-security's table and type scale out of gv-v3.css rather
   than introducing a tenth scope. */

const CAPABILITIES = [
  ['C1', 'Masking before data leaves',
    'Sensitive values are masked (reversibly, opt-in) or blocked before a prompt reaches a model; five verdicts: allow, flag, mask, acknowledge, block.'],
  ['C2', 'Human acknowledgement',
    'The person sees what was found, minimises it and records why, before anything is sent.'],
  ['C3', 'Signed evidence ledger',
    'Every decision and every policy change is hash-chained and signed, and verifiable without GovernVeil.'],
  ['C4', 'No-egress attestation',
    'Self-hosted, local inference; a signed statement of the egress allow-list and of zero non-allow-listed connections. Runs in your Australian region or air-gapped.'],
  ['C5', 'AI asset register',
    'Applications, models, agents and MCP servers registered, each with a named owner.'],
  ['C6', 'Agent, MCP and API control',
    'Role, scope and operation checked for API calls; agent tool calls judged before they run; poisoned tools removed from the list.'],
  ['C7', 'Control probes and drift',
    'Sixteen controls probed daily and reported as holding, weak, breached or untested.'],
  ['C8', 'Policy-to-control mapping',
    'Your AI policy mapped to enforceable controls, with a gap assessment and a board-readable report.'],
  ['C9', 'Access and resilience',
    'Role-based access, OIDC sign-in, kill switch, fails closed, encrypted at rest.'],
]

/* Rule 2: each row points at the page where that evidence can be pulled.
   /security carries the attestation and the ledger verifier, /benchmark the
   probe report — so the link is chosen by which capability carries the row. */
const EVIDENCE = {
  attestation: ['/security', 'Attestation'],
  ledger: ['/security', 'Ledger'],
  probes: ['/benchmark', 'Probes'],
}

const GROUPS = [
  ['Australia · financial services', [
    ['APRA CPS 234 Information Security',
      'Information security controls proportionate to threats, tested for effectiveness, with evidence.',
      'C1, C4, C7, C3', 'Strong', 'probes'],
    ['APRA CPS 230 Operational Risk Management',
      'Manage operational risk, including risk from service providers, and monitor controls.',
      'C5, C7, C3, C4', 'Partial', 'probes'],
  ]],
  ['Australia · government and critical infrastructure', [
    ['ASD Information Security Manual (ISM)',
      'Controls on gateways and data transfers, event logging and access.',
      'C1, C4, C3, C9', 'Strong', 'attestation'],
    ['Essential Eight',
      'Baseline technical mitigations; most are endpoint controls.',
      'C9, C4', 'Partial', 'attestation'],
    ['Protective Security Policy Framework (PSPF)',
      'Protect official information and keep security governance accountable.',
      'C1, C4, C3', 'Partial', 'ledger'],
    ['SOCI Act (risk management program)',
      'Identify and manage material risks to critical infrastructure assets.',
      'C5, C7, C3', 'Partial', 'probes'],
    ['Policy for the responsible use of AI in government (DTA)',
      'Accountable officials for AI, and transparency about how AI is used.',
      'C5, C3', 'Partial', 'ledger'],
  ]],
  ['Australia · all sectors', [
    ['Privacy Act 1988 and the APPs',
      'APP 6 use and disclosure, APP 8 cross-border disclosure, APP 11 security of personal information.',
      'C1, C4, C3', 'Strong', 'attestation'],
    ['National AI Centre: Guidance for AI Adoption',
      'Accountability, understanding impacts, managing risk, sharing information, testing and monitoring, human control.',
      'C5, C8, C1, C3, C7, C2', 'Strong', 'ledger'],
  ]],
  ['International', [
    ['ISO/IEC 42001 AI management system',
      'AI risk treatment, operational controls, monitoring and records.',
      'C8, C7, C3, C5', 'Strong', 'probes'],
    ['NIST AI Risk Management Framework',
      'Govern, map, measure and manage AI risk.',
      'C5, C8, C7, C1', 'Strong', 'probes'],
    ['EU AI Act',
      'For high-risk systems: record-keeping and logging (Art. 12) and human oversight (Art. 14).',
      'C3, C2', 'Partial', 'ledger'],
    ['GDPR',
      'Data minimisation (Art. 5), data protection by design (Art. 25), records (Art. 30), security (Art. 32), international transfers (Chapter V).',
      'C1, C4, C3', 'Strong', 'attestation'],
  ]],
]

/* Essential Eight's C-refs carry a qualifier in the source document that the
   other rows do not; it is kept here rather than flattened into the cell. */
const FOOTNOTES = {
  'Essential Eight': 'C9 restrict admin privileges · C4 approved AI destinations only',
}

export default function FrameworksAU() {
  return (
    <main id="main" className="fw">
      <section className="wrap" style={{ paddingTop: 88, paddingBottom: 48 }}>
        <p className="eb">Frameworks</p>
        <h1 className="h1x" style={{ marginTop: 18 }}>
          Which obligations GovernVeil supports, and how<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ margin: '28px 0 0', maxWidth: 820 }}>
          GovernVeil provides controls and evidence that support these obligations. It
          does not on its own make an organisation compliant, and we don't yet hold
          certifications. <b>Strong</b> means GovernVeil produces direct evidence for the
          core requirement; <b>partial</b> means it supports part of it.
        </p>
        <p className="note" role="note">
          Directional and illustrative only. Not legal or compliance advice; your
          health check maps it to your own obligations.
        </p>
      </section>

      {GROUPS.map(([heading, rows]) => (
        <section className="wrap" key={heading} style={{ paddingBottom: 40 }}>
          <h2 className="h2x" style={{ fontSize: 26, marginBottom: 16 }}>{heading}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">Framework</th>
                  <th scope="col">What it asks for</th>
                  <th scope="col">Supported by</th>
                  <th scope="col">Fit</th>
                  <th scope="col">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, asks, refs, fit, evidence]) => {
                  const [to, label] = EVIDENCE[evidence]
                  return (
                    <tr key={name}>
                      <th scope="row" style={{ textAlign: 'left', fontWeight: 600 }}>
                        {name}
                        {FOOTNOTES[name] && (
                          <span className="mono fw-note">{FOOTNOTES[name]}</span>
                        )}
                      </th>
                      <td>{asks}</td>
                      <td className="mono">{refs}</td>
                      <td>
                        <span className={fit === 'Strong' ? 'fw-fit on' : 'fw-fit'}>{fit}</span>
                      </td>
                      <td><Link to={to}>{label} →</Link></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="wrap" style={{ paddingBottom: 56 }}>
        <h2 className="h2x" style={{ fontSize: 26, marginBottom: 16 }}>
          The capabilities the mapping refers to
        </h2>
        <div className="g3" style={{ gap: 16 }}>
          {CAPABILITIES.map(([ref, name, what]) => (
            <div className="card" key={ref} style={{ padding: 20 }}>
              <span className="rl" style={{ color: 'var(--acc)' }}>{ref}</span>
              <b style={{ display: 'block', fontSize: 17, marginTop: 6 }}>{name}</b>
              <span style={{ display: 'block', fontSize: 14, lineHeight: 1.55, color: '#4A534E', marginTop: 8 }}>
                {what}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="dk">
        <div className="wrap sec" style={{ textAlign: 'center' }}>
          <h2 className="h2x" style={{ color: '#F4F5F2' }}>
            Get this read for your organisation<span style={{ color: 'var(--acc)' }}>.</span>
          </h2>
          <p className="body" style={{ color: '#C2CBC5', maxWidth: 660, margin: '18px auto 28px' }}>
            A health check maps your own estate against the obligations above, and
            tells you which evidence you could produce today.
          </p>
          <Link className="btnp" to="/connect">Book a free health check</Link>
        </div>
      </section>
    </main>
  )
}

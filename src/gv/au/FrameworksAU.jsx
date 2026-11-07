import { Link } from 'react-router-dom'

/* /frameworks — the page that backs up the promise /connect makes, that a
   health check reads your estate "mapped against APRA CPS 234, CPS 230, the
   Privacy Act and the ISM". Feedback 2.10 and brief item 10.

   NOT GENERATED. The frameworks, the "what it asks for" column and the C-refs
   are transcribed from Bijal's GovernVeil_Framework_Mapping.docx of
   3 November 2026.

   WHY THERE IS NO FIT COLUMN. The source document grades each row Strong or
   Partial, and the first cut of this page printed those grades. Six of the
   thirteen read "Partial", four of them in the government group, and the
   first question anyone asked was "partial how?" — which a badge cannot
   answer. A grade says how much without saying which part, and on a page
   whose whole job is to be believed, that is the wrong half of the sentence.

   So each row now states the part GovernVeil carries, and where the
   obligation runs wider than AI, the part it does not. Those sentences are
   derived from that row's own C-refs and from the capability definitions
   below — they add no claim the document does not already make. The
   Strong/Partial calls still live in the source document, so the two can
   always be reconciled.

   The document's three rules for going live are built in, not left to a
   reviewer:
     1. label the page directional and illustrative only, not advice;
     2. link each row to evidence a buyer can actually pull;
     3. never "compliant" or "certified" — only "supports" or "aligned to".

   Rule 3 is also why the covers column never says "meets" or "satisfies". It
   says what the product does, and lets the reader judge the obligation.

   This page is public on purpose: buyers search for "CPS 234 AI", and this
   is where we want them to land. It is NOT card-only, unlike /demo and
   /connect, so it carries no noindex.

   The page key stamped on the root is "security" (see ShellAU.PAGE_KEY), so
   it inherits .v3.p-security's type scale rather than introducing a tenth. */

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

/* Rule 2: each row points at the page where that evidence can be pulled. */
const EVIDENCE = {
  attestation: ['/security', 'Attestation'],
  ledger: ['/security', 'Ledger'],
  probes: ['/benchmark', 'Probes'],
}

/* [framework, what it asks for, what GovernVeil covers, C-refs, evidence]
   The third entry is the one to be careful with: it restates the C-refs
   against that obligation and nothing more. Where the obligation is an
   organisation-wide programme, the sentence says plainly what stays with the
   customer — that boundary is the claim's credibility, not a weakness. */
const GROUPS = [
  ['Australia · financial services', [
    ['APRA CPS 234 Information Security',
      'Information security controls proportionate to threats, tested for effectiveness, with evidence.',
      'The AI path end to end: sensitive values masked or blocked before they leave, the controls probed daily, and every decision signed into a ledger your auditors verify without us.',
      'C1, C4, C7, C3', 'probes'],
    ['APRA CPS 230 Operational Risk Management',
      'Manage operational risk, including risk from service providers, and monitor controls.',
      'AI as a registered operational risk: every application, model and agent carries a named owner, its controls are probed daily, and the ledger is the record. The wider operational-risk programme stays yours.',
      'C5, C7, C3, C4', 'probes'],
  ]],
  ['Australia · government and critical infrastructure', [
    ['ASD Information Security Manual (ISM)',
      'Controls on gateways and data transfers, event logging and access.',
      'The AI gateway itself: data transfers masked or blocked before they leave the perimeter, every decision logged, and access role-based, fail-closed and encrypted at rest.',
      'C1, C4, C3, C9', 'attestation'],
    ['Essential Eight',
      'Baseline technical mitigations; most are endpoint controls.',
      'Two of the eight, on the AI path: admin privileges restricted, and egress limited to approved AI destinations. The endpoint mitigations — patching, macros, application control — are not ours.',
      'C9, C4', 'attestation'],
    ['Protective Security Policy Framework (PSPF)',
      'Protect official information and keep security governance accountable.',
      'Official information inside AI traffic: masked before it leaves, kept in your own environment, and every decision on an auditable record. Physical and personnel security sit outside it.',
      'C1, C4, C3', 'ledger'],
    ['SOCI Act (risk management program)',
      'Identify and manage material risks to critical infrastructure assets.',
      'The AI assets in that programme: registered with named owners, probed daily for drift, and evidenced for the annual report. Your other critical assets are unaffected.',
      'C5, C7, C3', 'probes'],
    ['Policy for the responsible use of AI in government (DTA)',
      'Accountable officials for AI, and transparency about how AI is used.',
      'The accountability record: every AI application, model and agent registered to a named official, and a signed ledger showing how AI was actually used, not how it was meant to be.',
      'C5, C3', 'ledger'],
  ]],
  ['Australia · all sectors', [
    ['Privacy Act 1988 and the APPs',
      'APP 6 use and disclosure, APP 8 cross-border disclosure, APP 11 security of personal information.',
      'Personal information in prompts and responses: masked before disclosure to a model, never crossing a border for a verdict, and each decision evidenced.',
      'C1, C4, C3', 'attestation'],
    ['National AI Centre: Guidance for AI Adoption',
      'Accountability, understanding impacts, managing risk, sharing information, testing and monitoring, human control.',
      'All six practices, applied to AI traffic: a register with named owners, your policy mapped to enforceable controls, a person acknowledging sensitive values before they move, daily probes, and a signed record.',
      'C5, C8, C1, C3, C7, C2', 'ledger'],
  ]],
  ['International', [
    ['ISO/IEC 42001 AI management system',
      'AI risk treatment, operational controls, monitoring and records.',
      'The operational core of the management system: policy mapped to enforceable controls with a gap assessment, probed daily, and recorded. The certification audit itself is separate, and we do not hold it.',
      'C8, C7, C3, C5', 'probes'],
    ['NIST AI Risk Management Framework',
      'Govern, map, measure and manage AI risk.',
      'All four functions on AI traffic: govern through policy-to-control mapping, map through the asset register, measure through daily probes, and manage by enforcing before data leaves.',
      'C5, C8, C7, C1', 'probes'],
    ['EU AI Act',
      'For high-risk systems: record-keeping and logging (Art. 12) and human oversight (Art. 14).',
      'Article 12 and Article 14, and those two only: automatic hash-chained records of every decision, and a person acknowledging sensitive values before anything is sent. Conformity assessment and the rest of the Act are not ours.',
      'C3, C2', 'ledger'],
    ['GDPR',
      'Data minimisation (Art. 5), data protection by design (Art. 25), records (Art. 30), security (Art. 32), international transfers (Chapter V).',
      'Minimisation and protection by design on the AI path, a record of every processing decision, and no transfer out of your perimeter to reach a verdict.',
      'C1, C4, C3', 'attestation'],
  ]],
]

export default function FrameworksAU() {
  return (
    <main id="main" className="fw">
      <section className="wrap" style={{ paddingTop: 88, paddingBottom: 48 }}>
        <p className="eb">Frameworks</p>
        <h1 className="h1x" style={{ marginTop: 18 }}>
          Which obligations GovernVeil supports, and how<span style={{ color: 'var(--acc)' }}>.</span>
        </h1>
        <p className="lead" style={{ margin: '28px 0 0', maxWidth: 840 }}>
          GovernVeil provides controls and evidence that support these obligations. It
          does not on its own make an organisation compliant, and we don't yet hold
          certifications. Each row names the part GovernVeil carries — and where an
          obligation runs wider than AI, the part that stays with you.
        </p>
        <p className="body" style={{ margin: '18px 0 0', maxWidth: 840, fontSize: 17 }}>
          GovernVeil governs one surface: the path a prompt, document, agent call or API
          call takes out of your organisation. Several obligations below are
          organisation-wide programmes. We carry the AI portion of them, and say so.
        </p>
        <p className="note" role="note">
          Directional and illustrative only. Not legal or compliance advice; your
          health check maps it to your own obligations.
        </p>
      </section>

      {GROUPS.map(([heading, rows]) => (
        <section className="wrap" key={heading} style={{ paddingBottom: 44 }}>
          <h2 className="h2x" style={{ fontSize: 26, marginBottom: 16 }}>{heading}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col">Framework</th>
                  <th scope="col">What it asks for</th>
                  <th scope="col">What GovernVeil covers</th>
                  <th scope="col">Evidence</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([name, asks, covers, refs, evidence]) => {
                  const [to, label] = EVIDENCE[evidence]
                  return (
                    <tr key={name}>
                      <th scope="row">
                        {name}
                        <span className="mono fw-refs">{refs}</span>
                      </th>
                      <td data-label="What it asks for" className="fw-asks">{asks}</td>
                      <td data-label="What GovernVeil covers">{covers}</td>
                      <td data-label="Evidence"><Link to={to}>{label} →</Link></td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <section className="wrap" style={{ paddingBottom: 56 }}>
        <h2 className="h2x" style={{ fontSize: 26, marginBottom: 6 }}>
          The capabilities each row refers to
        </h2>
        <p className="body" style={{ margin: '0 0 20px', maxWidth: 760, fontSize: 16 }}>
          The C-refs under each framework name point here.
        </p>
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

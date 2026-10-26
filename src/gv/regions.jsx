/* Everything that differs between governveil.com and governveil.com.au.
   Shared copy stays in the page components — only put something here when the
   two markets genuinely say different things, so a fix to the common 95% still
   lands on both sites at once.

   AU content is from the mock-up Bijal produced 2026-10-26.

   NOTE: the ABN below is as supplied and has not been verified against the
   ABR. Confirm GovernVeil Pty Ltd is registered before governveil.com.au
   serves this publicly — it is a legal identifier, not marketing copy. */

export const REGION_CONTENT = {
  com: {
    nav: [
      ['/product', 'Product'],
      ['/features', 'Features'],
      ['/benchmark', 'Benchmark'],
      ['/about', 'About'],
    ],
    ctaLabel: 'Book a pilot',

    entity: {
      copyright: '© 2026 GovernVeil · from Syntegreti, Hyderabad',
      tagline: 'Self-hosted. Your data never leaves your perimeter.',
      email: 'contact@syntegreti.com',
      parent: ['Syntegreti ↗', 'https://syntegreti.com/'],
    },

    pilot: {
      free: false,
      length: '8–12 weeks',
      lengthPhrase: 'A paid 8–12-week design-partner pilot.',
      fee: '$15,000–$40,000',
      cohort: '3–5 design-partner slots per cohort.',
      // the closing band, shared by eight pages
      ctaBlurb: `A paid 8–12-week design-partner pilot. Week one: a real prompt
        caught before it leaves — your data, your environment — and a signed
        attestation that nothing else left.`,
      primaryCta: ['Book a design-partner pilot →', '/pilot'],
      secondaryCta: ['See the architecture', '/product'],
    },
  },

  au: {
    nav: [
      ['/product', 'Product'],
      ['/features', 'Features'],
      ['/benchmark', 'Benchmark'],
      ['/security', 'Security'],
      ['/about', 'About'],
      ['/pilot', 'Design partners'],
    ],
    ctaLabel: 'Book a call',

    entity: {
      copyright: '© 2026 GovernVeil Pty Ltd · ABN 94 703 419 194',
      tagline: 'Australian-owned. Self-hosted. Your data never leaves your perimeter.',
      email: 'contact@governveil.com.au',
      parent: null,
    },

    pilot: {
      free: true,
      length: '4–6 weeks',
      lengthPhrase: 'A free 4–6-week design-partner pilot.',
      fee: null,
      cohort: '3–5 places per cohort.',
      ctaBlurb: `Join our free 4–6-week design-partner pilot. See a real prompt
        caught before it leaves, in your environment with your data, and a
        signed attestation that nothing else did. 3–5 places per cohort.`,
      primaryCta: ['Book a call to see the architecture', '/pilot'],
      secondaryCta: ['Become a design partner', '/pilot'],
    },
  },
}

/* The compliance framing inverts by market: Australian standards lead on .au
   and the rest of the world is the footnote; the reverse on .com. */
export const COMPLIANCE = {
  com: {
    eyebrow: 'Assurance posture',
    title: 'Assessed against a board’s questions, not a logo wall.',
    blurb: `We ran the product and the company against sixteen board
      cyber-governance domains drawn from Australian standards — PSPF, the ISM,
      APRA CPS 230 and CPS 234, SOCI and the AICD director guidance. The product
      meets most of them. The company-side gaps are below, named rather than
      omitted.`,
    badges: null,
    footnote: null,
  },
  au: {
    eyebrow: 'Built against your board’s questions',
    title: <>Assessed against <em>Australian</em> standards.</>,
    blurb: `We assessed GovernVeil against sixteen board cyber-governance
      domains drawn from Australian standards. The evidence your auditor needs
      comes straight from the ledger: control state, gap assessments and drift
      reports.`,
    badges: [
      'APRA CPS 234', 'APRA CPS 230', 'PSPF', 'ISM',
      'SOCI', 'AICD guidance', 'Privacy Act',
    ],
    footnote: `For organisations operating overseas, the same controls map to
      GDPR and UK GDPR, the EU AI Act, India’s DPDP Act and GCC data protection
      rules.`,
  },
}

/* The AU assurance roadmap replaces the .com "What we haven't done" list.
   Both say the same things; this one sorts them by state instead of by who is
   at fault. Keep the wording literally true — "in progress" means work has
   started, not that it is planned. */
export const ASSURANCE_ROADMAP = [
  ['In place today', [
    'Signed no-egress attestation',
    'Tamper-evident ledger with an independent verifier',
    'Fail-closed data path',
    'Encryption in transit and at rest, with online key rotation',
    'Single sign-on and role-based access',
    'Security tests gated on every build of the data path',
    'Australian company, with IP owned in Australia',
  ]],
  ['In progress', [
    'Dependency and vulnerability scanning enforced on every commit',
    'Incident notifications by email and webhook',
  ]],
  ['Next on the roadmap', [
    'Independent penetration test',
    'Named security lead and on-call rota',
    'SOC 2 Type II',
    'IRAP assessment for government customers',
    'Multi-organisation support for groups and shared services',
    'Source code escrow in Australia, on request',
  ]],
]

/* The assurance loop — the one piece of the AU mock-up with no .com equivalent.
   Verdict wording here must stay the product's: allow / flag / mask /
   acknowledge / block. The mock-up said "allow, redact, review or block",
   which is the pre-8b94fd8 set and names two verdicts that do not exist. */
export const ASSURANCE_LOOP = [
  ['01', 'Policy', 'Your policies, ingested as signed versions'],
  ['02', 'Controls', 'Each clause mapped to a control, with sign-off'],
  ['03', 'Context', 'Who, which tool, what data and why'],
  ['04', 'Detect', 'Allow, flag, mask, acknowledge or block, inside your network'],
  ['05', 'Assure', 'Test which controls are working, and which are not'],
  ['06', 'Review', 'Drift and gap reports to the control owner'],
]

export const LOOP_AUDIENCES = [
  ['For the CISO', 'Proof that sensitive data didn’t leave, request by request.'],
  ['For the CRO and compliance',
    'Control effectiveness you can evidence, mapped to your own policy clauses.'],
  ['For the CIO',
    'Say yes to new AI tools without reopening the risk conversation each time.'],
]

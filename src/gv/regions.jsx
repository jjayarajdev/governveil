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

    product: { deployRegion: null, identifiers: null },

    home: {
      // the hero panel's worked example: a US SSN and an India PAN, both on the
      // committed fast-path pattern set
      panel: {
        before: '"Draft a letter to the customer, SSN ',
        first: '123-45-6789',
        between: ', PAN ',
        second: 'ABCDE1234F',
        types: ['ssn', 'pan'],
      },
      strip: [
        ['Your VPC or on-prem', 'No vendor cloud in the path'],
        ['All inference local', 'Prompts scored in your network'],
        ['Signed no-egress attestation', 'Zero is the proof, not a promise'],
        ['Works air-gapped', 'No outbound call to decide'],
        ['One base-URL change', 'Drop-in for /v1 endpoints'],
      ],
      // the right half of the closing two-column band
      pairRight: {
        eyebrow: 'Pricing',
        title: 'Flat, self-hosted, predictable.',
        body: `Priced per governed asset and governed user — not per token you run
          on your own hardware, and not behind a six-figure floor. Three editions
          from $38,000 a year, published in full, with the per-user comparison
          against the vendors you’re also evaluating.`,
        link: null,
      },
    },

    about: {
      lede: `GovernVeil is the AI-governance platform from Syntegreti, the AI
        consulting and platform company in Hyderabad, India. We build AI
        data-egress control and evidence for regulated enterprises — BFSI,
        healthcare and life sciences, global capability centres, and any
        organisation whose data cannot leave its perimeter for a verdict.`,
      companyEyebrow: 'The company behind it',
      companyTitle: 'One spine that governs how an enterprise adopts AI.',
      companyParas: [
        `Syntegreti ships flagship platforms for contracts and business operations,
         and underneath them one spine that governs how an enterprise adopts AI.
         GovernVeil is the govern layer of that spine.`,
        `Delivery follows the same discipline as the rest of the portfolio: a
         working result in your environment in weeks, not quarters. That is also
         why the pilot is eight to twelve weeks rather than two quarters.`,
      ],
      workedPolicy: 'Does this prompt contain a customer’s account number?',
      asideEyebrow: 'The Syntegreti AI spine',
      aside: [
        ['operate', 'Round-the-clock operations on what ships'],
        ['build', 'Platforms and AI-assisted delivery on the governed spine'],
        ['govern', 'GovernVeil — policy, masking and evidence on every AI action'],
      ],
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

    product: {
      deployRegion: 'ap-southeast-2 (Sydney) for Australian deployments.',
      /* The honest AU answer on identifiers. The fast path ships US and India
         formats only — there is no au_pii.go. Australian formats are covered
         the way anything organisation-specific is covered: you write the policy
         as a plain-language question and the local model answers it in the same
         forward pass. That mechanism is documented (website.md: "you tune
         detection by editing the question") and Features already ships a worked
         example in this exact shape. Do NOT turn this into a claim that the
         pattern path recognises a TFN. */
      identifiers: {
        eyebrow: 'Australian identifiers',
        title: <>Covered by the question you write, not by a <em>release</em> you wait for.</>,
        lede: `The sub-millisecond pattern path ships US and India formats today —
          SSN, card, PAN, GSTIN, IFSC, Aadhaar. Australian formats are not in that
          set. You cover them the same way you cover anything specific to your own
          organisation: write the policy as a plain-language question, and the
          local model answers it in the same forward pass as every other policy.`,
        policies: [
          ['au_tfn', 'Does this prompt contain an Australian Tax File Number?'],
          ['au_medicare', 'Does this prompt contain a Medicare number?'],
          ['au_abn', 'Does this prompt contain a customer’s ABN or ACN?'],
          ['au_super', 'Does this prompt contain a member’s superannuation account number?'],
        ],
        note: `Editing the question is the whole change — no per-client training, and
          no data leaving your perimeter to fine-tune anything. The trade is speed:
          the pattern path answers in under a millisecond, the question path in the
          model pass. A deterministic pattern set for Australian formats is not in
          the product today, and this page will say so until it is.`,
      },
    },

    home: {
      /* The AU worked example uses `email` and `bank_account`, which are the
         only two fast-path detectors that are jurisdiction-neutral. There is
         NO Australian pattern set in the gateway — no TFN, no ABN, no BSB, no
         Australian Medicare (internal/dlp/patterns holds us_pii, india_pii and
         email only). Do not put a TFN in this panel until a detector exists.
         The account number is nine digits because the committed regex is
         (?:account|acct)[:\s#]*(\d{9,12}) — a six-digit BSB would not match,
         which is why no BSB appears here. */
      panel: {
        before: '"Draft a letter to the customer, email ',
        first: 'j.nguyen@example.com.au',
        between: ', account ',
        second: '041562893',
        types: ['email', 'bank_account'],
      },
      strip: [
        ['Your VPC or on-prem', 'Sydney, Melbourne, or your own data centre'],
        ['All inference local', 'Prompts scored in your network'],
        ['Signed no-egress attestation', 'Zero is the proof, not a promise'],
        ['Works air-gapped', 'No outbound call to decide'],
        ['One base-URL change', 'Drop-in for /v1 endpoints'],
      ],
      pairRight: {
        eyebrow: 'Design partners',
        title: 'A free pilot, in your environment.',
        body: `A free 4–6-week design-partner pilot, 3–5 places per cohort. Week
          one: point one application at the gateway and watch it catch a real
          prompt before it leaves — your environment, your data — then pull the
          signed attestation and check that nothing else left either.`,
        link: ['Become a design partner →', '/pilot'],
      },
    },

    about: {
      lede: `GovernVeil is built and owned in Australia. We build AI data-egress
        control and evidence for regulated Australian organisations — banks and
        insurers under APRA, government under the PSPF, health, superannuation —
        and for any organisation whose data cannot leave its perimeter for a
        verdict.`,
      companyEyebrow: 'The company behind it',
      companyTitle: 'Australian-owned, and built to stay that way.',
      companyParas: [
        `GovernVeil Pty Ltd is an Australian company and the intellectual
         property is held in Australia. There is no vendor cloud in the verdict
         path, so the enforcement path runs in your own Australian region and
         your exposure to us as a company is bounded by your own environment.`,
        `We work the way the pilot does: a working result in your environment in
         weeks, not quarters. That is why the design-partner pilot is four to six
         weeks rather than two quarters.`,
      ],
      workedPolicy: 'Does this prompt contain an Australian Tax File Number?',
      asideEyebrow: 'The Australian entity',
      aside: [
        ['company', 'GovernVeil Pty Ltd'],
        ['abn', '94 703 419 194'],
        ['ip', 'Held in Australia'],
        ['hosting', 'Your own Australian region — we operate no cloud in the verdict path'],
      ],
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
      meets most of them.`,
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

import { Link } from 'react-router-dom'
import { Tag } from '../bits'
import { Bars, Capture } from '../capture'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

/* Runtime security — the first page built on the reference shape rather than
   the interview shape.

   The structure is deliberate and it is the whole point of the page:

     1  hero      a verb-led outcome, one sentence of nouns, one CTA
     2  capability  three blocks, heading + two sentences + ONE number
     3  scope     what is supported today, stated plainly as scope
     4  faq       seven questions, short answers
     5  cta       the same single call to action

   What it does NOT do, on purpose: no explorer, no filterable dataset, no
   corpus, no confusion matrix, no methodology. Each capability carries one
   figure and a link to where that figure is derived. The reader is told what
   the product does; they are not handed the evidence and asked to conclude.

   Every number here is already published elsewhere on this site and traces to
   a committed run. The model-path latency is the measured A10G median (202 ms,
   journey.json) — not the ~135-170 ms the older pages quote, which does not
   match that run. */

const CAPABILITIES = [
  {
    h: 'Catch sensitive data before the prompt leaves',
    p: `Identifiers, credentials and injection phrasing are caught on a
      sub-millisecond pattern path. Anything the patterns cannot settle goes to
      one local model that answers every policy as a plain-language question in
      a single pass.`,
    fig: '93.25 %', figNote: 'recall on the published corpus, at 100 % precision',
    to: ['See the benchmark', '/benchmark'],
    shot: {
      src: 'policies', where: 'govern / policies',
      crop: { scale: 1.95, x: -19, y: -31, h: 300 },
      alt: 'The GovernVeil policies page, each policy written as a plain-language question with its action and scope.',
      cap: <><b>Each policy is a question.</b> You tune detection by editing the
        question, not by retraining anything.</>,
    },
  },
  {
    h: 'Judge every agent tool call, three times',
    p: `A tool is judged when the agent discovers it, again when the arguments
      are filled in, and again when the server answers back. A poisoned tool
      description never reaches the agent's list.`,
    fig: '14 of 14', figNote: 'across seven categories, including poisoned tools and exfiltration',
    to: ['Watch an agent call a tool', '/interview/mcp'],
    /* No console capture exists for the MCP path, so this block shows the
       scorecard itself rather than borrowing an unrelated screenshot. */
    bars: [
      ['benign', '4 / 4', 100], ['personal data in the arguments', '3 / 3', 100],
      ['a credential in the arguments', '1 / 1', 100],
      ['exfiltration through the arguments', '1 / 1', 100],
      ['injection in what the server returned', '2 / 2', 100],
      ['personal data in what the server returned', '1 / 1', 100],
      ['a poisoned tool description', '2 / 2', 100],
    ],
    barsNote: 'make mcp-scorecard · eval/mcp/corpus.json',
  },
  {
    h: 'Give the auditor something to act on',
    p: `Every decision is signed into a hash chain before the caller gets its
      reply, and a standalone verifier walks the chain from the command line.
      Control state is computed from that ledger rather than from a checklist.`,
    fig: '16 controls', figNote: 'each one holding, weak, breached or untested — computed, not asserted',
    to: ['How the ledger works', '/security'],
    shot: {
      src: 'ledger-changes', where: 'prove / evidence ledger / changes',
      crop: { scale: 1.95, x: -19, y: -33, h: 300 },
      alt: 'The GovernVeil changes ledger, each row naming who made a configuration change, what moved, and the hash-chain entry it was signed into.',
      cap: <><b>Who turned a control off, and when.</b> The actor, the before and
        after, and the chain entry it was signed into.</>,
    },
  },
]

/* Scope, stated once and plainly. This is where the boundaries live: as the
   shape of what ships, not as caveats scattered through the prose. */
const SCOPE = [
  ['Surfaces', <>Model APIs on <span className="mono">/v1</span>, enterprise
    applications on <span className="mono">/gw</span>, agent tool calls on{' '}
    <span className="mono">/mcp</span>, and a browser extension covering eight
    public assistants with no MDM dependency.</>],
  ['Verdicts', <>Five outcomes, not two: <Tag k="allow">allow</Tag>{' '}
    <Tag k="flag">flag</Tag> <Tag k="mask">mask</Tag>{' '}
    <Tag k="ack">acknowledge</Tag> <Tag k="block">block</Tag>. Where no person is
    at the keyboard, acknowledge degrades to mask.</>],
  ['Identifiers', <>US and India formats ship on the pattern path — SSN, card,
    PAN, GSTIN, IFSC, Aadhaar. Anything specific to your organisation is a policy
    you write as a question, answered in the same pass.</>],
  ['Deployment', <>Your VPC or on-prem, one image for the gateway and the model
    server. CUDA, Apple Metal or CPU, auto-selected. No outbound call is needed
    to reach a verdict, so it runs air-gapped.</>],
]

const FAQ = [
  ['Where does the prompt go for a verdict?',
    `Nowhere. Every verdict is computed by a model inside your own network, and the
     gateway publishes a signed attestation saying so — including a count of every
     outbound connection it made to a host outside your allow-list. Zero is the
     proof.`],
  ['What happens when something on the path breaks?',
    `It blocks, and says why. An unreachable policy engine, a model-server timeout
     or a document it cannot scan all end in a refusal with the reason on the
     record. There are defence-in-depth layers that fail open by design; none of
     them is on the data path.`],
  ['What does this cost in latency?',
    `Most requests never reach the model: the pattern path answers in under a
     millisecond and a revoked credential is refused in about half of one. For the
     requests that do escalate, the median is 202 ms on an A10G. The sizing model
     puts 15–30 % of real traffic on that path.`],
  ['We already own Microsoft Purview. Why this as well?',
    `Keep it — it is a reasonable first line, and since November 2025 it blocks
     GenAI prompts inline. It covers Edge, Intune and Entra; it has no API path, so
     your applications and agents are not in scope, and its choice is allow or
     block rather than mask. This sits additively alongside it.`],
  ['Can a person override a block?',
    `That is what acknowledge is for. The person sees the real values the gateway
     found, unticks what the assistant does not need, says why the rest has to go,
     and sends. Their name, their reason and the field types go on the ledger —
     the values do not.`],
  ['How would I know a control is still working in six months?',
    `Because it is challenged daily. For every enforced control: the canonical
     trigger, which must act; a benign near-miss, which must pass; and a known
     evasion, which must still be stopped. Probes travel the real data path under
     a probe identity and are tagged synthetic, so they never inflate your traffic
     numbers.`],
  ['Does any of this need an internet connection?',
    `No. Because no outbound call is needed to reach a verdict, the enforcement
     path works with no internet at all. In an air-gapped deployment the only
     thing missing is the forward to a public provider, which you were not making
     anyway.`],
]

export default function Guard() {
  const { pilot } = REGION_CONTENT[readRegion()]

  return (
    <div className="rg">
      <section className="rg-hero">
        <div className="wrap rg-hero-in">
          <div>
            <span className="rg-eyebrow">Runtime security</span>
            <h1 className="rg-h1">Catch it before it leaves.</h1>
            <p className="rg-sub">
              Inspect prompts, agent tool calls, model responses and credentials in your
              own network — before anything reaches a provider.
            </p>
            <Link className="btn btn-primary" to={pilot.primaryCta[1]}>
              {pilot.primaryCta[0]}
            </Link>
          </div>
          <Capture
            src="policy-drift"
            where="govern / assurance / policy drift"
            bleed
            /* past the nav sidebar, onto the question and its four counters */
            crop={{ scale: 1.9, x: -17, y: -16, h: 360 }}
            alt="The GovernVeil assurance page asking whether the policy says what the ledger did, computed over real ledger rows."
          >
            <b>Does the policy say what the ledger did?</b> Computed over 2,869 real
            ledger rows, with 442 synthetic probe rows skipped.
          </Capture>
        </div>
      </section>

      <section className="rg-caps">
        <div className="wrap">
          <div className="fr">
            {CAPABILITIES.map((c, i) => (
              <div className={`fr-row${i % 2 ? ' is-flip' : ''}`} key={c.h}>
                <div>
                  <span className="fr-n">{String(i + 1).padStart(2, '0')}</span>
                  <h2 className="fr-h">{c.h}</h2>
                  <p className="fr-p">{c.p}</p>
                  <div className="rg-fig">
                    <b>{c.fig}</b>
                    <span>{c.figNote}</span>
                  </div>
                  <Link className="link rg-cap-l" to={c.to[1]}>{c.to[0]} →</Link>
                </div>

                <div className="fr-vis">
                  {c.shot && (
                    <Capture
                      src={c.shot.src}
                      where={c.shot.where}
                      crop={c.shot.crop}
                      alt={c.shot.alt}
                    >
                      {c.shot.cap}
                    </Capture>
                  )}
                  {c.bars && (
                    <div className="fr-bars">
                      <Bars rows={c.bars} />
                      <p className="fr-bars-n mono">{c.barsNote}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rg-scope">
        <div className="wrap">
          <h2 className="rg-h2">What is in scope today</h2>
          <dl className="rg-scope-l">
            {SCOPE.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <section className="rg-faq">
        <div className="wrap">
          <h2 className="rg-h2">Frequently asked questions</h2>
          <div className="rg-faq-l">
            {FAQ.map(([q, a]) => (
              <details className="rg-q" key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="rg-cta">
        <div className="wrap">
          {/* NOT pilot.lengthPhrase here — ctaBlurb opens with that same
              sentence, so the heading would repeat the body verbatim. */}
          <h2 className="rg-h2">See it catch a real prompt in week one.</h2>
          <p>{pilot.ctaBlurb}</p>
          <Link className="btn btn-primary" to={pilot.primaryCta[1]}>
            {pilot.primaryCta[0]}
          </Link>
        </div>
      </section>
    </div>
  )
}

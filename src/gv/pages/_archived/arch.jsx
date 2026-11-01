import { Tag } from './bits'

/* The architecture diagram: what arrives, what decides, what leaves.

   Built from the sketch Jay supplied, with three corrections, all of which
   matter enough to record:

   1. THE VERDICTS. The sketch's enforcement layer read "Allow · Block · Mask ·
      Redact · Acknowledge & Pass · Review" — six, two of which do not exist,
      and missing `flag`. The product has five: allow / flag / mask /
      acknowledge / block. This is the same pre-8b94fd8 set that was in the AU
      mock-up; see the note in regions.jsx.

   2. FOUR SURFACES, NOT THREE. The sketch showed LLM / MCP / API gateways.
      The site says "four surfaces, one engine, one ledger" — the browser
      extension is the fourth, and it is the one that covers the assistants
      people already use.

   3. SITE VOCABULARY. "Regex & PII Detection" and "Shieldstral Evaluation"
      are internal names. The site says pattern path (15 uses) and local model
      (13). The diagram should not introduce a third vocabulary for the same
      two things. */

const SURFACES = [
  ['/v1/*', 'Apps and agents calling model APIs'],
  ['/gw/<app>', 'Enterprise APIs'],
  ['/mcp/v1/*', 'Agent tool calls'],
  ['browser', 'Public assistants'],
]

/* Left column is the order a request meets them; right column is what each
   one writes down. */
const PLANE = [
  ['Identity and grants', 'Is this credential still authorised?'],
  ['Pattern path', 'Identifiers, credentials, injection phrasing — sub-ms'],
  ['Local model', 'Every policy answered as a plain-language question'],
  ['Policy engine', 'The chain resolves exactly one outcome'],
  ['Acknowledge and approvals', 'The person minimises, and says why'],
  ['Signed ledger', 'Hash-chained before the caller gets its reply'],
]

const VERDICTS = [
  ['allow', 'allow', 'forwarded unchanged'],
  ['flag', 'flag', 'sent, and raised'],
  ['mask', 'mask', 'spans replaced'],
  ['acknowledge', 'ack', 'returned to the person'],
  ['block', 'block', 'cancelled, and ledgered'],
]

export function Architecture({ className = '' }) {
  return (
    <figure className={`arch ${className}`.trim()}>
      <div className="arch-band arch-in">
        <span className="arch-cap">What arrives</span>
        <div className="arch-surfaces">
          {SURFACES.map(([k, v]) => (
            <div className="arch-surface" key={k}>
              <span className="mono">{k}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="arch-arrow" aria-hidden="true" />

      <div className="arch-band arch-plane">
        <span className="arch-cap">Inside your network</span>
        <h3 className="arch-h">The policy chain</h3>
        <div className="arch-rows">
          {PLANE.map(([k, v]) => (
            <div className="arch-row" key={k}>
              <span className="arch-row-k">{k}</span>
              <span className="arch-row-v">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="arch-arrow" aria-hidden="true" />

      <div className="arch-band arch-verdicts">
        <span className="arch-cap">Exactly one outcome</span>
        <div className="arch-v-row">
          {VERDICTS.map(([v, tone, what]) => (
            <div className="arch-v" key={v}>
              <Tag k={tone}>{v}</Tag>
              <span>{what}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="arch-arrow" aria-hidden="true" />

      <div className="arch-band arch-out">
        <span className="arch-cap">What leaves</span>
        <p>Approved models, registered MCP servers and your own APIs — and nothing else.</p>
      </div>

      <figcaption>
        Every path takes the same chain and lands on the same ledger. No prompt
        content leaves your network to reach a verdict.
      </figcaption>
    </figure>
  )
}

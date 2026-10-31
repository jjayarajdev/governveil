import { Link } from 'react-router-dom'
import { Shot } from '../../components/figma'
import { Band, Cta, Eyebrow, SectionHead, Stat, Tag } from '../bits'
import { readRegion } from '../../region'
import { REGION_CONTENT } from '../regions'

const PROBLEMS = [
  ['01', 'The licence only sees the browser.',
    `Enterprise AI seats cover people in a chat window. They don't cover the
     applications and agents calling model APIs directly, the tool calls those
     agents make, or the personal accounts staff still use.`],
  ['02', 'Blocking just moves the risk.',
    `Traditional DLP either lets a prompt through or walls the user off. So the
     work goes to a personal device, and you lose visibility entirely — which is
     worse than where you started.`],
  ['03', 'You can’t prove any of it.',
    `“Was this AI allowed to do that, and can we show we prevented it?” Prompt
     filters answer whether text was sensitive. A contract transfers liability.
     Neither produces evidence an auditor will accept.`],
]

const PLANES = [
  ['/gw/<app>', 'Access plane',
    `Role → scope → operation gating on any enterprise API, resolved before a
     request is ever forwarded. A denial never leaves the perimeter.`],
  ['/v1/*', 'Content plane',
    `A sub-millisecond pattern path, then one local policy-adaptive model that
     answers every policy as a plain-language question. The model's response is
     inspected on the way back.`],
  ['/mcp/v1/*', 'Execution point',
    `Every agent tool call listed, governed, masked, inspected and restored
     through the MCP connector — and ledgered like any other request. Poisoned
     tool descriptions never reach the agent.`],
]

const VERDICTS = [
  ['allow', 'ok', 'Forwarded unchanged.'],
  ['flag', 'flag', 'Sent, and raised for human review.'],
  ['mask', 'mask', 'Sensitive spans replaced with stand-ins; the rest forwarded.'],
  ['acknowledge', 'ack', 'The person minimises the fields, says why, and sends.'],
  ['block', 'block', 'Send cancelled, and ledgered on the spot.'],
]

const CAPABILITIES = [
  ['ship', 'shipping', 'Three enforcement surfaces',
    <>Content inspection on <span className="mono">/v1</span>, role-to-scope gating on{' '}
      <span className="mono">/gw</span>, and agent tool-call governance over MCP — one
      policy engine and one ledger across all three.</>],
  ['ship', 'shipping', 'Shadow-AI coverage',
    <>An MV3 browser extension for eight public assistants your people already use —
      prompts and attachments checked before they leave the browser, no MDM dependency —
      plus a forward-proxy variant for any HTTP client.</>],
  ['ship', 'shipping', 'Document-upload sweep',
    <>Macros, PDF JavaScript, hidden and white text, comments, hidden sheets, formula
      payloads, zero-width characters and zip bombs — caught before a file reaches a
      model or a RAG pipeline. Every error path is quarantine, never allow.</>],
  ['ship', 'shipping', 'Vendor & agent governance',
    <>Vendors → agents → scoped grants. Revoke one and every tied key fails on the
      next call; the kill switch lands in about half a millisecond. Agents also carry
      tool allow-lists, call and spend caps, and held actions awaiting an owner.</>],
  ['ship', 'shipping', 'Audit-grade evidence',
    <>An append-only, hash-chained ledger with daily anchors and a standalone verifier.
      Control state — holding, weak, breached, untested — is computed from that ledger,
      never from someone's assertion.</>],
  ['optin', 'opt-in · off by default', 'Reversible masking',
    <>Format-preserving surrogates out, real values restored inbound on the API path.
      Originals sealed with AES-256-GCM under a KEK-wrapped key that rotates online;
      persist-before-forward, so a surrogate never leaves without its mapping stored.
      Your pilot decides whether to turn it on.</>],
]

const PRINCIPLES = [
  ['Sovereign',
    <>Every prompt is scored by local models. Where does it go for a verdict? Nowhere —
      and a signed attestation says so:{' '}
      <span className="mono">non_allowlisted_egress_attempts: 0</span>.</>],
  ['Private',
    <>Sensitive values are replaced before the prompt leaves the perimeter; with the
      vault on, restored for the authorised caller. DLP content is redacted at rest.</>],
  ['Auditable',
    <>Every verdict carries a reason, the detector that fired and a confidence score.
      Nothing is a black box you can't defend to an auditor.</>],
  ['Accountable',
    <>A tamper-evident record of every interaction and decision, mapped to named
      controls, with a named owner on every asset and an attestation cycle that
      expires.</>],
  ['Overseen',
    <>Graduated verdicts, an acknowledgement review queue, held actions for agents, the
      incident clock and a sub-millisecond kill switch keep a human in control.</>],
]

export default function Home() {
  const { home, pilot } = REGION_CONTENT[readRegion()]
  const { panel, strip, pairRight } = home
  return (
    <>
      <section className="hero">
        <div className="wrap hero-split">
          <div>
            <span className="pill">Self-hosted · AI data-egress control &amp; evidence</span>
            <h1 className="h-display">
              Let your teams use AI. Keep the data — and the <em>proof</em> — inside
              your perimeter.
            </h1>
            <p className="lede">
              GovernVeil governs every AI action — model API calls, enterprise-app
              access, agent tool calls and vendor credentials — in your own
              environment. Sensitive values are caught before the prompt leaves, model
              responses are inspected on the way back, every decision gets one of five
              audited verdicts, and every control is measured from the ledger rather
              than asserted.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary" to={pilot.primaryCta[1]}>
                {pilot.primaryCta[0]}
              </Link>
              <Link className="btn btn-ghost" to={pilot.secondaryCta[1]}>
                {pilot.secondaryCta[0]}
              </Link>
            </div>
          </div>

          <div className="panel">
            <div className="panel-head">
              <span>POST /v1/chat/completions</span>
              <Tag k="mask">mask</Tag>
            </div>
            {/* Two real values in one prompt, both caught deterministically on
                the fast path. The pair is per-market — see regions.jsx, which
                records why the AU example uses the detectors it does. */}
            <div className="panel-row">
              <div className="panel-label">01 · your app sends</div>
              <pre>{panel.before}
                <span className="hit">{panel.first}</span>{panel.between}
                <span className="hit">{panel.second}</span>{'"'}</pre>
            </div>
            <div className="panel-row">
              <div className="panel-label">02 · the provider sees</div>
              <pre>{panel.before}
                <span className="redacted" />{panel.between}
                <span className="redacted" />{'"'}</pre>
            </div>
            <div className="panel-row">
              <div className="panel-label">03 · the ledger records</div>
              <pre>{'verdict  '}<code>mask</code>{`
control  PI-02 · personal data masked before it leaves
caught   fast filter `}<code>fast_pii_filter</code>{` · 2 spans · sub-ms
types    `}<code>{panel.types[0]}</code>{', '}<code>{panel.types[1]}</code>{`
entry    #4187 · signed · prev 9f2c…e41a`}</pre>
            </div>
            <div className="panel-foot">
              <span>nothing real left the perimeter</span>
              <span>✓ evidence written before the reply</span>
            </div>
          </div>
        </div>
      </section>

      <div className="strip">
        <div className="strip-in">
          {strip.map(([b, s]) => (
            <div className="strip-item" key={b}><b>{b}</b><span>{s}</span></div>
          ))}
        </div>
      </div>

      {/* ───── problem ───── */}
      <Band>
        <SectionHead eyebrow="I · The problem" title="Three gaps your AI licence doesn’t close." />
        <div className="grid cols-3">
          {PROBLEMS.map(([n, h, p]) => (
            <div className="card card-num" key={n}>
              <span className="numeral">{n}</span>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── how it works ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="II · How it works"
          title={<>Two enforcement planes and an execution point over one detection
            ladder — and a governance layer that measures all three.</>}
        >
          Point your apps at one base URL, install the extension for people, register
          your agents’ tool servers behind the connector. Every interaction is
          governed, evidenced and measured, in your environment.
        </SectionHead>

        <div className="grid cols-3" style={{ marginBottom: 32 }}>
          {PLANES.map(([route, h, p]) => (
            <div className="card" key={route}>
              <span className="numeral mono">{route}</span>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>

        <div className="card card-split">
          <Tag k="mask" style={{ fontSize: 12 }}>A123456(7) ⇄ A563710(2)</Tag>
          <p style={{ margin: 0 }}>
            <b>Reversible masking</b> <Tag k="optin">opt-in · off by default</Tag>
            {'  '}Sensitive spans are redacted one-way by default. Turn on the vault and
            the API path becomes a full round trip: format-preserving surrogates out,
            real values restored inbound, originals sealed under a key you hold.{' '}
            <Link className="link" to="/features">How it works</Link>
          </p>
        </div>
      </Band>

      {/* ───── verdicts ───── */}
      <Band>
        <SectionHead
          eyebrow="III · Five verdicts"
          title="Every request ends in exactly one outcome — and on the record."
        >
          Not allow-or-block. Five graduated verdicts let you keep work moving safely,
          put a human in the loop, or stop a send — without reaching for the kill
          switch as your only tool. When several policies match one prompt, the most
          restrictive wins.
        </SectionHead>

        <div className="grid cols-5" style={{ marginBottom: 56 }}>
          {VERDICTS.map(([v, tone, text]) => (
            <div
              className="card card-flat"
              key={v}
              style={{ borderTop: `2px solid var(--${tone})` }}
            >
              <Tag k={tone === 'ok' ? 'allow' : tone}>{v}</Tag>
              <p style={{ marginTop: 12 }}>{text}</p>
            </div>
          ))}
        </div>

        <div style={{ maxWidth: '68ch', marginBottom: 36 }}>
          <h3 className="h-sub">The verdict that nobody else has.</h3>
          <p className="muted">
            Blocking a person who has a legitimate reason teaches them to route around
            you. <b>Acknowledge</b> hands the decision back with the evidence attached:
            here are the five real values we found, untick what the assistant doesn’t
            need, say why the rest must go, and send.
          </p>
          <p className="muted">
            The name, the reason and the field types are written to the ledger as a
            signed <span className="mono">acknowledgement</span> decision — the values
            are not. A reviewer sees the queue afterwards, and their review is a second
            signed row against the same entry. On the <span className="mono">/v1</span>{' '}
            path, where there is no human at the keyboard, acknowledge degrades to mask.
          </p>
          <p><Link className="link" to="/features">Every verdict, in detail</Link></p>
        </div>

        {/* Full width rather than beside the prose: the card's own field list is
            the point of the image, and it is unreadable at half a column. */}
        <Shot
          className="shot"
          src="acknowledge-card"
          width={1210}
          height={773}
          x2={false}
          alt="The GovernVeil acknowledge card inside ChatGPT, listing five detected real values with tick boxes, a reason field, and a note that the entry is logged to the audit trail."
        >
          <b>Caught in the page, before the send.</b> Five real values found in a
          ChatGPT prompt — name, PAN, IFSC, Aadhaar. Captured from the running
          extension, not a mock-up.
        </Shot>
      </Band>

      {/* ───── capabilities ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="IV · Capabilities"
          title="What ships today — and what doesn’t, labelled plainly."
        >
          Everything below ships unless it carries a <Tag k="road">roadmap</Tag> or{' '}
          <Tag k="optin">opt-in</Tag> tag. We’d rather lose a deal on a gap you found
          here than on one you found in week six.
        </SectionHead>
        <div className="grid cols-3">
          {CAPABILITIES.map(([k, tagText, h, p]) => (
            <div className="card" key={h}>
              <div className="tag-row tag-row-head"><Tag k={k}>{tagText}</Tag></div>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── governance layer ───── */}
      <Band>
        <SectionHead
          eyebrow="V · Beyond the gateway"
          title="Every AI asset in your estate, with its controls and their state."
        >
          Register every application, model and agent with a named owner. Assign
          controls from your own policy clauses and from the nearest approved
          precedent. Observe before you enforce — detective mode records what{' '}
          <em>would</em> have blocked. Then read control state off the signed ledger
          and let the owner attest against what actually happened. The tenth asset is
          approved in minutes, because it inherits the ninth.
        </SectionHead>

        <div className="tag-row" style={{ marginBottom: 36 }}>
          <Tag k="ship">16-control catalogue</Tag>
          <Tag k="ship">detective → enforced</Tag>
          <Tag k="ship">precedent inheritance</Tag>
          <Tag k="ship">coverage from independent telemetry</Tag>
          <Tag k="ship">policy drift</Tag>
        </div>

        <Shot
          className="shot"
          src="policy-drift"
          alt="The GovernVeil policy drift report asking whether the policy says what the ledger did, with clause-to-control mappings and dormant tiers."
        >
          <b>Does the policy say what the ledger did?</b> Clauses never exercised,
          enforcement with no clause behind it, overrides clustering on one control,
          exceptions never closed — computed over 2,869 real ledger rows with 442
          synthetic probe rows skipped, and signed as a{' '}
          <span className="mono">drift_report</span> decision on the same chain.
        </Shot>
      </Band>

      {/* ───── the one thing ───── */}
      <Band sunken>
        <Eyebrow>The one thing nobody else does</Eyebrow>
        <div className="quote-flip">
          <div className="q q-old">“We blocked it.”</div>
          <div className="arrow">→</div>
          <div className="q q-new">“We let the work happen — safely.”</div>
        </div>
        <div className="grid cols-2 gap-wide">
          <p className="muted">
            GovernVeil replaces sensitive spans before anything leaves. The prompt still
            goes, the work still happens, and nothing real reaches the provider. Turn on
            the vault and the API path restores the real values in the response — a full
            round trip, with the originals sealed under your own key.
          </p>
          <p className="muted">
            Detect-and-block vendors have no response path at all, and the model
            providers have declined to build one. Because it all runs inside your
            perimeter, it works air-gapped — which is also why it can learn from your
            traffic without your data moving anywhere.
          </p>
        </div>
      </Band>

      {/* ───── proof ───── */}
      <Band>
        <SectionHead
          eyebrow="VI · Proof, not claims"
          title="A published benchmark you can re-run against your own stack."
        >
          The corpora and the runner are committed to the repository.{' '}
          <span className="mono">make benchmark</span> scores them against your
          deployment, with no cloud calls. The differentiator is the reproducibility,
          not the number.
        </SectionHead>
        <div className="grid cols-4">
          <Stat n="0" unit=" of 200" label="False positives">
            Benign prompts wrongly caught in the published{' '}
            <span className="mono">combined-1000</span> corpus. Precision 100&nbsp;%.
          </Stat>
          <Stat n="93.25" unit=" %" label="Recall">
            Across 800 should-catch prompts — harmful intent, toxicity, injection, PII
            and business-sensitive. Per-policy numbers published, including the low ones.
          </Stat>
          <Stat n="1" label="Model, tuned in plain English">
            Each policy is a yes/no question to one local model. Edit the question to
            tune detection — no per-client retraining, no data leaving to fine-tune.
          </Stat>
          <Stat n="Daily" label="Every control challenged">
            A canonical trigger, a benign near-miss and an evasion fired at each
            enforced control through the real data path, tagged so they never count as
            traffic.
          </Stat>
        </div>
        <div className="btn-row" style={{ marginTop: 40 }}>
          <Link className="btn btn-ghost" to="/benchmark">Read the benchmark →</Link>
        </div>
      </Band>

      {/* ───── responsible AI ───── */}
      <Band sunken>
        <SectionHead
          eyebrow="VII · Responsible AI by design"
          title="The language your risk and board teams use, delivered as mechanisms."
        >
          Not a policy PDF. Each principle maps to something in the product you can
          demand a demo of.
        </SectionHead>
        <div className="grid cols-5">
          {PRINCIPLES.map(([h, p]) => (
            <div className="card" key={h}>
              <h3 className="h-sub">{h}</h3>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </Band>

      {/* ───── security + pricing ───── */}
      <section className="band">
        <div className="wrap grid cols-2" style={{ gap: 56 }}>
          <div>
            <Eyebrow>Security &amp; residency</Eyebrow>
            <h2 className="h-sub h-sub-lg">Data residency by construction.</h2>
            <p className="muted">
              Self-hosted in your VPC or on-prem. All inference local. Encryption in
              transit and at rest; vault keys KEK-wrapped. OIDC or local auth, three
              enforced roles, per-app service tokens. There is no vendor cloud to send
              prompts to — and the attestation endpoint proves it rather than asserting
              it.
            </p>
            <p><Link className="link" to="/security">Security &amp; compliance →</Link></p>
          </div>
          <div>
            <Eyebrow>{pairRight.eyebrow}</Eyebrow>
            <h2 className="h-sub h-sub-lg">{pairRight.title}</h2>
            <p className="muted">{pairRight.body}</p>
            {pairRight.link && (
              <p>
                <Link className="link" to={pairRight.link[1]}>{pairRight.link[0]}</Link>
              </p>
            )}
          </div>
        </div>
      </section>

      <Cta />
    </>
  )
}

/* The eight-stage request pipeline, and the horizontal track that draws it.

   Single source of truth. Before this, ProductFlow and Journey each carried
   their own STEPS array with slightly different wording for the same eight
   stages, so the two pages could drift apart — and they had. Each stage here
   carries three lengths:

     short   the track label, 1-2 words, must fit ~130px
     what    one clause, for the replay
     body    the full explanation, for the workflow page

   The track reads left to right because that is what the thing it describes
   does. Rendering a pipeline as a vertical list of eight text blocks throws
   away the only diagram the page had. */

export const STAGES = [
  {
    n: '01', key: 'ingress', short: 'Ingress',
    what: 'the prompt arrives on /v1',
    tags: ['/v1/*', '/gw/<app>', '/mcp/v1/*', 'browser extension'],
    body: <>An app calls <span className="mono">/v1/*</span> — a base-URL change — an
      enterprise API is called through <span className="mono">{'/gw/<app>'}</span>, an
      agent calls a tool through the MCP connector, or a person types into a public
      assistant and the extension relays the prompt before it leaves the browser.</>,
  },
  {
    n: '02', key: 'grant', short: 'Grant check',
    what: 'is this credential still authorised?',
    figure: { value: '~0.5 ms', label: 'kill switch', note: 'measured in-line, before inspection' },
    body: <>Is this credential still authorised? A revoked grant is an instant 403,
      refused before any inspection runs. A long-dormant grant that suddenly wakes
      raises an incident with a 14-day clock and optional auto-freeze.</>,
  },
  {
    n: '03', key: 'access', short: 'Access plane',
    what: 'role → scope → operation',
    tags: ['role → scope', '403 on deny'],
    body: <>For enterprise apps, role → scope → operation is checked before anything is
      forwarded. A viewer may read and not delete; the denial never leaves the
      perimeter and is still ledgered.</>,
  },
  {
    n: '04', key: 'documents', short: 'Documents',
    what: 'embedded files parsed and swept',
    tags: ['control DS-05'],
    body: <>Embedded or uploaded documents are parsed into a normalised segment list
      with provenance, then swept. Unscannable or corrupt payloads fail closed — every
      error path is quarantine, never allow.</>,
  },
  {
    n: '05', key: 'detection', short: 'Detection',
    what: 'pattern path, then the local model',
    tags: ['fast path → local model'],
    body: <>A sub-millisecond pattern path first — US and India PII, credentials,
      injection phrasing — then one local policy-adaptive model answers every policy as
      a plain-language question in a single forward pass, with a companion model
      extracting PII spans for replacement.</>,
    detail: [
      ['fast path', 'keyword, regex and secrets — SSN, card, PAN, GSTIN, IFSC, Aadhaar, credentials — plus injection phrasing · sub-ms'],
      ['policy question', 'injection · PII · toxicity · business-critical · harmful intent · safety guard, in one forward pass'],
      ['NER', 'PII spans for replacement'],
      ['parser + sweep', 'macros, PDF JavaScript, hidden and white text, hidden sheets, formulas'],
    ],
    note: `A model-server error under strict validation is a block, never a skip. The
      classic multi-model stack stays available as a fallback by unsetting one
      environment variable.`,
  },
  {
    n: '06', key: 'limits', short: 'Limits',
    what: 'tools, caps, permitted models',
    tags: ['AG-11 · AG-12', 'MD-01'],
    body: <>For agents: tools outside the allow-list refuse, hourly call and daily
      spend caps are counted from the ledger, and gated actions are held for the owner.
      For every request: the model must be approved, in the caller’s permitted list,
      and permitted for the data classes still present <em>after</em> masking.</>,
  },
  {
    n: '07', key: 'verdict', short: 'Verdict',
    what: 'the chain resolves exactly one outcome',
    verdicts: true,
    body: <>The policy chain resolves exactly one outcome; when several policies match,
      the most restrictive wins. Controls in detective mode record “would have blocked”
      and let evaluation continue. A masked value never leaves until its vault mapping
      is persisted — and if it cannot be persisted, the gateway falls back to
      destructive redaction rather than forwarding something it cannot reverse.</>,
  },
  {
    n: '08', key: 'sign', short: 'Sign → reply',
    what: 'the row is chained before the caller is answered',
    tags: ['control RO-01', 'signed before reply'],
    body: <>The model’s output is a prompt too. Every response — JSON or stream,
      tool-call arguments included — runs the same ladder and the same chain. With the
      vault on, surrogates are restored for the authorised caller. Then the signed row
      is appended to the hash chain <em>before the caller gets its reply</em>.</>,
  },
]

/* The track.

   `mode`       'replay' animates a request travelling the track: the rail
                fills and stages light as it passes. 'pick' is a chooser —
                all eight stages are equal and only the selected one is
                emphasised, so a full accent rail does not read as progress
                through something that is not progressing.
   `stages`     the stages to draw; defaults to the request pipeline
   `reached`    replay only: how many stages are lit (default: all)
   `active`     pick only: index of the selected stage
   `decidedAt`  replay only: 1-based stage where this request resolved
   `onPick`     makes the stages buttons; omit for a read-only diagram */
export function Track({
  stages = STAGES, mode = 'replay', reached = null, active = null,
  decidedAt = null, onPick = null,
}) {
  const n = stages.length
  const lit = reached == null ? n : reached
  const replay = mode === 'replay'
  const Item = onPick ? 'button' : 'div'
  /* Column count and the rail inset are driven off the stage count, so the
     same track draws the eight-stage request pipeline and the three-point
     agent sequence. Inset is half a column: 50/n per cent. */
  const vars = { '--pt-count': n, '--pt-inset': `${50 / n}%` }
  return (
    <div className={`pt pt-${mode}${n > 4 ? ' pt-wide' : ''}`} role={onPick ? 'tablist' : 'img'}
      aria-label={onPick ? 'The eight stages' : 'The eight stages a request passes through'}>
      {/* `pt-in` is the positioning context AND the scrolled content. The rail
          must live inside it, not inside `pt`: `pt` is the overflow-x:auto
          container on narrow screens, and an absolutely-positioned child of a
          scroll container is laid out against the visible box, so the rail
          would stay put while the stages scrolled under it. */}
      <div className="pt-in" style={vars}>
        <div className="pt-rail" aria-hidden="true">
        {/* The rail spans centre-of-01 to centre-of-08, so N lit stages fill
            (N-1)/7 of it — not N/8, which would overshoot. */}
          {replay && (
            <span
              className="pt-fill"
              style={{ width: `${(Math.max(0, lit - 1) / (n - 1)) * 100}%` }}
            />
          )}
        </div>
        <ol className="pt-l">
        {stages.map((s, i) => {
          const isLit = replay && i < lit
          const isDecider = replay && decidedAt != null && i + 1 === decidedAt && isLit
          const isOn = active === i
          return (
            <li key={s.key}>
              <Item
                {...(onPick
                  ? { type: 'button', onClick: () => onPick(i), role: 'tab', 'aria-selected': isOn }
                  : {})}
                className={`pt-s${isLit ? ' is-lit' : ''}${isDecider ? ' is-decider' : ''}${isOn ? ' is-on' : ''}`}
              >
                <span className="pt-n">{s.n}</span>
                <span className="pt-t">{s.short}</span>
                {s.sub && <span className="pt-sub mono">{s.sub}</span>}
              </Item>
            </li>
          )
        })}
        </ol>
      </div>
    </div>
  )
}

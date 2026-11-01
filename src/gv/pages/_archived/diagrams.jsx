/* SVG diagrams.

   The rule these follow: a diagram, never a mock-up of the product. Every
   raster image on this site is a screenshot of the running console, and that
   is load-bearing — it is why the captures are worth more than the
   competition's invented UI cards. An SVG drawn to look like a screenshot
   would quietly spend that. These are schematic on purpose: boxes, rules and
   labels, in the page's own type and tokens, which nobody mistakes for an
   application.

   Colour comes from CSS custom properties, so both palettes and both design
   variants follow with no second definition here. */

/* Where an agent's tool call is judged — the one thing on this site that is a
   topology rather than a sequence, and so cannot be drawn as a track. */
export function ToolCallPath() {
  const box = { rx: 3, height: 76, fill: 'var(--surface)', stroke: 'var(--border-strong)' }
  return (
    <figure className="dg">
      <svg viewBox="0 46 920 212" role="img" aria-labelledby="tcp-t tcp-d" className="dg-svg">
        <title id="tcp-t">Where an agent&rsquo;s tool call is judged</title>
        <desc id="tcp-d">
          The agent reaches its MCP servers through the GovernVeil connector. The
          connector asks the gateway for a verdict at three points: when the agent
          discovers what tools exist, when it has filled in the arguments, and when
          the server has answered.
        </desc>

        <defs>
          <marker id="dg-arrow" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--border-strong)" />
          </marker>
        </defs>

        {/* the three actors */}
        <rect x="8" y="96" width="190" height={box.height} rx={box.rx} fill={box.fill} stroke={box.stroke} />
        <text x="103" y="128" className="dg-t" textAnchor="middle">The agent</text>
        <text x="103" y="150" className="dg-s" textAnchor="middle">Claude Code, Codex,</text>
        <text x="103" y="166" className="dg-s" textAnchor="middle">your own harness</text>

        <rect x="340" y="80" width="240" height="108" rx={box.rx}
          fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
        <text x="460" y="112" className="dg-t" textAnchor="middle">GovernVeil</text>
        <text x="460" y="134" className="dg-s" textAnchor="middle">connector + gateway</text>
        <text x="460" y="162" className="dg-m" textAnchor="middle">in your network</text>

        <rect x="722" y="96" width="190" height={box.height} rx={box.rx} fill={box.fill} stroke={box.stroke} />
        <text x="817" y="128" className="dg-t" textAnchor="middle">MCP servers</text>
        <text x="817" y="150" className="dg-s" textAnchor="middle">your tools and</text>
        <text x="817" y="166" className="dg-s" textAnchor="middle">third-party servers</text>

        {/* outbound: agent → connector → server */}
        <line x1="198" y1="120" x2="332" y2="120" stroke="var(--border-strong)" markerEnd="url(#dg-arrow)" />
        <line x1="588" y1="120" x2="714" y2="120" stroke="var(--border-strong)" markerEnd="url(#dg-arrow)" />
        {/* inbound: server → connector → agent */}
        <line x1="714" y1="164" x2="588" y2="164" stroke="var(--border-strong)" markerEnd="url(#dg-arrow)" />
        <line x1="332" y1="164" x2="198" y2="164" stroke="var(--border-strong)" markerEnd="url(#dg-arrow)" />

        {/* the three judgements, on the path where each happens */}
        {[
          [265, 120, '1'], [651, 120, '2'], [651, 164, '3'],
        ].map(([cx, cy, n]) => (
          <g key={n}>
            <circle cx={cx} cy={cy} r="13" fill="var(--bg)" stroke="var(--accent)" strokeWidth="2" />
            <text x={cx} y={cy + 4} className="dg-n" textAnchor="middle">{n}</text>
          </g>
        ))}

        {/* captions */}
        <text x="265" y="68" className="dg-c" textAnchor="middle">tools/list</text>
        <text x="265" y="86" className="dg-s" textAnchor="middle">a poisoned description</text>
        <text x="265" y="102" className="dg-s" textAnchor="middle">never reaches the list</text>

        <text x="651" y="68" className="dg-c" textAnchor="middle">tools/call</text>
        <text x="651" y="86" className="dg-s" textAnchor="middle">judged before</text>
        <text x="651" y="102" className="dg-s" textAnchor="middle">anything runs</text>

        <text x="651" y="206" className="dg-c" textAnchor="middle">the result</text>
        <text x="651" y="224" className="dg-s" textAnchor="middle">judged before the</text>
        <text x="651" y="240" className="dg-s" textAnchor="middle">agent reads it</text>

        <text x="460" y="236" className="dg-m" textAnchor="middle">
          each judgement is its own ledger row
        </text>
      </svg>
      <figcaption>
        <b>Three judgements, not one.</b> The connector asks for a verdict at every
        point the agent could do damage — and the third is the half that
        detect-and-block products do not have.
      </figcaption>
    </figure>
  )
}

/* The hash chain. A screenshot of the ledger shows rows; it cannot show the
   thing that matters, which is that each row carries the hash of the one
   before it. That is a diagram's job. */
export function HashChain() {
  const rows = [
    ['#4185', '7c1d…b904', 'allow'],
    ['#4186', 'a0f3…22e8', 'block'],
    ['#4187', '9f2c…e41a', 'mask'],
  ]
  return (
    <figure className="dg">
      <svg viewBox="0 4 920 196" role="img" aria-labelledby="hc-t hc-d" className="dg-svg">
        <title id="hc-t">The hash chain</title>
        <desc id="hc-d">
          Three ledger entries in sequence. Each carries the SHA-256 hash of the entry
          before it, so altering any row makes verification fail from that row onward.
        </desc>
        <defs>
          <marker id="dg-arrow2" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--accent)" />
          </marker>
        </defs>

        {rows.map(([entry, prev, verdict], i) => {
          const x = 8 + i * 312
          return (
            <g key={entry}>
              <rect x={x} y="44" width="268" height="104" rx="3"
                fill="var(--surface)" stroke="var(--border-strong)" />
              <text x={x + 20} y="74" className="dg-c">entry {entry}</text>
              <line x1={x} y1="88" x2={x + 268} y2="88" stroke="var(--border)" />
              <text x={x + 20} y="110" className="dg-s">prev</text>
              <text x={x + 76} y="110" className="dg-c">{prev}</text>
              <text x={x + 20} y="134" className="dg-s">verdict</text>
              <text x={x + 76} y="134" className="dg-c">{verdict}</text>
              {i < rows.length - 1 && (
                <line x1={x + 268} y1="96" x2={x + 304} y2="96"
                  stroke="var(--accent)" strokeWidth="2" markerEnd="url(#dg-arrow2)" />
              )}
            </g>
          )
        })}

        <text x="460" y="24" className="dg-m" textAnchor="middle">
          each row carries the hash of the row before it
        </text>
        <text x="460" y="182" className="dg-m" textAnchor="middle">
          edit any row and verification fails from that row onward
        </text>
      </svg>
      {/* Not "append-only, and provably so" — that is the heading this sits
          under on /security, and a caption that repeats it says nothing. */}
      <figcaption>
        <b>The sequence is the proof.</b> Altering entry #4186 changes its hash, so
        #4187 no longer points at anything that exists — and every row after it
        fails with it.
      </figcaption>
    </figure>
  )
}

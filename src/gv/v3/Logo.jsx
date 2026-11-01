/* The GovernVeil mark and wordmark, from the identity board.

   What the mark means, per the board: "Redacted, governed, and signed records
   — inside your network." So it reads, outside in:

     the frame     the perimeter — your network
     the hatching  what is masked, either side of the stack
     the stack     records, each behind the last
     the front     one record, redacted: orange field, white bar

   `tone` inverts the frame and the stack for dark grounds (the footer, the
   board's black lockup). The orange never changes — it is the accent, and it
   carries the same weight on both. */

export function Mark({ size = 30, tone = 'dark' }) {
  const ink = tone === 'dark' ? '#0E1411' : '#F4F5F2'
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="GovernVeil"
      fill="none"
    >
      <defs>
        <pattern id="gv-hatch" width="7" height="7" patternUnits="userSpaceOnUse"
          patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={ink} strokeWidth="2.6" opacity=".38" />
        </pattern>
        <clipPath id="gv-inner">
          <rect x="13" y="13" width="74" height="74" />
        </clipPath>
      </defs>

      {/* the perimeter */}
      <rect x="6.5" y="6.5" width="87" height="87" stroke={ink} strokeWidth="9" />

      <g clipPath="url(#gv-inner)">
        {/* what is masked, either side of the stack */}
        <rect x="13" y="40" width="22" height="22" fill="url(#gv-hatch)" />
        <rect x="65" y="40" width="22" height="22" fill="url(#gv-hatch)" />

        {/* records, each behind the last */}
        <path d="M44 76 H76 V44" stroke={ink} strokeWidth="8" />
        <path d="M36 66 H66 V36" stroke={ink} strokeWidth="8" />

        {/* the front record: redacted */}
        <rect x="26" y="24" width="34" height="34" fill="#FF5B1F" />
        <rect x="32.5" y="37.5" width="21" height="7" fill="#FFFFFF" />
      </g>
    </svg>
  )
}

/* The lockup. The board sets "Govern" in ink and "Veil" in the accent — one
   word, two colours, no space. */
export function Wordmark() {
  return <span className="logo-w">Govern<i>Veil</i></span>
}

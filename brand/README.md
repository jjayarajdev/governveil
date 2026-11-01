# Brand masters

From the `GovernVeil-website-AU` hand-off. **Masters, not deliverables** —
nothing here is served. The one file the site loads is `public-au/favicon.svg`
(a simplified cut with no hatch band, so it survives 16 px).

- `governveil-mark.svg` / `governveil-mark-reversed.svg` — the mark alone.
- `governveil-lockup.svg` / `governveil-lockup-reversed.svg` — mark + wordmark.
- `favicon.svg` — the 16 px cut.

The lockups set the wordmark in **live Schibsted Grotesk**. Outline the text
before sending either to print or to a third party, or it will render in a
fallback face on any machine without the font.

`src/gv/v3/Logo.jsx` draws the mark in React for both sites; it is built from
the same identity board, not from these files. If the mark changes here, that
component has to change with it.

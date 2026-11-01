# Port tools — governveil.com.au

The AU site is generated from the design hand-off, not hand-written:

```
GovernVeil-website-AU/site-au/*.html
        │
        ├─ tools/aucss.py   → src/gv-au.css        (the nine <style> blocks)
        └─ tools/auport.py  → src/gv/au/*.jsx      (the nine page bodies)
              └─ tools/aujsx.py                    (the HTML→JSX converter)
```

Both read from `/Users/jjayaraj/Downloads/GovernVeil-website-AU/site-au`.
Re-run either after the design changes; both overwrite their output.

**Hand-written, never generated** — these would be destroyed by a regeneration:

- `src/gv-au-shell.css` — header, mega-menu, footer, and the `--acc` token
  (the design carries it as an inline style on each page's wrapper div).
- `src/gv/au/ShellAU.jsx`, `src/AppAU.jsx`, `src/main-au.jsx`, `index-au.html`.

## Two things worth knowing

**Per-page CSS scoping.** Each design page sets its own `.h1x`, `.h2x` and
`.pair`. A selector whose body is identical everywhere becomes one `.v3 …`
rule; one that differs is emitted per page as `.v3.p-<key>`, and `ShellAU`
stamps the key on the root. Flattening them instead is what made every
governveil.com hero render at the runtime page's 120px.

**Corrections.** `auport.py` holds a `CORRECTIONS` table of claims the design
states more strongly than the product supports, with the reason beside each.
It fails loudly if a correction stops matching, so a reworded design can't
silently drop one.

# GovernVeil website

Marketing site for GovernVeil, rebuilt with React + [Ant Design](https://ant.design/) in the
style of [Ant Design Landing](https://landing.ant.design/).

## Stack

- Vite + React 18
- Ant Design 5 (components + theme tokens) and `@ant-design/icons`
- React Router (hash-based, so the built site works on any static host with no
  rewrite rules)

## Commands

```sh
npm install
npm run dev        # dev server with HMR
npm run build      # production build into dist/
npm run preview    # serve the production build locally
node scripts/snap.mjs   # headless screenshots of every route (needs Chrome + preview running)
```

## Layout

- `src/pages/` — one component per page: Home, Product, Features, Pilot, About
- `src/pages/_archive/` — unrouted pages kept for later (Security, Benchmark, Pricing, Compare)
- `src/components/` — shared pieces (SiteLayout header/footer, figma.jsx design primitives — Verdict tag, page header, pilot CTA band — plus Reveal scroll animation)
- `public/assets/img/` — product screenshots, logos, favicon
- `Figma-portal/` — the Figma Make export the current design is ported from
- `_backup/site-static-v1/` — the original static-HTML version of the site

The pilot form has no backend; submitting opens a pre-filled `mailto:` to
hello@syntegreti.com, same as the old site.

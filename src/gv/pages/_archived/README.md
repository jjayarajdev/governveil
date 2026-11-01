# Archived pages

Not routed, not linked, not imported — Vite never sees them, so nothing here
ships in the bundle. Kept because the work and the data joins behind them are
worth recovering, not because they are coming back as-is.

| page | archived | why |
|---|---|---|
| `Decisions.jsx` | 2026-11-01 | The decision explorer: 92 cases from `make test-verdicts`, filterable by verdict, each with its detector, control and request id. Pulled because it is a data explorer, not a product page — it asks the reader to do the work of forming a conclusion. The direction is the Runlayer shape: a verb-led outcome, three or four named capabilities, a scope block, an FAQ. |

To restore one: move the file back to `src/gv/pages/`, re-add its `<Route>`
and title in `src/App.jsx`, and re-add its nav entry in `src/gv/GvLayout.jsx`.
`src/gv/data/decisions.json` was left in place — it is still the source for
any future page built on the same run.

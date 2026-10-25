# Console captures — 2026-10-25

2× (2880×1800) captures of the running console, taken with Playwright + Chrome at
`deviceScaleFactor: 2` against the local demo stack (`localhost:3000`, admin session).
Each is the page as it renders, not a mock-up.

The two files one level up — `console.png` and `policies.png` — are from the
**pre-redesign** console, have never been referenced by any code since the first
commit (`85d9b50`), and show verdicts the product no longer has
(`error` / `rate_limited` / `redact`). Replace or delete them.

## Ready to use

| File | Page | Why it works |
|---|---|---|
| `access-governance.png` | Estate · APIs & MCP → Access | "Identity → role → scope → operation, all before content inspection." Six roles with live denial counts, operations with their decisions, **On resolver error: Fail-closed**. Traffic-independent. |
| `policy-drift.png` | Assurance → Policy drift | "Does the policy say what the ledger did?" Real clause→control mappings, dormant tiers, HS-03 / POL-01, footer reads *2,869 real ledger rows, 442 synthetic skipped … signed as a `drift_report` decision*. |
| `policies.png` | Policies | "Each policy is written as a sentence anyone can read." Correct verdict vocabulary (Flag / Block / Mask), stage per policy, Acted-30d, Overrides-30d, In force vs Dormant. Direct replacement for the stale crop. |

## Usable, with a caveat

`use-cases.png`, `overrides.png`, `cases.png`, `reports.png`, `egress.png`,
`gateway-settings.png`, `ledger-changes.png` — captured and sharp, but not
individually reviewed for marketing fitness. Check before publishing.

## Do not publish as-is

| File | Problem |
|---|---|
| `attention-30d.png` | **Block 109 · 66 %**, *average decision 9,885 ms*, *48 requests failed closed*. A product that blocks two thirds of traffic and takes ten seconds. |
| `evidence-ledger.png` | Top rows read *Fail-closed — the model server was unavailable*; actor column is `anonymous`. |
| `mcp-servers.png` | Only Weather (NWS) is registered. The hostile server with the poisoned tool description has been deregistered, so the best MCP image is not reproducible from current demo data. Re-register `ai-gateway-clean/tests/data/mcp/poisoned_server.py` to restore it. |

## Why the dashboard numbers are wrong

Three separate causes, none of them a capture problem:

1. **The seeded traffic is a detection benchmark, not realistic traffic.**
   `scripts/test-cases-500.json` is ~80 % adversarial by design, so any dashboard
   fed from it shows a product that blocks everything. Realistic demo traffic
   should be benign-heavy.
2. **Laptop latency.** Shieldstral on Apple MPS answers in ~1.1–1.8 s per request.
   The published figure (~135–170 ms) is an A10G number. Any screenshot taken on a
   laptop will contradict the latency claim, whatever the traffic.
3. **`mask` could not be produced at all** — see below.

Also note `scripts/demo-traffic-100.py` is stale: it posts to
`/api/v1/chat/completions`, which returns 404. The route is `/v1/chat/completions`;
the inspection path used for these captures is `/api/v1/test/analyze`, and the
actor comes from a `user_email` field in the body (not a header).

## Open question for the team: a configured `mask` did not take effect

With `fast_pii_filter` and `contextual_pii_filter` both set to `action: mask`
(confirmed persisted via `GET /api/v1/policies`), and after a full gateway
restart, a prompt containing an email address still returned **block**.
`/api/v1/test/analyze-detailed` reported:

```
execution_report.policies_used[0] = {
  policy_id: "fast_pii_filter",
  policy_name: "Fast PII Detection",
  action: "block",            <-- policy record says "mask"
  matched_patterns: ["email_pattern"]
}
```

`internal/policy/fallback.go` resolves the verdict through
`actionFor(policyName)` and falls back to a hard block when the policy is
unknown — so a mismatch between the key the fast path reports
(`policy_name: "Fast PII Detection"`) and the key the registry is indexed by
(`policy_id: "fast_pii_filter"`) would produce exactly this. **Not confirmed** —
it needs someone who knows that lookup to check it.

It matters beyond the screenshots: the console shows `Mask` while the gateway
blocks, which is a console-vs-ledger integrity problem for a product whose pitch is
that the console is the control surface.

Policy actions were set back to `block` after testing; the stack was left as found.
The `policy_change` decisions from the flip and the restore remain on the chain,
as designed.

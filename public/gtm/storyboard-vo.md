# GovernVeil GTM Explainer — Storyboard & Voiceover (90s)

Visual source: `gtm-video/explainer.html` — open in Chrome, press **Play**, record
fullscreen at 1920×1080. Press **H** to hide/show the control bar; **Space**
pause/resume; **←/→** jump scenes; **R** restart.

Copy is drawn from `ai-gateway-clean/docs/website.md` and respects the messaging
guardrails there (no "control plane", masking led before blocking, browser path
claims outbound-masking only, no fear-selling).

| # | Time | Scene | On screen | Voiceover |
|---|------|-------|-----------|-----------|
| 1 | 0:00–0:08 | Hook (dark) | "Your teams are already using AI. / Do you know what's leaving?" | Your teams are already using AI. The question isn't whether — it's what's leaving your perimeter when they do. |
| 2 | 0:08–0:20 | Problem (3 cards) | Licence gap · blocking backfires · no evidence | Enterprise AI licences cover people in a browser — not your applications and agents calling model APIs directly. Traditional DLP just blocks, so people switch to personal devices. And when the auditor asks, there's no evidence either way. |
| 3 | 0:20–0:27 | Brand reveal (dark) | GovernVeil · "AI data-egress control & evidence. Self-hosted." | GovernVeil is AI data-egress control and evidence — self-hosted, running entirely inside your own environment. |
| 4 | 0:27–0:43 | How it works (animated flow) | Apps/people → gateway (access plane, detection ladder) → provider; verdict chips | Point your apps at one base URL. Every request passes an access check and a local detection ladder — one policy-adaptive model, every policy written as a plain-language question. Each request ends in a verdict — and every verdict is audited. |
| 5 | 0:43–0:58 | Verdicts in action (3 rows) | Clean prompt → **allow** · SSN in prompt → **redact** · injection → **block** | A clean request is forwarded untouched in milliseconds. A prompt carrying a customer's Social Security number goes out with the PII stripped — the real value never leaves. And a prompt-injection attempt is blocked cold, with a 403 that never crosses your perimeter. |
| 6 | 0:58–1:11 | Audit log (terminal, dark) | Three log lines — who, route, policy, verdict, latency; hashes chaining entry to entry | Every one of those verdicts lands in the audit log: who, what, which policy, the verdict, the latency. Each entry carries the previous entry's hash — tamper with one line and the chain breaks. Export it straight to your SIEM. |
| 7 | 1:11–1:21 | Proof (3 stats) | 0 false positives · millisecond checks · control-mapped evidence | The benchmarks are in the repo — re-run them yourself. Zero false positives on a hard PII lookalike set — order IDs and license keys shaped like real identifiers. Millisecond-scale checks, with the methodology published. Evidence mapped to the controls your auditor actually names. |
| 8 | 1:21–1:30 | CTA (dark) | "See it govern a real prompt in 90 seconds." · Book a pilot · governveil.com | See it govern a real prompt in ninety seconds. Book a pilot at governveil dot com. |

**VO length check:** ~200 words ≈ 88s at a measured 135 wpm — fits.

## Production notes
- **Record:** Chrome fullscreen (⌘⇧F), click *Recording mode*, press **R**, capture
  with QuickTime / ⌘⇧5 / OBS at 1080p. Scene timings are fixed, so VO can be laid
  over in any editor (CapCut, Descript, DaVinci).
- **VO:** ElevenLabs or self-record; the table rows above are the per-scene takes.
- **Music:** low, minimal, no build-drop clichés — the brand is calm infrastructure.
- **Cutdowns:** Scenes 5+8 alone = a 25s teaser; scenes 1+5+6+8 = a 40s LinkedIn cut
  (verdicts + audit log is the demo-ready story).
- **Claims audit:** verdict scenarios and chips show allow / review / redact /
  block only — masking does not appear anywhere (it is roadmap; redaction ships
  today), and the CTA says "govern", not "mask". The SSN example is a synthetic
  value. Copy is globalized (no India-specific identifiers on screen — the
  underlying published benchmark corpus is the Indian-PII lookalike set, so the
  "0 false positives" claim remains accurate, just described generically).
  Latency is genericized to "milliseconds" per the standing site-copy rule (no
  precise ms/F1 figures); the only concrete ms values are inside the depicted
  log lines, as log data, not claims. Log fields match the documented audit line
  (who, what, action, latency, hash chain); the log scene says "exportable to
  your SIEM" without naming Splunk/Sentinel (roadmap). Pricing intentionally
  omitted (numbers not final).

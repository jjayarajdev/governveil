# Sales deck

Twelve slides, built from the live governveil.com.au pages.
Source of truth is this folder; it publishes to a deck you can present,
page through and download.

```
sales/project/deck.json          the index: order, sections, typefaces
sales/project/slides/<id>.html   one file per slide, id = file name
```

Deck: https://claude.ai/code/artifact/01acebe6-a867-4824-808a-6a5478dfb4e6

## The run

| # | Slide | Does what |
|---|---|---|
| 1 | cover | the one-line proposition |
| 2 | problem | three reasons the current answer fails |
| 3 | whynow | APRA and ASIC — why this is a board item in Australia |
| 4 | shape | the architecture: four surfaces, one engine, one ledger |
| 5 | verdicts | allow / flag / mask / acknowledge / block |
| 6 | scenario | a TFN and a Medicare number, masked before they leave |
| 7 | benchmark | 93.25% recall at 100% precision, re-runnable |
| 8 | miss | the miss we published, and fixed the same day |
| 9 | residency | the signed attestation a security team can fetch |
| 10 | standards | built against Australian standards — and not certified |
| 11 | pilot | the five weeks, free for the first three |
| 12 | close | see it, check it, start it |

Speaker notes are in each slide's `<aside>`.

## Editing

Change the slide file, then republish that file to the deck URL. Changing
the order, adding or removing a slide also means editing `deck.json`.

## What is claimed, and what is not

Every number traces to the site or the product repository:

- **93.25% recall at 100% precision**, 746 of 800, combined-1000 corpus, run
  2026-09-02. Note the `eval/SCORECARD.md` regenerated on 31 Oct reports
  88.38% against the shipping detector; the site and this deck use the
  2 September figure by Jay's decision. If a prospect re-runs the harness
  today they may see the lower number — be ready for that.
- **Daily probes** — real: `probe_schedule_hour` defaults to 3.
- **~0.5 ms kill switch**, **sub-ms pattern path** — from the site.
- **The published miss**, 23 September 2026 — a real entry in
  DOC-ACCURACY-REPORT.md.
- **ABN 94 703 419 194** — GOVERNVEIL PTY LTD, verified against the ABR.
- **TFN, Medicare, ABN, ACN, BSB, driver's licence** — the detectors
  `fastpath/builtins.go` actually ships.

Deliberately NOT claimed anywhere: certifications (SOC 2 and IRAP are named
as roadmap), customers, logos, traction, revenue or market sizing. Slide 10
says "built against" means mapped and self-assessed. Slide 9 says egress
enforcement ships in observe mode. Keep both.

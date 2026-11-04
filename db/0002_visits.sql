-- Counting for the unlisted card pages.
--
-- First-party and cookieless on purpose: a company that sells "nothing leaves
-- your perimeter" cannot reasonably put Google Analytics on its own site. No
-- cookie, no device id, no IP stored — just a row per event. That is enough
-- to answer the only questions being asked: how many scanned, how many
-- watched, how many booked.
--
-- Because /demo and /connect are linked from nowhere, every hit on them is a
-- card scan. No tracking parameter is needed to attribute them.

CREATE TABLE IF NOT EXISTS visits (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  at      TEXT    NOT NULL,     -- ISO-8601 UTC
  site    TEXT    NOT NULL,
  path    TEXT    NOT NULL,     -- /demo, /connect
  event   TEXT    NOT NULL,     -- view | play | finish | cta
  label   TEXT,                 -- which demo was played, which CTA
  country TEXT,                 -- CF-IPCountry, coarse and not an identifier
  ua      TEXT                  -- mobile | desktop, nothing finer
);

CREATE INDEX IF NOT EXISTS idx_visits_at    ON visits (at DESC);
CREATE INDEX IF NOT EXISTS idx_visits_path  ON visits (path, event);

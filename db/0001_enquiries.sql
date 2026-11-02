-- Enquiries from the forms on both sites.
--
-- One table, both sites: `site` distinguishes them. Separate tables would
-- mean two schemas drifting apart, and every question worth asking ("who
-- applied this week") spans both anyway.
--
-- Nothing here is nullable-by-accident: email is the only field the endpoint
-- requires, so it is the only one NOT NULL.

CREATE TABLE IF NOT EXISTS enquiries (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  at         TEXT    NOT NULL,          -- ISO-8601 UTC, set by the worker
  site       TEXT    NOT NULL,          -- governveil.com | governveil.com.au
  page       TEXT,                      -- /partners, /pilot, …
  intent     TEXT,                      -- which button: "Apply to be a design partner"
  name       TEXT,
  email      TEXT    NOT NULL,
  org        TEXT,
  role       TEXT,
  size       TEXT,
  region     TEXT,
  sector     TEXT,
  question   TEXT,
  country    TEXT,                      -- CF-IPCountry, for context not targeting
  notified   TEXT                       -- which channels got it, or NULL
);

-- The three ways this gets read: newest first, by site, and by email when
-- someone writes in and you want their earlier submission.
CREATE INDEX IF NOT EXISTS idx_enquiries_at    ON enquiries (at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_site  ON enquiries (site, at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_email ON enquiries (email);

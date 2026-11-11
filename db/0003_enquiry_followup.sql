-- The finalised health-check and pilot questionnaires (2026-11-11).
--
-- concerns        the ticked options, joined with " | " in the order shown
-- concerns_other  free text when "Other" is ticked
-- follow_up       email | call
-- phone, call_time only when a call back was requested
--
-- Additive only: every existing row keeps working, and every older form
-- still posts without these fields.
ALTER TABLE enquiries ADD COLUMN concerns       TEXT;
ALTER TABLE enquiries ADD COLUMN concerns_other TEXT;
ALTER TABLE enquiries ADD COLUMN follow_up      TEXT;
ALTER TABLE enquiries ADD COLUMN phone          TEXT;
ALTER TABLE enquiries ADD COLUMN call_time      TEXT;

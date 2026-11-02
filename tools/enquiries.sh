#!/usr/bin/env bash
# Read the enquiries D1 holds. No dashboard, no export step.
#
#   ./tools/enquiries.sh              the 20 most recent, one block each
#   ./tools/enquiries.sh count        how many, by site and by day
#   ./tools/enquiries.sh au           governveil.com.au only
#   ./tools/enquiries.sh csv          CSV to stdout, for a spreadsheet
#   ./tools/enquiries.sh sql "..."    any query you like
set -euo pipefail
DB=governveil-enquiries
run() { npx wrangler d1 execute "$DB" --remote --command "$1"; }

case "${1:-recent}" in
  recent)
    run "SELECT at, site, intent, name, email, org, sector, question
         FROM enquiries ORDER BY at DESC LIMIT 20" ;;
  count)
    run "SELECT site, substr(at,1,10) AS day, COUNT(*) AS n
         FROM enquiries GROUP BY site, day ORDER BY day DESC, site" ;;
  au)
    run "SELECT at, intent, name, email, org, sector, question
         FROM enquiries WHERE site LIKE '%.com.au' ORDER BY at DESC LIMIT 20" ;;
  com)
    run "SELECT at, intent, name, email, org, role, size, region, question
         FROM enquiries WHERE site NOT LIKE '%.com.au' ORDER BY at DESC LIMIT 20" ;;
  csv)
    npx wrangler d1 execute "$DB" --remote --json --command \
      "SELECT * FROM enquiries ORDER BY at DESC" \
    | python3 -c "
import json,sys,csv
rows=json.load(sys.stdin)[0]['results']
if not rows: sys.exit('no enquiries yet')
w=csv.DictWriter(sys.stdout, fieldnames=list(rows[0].keys()))
w.writeheader(); w.writerows(rows)" ;;
  sql)
    run "${2:?usage: enquiries.sh sql \"SELECT ...\"}" ;;
  *)
    sed -n '2,10p' "$0" | sed 's/^# \{0,1\}//' ;;
esac

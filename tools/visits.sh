#!/usr/bin/env bash
# How many people scanned the card, and what they did.
#   ./tools/visits.sh            totals by page and event
#   ./tools/visits.sh daily      by day
#   ./tools/visits.sh demos      which walk-through was opened
#   ./tools/visits.sh recent     the last 30 raw events
set -euo pipefail
DB=governveil-enquiries
run(){ npx wrangler d1 execute "$DB" --remote --command "$1"; }
case "${1:-totals}" in
  totals) run "SELECT path, event, COUNT(*) n FROM visits GROUP BY path, event ORDER BY path, n DESC" ;;
  daily)  run "SELECT substr(at,1,10) day, path, COUNT(*) n FROM visits GROUP BY day, path ORDER BY day DESC" ;;
  demos)  run "SELECT label, COUNT(*) n FROM visits WHERE event='play' GROUP BY label ORDER BY n DESC" ;;
  recent) run "SELECT at, path, event, label, country, ua FROM visits ORDER BY id DESC LIMIT 30" ;;
  *)      sed -n '2,7p' "$0" | sed 's/^# \{0,1\}//' ;;
esac

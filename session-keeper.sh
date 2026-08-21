#!/bin/zsh
# Keeps a supplier portal session alive across reboots.
#
# The 20 Aug reboot killed the ThanksDoc keep-alive and nothing restarted it,
# so the session silently died and stayed dead. This script is the piece that
# was missing: it (re)launches the persistent Chrome if the debug port is not
# answering, then runs the keep-alive loop in the foreground so launchd can
# supervise and restart it.
#
#   ./session-keeper.sh thanksdoc   # port 9222, .td-session
#   ./session-keeper.sh nexus       # port 9223, .nexus-session

set -u
cd "$(dirname "$0")"

case "${1:-}" in
  thanksdoc)
    PORT=9222; PROFILE=".td-session"; KEEPALIVE="td-keepalive.js"
    URL="https://notes.thanksdoc.co.uk/dashboard" ;;
  nexus)
    PORT=9223; PROFILE=".nexus-session"; KEEPALIVE="nexus-keepalive.js"
    URL="https://nexus.randoxhealth.com/create-new-order-physician" ;;
  *)
    echo "usage: $0 {thanksdoc|nexus}" >&2; exit 2 ;;
esac

if ! curl -s -m 3 "http://127.0.0.1:$PORT/json/version" > /dev/null 2>&1; then
  echo "[$(date '+%H:%M:%S')] debug port $PORT not answering, launching Chrome ($PROFILE)"
  mkdir -p "$PROFILE"
  open -na "Google Chrome" --args \
    --remote-debugging-port="$PORT" \
    --user-data-dir="$PWD/$PROFILE" \
    --no-first-run --no-default-browser-check "$URL"
  sleep 8
fi

exec /opt/homebrew/bin/node "$KEEPALIVE"

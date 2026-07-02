#!/bin/bash
# Veridian LinkedIn daily post scheduler
# Reads schedule.json, finds next pending post, fires it, marks done.
# After MAX_ATTEMPTS consecutive failures on the same post, marks it "failed"
# (not "pending") so it stops blocking every post behind it, and pings Discord.
# Cron: 0 7 * * * /Users/tosin/.openclaw/workspace-main/veridian-clinic/scripts/linkedin-scheduler/post-next.sh

SCHEDULE="/Users/tosin/.openclaw/workspace-main/veridian-clinic/scripts/linkedin-scheduler/schedule.json"
LOG="/Users/tosin/.openclaw/workspace-main/veridian-clinic/scripts/linkedin-scheduler/post.log"
VERIDIAN_API="https://veridianclinic.com/api/social/post-with-image"
ADMIN_COOKIE="__va=d22570feac7c5531cbc032da70b0d35c04b038fe31f51c125b3d06fb02254e32"
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36"
DISCORD_WEBHOOK="https://discord.com/api/webhooks/1502920167410372741/UV23IXpraOv8PBaEq5av6h09txKmp2O51oFe_b2OEMVkNeYxi29KpAe0_lAFicgwZLxs"
MAX_ATTEMPTS=3

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG"
}

alert_discord() {
  curl -s -X POST "$DISCORD_WEBHOOK" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"🔴 **LinkedIn Scheduler** | $1\"}" >/dev/null 2>&1
}

log "=== LinkedIn scheduler run ==="

# Find the next pending post
PENDING=$(python3 -c "
import json, sys
with open('$SCHEDULE') as f:
    posts = json.load(f)
pending = [p for p in posts if p.get('status') == 'pending']
if pending:
    print(json.dumps(pending[0]))
")

if [ -z "$PENDING" ]; then
  log "No pending posts. Schedule complete."
  exit 0
fi

TOPIC=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['topic'])")
DATE=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['date'])")
DAY=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['day'])")
IMAGE_URL=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); v=d.get('image_url'); print(v if v and v != 'None' else '')")
CONTENT=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d['content'])")
ATTEMPTS=$(echo "$PENDING" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('attempts', 0))")

# Only post if today >= scheduled date
TODAY=$(date '+%Y-%m-%d')
if [[ "$TODAY" < "$DATE" ]]; then
  log "Day $DAY ($TOPIC) scheduled for $DATE — too early, skipping."
  exit 0
fi

log "Posting Day $DAY: $TOPIC (scheduled $DATE, attempt $((ATTEMPTS + 1)))"

# Post to LinkedIn via Veridian API (include imageUrl only if we have one)
if [ -n "$IMAGE_URL" ]; then
  RESPONSE=$(curl -s --max-time 60 -X POST "$VERIDIAN_API" \
    -H "Cookie: $ADMIN_COOKIE" \
    -A "$UA" \
    -F "content=$CONTENT" \
    -F "imageUrl=$IMAGE_URL")
else
  RESPONSE=$(curl -s --max-time 60 -X POST "$VERIDIAN_API" \
    -H "Cookie: $ADMIN_COOKIE" \
    -A "$UA" \
    -F "content=$CONTENT")
fi

POST_ID=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('postId',''))" 2>/dev/null)
WARNING=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.loads(sys.stdin.read()); print(d.get('warning',''))" 2>/dev/null)

if [ -n "$POST_ID" ]; then
  log "SUCCESS — Post ID: $POST_ID"
  if [ -n "$WARNING" ]; then
    log "WARNING — $WARNING"
    alert_discord "Day $DAY ($TOPIC) posted, but with a warning: $WARNING"
  fi
  # Mark as posted in schedule.json
  python3 -c "
import json, sys
from datetime import datetime
with open('$SCHEDULE') as f:
    posts = json.load(f)
for p in posts:
    if p.get('day') == $DAY:
        p['status'] = 'posted'
        p['posted_at'] = datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ')
        p['post_id'] = '$POST_ID'
        break
with open('$SCHEDULE', 'w') as f:
    json.dump(posts, f, indent=2)
print('Schedule updated')
"
else
  NEW_ATTEMPTS=$((ATTEMPTS + 1))
  log "FAILED (attempt $NEW_ATTEMPTS/$MAX_ATTEMPTS) — Response: $RESPONSE"

  if [ "$NEW_ATTEMPTS" -ge "$MAX_ATTEMPTS" ]; then
    log "Day $DAY has failed $NEW_ATTEMPTS times — marking as 'failed' and moving on so it stops blocking the queue."
    alert_discord "Day $DAY ($TOPIC) failed $NEW_ATTEMPTS times and has been marked 'failed'. It will NOT post automatically. Response: ${RESPONSE:-<empty>}"
    python3 -c "
import json
with open('$SCHEDULE') as f:
    posts = json.load(f)
for p in posts:
    if p.get('day') == $DAY:
        p['status'] = 'failed'
        p['attempts'] = $NEW_ATTEMPTS
        break
with open('$SCHEDULE', 'w') as f:
    json.dump(posts, f, indent=2)
"
  else
    python3 -c "
import json
with open('$SCHEDULE') as f:
    posts = json.load(f)
for p in posts:
    if p.get('day') == $DAY:
        p['attempts'] = $NEW_ATTEMPTS
        break
with open('$SCHEDULE', 'w') as f:
    json.dump(posts, f, indent=2)
"
  fi
  exit 1
fi

log "Done"

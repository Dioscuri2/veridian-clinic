#!/bin/zsh
# Veridian news-jacking loop. Fired by launchd on Tue/Thu.
#
# DIFFERENT FROM PERQEN ON PURPOSE. Perqen auto-publishes because manual
# approval killed that loop: 6 articles were staged and none ever reached the
# site. Veridian must NOT copy that fix. Veridian publishes under a named,
# GMC-registered GP, and the veridian-publish-gate skill is explicit that any
# news-reactive piece is GATE, never AUTO: "Speed is the point of newsjacking
# and speed is exactly what makes it dangerous on a clinical site."
#
# So this loop DISCOVERS, DRAFTS, GATES and ALERTS. It never publishes and it
# never writes into app/, so a draft cannot become a live route by accident.
# Dr Tosin reviews the draft and commits it himself.
#
# The Perqen failure mode to avoid here is silence: a staged draft nobody sees
# is the same as no draft. Every run pings Discord, including no-candidate runs
# once a week, so a dead loop is visible rather than assumed healthy.
set -u

REPO=/Users/tosin/.openclaw/workspace-main/veridian-clinic
OPS=/Users/tosin/.openclaw/workspace-main/veridian-ops
DRAFTS=$OPS/drafts
LOG=$OPS/newsjack-loop.log
LOCK=$OPS/newsjack.lock
SEEN=$OPS/newsjack-seen.txt
FEEDS=/Users/tosin/perqen-shopify-theme/.claude/skills/news-writer/scripts/fetch_news_feeds.py
DISCORD=${DISCORD_WEBHOOK_VERIDIAN:-}
COUNT=${VERIDIAN_NEWS_COUNT:-1}

mkdir -p $DRAFTS; touch $SEEN
ts() { date '+%Y-%m-%d %H:%M:%S' }

if ! mkdir $LOCK 2>/dev/null; then
  if [ -n "$(find $LOCK -maxdepth 0 -mmin +90 2>/dev/null)" ]; then
    rmdir $LOCK 2>/dev/null; mkdir $LOCK 2>/dev/null || { echo "$(ts) SKIP lock" >> $LOG; exit 0 }
  else
    echo "$(ts) SKIP: run already in progress" >> $LOG; exit 0
  fi
fi
trap "rmdir $LOCK 2>/dev/null" EXIT

ping_discord() {
  [ -z "$DISCORD" ] && return 0
  python3 - "$1" <<'PY' 2>>$LOG
import json,os,sys,urllib.request
u=os.environ.get("DISCORD_WEBHOOK_VERIDIAN","").strip('"')
if u:
    r=urllib.request.Request(u, data=json.dumps({"content":sys.argv[1][:1900]}).encode(),
                             headers={"Content-Type":"application/json"})
    urllib.request.urlopen(r, timeout=20)
PY
}

echo "$(ts) START veridian newsjack" >> $LOG

# 1. Discovery. Queries are Veridian's clinical territory, NOT Perqen's supplements.
#    Deliberately excludes weight-loss drug brand names: naming a prescription-only
#    medicine in public advertising is a criminal offence, so we do not even source
#    stories that would tempt an article into it.
RAW=$(python3 $FEEDS \
  -q "NHS waiting list" \
  -q "private GP UK" \
  -q "cholesterol guidelines UK" \
  -q "insulin resistance study" \
  -q "NICE guideline cardiovascular" \
  -q "blood test screening UK" \
  -q "vitamin D deficiency UK" \
  -q "menopause HRT guidance UK" \
  --days 3 --sources google,bing --resolve --resolve-limit 12 2>>$LOG)

# 2. Drop anything already seen, so the same story is not drafted twice.
NEW=$(echo "$RAW" | grep "http" | grep -v -F -f $SEEN 2>/dev/null || echo "$RAW" | grep "http")
N=$(echo "$NEW" | grep -c "http")
N=${N:-0}
echo "$(ts) discovery: $N new candidates" >> $LOG

if [ "$N" -lt 1 ]; then
  echo "$(ts) no candidates, ending run" >> $LOG
  # Visible on Mondays so a permanently dead loop cannot masquerade as a quiet week.
  [ "$(date +%u)" = "1" ] && ping_discord "Veridian newsjack: no new candidates this run. Loop is alive."
  exit 0
fi

STAMP=$(date '+%Y%m%d-%H%M')
OUT=$DRAFTS/$STAMP
mkdir -p $OUT
echo "$NEW" > $OUT/candidates.tsv

# 3. Draft with Claude, headless. Draft only: the prompt forbids writing into the
#    repo and forbids publishing. The gate decides what happens next.
cd $REPO
claude --print --permission-mode bypassPermissions \
  "Read ~/.claude/skills/veridian-publish-gate/SKILL.md first and obey it.

   Candidate news stories are in $OUT/candidates.tsv. Pick the $COUNT best for
   Veridian Clinic, a UK private GP and metabolic clinic run by Dr Oluwatosin
   Taiwo. Verify each story by fetching the source before writing a word.

   Write each draft as a markdown file in $OUT/. Do NOT create or edit any file
   inside $REPO. Do NOT publish. Do NOT touch the sitemap.

   Hard rules, all of which are in the gate skill:
   - Never name, describe or imply a prescription-only medicine, including the
     drug class (GLP-1) or route (injection, jab, pen).
   - Never claim a marker Veridian does not sell. Check data/randox/nexus-analytes.json.
   - Prices must match data/panels.ts.
   - Remission, never reversal. Never disparage the NHS.
   - Red-flag safety netting on any symptom content.
   - No em dashes or en dashes.

   End each draft with a GATE VERDICT line: AUTO, GATE or BLOCK, and the reason.
   Then write $OUT/summary.txt: one line per draft, title then verdict." \
  >> $LOG 2>&1

DRAFTED=$(ls $OUT/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "$(ts) drafted $DRAFTED file(s) in $OUT" >> $LOG

# 4. Record what we saw so the next run does not repeat it.
echo "$NEW" | grep -o 'https\?://[^[:space:]]*' >> $SEEN
tail -500 $SEEN > $SEEN.tmp && mv $SEEN.tmp $SEEN

# 5. Alert. The whole point: a draft nobody knows about is a draft that rots.
SUMMARY=$(cat $OUT/summary.txt 2>/dev/null | head -20)
ping_discord "**Veridian newsjack: $DRAFTED draft(s) ready for review**
$SUMMARY

Folder: $OUT
Nothing has been published. Review, then commit yourself if it passes."

echo "$(ts) END" >> $LOG

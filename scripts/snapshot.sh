#!/bin/bash
# snapshot.sh — create a named stable snapshot before major changes
# Usage:
#   ./scripts/snapshot.sh              → auto-name: stable-YYYY-MM-DD
#   ./scripts/snapshot.sh "pre-quiz-redesign"  → custom name
#
# To restore from a snapshot:
#   git checkout <tag-name>         → inspect the code
#   git checkout -b restore-branch  → create a branch from it
#   git push origin restore-branch  → push to Railway
#   (then in Railway dashboard, point to restore-branch or push to master)

set -e

TAG="${1:-stable-$(date +%Y-%m-%d)}"

# Check for uncommitted changes
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo ""
  echo "⚠️  You have uncommitted changes."
  echo "   Commit them first, or they won't be included in the snapshot."
  echo ""
  git status --short
  echo ""
  read -p "Snapshot anyway (tags current HEAD, not working tree)? [y/N] " confirm
  [[ "$confirm" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }
fi

git tag "$TAG"
git push origin "$TAG"

echo ""
echo "✅ Snapshot created: $TAG"
echo ""
echo "To restore this snapshot if something breaks:"
echo "  git checkout $TAG"
echo "  git checkout -b restore-from-$TAG"
echo "  git push origin restore-from-$TAG"
echo "  # Then deploy restore-from-$TAG from Railway dashboard"
echo ""
echo "All your snapshots:"
git tag -l "stable-*" | sort -r | head -10

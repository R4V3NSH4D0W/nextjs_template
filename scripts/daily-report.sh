#!/bin/bash

# Daily changelog report generator
echo "📊 Daily Changelog Report - $(date +"%Y-%m-%d")"
echo "============================================="
echo ""

# Get today's commits with author and date info
TODAY=$(date +"%Y-%m-%d")
TODAYS_COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short --since="$TODAY 00:00:00" --until="$TODAY 23:59:59")

if [[ -z "$TODAYS_COMMITS" ]]; then
    echo "ℹ️ No commits found for today ($TODAY)"
    exit 0
fi

echo "📅 Commits for $TODAY:"
echo ""

# Initialize counters
FEAT_COUNT=0
FIX_COUNT=0
OTHER_COUNT=0

# Process and display commits
while IFS='|' read -r hash author date message; do
    if [[ -z "$hash" || "$message" == "Merge"* ]]; then
        continue
    fi
    
    # Categorize and count
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        echo "✨ FEATURE: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        ((FEAT_COUNT++))
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        echo "🐛 BUGFIX: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        ((FIX_COUNT++))
    else
        echo "🔧 OTHER: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        ((OTHER_COUNT++))
    fi
    echo ""
    
done <<< "$TODAYS_COMMITS"

# Summary
TOTAL_COUNT=$((FEAT_COUNT + FIX_COUNT + OTHER_COUNT))
echo "📈 Summary for $TODAY:"
echo "   Total commits: $TOTAL_COUNT"
echo "   ✨ Features: $FEAT_COUNT"
echo "   🐛 Bug fixes: $FIX_COUNT"
echo "   🔧 Other: $OTHER_COUNT"
echo ""

# Check if changelog needs updating
echo "💡 To update the changelog with recent commits, run:"
echo "   npm run changelog"

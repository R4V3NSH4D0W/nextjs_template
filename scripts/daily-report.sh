#!/bin/bash

# Enhanced daily changelog report generator with per-contributor files
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

# Create daily reports directory
mkdir -p changelogs/daily
mkdir -p changelogs/daily/contributors

echo "📅 Commits for $TODAY:"
echo ""

# Initialize counters
FEAT_COUNT=0
FIX_COUNT=0
OTHER_COUNT=0

# Create temp files for contributor separation
TEMP_DIR=$(mktemp -d)
AUTHORS_FILE="$TEMP_DIR/authors.txt"
touch "$AUTHORS_FILE"

# Process and display commits + separate by contributor
while IFS='|' read -r hash author date message; do
    if [[ -z "$hash" || "$message" == "Merge"* ]]; then
        continue
    fi
    
    # Normalize author name for filename
    AUTHOR_KEY=$(echo "$author" | sed 's/[^a-zA-Z0-9]/_/g' | tr '[:upper:]' '[:lower:]')
    
    # Add author to list if not already there
    if ! grep -q "$AUTHOR_KEY|$author" "$AUTHORS_FILE"; then
        echo "$AUTHOR_KEY|$author" >> "$AUTHORS_FILE"
    fi
    
    # Create contributor files if they don't exist
    touch "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
    
    # Categorize and count
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        echo "✨ FEATURE: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        echo "✨ FEATURE: $message ($hash)" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
        ((FEAT_COUNT++))
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        echo "🐛 BUGFIX: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        echo "🐛 BUGFIX: $message ($hash)" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
        ((FIX_COUNT++))
    else
        echo "🔧 OTHER: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        echo "🔧 OTHER: $message ($hash)" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
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

# Generate daily aggregate report
DAILY_REPORT_FILE="changelogs/daily/${TODAY}.md"
cat > "$DAILY_REPORT_FILE" << EOF
# Daily Report - $TODAY

## Summary
- **Total commits:** $TOTAL_COUNT
- **Features:** $FEAT_COUNT
- **Bug fixes:** $FIX_COUNT  
- **Other changes:** $OTHER_COUNT

## All Commits

EOF

# Add all commits to daily report
while IFS='|' read -r hash author date message; do
    if [[ -z "$hash" || "$message" == "Merge"* ]]; then
        continue
    fi
    
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        echo "- ✨ **$message** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        echo "- 🐛 **$message** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
    else
        echo "- 🔧 **$message** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
    fi
done <<< "$TODAYS_COMMITS"

echo "" >> "$DAILY_REPORT_FILE"
echo "---" >> "$DAILY_REPORT_FILE"
echo "*Generated on $(date)*" >> "$DAILY_REPORT_FILE"

# Generate per-contributor daily reports
CONTRIBUTOR_COUNT=0
while IFS='|' read -r author_key author_name; do
    [[ -z "$author_key" ]] && continue
    
    contributor_file="changelogs/daily/contributors/${TODAY}-${author_key}.md"
    commit_count=$(wc -l < "$TEMP_DIR/${author_key}_commits.txt" 2>/dev/null || echo "0")
    
    if [[ "$commit_count" -gt 0 ]]; then
        echo "📝 Generating daily report for ${author_name}..."
        
        cat > "$contributor_file" << EOF
# Daily Report for ${author_name} - $TODAY

## Summary
- **Commits today:** $commit_count

## Commits

EOF
        
        # Add contributor's commits
        while IFS= read -r commit_line; do
            echo "- $commit_line" >> "$contributor_file"
        done < "$TEMP_DIR/${author_key}_commits.txt"
        
        echo "" >> "$contributor_file"
        echo "---" >> "$contributor_file"
        echo "*Generated on $(date)*" >> "$contributor_file"
        
        ((CONTRIBUTOR_COUNT++))
    fi
done < "$AUTHORS_FILE"

# Clean up temp directory
rm -rf "$TEMP_DIR"

echo "✅ Daily reports generated:"
echo "   📄 Aggregate report: $DAILY_REPORT_FILE"
echo "   👥 Contributor reports: $CONTRIBUTOR_COUNT files in changelogs/daily/contributors/"
echo ""

# Check if changelog needs updating
echo "💡 To update the changelog with recent commits, run:"
echo "   npm run changelog"

#!/bin/bash

# Unified daily changelog generator for contributors
# Combines both terminal output and file generation

echo "📊 Daily Changelog Generator - $(date +"%Y-%m-%d")"
echo "=================================================="
echo ""

# Create directories and initialize if needed
mkdir -p changelogs/daily/contributors

# Create changelogs README if it doesn't exist
if [[ ! -f "changelogs/README.md" ]]; then
    cat > changelogs/README.md << 'EOF'
# Daily Changelogs

This directory contains automatically generated daily development reports.

## Structure

- `daily/` - Daily changelog reports organized by date
- `daily/contributors/` - Individual contributor reports organized by date and author

## Usage

Generate today's changelog:

```bash
npm run daily-report
```

## Automation

This system automatically:
- Categorizes commits (feat, fix, other)
- Tracks contributor activity
- Generates structured reports
- Maintains historical records

Reports are generated automatically via GitHub Actions or can be run manually.
EOF
    echo "📁 Created changelogs/README.md"
fi

# Get today's date and commits
TODAY=$(date +"%Y-%m-%d")
TODAYS_COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short --since="$TODAY 00:00:00" --until="$TODAY 23:59:59")

if [[ -z "$TODAYS_COMMITS" ]]; then
    echo "ℹ️ No commits found for today ($TODAY)"
    exit 0
fi

# Initialize temp files and counters
TEMP_DIR=$(mktemp -d)
AUTHORS_FILE="$TEMP_DIR/authors.txt"
touch "$AUTHORS_FILE"
FEAT_COUNT=0
FIX_COUNT=0
OTHER_COUNT=0

echo "📅 Processing commits for $TODAY..."

# Process commits and display to terminal
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
    
    # Categorize, display, and save
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^feat[^:]*: *//')
        echo "✨ FEATURE: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        FILE_ENTRY="- ✨ **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*"
        echo "$FILE_ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
        ((FEAT_COUNT++))
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^fix[^:]*: *//')
        echo "🐛 BUGFIX: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        FILE_ENTRY="- 🐛 **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*"
        echo "$FILE_ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
        ((FIX_COUNT++))
    else
        DESC=$(echo "$message" | sed 's/^[^:]*: *//')
        echo "🔧 OTHER: $message"
        echo "   👤 Author: $author | 🔗 Commit: $hash"
        FILE_ENTRY="- 🔧 **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*"
        echo "$FILE_ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_commits.txt"
        ((OTHER_COUNT++))
    fi
    echo ""
    
done <<< "$TODAYS_COMMITS"

# Display summary
TOTAL_COUNT=$((FEAT_COUNT + FIX_COUNT + OTHER_COUNT))
echo "📈 Summary for $TODAY:"
echo "   Total commits: $TOTAL_COUNT"
echo "   ✨ Features: $FEAT_COUNT"
echo "   🐛 Bug fixes: $FIX_COUNT"
echo "   🔧 Other: $OTHER_COUNT"
echo ""

# Generate daily aggregate report
DAILY_REPORT_FILE="changelogs/daily/${TODAY}.md"
echo "📊 Generating daily aggregate report..."

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
        DESC=$(echo "$message" | sed 's/^feat[^:]*: *//')
        echo "- ✨ **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^fix[^:]*: *//')
        echo "- 🐛 **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
    else
        DESC=$(echo "$message" | sed 's/^[^:]*: *//')
        echo "- 🔧 **${DESC}** ([${hash}](../../commit/${hash})) - *${author}*" >> "$DAILY_REPORT_FILE"
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
            echo "$commit_line" >> "$contributor_file"
        done < "$TEMP_DIR/${author_key}_commits.txt"
        
        echo "" >> "$contributor_file"
        echo "---" >> "$contributor_file"
        echo "*Generated on $(date)*" >> "$contributor_file"
        
        ((CONTRIBUTOR_COUNT++))
    fi
done < "$AUTHORS_FILE"

# Update main changelogs index
cat > changelogs/README.md << 'EOF'
# Daily Changelogs by Contributor

This directory contains daily changelog files for each contributor organized by date.

## How It Works

- **Daily aggregate reports**: `daily/{YYYY-MM-DD}.md` - All commits for a specific day
- **Per-contributor reports**: `daily/contributors/{YYYY-MM-DD}-{username}.md` - Individual daily activity

## Generate Daily Reports

Daily reports are automatically generated via GitHub Actions, but you can also run:

```bash
npm run daily-report
```

## Today's Reports

EOF

# Add links to today's reports if they exist
if [[ -f "$DAILY_REPORT_FILE" ]]; then
    echo "- [📊 Today's Aggregate Report](./daily/${TODAY}.md)" >> changelogs/README.md
fi

if [[ $CONTRIBUTOR_COUNT -gt 0 ]]; then
    echo "- 👥 **Individual Reports:**" >> changelogs/README.md
    while IFS='|' read -r author_key author_name; do
        [[ -z "$author_key" ]] && continue
        contributor_file="changelogs/daily/contributors/${TODAY}-${author_key}.md"
        if [[ -f "$contributor_file" ]]; then
            echo "  - [${author_name}](./daily/contributors/${TODAY}-${author_key}.md)" >> changelogs/README.md
        fi
    done < "$AUTHORS_FILE"
fi

echo "" >> changelogs/README.md
echo "## Navigation" >> changelogs/README.md
echo "" >> changelogs/README.md
echo "- 📁 [View all daily reports](./daily/)" >> changelogs/README.md
echo "- 👥 [View all contributor reports](./daily/contributors/)" >> changelogs/README.md

# Clean up
rm -rf "$TEMP_DIR"

# Final output
echo "✅ Daily reports generated successfully!"
echo "   📄 Aggregate report: $DAILY_REPORT_FILE"
echo "   👥 Contributor reports: $CONTRIBUTOR_COUNT files"
echo "   📊 Total commits processed: $TOTAL_COUNT"
echo ""
echo "💡 Daily reports are automatically updated via GitHub Actions!"

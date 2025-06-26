#!/bin/bash

# Enhanced changelog automation with author and timestamp info
echo "📝 Updating changelog from recent commits with author and date info..."

# Get recent commits since last tag or last 10 commits with detailed info
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    # Format: hash|author|date|message
    COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short -10 --reverse)
else
    COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short "${LAST_TAG}..HEAD")
fi

# Initialize sections
ADDED_SECTION=""
CHANGED_SECTION=""
FIXED_SECTION=""

# Process commits
while IFS='|' read -r hash author date message; do
    if [[ -z "$hash" || "$message" == "Merge"* ]]; then
        continue
    fi
    
    # Simple categorization with author and date info
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^feat[^:]*: *//')
        ADDED_SECTION="${ADDED_SECTION}- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"$'\n'
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^fix[^:]*: *//')
        FIXED_SECTION="${FIXED_SECTION}- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"$'\n'
    elif [[ "$message" == docs:* || "$message" == style:* || "$message" == refactor:* || "$message" == chore:* ]]; then
        DESC=$(echo "$message" | sed 's/^[^:]*: *//')
        CHANGED_SECTION="${CHANGED_SECTION}- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"$'\n'
    fi
    
done <<< "$COMMITS"

# Build new content for unreleased section
NEW_UNRELEASED=""
if [[ -n "$ADDED_SECTION" ]]; then
    NEW_UNRELEASED="${NEW_UNRELEASED}### Added"$'\n\n'"${ADDED_SECTION}"$'\n'
fi
if [[ -n "$CHANGED_SECTION" ]]; then
    NEW_UNRELEASED="${NEW_UNRELEASED}### Changed"$'\n\n'"${CHANGED_SECTION}"$'\n'
fi
if [[ -n "$FIXED_SECTION" ]]; then
    NEW_UNRELEASED="${NEW_UNRELEASED}### Fixed"$'\n\n'"${FIXED_SECTION}"$'\n'
fi

# Add empty sections
NEW_UNRELEASED="${NEW_UNRELEASED}### Deprecated"$'\n\n''### Removed'$'\n\n''### Security'$'\n'

if [[ -n "$ADDED_SECTION" || -n "$CHANGED_SECTION" || -n "$FIXED_SECTION" ]]; then
    # Update CHANGELOG.md by replacing content after [Unreleased] until next version
    if [[ -f "CHANGELOG.md" ]]; then
        # Create backup
        cp CHANGELOG.md CHANGELOG.md.bak
        
        # Replace the unreleased section using a simpler approach
        # Find line numbers for unreleased section
        UNRELEASED_LINE=$(grep -n "^## \[Unreleased\]" CHANGELOG.md.bak | cut -d: -f1)
        NEXT_VERSION_LINE=$(tail -n +$((UNRELEASED_LINE + 1)) CHANGELOG.md.bak | grep -n "^## \[" | head -1 | cut -d: -f1)
        
        if [[ -n "$NEXT_VERSION_LINE" ]]; then
            NEXT_VERSION_LINE=$((UNRELEASED_LINE + NEXT_VERSION_LINE))
            # Print everything before unreleased, then new content, then everything after next version
            head -n "$UNRELEASED_LINE" CHANGELOG.md.bak > CHANGELOG.md
            echo "" >> CHANGELOG.md
            printf "%s" "$NEW_UNRELEASED" >> CHANGELOG.md
            tail -n +$((NEXT_VERSION_LINE)) CHANGELOG.md.bak >> CHANGELOG.md
        else
            # No other versions, just replace everything after unreleased
            head -n "$UNRELEASED_LINE" CHANGELOG.md.bak > CHANGELOG.md
            echo "" >> CHANGELOG.md
            printf "%s" "$NEW_UNRELEASED" >> CHANGELOG.md
        fi
        
        rm CHANGELOG.md.bak
        echo "✅ Changelog updated with new commits!"
    else
        echo "❌ CHANGELOG.md not found"
        exit 1
    fi
else
    echo "ℹ️ No conventional commits found to update changelog"
fi

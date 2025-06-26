#!/bin/bash

# Ultra-simple changelog automation
echo "📝 Updating changelog from recent commits..."

# Get recent commits since last tag or last 10 commits
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    COMMITS=$(git log --oneline -10 --reverse)
else
    COMMITS=$(git log --oneline "${LAST_TAG}..HEAD")
fi

# Initialize sections
ADDED_SECTION=""
CHANGED_SECTION=""
FIXED_SECTION=""

# Process commits
while IFS= read -r line; do
    if [[ -z "$line" || "$line" == "Merge"* ]]; then
        continue
    fi
    
    HASH=$(echo "$line" | awk '{print $1}')
    MESSAGE=$(echo "$line" | cut -d' ' -f2-)
    
    # Simple categorization
    if [[ "$MESSAGE" == feat:* || "$MESSAGE" == feat\(*\):* ]]; then
        DESC=$(echo "$MESSAGE" | sed 's/^feat[^:]*: *//')
        ADDED_SECTION="${ADDED_SECTION}- ${DESC} ([${HASH}](../../commit/${HASH}))"$'\n'
    elif [[ "$MESSAGE" == fix:* || "$MESSAGE" == fix\(*\):* ]]; then
        DESC=$(echo "$MESSAGE" | sed 's/^fix[^:]*: *//')
        FIXED_SECTION="${FIXED_SECTION}- ${DESC} ([${HASH}](../../commit/${HASH}))"$'\n'
    elif [[ "$MESSAGE" == docs:* || "$MESSAGE" == style:* || "$MESSAGE" == refactor:* || "$MESSAGE" == chore:* ]]; then
        DESC=$(echo "$MESSAGE" | sed 's/^[^:]*: *//')
        CHANGED_SECTION="${CHANGED_SECTION}- ${DESC} ([${HASH}](../../commit/${HASH}))"$'\n'
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
        
        # Replace the unreleased section
        awk -v new_content="$NEW_UNRELEASED" '
        /^## \[Unreleased\]/ {
            print $0
            print ""
            print new_content
            skip = 1
            next
        }
        /^## \[/ && skip {
            skip = 0
            print $0
            next
        }
        !skip { print $0 }
        ' CHANGELOG.md.bak > CHANGELOG.md
        
        rm CHANGELOG.md.bak
        echo "✅ Changelog updated with new commits!"
    else
        echo "❌ CHANGELOG.md not found"
        exit 1
    fi
else
    echo "ℹ️ No conventional commits found to update changelog"
fi

#!/bin/bash

# Enhanced changelog automation with user-based separation to avoid merge conflicts
echo "📝 Updating changelog from recent commits with user separation..."

# Create changelogs directory if it doesn't exist
mkdir -p changelogs

# Get recent commits since last tag or last 10 commits with detailed info
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    # Format: hash|author|date|message
    COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short -10 --reverse)
else
    COMMITS=$(git log --pretty=format:"%h|%an|%ad|%s" --date=short "${LAST_TAG}..HEAD")
fi

# Create temp files for each section to avoid associative array issues
TEMP_DIR=$(mktemp -d)
AUTHORS_FILE="$TEMP_DIR/authors.txt"
touch "$AUTHORS_FILE"

# Initialize sections
COMBINED_ADDED=""
COMBINED_CHANGED=""
COMBINED_FIXED=""

# Process commits and separate by author
while IFS='|' read -r hash author date message; do
    if [[ -z "$hash" || "$message" == "Merge"* ]]; then
        continue
    fi
    
    # Normalize author name for filename (remove spaces, special chars)
    AUTHOR_KEY=$(echo "$author" | sed 's/[^a-zA-Z0-9]/_/g' | tr '[:upper:]' '[:lower:]')
    
    # Add author to list if not already there
    if ! grep -q "$AUTHOR_KEY|$author" "$AUTHORS_FILE"; then
        echo "$AUTHOR_KEY|$author" >> "$AUTHORS_FILE"
    fi
    
    # Create section files for this author if they don't exist
    touch "$TEMP_DIR/${AUTHOR_KEY}_added.txt"
    touch "$TEMP_DIR/${AUTHOR_KEY}_changed.txt"  
    touch "$TEMP_DIR/${AUTHOR_KEY}_fixed.txt"
    
    # Categorize commits by author
    if [[ "$message" == feat:* || "$message" == feat\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^feat[^:]*: *//')
        ENTRY="- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"
        echo "$ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_added.txt"
        COMBINED_ADDED+="$ENTRY"$'\n'
    elif [[ "$message" == fix:* || "$message" == fix\(*\):* ]]; then
        DESC=$(echo "$message" | sed 's/^fix[^:]*: *//')
        ENTRY="- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"
        echo "$ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_fixed.txt"
        COMBINED_FIXED+="$ENTRY"$'\n'
    elif [[ "$message" == docs:* || "$message" == style:* || "$message" == refactor:* || "$message" == chore:* ]]; then
        DESC=$(echo "$message" | sed 's/^[^:]*: *//')
        ENTRY="- **${DESC}** ([${hash}](../../commit/${hash})) - *${author}* on ${date}"
        echo "$ENTRY" >> "$TEMP_DIR/${AUTHOR_KEY}_changed.txt"
        COMBINED_CHANGED+="$ENTRY"$'\n'
    fi
    
done <<< "$COMMITS"

# Generate individual author changelog files
while IFS='|' read -r author_key author_name; do
    [[ -z "$author_key" ]] && continue
    
    changelog_file="changelogs/CHANGELOG-${author_key}.md"
    
    echo "📝 Generating changelog for ${author_name}..."
    
    # Create individual changelog
    cat > "$changelog_file" << EOF
# Changelog for ${author_name}

All changes made by ${author_name} are documented in this file.

## [Unreleased]

EOF

    # Add sections if they have content
    if [[ -s "$TEMP_DIR/${author_key}_added.txt" ]]; then
        echo "### Added" >> "$changelog_file"
        echo "" >> "$changelog_file"
        cat "$TEMP_DIR/${author_key}_added.txt" >> "$changelog_file"
        echo "" >> "$changelog_file"
    fi
    
    if [[ -s "$TEMP_DIR/${author_key}_changed.txt" ]]; then
        echo "### Changed" >> "$changelog_file"
        echo "" >> "$changelog_file"
        cat "$TEMP_DIR/${author_key}_changed.txt" >> "$changelog_file"
        echo "" >> "$changelog_file"
    fi
    
    if [[ -s "$TEMP_DIR/${author_key}_fixed.txt" ]]; then
        echo "### Fixed" >> "$changelog_file"
        echo "" >> "$changelog_file"
        cat "$TEMP_DIR/${author_key}_fixed.txt" >> "$changelog_file"
        echo "" >> "$changelog_file"
    fi
    
    # Add empty sections
    cat >> "$changelog_file" << EOF
### Deprecated

### Removed

### Security
EOF

done < "$AUTHORS_FILE"

# Now generate the main aggregated changelog
echo "📝 Generating main aggregated changelog..."

# Build new content for main unreleased section
NEW_UNRELEASED=""
if [[ -n "$COMBINED_ADDED" ]]; then
    NEW_UNRELEASED+="### Added"$'\n\n'"${COMBINED_ADDED}"$'\n'
fi
if [[ -n "$COMBINED_CHANGED" ]]; then
    NEW_UNRELEASED+="### Changed"$'\n\n'"${COMBINED_CHANGED}"$'\n'
fi
if [[ -n "$COMBINED_FIXED" ]]; then
    NEW_UNRELEASED+="### Fixed"$'\n\n'"${COMBINED_FIXED}"$'\n'
fi

# Add empty sections
NEW_UNRELEASED+="### Deprecated"$'\n\n''### Removed'$'\n\n''### Security'$'\n'

if [[ -n "$COMBINED_ADDED" || -n "$COMBINED_CHANGED" || -n "$COMBINED_FIXED" ]]; then
    # Create CHANGELOG.md if it doesn't exist
    if [[ ! -f "CHANGELOG.md" ]]; then
        echo "📝 Creating main CHANGELOG.md..."
        cat > CHANGELOG.md << 'EOF'
# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security
EOF
    fi
    
    # Update main CHANGELOG.md
    if [[ -f "CHANGELOG.md" ]]; then
        # Create backup
        cp CHANGELOG.md CHANGELOG.md.bak
        
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
        echo "✅ Main changelog updated with aggregated commits!"
    fi
    
    # Generate changelog index
    cat > changelogs/README.md << 'EOF'
# Individual Changelogs

This directory contains individual changelog files for each contributor to avoid merge conflicts.

## Available Changelogs

EOF
    
    while IFS='|' read -r author_key author_name; do
        [[ -z "$author_key" ]] && continue
        echo "- [${author_name}](./CHANGELOG-${author_key}.md)" >> changelogs/README.md
    done < "$AUTHORS_FILE"
    
    echo "" >> changelogs/README.md
    echo "The main aggregated changelog is available in the root [CHANGELOG.md](../CHANGELOG.md)" >> changelogs/README.md
    
    AUTHOR_COUNT=$(wc -l < "$AUTHORS_FILE")
    echo "✅ Individual changelogs created for ${AUTHOR_COUNT} contributors!"
    echo "✅ All changes documented with author attribution!"
else
    echo "ℹ️ No conventional commits found to update changelog"
fi

# Clean up temp directory
rm -rf "$TEMP_DIR"

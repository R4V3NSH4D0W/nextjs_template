#!/bin/bash

# Simple changelog automation for conventional commits
# Usage: ./scripts/simple-changelog.sh

echo "📝 Auto-updating changelog..."

CHANGELOG="CHANGELOG.md"

# Get commits since last tag (or all commits if no tags)
LAST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
if [ -z "$LAST_TAG" ]; then
    COMMITS=$(git log --oneline --reverse)
else
    COMMITS=$(git log --oneline "${LAST_TAG}..HEAD")
fi

# Categories
ADDED=""
CHANGED=""
FIXED=""
BREAKING=""

# Process each commit
while IFS= read -r line; do
    if [[ -z "$line" ]]; then
        continue
    fi
    
    # Extract hash and message
    HASH=$(echo "$line" | cut -d' ' -f1)
    MESSAGE=$(echo "$line" | cut -d' ' -f2-)
    
    # Skip merge commits
    if [[ "$MESSAGE" == "Merge"* ]]; then
        continue
    fi
    
    # Parse conventional commits
    if [[ "$MESSAGE" =~ ^feat(\([^)]*\))?!?: ]]; then
        TYPE="feat"
        DESC=$(echo "$MESSAGE" | sed 's/^feat[^:]*: //')
        if [[ "$MESSAGE" =~ ! ]]; then
            BREAKING="${BREAKING}- ${DESC} ([${HASH}](https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/commit/${HASH})) ⚠️ **BREAKING**"$'\n'
        else
            ADDED="${ADDED}- ${DESC} ([${HASH}](https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/commit/${HASH}))"$'\n'
        fi
    elif [[ "$MESSAGE" =~ ^fix(\([^)]*\))?: ]]; then
        DESC=$(echo "$MESSAGE" | sed 's/^fix[^:]*: //')
        FIXED="${FIXED}- ${DESC} ([${HASH}](https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/commit/${HASH}))"$'\n'
    elif [[ "$MESSAGE" =~ ^(docs|style|refactor|perf|test|build|ci|chore)(\([^)]*\))?: ]]; then
        DESC=$(echo "$MESSAGE" | sed 's/^[^:]*: //')
        CHANGED="${CHANGED}- ${DESC} ([${HASH}](https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/commit/${HASH}))"$'\n'
    fi
    
done <<< "$COMMITS"

# Check if we have any changes
if [[ -z "$ADDED" && -z "$CHANGED" && -z "$FIXED" && -z "$BREAKING" ]]; then
    echo "No conventional commits found to add to changelog."
    exit 0
fi

# Create new unreleased section content
NEW_CONTENT=""
if [[ -n "$ADDED" ]]; then
    NEW_CONTENT="${NEW_CONTENT}### Added"$'\n\n'"${ADDED}"$'\n'
fi
if [[ -n "$CHANGED" ]]; then
    NEW_CONTENT="${NEW_CONTENT}### Changed"$'\n\n'"${CHANGED}"$'\n'
fi
if [[ -n "$FIXED" ]]; then
    NEW_CONTENT="${NEW_CONTENT}### Fixed"$'\n\n'"${FIXED}"$'\n'
fi
if [[ -n "$BREAKING" ]]; then
    NEW_CONTENT="${NEW_CONTENT}### ⚠️ Breaking Changes"$'\n\n'"${BREAKING}"$'\n'
fi

# Update the changelog
if [[ -f "$CHANGELOG" ]]; then
    # Create a temporary file with the new content
    {
        # Copy everything up to the first section after [Unreleased]
        awk '/^## \[Unreleased\]/{print; print ""; print '"\"$NEW_CONTENT\""'; next} /^## \[/ && !/^## \[Unreleased\]/{exit} !/^### |^$/ || /^## \[Unreleased\]/{print}' "$CHANGELOG"
        
        # Copy the rest of the file starting from the next version
        awk '/^## \[/ && !/^## \[Unreleased\]/{found=1} found{print}' "$CHANGELOG"
    } > "${CHANGELOG}.tmp"
    
    mv "${CHANGELOG}.tmp" "$CHANGELOG"
    echo "✅ Changelog updated successfully!"
else
    echo "❌ CHANGELOG.md not found!"
    exit 1
fi

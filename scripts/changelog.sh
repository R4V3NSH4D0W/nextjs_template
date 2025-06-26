#!/bin/bash

# Automatic changelog generator script
# Generates changelog entries from conventional commits

set -e

echo "📝 Generating changelog from commits..."

# Configuration
CHANGELOG_FILE="CHANGELOG.md"
TEMP_FILE="CHANGELOG_TEMP.md"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to extract commit type and description
parse_commit() {
    local commit="$1"
    
    # Simple parsing for conventional commits
    if echo "$commit" | grep -qE '^[a-z]+(\([^)]*\))?!?:[[:space:]]'; then
        # Extract type
        local type=$(echo "$commit" | sed -E 's/^([a-z]+)(\([^)]*\))?!?:[[:space:]].*/\1/')
        
        # Extract scope (if any)
        local scope=""
        if echo "$commit" | grep -qE '^\w+\([^)]+\)'; then
            scope=$(echo "$commit" | sed -E 's/^\w+\(([^)]+)\).*/\1/')
        fi
        
        # Check for breaking change
        local breaking=""
        if echo "$commit" | grep -qE '^\w+(\([^)]*\))?!:'; then
            breaking="!"
        fi
        
        # Extract description
        local description=$(echo "$commit" | sed -E 's/^[a-z]+(\([^)]*\))?!?:[[:space:]]*//')
        
        echo "$type|$scope|$description|$breaking"
    else
        echo "other|||$commit"
    fi
}

# Function to categorize commits
categorize_commit() {
    local type="$1"
    local breaking="$2"
    
    if [[ -n "$breaking" ]]; then
        echo "breaking"
    elif [[ "$type" == "feat" ]]; then
        echo "added"
    elif [[ "$type" == "fix" ]]; then
        echo "fixed"
    elif [[ "$type" == "perf" ]]; then
        echo "changed"
    elif [[ "$type" == "refactor" ]]; then
        echo "changed"
    elif [[ "$type" == "style" ]]; then
        echo "changed"
    elif [[ "$type" == "docs" ]]; then
        echo "changed"
    elif [[ "$type" == "test" ]]; then
        echo "changed"
    elif [[ "$type" == "build" || "$type" == "ci" || "$type" == "chore" ]]; then
        echo "changed"
    elif [[ "$type" == "revert" ]]; then
        echo "fixed"
    else
        echo "changed"
    fi
}

# Function to format commit for changelog
format_commit() {
    local type="$1"
    local scope="$2"
    local description="$3"
    local breaking="$4"
    local hash="$5"
    
    local formatted="- "
    
    if [[ -n "$scope" ]]; then
        formatted+="**${scope}**: "
    fi
    
    formatted+="${description}"
    
    if [[ -n "$breaking" ]]; then
        formatted+=" ⚠️ **BREAKING CHANGE**"
    fi
    
    formatted+=" ([${hash:0:7}](https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')/commit/${hash}))"
    
    echo "$formatted"
}

# Get the last tag or first commit if no tags exist
get_last_version() {
    local last_tag
    last_tag=$(git describe --tags --abbrev=0 2>/dev/null || echo "")
    
    if [[ -z "$last_tag" ]]; then
        # Get first commit if no tags
        git rev-list --max-parents=0 HEAD
    else
        echo "$last_tag"
    fi
}

# Get commits since last version
get_commits_since_last_version() {
    local last_version
    last_version=$(get_last_version)
    
    if git describe --tags --exact-match "$last_version" >/dev/null 2>&1; then
        # It's a tag, get commits since tag
        git log --pretty=format:"%H|%s" "${last_version}..HEAD"
    else
        # It's a commit hash, get commits since that commit
        git log --pretty=format:"%H|%s" "${last_version}..HEAD"
    fi
}

# Main function to generate changelog entries
generate_changelog_entries() {
    # Initialize category variables
    local added=""
    local changed=""
    local deprecated=""
    local removed=""
    local fixed=""
    local security=""
    local breaking=""
    
    echo -e "${BLUE}Analyzing commits since last version...${NC}"
    
    local commit_count=0
    while IFS='|' read -r hash subject; do
        if [[ -z "$hash" || "$hash" == "Merge"* ]]; then
            continue
        fi
        
        commit_count=$((commit_count + 1))
        
        IFS='|' read -r type scope description breaking_flag <<< "$(parse_commit "$subject")"
        local category
        category=$(categorize_commit "$type" "$breaking_flag")
        
        local formatted
        formatted=$(format_commit "$type" "$scope" "$description" "$breaking_flag" "$hash")
        
        case "$category" in
            "added")
                if [[ -n "$added" ]]; then
                    added="$added"$'\n'"$formatted"
                else
                    added="$formatted"
                fi
                ;;
            "changed")
                if [[ -n "$changed" ]]; then
                    changed="$changed"$'\n'"$formatted"
                else
                    changed="$formatted"
                fi
                ;;
            "fixed")
                if [[ -n "$fixed" ]]; then
                    fixed="$fixed"$'\n'"$formatted"
                else
                    fixed="$formatted"
                fi
                ;;
            "breaking")
                if [[ -n "$breaking" ]]; then
                    breaking="$breaking"$'\n'"$formatted"
                else
                    breaking="$formatted"
                fi
                ;;
        esac
        
        echo -e "${GREEN}✓${NC} $type: $description"
    done <<< "$(get_commits_since_last_version)"
    
    if [[ $commit_count -eq 0 ]]; then
        echo -e "${YELLOW}No new commits found since last version.${NC}"
        return 1
    fi
    
    echo -e "${BLUE}Found $commit_count commits to process.${NC}"
    
    # Generate the new changelog section
    echo ""
    echo "### Added"
    echo ""
    if [[ -n "$added" ]]; then
        echo "$added"
    fi
    echo ""
    echo "### Changed"
    echo ""
    if [[ -n "$changed" ]]; then
        echo "$changed"
    fi
    echo ""
    echo "### Deprecated"
    echo ""
    if [[ -n "$deprecated" ]]; then
        echo "$deprecated"
    fi
    echo ""
    echo "### Removed"
    echo ""
    if [[ -n "$removed" ]]; then
        echo "$removed"
    fi
    echo ""
    echo "### Fixed"
    echo ""
    if [[ -n "$fixed" ]]; then
        echo "$fixed"
    fi
    echo ""
    echo "### Security"
    echo ""
    if [[ -n "$security" ]]; then
        echo "$security"
    fi
    
    if [[ -n "$breaking" ]]; then
        echo ""
        echo "### ⚠️ Breaking Changes"
        echo ""
        echo "$breaking"
    fi
}

# Function to update unreleased section
update_unreleased_section() {
    if [[ ! -f "$CHANGELOG_FILE" ]]; then
        echo -e "${RED}CHANGELOG.md not found!${NC}"
        exit 1
    fi
    
    echo -e "${BLUE}Updating [Unreleased] section...${NC}"
    
    # Generate new entries
    local new_entries
    new_entries=$(generate_changelog_entries)
    
    if [[ $? -ne 0 ]]; then
        return 1
    fi
    
    # Create temporary file with updated content
    awk -v new_entries="$new_entries" '
    BEGIN { in_unreleased = 0; printed_new = 0 }
    /^## \[Unreleased\]/ { 
        print $0
        in_unreleased = 1
        next
    }
    /^## \[/ && in_unreleased && !/^## \[Unreleased\]/ {
        if (!printed_new) {
            print new_entries
            printed_new = 1
        }
        in_unreleased = 0
        print $0
        next
    }
    !in_unreleased { print $0 }
    END {
        if (in_unreleased && !printed_new) {
            print new_entries
        }
    }
    ' "$CHANGELOG_FILE" > "$TEMP_FILE"
    
    mv "$TEMP_FILE" "$CHANGELOG_FILE"
    echo -e "${GREEN}✅ Changelog updated successfully!${NC}"
}

# Function to create a new release
create_release() {
    local version="$1"
    local date
    date=$(date +%Y-%m-%d)
    
    if [[ -z "$version" ]]; then
        echo -e "${RED}Version is required for release!${NC}"
        echo "Usage: $0 release <version>"
        exit 1
    fi
    
    echo -e "${BLUE}Creating release $version...${NC}"
    
    # First update unreleased section
    update_unreleased_section
    
    # Then convert unreleased to release
    awk -v version="$version" -v date="$date" '
    /^## \[Unreleased\]/ {
        print "## [Unreleased]"
        print ""
        print "### Added"
        print ""
        print "### Changed"
        print ""
        print "### Deprecated"
        print ""
        print "### Removed"
        print ""
        print "### Fixed"
        print ""
        print "### Security"
        print ""
        print "## [" version "] - " date
        next
    }
    { print $0 }
    ' "$CHANGELOG_FILE" > "$TEMP_FILE"
    
    mv "$TEMP_FILE" "$CHANGELOG_FILE"
    echo -e "${GREEN}✅ Release $version created!${NC}"
}

# Main script logic
case "${1:-update}" in
    "update")
        update_unreleased_section
        ;;
    "release")
        create_release "$2"
        ;;
    "help")
        echo "Usage: $0 [command] [options]"
        echo ""
        echo "Commands:"
        echo "  update          Update [Unreleased] section with new commits (default)"
        echo "  release <ver>   Create a new release with version number"
        echo "  help           Show this help message"
        echo ""
        echo "Examples:"
        echo "  $0                    # Update unreleased section"
        echo "  $0 update             # Update unreleased section"
        echo "  $0 release 1.1.0      # Create release 1.1.0"
        ;;
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        echo "Use '$0 help' for usage information."
        exit 1
        ;;
esac

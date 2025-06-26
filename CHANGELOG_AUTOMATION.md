# Automated Changelog System

This template includes an automated changelog generation system that follows [Keep a Changelog](https://keepachangelog.com/) format and [Conventional Commits](https://www.conventionalcommits.org/) specification.

## 🚀 Quick Start

```bash
# Update changelog with recent commits
npm run changelog

# Generate daily commit report
npm run daily-report

# Or run directly
./scripts/update-changelog.sh
./scripts/daily-report.sh
```

## 📝 How It Works

### Conventional Commits Support

The system automatically categorizes commits based on their type:

- `feat:` → **Added** section
- `fix:` → **Fixed** section
- `docs:`, `style:`, `refactor:`, `chore:` → **Changed** section

### Example Commits

```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login timeout issue"
git commit -m "docs: update installation guide"
```

### Generated Output

```markdown
### Added

- add user authentication ([a1b2c3d](../../commit/a1b2c3d))

### Fixed

- resolve login timeout issue ([e4f5g6h](../../commit/e4f5g6h))

### Changed

- update installation guide ([i7j8k9l](../../commit/i7j8k9l))
```

## 📊 Daily Reporting

The template includes a daily reporting feature that provides a summary of commits made on the current day, categorized by type and including author information.

### Daily Report Output

```bash
📊 Daily Changelog Report - 2025-01-15
=============================================

📅 Commits for 2025-01-15:

✨ FEATURE: feat: add user authentication
   👤 Author: John Doe | 🔗 Commit: a1b2c3d

🐛 BUGFIX: fix: resolve login timeout issue
   👤 Author: Jane Smith | 🔗 Commit: e4f5g6h

📈 Summary for 2025-01-15:
   Total commits: 2
   ✨ Features: 1
   🐛 Bug fixes: 1
   🔧 Other: 0
```

This is perfect for daily standups, team reporting, and tracking progress.

## 🛠️ Available Scripts

| Command                         | Description                                  |
| ------------------------------- | -------------------------------------------- |
| `npm run changelog`             | Update [Unreleased] section with new commits |
| `npm run daily-report`          | Generate a report of today's commits         |
| `./scripts/update-changelog.sh` | Direct script execution                      |
| `./scripts/daily-report.sh`     | Directly generate daily report               |

**Note:** Only one changelog script is included to keep things simple and avoid conflicts.

## 🔄 GitHub Actions Integration

The changelog system is **fully automated** via GitHub Actions:

### Auto-Update Workflow (`.github/workflows/changelog.yml`)

**Triggers:**

- Push to main branch
- Pull request merge

**Process:**

1. ✅ Automatically runs on every push
2. ✅ Analyzes all recent conventional commits
3. ✅ Generates individual changelog files per contributor
4. ✅ Updates main aggregated `CHANGELOG.md`
5. ✅ Commits changes back to repository with `[skip ci]`

### What Gets Auto-Generated

```
✅ changelogs/CHANGELOG-contributor.md  # Individual files per developer
✅ changelogs/README.md                 # Index of all contributors
✅ CHANGELOG.md                         # Main aggregated changelog
```

### Pipeline Benefits

- 🚀 **Zero manual work** - changelog updates on every push
- 🔄 **Always up-to-date** - never forget to update documentation
- 👥 **Team-friendly** - handles multiple contributors automatically
- 🛡️ **Conflict-free** - separate files prevent merge conflicts

### Manual Release Workflow (`.github/workflows/release.yml`)

**Trigger:** Manual workflow dispatch

**Process:**

1. Creates new version section in changelog
2. Updates package.json version
3. Creates git tag
4. Creates GitHub release with generated notes

## 📋 Commit Guidelines

### ✅ Good Examples

```bash
feat: add OAuth2 login support
fix: resolve mobile navigation issue
docs: add installation instructions
style: improve button styling
refactor: simplify user validation
chore: update dependencies
```

### ❌ Avoid These

```bash
update stuff
fix bug
wip
temp changes
misc updates
```

## 🎯 Template Benefits

### For Template Maintainers

- **Automatic documentation** of all template improvements
- **Professional release notes** generated automatically
- **Consistent changelog format** across versions
- **Easy release management** with GitHub Actions

### For Template Users

- **Clean slate** after running cleanup script
- **Changelog automation** ready to use immediately
- **Professional project setup** with automated documentation
- **Best practices** built-in from day one

## 🧹 Integration with Cleanup Script

When users run `npm run clean`, the changelog automation system is preserved:

**Kept:**

- ✅ `scripts/update-changelog.sh` - Automation script
- ✅ `.github/workflows/changelog.yml` - Auto-update workflow
- ✅ `.github/workflows/release.yml` - Release workflow
- ✅ `npm run changelog` - Package script

**Removed:**

- ❌ Template's changelog history
- ❌ Template-specific entries

**Result:** Users get a fresh changelog but keep all the automation tools!

## � Customization

### Modify Commit Categories

Edit `scripts/update-changelog.sh` around line 20-30:

```bash
# Add custom commit types
if [[ "$MESSAGE" == epic:* ]]; then
    DESC=$(echo "$MESSAGE" | sed 's/^epic[^:]*: *//')
    ADDED_SECTION="${ADDED_SECTION}- ${DESC} (Epic) ([${HASH}](../../commit/${HASH}))"$'\n'
elif [[ "$MESSAGE" == hotfix:* ]]; then
    DESC=$(echo "$MESSAGE" | sed 's/^hotfix[^:]*: *//')
    FIXED_SECTION="${FIXED_SECTION}- ${DESC} (Hotfix) ([${HASH}](../../commit/${HASH}))"$'\n'
fi
```

### Change Output Format

Modify the link format around line 25:

```bash
# Custom link format
ADDED_SECTION="${ADDED_SECTION}- ${DESC} ([${HASH}](https://custom-link.com/${HASH}))"
```

## 🔧 User-Based Changelog Separation

To **avoid merge conflicts** when multiple developers work on the same project, the system generates **individual changelog files** for each contributor:

### Directory Structure

```
changelogs/
├── README.md                    # Index of all contributors
├── CHANGELOG-john_doe.md        # John Doe's contributions
├── CHANGELOG-jane_smith.md      # Jane Smith's contributions
└── CHANGELOG-developer_name.md  # Each contributor gets their own file
```

### How It Works

1. **Individual Files**: Each developer gets their own changelog file
2. **No Conflicts**: Multiple developers can work simultaneously without merge conflicts
3. **Aggregated View**: Main `CHANGELOG.md` shows all changes combined
4. **Auto-Generated**: Created automatically on each push via GitHub Actions

### Benefits

- ✅ **Zero merge conflicts** on changelog files
- ✅ **Clear attribution** - see exactly who did what
- ✅ **Team accountability** - individual contribution tracking
- ✅ **Easy code reviews** - review changes by specific contributors

## 🤖 Automatic Generation via Pipeline

The pipeline automates the entire process:

1. **Code Commit**: Developer commits code with conventional commits
2. **Changelog Update**: On push, the changelog is updated automatically
3. **Daily Report**: Daily report is generated for all contributors
4. **Release Notes**: When releasing, professional release notes are created

This ensures that the changelog, daily reports, and release notes are always up-to-date without manual intervention.

## 🚀 Advanced Usage

### Manual Changelog Updates

You can still manually edit `CHANGELOG.md`:

1. **Add entries manually** to any section
2. **Run automation** to add commit-based entries
3. **Both manual and automated entries** coexist perfectly

### Release Process

1. **Development:** Commits automatically update `[Unreleased]`
2. **Pre-release:** Review and edit unreleased section if needed
3. **Release:** Use GitHub Actions workflow to create official release
4. **Post-release:** Continue development with clean unreleased section

## 🎉 Benefits Summary

✅ **Zero maintenance** changelog updates  
✅ **Professional release notes** automatically generated  
✅ **Conventional commits** enforcement  
✅ **GitHub integration** with workflows  
✅ **Template cleanup** preserves automation  
✅ **Customizable** and extensible  
✅ **Industry standard** formats

This system transforms changelog maintenance from a chore into an automated, professional process that scales with your project!

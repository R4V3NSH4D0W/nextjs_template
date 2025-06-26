# Automated Changelog System

This template includes an automated changelog generation system that follows [Keep a Changelog](https://keepachangelog.com/) format and [Conventional Commits](https://www.conventionalcommits.org/) specification.

## 🚀 Quick Start

```bash
# Update changelog with recent commits
npm run changelog

# Or run directly
./scripts/update-changelog.sh
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

## 🛠️ Available Scripts

| Command                         | Description                                  |
| ------------------------------- | -------------------------------------------- |
| `npm run changelog`             | Update [Unreleased] section with new commits |
| `./scripts/update-changelog.sh` | Direct script execution                      |

**Note:** Only one changelog script is included to keep things simple and avoid conflicts.

## 🔄 GitHub Actions Integration

### Auto-Update Workflow (`.github/workflows/changelog.yml`)

**Triggers:**

- Push to main branch
- Pull request merge

**Actions:**

- Automatically updates changelog
- Commits changes back to repository
- Uses `[skip ci]` to prevent infinite loops

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

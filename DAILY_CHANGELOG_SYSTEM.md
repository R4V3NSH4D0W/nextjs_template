# Daily Changelog System

This template includes an automated daily changelog generation system that creates per-contributor reports for better team collaboration and tracking.

## 🚀 Quick Start

```bash
# Generate daily reports for all contributors
npm run daily-report

# Windows users (PowerShell/Command Prompt)
npm run daily-report:windows

# Or run directly
./scripts/daily-changelog.sh           # Unix/macOS/Linux
./scripts/daily-changelog.ps1          # Windows PowerShell
scripts\daily-changelog.bat            # Windows Command Prompt
```

### 🪟 Windows Compatibility

This template provides full Windows support with multiple options:

- **PowerShell scripts** (`.ps1`) - Recommended for Windows 10/11
- **Batch files** (`.bat`) - Compatible with all Windows versions
- **NPM scripts** - Cross-platform npm commands

| Platform               | Command                        | Script File                   |
| ---------------------- | ------------------------------ | ----------------------------- |
| Unix/macOS/Linux       | `npm run daily-report`         | `scripts/daily-changelog.sh`  |
| Windows PowerShell     | `npm run daily-report:windows` | `scripts/daily-changelog.ps1` |
| Windows Command Prompt | Direct execution               | `scripts\daily-changelog.bat` |

> **✨ First Time Setup:** Running `npm run daily-report` automatically creates the complete `changelogs/` directory structure if it doesn't exist, including the README.md file and all required subdirectories (`daily/` and `daily/contributors/`).

## 📝 How It Works

### Conventional Commits Support

The system automatically categorizes commits based on their type:

- `feat:` → ✨ **Features**
- `fix:` → 🐛 **Bug fixes**
- `docs:`, `style:`, `refactor:`, `chore:` → 🔧 **Other changes**

### Daily Reports Only

This system focuses entirely on **daily per-contributor reports**:

- **Daily aggregate reports**: `changelogs/daily/{YYYY-MM-DD}.md` - All commits for a specific day
- **Per-contributor daily reports**: `changelogs/daily/contributors/{YYYY-MM-DD}-{username}.md` - Individual daily activity
- **Automatic generation** via GitHub Actions pipeline
- **No global changelog** - daily reports provide better granular tracking

### Why Daily Reports?

- **🎯 Team Focus**: Perfect for daily standups and progress tracking
- **🚫 No Merge Conflicts**: Each contributor gets separate daily files
- **📊 Real-time Tracking**: See activity as it happens, not just at releases
- **👥 Individual Accountability**: Clear view of each team member's contributions
- **📈 Historical Tracking**: Build up a complete daily activity history

## 📁 File Structure

```
changelogs/
├── README.md                              # Index and navigation
└── daily/                                 # Daily reports (tracked in git, excluded from builds)
    ├── {YYYY-MM-DD}.md                   # Aggregate daily reports
    └── contributors/                      # Per-contributor daily reports
        └── {YYYY-MM-DD}-{username}.md    # Individual daily activity
```

### Build Optimization

Daily reports are automatically excluded from builds via:

- **Next.js config**: Files don't interfere with development or production builds
- **Performance**: Daily reports tracked in git but don't slow down builds

## 🤖 Automation

### GitHub Actions

The system includes two workflows:

1. **`.github/workflows/changelog.yml`** - Runs on push/PR merge
2. **`.github/workflows/daily-reports.yml`** - Runs daily at 11:59 PM UTC

### Automatic Generation

- **On every push**: Daily reports are generated and committed
- **Daily schedule**: End-of-day report generation to capture all activity
- **Zero maintenance**: Fully automated, no manual intervention needed

## 📊 Example Output

### Daily Aggregate Report (`changelogs/daily/2025-06-26.md`):

```markdown
# Daily Report - 2025-06-26

## Summary

- **Total commits:** 8
- **Features:** 3
- **Bug fixes:** 2
- **Other changes:** 3

## All Commits

- ✨ **add new user authentication** ([abc123](../../commit/abc123)) - _Alice_
- 🐛 **fix login form validation** ([def456](../../commit/def456)) - _Bob_
- 🔧 **update documentation** ([ghi789](../../commit/ghi789)) - _Alice_
```

### Per-Contributor Report (`changelogs/daily/contributors/2025-06-26-alice.md`):

```markdown
# Daily Report for Alice - 2025-06-26

## Summary

- **Commits today:** 2

## Commits

- ✨ **add new user authentication** ([abc123](../../commit/abc123)) - _Alice_ on 2025-06-26
- 🔧 **update documentation** ([ghi789](../../commit/ghi789)) - _Alice_ on 2025-06-26

---

_Generated on Thu Jun 26 18:30:15 +0545 2025_
```

## 🎯 Team Benefits

### For Daily Standups

- **Quick overview**: See what everyone worked on yesterday
- **Individual focus**: Each team member has their own report
- **Progress tracking**: Measure daily velocity and contributions

### For Project Management

- **Activity monitoring**: Track team productivity over time
- **Contribution history**: See who worked on what and when
- **Accountability**: Clear record of daily contributions

### For Code Reviews

- **Context**: Understand the flow of changes day by day
- **Author tracking**: Know who made specific changes
- **Historical reference**: Look back at daily progress

## 🔧 Configuration

### Commit Message Format

Use conventional commit format for automatic categorization:

```bash
# Features
git commit -m "feat: add user login functionality"
git commit -m "feat(auth): implement OAuth integration"

# Bug fixes
git commit -m "fix: resolve login validation issue"
git commit -m "fix(ui): correct button alignment"

# Other changes
git commit -m "docs: update API documentation"
git commit -m "chore: update dependencies"
git commit -m "refactor: improve code structure"
```

### Manual Generation

```bash
# Generate today's reports manually
npm run daily-report

# Generate changelogs (alternative format)
npm run changelog

# Clean up project (removes template files)
npm run clean
```

## 🚀 Getting Started

1. **Set up authentication** (see [Authentication Setup](./AUTHENTICATION_SETUP.md))
2. **Make commits** using conventional commit format
3. **Push to main branch** - daily reports auto-generate
4. **View reports** in `changelogs/daily/` directory
5. **Team standups** - share individual daily reports
6. **Track progress** - build up historical activity data

## 🔐 Authentication Setup

For the automated daily changelog system to work, you need to set up proper GitHub Actions authentication. The workflow needs permission to push generated changelogs back to the repository.

**Quick Setup:**

1. Create a Personal Access Token (PAT) with `repo` and `workflow` scopes
2. Add it as a repository secret named `PAT_TOKEN`
3. Or enable write permissions for the default `GITHUB_TOKEN`

**Detailed Instructions:** See [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md) for complete setup guide.

**Common Error:**

```
remote: Permission to R4V3NSH4D0W/nextjs_template.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/...': The requested URL returned error: 403
```

This indicates authentication needs to be configured properly.

The system is fully automated and requires no maintenance once set up!

## 📚 Advanced Usage

### Custom Commit Types

You can extend the categorization by modifying the scripts:

- Add new commit types (e.g., `perf:`, `test:`)
- Customize emoji and formatting
- Modify report templates

### Integration

Daily reports can be integrated with:

- **Slack/Discord**: Post daily summaries automatically
- **Project management tools**: Sync with Jira, Asana, etc.
- **Analytics**: Track team velocity and productivity metrics
- **Documentation**: Auto-update project wikis with daily progress

The daily changelog system provides a modern, team-focused approach to tracking development activity!

# Windows Compatibility Guide

This Next.js template now provides full Windows compatibility for all automation scripts.

## 🪟 Available Options

### 1. PowerShell Scripts (Recommended)

Best for Windows 10/11 users with PowerShell:

```powershell
# Clean template
npm run clean:windows
# or directly:
powershell -ExecutionPolicy Bypass -File ./scripts/clean.ps1

# Generate daily reports
npm run daily-report:windows
# or directly:
powershell -ExecutionPolicy Bypass -File ./scripts/daily-changelog.ps1
```

### 2. Batch Files (Universal)

Compatible with all Windows versions (95, XP, 7, 8, 10, 11):

```cmd
# Clean template (Command Prompt)
scripts\clean.bat

# Note: Batch version of daily-changelog requires PowerShell for git operations
```

### 3. NPM Scripts (Cross-platform)

Works on any platform with npm:

```bash
# These automatically detect your platform
npm run clean          # Uses .sh on Unix, .ps1 on Windows
npm run daily-report   # Cross-platform

# Platform-specific versions
npm run clean:windows         # Forces PowerShell version
npm run daily-report:windows  # Forces PowerShell version
```

## 🔧 Setup Requirements

### PowerShell (Recommended)

- **Windows 10/11**: PowerShell 5.1+ (built-in)
- **Older Windows**: Install PowerShell Core 7+

### Execution Policy

If you get execution policy errors:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (safe)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or run with bypass (temporary)
powershell -ExecutionPolicy Bypass -File ./scripts/clean.ps1
```

## 📁 Script Files

| Platform               | Clean Script        | Daily Report Script           |
| ---------------------- | ------------------- | ----------------------------- |
| Unix/macOS/Linux       | `scripts/clean.sh`  | `scripts/daily-changelog.sh`  |
| Windows PowerShell     | `scripts/clean.ps1` | `scripts/daily-changelog.ps1` |
| Windows Command Prompt | `scripts/clean.bat` | (Use PowerShell version)      |

## ✅ Feature Parity

All Windows scripts provide the same functionality as Unix versions:

- ✅ Template cleanup while preserving automation
- ✅ Daily changelog generation
- ✅ Automatic directory structure creation
- ✅ Contributor tracking
- ✅ Commit categorization
- ✅ Colorful console output
- ✅ Git integration

## 🚀 Quick Start for Windows Users

1. **Clone the template**:

   ```cmd
   git clone https://github.com/R4V3NSH4D0W/nextjs_template.git
   cd nextjs_template
   npm install
   ```

2. **Clean template** (choose one):

   ```cmd
   npm run clean:windows
   scripts\clean.bat
   ```

3. **Generate daily reports**:

   ```cmd
   npm run daily-report:windows
   ```

4. **Start development**:
   ```cmd
   npm run dev
   ```

## 🤖 GitHub Actions Compatibility

**✅ GitHub Actions work perfectly with Windows development!**

### How It Works

- **GitHub Actions**: Runs on Linux (`ubuntu-latest`) using bash scripts
- **Your Windows development**: Uses PowerShell/batch scripts locally
- **Result**: Seamless automation regardless of your local platform

The daily changelog automation will:

- ✅ Run automatically on GitHub's Linux runners
- ✅ Generate reports when you push commits from Windows
- ✅ Work with commits made by Windows developers
- ✅ Update your repository with daily reports

### Optional: Windows GitHub Actions Runner

If you prefer to run GitHub Actions on Windows (not recommended for this use case):

```yaml
# In .github/workflows/daily-changelog.yml
jobs:
  generate-daily-changelogs:
    runs-on: windows-latest # Instead of ubuntu-latest
    steps:
      - name: Generate Daily Changelogs
        run: |
          powershell -ExecutionPolicy Bypass -File ./scripts/daily-changelog.ps1
```

**Note**: The default Linux runner is faster, more reliable, and costs less. Windows development + Linux automation is the optimal setup.

## 🔍 Troubleshooting

### PowerShell Execution Policy

```powershell
# If scripts won't run, temporarily bypass
powershell -ExecutionPolicy Bypass -File ./scripts/clean.ps1
```

### Git Not Found

Ensure Git is installed and in your PATH:

```cmd
git --version
```

### Path Issues

Use forward slashes or escape backslashes:

```powershell
./scripts/clean.ps1        # Works
.\scripts\clean.ps1        # Also works
scripts\clean.ps1          # Command Prompt style
```

Windows users now have the same "lazy developer" experience as Unix users! 🎉

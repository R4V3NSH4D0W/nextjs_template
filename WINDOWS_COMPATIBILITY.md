# Windows Compatibility Guide

This Next.js template provides robust cross-platform support for both Unix-like systems (macOS, Linux) and Windows.

## Overview

The template includes both Bash scripts (for Unix systems) and PowerShell scripts (for Windows) to ensure consistent functionality across platforms.

## Scripts

### Cleanup Script

**Automatic (cross-platform):**

```bash
npm run clean
```

**Platform-specific:**

```bash
# Unix/macOS/Linux
npm run clean:unix
./scripts/clean.sh

# Windows
npm run clean:windows
pwsh -File ./scripts/clean.ps1
```

### Daily Changelog Script

**Automatic (cross-platform):**

```bash
npm run daily-report
```

**Platform-specific:**

```bash
# Unix/macOS/Linux
npm run daily-report:unix
./scripts/daily-changelog.sh

# Windows
npm run daily-report:windows
pwsh -File ./scripts/daily-changelog.ps1
```

## How Cross-Platform Detection Works

The `npm run clean` and `npm run daily-report` commands automatically detect your platform using Node.js's `process.platform` and execute the appropriate script:

- **Windows** (`win32`): Runs PowerShell scripts (`.ps1`)
- **Unix-like** (macOS, Linux): Runs Bash scripts (`.sh`)

## PowerShell Requirements (Windows)

### PowerShell 7+ (Recommended)

Install PowerShell 7+ for the best experience:

1. **Via Microsoft Store**: Search for "PowerShell" and install
2. **Via Winget**: `winget install Microsoft.PowerShell`
3. **Manual Download**: https://github.com/PowerShell/PowerShell/releases

### Windows PowerShell 5.1 (Built-in)

The scripts are compatible with the built-in Windows PowerShell 5.1, but PowerShell 7+ is recommended for better performance and features.

## Execution Policy (Windows)

If you encounter execution policy errors, you may need to adjust PowerShell's execution policy:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set execution policy for current user (recommended)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Alternative: Run scripts with bypass (per-command)
powershell -ExecutionPolicy Bypass -File ./scripts/clean.ps1
```

## Platform-Specific Features

### Unix Scripts (Bash)

- Uses standard Unix tools (`find`, `grep`, `sed`, etc.)
- Efficient file operations with native Unix commands
- Compatible with macOS, Linux, and WSL

### Windows Scripts (PowerShell)

- Uses PowerShell cmdlets and .NET methods
- Proper Unicode/UTF-8 support
- Windows-native path handling (`\` vs `/`)
- Cross-platform PowerShell Core compatible

## Testing Platform Compatibility

### Test Cleanup Script

```bash
# Create some test files first
echo "test" > test-file.txt

# Run cleanup (should work on any platform)
npm run clean

# Verify test files are cleaned up appropriately
```

### Test Daily Changelog

```bash
# Make sure you have commits for today
git log --since="today"

# Generate daily report (should work on any platform)
npm run daily-report

# Check generated files
ls changelogs/daily/
```

## Troubleshooting

### Windows Issues

**Problem**: "cannot be loaded because running scripts is disabled"
**Solution**: Adjust execution policy as shown above

**Problem**: "pwsh: command not found"  
**Solution**: Install PowerShell 7+ or use `powershell` instead of `pwsh`

**Problem**: Character encoding issues
**Solution**: PowerShell scripts use UTF-8 encoding by default

### Unix Issues

**Problem**: "Permission denied"
**Solution**: Make scripts executable:

```bash
chmod +x scripts/*.sh
```

**Problem**: "bash: command not found"
**Solution**: Install bash or use `sh` instead

## Development Notes

### Script Parity

Both Bash and PowerShell versions provide identical functionality:

- ✅ File cleanup and generation
- ✅ Git operations and commit parsing
- ✅ Directory structure creation
- ✅ Markdown file generation
- ✅ Cross-platform path handling
- ✅ Error handling and user feedback

### Maintenance

When updating scripts, ensure both versions are updated:

1. **Edit Unix version**: `scripts/*.sh`
2. **Edit Windows version**: `scripts/*.ps1`
3. **Test both platforms** if possible
4. **Update documentation** if behavior changes

## GitHub Actions Compatibility

The automated daily changelog workflow in `.github/workflows/` uses the cross-platform npm scripts, ensuring compatibility regardless of the runner OS:

```yaml
- name: Generate Daily Changelog
  run: npm run daily-report
```

This automatically uses the correct script for the GitHub Actions runner environment.

## WSL (Windows Subsystem for Linux)

If you're using WSL on Windows, you can use either approach:

- **WSL environment**: Use Unix scripts (`npm run clean:unix`)
- **Windows environment**: Use PowerShell scripts (`npm run clean:windows`)
- **Automatic**: Use cross-platform detection (`npm run clean`)

The automatic detection will choose based on the Node.js environment, not the underlying OS.

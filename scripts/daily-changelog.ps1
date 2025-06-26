#!/usr/bin/env pwsh

# Unified daily changelog generator for contributors
# Combines both terminal output and file generation

Write-Host "📊 Daily Changelog Generator - $(Get-Date -Format 'yyyy-MM-dd')" -ForegroundColor Blue
Write-Host "==================================================" -ForegroundColor Blue
Write-Host ""

# Create directories and initialize if needed
New-Item -ItemType Directory -Path "changelogs\daily\contributors" -Force | Out-Null

# Create changelogs README if it doesn't exist
if (-not (Test-Path "changelogs\README.md")) {
    @"
# Daily Changelogs

This directory contains automatically generated daily development reports.

## Structure

- `daily/` - Daily changelog reports organized by date
- `daily/contributors/` - Individual contributor reports organized by date and author

## Usage

Generate today's changelog:

```bash
npm run daily-report
```

## Automation

This system automatically:
- Categorizes commits (feat, fix, other)
- Tracks contributor activity
- Generates structured reports
- Maintains historical records

Reports are generated automatically via GitHub Actions or can be run manually.
"@ | Out-File -FilePath "changelogs\README.md" -Encoding UTF8
    Write-Host "📁 Created changelogs/README.md" -ForegroundColor Green
}

# Get today's date and commits
$today = Get-Date -Format "yyyy-MM-dd"
$todayStart = Get-Date -Format "yyyy-MM-dd 00:00:00"
$todayEnd = Get-Date -Format "yyyy-MM-dd 23:59:59"

try {
    $todaysCommits = git log --pretty=format:"%h|%an|%ad|%s" --date=short --since="$todayStart" --until="$todayEnd"
} catch {
    Write-Host "⚠️ Git repository not found or no commits available" -ForegroundColor Yellow
    exit 1
}

if (-not $todaysCommits) {
    Write-Host "ℹ️ No commits found for today ($today)" -ForegroundColor Cyan
    exit 0
}

# Initialize counters and collections
$authors = @{}
$featCount = 0
$fixCount = 0
$otherCount = 0
$allCommits = @()

Write-Host "📅 Processing commits for $today..." -ForegroundColor Yellow

# Process commits and display to terminal
foreach ($line in $todaysCommits) {
    if (-not $line -or $line.StartsWith("Merge")) {
        continue
    }
    
    $parts = $line -split '\|'
    if ($parts.Length -lt 4) { continue }
    
    $hash = $parts[0]
    $author = $parts[1]
    $date = $parts[2]
    $message = $parts[3]
    
    # Normalize author name for filename
    $authorKey = $author -replace '[^a-zA-Z0-9]', '_' | ForEach-Object { $_.ToLower() }
    
    # Track author
    if (-not $authors.ContainsKey($authorKey)) {
        $authors[$authorKey] = @{
            name = $author
            commits = @()
        }
    }
    
    # Create commit object
    $commitObj = @{
        hash = $hash
        author = $author
        authorKey = $authorKey
        date = $date
        message = $message
    }
    
    $authors[$authorKey].commits += $commitObj
    $allCommits += $commitObj
    
    # Categorize, display, and count
    if ($message -match '^feat[\(:])' -or $message -match '^feat\(.*\):') {
        Write-Host "✨ FEATURE: $message" -ForegroundColor Green
        Write-Host "   👤 Author: $author | 🔗 Commit: $hash" -ForegroundColor Gray
        Write-Host ""
        $featCount++
        $commitObj.category = "feat"
        $commitObj.icon = "✨"
        $commitObj.type = "FEATURE"
    }
    elseif ($message -match '^fix[\(:])' -or $message -match '^fix\(.*\):') {
        Write-Host "🐛 BUGFIX: $message" -ForegroundColor Red
        Write-Host "   👤 Author: $author | 🔗 Commit: $hash" -ForegroundColor Gray
        Write-Host ""
        $fixCount++
        $commitObj.category = "fix"
        $commitObj.icon = "🐛"
        $commitObj.type = "BUGFIX"
    }
    else {
        Write-Host "🔧 OTHER: $message" -ForegroundColor Cyan
        Write-Host "   👤 Author: $author | 🔗 Commit: $hash" -ForegroundColor Gray
        Write-Host ""
        $otherCount++
        $commitObj.category = "other"
        $commitObj.icon = "🔧"
        $commitObj.type = "OTHER"
    }
}

$totalCommits = $featCount + $fixCount + $otherCount

Write-Host "📈 Summary for ${today}:" -ForegroundColor Blue
Write-Host "   Total commits: $totalCommits"
Write-Host "   ✨ Features: $featCount" -ForegroundColor Green
Write-Host "   🐛 Bug fixes: $fixCount" -ForegroundColor Red
Write-Host "   🔧 Other: $otherCount" -ForegroundColor Cyan
Write-Host ""

# Generate daily aggregate report
Write-Host "📊 Generating daily aggregate report..." -ForegroundColor Yellow

$aggregateContent = @"
# Daily Development Report - $today

## 📈 Summary
- **Total Commits**: $totalCommits
- **✨ Features**: $featCount
- **🐛 Bug Fixes**: $fixCount
- **🔧 Other Changes**: $otherCount

## 📝 All Commits

"@

foreach ($commit in $allCommits) {
    $aggregateContent += @"

### $($commit.icon) $($commit.message)
- **Author**: $($commit.author)
- **Commit**: [$($commit.hash)](../../commit/$($commit.hash))
- **Type**: $($commit.type)

"@
}

$aggregateContent += @"

---
*Report generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@

$aggregateContent | Out-File -FilePath "changelogs\daily\$today.md" -Encoding UTF8

# Generate per-contributor reports
foreach ($authorKey in $authors.Keys) {
    $authorData = $authors[$authorKey]
    $authorName = $authorData.name
    $authorCommits = $authorData.commits
    
    Write-Host "📝 Generating daily report for $authorName..." -ForegroundColor Yellow
    
    $contributorContent = @"
# Daily Report for $authorName - $today

## 📊 Summary
- **Total Commits**: $($authorCommits.Count)
- **✨ Features**: $(($authorCommits | Where-Object { $_.category -eq 'feat' }).Count)
- **🐛 Bug Fixes**: $(($authorCommits | Where-Object { $_.category -eq 'fix' }).Count)
- **🔧 Other**: $(($authorCommits | Where-Object { $_.category -eq 'other' }).Count)

## 📝 Commits

"@
    
    foreach ($commit in $authorCommits) {
        $contributorContent += @"

### $($commit.icon) $($commit.message)
- **Commit**: [$($commit.hash)](../../../commit/$($commit.hash))
- **Type**: $($commit.type)

"@
    }
    
    $contributorContent += @"

---
*Report generated on $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')*
"@
    
    $contributorContent | Out-File -FilePath "changelogs\daily\contributors\$today-$authorKey.md" -Encoding UTF8
}

Write-Host "✅ Daily reports generated successfully!" -ForegroundColor Green
Write-Host "   📄 Aggregate report: changelogs\daily\$today.md"
Write-Host "   👥 Contributor reports: $($authors.Count) files"
Write-Host "   📊 Total commits processed: $totalCommits"
Write-Host ""
Write-Host "💡 Daily reports are automatically updated via GitHub Actions!" -ForegroundColor Cyan

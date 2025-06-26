#!/usr/bin/env pwsh

Write-Host "🧹 Cleaning Next.js template..." -ForegroundColor Blue
Write-Host ""

# Remove template-specific files
Write-Host "📁 Removing template files..." -ForegroundColor Yellow
if (Test-Path "CONTRIBUTING.md") { Remove-Item "CONTRIBUTING.md" -Force }
if (Test-Path "EXAMPLE_PR.md") { Remove-Item "EXAMPLE_PR.md" -Force }
if (Test-Path "LICENSE") { Remove-Item "LICENSE" -Force }
Write-Host "✅ Removed template documentation files (GitHub files preserved)" -ForegroundColor Green

# Reset CHANGELOG.md to fresh state (preserving automation)
Write-Host "📝 Resetting changelog and cleaning user-specific changelogs..." -ForegroundColor Yellow
@"
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
"@ | Out-File -FilePath "CHANGELOG.md" -Encoding UTF8

# Clean only user-specific changelog files (preserve automation structure)
if (Test-Path "changelogs\daily") {
    # Remove specific daily changelog files but keep the structure
    Get-ChildItem -Path "changelogs\daily" -Filter "*.md" -File -ErrorAction SilentlyContinue | Remove-Item -Force
    Get-ChildItem -Path "changelogs\daily\contributors" -Filter "*.md" -File -ErrorAction SilentlyContinue | Remove-Item -Force
    Write-Host "✅ Cleaned user-specific daily changelog files (structure preserved)" -ForegroundColor Green
}
Write-Host "✅ Reset main changelog (automation preserved)" -ForegroundColor Green

# Clean source files
Write-Host "🔧 Cleaning source files..." -ForegroundColor Yellow
if (Test-Path "src\lib\validations.ts") { Remove-Item "src\lib\validations.ts" -Force }
if (Test-Path "src\components\ui\button.tsx") { Remove-Item "src\components\ui\button.tsx" -Force }
Write-Host "✅ Removed validations.ts and button.tsx" -ForegroundColor Green

# Reset hooks directory
Write-Host "🎣 Cleaning hooks directory..." -ForegroundColor Yellow
Get-ChildItem -Path "src\hooks" -File -ErrorAction SilentlyContinue | Remove-Item -Force
@"
// Export your custom hooks here
export {};
"@ | Out-File -FilePath "src\hooks\index.ts" -Encoding UTF8
Write-Host "✅ Reset hooks directory" -ForegroundColor Green

# Reset utils.ts to minimal version
Write-Host "🛠️  Resetting utils.ts..." -ForegroundColor Yellow
@"
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
"@ | Out-File -FilePath "src\lib\utils.ts" -Encoding UTF8
Write-Host "✅ Reset utils.ts" -ForegroundColor Green

# Reset page.tsx with clean homepage
Write-Host "🏠 Resetting homepage..." -ForegroundColor Yellow
@"
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to Next.js!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started by editing{' '}
          <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
            src/app/page.tsx
          </code>
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-input bg-background px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Learn Next.js
          </a>
        </div>
      </div>
    </main>
  );
}
"@ | Out-File -FilePath "src\app\page.tsx" -Encoding UTF8
Write-Host "✅ Reset homepage" -ForegroundColor Green

# Clean public directory (keep essential Next.js files)
Write-Host "🗂️  Cleaning public directory..." -ForegroundColor Yellow
Get-ChildItem -Path "public" -File | Where-Object { $_.Name -notin @("next.svg", "vercel.svg") } | Remove-Item -Force
Write-Host "✅ Cleaned public directory" -ForegroundColor Green

# Reset README.md
Write-Host "📝 Resetting README..." -ForegroundColor Yellow
@"
# My Next.js Project

A modern Next.js application built with TypeScript and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📝 **TypeScript** for type safety
- 📊 **Automated Daily Changelog** system
- 🧹 **Clean setup** scripts

## Getting Started

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Daily Changelog System

This template includes an automated daily changelog system that tracks your development progress:

- **Automatic generation**: Run `npm run daily-report` to generate today's changelog
- **GitHub Actions**: Automatically generates daily reports (requires PAT_TOKEN setup)
- **Contributor tracking**: Tracks contributions by author
- **Smart categorization**: Automatically categorizes commits (feat, fix, other)

### Generate Daily Report

```bash
npm run daily-report
```

The system will create structured changelog files in the `changelogs/` directory.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
"@ | Out-File -FilePath "README.md" -Encoding UTF8
Write-Host "✅ Reset README.md" -ForegroundColor Green

# Update package.json
Write-Host "📦 Updating package.json..." -ForegroundColor Yellow
$packageJson = Get-Content "package.json" | ConvertFrom-Json
$packageJson.name = "my-nextjs-app"
$packageJson.version = "0.1.0"
$packageJson.description = "A modern Next.js application with automated daily changelog system"
$packageJson.author = ""
$packageJson.scripts.PSObject.Properties.Remove("clean")
$packageJson | ConvertTo-Json -Depth 10 | Out-File -FilePath "package.json" -Encoding UTF8
Write-Host "✅ Updated package.json (removed clean script, preserved daily-report)" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Template cleanup completed!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Update package.json name, description, and author"
Write-Host "2. Run: npm install"
Write-Host "3. Run: npm run dev"
Write-Host "4. Start building your awesome project!"
Write-Host "5. Generate your first daily report: npm run daily-report"
Write-Host ""
Write-Host "📝 Note: Template-specific files have been removed." -ForegroundColor Cyan
Write-Host "🚀 Daily changelog automation system has been preserved and is ready to use!" -ForegroundColor Green

# Optional: Reset git history
$resetGit = Read-Host "Do you want to reset git history? (y/N)"
if ($resetGit -eq "y" -or $resetGit -eq "Y") {
    Write-Host "🔄 Resetting git history..." -ForegroundColor Yellow
    if (Test-Path ".git") { Remove-Item ".git" -Recurse -Force }
    git init
    git add .
    git commit -m "Initial commit"
    Write-Host "✅ Git history reset" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Ready to start your new project!" -ForegroundColor Green

# Clean up the script itself
Write-Host "🧹 Cleaning up cleanup script..." -ForegroundColor Yellow
$scriptPath = $MyInvocation.MyCommand.Path
$scriptsDir = Split-Path $scriptPath

# Remove only this cleanup script (keep daily-changelog.sh as it's the main feature)
if (Test-Path $scriptPath) { Remove-Item $scriptPath -Force }
Write-Host "✅ Removed clean.ps1 script (daily-changelog.sh preserved)" -ForegroundColor Green

Write-Host "🎯 Template cleanup completed! Your project is ready to go." -ForegroundColor Blue

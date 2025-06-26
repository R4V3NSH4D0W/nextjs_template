#!/bin/bash

echo "🧹 Cleaning Next.js template..."
echo

# Remove template-specific files
echo "📁 Removing template files..."
rm -f CONTRIBUTING.md EXAMPLE_PR.md LICENSE
echo "✅ Removed template documentation files (GitHub files preserved)"

# Reset CHANGELOG.md to fresh state (preserving automation)
echo "📝 Resetting changelog and cleaning user-specific changelogs..."
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

# Clean only user-specific changelog files (preserve automation structure)
if [[ -d "changelogs/daily" ]]; then
    # Remove specific daily changelog files but keep the structure
    find changelogs/daily -name "*.md" -type f -delete 2>/dev/null || true
    find changelogs/daily/contributors -name "*.md" -type f -delete 2>/dev/null || true
    echo "✅ Cleaned user-specific daily changelog files (structure preserved)"
fi
echo "✅ Reset main changelog (automation preserved)"

# Clean source files
echo "🔧 Cleaning source files..."
rm -f src/lib/validations.ts
rm -f src/components/ui/button.tsx
echo "✅ Removed validations.ts and button.tsx"

# Reset hooks directory
echo "🎣 Cleaning hooks directory..."
rm -f src/hooks/*
cat > src/hooks/index.ts << 'EOF'
// Export your custom hooks here
export {};
EOF
echo "✅ Reset hooks directory"

# Reset utils.ts to minimal version
echo "🛠️  Resetting utils.ts..."
cat > src/lib/utils.ts << 'EOF'
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
EOF
echo "✅ Reset utils.ts"

# Reset page.tsx with clean homepage
echo "🏠 Resetting homepage..."
cat > src/app/page.tsx << 'EOF'
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
EOF
echo "✅ Reset homepage"

# Clean public directory (keep essential Next.js files)
echo "🗂️  Cleaning public directory..."
find public -type f ! -name "next.svg" ! -name "vercel.svg" -delete
echo "✅ Cleaned public directory"

# Reset README.md
echo "📝 Resetting README..."
cat > README.md << 'EOF'
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
EOF
echo "✅ Reset README.md"

# Update package.json
echo "📦 Updating package.json..."
# Use Node.js to update package.json
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.name = 'my-nextjs-app';
pkg.version = '0.1.0';
pkg.description = 'A modern Next.js application with automated daily changelog system';
pkg.author = '';
delete pkg.scripts.clean;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
echo "✅ Updated package.json (removed clean script, preserved daily-report)"

echo
echo "🎉 Template cleanup completed!"
echo
echo "Next steps:"
echo "1. Update package.json name, description, and author"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Start building your awesome project!"
echo "5. Generate your first daily report: npm run daily-report"
echo
echo "📝 Note: Template-specific files have been removed."
echo "🚀 Daily changelog automation system has been preserved and is ready to use!"

# Optional: Reset git history
read -p "Do you want to reset git history? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔄 Resetting git history..."
    rm -rf .git
    git init
    git add .
    git commit -m "Initial commit"
    echo "✅ Git history reset"
fi

echo
echo "🚀 Ready to start your new project!"

# Clean up the script itself
echo "🧹 Cleaning up cleanup script..."
SCRIPT_PATH="$0"
SCRIPTS_DIR="$(dirname "$SCRIPT_PATH")"

# Remove only this cleanup script (keep daily-changelog.sh as it's the main feature)
rm -f "$SCRIPT_PATH"
echo "✅ Removed clean.sh script (daily-changelog.sh preserved)"

echo "🎯 Template cleanup completed! Your project is ready to go."

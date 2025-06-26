#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';
import readline from 'readline';

interface Colors {
  blue: string;
  green: string;
  yellow: string;
  red: string;
  cyan: string;
  magenta: string;
  reset: string;
}

function log(message: string, color: keyof Colors | '' = ''): void {
  const colors: Colors = {
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
  };
  const colorCode = color ? colors[color] : '';
  console.log(`${colorCode}${message}${colors.reset}`);
}

function removeFileIfExists(filePath: string): void {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

function removeDirContents(
  dirPath: string,
  filter?: (file: string) => boolean
): void {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      if (!filter || filter(file)) {
        const fullPath = `${dirPath}/${file}`;
        if (fs.statSync(fullPath).isFile()) {
          fs.unlinkSync(fullPath);
        }
      }
    }
  }
}

async function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise<string>(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer);
    });
  });

  return answer;
}

async function main(): Promise<void> {
  log('🧹 Cleaning Next.js template...', 'blue');
  console.log('');

  // Remove template-specific files
  log('📁 Removing template files...', 'yellow');
  removeFileIfExists('CONTRIBUTING.md');
  removeFileIfExists('EXAMPLE_PR.md');
  removeFileIfExists('LICENSE');
  log(
    '✅ Removed template documentation files (GitHub files preserved)',
    'green'
  );

  // Reset CHANGELOG.md to fresh state (preserving automation)
  log(
    '📝 Resetting changelog and cleaning user-specific changelogs...',
    'yellow'
  );
  const changelogContent = `# Changelog

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
`;
  fs.writeFileSync('CHANGELOG.md', changelogContent);

  // Clean only user-specific changelog files (preserve automation structure)
  if (fs.existsSync('changelogs/daily')) {
    removeDirContents('changelogs/daily', file => file.endsWith('.md'));
    if (fs.existsSync('changelogs/daily/contributors')) {
      removeDirContents('changelogs/daily/contributors', file =>
        file.endsWith('.md')
      );
    }
    log(
      '✅ Cleaned user-specific daily changelog files (structure preserved)',
      'green'
    );
  }
  log('✅ Reset main changelog (automation preserved)', 'green');

  // Clean source files
  log('🔧 Cleaning source files...', 'yellow');
  removeFileIfExists('src/lib/validations.ts');
  removeFileIfExists('src/components/ui/button.tsx');
  log('✅ Removed validations.ts and button.tsx', 'green');

  // Reset hooks directory
  log('🎣 Cleaning hooks directory...', 'yellow');
  removeDirContents('src/hooks');
  const hooksIndexContent = `// Export your custom hooks here
export {};
`;
  fs.writeFileSync('src/hooks/index.ts', hooksIndexContent);
  log('✅ Reset hooks directory', 'green');

  // Reset utils.ts to minimal version
  log('🛠️  Resetting utils.ts...', 'yellow');
  const utilsContent = `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
  fs.writeFileSync('src/lib/utils.ts', utilsContent);
  log('✅ Reset utils.ts', 'green');

  // Reset page.tsx with clean homepage
  log('🏠 Resetting homepage...', 'yellow');
  const pageContent = `export default function HomePage() {
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
`;
  fs.writeFileSync('src/app/page.tsx', pageContent);
  log('✅ Reset homepage', 'green');

  // Clean public directory (keep essential Next.js files)
  log('🗂️  Cleaning public directory...', 'yellow');
  if (fs.existsSync('public')) {
    const files = fs.readdirSync('public');
    for (const file of files) {
      if (file !== 'next.svg' && file !== 'vercel.svg') {
        fs.unlinkSync(`public/${file}`);
      }
    }
  }
  log('✅ Cleaned public directory', 'green');

  // Reset README.md
  log('📝 Resetting README...', 'yellow');
  const readmeContent = `# My Next.js Project

A modern Next.js application built with TypeScript and Tailwind CSS.

## Features

- 🚀 **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 📝 **TypeScript** for type safety
- 📊 **Automated Daily Changelog** system
- 🧹 **Clean setup** scripts

## Getting Started

First, install dependencies:

\`\`\`bash
npm install
# or
yarn install
# or
pnpm install
\`\`\`

Then, run the development server:

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Daily Changelog System

This template includes an automated daily changelog system that tracks your development progress:

- **Automatic generation**: Run \`npm run daily-report\` to generate today's changelog
- **GitHub Actions**: Automatically generates daily reports (requires PAT_TOKEN setup)
- **Contributor tracking**: Tracks contributions by author
- **Smart categorization**: Automatically categorizes commits (feat, fix, other)

### Generate Daily Report

\`\`\`bash
npm run daily-report
\`\`\`

The system will create structured changelog files in the \`changelogs/\` directory.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
`;
  fs.writeFileSync('README.md', readmeContent);
  log('✅ Reset README.md', 'green');

  // Update package.json
  log('📦 Updating package.json...', 'yellow');
  try {
    const packageJsonPath = 'package.json';
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = 'my-nextjs-app';
    packageJson.version = '0.1.0';
    packageJson.description =
      'A modern Next.js application with automated daily changelog system';
    packageJson.author = '';

    // Remove clean script but preserve daily-report
    delete packageJson.scripts.clean;

    fs.writeFileSync(
      packageJsonPath,
      JSON.stringify(packageJson, null, 2) + '\n'
    );
    log(
      '✅ Updated package.json (removed clean script, preserved daily-report)',
      'green'
    );
  } catch {
    log('❌ Error updating package.json', 'red');
  }

  console.log('');
  log('🎉 Template cleanup completed!', 'green');
  console.log('');
  log('Next steps:', 'cyan');
  log('1. Update package.json name, description, and author', 'cyan');
  log('2. Run: npm install', 'cyan');
  log('3. Run: npm run dev', 'cyan');
  log('4. Start building your awesome project!', 'cyan');
  log('5. Generate your first daily report: npm run daily-report', 'cyan');
  console.log('');
  log('📝 Note: Template-specific files have been removed.', 'yellow');
  log(
    '🚀 Daily changelog automation system has been preserved and is ready to use!',
    'green'
  );

  // Optional: Reset git history
  const resetGit = await askQuestion(
    'Do you want to reset git history? (y/N): '
  );
  if (resetGit.toLowerCase() === 'y' || resetGit.toLowerCase() === 'yes') {
    try {
      log('🔄 Resetting git history...', 'yellow');
      if (fs.existsSync('.git')) {
        fs.rmSync('.git', { recursive: true, force: true });
      }
      execSync('git init', { stdio: 'inherit' });
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
      log('✅ Git history reset', 'green');
    } catch {
      log('❌ Error resetting git history', 'red');
    }
  }

  console.log('');
  log('🚀 Ready to start your new project!', 'green');

  // Clean up the script itself
  log('🧹 Cleaning up cleanup script...', 'yellow');
  try {
    // Remove both JS and TS versions, and shell scripts
    removeFileIfExists(__filename);
    removeFileIfExists('scripts/clean.js');
    removeFileIfExists('scripts/clean.sh');
    removeFileIfExists('scripts/clean.ps1');
    log('✅ Removed clean scripts (daily-changelog preserved)', 'green');
  } catch {
    log('⚠️ Could not remove cleanup scripts automatically', 'yellow');
  }

  log('🎯 Template cleanup completed! Your project is ready to go.', 'green');
}

// Run the main function
main().catch(error => {
  console.error('❌ Error during cleanup:', error);
  process.exit(1);
});

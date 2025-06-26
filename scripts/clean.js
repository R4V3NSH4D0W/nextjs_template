#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-require-imports */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Cleaning Next.js template...\n');

// Files to remove
const filesToRemove = [
  'CONTRIBUTING.md',
  'EXAMPLE_PR.md',
  'LICENSE',
  'CHANGELOG.md',
  '.github',
  'src/hooks/index.ts',
  'src/lib/validations.ts',
];

// Files to reset with minimal content
const filesToReset = {
  'README.md': `# My Next.js Project

A modern Next.js application built with TypeScript and Tailwind CSS.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
`,
  'src/app/page.tsx': `export default function HomePage() {
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
`,
  'src/lib/utils.ts': `import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`,
};

// Update package.json
function updatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  // Reset name and remove clean script
  packageJson.name = 'my-nextjs-app';
  packageJson.version = '0.1.0';
  packageJson.description = '';
  packageJson.author = '';

  // Remove the clean script
  delete packageJson.scripts.clean;

  fs.writeFileSync(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2) + '\n'
  );
  console.log('✅ Updated package.json');
}

// Remove files and directories
function removeFilesAndDirs() {
  filesToRemove.forEach(item => {
    const itemPath = path.join(process.cwd(), item);
    if (fs.existsSync(itemPath)) {
      const stats = fs.statSync(itemPath);
      if (stats.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        console.log(`✅ Removed directory: ${item}`);
      } else {
        fs.unlinkSync(itemPath);
        console.log(`✅ Removed file: ${item}`);
      }
    }
  });
}

// Reset files with new content
function resetFiles() {
  Object.entries(filesToReset).forEach(([filePath, content]) => {
    const fullPath = path.join(process.cwd(), filePath);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Reset: ${filePath}`);
  });
}

// Clean hooks directory
function cleanHooksDirectory() {
  const hooksDir = path.join(process.cwd(), 'src/hooks');
  if (fs.existsSync(hooksDir)) {
    // Remove all files in hooks directory
    const files = fs.readdirSync(hooksDir);
    files.forEach(file => {
      fs.unlinkSync(path.join(hooksDir, file));
    });

    // Create a simple index.ts
    fs.writeFileSync(
      path.join(hooksDir, 'index.ts'),
      `// Export your custom hooks here
export {};
`
    );
    console.log('✅ Cleaned hooks directory');
  }
}

// Clean public directory (keep essential files)
function cleanPublicDirectory() {
  const publicDir = path.join(process.cwd(), 'public');
  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const filesToKeep = ['next.svg', 'vercel.svg'];

    files.forEach(file => {
      if (!filesToKeep.includes(file)) {
        const filePath = path.join(publicDir, file);
        const stats = fs.statSync(filePath);
        if (stats.isFile()) {
          fs.unlinkSync(filePath);
          console.log(`✅ Removed from public: ${file}`);
        }
      }
    });
  }
}

// Reset git history (optional)
function resetGitHistory() {
  try {
    if (fs.existsSync('.git')) {
      console.log('🔄 Resetting git history...');
      execSync('rm -rf .git', { stdio: 'inherit' });
      execSync('git init', { stdio: 'inherit' });
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "Initial commit"', { stdio: 'inherit' });
      console.log('✅ Git history reset');
    }
  } catch (error) {
    console.log('⚠️  Could not reset git history:', error.message);
  }
}

// Main execution
try {
  removeFilesAndDirs();
  resetFiles();
  cleanHooksDirectory();
  cleanPublicDirectory();
  updatePackageJson();

  console.log('\n🎉 Template cleanup completed!');
  console.log('\nNext steps:');
  console.log('1. Update package.json name, description, and author');
  console.log('2. Run: npm install');
  console.log('3. Run: npm run dev');
  console.log('4. Start building your awesome project!');

  // Ask if user wants to reset git history
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question('\nDo you want to reset git history? (y/N): ', answer => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      resetGitHistory();
    }
    rl.close();
    console.log('\n🚀 Ready to start your new project!');
  });
} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
  process.exit(1);
}

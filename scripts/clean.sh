#!/bin/bash

echo "🧹 Cleaning Next.js template..."
echo

# Remove template-specific files
echo "📁 Removing template files..."
rm -f CONTRIBUTING.md EXAMPLE_PR.md LICENSE CHANGELOG.md
rm -rf .github
echo "✅ Removed template documentation files"

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
pkg.description = '';
pkg.author = '';
delete pkg.scripts.clean;
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
echo "✅ Updated package.json"

echo
echo "🎉 Template cleanup completed!"
echo
echo "Next steps:"
echo "1. Update package.json name, description, and author"
echo "2. Run: npm install"
echo "3. Run: npm run dev"
echo "4. Start building your awesome project!"
echo

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

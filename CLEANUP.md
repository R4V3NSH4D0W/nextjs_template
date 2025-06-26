# Template Cleanup Guide

This Next.js template includes a cleanup script to help you quickly prepare it for a new project by removing template-specific content and resetting files to a clean state.

## What Gets Cleaned

### Files Removed

- `CONTRIBUTING.md` - Template contribution guidelines
- `EXAMPLE_PR.md` - Template PR example
- `LICENSE` - Template license file
- `CHANGELOG.md` - Template changelog
- `.github/` - Template GitHub workflows and issue templates
- `src/lib/validations.ts` - Template validation schemas
- `src/components/ui/button.tsx` - Template button component

### Files Reset

- `README.md` - Reset to basic project documentation
- `src/app/page.tsx` - Reset to clean welcome page
- `src/lib/utils.ts` - Reset to minimal utility functions
- `src/hooks/index.ts` - Reset to empty hooks export
- `package.json` - Reset name, version, description, and author fields
- `public/` - Remove template-specific assets (keeps Next.js essentials)

### Optional

- Git history can be reset to start fresh

## Usage Options

### Option 1: NPM Script (Recommended)

```bash
npm run clean
```

### Option 2: Direct Shell Script

```bash
./scripts/clean.sh
```

### Option 3: NPX Compatible (if set up)

```bash
npx clean-nextjs-template
```

## After Cleanup

1. **Update package.json**:

   ```json
   {
     "name": "your-project-name",
     "description": "Your project description",
     "author": "Your Name"
   }
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development**:

   ```bash
   npm run dev
   ```

4. **Begin building your project**!

## What Remains

After cleanup, your project will have:

- ✅ Next.js 15 with App Router and Turbopack
- ✅ TypeScript configuration
- ✅ Tailwind CSS setup
- ✅ ESLint and Prettier configuration
- ✅ Husky and lint-staged for Git hooks
- ✅ Commitlint for conventional commits
- ✅ Zod for validation
- ✅ Clean UI components structure
- ✅ Clean project structure
- ✅ Development tooling and scripts

## Manual Cleanup (Alternative)

If you prefer to clean manually:

1. Delete template files:

   ```bash
   rm CONTRIBUTING.md EXAMPLE_PR.md LICENSE CHANGELOG.md
   rm -rf .github
   ```

2. Clean source files:

   ```bash
   rm src/lib/validations.ts
   rm src/components/ui/button.tsx
   echo "export {};" > src/hooks/index.ts
   ```

3. Update package.json fields
4. Reset README.md and page.tsx content
5. Optionally reset git history

## Reverting Changes

If you need to restore the template content:

```bash
git checkout HEAD -- .
```

(Only works if you haven't reset git history)

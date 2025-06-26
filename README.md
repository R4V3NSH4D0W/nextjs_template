# Next.js Template

A comprehensive Next.js template with modern development tools and best practices pre-configured.

## Features

- ⚡️ **Next.js 15** with App Router and Turbopack
- 🎨 **Tailwind CSS** for styling
- 📝 **TypeScript** for type safety
- 🔧 **ESLint** with Next.js recommended config
- 💅 **Prettier** for code formatting
- 🐕 **Husky** for Git hooks
- 🚫 **lint-staged** for running linters on staged files
- 📋 **Commitlint** for conventional commits
- 🔍 **Zod** for runtime type validation
- 🎣 **Custom React hooks** for common functionality
- 🎯 **Absolute imports** configured

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd nextjs_template
```

2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # React components
│   └── ui/             # Reusable UI components
├── hooks/              # Custom React hooks
└── lib/                # Utility functions and configurations
    ├── utils.ts        # General utilities
    └── validations.ts  # Zod schemas and validations
```

## Development Tools

### Code Quality

- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Consistent code formatting
- **TypeScript**: Strict type checking enabled

### Git Hooks

- **Pre-commit**: Runs lint-staged to check staged files
- **Commit-msg**: Validates commit messages using conventional commits

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

# Examples:
feat: add user authentication
fix: resolve navigation bug
docs: update README
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret
```

## Utilities

### Custom Hooks

- `useLocalStorage` - Manage localStorage state
- `useDebounce` - Debounce values
- `useClickOutside` - Detect clicks outside elements
- `useAsync` - Handle async operations

### Validation Schemas

Pre-configured Zod schemas for common use cases:

- User validation
- Email and password schemas
- API response schemas
- Environment variable validation

### UI Components

Basic UI components with Tailwind CSS:

- Button component with variants and sizes
- Utility functions for class name merging

## Deployment

### Vercel (Recommended)

1. Push to GitHub/GitLab/Bitbucket
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

Build the application:

```bash
npm run build
```

The output will be in the `.next` folder.

## Contributing

1. Follow the existing code style
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed

## License

MIT License - see LICENSE file for details.

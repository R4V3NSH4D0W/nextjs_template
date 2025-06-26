# 🚀 Next.js Production Template

A comprehensive, production-ready Next.js template with automated changelog generation, modern tooling, and exceptional developer experience.

## ✨ Features

### 🏗️ **Core Technologies**

- **Next.js 15** with Turbopack for lightning-fast development
- **React 19** with latest features and optimizations
- **TypeScript** for full type safety
- **Tailwind CSS v4** for modern styling
- **Zod** for runtime validation

### 📊 **Automated Changelog System**

- **Daily per-contributor reports** automatically generated
- **GitHub Actions integration** for seamless automation
- **Conventional commits** support with categorization
- **No merge conflicts** - separate files per contributor
- **Team standup ready** reports

### 🔧 **Developer Experience**

- **Husky** pre-commit hooks
- **Commitlint** for consistent commit messages
- **ESLint + Prettier** for code quality
- **Lint-staged** for optimized pre-commit checks
- **Hot reload** with Turbopack
- **Type checking** integration

### 🎨 **UI Components**

- **Reusable Button component** with variants
- **Utility functions** for class merging
- **Dark mode ready** styling
- **Responsive design** patterns

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone https://github.com/R4V3NSH4D0W/nextjs_template.git
cd nextjs_template
npm install
```

### 2. Start Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

### 3. Set Up Automation (Optional)

For automated changelog generation, see [Authentication Setup Guide](./AUTHENTICATION_SETUP.md).

## 📋 Available Scripts

| Script                 | Description                             |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Start development server with Turbopack |
| `npm run build`        | Build for production                    |
| `npm run start`        | Start production server                 |
| `npm run lint`         | Run ESLint                              |
| `npm run lint:fix`     | Fix ESLint issues automatically         |
| `npm run format`       | Format code with Prettier               |
| `npm run format:check` | Check code formatting                   |
| `npm run type-check`   | Run TypeScript type checking            |
| `npm run daily-report` | Generate daily changelog reports        |
| `npm run clean`        | Clean up template-specific files        |

### 🪟 Windows Users

For Windows compatibility, use these alternative commands:

| Command                        | Description                           |
| ------------------------------ | ------------------------------------- |
| `npm run clean:windows`        | Clean template (PowerShell version)   |
| `npm run daily-report:windows` | Generate reports (PowerShell version) |

Or run the batch files directly:

- `scripts\clean.bat` - Simple batch file version
- `scripts\clean.ps1` - PowerShell version (recommended)
- `scripts\daily-changelog.ps1` - PowerShell changelog generator

> **💡 GitHub Actions Compatibility:** GitHub Actions runs on Linux and uses the bash scripts automatically, so the automation works perfectly regardless of whether you develop on Windows, macOS, or Linux!

> **Note:** The `daily-report` command automatically creates the `changelogs/` directory structure if it doesn't exist, including the README.md file and all required subdirectories.

## 🔐 Automated Changelog Setup

This template includes a sophisticated daily changelog system:

### Features:

- ✅ **Per-contributor daily reports**
- ✅ **Automatic GitHub Actions integration**
- ✅ **Conventional commit categorization**
- ✅ **Team collaboration insights**
- ✅ **Historical tracking**

### Quick Setup:

1. **Create Personal Access Token**
   - GitHub Settings → Developer settings → Personal access tokens
   - Select `repo` and `workflow` scopes

2. **Add Repository Secret**
   - Repository Settings → Secrets and variables → Actions
   - Add secret named `PAT_TOKEN`

3. **Enable Automation**
   - Workflows run automatically on push, PR merge, and daily schedule

**Detailed Guide:** [AUTHENTICATION_SETUP.md](./AUTHENTICATION_SETUP.md)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # Reusable components
│   └── ui/                # UI component library
│       └── button.tsx     # Button component
├── hooks/                 # Custom React hooks
│   └── index.ts          # Hook exports
└── lib/                   # Utility functions
    ├── utils.ts          # General utilities
    └── validations.ts    # Zod schemas

.github/
└── workflows/             # GitHub Actions
    ├── ci.yml            # Continuous Integration
    └── daily-changelog.yml # Changelog automation

scripts/
├── clean.sh              # Cleanup utility
└── daily-changelog.sh    # Changelog generation

changelogs/               # Generated changelog reports
├── daily/               # Daily aggregate reports
└── daily/contributors/  # Per-contributor reports
```

## 🎯 Code Quality

### Pre-commit Hooks

- **ESLint** - Code linting and error detection
- **Prettier** - Automatic code formatting
- **Type checking** - TypeScript validation
- **Commitlint** - Commit message validation

### Conventional Commits

```bash
feat: add new user authentication
fix: resolve login validation issue
docs: update API documentation
chore: update dependencies
```

### Commit Categories:

- `feat:` ✨ New features
- `fix:` 🐛 Bug fixes
- `docs:` 📚 Documentation
- `style:` 💄 Code style changes
- `refactor:` ♻️ Code refactoring
- `chore:` 🔧 Maintenance tasks

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

### Docker

```bash
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

### Manual Build

```bash
npm run build
npm start
```

## 📚 Documentation

- **[Daily Changelog System](./DAILY_CHANGELOG_SYSTEM.md)** - Complete automation guide
- **[Authentication Setup](./AUTHENTICATION_SETUP.md)** - GitHub Actions configuration
- **[Contributing Guidelines](./CONTRIBUTING.md)** - Development guidelines

## 🛠️ Technology Stack

| Category       | Technology   | Version | Purpose               |
| -------------- | ------------ | ------- | --------------------- |
| **Framework**  | Next.js      | 15.3.4  | React framework       |
| **Runtime**    | React        | 19.0.0  | UI library            |
| **Language**   | TypeScript   | 5.x     | Type safety           |
| **Styling**    | Tailwind CSS | 4.x     | Utility-first CSS     |
| **Validation** | Zod          | 3.25.67 | Runtime validation    |
| **Linting**    | ESLint       | 9.x     | Code linting          |
| **Formatting** | Prettier     | 3.6.1   | Code formatting       |
| **Git Hooks**  | Husky        | 9.1.7   | Pre-commit automation |
| **Commits**    | Commitlint   | 19.8.1  | Commit validation     |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/R4V3NSH4D0W/nextjs_template/issues)
- **Discussions**: [GitHub Discussions](https://github.com/R4V3NSH4D0W/nextjs_template/discussions)
- **Documentation**: [Project Wiki](https://github.com/R4V3NSH4D0W/nextjs_template/wiki)

---

**Built with ❤️ for the Next.js community**

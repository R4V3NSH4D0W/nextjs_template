# 🤝 Contributing to Next.js Production Template

Thank you for your interest in contributing! This guide will help you understand our development process and standards.

## 🚀 Quick Start for Contributors

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
git clone https://github.com/your-username/nextjs_template.git
cd nextjs_template
```

### 2. Set Up Development Environment

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests and checks
npm run lint
npm run type-check
npm run format:check
```

### 3. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

## 📋 Development Guidelines

### Code Quality Standards

#### **TypeScript**

- Use strict TypeScript settings
- Define proper interfaces and types
- Avoid `any` type usage
- Use Zod for runtime validation

#### **React Best Practices**

- Use functional components with hooks
- Implement proper error boundaries
- Follow React 19 patterns
- Use proper component composition

#### **Styling Guidelines**

- Use Tailwind CSS utility classes
- Follow responsive design patterns
- Maintain consistent spacing and colors
- Use CSS-in-JS only when necessary

### 🎯 Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/) for automated changelog generation:

#### **Commit Types:**

```bash
feat:     ✨ New feature
fix:      🐛 Bug fix
docs:     📚 Documentation
style:    💄 Code style (formatting, etc.)
refactor: ♻️ Code refactoring
perf:     ⚡ Performance improvement
test:     🧪 Adding tests
chore:    🔧 Maintenance tasks
ci:       👷 CI/CD changes
build:    📦 Build system changes
```

#### **Commit Format:**

```bash
type(scope): description

# Examples:
feat(auth): add OAuth integration
fix(ui): resolve button alignment issue
docs(readme): update installation guide
refactor(utils): simplify helper functions
```

#### **Commit Message Rules:**

- Use imperative mood ("add feature" not "added feature")
- Start with lowercase letter
- No period at the end
- Keep first line under 72 characters
- Include body and footer if needed

### 🔍 Code Review Process

#### **Before Submitting PR:**

```bash
# Run all checks
npm run lint:fix          # Fix linting issues
npm run format           # Format code
npm run type-check       # Check TypeScript
npm run build            # Verify build works
```

#### **PR Requirements:**

- ✅ All CI checks pass
- ✅ Code follows style guidelines
- ✅ Includes appropriate tests
- ✅ Documentation updated if needed
- ✅ Commits follow conventional format

---

**Thank you for contributing to make this template better for everyone! 🙏**

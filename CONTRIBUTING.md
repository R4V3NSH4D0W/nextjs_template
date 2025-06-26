# Contributing to Next.js Template

Thank you for considering contributing to this Next.js template! 🎉

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)

## 📜 Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please be respectful and constructive in all interactions.

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

- Use the bug report template
- Include clear reproduction steps
- Provide environment details
- Search existing issues first

### ✨ Suggesting Features

- Use the feature request template
- Explain the motivation and use case
- Consider backwards compatibility
- Discuss in issues before implementing

### 🔧 Code Contributions

- Fork the repository
- Create a feature branch
- Follow coding standards
- Add tests for new functionality
- Update documentation

### 📚 Documentation

- Fix typos and improve clarity
- Add missing examples
- Update outdated information
- Translate to other languages

## 🛠 Development Setup

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Setup Steps

1. **Fork and clone the repository**

   ```bash
   git clone https://github.com/yourusername/nextjs_template.git
   cd nextjs_template
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

5. **Run tests and checks**
   ```bash
   npm run lint
   npm run type-check
   npm run format:check
   ```

## 🔄 Pull Request Process

### Before Submitting

- [ ] Run all linting and formatting checks
- [ ] Ensure all tests pass
- [ ] Update documentation if needed
- [ ] Follow commit message conventions
- [ ] Rebase on latest main branch

### PR Guidelines

1. **Create descriptive PR title**
   - Use conventional commit format
   - Be clear and concise

2. **Fill out PR template completely**
   - Describe changes made
   - Link related issues
   - List testing performed

3. **Keep PRs focused**
   - One feature/fix per PR
   - Avoid unrelated changes
   - Split large changes into smaller PRs

4. **Respond to feedback**
   - Address review comments
   - Update code as requested
   - Be open to suggestions

### Review Process

- Maintainers will review within 48 hours
- At least one approval required
- All checks must pass
- No merge conflicts

## 🎨 Coding Standards

### TypeScript

- Use strict TypeScript settings
- Prefer interfaces over types for objects
- Use proper return types for functions
- Avoid `any` type when possible

### React

- Use functional components with hooks
- Follow React best practices
- Use proper prop types
- Implement error boundaries where needed

### Styling

- Use Tailwind CSS for styling
- Follow Tailwind best practices
- Use semantic CSS class names
- Ensure responsive design

### File Structure

```
src/
├── app/                 # Next.js app router
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   └── layout/         # Layout components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

### Naming Conventions

- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Functions**: camelCase (e.g., `getUserData`)
- **Constants**: SCREAMING_SNAKE_CASE (e.g., `API_BASE_URL`)
- **Types/Interfaces**: PascalCase (e.g., `UserData`)

## 📝 Commit Guidelines

This project follows [Conventional Commits](https://www.conventionalcommits.org/).

### Format

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

### Examples

```bash
feat: add user authentication system
fix: resolve navigation menu overflow issue
docs: update README with new installation steps
style: format code according to prettier rules
refactor: extract common utility functions
test: add unit tests for user service
chore: update dependencies to latest versions
```

### Commit Message Guidelines

- Use imperative mood ("add" not "added")
- Keep first line under 72 characters
- Reference issues/PRs when applicable
- Include breaking change notes in footer

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for all new functionality
- Follow existing test patterns
- Use descriptive test names
- Test edge cases and error conditions
- Aim for high test coverage

### Test Types

- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows

## 📊 Performance

- Monitor bundle size impact
- Optimize images and assets
- Use lazy loading where appropriate
- Follow Next.js performance best practices
- Test on slower devices/networks

## 🛡 Security

- Follow security best practices
- Validate all user inputs
- Use proper authentication/authorization
- Keep dependencies updated
- Report security issues privately

## 📈 Documentation

- Update README for new features
- Add inline code comments
- Create examples for complex features
- Update API documentation
- Include migration guides for breaking changes

## ❓ Questions?

- Check existing issues and discussions
- Ask in GitHub Discussions
- Join community Discord/Slack
- Contact maintainers directly

## 🙏 Recognition

Contributors will be recognized in:

- README contributors section
- Release notes
- Social media mentions

Thank you for contributing! 🚀

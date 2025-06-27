# Testing Guide

This project includes comprehensive testing setup with multiple testing tools for different purposes.

## Testing Stack

### 🔧 Testing Tools

- **Vitest**: Fast unit testing with native TypeScript support
- **Playwright**: End-to-end testing with cross-browser support
- **Cypress**: UI testing and component testing
- **Newman**: API testing with Postman collections

### 📁 Test Structure

```
tests/
├── unit/                 # Unit tests (Vitest)
├── e2e/                  # End-to-end tests (Playwright)
└── api/                  # API tests (Postman collections)

cypress/
├── e2e/                  # Cypress E2E tests
├── component/            # Cypress component tests
└── support/              # Cypress support files
```

## 🚀 Running Tests

### Unit Tests (Vitest)

```bash
# Run unit tests
npm run test:unit

# Run in watch mode
npm run test:unit:watch

# Generate coverage report
npm run test:unit:coverage
```

### End-to-End Tests (Playwright)

```bash
# Run E2E tests
npm run test:e2e

# Run with UI mode
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug tests
npm run test:e2e:debug
```

### Cypress Tests

```bash
# Open Cypress UI
npm run test:cypress

# Run Cypress tests headlessly
npm run test:cypress:run

# Run Cypress tests completely headless
npm run test:cypress:headless
```

### API Tests (Newman/Postman)

```bash
# Run API tests
npm run test:api
```

### Visual Regression Tests

```bash
# Run visual regression tests
npm run test:visual
```

### Accessibility Tests

```bash
# Run accessibility tests
npm run test:accessibility
```

### Run All Tests

```bash
# Run all test suites
npm run test
```

## 📝 Writing Tests

### Unit Tests (Vitest)

Create test files with `.test.ts` or `.test.tsx` extension in the `tests/unit/` directory:

```typescript
// tests/unit/utils.test.ts
import { describe, it, expect } from 'vitest';
import { myFunction } from '@/lib/utils';

describe('myFunction', () => {
  it('should return correct value', () => {
    expect(myFunction('input')).toBe('expected');
  });
});
```

### Component Tests

```typescript
// tests/unit/button.test.tsx
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

Create test files with `.spec.ts` extension in the `tests/e2e/` directory:

```typescript
// tests/e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('NextJS Template')).toBeVisible();
});
```

### Cypress Tests

Create test files with `.cy.ts` extension in the `cypress/e2e/` directory:

```typescript
// cypress/e2e/homepage.cy.ts
describe('Homepage', () => {
  it('should display main content', () => {
    cy.visit('/');
    cy.contains('NextJS Template').should('be.visible');
  });
});
```

## 🎯 Test Categories

### 1. Unit Tests

- Component logic
- Utility functions
- Custom hooks
- Business logic

### 2. Integration Tests

- API routes
- Database operations
- Third-party integrations

### 3. E2E Tests

- User workflows
- Full application features
- Cross-browser compatibility

### 4. Visual Tests

- UI regression testing
- Screenshot comparisons
- Layout consistency

### 5. Accessibility Tests

- WCAG compliance
- Screen reader compatibility
- Keyboard navigation

### 6. Performance Tests

- Load times
- Bundle size
- Core Web Vitals

## 🔧 Configuration Files

- `vitest.config.ts` - Vitest configuration
- `playwright.config.ts` - Playwright configuration
- `cypress.config.ts` - Cypress configuration
- `tests/api/postman-collection.json` - API test collection

## 📊 Coverage Reports

Coverage reports are generated in the `coverage/` directory when running:

```bash
npm run test:unit:coverage
```

## 🚨 Test Best Practices

1. **Write descriptive test names**
2. **Follow the AAA pattern** (Arrange, Act, Assert)
3. **Keep tests independent**
4. **Use data-testid for reliable selectors**
5. **Mock external dependencies**
6. **Test user behavior, not implementation**

## 🐛 Debugging Tests

### Playwright

```bash
# Debug specific test
npx playwright test tests/e2e/homepage.spec.ts --debug

# Show browser
npx playwright test --headed
```

### Cypress

```bash
# Open Cypress UI for debugging
npm run test:cypress
```

### Vitest

```bash
# Run in watch mode with coverage
npm run test:unit:watch
```

## 🚀 CI/CD Integration

Tests are automatically run in GitHub Actions. Check `.github/workflows/` for CI configuration.

## 📈 Test Metrics

Track these metrics for test health:

- Test coverage percentage
- Test execution time
- Flaky test rate
- Test maintenance burden

## 🛠️ Troubleshooting

### Common Issues

1. **Tests failing in CI but passing locally**
   - Check for timezone differences
   - Verify environment variables
   - Check for race conditions

2. **Slow test execution**
   - Use test.concurrent() for independent tests
   - Mock heavy operations
   - Optimize test data setup

3. **Flaky tests**
   - Add proper waits
   - Use deterministic test data
   - Avoid time-dependent assertions

## 📚 Additional Resources

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [Cypress Documentation](https://docs.cypress.io/)
- [Testing Library Documentation](https://testing-library.com/)

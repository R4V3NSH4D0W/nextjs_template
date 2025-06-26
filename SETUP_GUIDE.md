# 🚀 Complete Setup Guide

This comprehensive guide will walk you through setting up the Next.js Production Template for development, production, and automation.

## 📋 Prerequisites

### **System Requirements**

- **Node.js** 18.x or later
- **NPM** 9.x or later (or Yarn/PNPM)
- **Git** 2.x or later
- **Code Editor** (VS Code recommended)

### **Recommended VS Code Extensions**

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "github.copilot"
  ]
}
```

## 🎯 Quick Setup (5 minutes)

### **1. Clone and Install**

```bash
# Clone the repository
git clone https://github.com/R4V3NSH4D0W/nextjs_template.git your-project-name
cd your-project-name

# Install dependencies
npm install

# Start development
npm run dev
```

### **2. Verify Installation**

- Open http://localhost:3000
- Check if hot reload works
- Verify TypeScript compilation
- Test code formatting

✅ **You're ready to develop!**

## 🔧 Complete Development Setup

### **1. Environment Configuration**

#### **Create Environment Files**

```bash
# Development environment
touch .env.local

# Add your environment variables
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local
echo "NEXT_PUBLIC_APP_NAME=Your App Name" >> .env.local
```

#### **Example .env.local**

```bash
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=My Next.js App
NEXT_PUBLIC_APP_VERSION=1.0.0

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# API Configuration
API_BASE_URL=https://api.example.com
API_SECRET_KEY=your-secret-key

# Database (if using)
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Authentication (if using)
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
```

### **2. Git Configuration**

#### **Set Up Git Hooks**

```bash
# Git hooks are automatically installed via Husky
# Verify hooks are working
git add .
git commit -m "test: verify git hooks"
```

#### **Configure Git User**

```bash
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### **3. Editor Configuration**

#### **VS Code Settings (.vscode/settings.json)**

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

## 🤖 Automated Changelog Setup

### **Step 1: GitHub Personal Access Token**

#### **Create PAT Token**

1. Go to GitHub → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
5. Set expiration: **No expiration** (for automation)
6. Copy the generated token

#### **Add Repository Secret**

1. Go to your repository on GitHub
2. Settings → Secrets and variables → Actions
3. New repository secret:
   - **Name:** `PAT_TOKEN`
   - **Value:** [paste your token]
4. Add secret

### **Step 2: Enable GitHub Actions**

#### **Repository Settings**

1. Repository → Settings → Actions → General
2. **Actions permissions:** Allow all actions and reusable workflows
3. **Workflow permissions:** Read and write permissions
4. **Allow GitHub Actions to create and approve pull requests:** ✅ Enabled

#### **Verify Workflow**

```bash
# Push a commit to trigger the workflow
git add .
git commit -m "feat: test automated changelog generation"
git push origin main

# Check GitHub Actions tab for workflow execution
```

### **Step 3: Configure Conventional Commits**

#### **Commit Message Format**

```bash
# Feature
git commit -m "feat(auth): add OAuth integration"
git commit -m "feat: implement user dashboard"

# Bug Fix
git commit -m "fix(ui): resolve button alignment issue"
git commit -m "fix: correct API endpoint path"

# Documentation
git commit -m "docs(readme): update installation guide"
git commit -m "docs: add API documentation"

# Maintenance
git commit -m "chore(deps): update dependencies"
git commit -m "refactor(utils): simplify helper functions"
```

## 🏗️ Production Deployment

### **Vercel Deployment (Recommended)**

#### **1. Automatic Deployment**

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts for configuration
```

#### **2. Environment Variables in Vercel**

1. Vercel Dashboard → Project → Settings → Environment Variables
2. Add production environment variables:
   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   API_BASE_URL=https://api.your-domain.com
   DATABASE_URL=your-production-db-url
   ```

#### **3. Custom Domain**

1. Vercel Dashboard → Project → Domains
2. Add custom domain
3. Configure DNS records
4. Enable HTTPS (automatic)

### **Docker Deployment**

#### **Create Dockerfile**

```dockerfile
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### **Docker Commands**

```bash
# Build image
docker build -t nextjs-app .

# Run container
docker run -p 3000:3000 nextjs-app

# Docker Compose (docker-compose.yml)
version: '3.8'
services:
  nextjs-app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
```

### **Manual Server Deployment**

#### **Build and Deploy**

```bash
# Build for production
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start npm --name "nextjs-app" -- start
pm2 save
pm2 startup
```

## 🔒 Security Configuration

### **Content Security Policy**

#### **next.config.ts**

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self'",
              "connect-src 'self' https:",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

### **Environment Security**

```bash
# Production environment variables
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Secrets (never commit these)
DATABASE_URL=postgresql://...
API_SECRET_KEY=your-secret-key
NEXTAUTH_SECRET=your-nextauth-secret
```

## 📊 Monitoring & Analytics

### **Performance Monitoring**

#### **Web Vitals**

```typescript
// pages/_app.tsx
export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
  // Send to analytics service
}
```

#### **Error Tracking**

```typescript
// Error boundary component
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({error}: {error: Error}) {
  return (
    <div role="alert">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
}

// Usage
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <App />
</ErrorBoundary>
```

### **Analytics Integration**

#### **Google Analytics**

```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

## 🧪 Testing Setup

### **Jest Configuration**

#### **jest.config.js**

```javascript
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

#### **Testing Scripts**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### **E2E Testing with Playwright**

#### **Installation**

```bash
npm install --save-dev @playwright/test
npx playwright install
```

#### **Basic Test**

```typescript
// tests/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.locator('h1')).toContainText('Next.js Production Template');
});
```

## 🔧 Advanced Configuration

### **Custom Webpack Configuration**

#### **next.config.ts**

```typescript
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Custom webpack configuration
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
```

### **API Routes Security**

#### **Rate Limiting**

```typescript
// lib/rate-limit.ts
import { NextRequest } from 'next/server';

const rateLimitMap = new Map();

export function rateLimit(ip: string, limit = 10, window = 60000) {
  const now = Date.now();
  const userRequests = rateLimitMap.get(ip) || [];

  const validRequests = userRequests.filter(
    (timestamp: number) => now - timestamp < window
  );

  if (validRequests.length >= limit) {
    return false;
  }

  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}
```

### **Database Integration**

#### **Prisma Setup**

```bash
# Install Prisma
npm install prisma @prisma/client

# Initialize Prisma
npx prisma init

# Generate client
npx prisma generate

# Run migrations
npx prisma migrate dev
```

## 🚨 Troubleshooting

### **Common Issues**

#### **Build Errors**

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

#### **Git Hook Issues**

```bash
# Reinstall Husky
npm run prepare

# Check hook permissions
chmod +x .husky/pre-commit
```

#### **Changelog Automation Issues**

- Verify PAT_TOKEN is correctly set
- Check GitHub Actions permissions
- Ensure conventional commit format
- Review workflow logs in GitHub Actions

### **Performance Issues**

```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer

# Check lighthouse scores
npm install -g lighthouse
lighthouse http://localhost:3000
```

## 📞 Support & Resources

### **Documentation**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### **Community**

- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and community
- **Discord** - Real-time community support
- **Stack Overflow** - Technical questions

---

**🎉 Congratulations! You now have a fully configured, production-ready Next.js application with automated changelog generation and modern development tooling.**

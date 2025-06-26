import { Button } from '@/components/ui/button';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            Next.js Production Template
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8">
            A comprehensive, production-ready Next.js template with automated
            changelog generation, modern tooling, and developer experience
            optimizations.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" className="shadow-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg">
              View Documentation
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Feature Cards */}
          <FeatureCard
            icon="🚀"
            title="Next.js 15 + React 19"
            description="Latest Next.js with Turbopack for lightning-fast development and React 19 features."
          />
          <FeatureCard
            icon="📊"
            title="Daily Changelog Automation"
            description="Automated per-contributor daily reports with GitHub Actions integration."
          />
          <FeatureCard
            icon="🎨"
            title="Tailwind CSS v4"
            description="Modern styling with the latest Tailwind CSS and custom design system."
          />
          <FeatureCard
            icon="🔧"
            title="TypeScript + Zod"
            description="Full type safety with TypeScript and runtime validation with Zod."
          />
          <FeatureCard
            icon="📋"
            title="Code Quality Tools"
            description="ESLint, Prettier, Husky, and Commitlint for consistent code quality."
          />
          <FeatureCard
            icon="⚡"
            title="Developer Experience"
            description="Hot reload, pre-commit hooks, and automated workflows for optimal DX."
          />
        </div>

        {/* Setup Guide Preview */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Quick Setup Guide
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <SetupStep
              step="1"
              title="Clone & Install"
              description="Clone the repository and install dependencies with npm install"
              code="git clone [repo-url]\nnpm install"
            />
            <SetupStep
              step="2"
              title="Configure Automation"
              description="Set up GitHub Actions with PAT_TOKEN for changelog automation"
              code="# Add PAT_TOKEN secret\n# Enable workflow permissions"
            />
            <SetupStep
              step="3"
              title="Start Development"
              description="Run the development server and start building your application"
              code="npm run dev\n# Visit http://localhost:3000"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <TechBadge name="Next.js 15" />
            <TechBadge name="React 19" />
            <TechBadge name="TypeScript" />
            <TechBadge name="Tailwind CSS" />
            <TechBadge name="Zod" />
            <TechBadge name="ESLint" />
            <TechBadge name="Prettier" />
            <TechBadge name="Husky" />
            <TechBadge name="GitHub Actions" />
            <TechBadge name="Commitlint" />
            <TechBadge name="Lint-staged" />
            <TechBadge name="Turbopack" />
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            This template provides everything you need for a production-ready
            Next.js application.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="secondary" size="lg">
              View Full Documentation
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            >
              Check GitHub Repository
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

// Component: Feature Card
function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  );
}

// Component: Setup Step
function SetupStep({
  step,
  title,
  description,
  code,
}: {
  step: string;
  title: string;
  description: string;
  code: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
        {step}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-4">{description}</p>
      <pre className="bg-slate-100 dark:bg-slate-700 rounded-lg p-3 text-sm text-left overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// Component: Tech Badge
function TechBadge({ name }: { name: string }) {
  return (
    <div className="bg-slate-200 dark:bg-slate-700 rounded-full px-4 py-2 text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
      {name}
    </div>
  );
}

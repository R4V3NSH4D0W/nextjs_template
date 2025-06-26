export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-xl">NextJS Template</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a
                href="#features"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#setup"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Setup
              </a>
              <a
                href="#tech-stack"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                Tech Stack
              </a>
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-600 hover:text-blue-600 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              🚀 Production Ready Template
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-6 leading-tight">
            Next.js Template
            <br />
            <span className="text-4xl md:text-5xl">Built for Scale</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            A comprehensive, production-ready Next.js foundation with automated
            changelog generation, modern tooling, and exceptional developer
            experience. Start building immediately with enterprise-grade
            architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="https://github.com/R4V3NSH4D0W/nextjs_template"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-md shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              🚀 Get Started Now
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium text-slate-700 dark:text-slate-300 bg-transparent border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-all duration-200 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              📖 Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <StatItem number="15+" label="Modern Tools" />
            <StatItem number="100%" label="TypeScript" />
            <StatItem number="0" label="Config Needed" />
            <StatItem number="∞" label="Scalability" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              From development to deployment, this template includes all the
              modern tools and patterns you need for building production
              applications.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon="⚡"
              title="Next.js 15 + React 19"
              description="Latest framework with Turbopack for lightning-fast development and cutting-edge React features."
              gradient="from-yellow-400 to-orange-500"
            />
            <FeatureCard
              icon="📊"
              title="Daily Changelog Automation"
              description="Automated per-contributor reports with GitHub Actions. Perfect for team collaboration and tracking."
              gradient="from-green-400 to-blue-500"
            />
            <FeatureCard
              icon="🎨"
              title="Tailwind CSS v4"
              description="Modern utility-first CSS with custom design system and dark mode support out of the box."
              gradient="from-pink-400 to-purple-500"
            />
            <FeatureCard
              icon="🛡️"
              title="TypeScript + Zod"
              description="Complete type safety with TypeScript and runtime validation using Zod schemas."
              gradient="from-blue-400 to-cyan-500"
            />
            <FeatureCard
              icon="🔧"
              title="Quality Tools"
              description="ESLint, Prettier, Husky, and Commitlint for consistent code quality across your team."
              gradient="from-purple-400 to-pink-500"
            />
            <FeatureCard
              icon="🚀"
              title="Deploy Anywhere"
              description="Ready for Vercel, Docker, or any platform. Optimized builds and production configurations."
              gradient="from-cyan-400 to-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Setup Section */}
      <section id="setup" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Three simple steps to launch your production-ready Next.js
              application
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <SetupStep
                step="1"
                title="Clone & Install"
                description="Get the template and install dependencies"
                code={`git clone https://github.com/R4V3NSH4D0W/nextjs_template.git
cd nextjs_template
npm install`}
                gradient="from-blue-500 to-purple-500"
              />
              <SetupStep
                step="2"
                title="Configure"
                description="Set up authentication and environment variables"
                code={`# Add PAT_TOKEN to GitHub secrets
# Configure environment variables
cp .env.example .env.local`}
                gradient="from-purple-500 to-pink-500"
              />
              <SetupStep
                step="3"
                title="Deploy"
                description="Start development or deploy to production"
                code={`npm run dev
# or deploy to Vercel
vercel deploy`}
                gradient="from-pink-500 to-red-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech-stack"
        className="py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-slate-900"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              Built with the latest and most reliable technologies for optimal
              performance and developer experience
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <TechBadge name="Next.js 15" category="Framework" />
              <TechBadge name="React 19" category="Library" />
              <TechBadge name="TypeScript" category="Language" />
              <TechBadge name="Tailwind CSS" category="Styling" />
              <TechBadge name="Zod" category="Validation" />
              <TechBadge name="ESLint" category="Linting" />
              <TechBadge name="Prettier" category="Formatting" />
              <TechBadge name="Husky" category="Git Hooks" />
              <TechBadge name="GitHub Actions" category="CI/CD" />
              <TechBadge name="Commitlint" category="Standards" />
              <TechBadge name="Turbopack" category="Bundling" />
              <TechBadge name="Vercel" category="Deployment" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl md:text-2xl mb-10 opacity-90 leading-relaxed">
              Join thousands of developers using this template to build
              production-ready applications. Start your next project with
              confidence and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium text-blue-600 bg-white hover:bg-blue-50 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                📚 View Documentation
              </a>

              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-6 text-lg font-medium text-white bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 whitespace-nowrap ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                ⭐ Star on GitHub
              </a>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-4 opacity-75">
              <span className="text-sm">MIT License</span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="text-sm">Open Source</span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span className="text-sm">Community Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg"></div>
              <span className="font-bold text-xl">NextJS Template</span>
            </div>
            <p className="text-slate-400 mb-6">
              Built with ❤️ for the Next.js community
            </p>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Issues
              </a>
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contributing
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// Component: Stat Item
function StatItem({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
        {number}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
        {label}
      </div>
    </div>
  );
}

// Component: Feature Card
function FeatureCard({
  icon,
  title,
  description,
  gradient,
}: {
  icon: string;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-slate-700">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${gradient} text-white text-2xl mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

// Component: Setup Step
function SetupStep({
  step,
  title,
  description,
  code,
  gradient,
}: {
  step: string;
  title: string;
  description: string;
  code: string;
  gradient: string;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-100 dark:border-slate-700">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${gradient} text-white text-xl font-bold mb-6 shadow-lg`}
      >
        {step}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="text-slate-600 dark:text-slate-300 mb-6">{description}</p>
      <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-600">
        <pre className="text-sm text-slate-700 dark:text-slate-300 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Component: Tech Badge
function TechBadge({ name, category }: { name: string; category: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-200 border border-slate-100 dark:border-slate-700 text-center group hover:scale-105">
      <div className="font-semibold text-slate-900 dark:text-white mb-1">
        {name}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400">
        {category}
      </div>
    </div>
  );
}

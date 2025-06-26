export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-600/20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-600/10 blur-3xl animate-pulse"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl rotate-12 shadow-lg shadow-blue-500/30"></div>
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl -rotate-12 shadow-lg shadow-purple-500/30"></div>
              </div>
              <span className="font-bold text-2xl text-white">
                NextJS Template
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a
                href="#features"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#setup"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Setup
              </a>
              <a
                href="#tech-stack"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Stack
              </a>
              <a
                href="#showcase"
                className="text-white/80 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Showcase
              </a>
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/30"
              >
                ⭐ GitHub
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative z-10">
        <div className="text-center max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm text-blue-300 rounded-full text-sm font-medium mb-6 border border-blue-500/30">
              🚀 Production Ready Template • Enterprise Grade • Open Source
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent mb-8 leading-tight">
            NextJS Template
            <br />
            <span className="text-4xl md:text-6xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              For Lazy Developers
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            The ultimate Next.js foundation with automated changelog generation,
            modern tooling, and exceptional developer experience. Perfect for
            developers who feel lazy about writing daily reports! 😅 Start
            building immediately with enterprise-grade architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <a
              href="https://github.com/R4V3NSH4D0W/nextjs_template"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
            >
              🚀 Get Started Now
            </a>

            <a
              href="#features"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-lg rounded-xl border border-white/20 hover:border-white/40 transform hover:scale-105 transition-all duration-300"
            >
              📖 Explore Features
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <StatItem number="15+" label="Modern Tools" />
            <StatItem number="100%" label="TypeScript" />
            <StatItem number="0" label="Config Needed" />
            <StatItem number="∞" label="Scalability" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Everything You Need
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
              icon="✨"
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
      <section
        id="setup"
        className="py-20 bg-black/20 backdrop-blur-sm relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Get Started in Minutes
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
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
      <section id="tech-stack" className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Modern Tech Stack
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Built with the latest and most reliable technologies for optimal
              performance and developer experience
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
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

      {/* Showcase Section */}
      <section
        id="showcase"
        className="py-20 bg-black/20 backdrop-blur-sm relative z-10"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-world examples and comprehensive documentation to get you
              started
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ShowcaseCard
              icon="📚"
              title="Documentation"
              description="Comprehensive guides and API documentation"
              link="https://github.com/R4V3NSH4D0W/nextjs_template/blob/main/README.md"
            />
            <ShowcaseCard
              icon="🔧"
              title="Setup Guide"
              description="Step-by-step installation and configuration"
              link="https://github.com/R4V3NSH4D0W/nextjs_template/blob/main/SETUP_GUIDE.md"
            />
            <ShowcaseCard
              icon="🤝"
              title="Contributing"
              description="Guidelines for contributing to the project"
              link="https://github.com/R4V3NSH4D0W/nextjs_template/blob/main/CONTRIBUTING.md"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 backdrop-blur-sm rounded-3xl p-12 md:p-16 border border-white/20 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl md:text-2xl text-slate-300 mb-10 leading-relaxed">
              Join thousands of developers using this template to build
              production-ready applications. Start your next project with
              confidence and speed.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                📚 View Documentation
              </a>

              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold text-lg rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                ⭐ Star on GitHub
              </a>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-4 text-slate-400">
              <span className="text-sm">MIT License</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span className="text-sm">Open Source</span>
              <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
              <span className="text-sm">Community Driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg rotate-12"></div>
                <div className="absolute inset-0 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg -rotate-12"></div>
              </div>
              <span className="font-bold text-xl">NextJS Template</span>
            </div>
            <p className="text-slate-400 mb-6">
              Built with ❤️ for the Next.js community
            </p>
            <div className="flex justify-center space-x-8">
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
      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">
        {number}
      </div>
      <div className="text-sm text-slate-300 font-medium">{label}</div>
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
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:border-white/40">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${gradient} text-white text-2xl mb-6 shadow-lg`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4 text-white">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
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
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20">
      <div
        className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${gradient} text-white text-xl font-bold mb-6 shadow-lg`}
      >
        {step}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-300 mb-6">{description}</p>
      <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
        <pre className="text-sm text-slate-200 overflow-x-auto">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

// Component: Tech Badge
function TechBadge({ name, category }: { name: string; category: string }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 border border-white/20 hover:border-white/40 text-center group hover:scale-105">
      <div className="font-semibold text-white mb-1">{name}</div>
      <div className="text-xs text-slate-400">{category}</div>
    </div>
  );
}

// Component: Showcase Card
function ShowcaseCard({
  icon,
  title,
  description,
  link,
}: {
  icon: string;
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 hover:border-white/40 group"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
      <p className="text-slate-300 leading-relaxed">{description}</p>
    </a>
  );
}

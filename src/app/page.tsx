import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-950 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300 ring-1 ring-blue-700/10 dark:ring-blue-300/10">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Production Ready Template
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Next.js Template
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              A comprehensive Next.js template with modern tooling, best
              practices, and developer experience optimizations. Everything you
              need to start building amazing applications.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800"
            >
              View Documentation
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Built with Next.js 15, Turbopack, and optimized for maximum
                performance.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🛠️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Developer Tools
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                ESLint, Prettier, Husky, and TypeScript configured for the best
                DX.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Modern Design
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Tailwind CSS with custom components and beautiful UI elements.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Type Safety
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Full TypeScript support with Zod for runtime validation.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                CI/CD Ready
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                GitHub Actions, PR templates, and deployment configurations
                included.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                Mobile First
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Responsive design with mobile-first approach and PWA support.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-8">
            Built with Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-300">
            <div className="text-center space-y-2">
              <div className="text-3xl">⚛️</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Next.js
              </span>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">📘</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                TypeScript
              </span>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">🎨</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Tailwind
              </span>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">📦</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Zod
              </span>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">🐕</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Husky
              </span>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl">✨</div>
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Prettier
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-slate-600 dark:text-slate-400">
              Built with ❤️ for the developer community
            </div>
            <div className="flex space-x-6">
              <a
                href="https://github.com/R4V3NSH4D0W/nextjs_template"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-colors"
              >
                Examples
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

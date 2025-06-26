export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next.js!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Get started by editing{' '}
          <code className="bg-muted px-2 py-1 rounded font-mono text-sm">
            src/app/page.tsx
          </code>
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Documentation
          </a>
          <a
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-input bg-background px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Learn Next.js
          </a>
        </div>
      </div>
    </main>
  );
}

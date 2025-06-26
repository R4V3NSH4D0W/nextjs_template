@echo off
echo 🧹 Cleaning Next.js template...
echo.

REM Remove template-specific files
echo 📁 Removing template files...
if exist "CONTRIBUTING.md" del "CONTRIBUTING.md"
if exist "EXAMPLE_PR.md" del "EXAMPLE_PR.md"
if exist "LICENSE" del "LICENSE"
echo ✅ Removed template documentation files (GitHub files preserved)

REM Reset CHANGELOG.md to fresh state (preserving automation)
echo 📝 Resetting changelog and cleaning user-specific changelogs...
(
echo # Changelog
echo.
echo All notable changes to this project will be documented in this file.
echo.
echo The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/^),
echo and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html^).
echo.
echo ## [Unreleased]
echo.
echo ### Added
echo.
echo ### Changed
echo.
echo ### Deprecated
echo.
echo ### Removed
echo.
echo ### Fixed
echo.
echo ### Security
) > CHANGELOG.md

REM Clean only user-specific changelog files (preserve automation structure)
if exist "changelogs\daily" (
    if exist "changelogs\daily\*.md" del "changelogs\daily\*.md"
    if exist "changelogs\daily\contributors\*.md" del "changelogs\daily\contributors\*.md"
    echo ✅ Cleaned user-specific daily changelog files (structure preserved)
)
echo ✅ Reset main changelog (automation preserved)

REM Clean source files
echo 🔧 Cleaning source files...
if exist "src\lib\validations.ts" del "src\lib\validations.ts"
if exist "src\components\ui\button.tsx" del "src\components\ui\button.tsx"
echo ✅ Removed validations.ts and button.tsx

REM Reset hooks directory
echo 🎣 Cleaning hooks directory...
if exist "src\hooks\*" del "src\hooks\*"
(
echo // Export your custom hooks here
echo export {};
) > src\hooks\index.ts
echo ✅ Reset hooks directory

REM Reset utils.ts to minimal version
echo 🛠️  Resetting utils.ts...
(
echo import { type ClassValue, clsx } from 'clsx';
echo import { twMerge } from 'tailwind-merge';
echo.
echo /**
echo  * Utility function to merge Tailwind CSS classes
echo  */
echo export function cn(...inputs: ClassValue[]^) {
echo   return twMerge(clsx(inputs^)^);
echo }
) > src\lib\utils.ts
echo ✅ Reset utils.ts

REM Reset page.tsx with clean homepage
echo 🏠 Resetting homepage...
(
echo export default function HomePage(^) {
echo   return (
echo     ^<main className="flex min-h-screen flex-col items-center justify-center p-24"^>
echo       ^<div className="text-center"^>
echo         ^<h1 className="text-4xl font-bold mb-4"^>
echo           Welcome to Next.js!
echo         ^</h1^>
echo         ^<p className="text-xl text-muted-foreground mb-8"^>
echo           Get started by editing{' '}
echo           ^<code className="bg-muted px-2 py-1 rounded font-mono text-sm"^>
echo             src/app/page.tsx
echo           ^</code^>
echo         ^</p^>
echo         ^<div className="flex gap-4 justify-center"^>
echo           ^<a
echo             href="https://nextjs.org/docs"
echo             target="_blank"
echo             rel="noopener noreferrer"
echo             className="bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
echo           ^>
echo             Documentation
echo           ^</a^>
echo           ^<a
echo             href="https://nextjs.org/learn"
echo             target="_blank"
echo             rel="noopener noreferrer"
echo             className="border border-input bg-background px-6 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
echo           ^>
echo             Learn Next.js
echo           ^</a^>
echo         ^</div^>
echo       ^</div^>
echo     ^</main^>
echo   ^);
echo }
) > src\app\page.tsx
echo ✅ Reset homepage

REM Clean public directory (keep essential Next.js files)
echo 🗂️  Cleaning public directory...
for %%f in (public\*) do (
    if not "%%~nxf"=="next.svg" if not "%%~nxf"=="vercel.svg" del "%%f"
)
echo ✅ Cleaned public directory

echo.
echo 🎉 Template cleanup completed!
echo.
echo Next steps:
echo 1. Update package.json name, description, and author
echo 2. Run: npm install
echo 3. Run: npm run dev
echo 4. Start building your awesome project!
echo 5. Generate your first daily report: npm run daily-report:windows
echo.
echo 📝 Note: Template-specific files have been removed.
echo 🚀 Daily changelog automation system has been preserved and is ready to use!
echo.
echo 💡 For Windows users, use the :windows suffixed commands:
echo    npm run clean:windows
echo    npm run daily-report:windows

pause

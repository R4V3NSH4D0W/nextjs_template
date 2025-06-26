#!/usr/bin/env node

import fs from 'fs';
import { execSync } from 'child_process';

interface Colors {
  blue: string;
  green: string;
  yellow: string;
  red: string;
  cyan: string;
  magenta: string;
  reset: string;
}

interface AuthorData {
  name: string;
  commits: string[];
}

interface CommitEntry {
  type: 'feat' | 'fix' | 'other';
  entry: string;
  author: string;
  hash: string;
  message: string;
}

function log(message: string, color: keyof Colors | '' = ''): void {
  const colors: Colors = {
    blue: '\x1b[34m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    red: '\x1b[31m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
    reset: '\x1b[0m',
  };
  const colorCode = color ? colors[color] : '';
  console.log(`${colorCode}${message}${colors.reset}`);
}

const today = new Date().toISOString().split('T')[0];
log(`📊 Daily Changelog Generator - ${today}`, 'blue');
log('==================================================', 'blue');
console.log('');

// Create directories and initialize if needed
const dailyDir = 'changelogs/daily';
const contributorsDir = 'changelogs/daily/contributors';

if (!fs.existsSync(dailyDir)) {
  fs.mkdirSync(dailyDir, { recursive: true });
}
if (!fs.existsSync(contributorsDir)) {
  fs.mkdirSync(contributorsDir, { recursive: true });
}

// Create changelogs README if it doesn't exist
if (!fs.existsSync('changelogs/README.md')) {
  const readmeContent = `# Daily Changelogs

This directory contains automatically generated daily development reports.

## Structure

- \`daily/\` - Daily changelog reports organized by date
- \`daily/contributors/\` - Individual contributor reports organized by date and author

## Usage

Generate today's changelog:

\`\`\`bash
npm run daily-report
\`\`\`

## Automation

This system automatically:
- Categorizes commits (feat, fix, other)
- Tracks contributor activity
- Generates structured reports
- Maintains historical records

Reports are generated automatically via GitHub Actions or can be run manually.
`;
  fs.writeFileSync('changelogs/README.md', readmeContent);
  log('📁 Created changelogs/README.md', 'green');
}

// Get today's commits
const todayStart = new Date();
todayStart.setHours(0, 0, 0, 0);
const todayEnd = new Date();
todayEnd.setHours(23, 59, 59, 999);

const todayStartString = todayStart.toISOString().split('T')[0] + ' 00:00:00';
const todayEndString = todayEnd.toISOString().split('T')[0] + ' 23:59:59';

let todaysCommits: string;
try {
  // Check if we're in a git repository
  execSync('git status', { stdio: 'pipe' });

  todaysCommits = execSync(
    `git log --pretty=format:"%h|%an|%ad|%s" --date=short --since="${todayStartString}" --until="${todayEndString}"`,
    { encoding: 'utf8', stdio: 'pipe' }
  );
} catch {
  log('⚠️ Error: Not in a git repository or git not available.', 'yellow');
  process.exit(1);
}

if (!todaysCommits || todaysCommits.trim().length === 0) {
  log(`ℹ️ No commits found for today (${today})`, 'cyan');
  process.exit(0);
}

// Initialize variables and counters
const authors: Record<string, AuthorData> = {};
let featCount = 0;
let fixCount = 0;
let otherCount = 0;
const allCommits: CommitEntry[] = [];

log(`📅 Processing commits for ${today}...`, 'yellow');

// Process commits and display to terminal
const commitLines = todaysCommits.split('\n').filter(line => line.trim());
for (const commitLine of commitLines) {
  if (!commitLine || commitLine.startsWith('Merge')) {
    continue;
  }

  const parts = commitLine.split('|');
  if (parts.length < 4) {
    continue;
  }

  const hash = parts[0];
  const author = parts[1];
  const message = parts[3];

  // Normalize author name for filename
  const authorKey = author.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();

  // Track author
  if (!authors[authorKey]) {
    authors[authorKey] = {
      name: author,
      commits: [],
    };
  }

  // Categorize, display, and save
  let commitType: 'feat' | 'fix' | 'other';
  let desc: string;
  let fileEntry: string;

  if (message.match(/^feat(\([^)]*\))?:\s*(.*)$/)) {
    const match = message.match(/^feat(\([^)]*\))?:\s*(.*)$/);
    desc = match?.[2] || message;
    commitType = 'feat';
    log(`✨ FEATURE: ${message}`, 'green');
    log(`   👤 Author: ${author} | 🔗 Commit: ${hash}`, 'cyan');
    fileEntry = `- ✨ **${desc}** ([${hash}](../../commit/${hash})) - *${author}*`;
    featCount++;
  } else if (message.match(/^fix(\([^)]*\))?:\s*(.*)$/)) {
    const match = message.match(/^fix(\([^)]*\))?:\s*(.*)$/);
    desc = match?.[2] || message;
    commitType = 'fix';
    log(`🐛 BUGFIX: ${message}`, 'red');
    log(`   👤 Author: ${author} | 🔗 Commit: ${hash}`, 'cyan');
    fileEntry = `- 🐛 **${desc}** ([${hash}](../../commit/${hash})) - *${author}*`;
    fixCount++;
  } else {
    const match = message.match(/^[^:]*:\s*(.*)$/);
    desc = match?.[1] || message;
    commitType = 'other';
    log(`🔧 OTHER: ${message}`, 'cyan');
    log(`   👤 Author: ${author} | 🔗 Commit: ${hash}`, 'cyan');
    fileEntry = `- 🔧 **${desc}** ([${hash}](../../commit/${hash})) - *${author}*`;
    otherCount++;
  }

  authors[authorKey].commits.push(fileEntry);
  allCommits.push({
    type: commitType,
    entry: fileEntry,
    author,
    hash,
    message,
  });

  console.log('');
}

// Display summary
const totalCount = featCount + fixCount + otherCount;
log(`📈 Summary for ${today}:`, 'magenta');
log(`   Total commits: ${totalCount}`, 'cyan');
log(`   ✨ Features: ${featCount}`, 'green');
log(`   🐛 Bug fixes: ${fixCount}`, 'red');
log(`   🔧 Other: ${otherCount}`, 'cyan');
console.log('');

// Generate daily aggregate report
const dailyReportFile = `changelogs/daily/${today}.md`;
log('📊 Generating daily aggregate report...', 'yellow');

let dailyReportContent = `# Daily Report - ${today}

## Summary
- **Total commits:** ${totalCount}
- **Features:** ${featCount}
- **Bug fixes:** ${fixCount}  
- **Other changes:** ${otherCount}

## All Commits

`;

// Add all commits to daily report
for (const commit of allCommits) {
  dailyReportContent += commit.entry + '\n';
}

dailyReportContent += `
---
*Generated on ${new Date().toISOString()}*
`;

fs.writeFileSync(dailyReportFile, dailyReportContent);

// Generate per-contributor daily reports
let contributorCount = 0;
for (const [authorKey, authorData] of Object.entries(authors)) {
  const commitCount = authorData.commits.length;

  if (commitCount > 0) {
    const contributorFile = `changelogs/daily/contributors/${today}-${authorKey}.md`;
    log(`📝 Generating daily report for ${authorData.name}...`, 'yellow');

    let contributorContent = `# Daily Report for ${authorData.name} - ${today}

## Summary
- **Commits today:** ${commitCount}

## Commits

`;

    // Add contributor's commits
    for (const commitEntry of authorData.commits) {
      contributorContent += commitEntry + '\n';
    }

    contributorContent += `
---
*Generated on ${new Date().toISOString()}*
`;

    fs.writeFileSync(contributorFile, contributorContent);
    contributorCount++;
  }
}

// Update main changelogs index
let indexContent = `# Daily Changelogs by Contributor

This directory contains daily changelog files for each contributor organized by date.

## How It Works

- **Daily aggregate reports**: \`daily/{YYYY-MM-DD}.md\` - All commits for a specific day
- **Per-contributor reports**: \`daily/contributors/{YYYY-MM-DD}-{username}.md\` - Individual daily activity

## Generate Daily Reports

Daily reports are automatically generated via GitHub Actions, but you can also run:

\`\`\`bash
npm run daily-report
\`\`\`

## Today's Reports

`;

// Add links to today's reports if they exist
if (fs.existsSync(dailyReportFile)) {
  indexContent += `- [📊 Today's Aggregate Report](./daily/${today}.md)\n`;
}

if (contributorCount > 0) {
  indexContent += '- 👥 **Individual Reports:**\n';
  for (const [authorKey, authorData] of Object.entries(authors)) {
    const contributorFile = `changelogs/daily/contributors/${today}-${authorKey}.md`;
    if (fs.existsSync(contributorFile)) {
      indexContent += `  - [${authorData.name}](./daily/contributors/${today}-${authorKey}.md)\n`;
    }
  }
}

indexContent += `
## Navigation

- 📁 [View all daily reports](./daily/)
- 👥 [View all contributor reports](./daily/contributors/)
`;

fs.writeFileSync('changelogs/README.md', indexContent);

// Final output
log('✅ Daily reports generated successfully!', 'green');
log(`   📄 Aggregate report: ${dailyReportFile}`, 'cyan');
log(`   👥 Contributor reports: ${contributorCount} files`, 'cyan');
log(`   📊 Total commits processed: ${totalCount}`, 'cyan');
console.log('');
log('💡 Daily reports are automatically updated via GitHub Actions!', 'cyan');

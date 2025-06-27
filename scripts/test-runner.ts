#!/usr/bin/env node

import { execSync } from 'child_process';
import readline from 'readline';

interface Colors {
  blue: string;
  green: string;
  yellow: string;
  red: string;
  cyan: string;
  magenta: string;
  reset: string;
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

function askQuestion(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function runTests(testType: string): Promise<void> {
  log(`🚀 Running ${testType} tests...`, 'blue');

  try {
    switch (testType) {
      case 'unit':
        execSync('npm run test:unit', { stdio: 'inherit' });
        break;
      case 'e2e':
        execSync('npm run test:e2e', { stdio: 'inherit' });
        break;
      case 'cypress':
        execSync('npm run test:cypress:run', { stdio: 'inherit' });
        break;
      case 'api':
        execSync('npm run test:api', { stdio: 'inherit' });
        break;
      case 'all':
        log('Running all test suites...', 'yellow');
        execSync('npm run test:unit', { stdio: 'inherit' });
        execSync('npm run test:e2e', { stdio: 'inherit' });
        execSync('npm run test:cypress:run', { stdio: 'inherit' });
        execSync('npm run test:api', { stdio: 'inherit' });
        break;
      default:
        log(`❌ Unknown test type: ${testType}`, 'red');
        return;
    }

    log(`✅ ${testType} tests completed successfully!`, 'green');
  } catch (error) {
    log(`❌ ${testType} tests failed!`, 'red');
    process.exit(1);
  }
}

async function main(): Promise<void> {
  log('🧪 Test Runner', 'blue');
  console.log('');

  log('Available test types:', 'cyan');
  log('  1. unit - Unit tests (Vitest)', 'cyan');
  log('  2. e2e - End-to-end tests (Playwright)', 'cyan');
  log('  3. cypress - UI tests (Cypress)', 'cyan');
  log('  4. api - API tests (Newman)', 'cyan');
  log('  5. all - All tests', 'cyan');
  console.log('');

  const testType = await askQuestion(
    'Which tests would you like to run? (1-5): '
  );

  switch (testType) {
    case '1':
      await runTests('unit');
      break;
    case '2':
      await runTests('e2e');
      break;
    case '3':
      await runTests('cypress');
      break;
    case '4':
      await runTests('api');
      break;
    case '5':
      await runTests('all');
      break;
    default:
      log('❌ Invalid selection. Please choose 1-5.', 'red');
      break;
  }
}

// Run the main function
main().catch(error => {
  console.error('❌ Error running tests:', error);
  process.exit(1);
});

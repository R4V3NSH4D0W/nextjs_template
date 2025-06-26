/**
 * Usage Examples for Shortcut Utilities
 * Demonstrates how to use the data cleaning shortcuts
 * Similar to Expo's template options: blank, minimal, example
 */

import shortcuts from '../lib/shortcuts';
import { useShortcuts, useDataCleaner } from '../hooks/useShortcuts';

// =====================================
// 1. Basic Data Cleaning Examples
// =====================================

// Sample data with various types of content
const sampleUserData = {
  id: 123,
  name: 'John Doe',
  email: 'john@example.com',
  exampleField: 'This is demo content',
  testValue: 'Testing 123',
  emptyString: '',
  nullValue: null,
  undefinedValue: undefined,
  demoArray: ['example1', 'example2'],
  preferences: {
    theme: 'dark',
    exampleSetting: 'demo',
    notifications: true,
  },
};

// =====================================
// 2. Direct Utility Usage (Non-React)
// =====================================

// Create a blank template (like `expo init --template blank`)
const blankData = shortcuts.quick.blank(sampleUserData);
console.log('Blank template:', blankData);
// Result: { id: 123, name: 'John Doe', email: 'john@example.com', preferences: { theme: 'dark', notifications: true } }

// Create a minimal template (like `expo init --template minimal`)
const minimalData = shortcuts.quick.minimal(sampleUserData);
console.log('Minimal template:', minimalData);

// Production-ready data
const prodData = shortcuts.quick.prod(sampleUserData);
console.log('Production data:', prodData);

// Development-friendly data (keeps examples for reference)
const devData = shortcuts.quick.dev(sampleUserData);
console.log('Development data:', devData);

// =====================================
// 3. Field-Specific Operations
// =====================================

// Remove only example/demo fields
const noExamplesData = shortcuts.fields.noExamples(sampleUserData);
console.log('No examples:', noExamplesData);

// Remove empty values
const noEmptyData = shortcuts.fields.noEmpty(sampleUserData);
console.log('No empty values:', noEmptyData);

// Keep only specific fields
const onlyUserInfo = shortcuts.fields.only(sampleUserData, ['name', 'email']);
console.log('Only user info:', onlyUserInfo);

// Remove specific fields
const withoutSensitive = shortcuts.fields.without(sampleUserData, [
  'id',
  'email',
]);
console.log('Without sensitive data:', withoutSensitive);

// =====================================
// 4. Workflow-Specific Operations
// =====================================

// Prepare for API submission
const apiReadyData = shortcuts.workflows.apiReady(sampleUserData);
console.log('API ready:', apiReadyData);

// Prepare for form display
const formReadyData = shortcuts.workflows.formReady(sampleUserData);
console.log('Form ready:', formReadyData);

// Debug information
const debugInfo = shortcuts.workflows.debug(sampleUserData);
console.log('Debug info:', debugInfo);

// =====================================
// 5. Array Operations
// =====================================

const sampleArray = [
  { id: 1, name: 'Item 1', example: 'demo' },
  { id: 2, name: 'Item 2', test: 'value', empty: '' },
  { id: 1, name: 'Item 1', example: 'demo' }, // duplicate
];

// Clean array and remove empty objects
const cleanedArray = shortcuts.arrays.clean(sampleArray, {
  removeEmpty: true,
  removeExamples: true,
});
console.log('Cleaned array:', cleanedArray);

// Remove duplicates
const uniqueArray = shortcuts.arrays.unique(sampleArray);
console.log('Unique array:', uniqueArray);

// =====================================
// 6. Storage Management
// =====================================

// Clear all browser storage (nuclear option)
// shortcuts.storage.nuke();

// Reset persistent storage but keep session data
// shortcuts.storage.reset();

// Clear only session storage
// shortcuts.storage.session();

// Safe clear - preserve important data
// shortcuts.storage.safe(['theme', 'language', 'user-preferences']);

// =====================================
// 7. Template Creation (Expo-style)
// =====================================

// Create templates like Expo CLI
const templates = {
  blank: shortcuts.template.blank(sampleUserData),
  minimal: shortcuts.template.minimal(sampleUserData),
  example: shortcuts.template.example(sampleUserData), // keeps everything
  full: shortcuts.template.full(sampleUserData), // same as example
};

console.log('Templates:', templates);

// =====================================
// 8. React Hook Usage Examples
// =====================================

// Example React component using the shortcuts hook
export function DataCleanerExample() {
  const { clean, blank, minimal, prod, apiReady, debug } = useShortcuts();

  const handleCleanData = () => {
    // Clean with specific options
    const cleaned = clean(sampleUserData, {
      type: 'blank', // or 'minimal', 'prod', 'dev', 'test'
      removeEmpty: true,
      removeExamples: true,
    });
    console.log('Cleaned:', cleaned);
  };

  const handleCreateTemplates = () => {
    const blankTemplate = blank(sampleUserData);
    const minimalTemplate = minimal(sampleUserData);
    const prodTemplate = prod(sampleUserData);

    console.log('Templates:', {
      blank: blankTemplate,
      minimal: minimalTemplate,
      prod: prodTemplate,
    });
  };

  const handlePrepareForAPI = () => {
    const prepared = apiReady(sampleUserData);
    console.log('API ready:', prepared);
  };

  const handleDebug = () => {
    const debugInfo = debug(sampleUserData);
    console.log('Debug:', debugInfo);
  };

  const handleClearStorage = () => {
    // Clear storage with different options
    shortcuts.storage.safe(['theme', 'user-preferences']); // preserve important keys
    // shortcuts.storage.reset(); // clear localStorage + cookies
    // shortcuts.storage.nuke(); // nuclear option
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Data Cleaner Examples</h2>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleCleanData}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Clean Data
        </button>

        <button
          onClick={handleCreateTemplates}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Create Templates
        </button>

        <button
          onClick={handlePrepareForAPI}
          className="px-4 py-2 bg-purple-500 text-white rounded"
        >
          Prepare for API
        </button>

        <button
          onClick={handleDebug}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Debug Info
        </button>

        <button
          onClick={handleClearStorage}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear Storage
        </button>
      </div>
    </div>
  );
}

// =====================================
// 9. Simple Data Cleaner Hook
// =====================================

export function SimpleCleanerExample() {
  const { clean } = useDataCleaner();

  const handleQuickClean = () => {
    const cleaned = clean(sampleUserData, { type: 'blank' });
    console.log('Quick clean:', cleaned);
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">Simple Cleaner</h3>
      <button
        onClick={handleQuickClean}
        className="px-4 py-2 bg-indigo-500 text-white rounded"
      >
        Quick Clean
      </button>
    </div>
  );
}

// =====================================
// 10. One-Liner Examples
// =====================================

// These are the most common operations you'll use:

// Create blank template (removes examples, empty values, nulls)
export const createBlank = (data: Record<string, unknown>) =>
  shortcuts.clean(data);

// Quick production clean
export const makeProdReady = (data: Record<string, unknown>) =>
  shortcuts.quick.prod(data);

// Nuclear storage clear
export const clearEverything = () => shortcuts.nuke();

// Safe storage reset
export const safeReset = () => shortcuts.reset();

// API preparation
export const prepForAPI = (data: Record<string, unknown>) =>
  shortcuts.workflows.apiReady(data);

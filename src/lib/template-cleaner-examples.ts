/**
 * Template Cleaner Usage Examples
 * This file demonstrates how to use the template cleaning utilities
 */

import {
  cleanObject,
  createTemplate,
  shortcuts,
  applyPreset,
  clearStorage,
  stripExampleContent,
} from '@/lib/template-cleaner';

// Example data structure that might need cleaning
const exampleUserData = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '',
  avatar: null,
  exampleField: 'This is example data',
  demoContent: 'Demo content here',
  testValue: 'test',
  preferences: {
    theme: 'dark',
    notifications: true,
    sampleSetting: 'sample',
    emptyArray: [],
    undefinedField: undefined,
  },
  metadata: {
    created: '2023-01-01',
    updated: null,
    version: '1.0.0',
    exampleMetadata: 'Should be removed',
  },
};

const exampleAPIResponse = {
  data: {
    users: [
      { id: 1, name: 'User 1', email: 'user1@test.com' },
      { id: 2, name: 'User 2', email: '' },
    ],
    totalCount: 2,
    exampleData: 'This is for demo',
    debugInfo: 'Debug information',
  },
  success: true,
  message: 'Success',
  timestamp: '2023-01-01T00:00:00Z',
  demoField: null,
};

// Example usage functions
export function demonstrateTemplateCleaning() {
  console.log('=== Template Cleaning Examples ===\n');

  // 1. Basic object cleaning
  console.log('1. Basic cleaning (remove empty, null, undefined):');
  const basicCleaned = cleanObject(exampleUserData, {
    removeEmpty: true,
    removeNull: true,
    removeUndefined: true,
  });
  console.log(JSON.stringify(basicCleaned, null, 2));
  console.log('\n');

  // 2. Remove example content
  console.log('2. Remove example/demo content:');
  const noExamples = cleanObject(exampleUserData, {
    removeExamples: true,
  });
  console.log(JSON.stringify(noExamples, null, 2));
  console.log('\n');

  // 3. Using templates (like Expo templates)
  console.log('3. Template Types:');

  console.log('Blank template (like expo --template blank):');
  const blankTemplate = createTemplate(exampleUserData, 'blank');
  console.log(JSON.stringify(blankTemplate, null, 2));
  console.log('\n');

  console.log('Minimal template:');
  const minimalTemplate = createTemplate(exampleUserData, 'minimal');
  console.log(JSON.stringify(minimalTemplate, null, 2));
  console.log('\n');

  // 4. Using shortcuts
  console.log('4. Using shortcuts:');

  console.log('Quick blank (shortcuts.blank):');
  const quickBlank = shortcuts.blank(exampleUserData);
  console.log(JSON.stringify(quickBlank, null, 2));
  console.log('\n');

  console.log('Production ready (shortcuts.prod):');
  const prodReady = shortcuts.prod(exampleAPIResponse);
  console.log(JSON.stringify(prodReady, null, 2));
  console.log('\n');

  // 5. Using presets
  console.log('5. Using presets:');

  console.log('Production preset:');
  const productionData = applyPreset(exampleAPIResponse, 'production');
  console.log(JSON.stringify(productionData, null, 2));
  console.log('\n');

  console.log('Development preset:');
  const developmentData = applyPreset(exampleAPIResponse, 'development');
  console.log(JSON.stringify(developmentData, null, 2));
  console.log('\n');
}

export function demonstrateStringCleaning() {
  console.log('=== String Content Cleaning ===\n');

  const exampleCode = `
    const data = {
      name: 'Real data',
      /* EXAMPLE START */
      exampleField: 'This is example content',
      demoData: 'Demo content here',
      /* EXAMPLE END */
      
      // EXAMPLE: This is an example comment
      value: 42,
      
      <!-- EXAMPLE START -->
      <div>Example HTML content</div>
      <!-- EXAMPLE END -->
    };
  `;

  console.log('Original code:');
  console.log(exampleCode);
  console.log('\n');

  console.log('Cleaned code (example content removed):');
  const cleanedCode = stripExampleContent(exampleCode);
  console.log(cleanedCode);
  console.log('\n');
}

export function demonstrateStorageCleaning() {
  console.log('=== Storage Cleaning Examples ===\n');

  // Set some example data in localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem('user-preferences', '{"theme":"dark"}');
    localStorage.setItem('example-data', '{"demo":"content"}');
    localStorage.setItem('app-state', '{"version":"1.0"}');

    console.log('Before cleaning:');
    console.log('localStorage keys:', Object.keys(localStorage));

    // Clear all except specific keys
    clearStorage({
      localStorage: true,
      excludeKeys: ['user-preferences'],
    });

    console.log('After cleaning (excluding user-preferences):');
    console.log('localStorage keys:', Object.keys(localStorage));

    // Using shortcuts
    console.log('\nUsing shortcuts.clearAll():');
    shortcuts.clearAll();
    console.log('localStorage keys after clearAll:', Object.keys(localStorage));
  }
}

// Real-world usage examples
export class DataProcessor {
  /**
   * Process user data for different environments
   */
  static processUserData(
    userData: typeof exampleUserData,
    env: 'dev' | 'test' | 'prod'
  ) {
    switch (env) {
      case 'dev':
        return applyPreset(userData, 'development');
      case 'test':
        return applyPreset(userData, 'testing');
      case 'prod':
        return applyPreset(userData, 'production');
      default:
        return userData;
    }
  }

  /**
   * Create different project templates
   */
  static createProjectTemplate(
    projectData: Record<string, unknown>,
    type: 'starter' | 'example' | 'full'
  ) {
    switch (type) {
      case 'starter':
        return shortcuts.blank(projectData);
      case 'example':
        return createTemplate(projectData, 'example');
      case 'full':
        return createTemplate(projectData, 'full');
      default:
        return projectData;
    }
  }

  /**
   * Clean API responses based on client needs
   */
  static prepareForClient(
    apiResponse: Record<string, unknown>,
    clientType: 'mobile' | 'web' | 'admin'
  ) {
    const baseClean = cleanObject(apiResponse, {
      removeEmpty: true,
      removeNull: true,
    });

    switch (clientType) {
      case 'mobile':
        // Remove heavy data for mobile
        return cleanObject(baseClean, {
          removeFields: ['debugInfo', 'metadata', 'verbose'],
        });
      case 'web':
        // Standard web client
        return shortcuts.noExamples(baseClean);
      case 'admin':
        // Admin gets all data
        return baseClean;
      default:
        return baseClean;
    }
  }
}

// Component usage example (pseudo-code for demonstration)
export function createProjectConfigExample() {
  // This would be used in a React component
  const handleCreateProject = (templateType: 'blank' | 'example') => {
    const projectConfig = {
      name: 'My Project',
      version: '1.0.0',
      exampleContent: 'This is example content',
      demoData: { message: 'Hello demo' },
      settings: {
        debug: true,
        exampleSetting: 'example value',
        theme: 'light',
      },
    };

    const cleanConfig =
      templateType === 'blank'
        ? shortcuts.blank(projectConfig)
        : createTemplate(projectConfig, 'example');

    console.log('Project config:', cleanConfig);
    return cleanConfig;
  };

  const handleDataCleanup = () => {
    // Clean localStorage but keep user preferences
    shortcuts.clearLocal();

    // Or more specific cleaning
    clearStorage({
      localStorage: true,
      excludeKeys: ['user-theme', 'user-lang', 'auth-token'],
    });
  };

  return {
    handleCreateProject,
    handleDataCleanup,
  };
}

// Export for use in other files
export { exampleUserData, exampleAPIResponse };

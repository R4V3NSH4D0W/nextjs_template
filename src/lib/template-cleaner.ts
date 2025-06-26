/**
 * Template and Data Cleaning Utilities
 * Similar to Expo's template system for creating clean or example-filled projects
 */

export type TemplateType = 'blank' | 'minimal' | 'example' | 'full';

export interface CleaningOptions {
  removeEmpty?: boolean;
  removeNull?: boolean;
  removeUndefined?: boolean;
  removeExamples?: boolean;
  keepOnlyFields?: string[];
  removeFields?: readonly string[] | string[];
}

export interface StorageClearOptions {
  localStorage?: boolean;
  sessionStorage?: boolean;
  cookies?: boolean;
  excludeKeys?: string[];
}

/**
 * Clean object data based on specified options
 */
export function cleanObject<T extends Record<string, unknown>>(
  obj: T,
  options: CleaningOptions = {}
): Partial<T> {
  const {
    removeEmpty = false,
    removeNull = false,
    removeUndefined = false,
    removeExamples = false,
    keepOnlyFields,
    removeFields = [],
  } = options;

  const cleaned: Partial<T> = {};

  for (const [key, value] of Object.entries(obj)) {
    // Skip if field should be removed
    if (removeFields.includes(key)) continue;

    // Skip if keepOnlyFields is specified and field is not in it
    if (keepOnlyFields && !keepOnlyFields.includes(key)) continue;

    // Skip example/demo/test fields if removeExamples is true
    if (removeExamples && /^(example|demo|test|sample|placeholder)/i.test(key))
      continue;

    // Skip based on value type
    if (removeNull && value === null) continue;
    if (removeUndefined && value === undefined) continue;
    if (
      removeEmpty &&
      (value === '' || (Array.isArray(value) && value.length === 0))
    )
      continue;

    // Recursively clean nested objects
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      const cleanedNested = cleanObject(
        value as Record<string, unknown>,
        options
      );
      if (Object.keys(cleanedNested).length > 0) {
        cleaned[key as keyof T] = cleanedNested as T[keyof T];
      }
    } else {
      cleaned[key as keyof T] = value as T[keyof T];
    }
  }

  return cleaned;
}

/**
 * Create a template with different levels of content
 */
export function createTemplate<T>(
  baseTemplate: T,
  templateType: TemplateType = 'blank'
): T {
  if (typeof baseTemplate !== 'object' || baseTemplate === null) {
    return baseTemplate;
  }

  switch (templateType) {
    case 'blank':
      return cleanObject(baseTemplate as Record<string, unknown>, {
        removeEmpty: true,
        removeNull: true,
        removeUndefined: true,
        removeExamples: true,
        removeFields: ['example', 'demo', 'test', 'sample'],
      }) as T;

    case 'minimal':
      return cleanObject(baseTemplate as Record<string, unknown>, {
        removeEmpty: true,
        removeExamples: true,
      }) as T;

    case 'example':
      return baseTemplate;

    case 'full':
      return baseTemplate;

    default:
      return baseTemplate;
  }
}

/**
 * Strip example content from strings using markers
 */
export function stripExampleContent(content: string): string {
  return content
    .replace(/\/\*\s*EXAMPLE\s*START[\s\S]*?EXAMPLE\s*END\s*\*\//g, '')
    .replace(/<!--\s*EXAMPLE\s*START[\s\S]*?EXAMPLE\s*END\s*-->/g, '')
    .replace(/\/\/\s*EXAMPLE:.*$/gm, '')
    .replace(/^\s*[\r\n]/gm, ''); // Remove empty lines
}

/**
 * Clear browser storage with options
 */
export function clearStorage(options: StorageClearOptions = {}): void {
  const {
    localStorage = true,
    sessionStorage = true,
    cookies = false,
    excludeKeys = [],
  } = options;

  if (typeof window === 'undefined') return;

  if (localStorage && window.localStorage) {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && !excludeKeys.includes(key)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => window.localStorage.removeItem(key));
  }

  if (sessionStorage && window.sessionStorage) {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.sessionStorage.length; i++) {
      const key = window.sessionStorage.key(i);
      if (key && !excludeKeys.includes(key)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => window.sessionStorage.removeItem(key));
  }

  if (cookies) {
    // Clear cookies (basic implementation)
    document.cookie.split(';').forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      if (!excludeKeys.includes(name.trim())) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }
}

/**
 * Clean array of objects
 */
export function cleanArray<T extends Record<string, unknown>>(
  array: T[],
  options: CleaningOptions = {}
): Partial<T>[] {
  return array
    .map(item => cleanObject(item, options))
    .filter(item => Object.keys(item).length > 0);
}

/**
 * Create predefined cleaning presets
 */
export const cleaningPresets = {
  development: {
    removeEmpty: false,
    removeNull: false,
    removeUndefined: false,
    removeExamples: false,
  },
  testing: {
    removeEmpty: true,
    removeNull: true,
    removeUndefined: true,
    removeExamples: false,
  },
  production: {
    removeEmpty: true,
    removeNull: true,
    removeUndefined: true,
    removeExamples: true,
    removeFields: ['debug', 'test', 'dev', 'development'],
  },
  blank: {
    removeEmpty: true,
    removeNull: true,
    removeUndefined: true,
    removeExamples: true,
    removeFields: [
      'example',
      'demo',
      'test',
      'sample',
      'placeholder',
      'mock',
      'debug',
    ],
  },
} as const;

/**
 * Apply cleaning preset
 */
export function applyPreset<T extends Record<string, unknown>>(
  data: T,
  preset: keyof typeof cleaningPresets
): Partial<T> {
  return cleanObject(data, cleaningPresets[preset]);
}

/**
 * Utility shortcuts for common operations
 */
export const shortcuts = {
  /**
   * Create a blank template (like expo --template blank)
   */
  blank: <T>(data: T): T => createTemplate(data, 'blank'),

  /**
   * Create a minimal template
   */
  minimal: <T>(data: T): T => createTemplate(data, 'minimal'),

  /**
   * Quick clean for production
   */
  prod: <T extends Record<string, unknown>>(data: T): Partial<T> =>
    applyPreset(data, 'production'),

  /**
   * Quick clean for testing
   */
  test: <T extends Record<string, unknown>>(data: T): Partial<T> =>
    applyPreset(data, 'testing'),

  /**
   * Remove all example content
   */
  noExamples: <T extends Record<string, unknown>>(data: T): Partial<T> =>
    cleanObject(data, { removeExamples: true }),

  /**
   * Clear all storage
   */
  clearAll: () =>
    clearStorage({ localStorage: true, sessionStorage: true, cookies: true }),

  /**
   * Clear only localStorage
   */
  clearLocal: () =>
    clearStorage({ localStorage: true, sessionStorage: false, cookies: false }),
} as const;

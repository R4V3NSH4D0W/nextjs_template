/**
 * Shortcut utilities for common operations
 * Inspired by Expo's template system (blank, minimal, example)
 */

import {
  cleanObject,
  createTemplate,
  clearStorage,
  applyPreset,
  type TemplateType,
  type CleaningOptions,
} from './template-cleaner';

/**
 * Quick data cleaning shortcuts - similar to Expo CLI options
 */
export const quick = {
  /**
   * Create a blank template (like `expo init MyApp --template blank`)
   * Removes all example content, empty values, and test data
   */
  blank: <T>(data: T): T => createTemplate(data, 'blank'),

  /**
   * Create a minimal template (like `expo init MyApp --template minimal`)
   * Keeps structure but removes examples and empty values
   */
  minimal: <T>(data: T): T => createTemplate(data, 'minimal'),

  /**
   * Keep with examples (like `expo init MyApp --template tabs`)
   * Returns data as-is with all examples intact
   */
  example: <T>(data: T): T => createTemplate(data, 'example'),

  /**
   * Production-ready clean
   * Removes debug info, test data, and optimizes for production
   */
  prod: <T extends Record<string, unknown>>(data: T) =>
    applyPreset(data, 'production'),

  /**
   * Development-friendly clean
   * Keeps useful debug info but removes obvious clutter
   */
  dev: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, {
      removeEmpty: true,
      removeNull: false, // Keep nulls for debugging
      removeUndefined: true,
      removeExamples: false, // Keep examples in dev
    }),

  /**
   * Testing clean
   * Removes production data but keeps test fixtures
   */
  test: <T extends Record<string, unknown>>(data: T) =>
    applyPreset(data, 'testing'),
};

/**
 * Storage management shortcuts
 */
export const storage = {
  /**
   * Clear everything (nuclear option)
   */
  nuke: () =>
    clearStorage({
      localStorage: true,
      sessionStorage: true,
      cookies: true,
    }),

  /**
   * Clear only persistent storage (localStorage + cookies)
   */
  reset: () =>
    clearStorage({
      localStorage: true,
      sessionStorage: false,
      cookies: true,
    }),

  /**
   * Clear only session data
   */
  session: () =>
    clearStorage({
      localStorage: false,
      sessionStorage: true,
      cookies: false,
    }),

  /**
   * Safe clear - preserves important keys
   */
  safe: (preserveKeys: string[] = ['theme', 'language', 'user-preferences']) =>
    clearStorage({
      localStorage: true,
      sessionStorage: true,
      excludeKeys: preserveKeys,
    }),
};

/**
 * Field-specific cleaning shortcuts
 */
export const fields = {
  /**
   * Remove all example/demo/test fields
   */
  noExamples: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, { removeExamples: true }),

  /**
   * Remove empty values only
   */
  noEmpty: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, { removeEmpty: true }),

  /**
   * Remove null/undefined values
   */
  noNulls: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, { removeNull: true, removeUndefined: true }),

  /**
   * Keep only specified fields
   */
  only: <T extends Record<string, unknown>>(data: T, fields: string[]) =>
    cleanObject(data, { keepOnlyFields: fields }),

  /**
   * Remove specified fields
   */
  without: <T extends Record<string, unknown>>(data: T, fields: string[]) =>
    cleanObject(data, { removeFields: fields }),
};

/**
 * Array cleaning shortcuts
 */
export const arrays = {
  /**
   * Clean array and remove empty objects
   */
  clean: <T extends Record<string, unknown>>(
    array: T[],
    options?: CleaningOptions
  ) =>
    array
      .map(item => cleanObject(item, options))
      .filter(item => Object.keys(item).length > 0),

  /**
   * Remove duplicate objects from array
   */
  unique: <T>(array: T[]): T[] =>
    array.filter(
      (item, index, self) =>
        index ===
        self.findIndex(t => JSON.stringify(t) === JSON.stringify(item))
    ),

  /**
   * Flatten nested arrays
   */
  flatten: <T>(array: (T | T[])[]): T[] => array.flat() as T[],
};

/**
 * Combined shortcuts for common workflows
 */
export const workflows = {
  /**
   * Prepare data for API submission
   */
  apiReady: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, {
      removeEmpty: true,
      removeNull: true,
      removeUndefined: true,
      removeExamples: true,
      removeFields: ['id', 'createdAt', 'updatedAt', '_temp', '_draft'],
    }),

  /**
   * Prepare for form display
   */
  formReady: <T extends Record<string, unknown>>(data: T) =>
    cleanObject(data, {
      removeUndefined: true,
      removeFields: ['password', 'secret', 'token', 'key'],
    }),

  /**
   * Debug-friendly version
   */
  debug: <T extends Record<string, unknown>>(data: T) => ({
    original: data,
    cleaned: cleanObject(data, { removeEmpty: true }),
    keys: Object.keys(data),
    size: JSON.stringify(data).length,
  }),
};

/**
 * Expo-style template creator
 * Usage: template.create(data, 'blank') // Like: expo init --template blank
 */
export const template = {
  create: <T>(data: T, type: TemplateType = 'blank') =>
    createTemplate(data, type),

  blank: <T>(data: T) => createTemplate(data, 'blank'),
  minimal: <T>(data: T) => createTemplate(data, 'minimal'),
  example: <T>(data: T) => createTemplate(data, 'example'),
  full: <T>(data: T) => createTemplate(data, 'full'),
};

/**
 * One-liner shortcuts for the most common operations
 */
export const clean = quick.blank;
export const reset = storage.reset;
export const nuke = storage.nuke;

// Default export with all shortcuts
const shortcuts = {
  quick,
  storage,
  fields,
  arrays,
  workflows,
  template,
  // Direct access to most common operations
  clean,
  reset,
  nuke,
};

export default shortcuts;

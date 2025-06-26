import { useCallback } from 'react';
import shortcuts from '../lib/shortcuts';
import type { TemplateType } from '../lib/template-cleaner';

/**
 * React hook providing shortcut utilities for data cleaning
 * Inspired by Expo's template system with convenient one-liners
 */
export function useShortcuts() {
  // Memoize functions to prevent unnecessary re-renders
  const createTemplate = useCallback(
    <T>(data: T, type: TemplateType = 'blank') =>
      shortcuts.template.create(data, type),
    []
  );

  const cleanData = useCallback(
    <T extends Record<string, unknown>>(
      data: T,
      options?: {
        type?: 'blank' | 'minimal' | 'prod' | 'dev' | 'test';
        removeEmpty?: boolean;
        removeNull?: boolean;
        removeExamples?: boolean;
        keepOnly?: string[];
        without?: string[];
      }
    ): Partial<T> => {
      const {
        type,
        removeEmpty,
        removeNull,
        removeExamples,
        keepOnly,
        without,
      } = options || {};

      // Use predefined type shortcuts
      if (type) {
        switch (type) {
          case 'blank':
            return shortcuts.quick.blank(data) as Partial<T>;
          case 'minimal':
            return shortcuts.quick.minimal(data) as Partial<T>;
          case 'prod':
            return shortcuts.quick.prod(data);
          case 'dev':
            return shortcuts.quick.dev(data);
          case 'test':
            return shortcuts.quick.test(data);
          default:
            return data;
        }
      }

      // Custom cleaning
      let result: Partial<T> = data;
      if (removeEmpty) result = shortcuts.fields.noEmpty(result as T);
      if (removeNull) result = shortcuts.fields.noNulls(result as T);
      if (removeExamples) result = shortcuts.fields.noExamples(result as T);
      if (keepOnly) result = shortcuts.fields.only(result as T, keepOnly);
      if (without) result = shortcuts.fields.without(result as T, without);

      return result;
    },
    []
  );

  const clearStorage = useCallback(
    (
      type: 'all' | 'reset' | 'session' | 'safe' = 'reset',
      preserveKeys?: string[]
    ) => {
      switch (type) {
        case 'all':
          shortcuts.storage.nuke();
          break;
        case 'reset':
          shortcuts.storage.reset();
          break;
        case 'session':
          shortcuts.storage.session();
          break;
        case 'safe':
          shortcuts.storage.safe(preserveKeys);
          break;
      }
    },
    []
  );

  return {
    // Main cleaning function
    clean: cleanData,

    // Template creation (Expo-style)
    template: createTemplate,

    // Storage management
    storage: clearStorage,

    // Quick access to common operations
    blank: useCallback(<T>(data: T) => shortcuts.quick.blank(data), []),
    minimal: useCallback(<T>(data: T) => shortcuts.quick.minimal(data), []),
    prod: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.quick.prod(data),
      []
    ),
    dev: useCallback(
      <T extends Record<string, unknown>>(data: T) => shortcuts.quick.dev(data),
      []
    ),

    // Field operations
    noExamples: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.fields.noExamples(data),
      []
    ),
    noEmpty: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.fields.noEmpty(data),
      []
    ),
    noNulls: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.fields.noNulls(data),
      []
    ),
    only: useCallback(
      <T extends Record<string, unknown>>(data: T, fields: string[]) =>
        shortcuts.fields.only(data, fields),
      []
    ),
    without: useCallback(
      <T extends Record<string, unknown>>(data: T, fields: string[]) =>
        shortcuts.fields.without(data, fields),
      []
    ),

    // Workflow shortcuts
    apiReady: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.workflows.apiReady(data),
      []
    ),
    formReady: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.workflows.formReady(data),
      []
    ),
    debug: useCallback(
      <T extends Record<string, unknown>>(data: T) =>
        shortcuts.workflows.debug(data),
      []
    ),

    // Array operations
    cleanArray: useCallback(
      <T extends Record<string, unknown>>(array: T[]) =>
        shortcuts.arrays.clean(array),
      []
    ),
    unique: useCallback(<T>(array: T[]) => shortcuts.arrays.unique(array), []),
    flatten: useCallback(
      <T>(array: (T | T[])[]) => shortcuts.arrays.flatten(array),
      []
    ),

    // One-liner nuclear options
    nuke: useCallback(() => shortcuts.storage.nuke(), []),
    reset: useCallback(() => shortcuts.storage.reset(), []),
  };
}

/**
 * Simple data cleaner hook with most common operations
 */
export function useDataCleaner() {
  const shortcuts = useShortcuts();

  return {
    // Most common operations
    clean: shortcuts.clean,
    blank: shortcuts.blank,
    minimal: shortcuts.minimal,
    prod: shortcuts.prod,

    // Storage
    clearStorage: shortcuts.storage,
    reset: shortcuts.reset,

    // Utilities
    debug: shortcuts.debug,
    apiReady: shortcuts.apiReady,
  };
}

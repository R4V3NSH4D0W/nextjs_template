import { useEffect, useState } from 'react';

// Export all custom hooks
export {
  useShortcuts,
  useDataCleaner as useDataCleanerNew,
} from './useShortcuts';

/**
 * Custom hook for managing local storage state
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}

/**
 * Custom hook for debouncing a value
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * Custom hook for detecting clicks outside of an element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  callback: () => void
) {
  const [ref, setRef] = useState<T | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref && !ref.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);

  return setRef;
}

/**
 * Custom hook for managing async operations
 */
export function useAsync<T>(asyncFunction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const execute = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await asyncFunction();
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('An error occurred'));
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    execute();

    return () => {
      isCancelled = true;
    };
  }, [asyncFunction]);

  return { data, loading, error };
}

/**
 * Custom hook for template and data cleaning
 * Provides shortcuts for common data cleaning operations
 */
export function useDataCleaner() {
  const cleanData = <T extends Record<string, unknown>>(
    data: T,
    options: {
      removeEmpty?: boolean;
      removeNull?: boolean;
      removeExamples?: boolean;
      keepOnly?: string[];
    } = {}
  ) => {
    const {
      removeEmpty = false,
      removeNull = false,
      removeExamples = false,
      keepOnly,
    } = options;
    const cleaned: Partial<T> = {};

    for (const [key, value] of Object.entries(data)) {
      // Skip if keepOnly is specified and key is not in it
      if (keepOnly && !keepOnly.includes(key)) continue;

      // Skip example fields
      if (removeExamples && /^(example|demo|test|sample)/i.test(key)) continue;

      // Skip empty/null values
      if (
        removeEmpty &&
        (value === '' || (Array.isArray(value) && value.length === 0))
      )
        continue;
      if (removeNull && (value === null || value === undefined)) continue;

      cleaned[key as keyof T] = value as T[keyof T];
    }

    return cleaned;
  };

  const createBlankTemplate = <T>(data: T): T => {
    if (typeof data !== 'object' || data === null) return data;

    return cleanData(data as Record<string, unknown>, {
      removeEmpty: true,
      removeNull: true,
      removeExamples: true,
    }) as T;
  };

  const clearStorage = (
    options: { includeSession?: boolean; excludeKeys?: string[] } = {}
  ) => {
    const { includeSession = false, excludeKeys = [] } = options;

    if (typeof window === 'undefined') return;

    // Clear localStorage
    const localKeys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && !excludeKeys.includes(key)) {
        localKeys.push(key);
      }
    }
    localKeys.forEach(key => localStorage.removeItem(key));

    // Clear sessionStorage if requested
    if (includeSession) {
      const sessionKeys: string[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && !excludeKeys.includes(key)) {
          sessionKeys.push(key);
        }
      }
      sessionKeys.forEach(key => sessionStorage.removeItem(key));
    }
  };

  return {
    cleanData,
    createBlankTemplate,
    clearStorage,
    // Shortcuts
    shortcuts: {
      blank: createBlankTemplate,
      clean: (data: Record<string, unknown>) =>
        cleanData(data, { removeEmpty: true, removeNull: true }),
      noExamples: (data: Record<string, unknown>) =>
        cleanData(data, { removeExamples: true }),
      clearAll: () => clearStorage({ includeSession: true }),
      clearLocal: () => clearStorage({ includeSession: false }),
    },
  };
}

# Data Cleaning Shortcuts

A comprehensive utility system for cleaning and preparing data, inspired by Expo's template system with options like `--template blank`, `--template minimal`, etc.

## Quick Start

```typescript
import shortcuts from '@/lib/shortcuts';
import { useShortcuts } from '@/hooks/useShortcuts';

// Create a blank template (removes examples, empty values, nulls)
const cleanData = shortcuts.clean(yourData);

// Create templates like Expo CLI
const blankTemplate = shortcuts.template.blank(yourData); // Like: expo init --template blank
const minimalTemplate = shortcuts.template.minimal(yourData); // Like: expo init --template minimal
```

## Common Use Cases

### 1. Template Creation (Expo-style)

```typescript
// Like Expo's template options
const templates = {
  blank: shortcuts.quick.blank(data), // Clean, production-ready
  minimal: shortcuts.quick.minimal(data), // Keeps structure, removes examples
  example: shortcuts.quick.example(data), // Keeps all examples
  prod: shortcuts.quick.prod(data), // Production optimized
  dev: shortcuts.quick.dev(data), // Development friendly
};
```

### 2. Field Operations

```typescript
// Remove specific types of content
const noExamples = shortcuts.fields.noExamples(data);
const noEmpty = shortcuts.fields.noEmpty(data);
const noNulls = shortcuts.fields.noNulls(data);

// Keep or remove specific fields
const onlyUserData = shortcuts.fields.only(data, ['name', 'email']);
const withoutSensitive = shortcuts.fields.without(data, ['password', 'secret']);
```

### 3. Workflow-specific Cleaning

```typescript
// Prepare for different contexts
const apiReady = shortcuts.workflows.apiReady(data); // Remove internal fields
const formReady = shortcuts.workflows.formReady(data); // Remove sensitive data
const debugInfo = shortcuts.workflows.debug(data); // Add debug information
```

### 4. Storage Management

```typescript
// Clear browser storage
shortcuts.storage.nuke(); // Clear everything (nuclear option)
shortcuts.storage.reset(); // Clear localStorage + cookies
shortcuts.storage.session(); // Clear only session storage
shortcuts.storage.safe(['theme', 'language']); // Preserve important keys
```

### 5. Array Operations

```typescript
// Clean arrays
const cleanedArray = shortcuts.arrays.clean(dataArray);
const uniqueArray = shortcuts.arrays.unique(dataArray);
const flatArray = shortcuts.arrays.flatten(nestedArray);
```

## React Hook Usage

```typescript
import { useShortcuts, useDataCleaner } from '@/hooks/useShortcuts';

function MyComponent() {
  const { clean, blank, minimal, prod, apiReady } = useShortcuts();

  const handleCleanData = () => {
    const cleaned = clean(data, {
      type: 'blank',
      removeEmpty: true,
      removeExamples: true
    });
    console.log(cleaned);
  };

  return <button onClick={handleCleanData}>Clean Data</button>;
}
```

## One-Liner Shortcuts

```typescript
import shortcuts from '@/lib/shortcuts';

// Most common operations
const clean = shortcuts.clean; // Create blank template
const reset = shortcuts.reset; // Reset storage safely
const nuke = shortcuts.nuke; // Clear everything

// Quick operations
clean(data); // Clean data
reset(); // Reset storage
nuke(); // Nuclear option
```

## Examples

See [`src/examples/shortcuts-usage.tsx`](../examples/shortcuts-usage.tsx) for comprehensive usage examples and React components.

## API Reference

### `shortcuts.quick`

- `blank(data)` - Like `expo init --template blank`
- `minimal(data)` - Like `expo init --template minimal`
- `example(data)` - Keeps all examples
- `prod(data)` - Production optimized
- `dev(data)` - Development friendly
- `test(data)` - Testing optimized

### `shortcuts.fields`

- `noExamples(data)` - Remove example/demo/test fields
- `noEmpty(data)` - Remove empty strings and arrays
- `noNulls(data)` - Remove null/undefined values
- `only(data, fields)` - Keep only specified fields
- `without(data, fields)` - Remove specified fields

### `shortcuts.storage`

- `nuke()` - Clear all storage
- `reset()` - Clear localStorage + cookies
- `session()` - Clear session storage only
- `safe(preserveKeys)` - Clear but preserve important keys

### `shortcuts.arrays`

- `clean(array, options)` - Clean array of objects
- `unique(array)` - Remove duplicates
- `flatten(array)` - Flatten nested arrays

### `shortcuts.workflows`

- `apiReady(data)` - Prepare for API submission
- `formReady(data)` - Prepare for form display
- `debug(data)` - Add debug information

### `shortcuts.template`

- `create(data, type)` - Create template of specified type
- `blank(data)` - Create blank template
- `minimal(data)` - Create minimal template
- `example(data)` - Keep with examples
- `full(data)` - Full template

## Integration with Existing Code

This system integrates with the existing template cleaner utilities in `src/lib/template-cleaner.ts` and provides a more convenient, Expo-like interface for common operations.

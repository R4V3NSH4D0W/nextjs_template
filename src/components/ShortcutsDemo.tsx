import { useState } from 'react';
import { useShortcuts } from '@/hooks/useShortcuts';

const sampleData = {
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

export function ShortcutsDemo() {
  const [result, setResult] = useState<string>('');
  const { clean, blank, minimal, prod, apiReady } = useShortcuts();

  const handleClean = (type: string) => {
    let cleaned;
    switch (type) {
      case 'blank':
        cleaned = blank(sampleData);
        break;
      case 'minimal':
        cleaned = minimal(sampleData);
        break;
      case 'prod':
        cleaned = prod(sampleData);
        break;
      case 'api':
        cleaned = apiReady(sampleData);
        break;
      default:
        cleaned = clean(sampleData, { type: 'blank' });
    }
    setResult(JSON.stringify(cleaned, null, 2));
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Data Cleaning Shortcuts Demo</h3>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Sample Data:</h4>
        <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
          {JSON.stringify(sampleData, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Try different cleaning modes:</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleClean('blank')}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Blank Template
          </button>
          <button
            onClick={() => handleClean('minimal')}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Minimal Template
          </button>
          <button
            onClick={() => handleClean('prod')}
            className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Production Ready
          </button>
          <button
            onClick={() => handleClean('api')}
            className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
          >
            API Ready
          </button>
        </div>
      </div>

      {result && (
        <div>
          <h4 className="font-semibold mb-2">Cleaned Result:</h4>
          <pre className="bg-green-50 p-2 rounded text-sm overflow-auto border-l-4 border-green-500">
            {result}
          </pre>
        </div>
      )}
    </div>
  );
}

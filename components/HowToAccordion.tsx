import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export const HowToAccordion: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section className="mt-8 select-none">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      >
        <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">How to Use</span>
        <ChevronDownIcon
          className={`w-5 h-5 text-blue-600 dark:text-blue-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="mt-3 px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-300 space-y-2">
          <p>1. Click the <strong>Select Project Folder</strong> button or drag a folder into the drop-zone.</p>
          <p>2. Review the live statistics as files are scanned.</p>
          <p>3. Copy or download the generated AI-ready block.</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 pt-1">
            All processing happens locally in your browser. No data is uploaded.
          </p>
        </div>
      )}
    </section>
  );
};

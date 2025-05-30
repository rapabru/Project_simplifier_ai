import React, { useState, useEffect } from 'react';
import { CopyIcon } from './icons/CopyIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OutputDisplayProps {
  content: string;
}

export const OutputDisplay: React.FC<OutputDisplayProps> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      alert('Failed to copy text. Please try manually selecting and copying.');
    }
  };

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  if (!content) {
    return null;
  }

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-sky-600 dark:text-sky-400">Combined Output</h3>
        <button
          onClick={handleCopy}
          disabled={!content}
          className={`
            flex items-center px-4 py-2 rounded-md font-medium transition-colors duration-150 text-white
            ${copied 
              ? 'bg-emerald-500 hover:bg-emerald-600 dark:bg-emerald-500 dark:hover:bg-emerald-600' 
              : 'bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}
        >
          {copied ? <CheckIcon className="w-5 h-5 mr-2" /> : <CopyIcon className="w-5 h-5 mr-2" />}
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
      <textarea
        readOnly
        value={content}
        className="w-full h-96 p-4 border border-slate-300 dark:border-slate-600 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-mono text-sm focus:ring-2 focus:ring-sky-500/70 dark:focus:ring-sky-500 focus:border-sky-500/70 dark:focus:border-sky-500 shadow-inner"
        placeholder="Processed file contents will appear here..."
      />
       <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        Total length: {content.length} characters. Some AI models have context length limits.
      </p>
    </div>
  );
};
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 mt-12 border-t border-gray-300 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Project Context Exporter &copy; {new Date().getFullYear()}. 
        Created with <span className="text-red-500 dark:text-red-400">&hearts;</span> for easier AI interactions.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
        This is an open-source tool. All processing is done client-side. Your data stays private.
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
        Developed by <a href="https://github.com/rapabru" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">rapabru</a>.
      </p>
    </footer>
  );
};
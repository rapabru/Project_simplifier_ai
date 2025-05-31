import React from 'react';
import type { FileStats } from '../types';

interface StatsDisplayProps {
  stats: FileStats;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="my-6 p-4 bg-gray-100 dark:bg-gray-700/80 rounded-lg border border-gray-300 dark:border-gray-600 shadow">
      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-3 text-center">Processing Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-gray-700 dark:text-gray-100">{stats.scanned}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Files Scanned</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.included}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Files Included</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.excluded}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Files Excluded</p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import type { FileStats } from '../types';

interface StatsDisplayProps {
  stats: FileStats;
}

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ stats }) => {
  return (
    <div className="my-6 p-4 bg-slate-100/70 dark:bg-slate-700/70 rounded-lg border border-slate-300 dark:border-slate-600 shadow">
      <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-3 text-center">Processing Summary</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-3xl font-bold text-slate-700 dark:text-slate-100">{stats.scanned}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Files Scanned</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.included}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Files Included</p>
        </div>
        <div>
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{stats.excluded}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Files Excluded</p>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface ThemeToggleButtonProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full text-blue-600 dark:text-amber-300 bg-white dark:bg-[#232b3b] hover:bg-blue-50 dark:hover:bg-[#2d3650] border border-blue-200 dark:border-amber-400 shadow focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-amber-400 transition-colors duration-150"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <MoonIcon className="w-6 h-6" />
      ) : (
        <SunIcon className="w-6 h-6" />
      )}
    </button>
  );
};
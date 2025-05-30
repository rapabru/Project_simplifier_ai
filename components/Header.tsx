import React from 'react';
import { ThemeToggleButton } from './ThemeToggleButton';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="text-center py-8 relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      </div>
      <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-teal-500 dark:from-sky-400 dark:via-cyan-300 dark:to-teal-400 pb-2">
        Project Context Exporter
      </h1>
      <p className="mt-3 text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
        Instantly package your project's text files into a single, AI-ready block.
        Perfect for Claude, ChatGPT, Gemini, and more.
      </p>
    </header>
  );
};
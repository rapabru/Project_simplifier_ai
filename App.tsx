
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { FileSelector } from './components/FileSelector';
import { StatsDisplay } from './components/StatsDisplay';
import type { FileStats } from './types';
import { OutputDisplay } from './components/OutputDisplay';
import { Footer } from './components/Footer';
import { isFileExcluded } from './utils/fileFilter';
import { LoadingSpinner } from './components/icons/LoadingSpinner';

type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [outputContent, setOutputContent] = useState<string>('');
  const [fileStats, setFileStats] = useState<FileStats>({ scanned: 0, included: 0, excluded: 0 });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      return (storedTheme as Theme) || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const processFiles = useCallback(async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) {
      setError("No folder selected or folder is empty.");
      setOutputContent('');
      setFileStats({ scanned: 0, included: 0, excluded: 0 });
      return;
    }

    setIsLoading(true);
    setError(null);
    setOutputContent('');
    let contentBuilder = '';
    let scannedCount = 0;
    let includedCount = 0;
    let excludedCount = 0;

    const files = Array.from(fileList);

    for (const file of files) {
      scannedCount++;
      const filePath = (file as any).webkitRelativePath || file.name;

      if (isFileExcluded(filePath)) {
        excludedCount++;
        continue;
      }

      try {
        const fileContent = await readFileAsText(file);
        if (file.size > 10 * 1024 * 1024) {
            console.warn(`Skipping large file: ${filePath} (size: ${file.size} bytes)`);
            excludedCount++;
            continue;
        }
        if (isLikelyBinary(fileContent.substring(0, 512))) { 
            console.warn(`Skipping likely binary file: ${filePath}`);
            excludedCount++;
            continue;
        }

        contentBuilder += `Path: ${filePath}\n---\n`;
        contentBuilder += fileContent;
        contentBuilder += '\n---\n\n';
        includedCount++;
      } catch (e) {
        console.error(`Error reading file ${filePath}:`, e);
        setError(`Error reading file ${filePath}. It might be binary or inaccessible.`);
        excludedCount++;
      }
      setFileStats({ scanned: scannedCount, included: includedCount, excluded: excludedCount });
    }

    setOutputContent(contentBuilder);
    setFileStats({ scanned: scannedCount, included: includedCount, excluded: excludedCount });
    setIsLoading(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

  }, []);

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  const isLikelyBinary = (textSample: string): boolean => {
    if (textSample.includes('\u0000')) return true;
    let nonPrintable = 0;
    for (let i = 0; i < textSample.length; i++) {
      const charCode = textSample.charCodeAt(i);
      if ((charCode < 32 || charCode > 126) && charCode !== 9 && charCode !== 10 && charCode !== 13) {
        nonPrintable++;
      }
    }
    return nonPrintable / textSample.length > 0.3;
  };


  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 selection:bg-blue-500 selection:text-white transition-colors duration-300">
      <div className="w-full max-w-4xl mx-auto">
        <Header theme={theme} toggleTheme={toggleTheme} />
        
        <main className="mt-8 bg-white dark:bg-gray-800 shadow-2xl rounded-xl p-6 md:p-8">
          <FileSelector onFilesSelected={processFiles} isLoading={isLoading} ref={fileInputRef} />

          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 border border-red-300 dark:bg-red-900/40 dark:text-red-300 dark:border-red-600/50 rounded-md">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
              <LoadingSpinner className="w-12 h-12 mb-3 text-blue-500 dark:text-blue-400" />
              <p className="text-lg">Processing files... This might take a moment.</p>
              <p className="text-sm">Scanned: {fileStats.scanned}, Included: {fileStats.included}, Excluded: {fileStats.excluded}</p>
            </div>
          )}

          {(!isLoading && (fileStats.scanned > 0 || outputContent)) && (
            <StatsDisplay stats={fileStats} />
          )}
          
          {(!isLoading && outputContent) && (
            <OutputDisplay content={outputContent} />
          )}

          {(!isLoading && !outputContent && fileStats.scanned > 0 && !error) && (
             <div className="mt-6 p-4 bg-blue-50 text-blue-700 border border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-600/40 rounded-md text-center">
                <p className="font-medium">No text files found to include based on the current filters.</p>
                <p className="text-sm">All {fileStats.scanned} scanned files were excluded or empty.</p>
            </div>
          )}
          
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">How to Use:</h3>
            <ol className="list-decimal list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
              <li>Click the "Select Project Folder" button.</li>
              <li>Choose the root folder of your project.</li>
              <li>The tool processes files locally, excluding common clutter (like <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">node_modules</code>, <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded text-xs">.git</code>).</li>
              <li>Review the statistics and the generated output below.</li>
              <li>Click "Copy to Clipboard" and paste into your AI tool (Claude, ChatGPT, Gemini, etc.).</li>
            </ol>
            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
              Your files are processed entirely in your browser. No data is uploaded.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
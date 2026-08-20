import React, { forwardRef } from 'react';
import { FolderIcon } from './icons/FolderIcon';

interface FileSelectorProps {
  onFilesSelected: (fileList: FileList | null) => void;
  isLoading: boolean;
}

export const FileSelector = forwardRef<HTMLInputElement, FileSelectorProps>(
  ({ onFilesSelected, isLoading }, ref) => {
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilesSelected(event.target.files);
    };

    return (
      <div className="my-8 flex flex-col items-center">
        <input
          type="file"
          id="folderUpload"
          // @ts-ignore
          webkitdirectory=""
          directory=""
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={ref}
          disabled={isLoading}
        />
        <label
          htmlFor="folderUpload"
          className={`
            flex flex-col items-center justify-center border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-xl w-64 h-56 sm:w-80 sm:h-64 bg-blue-50/30 dark:bg-blue-900/20 cursor-pointer transition-all duration-150 ease-in-out hover:bg-blue-100/50 dark:hover:bg-blue-800/30 focus:outline-none focus:ring-2 focus:ring-blue-500/70 dark:focus:ring-blue-400 focus:ring-opacity-50
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <FolderIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-3" />
          <span className="text-base font-semibold text-blue-700 dark:text-blue-200 text-center px-2">Select Project Folder</span>
          <span className="mt-1 text-xs text-gray-600 dark:text-gray-400 text-center">or drag & drop here</span>
        </label>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          Click to choose a folder. All processing is done locally in your browser.
        </p>
      </div>
    );
  }
);

FileSelector.displayName = 'FileSelector';
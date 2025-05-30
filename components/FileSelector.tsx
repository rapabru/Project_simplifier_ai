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
      <div className="my-6 flex flex-col items-center">
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
            flex items-center justify-center px-8 py-4 
            bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700
            text-white font-semibold rounded-lg shadow-md 
            cursor-pointer transition-all duration-150 ease-in-out
            transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500/70 dark:focus:ring-sky-500 focus:ring-opacity-50
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <FolderIcon className="w-6 h-6 mr-3" />
          <span>Select Project Folder</span>
        </label>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Click to choose a folder. All processing is done locally in your browser.
        </p>
      </div>
    );
  }
);

FileSelector.displayName = 'FileSelector';
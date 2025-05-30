
import { EXCLUDED_DIRECTORIES, EXCLUDED_FILES, EXCLUDED_EXTENSIONS } from '../constants/exclusions';

export function isFileExcluded(relativePath: string): boolean {
  if (!relativePath) return true; // Exclude if path is undefined or empty

  const lowerRelativePath = relativePath.toLowerCase();
  // Normalize path separators to forward slashes for consistent matching
  const normalizedPath = lowerRelativePath.replace(/\\/g, '/');
  const pathSegments = normalizedPath.split('/').filter(s => s.length > 0);
  
  if (pathSegments.length === 0) return true; // Should not happen if relativePath is valid
  const fileName = pathSegments[pathSegments.length - 1];

  // Check against excluded directories
  // This checks if any segment of the path is an excluded directory name.
  // e.g., "src/node_modules/package/file.js" -> "node_modules" segment matches.
  for (const excludedDir of EXCLUDED_DIRECTORIES) {
    if (pathSegments.includes(excludedDir.toLowerCase())) {
      return true;
    }
  }

  // Check against excluded full file names
  for (const excludedFile of EXCLUDED_FILES) {
    if (fileName === excludedFile.toLowerCase()) {
      return true;
    }
  }

  // Check against excluded extensions
  for (const excludedExt of EXCLUDED_EXTENSIONS) {
    if (fileName.endsWith(excludedExt.toLowerCase())) {
      return true;
    }
  }

  return false;
}

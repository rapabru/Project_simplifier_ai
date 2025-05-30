
// List of directory names to exclude. If any segment of a file's path matches one of these, it's excluded.
// Case-insensitive matching will be applied.
export const EXCLUDED_DIRECTORIES: string[] = [
  "node_modules",
  ".git",
  ".github",
  ".vscode",
  ".idea",
  "dist",
  "build",
  "out",
  "target", // Common in Java, Rust
  "bin",    // Common for compiled output
  "obj",    // Common for .NET
  "__pycache__",
  ".pytest_cache",
  "venv",
  ".venv",
  "env",
  ".env", // Treat as a directory if it has contents, or as a file
  ".next", // Next.js
  ".nuxt", // Nuxt.js
  ".svelte-kit", // SvelteKit
  "cache",
  ".cache",
  "logs",
  "temp",
  "tmp",
  "coverage",
  "docs", // Often contains generated documentation, not source code
  "examples", // Can be noisy, user might want to include manually if needed
  "testdata",
  "fixtures",
  "vendor", // Common in PHP (Composer), Go
  "bower_components",
  "jspm_packages",
  "web_modules",
  "assets", // Often images, fonts etc. unless specified otherwise
  "static", // Similar to assets
  "public", // Often build outputs or static assets
  "cypress" // Cypress testing framework
];

// List of specific file names to exclude. Case-insensitive.
export const EXCLUDED_FILES: string[] = [
  ".DS_Store",
  "Thumbs.db",
  "package-lock.json",
  "yarn.lock",
  "composer.lock",
  "Gemfile.lock",
  "Pipfile.lock",
  "poetry.lock",
  ".eslintcache",
  ".prettierignore",
  ".gitignore",
  ".gitattributes",
  ".gitmodules",
  ".editorconfig",
  "firebase.json", // often config, not source
  "now.json", "vercel.json", // deployment configs
  "netlify.toml",
  "Procfile", "Dockerfile", "docker-compose.yml", // Devops files, might be wanted sometimes, excluded by default for brevity
  ".npmrc", ".yarnrc", ".pnpmfile.js",
  "LICENSE", "README.md", "CONTRIBUTING.md", // Meta files, often not needed for AI context of code itself. User can adjust.
  "SECURITY.md", "CHANGELOG.md", "Makefile"
];

// List of file extensions to exclude (including the dot). Case-insensitive.
export const EXCLUDED_EXTENSIONS: string[] = [
  // Log & temp
  ".log", ".lock", ".swp", ".swo", ".bak", ".tmp", ".temp", ".err", ".out",
  // Compiled / binary / executables
  ".pyc", ".pyo", ".pyd",
  ".class", ".jar", ".war", ".ear",
  ".o", ".obj", ".lib", ".dll", ".so", ".dylib", ".bundle", ".exe", ".app", ".msi", ".deb", ".rpm",
  // Archives
  ".zip", ".tar", ".gz", ".tgz", ".bz2", ".7z", ".rar", ".iso", ".img",
  // Media (images, video, audio)
  ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff", ".webp", ".ico", ".avif",
  // ".svg", // SVGs can be code (e.g. diagrams) or assets. Exclude by default to reduce noise.
  ".mp4", ".mkv", ".mov", ".avi", ".webm", ".flv", ".wmv",
  ".mp3", ".wav", ".ogg", ".aac", ".flac", ".m4a",
  // Documents
  ".pdf", ".doc", ".docx", ".odt", ".rtf",
  ".ppt", ".pptx", ".odp",
  ".xls", ".xlsx", ".ods", ".csv", // CSV can be data, sometimes large
  // Databases & data formats
  ".db", ".sqlite", ".sqlite3", ".mdb", ".accdb", ".sql", ".dump", ".bak",
  // ".json", // JSON is often config or data. Can be very large. Excluded if too big by size check.
  // ".xml", // XML also often config or data.
  // Fonts
  ".woff", ".woff2", ".ttf", ".eot", ".otf",
  // IDE/Editor specific project files (more comprehensive)
  ".ipr", ".iws", ".iml", // IntelliJ
  ".project", ".classpath", ".cproject", // Eclipse
  ".sln", ".suo", ".csproj", ".vbproj", ".user", // Visual Studio
  ".sublime-project", ".sublime-workspace", // Sublime Text
  // Other
  ".plist", ".keystore", ".pem", ".crt", ".key", // Security related, usually not code
  ".patch", ".diff",
  ".map" // Source maps
];

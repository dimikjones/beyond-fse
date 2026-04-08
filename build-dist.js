#!/usr/bin/env node

/**
 * Build Distribution Script for Beyond FSE Theme
 * 
 * This script creates a clean distribution package in the `build/` directory
 * by copying only production files and excluding development files.
 * Uses fast-glob for reliable pattern matching.
 * 
 * Usage: npm run build-dist
 */

const fs = require('fs');
const path = require('path');
const fg = require('fast-glob');
const { promisify } = require('util');

// Promisify fs functions
const mkdir = promisify(fs.mkdir);
const copyFile = promisify(fs.copyFile);
const rm = promisify(fs.rm);

// Configuration
const SOURCE_DIR = __dirname;
const BUILD_DIR = path.join(SOURCE_DIR, 'build');
const THEME_NAME = 'beyond-fse';

// Files and directories to include (production files only)
const INCLUDE_PATTERNS = [
  '**/*.php',
  '**/*.html',
  '**/*.css',
  '**/*.js',
  '**/*.json',
  '**/*.txt',
  '**/*.md',
  '**/*.jpg',
  '**/*.jpeg',
  '**/*.png',
  '**/*.gif',
  '**/*.svg',
  '**/*.ico',
  '**/*.woff',
  '**/*.woff2',
  '**/*.ttf',
  '**/*.eot',
  // Specific files without extensions
  'LICENSE',
];

// Files and directories to exclude (development files)
const EXCLUDE_PATTERNS = [
  // Build directory itself (must be first to prevent recursion)
  'build/**',

  // Ignore source maps
  '**/*.map',
  
  // Git and GitHub files
  '.git/**',
  '.github/**',
  '.gitignore',
  
  // Source files
  'src/**',
  
  // Node dependencies
  'node_modules/**',
  
  // Development configuration
  'package.json',
  'package-lock.json',
  'webpack.config.js',
  'babel.config.js',
  'build-dist.js',
  
  // Development documentation and tools
  '.docs/**',
  '.opencode/**',
  'AGENTS.md',
  'opencode.json',
  
  // AI instructions directory
  'beyond-fse-ai/**',
  
  // Editor and IDE files
  '.vscode/**',
  '*.log',
  '.htaccess',
  '*.esproj',
  '*.tmproj',
  '*.tmproject',
  'tmtags',
  '.*.sw[a-z]',
  '*.un~',
  'Session.vim',
  '*.swp',
  
  // OS files
  '.DS_Store',
  '._*',
  '.Spotlight-V100',
  '.Trashes',
  'Thumbs.db',
  'Desktop.ini',
];

// Helper function to ensure directory exists
async function ensureDir(dirPath) {
  try {
    await mkdir(dirPath, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
}

// Main function
async function buildDistribution() {
  console.log(`🚀 Building distribution package for ${THEME_NAME}...\n`);
  
  try {
    // Clean build directory
    console.log('Cleaning build directory...');
    if (fs.existsSync(BUILD_DIR)) {
      await rm(BUILD_DIR, { recursive: true, force: true });
    }
    
    // Create fresh build directory
    await ensureDir(BUILD_DIR);
    console.log(`Created build directory: ${BUILD_DIR}\n`);
    
    // Get all files matching include patterns, excluding exclude patterns
    console.log('Scanning for production files...');
    const files = await fg(INCLUDE_PATTERNS, {
      cwd: SOURCE_DIR,
      ignore: EXCLUDE_PATTERNS,
      dot: false, // Don't include dotfiles (they're in exclude patterns)
      onlyFiles: true,
    });
    
    console.log(`Found ${files.length} files to copy\n`);
    
    // Copy each file
    let copiedCount = 0;
    let skippedCount = 0;
    
    for (const file of files) {
      const srcPath = path.join(SOURCE_DIR, file);
      const destPath = path.join(BUILD_DIR, file);
      
      // Ensure destination directory exists
      const destDir = path.dirname(destPath);
      await ensureDir(destDir);
      
      // Copy file
      await copyFile(srcPath, destPath);
      console.log(`✓ Copied: ${file}`);
      copiedCount++;
    }
    
    // Create index.php in assets folder for security
    const assetsIndexPath = path.join(BUILD_DIR, 'assets', 'index.php');
    const assetsDir = path.dirname(assetsIndexPath);
    
    if (!fs.existsSync(assetsDir)) {
      await ensureDir(assetsDir);
    }
    
    if (!fs.existsSync(assetsIndexPath)) {
      const indexContent = `<?php
/** Silence is golden.
 *
 * @package Beyond_FSE
 */
`;
      fs.writeFileSync(assetsIndexPath, indexContent);
      console.log('✓ Created: assets/index.php (security file)');
    }
    
    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Distribution package created successfully!');
    console.log('='.repeat(60));
    console.log(`📁 Location: ${BUILD_DIR}`);
    console.log(`📊 Files copied: ${copiedCount}`);
    console.log(`📊 Files skipped: ${skippedCount}`);
    
    console.log('\n📋 Files included in distribution:');
    console.log('- All PHP templates and theme files');
    console.log('- Compiled CSS/JS from assets/ folder');
    console.log('- Block templates (HTML files)');
    console.log('- Theme configuration (theme.json, style.css)');
    console.log('- Documentation (readme.txt, LICENSE)');
    console.log('- Screenshot (screenshot.png)');
    
    console.log('\n🚫 Files excluded from distribution:');
    console.log('- Git files (.git/, .github/, .gitignore)');
    console.log('- Source files (src/ directory)');
    console.log('- Node.js dependencies (node_modules/)');
    console.log('- Development configuration files');
    console.log('- Development documentation (.docs/, .opencode/)');
    console.log('- Build script itself (build-dist.js)');
    console.log('- AI instructions (beyond-fse-ai/)');
    
    console.log('\n📦 Package is ready for WordPress.org submission!');
    
  } catch (error) {
    console.error('\n❌ Error building distribution package:');
    console.error(error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
buildDistribution();

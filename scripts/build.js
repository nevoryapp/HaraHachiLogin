#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🏗️  Building application...');

try {
  // Build frontend and backend
  console.log('📦 Building frontend and backend...');
  execSync('vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', {
    cwd: rootDir,
    stdio: 'inherit'
  });

  // Copy PDF files to the public directory in dist
  const sourceDir = path.join(rootDir, 'client', 'public');
  const targetDir = path.join(rootDir, 'dist', 'public');

  if (fs.existsSync(sourceDir)) {
    console.log('📄 Copying PDF files...');
    
    // Ensure target directory exists
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Copy all files from client/public to dist/public
    const copyRecursively = (src, dest) => {
      const stats = fs.statSync(src);
      if (stats.isDirectory()) {
        if (!fs.existsSync(dest)) {
          fs.mkdirSync(dest, { recursive: true });
        }
        const files = fs.readdirSync(src);
        files.forEach(file => {
          copyRecursively(path.join(src, file), path.join(dest, file));
        });
      } else {
        fs.copyFileSync(src, dest);
      }
    };

    const files = fs.readdirSync(sourceDir);
    files.forEach(file => {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(targetDir, file);
      copyRecursively(srcPath, destPath);
      console.log(`✅ Copied ${file}`);
    });
  }

  console.log('🎉 Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
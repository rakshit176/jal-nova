const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Jalnova for Cloudflare deployment...');

// Clean previous builds
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// Create dist directory
fs.mkdirSync('dist', { recursive: true });

// Build Next.js application
console.log('📦 Building Next.js application...');
execSync('npm run build', { stdio: 'inherit' });

// Copy static files
console.log('📋 Copying static files...');
execSync('cp -r public/* dist/', { stdio: 'inherit' });

// Copy Next.js static files
if (fs.existsSync('.next/static')) {
  execSync('cp -r .next/static dist/', { stdio: 'inherit' });
}

console.log('✅ Build complete! Ready for Cloudflare deployment.');
console.log('📁 Static files are in the "dist" directory');
console.log('🌐 Deploy with: npx wrangler deploy');
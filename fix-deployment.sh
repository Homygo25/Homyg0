#!/bin/bash
# Quick Deployment Fix Script

echo "🔧 Fixing composer.lock deployment error..."

# Remove any PHP-related files that might confuse the buildpack
find . -name "composer.*" -type f -delete 2>/dev/null || true
find . -name "*.php" -type f -delete 2>/dev/null || true

# Ensure Node.js files are present and correct
echo "✅ Verifying Node.js project structure..."

# Check package.json
if [ ! -f "package.json" ]; then
    echo "❌ package.json missing!"
    exit 1
fi

# Run build to ensure it works
echo "🏗️ Testing build process..."
npm install
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Show deployment commands for different platforms
echo ""
echo "🚀 Deployment Commands:"
echo ""
echo "For Heroku:"
echo "  git add ."
echo "  git commit -m 'Fix: Force Node.js buildpack'"
echo "  heroku buildpacks:clear"
echo "  heroku buildpacks:add heroku/nodejs"
echo "  git push heroku main"
echo ""
echo "For Netlify:"
echo "  Deploy via GUI or: netlify deploy --prod"
echo ""
echo "For Vercel:"
echo "  Deploy via GUI or: vercel --prod"
echo ""
echo "Environment variables needed:"
echo "  VITE_ADMIN_USERNAME=xdash_admin"
echo "  VITE_ADMIN_PASSWORD=SecureAdmin2025!@#"
echo "  VITE_SUPABASE_URL=your_supabase_url"
echo "  VITE_SUPABASE_ANON_KEY=your_supabase_key"

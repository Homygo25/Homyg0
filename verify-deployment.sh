#!/bin/bash
# Deployment Verification Script

echo "🚀 Node.js Deployment Verification"
echo "=================================="

echo "📋 Project Type Check:"
echo "- package.json exists: $(test -f package.json && echo '✅' || echo '❌')"
echo "- node_modules exists: $(test -d node_modules && echo '✅' || echo '❌')"  
echo "- No composer.json: $(test ! -f composer.json && echo '✅' || echo '❌ PHP detected!')"
echo "- No composer.lock: $(test ! -f composer.lock && echo '✅' || echo '❌ PHP detected!')"

echo ""
echo "🔧 Build Configuration:"
echo "- Vite config exists: $(test -f vite.config.js && echo '✅' || echo '❌')"
echo "- .nvmrc exists: $(test -f .nvmrc && echo '✅' || echo '❌')"
echo "- .buildpacks exists: $(test -f .buildpacks && echo '✅' || echo '❌')"

echo ""
echo "📦 Dependencies:"
if command -v npm &> /dev/null; then
    echo "- npm installed: ✅"
    echo "- npm version: $(npm --version)"
else
    echo "- npm installed: ❌"
fi

if command -v node &> /dev/null; then
    echo "- node installed: ✅"
    echo "- node version: $(node --version)"
else
    echo "- node installed: ❌"
fi

echo ""
echo "🏗️ Build Test:"
echo "Running: npm run build"
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "- dist folder exists: $(test -d dist && echo '✅' || echo '❌')"
    if [ -d dist ]; then
        echo "- dist files: $(ls -la dist/ | wc -l) files"
    fi
else
    echo "❌ Build failed!"
fi

echo ""
echo "🌐 Environment Variables:"
echo "- VITE_ADMIN_USERNAME: $(test -n "$VITE_ADMIN_USERNAME" && echo '✅ Set' || echo '❌ Missing')"
echo "- VITE_ADMIN_PASSWORD: $(test -n "$VITE_ADMIN_PASSWORD" && echo '✅ Set' || echo '❌ Missing')" 
echo "- VITE_SUPABASE_URL: $(test -n "$VITE_SUPABASE_URL" && echo '✅ Set' || echo '❌ Missing')"
echo "- VITE_SUPABASE_ANON_KEY: $(test -n "$VITE_SUPABASE_ANON_KEY" && echo '✅ Set' || echo '❌ Missing')"

echo ""
echo "🎯 Deployment Platform Detection:"
if [ -f "netlify.toml" ]; then
    echo "- Netlify config: ✅"
fi
if [ -f "vercel.json" ]; then
    echo "- Vercel config: ✅"  
fi
if [ -f "Procfile" ]; then
    echo "- Heroku config: ✅"
fi

echo ""
echo "🔍 Recommendations:"
echo "1. Ensure platform buildpack is set to Node.js"
echo "2. Set environment variables in platform dashboard"
echo "3. Clear deployment cache if available"
echo "4. Use Node.js 18.x runtime"

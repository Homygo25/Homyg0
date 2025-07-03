#!/bin/bash

# Laravel 11.31 Upgrade Verification Script
# Verifies that the project is ready for Laravel Cloud deployment

echo "🚀 Laravel 11.31 Upgrade Verification"
echo "====================================="

# Check Laravel version in composer.json
echo "📋 Checking Laravel version in composer.json..."
if grep -q '"laravel/framework": "\^11.31"' composer.json; then
    echo "✅ Laravel 11.31 constraint found in composer.json"
else
    echo "❌ Laravel 11.31 constraint NOT found in composer.json"
    exit 1
fi

# Check Laravel version in composer.lock
echo "📋 Checking Laravel version in composer.lock..."
if grep -q '"version": "v11.31.0"' composer.lock; then
    echo "✅ Laravel 11.31.0 found in composer.lock"
else
    echo "❌ Laravel 11.31.0 NOT found in composer.lock"
    exit 1
fi

# Check PHP version requirement
echo "📋 Checking PHP version requirement..."
if grep -q '"php": "\^8.2"' composer.json; then
    echo "✅ PHP 8.2+ requirement found"
else
    echo "❌ PHP 8.2+ requirement NOT found"
    exit 1
fi

# Check Laravel 11 bootstrap structure
echo "📋 Checking Laravel 11 bootstrap structure..."
if grep -q "Application::configure" bootstrap/app.php; then
    echo "✅ Laravel 11 bootstrap structure found"
else
    echo "❌ Laravel 11 bootstrap structure NOT found"
    exit 1
fi

# Check required Laravel directories
echo "📋 Checking required Laravel directories..."
required_dirs=("app" "bootstrap" "config" "database" "public" "resources" "routes" "storage")
for dir in "${required_dirs[@]}"; do
    if [ -d "$dir" ]; then
        echo "✅ Directory $dir exists"
    else
        echo "❌ Directory $dir is missing"
        exit 1
    fi
done

# Check required Laravel files
echo "📋 Checking required Laravel files..."
required_files=("artisan" "composer.json" "composer.lock" ".env.example")
for file in "${required_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ File $file exists"
    else
        echo "❌ File $file is missing"
        exit 1
    fi
done

# Check React integration files
echo "📋 Checking React integration files..."
react_files=("resources/js/app-new.jsx" "resources/views/app.blade.php" "vite.config.laravel.js")
for file in "${react_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ React file $file exists"
    else
        echo "❌ React file $file is missing"
        exit 1
    fi
done

# Check Laravel build script in package.json
echo "📋 Checking Laravel build script..."
if grep -q '"laravel:build": "vite build --config vite.config.laravel.js"' package.json; then
    echo "✅ Laravel build script found in package.json"
else
    echo "❌ Laravel build script NOT found in package.json"
    exit 1
fi

# Check environment configuration
echo "📋 Checking environment configuration..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file not found (will be created from .env.example)"
fi

echo ""
echo "🎯 Laravel 11.31 Upgrade Verification Complete!"
echo "==============================================="
echo ""
echo "✅ All checks passed! Your project is ready for Laravel Cloud deployment."
echo ""
echo "📝 Next Steps:"
echo "1. Push to your Git repository"
echo "2. Deploy to Laravel Cloud"
echo "3. Set environment variables in the Laravel Cloud dashboard"
echo ""
echo "🔗 Laravel Version: 11.31.0"
echo "🔗 PHP Version: 8.2+"
echo "🔗 Node.js Version: 18+"

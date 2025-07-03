#!/bin/bash

# Laravel Cloud Deployment Script
echo "🚀 Deploying React App to Laravel Cloud..."

# Install composer dependencies
echo "📦 Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

# Install npm dependencies  
echo "📦 Installing Node.js dependencies..."
npm ci

# Build React assets
echo "🏗️ Building React application..."
npm run laravel:build

# Generate Laravel application key (if not set)
if [ -z "$APP_KEY" ]; then
    echo "🔑 Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache config
echo "⚡ Optimizing Laravel..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "✅ Deployment complete!"
echo ""
echo "📝 Environment Variables Required:"
echo "   APP_NAME=X Phishing Awareness"
echo "   APP_ENV=production"  
echo "   APP_KEY=[auto-generated]"
echo "   APP_DEBUG=false"
echo "   VITE_ADMIN_USERNAME=xdash_admin"
echo "   VITE_ADMIN_PASSWORD=SecureAdmin2025!@#"
echo "   VITE_SUPABASE_URL=your_supabase_url"
echo "   VITE_SUPABASE_ANON_KEY=your_supabase_key"

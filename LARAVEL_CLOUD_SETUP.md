# Laravel Cloud Deployment Guide

## 🎯 Project Converted for Laravel Cloud

Your React application has been wrapped in a Laravel structure for Laravel Cloud compatibility.

## 📁 New Structure Added:

### Laravel Backend:
- `composer.json` - PHP dependencies
- `app/Http/Controllers/ReactController.php` - Serves React app
- `routes/web.php` - Laravel routing
- `resources/views/app.blade.php` - Main template
- `resources/js/app.js` - Laravel Vite entry point
- `config/app.php` - Laravel configuration

### Original React App:
- All your React code in `src/` remains unchanged
- Vite configuration updated for Laravel integration

## 🚀 Deployment Steps for Laravel Cloud:

### 1. Install PHP Dependencies:
```bash
composer install --no-dev --optimize-autoloader
```

### 2. Install Node Dependencies:
```bash
npm install
```

### 3. Build Assets:
```bash
npm run laravel:build
```

### 4. Environment Variables:
Copy `.env.laravel` to `.env` and update:
```bash
cp .env.laravel .env
php artisan key:generate
```

### 5. Set Environment Variables in Laravel Cloud:
```
APP_NAME="X Phishing Awareness"
APP_ENV=production
APP_KEY=[generated-key]
APP_DEBUG=false
VITE_ADMIN_USERNAME=xdash_admin
VITE_ADMIN_PASSWORD=SecureAdmin2025!@#
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

## 🔧 How It Works:

1. **Laravel serves the React app** from `resources/views/app.blade.php`
2. **All React routes** are handled by the SPA (Single Page Application)
3. **API endpoints** available at `/api/capture-data` and `/api/admin/data`
4. **Vite builds** your React assets into Laravel's public directory

## 📡 API Integration:

Your React app can now use Laravel's API endpoints:
- `POST /api/capture-data` - Store phishing simulation data
- `GET /api/admin/data` - Retrieve captured data for admin

## 🏗️ Laravel Cloud Specific:

- Uses `composer.json` for PHP dependencies ✅
- Follows Laravel directory structure ✅  
- Compatible with Laravel Cloud's deployment pipeline ✅
- Serves React as a SPA through Laravel ✅

## 🎉 Ready for Laravel Cloud!

Your project is now structured as a Laravel application that serves your React frontend. Deploy it to Laravel Cloud and it should work without the `composer.lock` error.

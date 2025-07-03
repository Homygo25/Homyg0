# Laravel 11.31 Upgrade Verification Script (PowerShell)
# Verifies that the project is ready for Laravel Cloud deployment

Write-Host "🚀 Laravel 11.31 Upgrade Verification" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$errors = 0

# Check Laravel version in composer.json
Write-Host "📋 Checking Laravel version in composer.json..." -ForegroundColor Yellow
if (Select-String -Path "composer.json" -Pattern '"laravel/framework": "\^11.31"') {
    Write-Host "✅ Laravel 11.31 constraint found in composer.json" -ForegroundColor Green
} else {
    Write-Host "❌ Laravel 11.31 constraint NOT found in composer.json" -ForegroundColor Red
    $errors++
}

# Check Laravel version in composer.lock
Write-Host "📋 Checking Laravel version in composer.lock..." -ForegroundColor Yellow
if (Select-String -Path "composer.lock" -Pattern '"version": "v11.31.0"') {
    Write-Host "✅ Laravel 11.31.0 found in composer.lock" -ForegroundColor Green
} else {
    Write-Host "❌ Laravel 11.31.0 NOT found in composer.lock" -ForegroundColor Red
    $errors++
}

# Check PHP version requirement
Write-Host "📋 Checking PHP version requirement..." -ForegroundColor Yellow
if (Select-String -Path "composer.json" -Pattern '"php": "\^8.2"') {
    Write-Host "✅ PHP 8.2+ requirement found" -ForegroundColor Green
} else {
    Write-Host "❌ PHP 8.2+ requirement NOT found" -ForegroundColor Red
    $errors++
}

# Check Laravel 11 bootstrap structure
Write-Host "📋 Checking Laravel 11 bootstrap structure..." -ForegroundColor Yellow
if (Select-String -Path "bootstrap/app.php" -Pattern "Application::configure") {
    Write-Host "✅ Laravel 11 bootstrap structure found" -ForegroundColor Green
} else {
    Write-Host "❌ Laravel 11 bootstrap structure NOT found" -ForegroundColor Red
    $errors++
}

# Check required Laravel directories
Write-Host "📋 Checking required Laravel directories..." -ForegroundColor Yellow
$required_dirs = @("app", "bootstrap", "config", "database", "public", "resources", "routes", "storage")
foreach ($dir in $required_dirs) {
    if (Test-Path $dir) {
        Write-Host "✅ Directory $dir exists" -ForegroundColor Green
    } else {
        Write-Host "❌ Directory $dir is missing" -ForegroundColor Red
        $errors++
    }
}

# Check required Laravel files
Write-Host "📋 Checking required Laravel files..." -ForegroundColor Yellow
$required_files = @("artisan", "composer.json", "composer.lock", ".env.example")
foreach ($file in $required_files) {
    if (Test-Path $file) {
        Write-Host "✅ File $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ File $file is missing" -ForegroundColor Red
        $errors++
    }
}

# Check React integration files
Write-Host "📋 Checking React integration files..." -ForegroundColor Yellow
$react_files = @("resources/js/app-new.jsx", "resources/views/app.blade.php", "vite.config.laravel.js")
foreach ($file in $react_files) {
    if (Test-Path $file) {
        Write-Host "✅ React file $file exists" -ForegroundColor Green
    } else {
        Write-Host "❌ React file $file is missing" -ForegroundColor Red
        $errors++
    }
}

# Check Laravel build script in package.json
Write-Host "📋 Checking Laravel build script..." -ForegroundColor Yellow
if (Select-String -Path "package.json" -Pattern '"laravel:build": "vite build --config vite.config.laravel.js"') {
    Write-Host "✅ Laravel build script found in package.json" -ForegroundColor Green
} else {
    Write-Host "❌ Laravel build script NOT found in package.json" -ForegroundColor Red
    $errors++
}

# Check environment configuration
Write-Host "📋 Checking environment configuration..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✅ .env file exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file not found (will be created from .env.example)" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Laravel 11.31 Upgrade Verification Complete!" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan
Write-Host ""

if ($errors -eq 0) {
    Write-Host "✅ All checks passed! Your project is ready for Laravel Cloud deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Yellow
    Write-Host "1. Push to your Git repository" -ForegroundColor White
    Write-Host "2. Deploy to Laravel Cloud" -ForegroundColor White
    Write-Host "3. Set environment variables in the Laravel Cloud dashboard" -ForegroundColor White
    Write-Host ""
    Write-Host "🔗 Laravel Version: 11.31.0" -ForegroundColor Magenta
    Write-Host "🔗 PHP Version: 8.2+" -ForegroundColor Magenta
    Write-Host "🔗 Node.js Version: 18+" -ForegroundColor Magenta
} else {
    Write-Host "❌ $errors error(s) found! Please fix the issues above before deploying." -ForegroundColor Red
    exit 1
}

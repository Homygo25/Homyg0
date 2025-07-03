# Deployment Configuration Fix

## Issue: composer.lock Error

The deployment platform is incorrectly detecting this as a PHP project instead of Node.js.

## Solutions Applied:

### 1. Explicit Buildpack Configuration (.buildpacks)
- Added heroku/nodejs buildpack specification

### 2. Updated package.json
- Added `heroku-postbuild` script
- Updated start script to ensure build runs

### 3. Node.js Version Specification
- Updated .nvmrc to Node 18.18.0
- Added engines field in package.json

### 4. Platform-Specific Configs
- netlify.toml: Correct Node.js build
- vercel.json: Static build configuration
- Procfile: Explicit Node.js runtime

## For Different Platforms:

### Heroku:
```bash
heroku buildpacks:clear
heroku buildpacks:add heroku/nodejs
```

### Netlify:
- Should use netlify.toml (already configured)

### Vercel:
- Should use vercel.json (already configured)

### Railway/Render:
- Should auto-detect from package.json

## Manual Fix Commands:

If still getting PHP errors, run on your platform:

```bash
# Clear any cached buildpacks
git push --force

# Or specify buildpack manually in platform settings:
# Buildpack URL: https://github.com/heroku/heroku-buildpack-nodejs
```

## Environment Variables Required:
- VITE_ADMIN_USERNAME
- VITE_ADMIN_PASSWORD  
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

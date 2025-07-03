# Security & Configuration Guide

⚠️ **IMPORTANT SECURITY NOTICE** ⚠️

This guide covers the security improvements made to the X-Dash Phishing Awareness Tool.

## 🔒 Security Fixes Applied

### 1. Environment Variables Configuration
- **FIXED**: Hardcoded credentials and API keys
- **IMPLEMENTED**: Secure environment variable system
- **ADDED**: Configuration validation

### 2. Credentials Management
All sensitive information is now stored in environment variables:

```env
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_key
```

### 3. Security Utilities
Created `/src/lib/security.js` with:
- Environment variable validation
- Secure credential management
- Data sanitization for logging
- Development environment checks

## 🛡️ Security Best Practices Implemented

### Environment Setup
1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Update with your actual values:**
   - Change the default admin password
   - Use your own Supabase credentials
   - Never commit `.env` to version control

### Production Deployment
- **Change all default passwords**
- **Use strong, unique credentials**
- **Enable HTTPS/SSL**
- **Monitor access logs**
- **Regular security audits**

## 🔧 Configuration Files

### `.env` (Local Development)
```env
# Admin Credentials - CHANGE THESE!
VITE_ADMIN_USERNAME=your_admin_username
VITE_ADMIN_PASSWORD=your_secure_password_here

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### `.env.example` (Template)
Template file showing required environment variables without sensitive values.

## 🚨 Before Going Live

1. **Change Default Credentials**
   - Update admin username/password
   - Use strong passwords (12+ characters, mixed case, numbers, symbols)

2. **Secure Supabase Setup**
   - Enable Row Level Security (RLS)
   - Configure proper database permissions
   - Monitor API usage

3. **Application Security**
   - Enable HTTPS
   - Configure proper CORS
   - Set up monitoring/logging

## 📝 Migration Guide

If upgrading from a previous version:

1. **Create `.env` file** from `.env.example`
2. **Update credentials** in environment variables
3. **Remove hardcoded credentials** from any custom code
4. **Test admin login** with new configuration

## 🔍 Verification

To verify the security fixes:

1. **Check environment validation:**
   - App should warn about missing variables
   - Admin login should show config errors if variables missing

2. **Test credential changes:**
   - Modify `.env` file
   - Restart development server
   - Verify new credentials work

3. **Confirm no hardcoded secrets:**
   - Search codebase for sensitive strings
   - All credentials should come from environment

---

**Created**: July 3, 2025  
**Purpose**: Security hardening for phishing awareness tool  
**Status**: ✅ Production Ready with Security Fixes

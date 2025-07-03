// Security utilities and configuration validation

/**
 * Validates that required environment variables are set
 * @returns {boolean} True if all required variables are present
 */
export function validateEnvironmentVariables() {
  const requiredVars = [
    'VITE_ADMIN_USERNAME',
    'VITE_ADMIN_PASSWORD',
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];

  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Missing required environment variables:', missingVars);
    return false;
  }
  
  return true;
}

/**
 * Gets admin credentials from environment variables
 * @returns {object} Object containing username and password
 */
export function getAdminCredentials() {
  return {
    username: import.meta.env.VITE_ADMIN_USERNAME,
    password: import.meta.env.VITE_ADMIN_PASSWORD
  };
}

/**
 * Gets Supabase configuration from environment variables
 * @returns {object} Object containing Supabase URL and key
 */
export function getSupabaseConfig() {
  return {
    url: import.meta.env.VITE_SUPABASE_URL,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  };
}

/**
 * Validates that the app is running in development mode for sensitive operations
 * @returns {boolean} True if in development mode
 */
export function isValidDevelopmentEnvironment() {
  return import.meta.env.DEV || import.meta.env.MODE === 'development';
}

/**
 * Sanitizes sensitive data for logging (replaces sensitive parts with asterisks)
 * @param {string} data - The data to sanitize
 * @param {number} visibleChars - Number of characters to keep visible at start/end
 * @returns {string} Sanitized string
 */
export function sanitizeForLogging(data, visibleChars = 3) {
  if (!data || data.length <= visibleChars * 2) {
    return '*'.repeat(data?.length || 8);
  }
  
  const start = data.substring(0, visibleChars);
  const end = data.substring(data.length - visibleChars);
  const middle = '*'.repeat(Math.max(4, data.length - visibleChars * 2));
  
  return `${start}${middle}${end}`;
}

// Simple test to check if environment variables are loaded correctly
console.log('Environment variables test:');
console.log('VITE_ADMIN_USERNAME:', process.env.VITE_ADMIN_USERNAME || 'NOT FOUND');
console.log('VITE_ADMIN_PASSWORD:', process.env.VITE_ADMIN_PASSWORD ? '[HIDDEN]' : 'NOT FOUND');
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL ? '[HIDDEN]' : 'NOT FOUND');
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? '[HIDDEN]' : 'NOT FOUND');

// Test the security functions
import { getAdminCredentials, validateEnvironmentVariables } from './src/lib/security.js';

console.log('\nSecurity functions test:');
console.log('validateEnvironmentVariables():', validateEnvironmentVariables());

const credentials = getAdminCredentials();
console.log('getAdminCredentials():', {
  hasUsername: !!credentials.username,
  hasPassword: !!credentials.password,
  username: credentials.username || 'MISSING',
  password: credentials.password ? '[HIDDEN]' : 'MISSING'
});

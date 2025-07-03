import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';
import { X_LOGO_URL } from '@/config/constants';
import { getAdminCredentials, validateEnvironmentVariables } from '@/lib/security';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAppState();

  useEffect(() => {
    console.log('AdminLoginPage useEffect - Auth state:', isAdminAuthenticated);
    if (isAdminAuthenticated) {
      console.log('Already authenticated, navigating to dashboard');
      navigate('/admin/dashboard', { replace: true });
    }
    
    // Validate environment variables on component mount
    if (!validateEnvironmentVariables()) {
      setError('Application configuration error. Please check environment variables.');
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    console.log('Login attempt initiated');
    console.log('All env vars:', import.meta.env);
    
    // Check if environment variables are available
    const envUsername = import.meta.env.VITE_ADMIN_USERNAME;
    const envPassword = import.meta.env.VITE_ADMIN_PASSWORD;
    
    console.log('Direct env check:', { 
      envUsername, 
      envPassword: envPassword ? '[HIDDEN]' : 'MISSING',
      allEnvKeys: Object.keys(import.meta.env)
    });
    
    // Get admin credentials from secure configuration
    const { username: adminUsername, password: adminPassword } = getAdminCredentials();
    
    console.log('Environment credentials loaded:', { 
      hasUsername: !!adminUsername, 
      hasPassword: !!adminPassword,
      inputUsername: username,
      inputPassword: password 
    });
    
    if (!adminUsername || !adminPassword) {
      console.error('Missing admin credentials from environment');
      setError('Authentication configuration error. Please contact administrator.');
      return;
    }
    
    if (username === adminUsername && password === adminPassword) {
      console.log('Credentials match, setting authenticated state');
      setIsAdminAuthenticated(true);
      
      // Force navigation with a small delay to ensure state is updated
      setTimeout(() => {
        console.log('Force navigation after state update');
        navigate('/admin/dashboard', { replace: true });
      }, 100);
      
    } else {
      console.log('Invalid credentials provided');
      setError('Invalid credentials. Please try again.');
      setIsAdminAuthenticated(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login - Scam Awareness Tool</title>
        <meta name="description" content="Login page for the admin dashboard." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[420px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[25px]">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-3 bg-[#253341] border-none rounded-[6px] text-white text-[0.95em] box-border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-3 bg-[#253341] border-none rounded-[6px] text-white text-[0.95em] box-border"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full p-3 bg-[#1da1f2] text-white border-none rounded-[6px] text-[1em] cursor-pointer mt-[10px] hover:bg-[#1a91da] transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
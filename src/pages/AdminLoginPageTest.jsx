import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';
import { X_LOGO_URL } from '@/config/constants';

export default function AdminLoginPageTest() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAppState();

  // Hardcoded credentials for testing
  const TEST_USERNAME = 'admin';
  const TEST_PASSWORD = 'password123';

  useEffect(() => {
    console.log('AdminLoginPageTest - Auth state:', isAdminAuthenticated);
    console.log('localStorage before:', localStorage.getItem('isAdminAuthenticated'));
    
    if (isAdminAuthenticated) {
      console.log('Already authenticated, navigating to debug dashboard');
      navigate('/admin/debug-dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    console.log('TEST Login attempt:', { username, password });
    
    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      console.log('TEST: Credentials match, setting authenticated state');
      setIsAdminAuthenticated(true);
      
      // Immediate navigation attempt
      navigate('/admin/debug-dashboard', { replace: true });
      
    } else {
      console.log('TEST: Invalid credentials');
      setError('Invalid credentials. Use admin/password123');
      setIsAdminAuthenticated(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login Test - Scam Awareness Tool</title>
        <meta name="description" content="Test login page for the admin dashboard." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[420px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[25px]">Admin Login TEST</h2>
          <p className="text-sm mb-4 text-gray-300">Test credentials: admin / password123</p>
          <button 
            onClick={() => {
              localStorage.clear();
              setIsAdminAuthenticated(false);
              console.log('localStorage cleared');
            }}
            className="mb-4 px-4 py-2 bg-red-600 text-white rounded text-sm"
          >
            Clear Storage & Reset
          </button>
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

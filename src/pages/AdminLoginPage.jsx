import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';
import { X_LOGO_URL } from '@/config/constants';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAppState();

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAdminAuthenticated, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Enhanced admin credentials
    if (username === 'xdash_admin' && password === 'SecureAdmin2025!@#') {
      setIsAdminAuthenticated(true);
      navigate('/admin/dashboard', { replace: true }); 
    } else {
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
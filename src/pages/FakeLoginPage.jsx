import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { X_LOGO_URL } from '@/config/constants';

export default function FakeLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Generate session ID for tracking
  React.useEffect(() => {
    if (!sessionStorage.getItem('simulationSessionId')) {
      const sessionId = 'sim_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('simulationSessionId', sessionId);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      const sessionId = sessionStorage.getItem('simulationSessionId');
      localStorage.setItem('currentCapture', JSON.stringify({ 
        id: Date.now(), 
        username, 
        password, 
        phoneNumber: '', 
        code: '',
        sessionId 
      }));
      navigate('/confirm-phone-number');
    } else {
      alert('Please enter both username/email and password.');
    }
  };

  return (
    <>
      <Helmet>
        <title>Login to X - Scam Awareness</title>
        <meta name="description" content="Simulated X login page for scam awareness education." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[420px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[15px]">Sign in to X</h2>
          <p className="text-[0.95em] mb-5 text-white">
            Enter your credentials to continue your "verification" process.
          </p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Phone, email, or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mb-3 bg-[#253341] border-none rounded-[6px] text-white text-[0.95em] box-border"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mb-5 bg-[#253341] border-none rounded-[6px] text-white text-[0.95em] box-border"
            />
            <button
              type="submit"
              className="w-full p-3 bg-[#1da1f2] text-white border-none rounded-[6px] text-[1em] cursor-pointer hover:bg-[#1a91da] transition-colors"
            >
              Next
            </button>
          </form>
          <div className="mt-5 text-[0.85em]">
            <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1da1f2] hover:underline">Forgot password?</a>
          </div>
          <div className="mt-3 text-[0.85em] text-gray-400">
            Don't have an account? <a href="#" onClick={(e) => e.preventDefault()} className="text-[#1da1f2] hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </>
  );
}
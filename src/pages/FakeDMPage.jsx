import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, MessageSquare } from 'lucide-react';
import { X_LOGO_URL } from '@/config/constants';

const LINK_STORAGE_KEY = 'issuedVerificationTokens';

const generateToken = () => {
  return `token_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
};

export default function FakeDMPage() {
  const navigate = useNavigate();

  const handleVerifyClick = () => {
    const token = generateToken();
    const issuedTokensString = localStorage.getItem(LINK_STORAGE_KEY);
    const issuedTokens = issuedTokensString ? JSON.parse(issuedTokensString) : [];
    localStorage.setItem(LINK_STORAGE_KEY, JSON.stringify([...issuedTokens, token]));
    
    navigate(`/login-verification?token=${token}`);
  };

  return (
    <>
      <Helmet>
        <title>X Direct Message - Scam Awareness</title>
        <meta name="description" content="Simulated X direct message for scam awareness education." />
      </Helmet>
      <div className="bg-[#15202B] min-h-screen flex flex-col items-center justify-center p-4 font-chirp text-white">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg bg-[#1E2732] rounded-xl shadow-2xl overflow-hidden"
        >
          <header className="bg-[#273340] p-4 flex items-center justify-between border-b border-[#38444d]">
            <div className="flex items-center">
              <img src={X_LOGO_URL} alt="X Support Logo" className="w-8 h-8 rounded-full mr-3" />
              <div>
                <h1 className="text-lg font-bold flex items-center">
                  X Support 
                  <svg className="w-5 h-5 ml-1 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.74 0 6.53 1.77 5.78 4.45C2.77 5.2 0 7.41 0 12c0 4.59 2.77 6.8 5.78 7.55C6.53 22.23 8.74 24 12 24c3.26 0 5.47-1.77 6.22-4.45C21.23 18.8 24 16.59 24 12c0-4.59-2.77-6.8-5.78-7.55C18.47 1.77 16.26 0 12 0zm5.85 8.15l-7 7c-.2.2-.45.3-.7.3s-.5-.1-.7-.3l-3-3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l2.3 2.3 6.3-6.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4z"/>
                  </svg>
                </h1>
                <p className="text-xs text-gray-400">@XSupport</p>
              </div>
            </div>
            <MessageSquare size={24} className="text-gray-400" />
          </header>

          <main className="p-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-start space-x-3"
            >
              <img src={X_LOGO_URL} alt="X Support" className="w-10 h-10 rounded-full" />
              <div className="bg-[#253341] p-4 rounded-lg rounded-tl-none shadow-md max-w-xs">
                <p className="text-sm">
                  Hi there! We've detected unusual activity on your X account. To ensure your account's security, please verify your identity immediately.
                </p>
                <p className="text-xs text-gray-500 mt-2">2 min ago</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start space-x-3"
            >
              <img src={X_LOGO_URL} alt="X Support" className="w-10 h-10 rounded-full" />
              <div className="bg-[#253341] p-4 rounded-lg rounded-tl-none shadow-md max-w-md">
                <p className="text-sm mb-3">
                  Click the link below to start the verification process. Failure to verify within 24 hours may result in temporary account suspension.
                </p>
                <button
                  onClick={handleVerifyClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center transition-colors duration-150 text-sm"
                >
                  <ShieldCheck size={18} className="mr-2" /> Verify Account Now
                </button>
                <p className="text-xs text-gray-500 mt-2">1 min ago</p>
              </div>
            </motion.div>
          </main>
          
          <footer className="p-4 border-t border-[#38444d] text-center">
            <p className="text-xs text-gray-500">
              This is a simulated environment for educational purposes.
            </p>
          </footer>
        </motion.div>
      </div>
    </>
  );
}
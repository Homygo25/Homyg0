import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { X_LOGO_URL } from '@/config/constants';

export default function FakeDashboardPage() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          navigate('/verification-complete'); 
          return 100;
        }
        return prevProgress + 1;
      });
    }, 30); 

    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>X System Dashboard - Scam Awareness</title>
        <meta name="description" content="Simulated X system dashboard with animated progress for scam awareness." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[480px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[15px]">X ⚙️ System Dashboard</h2>
          <p className="text-white">Verification Process: <strong className="font-bold">{progress}%</strong></p>
          <div className="w-full bg-[#253341] rounded-[12px] overflow-hidden my-5 h-5">
            <motion.div
              className="h-full bg-[#1da1f2] rounded-[12px]"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.03, ease: "linear" }}
            />
          </div>
          <div className="text-[0.9em] text-[#8899a6] mb-5">
            Please do not refresh this page while we confirm your status.
          </div>
        </div>
      </div>
    </>
  );
}
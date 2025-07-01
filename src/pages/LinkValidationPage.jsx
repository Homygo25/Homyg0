import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useAppState } from '@/context/AppStateContext';
import { Loader2 } from 'lucide-react';

const LINK_STORAGE_KEY = 'issuedVerificationTokens';
const USED_LINK_STORAGE_KEY = 'usedVerificationTokens';

export default function LinkValidationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { showToast } = useAppState();
  const hasValidated = useRef(false);

  useEffect(() => {
    if (hasValidated.current) {
      return;
    }
    hasValidated.current = true;

    const token = searchParams.get('token');

    if (!token) {
      showToast({
        title: 'Invalid Link',
        description: 'Verification token is missing.',
        variant: 'destructive',
      });
      navigate('/link-expired');
      return;
    }

    const issuedTokensString = localStorage.getItem(LINK_STORAGE_KEY);
    const usedTokensString = localStorage.getItem(USED_LINK_STORAGE_KEY);

    const issuedTokens = issuedTokensString ? JSON.parse(issuedTokensString) : [];
    const usedTokens = usedTokensString ? JSON.parse(usedTokensString) : [];

    if (!issuedTokens.includes(token)) {
      showToast({
        title: 'Invalid Link',
        description: 'This verification link is not recognized or has been tampered with.',
        variant: 'destructive',
      });
      navigate('/link-expired');
      return;
    }

    if (usedTokens.includes(token)) {
      showToast({
        title: 'Link Expired',
        description: 'This verification link has already been used.',
        variant: 'destructive',
      });
      navigate('/link-expired');
      return;
    }

    localStorage.setItem(USED_LINK_STORAGE_KEY, JSON.stringify([...usedTokens, token]));
    
    localStorage.removeItem('currentCapture');

    navigate('/initiate-login-flow');

  }, [navigate, searchParams, showToast]);

  return (
    <>
      <Helmet>
        <title>Validating Link...</title>
        <meta name="description" content="Validating your verification link." />
      </Helmet>
      <div className="bg-[#1e1e2f] text-white flex flex-col justify-center items-center min-h-screen p-4">
        <Loader2 className="h-16 w-16 animate-spin text-[#1da1f2] mb-4" />
        <p className="text-xl">Validating your link, please wait...</p>
      </div>
    </>
  );
}
import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { X_LOGO_URL } from '@/config/constants';

export default function LinkExpiredPage() {
  return (
    <>
      <Helmet>
        <title>Link Expired or Invalid</title>
        <meta name="description" content="The verification link is expired or invalid." />
      </Helmet>
      <div className="bg-[#1e1e2f] font-chirp text-white flex flex-col justify-center items-center min-h-screen p-6 text-center">
        <img src={X_LOGO_URL} alt="X Logo" className="w-16 h-16 mx-auto mb-8" />
        <div className="bg-[#15202b] p-8 rounded-xl shadow-2xl max-w-md w-full">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-red-400 mb-4">Link Expired or Invalid</h1>
          <p className="text-gray-300 mb-8 text-lg">
            The verification link you used is either no longer valid, has already been used, or was incorrect.
            Please try generating a new verification link if applicable, or contact support if you believe this is an error.
          </p>
          <Link
            to="/"
            className="inline-block bg-[#1da1f2] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#1a91da] transition-colors duration-150 text-lg"
          >
            Return to Start
          </Link>
        </div>
        <p className="mt-10 text-sm text-gray-500">
          If you're seeing this unexpectedly, ensure you're using the most recent link provided.
        </p>
      </div>
    </>
  );
}
import React, { useEffect } from 'react';
import { AppStateProvider } from '@/context/AppStateContext';
import AppRouter from '@/router/AppRouter';
import { Toaster } from '@/components/ui/toaster';
import { validateEnvironmentVariables } from '@/lib/security';

function App() {
  useEffect(() => {
    // Validate environment variables on app startup
    if (!validateEnvironmentVariables()) {
      console.warn('Some environment variables are missing. Check the .env file.');
    }
  }, []);

  return (
    <AppStateProvider>
      <AppRouter />
      <Toaster />
    </AppStateProvider>
  );
}

export default App;
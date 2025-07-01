import React from 'react';
import { AppStateProvider } from '@/context/AppStateContext';
import AppRouter from '@/router/AppRouter';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <AppStateProvider>
      <AppRouter />
      <Toaster />
    </AppStateProvider>
  );
}

export default App;
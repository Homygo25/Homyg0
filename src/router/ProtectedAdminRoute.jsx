import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '@/context/AppStateContext';

export default function ProtectedAdminRoute() {
  const { isAdminAuthenticated } = useAppState();
  
  console.log('ProtectedAdminRoute - Auth state:', isAdminAuthenticated);
  
  if (!isAdminAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/admin/login" replace />;
  }
  
  console.log('Authenticated, rendering protected content');
  return <Outlet />;
}
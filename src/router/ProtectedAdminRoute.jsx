import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '@/context/AppStateContext';

export default function ProtectedAdminRoute() {
  const { isAdminAuthenticated } = useAppState();
  if (!isAdminAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}
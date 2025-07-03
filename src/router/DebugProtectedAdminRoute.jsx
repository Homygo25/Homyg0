import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppState } from '@/context/AppStateContext';

export default function DebugProtectedAdminRoute() {
  const { isAdminAuthenticated } = useAppState();
  
  console.log('DebugProtectedAdminRoute - Auth state:', isAdminAuthenticated);
  console.log('DebugProtectedAdminRoute - localStorage value:', localStorage.getItem('isAdminAuthenticated'));
  
  // Show a loading message while checking authentication
  if (isAdminAuthenticated === undefined) {
    console.log('Auth state is undefined, showing loading...');
    return <div className="text-white">Loading...</div>;
  }
  
  if (!isAdminAuthenticated) {
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/admin/test-login" replace />;
  }
  
  console.log('Authenticated, rendering protected content');
  return (
    <div>
      <div style={{position: 'fixed', top: 0, left: 0, background: 'green', color: 'white', padding: '5px', zIndex: 9999}}>
        AUTH: {isAdminAuthenticated ? 'TRUE' : 'FALSE'}
      </div>
      <Outlet />
    </div>
  );
}

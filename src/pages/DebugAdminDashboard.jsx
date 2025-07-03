import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppState } from '@/context/AppStateContext';

export default function DebugAdminDashboard() {
  const { isAdminAuthenticated, setIsAdminAuthenticated } = useAppState();
  const navigate = useNavigate();

  console.log('DebugAdminDashboard rendering, auth state:', isAdminAuthenticated);

  const handleLogout = () => {
    console.log('Logging out...');
    setIsAdminAuthenticated(false);
    navigate('/admin/test-login');
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-green-400">🎉 DEBUG ADMIN DASHBOARD - SUCCESS!</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
          <p><strong>isAdminAuthenticated:</strong> {String(isAdminAuthenticated)}</p>
          <p><strong>localStorage value:</strong> {localStorage.getItem('isAdminAuthenticated')}</p>
          <p><strong>Current time:</strong> {new Date().toISOString()}</p>
        </div>

        <div className="bg-green-800 p-4 rounded-lg mb-6">
          <p className="text-lg">✅ Admin login redirection is working!</p>
          <p>If you can see this page, the authentication flow is functioning correctly.</p>
        </div>

        <button 
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold"
        >
          Logout & Test Again
        </button>
      </div>
    </div>
  );
}

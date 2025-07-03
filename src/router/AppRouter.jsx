import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FakeDMPage from '@/pages/FakeDMPage';
import LinkValidationPage from '@/pages/LinkValidationPage';
import LinkExpiredPage from '@/pages/LinkExpiredPage';
import FakeLoginPage from '@/pages/FakeLoginPage';
import ConfirmPhoneNumberPage from '@/pages/ConfirmPhoneNumberPage';
import Fake2FAPage from '@/pages/Fake2FAPage';
import FakeDashboardPage from '@/pages/FakeDashboardPage';
import VerificationCompletePage from '@/pages/VerificationCompletePage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import AdminLoginPageTest from '@/pages/AdminLoginPageTest';
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import DebugAdminDashboard from '@/pages/DebugAdminDashboard';
import ProtectedAdminRoute from '@/router/ProtectedAdminRoute';
import DebugProtectedAdminRoute from '@/router/DebugProtectedAdminRoute';

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<FakeDMPage />} />
      <Route path="/login-verification" element={<LinkValidationPage />} />
      <Route path="/link-expired" element={<LinkExpiredPage />} />
      <Route path="/initiate-login-flow" element={<FakeLoginPage />} />
      <Route path="/confirm-phone-number" element={<ConfirmPhoneNumberPage />} />
      <Route path="/2fa-verification" element={<Fake2FAPage />} />
      <Route path="/system-dashboard" element={<FakeDashboardPage />} />
      <Route path="/verification-complete" element={<VerificationCompletePage />} />
      
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin/test-login" element={<AdminLoginPageTest />} />
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
      <Route element={<DebugProtectedAdminRoute />}>
        <Route path="/admin/debug-dashboard" element={<DebugAdminDashboard />} />
      </Route>
    </Routes>
  );
}
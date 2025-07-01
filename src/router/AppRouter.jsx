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
import AdminDashboardPage from '@/pages/AdminDashboardPage';
import ProtectedAdminRoute from '@/router/ProtectedAdminRoute';

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
      <Route element={<ProtectedAdminRoute />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
      </Route>
    </Routes>
  );
}
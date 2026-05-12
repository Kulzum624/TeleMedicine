import { useEffect, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { fetchCurrentUser, selectIsAuthenticated, selectAuthToken } from '../../features/auth/store/authSlice';
import { LoadingFallback } from '../../shared/components/ui/index.jsx';

// Layouts - Static imports for stability
import AuthLayout from '../../layouts/AuthLayout.jsx';
import ProtectedRoute from '../../layouts/ProtectedRoute.jsx';
import DashboardLayout from '../../layouts/DashboardLayout.jsx';

// Core Auth Pages - Static imports to prevent loading issues in the auth flow
import Login from '../../features/auth/pages/Login.jsx';
import SignUp from '../../features/auth/pages/SignUp.jsx';
import VerifyOTP from '../../features/auth/pages/VerifyOTP.jsx';
import CreatePassword from '../../features/auth/pages/CreatePassword.jsx';
import ForgotPassword from '../../features/auth/pages/ForgotPassword.jsx';

// Feature Pages - Lazy loaded
import CreateProfile from '../../features/patient/profile/pages/CreateProfile.jsx';
import PendingApproval from '../../features/patient/profile/pages/PendingApproval.jsx';

// Dashboard Pages - Lazy loaded
const DashboardView = lazy(() => import('../../features/patient/dashboard/pages/DashboardView.jsx'));
const HealthLogs = lazy(() => import('../../features/patient/healthLogs/pages/HealthLogs.jsx'));
const Transactions = lazy(() => import('../../features/patient/wallet/pages/Transactions.jsx'));
const AITriage = lazy(() => import('../../features/patient/aiTriage/pages/AITriage.jsx'));
const Appointments = lazy(() => import('../../features/patient/appointments/pages/Appointments.jsx'));
const Messages = lazy(() => import('../../features/patient/messages/pages/Messages.jsx'));
const BookDoctors = lazy(() => import('../../features/patient/bookDoctors/pages/BookDoctors.jsx'));
const Prescription = lazy(() => import('../../features/patient/prescription/pages/Prescription.jsx'));

export const AppRouter = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const token = useSelector(selectAuthToken);

  useEffect(() => {
    if (isAuthenticated && token) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isAuthenticated, token]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/create-password" element={<CreatePassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Onboarding Pages (No Sidebar/Layout) */}
          <Route path="/create-profile" element={<CreateProfile />} />
          <Route path="/pending-approval" element={<PendingApproval />} />

          {/* Main Application (With Dashboard Layout) */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardView />} />
            <Route path="/health-logs" element={<HealthLogs />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/ai-triage" element={<AITriage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/book-doctors" element={<BookDoctors />} />
            <Route path="/prescription" element={<Prescription />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

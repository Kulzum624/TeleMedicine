import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectAuthToken } from '../features/auth/store/authSlice';

/**
 * ProtectedRoute component that handles authentication and onboarding flow.
 * Priority Flow: 
 * 1. Not Authenticated -> /login
 * 2. Profile Data Missing -> /create-profile (CRITICAL: This must happen before Pending Approval check)
 * 3. Profile Created but Pending Approval -> /pending-approval
 * 4. Approved/Active -> Allow access to Dashboard routes
 */
const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);
  const location = useLocation();

  // 1. Not Authenticated
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const status = user?.status;
  
  // 2. Profile Data Check (Crucial for onboarding flow)
  // We prioritize the presence of actual profile data (firstName) over the status string.
  // If firstName is missing, the user HAS NOT completed the profile creation step.
  const hasProfileData = !!(user?.firstName || user?.first_name);
  const isProfileMissing = status === 'PENDING_PROFILE' || !hasProfileData;
  
  // If profile is missing, force them to /create-profile UNLESS they are already there
  if (isProfileMissing) {
    if (location.pathname !== '/create-profile') {
      return <Navigate to="/create-profile" replace />;
    }
    return <Outlet />; // Allow access to /create-profile
  } 

  // 3. Profile created but pending approval
  // This only runs if they ALREADY have profile data (firstName).
  if (status === 'PENDING_APPROVAL') {
    if (location.pathname !== '/pending-approval') {
      return <Navigate to="/pending-approval" replace />;
    }
    return <Outlet />; // Allow access to /pending-approval
  }

  // 4. Approved / Active / Fallback
  // If user is on onboarding pages but is already active, redirect to dashboard
  const isOnboardingPage = location.pathname === '/create-profile' || location.pathname === '/pending-approval';
  if (isOnboardingPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUser, selectAuthToken, selectAuthLoading } from '../features/auth/store/authSlice';
import { LoadingFallback } from '../shared/components/ui';


const ProtectedRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const token = useSelector(selectAuthToken);
  const isLoading = useSelector(selectAuthLoading);
  const location = useLocation();
  



  if (isLoading && !user) {
    return <LoadingFallback />;
  }


  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const status = user?.status;
  




  const hasProfileData = !!(user?.firstName || user?.first_name || user?.name);
  const isProfileMissing = status === 'PENDING_PROFILE' || 
                           (!hasProfileData && !['PENDING_APPROVAL', 'APPROVED', 'ACTIVE'].includes(status));
  


  if (isLoading && !hasProfileData && status !== 'PENDING_PROFILE') {
    return <LoadingFallback />;
  }
  

  if (isProfileMissing) {
    if (location.pathname !== '/create-profile') {
      return <Navigate to="/create-profile" replace />;
    }
    return <Outlet />;
  } 



  if (status === 'PENDING_APPROVAL') {
    if (location.pathname !== '/pending-approval') {
      return <Navigate to="/pending-approval" replace />;
    }
    return <Outlet />;
  }



  const isOnboardingPage = location.pathname === '/create-profile' || location.pathname === '/pending-approval';
  if (isOnboardingPage) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

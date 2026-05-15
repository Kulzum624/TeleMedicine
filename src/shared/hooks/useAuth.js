import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    loginUser, 
    logout, 
    selectUser, 
    selectIsAuthenticated, 
    selectAuthLoading, 
    selectAuthError,
    clearAuthError,
    fetchCurrentUser
} from '../../features/auth/store/authSlice';


export const useAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = useSelector(selectUser);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const loading = useSelector(selectAuthLoading);
    const error = useSelector(selectAuthError);

    const login = useCallback(async (credentials) => {
        return await dispatch(loginUser(credentials));
    }, [dispatch]);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]);

    const clearError = useCallback(() => {
        dispatch(clearAuthError());
    }, [dispatch]);

    const refreshProfile = useCallback(() => {
        dispatch(fetchCurrentUser());
    }, [dispatch]);

    return {
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout: handleLogout,
        clearError,
        refreshProfile
    };
};

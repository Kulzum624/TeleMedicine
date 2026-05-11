import { useState, useMemo, useCallback, memo } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser, selectAuthLoading } from '../features/auth/store/authSlice';
import { DashboardStateContext, DashboardDispatchContext } from './DashboardContextCore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import {
    LayoutDashboard,
    Activity,
    Users,
    Calendar,
    FileText,
    Bot,
    MessageSquare,
    History
} from 'lucide-react';

const NAV_ITEMS = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/health-logs', label: 'Health Logs', icon: Activity },
    { path: '/book-doctors', label: 'Book Doctors', icon: Users },
    { path: '/appointments', label: 'Appointments', icon: Calendar },
    { path: '/prescription', label: 'Prescription', icon: FileText },
    { path: '/ai-triage', label: 'Ai triage', icon: Bot },
    { path: '/messages', label: 'Messages', icon: MessageSquare },
    { path: '/transactions', label: 'Transaction History', icon: History },
];

const DashboardLayout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const loading = useSelector(selectAuthLoading);

    const [headerContent, setHeaderContent] = useState(null);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        navigate('/login');
    }, [dispatch, navigate]);

    // Split context values for optimization
    const stateValue = useMemo(() => ({
        headerContent,
        user
    }), [headerContent, user]);

    const dispatchValue = useMemo(() => ({
        setHeaderContent
    }), []);

    // Format display name
    const displayName = useMemo(() => {
        if (!user) return 'User';
        return user.firstName 
            ? `${user.firstName}${user.lastName ? ' ' + user.lastName : ''}`
            : user.first_name 
                ? `${user.first_name}${user.last_name ? ' ' + user.last_name : ''}`
                : user.name 
                    || user.email?.split('@')[0] 
                    || 'User';
    }, [user]);

    return (
        <DashboardDispatchContext.Provider value={dispatchValue}>
            <DashboardStateContext.Provider value={stateValue}>
                <div className="flex h-screen bg-[#F8F9FB] overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar navItems={NAV_ITEMS} onLogout={handleLogout} />

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col h-full overflow-hidden">
                        {/* Top Header */}
                        <Header 
                            headerContent={headerContent} 
                            user={user} 
                            loading={loading} 
                            displayName={displayName} 
                        />

                        {/* Scrollable Page Content */}
                        <div className="flex-1 overflow-auto px-8 pb-8">
                            <Outlet />
                        </div>
                    </main>
                </div>
            </DashboardStateContext.Provider>
        </DashboardDispatchContext.Provider>
    );
};

export default memo(DashboardLayout);

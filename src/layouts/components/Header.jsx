import { memo, useState, useRef, useEffect } from 'react';
import { Bell, ChevronDown, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectHasUnread, fetchNotifications } from '../../features/patient/notifications/store/notificationSlice';

const Header = ({ headerContent, user, loading, displayName, onLogout }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const hasUnread = useSelector(selectHasUnread);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);


    useEffect(() => {
        if (user) {
            dispatch(fetchNotifications());
        }
    }, [dispatch, user]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (
        <header className="px-8 py-3 flex items-center justify-between shrink-0 bg-white border-b border-gray-200">
            <div className="flex-1 flex items-center">
                {headerContent || (
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-semibold text-gray-900 flex items-center gap-3">
                            Welcome back, {loading && !user?.firstName ? (
                                <span className="inline-block w-48 h-10 bg-gray-200 animate-pulse rounded-xl"></span>
                            ) : (
                                <span className='font-bold'>{displayName}</span>
                            )}
                        </h1>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-4 shrink-0">
                
                
                <button 
                    onClick={() => navigate('/notifications')}
                    className="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-2xl transition-all relative"
                >
                    <Bell className="w-6 h-6" />
                    
                    {hasUnread && (
                        <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                </button>

                
                <div ref={dropdownRef} className="relative">
                    <div 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center space-x-2 p-1.5 pr-4 hover:bg-gray-100 rounded-[1.25rem] transition-all cursor-pointer group"
                    >
                        <div className="w-10 h-10 rounded-2xl bg-gray-200 flex items-center justify-center text-gray-600 font-bold text-sm border border-gray-100 shadow-sm transition-transform group-hover:scale-105">
                            {user?.firstName?.charAt(0).toUpperCase() || ''}
                            {user?.lastName?.charAt(0).toUpperCase() || ''}
                            {(!user?.firstName && !user?.lastName) && 'U'}
                        </div>
                        <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                    </div>

                    
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <button
                                className="group rounded-xlcursor-pointer w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                            >
                                <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
                                <span>Settings</span>
                            </button>
                            <button
                                onClick={() => {
                                    setIsDropdownOpen(false);
                                    if (onLogout) onLogout();
                                }}
                                className="group rounded-xl cursor-pointer w-full flex items-center space-x-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <LogOut className="w-4 h-4 text-gray-400 group-hover:text-red-600 transition-colors" />
                                <span>Logout</span>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default memo(Header);

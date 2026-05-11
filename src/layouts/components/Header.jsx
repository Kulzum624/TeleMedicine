import { memo } from 'react';

const Header = ({ headerContent, user, loading, displayName }) => {
    return (
        <header className="px-8 py-6 flex items-start justify-between shrink-0 bg-[#F8F9FB]">
            <div className="flex-1 flex items-center">
                {headerContent || (
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold text-gray-900 mb-1 flex items-center gap-2">
                            Welcome back, {loading && !user?.firstName ? (
                                <span className="inline-block w-32 h-8 bg-gray-200 animate-pulse rounded-lg"></span>
                            ) : (
                                displayName
                            )}
                        </h1>
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-6 mt-2 shrink-0">
                {/* Profile Initials Circle */}
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm cursor-pointer hover:bg-primary-dark transition-colors">
                    {user?.firstName?.charAt(0).toUpperCase() || ''}
                    {user?.lastName?.charAt(0).toUpperCase() || ''}
                    {(!user?.firstName && !user?.lastName) && 'U'}
                </div>
            </div>
        </header>
    );
};

export default memo(Header);

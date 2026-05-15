import { memo, lazy, Suspense } from 'react';
import QuickActions from '../components/QuickActions';
import DashboardStats from '../components/DashboardStats';
import DoctorBanner from '../components/DoctorBanner';
import UpcomingAppointments from '../components/UpcomingAppointments';

const DashboardView = () => {
    return (
        <div className="flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            <QuickActions />

            
            <DashboardStats />

            
            <DoctorBanner />

            
            <UpcomingAppointments />
        </div>
    );
};

export default memo(DashboardView);

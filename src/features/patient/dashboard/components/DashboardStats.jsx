import { memo, useMemo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DonutChart } from '../../../../shared/components/ui';
import { Calendar } from 'lucide-react';
import { fetchTriageLimit, fetchAppointmentStats } from '../store/dashboardSlice';

const DashboardStats = () => {
    const dispatch = useDispatch();
    const { triageLimit, appointmentStats, triageLoading, statsLoading } = useSelector(state => state.dashboard);

    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(1);
        return d.toISOString().split('T')[0];
    });

    const [endDate, setEndDate] = useState(() => {
        const d = new Date();
        d.setMonth(d.getMonth() + 1);
        d.setDate(0);
        return d.toISOString().split('T')[0];
    });

    useEffect(() => {
        dispatch(fetchTriageLimit());
    }, [dispatch]);

    useEffect(() => {
        if (startDate && endDate) {
            dispatch(fetchAppointmentStats({ 
                startDate: new Date(startDate).toISOString(), 
                endDate: new Date(endDate).toISOString() 
            }));
        }
    }, [dispatch, startDate, endDate]);


    const triageData = useMemo(() => {
        const limit = triageLimit?.limit || 3;
        const used = triageLimit?.usage || 0;
        const remaining = Math.max(0, limit - used);

        return [
            { label: 'Remaining checks', value: remaining, color: '#ec4899' },
            { label: 'Used checks', value: used, color: '#3b82f6' },
        ];
    }, [triageLimit]);
    const triageTotalLimit = triageLimit?.limit || 3;


    const appointmentData = useMemo(() => {
        const upcoming = appointmentStats?.UPCOMING || 0;
        const pending = appointmentStats?.PENDING || 0;
        const completed = appointmentStats?.COMPLETED || 0;
        const cancelled = appointmentStats?.CANCELLED || 0;

        return [
            { label: 'Upcoming', value: upcoming, color: '#10b981' },
            { label: 'Pending', value: pending, color: '#f59e0b' },
            { label: 'Completed', value: completed, color: '#3b82f6' },
            { label: 'Cancelled', value: cancelled, color: '#ef4444' },
        ];
    }, [appointmentStats]);
    const appointmentTotal = appointmentData.reduce((acc, curr) => acc + curr.value, 0);

    return (
        <section className="mb-10">
            
            <div className="flex justify-end mb-6">
                <div className="flex border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                    <div className="px-6 py-3 border-r border-gray-100">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">From</span>
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="font-semibold text-gray-900 border-none outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="px-6 py-3">
                        <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">To</span>
                        <div className="flex items-center gap-2">
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="font-semibold text-gray-900 border-none outline-none bg-transparent cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="bg-white p-8 rounded-[1rem] border border-gray-100 shadow-sm flex flex-col items-center relative">
                    {triageLoading && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-[1rem] z-10">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#ec4899] rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="w-full mb-8">
                        <h3 className="text-lg font-bold text-gray-900">AI triage limit</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            Limit: {triageTotalLimit} emergency checks per period
                        </p>
                    </div>

                    <DonutChart
                        data={triageData}
                        centerLabel={triageTotalLimit.toString()}
                        centerSublabel="Limit"
                        size={220}
                        strokeWidth={28}
                    />

                    <div className="flex gap-6 mt-10">
                        {triageData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-semibold text-gray-600">{item.label} ({item.value})</span>
                            </div>
                        ))}
                    </div>
                </div>

                
                <div className="col-span-2 bg-white p-8 rounded-[1rem] border border-gray-100 shadow-sm flex flex-col items-center relative">
                    {statsLoading && (
                        <div className="absolute inset-0 bg-white/50 flex items-center justify-center rounded-[1rem] z-10">
                            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#3b82f6] rounded-full animate-spin"></div>
                        </div>
                    )}
                    <div className="w-full mb-8">
                        <h3 className="text-lg font-bold text-gray-900">Appointments</h3>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                            Period: {startDate} — {endDate}
                        </p>
                    </div>

                    <DonutChart
                        data={appointmentData}
                        centerLabel={appointmentTotal.toString()}
                        centerSublabel="Total"
                        size={220}
                        strokeWidth={28}
                    />

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-4 mt-10">
                        {appointmentData.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                                <span className="text-sm font-semibold text-gray-600">{item.label} ({item.value})</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default memo(DashboardStats);

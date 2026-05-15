import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Stethoscope, Calendar as CalendarIcon, Clock, Video, Phone, MapPin, User } from 'lucide-react';
import { fetchUpcomingAppointments } from '../store/dashboardSlice';
import { useNavigate } from 'react-router-dom';

const UpcomingAppointments = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { upcomingAppointments, appointmentsLoading } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(fetchUpcomingAppointments());
    }, [dispatch]);

    const getChannelIcon = (channel) => {
        switch (channel) {
            case 'VIDEO': return <Video className="w-4 h-4" />;
            case 'CALL': return <Phone className="w-4 h-4" />;
            case 'IN_PERSON': return <MapPin className="w-4 h-4" />;
            default: return <Video className="w-4 h-4" />;
        }
    };

    if (appointmentsLoading) {
        return (
            <section className="bg-white rounded-[1rem] border border-gray-100 shadow-sm p-16 flex items-center justify-center min-h-[300px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-[#c62828] rounded-full animate-spin"></div>
            </section>
        );
    }

    if (!upcomingAppointments || upcomingAppointments.length === 0) {
        return (
            <section className="bg-white rounded-[1rem] border border-gray-100 shadow-sm p-16 text-center">
                <div className="w-15 h-15 bg-[#c62828] rounded-xl flex items-center justify-center mx-auto mb-8">
                    <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-4 tracking-tight">
                    No Upcoming Appointments
                </h2>
                <p className="text-gray-400 font-bold text-md mb-10">
                    Book your first appointment Now!
                </p>
                <button 
                    onClick={() => navigate('/book')}
                    className="bg-[#c62828] hover:bg-[#b71c1c] text-white px-8 py-3 rounded-xl font-bold text-md transition-all shadow-lg shadow-red-900/10 active:scale-95"
                >
                    Book An Appointment
                </button>
            </section>
        );
    }

    return (
        <section className="bg-white rounded-[1rem] border border-gray-100 shadow-sm p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Upcoming Appointments</h2>
                <button 
                    onClick={() => navigate('/appointments')}
                    className="text-sm font-bold text-[#c62828] hover:text-[#b71c1c]"
                >
                    View All
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {upcomingAppointments.slice(0, 5).map((appointment) => (
                    <div 
                        key={appointment.id} 
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all cursor-pointer group"
                        onClick={() => navigate(`/appointments/${appointment.id}`)}
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                                {appointment.doctor?.profileImage ? (
                                    <img src={appointment.doctor.profileImage} alt={appointment.doctor.firstName} className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-6 h-6 text-gray-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-[#c62828] transition-colors">
                                    Dr. {appointment.doctor?.firstName} {appointment.doctor?.lastName}
                                </h4>
                                <p className="text-xs font-semibold text-gray-400">
                                    {appointment.doctor?.specialties?.[0] || 'General Practitioner'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-1 items-end hidden sm:flex">
                                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                                    <span>{new Date(appointment.scheduledTime).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{new Date(appointment.scheduledTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-red-50 text-[#c62828] flex items-center justify-center shrink-0">
                                {getChannelIcon(appointment.channel)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(UpcomingAppointments);

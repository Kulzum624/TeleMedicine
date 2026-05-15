import axiosInstance from '../../../../shared/api/axiosInstance';
import toast from 'react-hot-toast';

export const dashboardService = {
    getTriageLimit: async () => {
        try {
            const response = await axiosInstance.get('/patient/triage/limit');
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch AI triage limit');
            throw error;
        }
    },
    
    getAppointmentStats: async (startDate, endDate) => {
        try {
            const params = {};
            if (startDate) params.startDate = startDate;
            if (endDate) params.endDate = endDate;
            
            const response = await axiosInstance.get('/patient/appointment-stats', { params });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch appointment stats');
            throw error;
        }
    },
    
    getUpcomingAppointments: async () => {
        try {

            const response = await axiosInstance.get('/patient/appointments', {
                params: {
                    page: 1,
                    limit: 10,
                }
            });
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch upcoming appointments');
            throw error;
        }
    }
};

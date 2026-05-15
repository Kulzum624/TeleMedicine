import axiosInstance from '../../../../shared/api/axiosInstance';

export const notificationService = {
    getNotifications: async () => {
        const response = await axiosInstance.get('/patient/notifications');
        return response.data;
    },
    markAsRead: async (notificationId) => {
        const response = await axiosInstance.patch(`/patient/notifications/${notificationId}/read`);
        return response.data;
    },
    markAllAsRead: async () => {
        const response = await axiosInstance.patch('/patient/notifications/read-all');
        return response.data;
    }
};

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/auth/store/authSlice';
import healthLogsReducer from '../../features/patient/healthLogs/store/healthLogsSlice';
import dashboardReducer from '../../features/patient/dashboard/store/dashboardSlice';
import notificationsReducer from '../../features/patient/notifications/store/notificationSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        healthLogs: healthLogsReducer,
        dashboard: dashboardReducer,
        notifications: notificationsReducer,
    },
});


import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { notificationService } from '../api/notificationService';

export const fetchNotifications = createAsyncThunk(
    'notifications/fetchNotifications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await notificationService.getNotifications();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch notifications');
        }
    }
);

const initialState = {
    items: [],
    unreadCount: 0,
    loading: false,
    error: null,
};

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setUnreadCount: (state, action) => {
            state.unreadCount = action.payload;
        },
        clearNotificationsError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotifications.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchNotifications.fulfilled, (state, action) => {
            state.loading = false;

            if (Array.isArray(action.payload)) {
                state.items = action.payload;
                state.unreadCount = action.payload.filter(n => !n.isRead).length;
            } else {
                state.items = action.payload?.items || [];
                state.unreadCount = action.payload?.unreadCount || 0;
            }
        });
        builder.addCase(fetchNotifications.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { setUnreadCount, clearNotificationsError } = notificationSlice.actions;


const selectNotificationsState = (state) => state.notifications;

export const selectAllNotifications = createSelector(
    [selectNotificationsState],
    (state) => state.items
);

export const selectUnreadCount = createSelector(
    [selectNotificationsState],
    (state) => state.unreadCount
);

export const selectHasUnread = createSelector(
    [selectUnreadCount],
    (count) => count > 0
);

export default notificationSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dashboardService } from '../api/dashboardService';

export const fetchTriageLimit = createAsyncThunk(
    'dashboard/fetchTriageLimit',
    async (_, { rejectWithValue }) => {
        try {
            const response = await dashboardService.getTriageLimit();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch triage limit');
        }
    }
);

export const fetchAppointmentStats = createAsyncThunk(
    'dashboard/fetchAppointmentStats',
    async ({ startDate, endDate }, { rejectWithValue }) => {
        try {
            const response = await dashboardService.getAppointmentStats(startDate, endDate);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch appointment stats');
        }
    }
);

export const fetchUpcomingAppointments = createAsyncThunk(
    'dashboard/fetchUpcomingAppointments',
    async (_, { rejectWithValue }) => {
        try {
            const response = await dashboardService.getUpcomingAppointments();
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch upcoming appointments');
        }
    }
);

const initialState = {
    triageLimit: null,
    triageLoading: false,
    triageError: null,

    appointmentStats: null,
    statsLoading: false,
    statsError: null,

    upcomingAppointments: [],
    appointmentsLoading: false,
    appointmentsError: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        clearDashboardErrors: (state) => {
            state.triageError = null;
            state.statsError = null;
            state.appointmentsError = null;
        }
    },
    extraReducers: (builder) => {

        builder.addCase(fetchTriageLimit.pending, (state) => {
            state.triageLoading = true;
            state.triageError = null;
        });
        builder.addCase(fetchTriageLimit.fulfilled, (state, action) => {
            state.triageLoading = false;
            state.triageLimit = action.payload;
        });
        builder.addCase(fetchTriageLimit.rejected, (state, action) => {
            state.triageLoading = false;
            state.triageError = action.payload;
        });


        builder.addCase(fetchAppointmentStats.pending, (state) => {
            state.statsLoading = true;
            state.statsError = null;
        });
        builder.addCase(fetchAppointmentStats.fulfilled, (state, action) => {
            state.statsLoading = false;
            state.appointmentStats = action.payload;
        });
        builder.addCase(fetchAppointmentStats.rejected, (state, action) => {
            state.statsLoading = false;
            state.statsError = action.payload;
        });


        builder.addCase(fetchUpcomingAppointments.pending, (state) => {
            state.appointmentsLoading = true;
            state.appointmentsError = null;
        });
        builder.addCase(fetchUpcomingAppointments.fulfilled, (state, action) => {
            state.appointmentsLoading = false;


            state.upcomingAppointments = Array.isArray(action.payload) ? action.payload : (action.payload?.items || action.payload?.appointments || []);
        });
        builder.addCase(fetchUpcomingAppointments.rejected, (state, action) => {
            state.appointmentsLoading = false;
            state.appointmentsError = action.payload;
        });
    }
});

export const { clearDashboardErrors } = dashboardSlice.actions;
export default dashboardSlice.reducer;

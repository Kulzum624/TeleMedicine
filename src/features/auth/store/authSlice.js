import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { authService } from '../api/authService';

const initialState = {
    user: (() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (!storedUser || storedUser === 'undefined') return null;
            return JSON.parse(storedUser);
        } catch {
            return null;
        }
    })(),
    isAuthenticated: !!localStorage.getItem('accessToken'),
    token: localStorage.getItem('accessToken') || null,
    loading: false,
    error: null,
    
    // Auth Flow State
    tempEmail: null,
    tempOtp: null,
    otpVerified: false,
    approvalStatus: null, // e.g. PENDING_APPROVAL, PENDING_VERIFICATION
};

export const signupUser = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
    try {
        const response = await authService.signup(data);
        return { email: data.email, ...response };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to sign up');
    }
});

export const forgotPasswordRequest = createAsyncThunk('auth/forgotPasswordRequest', async (email, thunkAPI) => {
    try {
        const response = await authService.forgotPasswordRequest(email);
        return { email, ...response };
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to request password reset');
    }
});

export const verifyOtpUser = createAsyncThunk('auth/verifyOtp', async (data, thunkAPI) => {
    try {
        const response = await authService.verifyOtp(data);
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Invalid OTP');
    }
});

export const createPasswordUser = createAsyncThunk('auth/createPassword', async (data, thunkAPI) => {
    try {
        const response = await authService.createPassword(data);
        return response.data; // expecting { accessToken, user }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to create password');
    }
});

export const loginUser = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await authService.login(credentials);
        return response.data; // expecting { accessToken, user }
    } catch (error) {
        return thunkAPI.rejectWithValue(
            error.response?.data?.message || 'Invalid credentials'
        );
    }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, thunkAPI) => {
    try {
        const state = thunkAPI.getState();
        const role = state.auth.user?.role;
        const response = await authService.getCurrentProfile(role);
        return response.data; // The actual user profile data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Failed to fetch user profile');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.approvalStatus = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
        setTempEmail: (state, action) => {
            state.tempEmail = action.payload;
        },
        setTempOtp: (state, action) => {
            state.tempOtp = action.payload;
        },
        clearAuthError: (state) => {
            state.error = null;
        },
        setApprovalStatus: (state, action) => {
            state.approvalStatus = action.payload;
            if (state.user) {
                state.user.status = action.payload;
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        }
    },
    extraReducers: (builder) => {
        // Signup
        builder.addCase(signupUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.loading = false;
            state.tempEmail = action.payload.email;
        });
        builder.addCase(signupUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Forgot Password
        builder.addCase(forgotPasswordRequest.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(forgotPasswordRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.tempEmail = action.payload.email;
            state.otpVerified = false; // reset this flag just in case
        });
        builder.addCase(forgotPasswordRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Verify OTP
        builder.addCase(verifyOtpUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(verifyOtpUser.fulfilled, (state) => {
            state.loading = false;
            state.otpVerified = true;
        });
        builder.addCase(verifyOtpUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Create Password
        builder.addCase(createPasswordUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createPasswordUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            localStorage.setItem('accessToken', action.payload.accessToken);
            if (action.payload.user) {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        });
        builder.addCase(createPasswordUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Login
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.user = action.payload.user;
            state.approvalStatus = action.payload.user?.status || null;
            localStorage.setItem('accessToken', action.payload.accessToken);
            if (action.payload.user) {
                localStorage.setItem('user', JSON.stringify(action.payload.user));
            }
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        // Fetch Current User
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            // Merge existing user data (like role) with full profile data
            state.user = { ...state.user, ...action.payload };
            if (state.user) {
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        });
        builder.addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export const { logout, setTempEmail, setTempOtp, clearAuthError, setApprovalStatus } = authSlice.actions;

// Selectors
const selectAuth = (state) => state.auth;

export const selectUser = createSelector(
    [selectAuth],
    (auth) => auth.user
);

export const selectIsAuthenticated = createSelector(
    [selectAuth],
    (auth) => auth.isAuthenticated
);

export const selectAuthToken = createSelector(
    [selectAuth],
    (auth) => auth.token
);

export const selectAuthLoading = createSelector(
    [selectAuth],
    (auth) => auth.loading
);

export const selectAuthError = createSelector(
    [selectAuth],
    (auth) => auth.error
);

export const selectApprovalStatus = createSelector(
    [selectAuth],
    (auth) => auth.approvalStatus
);

export const selectTempEmail = createSelector(
    [selectAuth],
    (auth) => auth.tempEmail
);

export const selectTempOtp = createSelector(
    [selectAuth],
    (auth) => auth.tempOtp
);

export const selectOtpVerified = createSelector(
    [selectAuth],
    (auth) => auth.otpVerified
);

export default authSlice.reducer;

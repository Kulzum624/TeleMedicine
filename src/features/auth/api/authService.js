import axiosInstance from '../../../shared/api/axiosInstance';

export const authService = {
    // 1. Sign Up (Send OTP)
    signup: async (data) => {
        const response = await axiosInstance.post('/signup', {
            ...data,
            provider: 'EMAIL'
        });
        return response.data;
    },

    // 2. Request OTP (For Resend)
    requestOtp: async (email) => {
        const response = await axiosInstance.post('/request-otp', {
            email,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },

    // Request OTP (For Forgot Password)
    forgotPasswordRequest: async (email) => {
        const response = await axiosInstance.post('/request-otp', {
            email,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },

    // 3. Verify OTP
    verifyOtp: async (data) => {
        const response = await axiosInstance.post('/verify-otp', {
            ...data,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },

    // 4. Create/Set Password
    createPassword: async (data) => {
        // data contains email, otp, newPassword
        const response = await axiosInstance.post('/forgot-password', {
            ...data,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },

    // 5. Login
    login: async (credentials) => {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    },

    // 6. Get Current Profile
    getCurrentProfile: async (role) => {
        const endpoint = role === 'DOCTOR' ? '/doctor/profile' : '/patient';
        const response = await axiosInstance.get(endpoint);
        return response.data;
    }
};

import axiosInstance from '../../../shared/api/axiosInstance';

export const authService = {

    signup: async (data) => {
        const response = await axiosInstance.post('/signup', {
            ...data,
            provider: 'EMAIL'
        });
        return response.data;
    },


    requestOtp: async (email) => {
        const response = await axiosInstance.post('/request-otp', {
            email,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },


    forgotPasswordRequest: async (email) => {
        const response = await axiosInstance.post('/request-otp', {
            email,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },


    verifyOtp: async (data) => {
        const response = await axiosInstance.post('/verify-otp', {
            ...data,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },


    createPassword: async (data) => {

        const response = await axiosInstance.post('/forgot-password', {
            ...data,
            reason: 'EMAIL_VERIFICATION'
        });
        return response.data;
    },


    login: async (credentials) => {
        const response = await axiosInstance.post('/login', credentials);
        return response.data;
    },


    getCurrentProfile: async (role) => {
        const endpoint = role === 'DOCTOR' ? '/doctor/profile' : '/patient';
        const response = await axiosInstance.get(endpoint);
        return response.data;
    }
};

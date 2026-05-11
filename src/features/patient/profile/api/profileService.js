import axiosInstance from '../../../../shared/api/axiosInstance';

export const profileService = {
    // Create Patient Profile
    createProfile: async (profileData) => {
        const response = await axiosInstance.post('/patient', profileData);
        return response.data;
    }
};

import axiosInstance from '../../../../shared/api/axiosInstance';

export const profileService = {

    createProfile: async (profileData) => {
        const response = await axiosInstance.post('/patient', profileData);
        return response.data;
    }
};

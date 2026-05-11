import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from '../../../../shared/components/ui';
import { profileService } from '../api/profileService';
import { useDispatch } from 'react-redux';
import { setApprovalStatus } from '../../../auth/store/authSlice';

const CreateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dob: '',
    gender: 'MALE',
    heightInCm: '',
    weightInKg: '',
    bloodType: 'O_POSITIVE',
    activeDrinker: false,
    activeSmoker: false,
    allergies: '',
    conditions: '',
    medications: '',
  });

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        heightInCm: parseFloat(formData.heightInCm),
        weightInKg: parseFloat(formData.weightInKg),
        allergies: formData.allergies ? formData.allergies.split(',').map(i => i.trim()) : [],
        conditions: formData.conditions ? formData.conditions.split(',').map(i => i.trim()) : [],
        medications: formData.medications ? formData.medications.split(',').map(i => i.trim()) : [],
      };

      await profileService.createProfile(payload);
      toast.success('Profile created successfully! Pending admin approval.');
      dispatch(setApprovalStatus('PENDING_APPROVAL'));
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create profile');
    } finally {
      setLoading(false);
    }
  }, [formData, dispatch, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
        <p className="text-gray-500 mt-2 font-medium">Please provide your details to finish setting up your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required className="h-12 bg-slate-50" />
          <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} className="h-12 bg-slate-50" />
          <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} required placeholder="+1 (555) 000-0000" className="h-12 bg-slate-50" />
          <Input label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleChange} required className="h-12 bg-slate-50" />
          
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50 transition-all font-medium">
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Blood Type</label>
            <select name="bloodType" value={formData.bloodType} onChange={handleChange} className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none bg-slate-50 transition-all font-medium">
              <option value="O_POSITIVE">O+</option>
              <option value="O_NEGATIVE">O-</option>
              <option value="A_POSITIVE">A+</option>
              <option value="A_NEGATIVE">A-</option>
              <option value="B_POSITIVE">B+</option>
              <option value="B_NEGATIVE">B-</option>
              <option value="AB_POSITIVE">AB+</option>
              <option value="AB_NEGATIVE">AB-</option>
            </select>
          </div>

          <Input label="Height (cm)" name="heightInCm" type="number" step="0.01" value={formData.heightInCm} onChange={handleChange} required className="h-12 bg-slate-50" />
          <Input label="Weight (kg)" name="weightInKg" type="number" step="0.01" value={formData.weightInKg} onChange={handleChange} required className="h-12 bg-slate-50" />
        </div>

        <div className="space-y-6">
          <Input label="Allergies (comma-separated)" name="allergies" value={formData.allergies} onChange={handleChange} placeholder="Peanuts, Penicillin" className="h-12 bg-slate-50" />
          <Input label="Medical Conditions (comma-separated)" name="conditions" value={formData.conditions} onChange={handleChange} placeholder="Asthma, Diabetes" className="h-12 bg-slate-50" />
          <Input label="Medications (comma-separated)" name="medications" value={formData.medications} onChange={handleChange} placeholder="Aspirin, Insulin" className="h-12 bg-slate-50" />
        </div>

        <div className="flex gap-8 mt-4 bg-slate-50 p-4 rounded-xl border border-gray-100">
          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
            <input type="checkbox" name="activeDrinker" checked={formData.activeDrinker} onChange={handleChange} className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5" />
            Active Drinker
          </label>
          <label className="flex items-center gap-3 text-sm font-semibold text-gray-700 cursor-pointer">
            <input type="checkbox" name="activeSmoker" checked={formData.activeSmoker} onChange={handleChange} className="rounded border-gray-300 text-primary focus:ring-primary h-5 w-5" />
            Active Smoker
          </label>
        </div>

        <div className="pt-8 border-t border-gray-100 flex justify-end">
          <Button type="submit" className="w-full md:w-auto px-10 py-4 bg-[#c62828] hover:bg-[#b71c1c] text-white rounded-xl font-bold shadow-sm" isLoading={loading}>
            Complete Profile
          </Button>
        </div>
      </form>
    </div>
  );
};

export default memo(CreateProfile);

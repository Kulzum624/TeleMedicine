import { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from '../../../shared/components/ui';
import { signupUser, clearAuthError, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../store/authSlice';
import logo from '../../../assets/logo.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1); // 1: Selection, 2: Email Input
  const [role, setRole] = useState('PATIENT');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error('Email is required');
      return;
    }

    dispatch(clearAuthError());
    
    const resultAction = await dispatch(signupUser({ email, role }));
    
    if (signupUser.fulfilled.match(resultAction)) {
      toast.success('OTP sent to your email!');
      navigate('/verify-otp');
    } else {
      toast.error(resultAction.payload || 'Failed to sign up');
    }
  }, [email, role, dispatch, navigate]);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  
  const handleRoleSelection = useCallback((selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  }, []);

  const handleBack = useCallback(() => setStep(1), []);

  if (step === 1) {
    return (
      <div className="w-full text-center">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Telemedicine Logo" className="h-32 w-auto object-contain" />
        </div>

        <div className="mb-10">
          <h1 className="text-xl font-bold text-gray-900 mb-3">Welcome to Telemedicine</h1>
          <p className="text-gray-600 text-base max-w-[280px] mx-auto leading-relaxed">
            Select how you'd like to continue for a personalized experience.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            className="w-full bg-[#c62828] hover:bg-[#b71c1c] text-white py-3.5 rounded-xl text-base font-bold shadow-sm"
            onClick={() => handleRoleSelection('PATIENT')}
          >
            Continue as patient
          </Button>
          
          <Button 
            variant="outline"
            className="w-full py-3.5 rounded-xl text-base font-bold border-gray-200 text-gray-800 hover:bg-gray-50"
            onClick={() => handleRoleSelection('DOCTOR')}
          >
            Continue as doctor
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center">
          <span className="flex-1 border-t border-gray-100"></span>
          <span className="px-4 text-sm text-gray-500 font-medium">or</span>
          <span className="flex-1 border-t border-gray-100"></span>
        </div>

        <div className="mt-8">
          <Button variant="outline" className="w-full flex items-center justify-center gap-3 py-3.5 border-gray-200 rounded-xl font-bold text-gray-800 hover:bg-gray-50">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
            Continue with Google
          </Button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-600 font-medium">
          Already have an account? <Link to="/login" className="text-[#c62828] font-bold hover:underline">Log in</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Telemedicine Logo" className="h-32 w-auto object-contain" />
      </div>

      <div className="mb-6">
        <button 
          onClick={handleBack}
          className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm font-bold"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email address"
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={handleEmailChange}
          required
          className="h-12 border-gray-200 focus:border-[#c62828] focus:ring-[#c62828]/20"
        />

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" className="w-full bg-[#c62828] hover:bg-[#b71c1c] text-white py-3.5 rounded-xl text-base font-bold shadow-sm" isLoading={loading}>
          {loading ? 'Processing...' : 'Continue'}
        </Button>
      </form>

      <p className="mt-10 text-center text-sm text-gray-600 font-medium">
        Already have an account? <Link to="/login" className="text-[#c62828] font-bold hover:underline">Log in</Link>
      </p>

      <div className="mt-16 text-center text-[11px] text-gray-400 font-medium leading-relaxed">
        <p>By Proceeding, You Agree To The</p>
        <p>
          <a href="#" className="hover:underline">Terms Of Service</a> And <a href="#" className="hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default memo(SignUp);

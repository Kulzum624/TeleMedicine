import { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from '../../../shared/components/ui';
import { createPasswordUser, clearAuthError, fetchCurrentUser, selectTempEmail, selectTempOtp, selectAuthLoading, selectAuthError, selectOtpVerified } from '../store/authSlice';
import logo from '../../../assets/logo.png';

const EyeIcon = memo(({ show, toggle }) => (
    <button
        type="button"
        onClick={toggle}
        className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
    >
        {show ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
            </svg>
        ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        )}
    </button>
));

EyeIcon.displayName = 'EyeIcon';

const CreatePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setValidationError] = useState('');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const tempEmail = useSelector(selectTempEmail);
  const tempOtp = useSelector(selectTempOtp);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const otpVerified = useSelector(selectOtpVerified);

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(pass)) {
      return "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    return null;
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setValidationError('');

    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    const passError = validatePassword(password);
    if (passError) {
      setValidationError(passError);
      return;
    }

    dispatch(clearAuthError());
    
    const resultAction = await dispatch(createPasswordUser({ 
      email: tempEmail, 
      otp: tempOtp, 
      newPassword: password 
    }));
    
    if (createPasswordUser.fulfilled.match(resultAction)) {
      dispatch(fetchCurrentUser());
      toast.success('Password created successfully!');
      navigate('/create-profile');
    } else {
      toast.error(resultAction.payload || 'Failed to set password');
    }
  }, [password, confirmPassword, tempEmail, tempOtp, dispatch, navigate]);

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);
  const toggleConfirmPassword = useCallback(() => setShowConfirmPassword(prev => !prev), []);
  
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const handleConfirmPasswordChange = useCallback((e) => setConfirmPassword(e.target.value), []);

  if (!tempEmail || !otpVerified || !tempOtp) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Telemedicine Logo" className="h-32 w-auto object-contain" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Set Password</h2>
        <p className="text-gray-500 mt-2">Create a strong password for your account</p>
      </div>

      {(error || validationError) && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
          {validationError || error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            label="New Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="h-12 bg-slate-50"
          />
          <EyeIcon show={showPassword} toggle={togglePassword} />
        </div>
        
        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            className="h-12 bg-slate-50"
          />
          <EyeIcon show={showConfirmPassword} toggle={toggleConfirmPassword} />
        </div>

        <Button 
          type="submit" 
          className="w-full py-4 rounded-xl text-lg font-bold shadow-sm bg-[#c62828] hover:bg-[#b71c1c] text-white" 
          isLoading={loading}
        >
          {loading ? 'Setting Password...' : 'Set Password'}
        </Button>
      </form>
    </div>
  );
};

export default memo(CreatePassword);

import { useState, useEffect, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from '../../../shared/components/ui';
import { forgotPasswordRequest, clearAuthError, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '../store/authSlice';
import logo from '../../../assets/logo.png';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
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
    
    const resultAction = await dispatch(forgotPasswordRequest(email));
    
    if (forgotPasswordRequest.fulfilled.match(resultAction)) {
      toast.success('Password reset OTP sent to your email!');
      navigate('/verify-otp', { state: { fromForgotPassword: true } });
    } else {
      toast.error(resultAction.payload || 'Failed to request password reset');
    }
  }, [email, dispatch, navigate]);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-8">
        <img src={logo} alt="Telemedicine Logo" className="h-32 w-auto object-contain" />
      </div>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
        <p className="text-gray-500 mt-2">Enter your email to receive a password reset code</p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          className="h-12 bg-slate-50"
        />

        <Button 
          type="submit" 
          className="w-full py-4 rounded-xl text-lg font-bold shadow-sm bg-[#c62828] hover:bg-[#b71c1c] text-white" 
          isLoading={loading}
        >
          {loading ? 'Sending Code...' : 'Send Reset Code'}
        </Button>
      </form>

      <p className="mt-8 text-center text-sm text-gray-600 font-medium">
        Remember your password? <Link to="/login" className="text-[#c62828] font-bold hover:underline">Log in</Link>
      </p>
    </div>
  );
};

export default memo(ForgotPassword);

import { useState, useCallback, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Button, OTPInput } from '../../../shared/components/ui';
import { verifyOtpUser, clearAuthError, setTempOtp, selectTempEmail, selectAuthLoading, selectAuthError, selectOtpVerified } from '../store/authSlice';
import { authService } from '../api/authService';

const VerifyOTP = () => {
  const [otpValue, setOtpValue] = useState('');
  const [isResending, setIsResending] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const tempEmail = useSelector(selectTempEmail);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const otpVerified = useSelector(selectOtpVerified);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (otpValue.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }

    dispatch(clearAuthError());
    const resultAction = await dispatch(verifyOtpUser({ email: tempEmail, otp: otpValue }));
    
    if (verifyOtpUser.fulfilled.match(resultAction)) {
      dispatch(setTempOtp(otpValue));
      toast.success('Email verified successfully!');
      navigate('/create-password');
    } else {
      toast.error(resultAction.payload || 'Invalid OTP');
    }
  }, [otpValue, tempEmail, dispatch, navigate]);

  const handleResend = useCallback(async () => {
    try {
      setIsResending(true);
      await authService.requestOtp(tempEmail);
      toast.success('A new OTP has been sent to your email.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setIsResending(false);
    }
  }, [tempEmail]);

  const handleOtpChange = useCallback((value) => setOtpValue(value), []);

  if (!tempEmail) {
    return <Navigate to="/signup" replace />;
  }

  if (otpVerified) {
    return <Navigate to="/create-password" replace />;
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Verify Email</h2>
        <p className="text-gray-500 mt-2">
          We've sent a 6-digit code to <span className="font-semibold text-gray-900">{tempEmail}</span>
        </p>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <OTPInput
          length={6}
          onComplete={handleOtpChange}
        />

        <Button 
          type="submit" 
          className="w-full py-4 rounded-xl text-lg font-bold shadow-sm bg-[#c62828] hover:bg-[#b71c1c] text-white" 
          isLoading={loading}
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </Button>
      </form>

      <div className="text-center mt-6">
        <p className="text-sm text-gray-500 font-medium">
          Didn't receive the code?{' '}
          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="text-[#c62828] font-bold hover:underline disabled:opacity-50"
          >
            {isResending ? 'Sending...' : 'Resend code'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default memo(VerifyOTP);

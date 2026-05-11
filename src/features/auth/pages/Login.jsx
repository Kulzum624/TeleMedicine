import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Input, Button } from '../../../shared/components/ui';
import { useAuth } from '../../../shared/hooks/useAuth';
import { loginUser } from '../store/authSlice';
import logo from '../../../assets/logo.png';

const EyeIcon = memo(({ show, toggle }) => (
    <button
        type="button"
        onClick={toggle}
        className="absolute right-3 bottom-3 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label={show ? "Hide password" : "Show password"}
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, login, clearError, refreshProfile } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    clearError();
    
    const resultAction = await login({ email, password });
    
    if (loginUser.fulfilled.match(resultAction)) {
      const userStatus = resultAction.payload.user?.status;
      
      if (userStatus === 'PENDING_VERIFICATION') {
        toast.error('Please verify your email first.');
        navigate('/verify-otp');
        return;
      }
      
      refreshProfile();
      toast.success('Successfully logged in!');
      navigate('/dashboard');
    } else {
      toast.error(resultAction.payload || 'Failed to log in');
    }
  }, [email, password, login, clearError, refreshProfile, navigate]);

  const togglePassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handlePasswordChange = useCallback((e) => setPassword(e.target.value), []);
  const handleRememberMeChange = useCallback((e) => setRememberMe(e.target.checked), []);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-2">
        <img src={logo} alt="NAS Telemedicine" className="h-36 w-auto object-contain" />
      </div>

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
        
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="h-12 bg-slate-50"
          />
          <EyeIcon show={showPassword} toggle={togglePassword} />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input 
              type="checkbox" 
              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" 
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>

          <Link to="/forgot-password" className="text-sm font-medium text-gray-900 hover:underline">
            Forgot password?
          </Link>
        </div>

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        <Button type="submit" className="w-full mt-8 bg-[#d32f2f] hover:bg-[#b71c1c] text-white py-3 rounded-xl font-bold" isLoading={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-8 flex items-center justify-center">
        <span className="flex-1 border-t border-gray-200"></span>
        <span className="px-4 text-xs font-medium text-gray-400 uppercase">or</span>
        <span className="flex-1 border-t border-gray-200"></span>
      </div>

      <div className="mt-8">
        <Button variant="outline" className="w-full flex items-center justify-center gap-3 py-3 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
          Continue with Google
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't Have An Account? <Link to="/signup" className="text-[#d32f2f] font-bold hover:underline">Sign Up</Link>
      </p>
    </div>
  );
};

export default memo(Login);

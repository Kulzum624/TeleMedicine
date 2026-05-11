import { Outlet } from 'react-router-dom';
import loginBg from '../assets/login.webp';

export default function AuthLayout() {
  return (
    <div className="relative min-h-screen w-full flex items-center overflow-x-hidden">
      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={loginBg} 
          alt="Healthcare Professional Background" 
          className="h-full w-full object-cover object-center md:object-[75%_center] lg:object-right"
        />
        {/* Subtle overlay to ensure the card stands out */}
        <div className="absolute inset-0 bg-gray-900/5"></div>
      </div>

      {/* Login Card Overlay */}
      <div className="relative z-10 w-full max-w-[580px] lg:ml-[1%] xl:ml-[8%] p-4 sm:p-8">
        <div className="w-full bg-white px-12 sm:px-16 sm:pb-8 sm:pt-4 rounded-[1rem] shadow-2xl border border-white/10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

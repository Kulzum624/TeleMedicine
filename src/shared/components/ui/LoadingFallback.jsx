import React from 'react';


const LoadingFallback = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 animate-ping rounded-full bg-[#c62828]/20"></div>
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl">
            <div 
              className="h-8 w-8 animate-spin rounded-full border-4 border-gray-100 border-t-[#c62828]"
              style={{ animationDuration: '0.8s' }}
            ></div>
          </div>
        </div>
        
        
        <div className="mt-6 flex flex-col items-center gap-2">
          <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
            NAS Telemedicine
          </span>
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c62828] [animation-delay:-0.3s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c62828] [animation-delay:-0.15s]"></div>
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#c62828]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(LoadingFallback);

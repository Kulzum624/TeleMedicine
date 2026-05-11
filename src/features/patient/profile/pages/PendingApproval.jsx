import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../../../../shared/components/ui';

export default function PendingApproval() {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleRefresh = () => {
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F9FB] p-6">
            <div className="max-w-xl w-full bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 p-12 text-center border border-gray-100 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 mx-auto bg-amber-50 rounded-3xl flex items-center justify-center mb-8 relative">
                    <div className="absolute inset-0 bg-amber-200 opacity-20 rounded-3xl animate-ping"></div>
                    <svg className="w-12 h-12 text-amber-600 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                
                <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Wait for the Approval</h2>
                <p className="text-gray-500 font-medium leading-relaxed mb-10 text-lg">
                    Thank you for joining TeleMed! Your profile has been submitted and is currently being reviewed by our administration team.
                </p>

                <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100 mb-10 text-left">
                    <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span> Current Status: Pending
                    </h4>
                    <p className="text-xs text-gray-400 font-medium leading-relaxed">
                        Verification usually takes 24-48 hours. We will notify you via email once your account is ready.
                    </p>
                </div>

                <div className="space-y-4">
                    <Button 
                        onClick={handleRefresh}
                        className="w-full py-4 h-14 bg-gray-900 hover:bg-black text-white rounded-2xl font-bold transition-all shadow-lg shadow-gray-900/10"
                    >
                        Refresh Status
                    </Button>
                    
                    <button 
                        onClick={handleLogout}
                        className="text-sm font-bold text-gray-400 hover:text-primary transition-colors block mx-auto mt-6"
                    >
                        Logout and come back later
                    </button>
                </div>
            </div>
        </div>
    );
}

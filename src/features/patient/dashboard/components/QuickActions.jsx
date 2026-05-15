import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, UserPlus, MessageSquare, ClipboardList } from 'lucide-react';

const ACTION_CARDS = [
    {
        title: 'Start Triage',
        description: 'Check your symptoms with smart health AI',
        icon: Sparkles,
        bgColor: 'bg-[#c62828]',
        textColor: 'text-white',
        path: '/ai-triage',
    },
    {
        title: 'Book Doctor',
        description: 'Find and book top specialists instantly',
        icon: UserPlus,
        bgColor: 'bg-[#f59e0b]',
        textColor: 'text-white',
        path: '/book-doctors',
    },
    {
        title: 'Messages',
        description: 'Chat securely with your doctor',
        icon: MessageSquare,
        bgColor: 'bg-[#3b82f6]',
        textColor: 'text-white',
        path: '/messages',
    },
    {
        title: 'Prescriptions',
        description: "Access your doctor's prescriptions in one place.",
        icon: ClipboardList,
        bgColor: 'bg-[#10b981]',
        textColor: 'text-white',
        path: '/prescription',
    },
];

const QuickActions = () => {
    const navigate = useNavigate();

    return (
        <section className="my-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ACTION_CARDS.map((card, index) => (
                    <div
                        key={index}
                        onClick={() => navigate(card.path)}
                        className={`${card.bgColor} ${card.textColor} p-6 rounded-[1rem] cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl group relative overflow-hidden`}
                    >
                        
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full transition-transform duration-500 group-hover:scale-150" />

                        <div className="relative z-10">
                            <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 tracking-tight">{card.title}</h3>
                            <p className="text-sm text-white/80 font-medium leading-relaxed">
                                {card.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default memo(QuickActions);


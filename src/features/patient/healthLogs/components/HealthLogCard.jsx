import { memo } from 'react';
import { Calendar, Activity, Target, Smile, Edit2, Trash2 } from 'lucide-react';

const HealthLogCard = ({ log, onEdit, onDelete }) => {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4 hover:shadow-md transition-shadow">
            
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-900 tracking-tight">{log.problem}</h3>
                <div className="flex items-center text-gray-600 gap-2">
                    <Calendar className="w-4 h-4 text-[#c62828]" />
                    <span className="text-sm font-medium">{log.dateStarted}</span>
                </div>
            </div>

            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-[#c62828]" />
                        <span className="text-gray-600 font-medium">Intensity:</span>
                        <span className="text-gray-900 font-medium">{log.intensity}/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#c62828]" />
                        <span className="text-gray-600 font-medium">Problem Area:</span>
                        <span className="text-gray-900 font-medium">{log.bodyArea}</span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <div className="flex items-center gap-2">
                            <Smile className="w-5 h-5 text-[#c62828]" />
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Feeling</span>
                        </div>
                        <div className="w-fit bg-red-50 text-[#c62828] font-semibold px-4 py-1.5 rounded-full text-sm">
                            {log.feeling}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Description</span>
                    <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
                        {log.symptoms}
                    </p>
                </div>
            </div>

            
            <div className="flex gap-4">
                <button
                    onClick={() => onEdit(log)}
                    className="flex items-center gap-2 bg-[#c62828] hover:bg-[#b71c1c] text-white px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
                >
                    <Edit2 className="w-4 h-4" />
                    Edit
                </button>
                <button
                    onClick={() => onDelete(log.id)}
                    className="flex items-center gap-2 bg-white hover:bg-red-50 text-[#c62828] border border-[#c62828] px-5 py-2.5 rounded-xl font-semibold transition-colors shadow-sm"
                >
                    <Trash2 className="w-4 h-4" />
                    Delete
                </button>
            </div>
        </div>
    );
};

export default memo(HealthLogCard);

import { useState, useEffect, memo } from 'react';
import { X, Save } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addLog, updateLog } from '../store/healthLogsSlice';

const FEELINGS = ['Pain', 'Stressed', 'Headache', 'Tense', 'Dizzy', 'Nauseous'];

const CreateLogModal = ({ isOpen, onClose, initialData }) => {
    const dispatch = useDispatch();
    const isEditMode = !!initialData;

    const [formData, setFormData] = useState({
        problem: '',
        feeling: '',
        bodyArea: '',
        intensity: 50,
        dateStarted: '',
        symptoms: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setFormData(initialData);
            } else {
                setFormData({
                    problem: '',
                    feeling: '',
                    bodyArea: '',
                    intensity: 50,
                    dateStarted: '',
                    symptoms: '',
                });
            }
            setErrors({});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const validate = () => {
        const newErrors = {};
        if (!formData.problem.trim()) newErrors.problem = 'Problem is required';
        if (!formData.feeling) newErrors.feeling = 'Feeling is required';
        if (!formData.bodyArea.trim()) newErrors.bodyArea = 'Body area is required';
        if (!formData.dateStarted) newErrors.dateStarted = 'Date is required';
        if (!formData.symptoms.trim()) newErrors.symptoms = 'Symptoms detail is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            if (isEditMode) {
                dispatch(updateLog(formData));
            } else {
                dispatch(addLog(formData));
            }
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                
                <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">
                        {isEditMode ? 'Edit Health Log' : 'Create your Health Logs'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-white bg-[#c62828] hover:bg-[#b71c1c] rounded-full transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                
                <div className="p-6 overflow-y-auto">
                    <form id="healthLogForm" onSubmit={handleSubmit} className="space-y-6">
                        
                        <div>
                            <label className="block text-gray-900 font-semibold mb-2">
                                What is the problem? <span className="text-[#c62828]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. sharp pain, cough, anxiety"
                                value={formData.problem}
                                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.problem ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all`}
                            />
                            {errors.problem && <p className="text-red-500 text-sm mt-1">{errors.problem}</p>}
                        </div>

                        
                        <div>
                            <label className="block text-gray-900 font-semibold mb-2">
                                Feeling <span className="text-[#c62828]">*</span>
                            </label>
                            <div className="flex flex-wrap gap-2 p-4 border border-gray-200 rounded-xl">
                                {FEELINGS.map(f => (
                                    <button
                                        key={f}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, feeling: f })}
                                        className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${formData.feeling === f
                                                ? 'bg-[#c62828] border-[#c62828] text-white shadow-sm'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                                            }`}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                            {errors.feeling && <p className="text-red-500 text-sm mt-1">{errors.feeling}</p>}
                        </div>

                        
                        <div>
                            <label className="block text-gray-900 font-semibold mb-2">
                                Where on your body? <span className="text-[#c62828]">*</span>
                            </label>
                            <input
                                type="text"
                                placeholder="e.g. head, chest, lower back"
                                value={formData.bodyArea}
                                onChange={(e) => setFormData({ ...formData, bodyArea: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.bodyArea ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all`}
                            />
                            {errors.bodyArea && <p className="text-red-500 text-sm mt-1">{errors.bodyArea}</p>}
                        </div>

                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-gray-900 font-semibold">
                                        Intensity <span className="text-[#c62828]">*</span>
                                    </label>
                                    <span className="text-gray-900 font-semibold">{formData.intensity}/100</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={formData.intensity}
                                    onChange={(e) => setFormData({ ...formData, intensity: parseInt(e.target.value) })}
                                    className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer accent-[#c62828]"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-900 font-semibold mb-2">
                                    Date Started <span className="text-[#c62828]">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateStarted}
                                    max={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
                                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.dateStarted
                                            ? 'border-red-500 focus:ring-red-500'
                                            : 'border-gray-200 focus:border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all text-gray-600`}
                                />
                                {errors.dateStarted && <p className="text-red-500 text-sm mt-1">{errors.dateStarted}</p>}
                            </div>
                        </div>

                        
                        <div>
                            <label className="block text-gray-900 font-semibold mb-1">
                                Symptoms & extra detail <span className="text-[#c62828]">*</span>
                            </label>
                            <p className="text-sm text-gray-600 mb-2">
                                Different from above: add how it feels, when it happens, or anything else your doctor should know.
                            </p>
                            <textarea
                                placeholder="e.g. worse at night, started after exercise..."
                                rows="4"
                                value={formData.symptoms}
                                onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                className={`w-full px-4 py-3 rounded-xl border ${errors.symptoms ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:border-gray-300'} focus:outline-none focus:ring-2 focus:ring-gray-100 transition-all resize-none`}
                            ></textarea>
                            {errors.symptoms && <p className="text-red-500 text-sm mt-1">{errors.symptoms}</p>}
                        </div>

                        
                        <div>
                            <label className="block text-gray-900 font-semibold mb-1">
                                Attach images from your device
                            </label>
                            <p className="text-sm text-gray-600 mb-3">
                                Up to 5 images (JPEG, PNG, or WebP).
                            </p>
                            <button
                                type="button"
                                className="bg-[#c62828] hover:bg-[#b71c1c] text-white px-6 py-2.5 rounded-xl font-semibold transition-colors"
                            >
                                Choose images
                            </button>
                        </div>
                    </form>
                </div>

                
                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                    <button
                        type="submit"
                        form="healthLogForm"
                        className="w-full flex justify-center items-center gap-2 bg-[#c62828] hover:bg-[#b71c1c] text-white px-6 py-4 rounded-xl font-bold text-lg transition-colors shadow-sm"
                    >
                        <Save className="w-5 h-5" />
                        Save Log
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(CreateLogModal);

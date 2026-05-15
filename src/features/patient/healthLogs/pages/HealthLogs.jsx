import { useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Plus } from 'lucide-react';
import HealthLogCard from '../components/HealthLogCard';
import CreateLogModal from '../components/CreateLogModal';
import { deleteLog } from '../store/healthLogsSlice';

const HealthLogs = () => {
    const logs = useSelector((state) => state.healthLogs.logs);
    const dispatch = useDispatch();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingLog, setEditingLog] = useState(null);

    const handleCreateClick = useCallback(() => {
        setEditingLog(null);
        setIsModalOpen(true);
    }, []);

    const handleEditClick = useCallback((log) => {
        setEditingLog(log);
        setIsModalOpen(true);
    }, []);

    const handleDeleteClick = useCallback((id) => {
        if (window.confirm('Are you sure you want to delete this health log?')) {
            dispatch(deleteLog(id));
        }
    }, [dispatch]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => setEditingLog(null), 200);
    }, []);

    return (
        <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm p-8 min-h-[calc(100vh-8rem)]">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Health Logs</h1>
                <button
                    onClick={handleCreateClick}
                    className="flex items-center gap-2 bg-[#c62828] hover:bg-[#b71c1c] text-white px-5 py-3 rounded-xl font-bold transition-all shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    Create your logs
                </button>
            </div>

            <div className="space-y-4">
                {logs.length > 0 ? (
                    logs.map((log) => (
                        <HealthLogCard
                            key={log.id}
                            log={log}
                            onEdit={handleEditClick}
                            onDelete={handleDeleteClick}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <p className="text-gray-500 font-medium">No health logs yet. Click "Create your logs" to add one.</p>
                    </div>
                )}
            </div>

            <CreateLogModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                initialData={editingLog}
            />
        </div>
    );
};

export default memo(HealthLogs);

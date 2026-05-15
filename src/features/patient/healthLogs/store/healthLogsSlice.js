import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logs: [
        {
            id: '1',
            problem: 'pain',
            dateStarted: '2026-05-13',
            intensity: 69,
            bodyArea: 'head',
            feeling: 'Headache',
            symptoms: 'worst at night',
            images: [],
            createdAt: new Date().toISOString()
        }
    ],
};

const healthLogsSlice = createSlice({
    name: 'healthLogs',
    initialState,
    reducers: {
        addLog: (state, action) => {
            state.logs.unshift({
                ...action.payload,
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
            });
        },
        updateLog: (state, action) => {
            const index = state.logs.findIndex(log => log.id === action.payload.id);
            if (index !== -1) {
                state.logs[index] = { ...state.logs[index], ...action.payload };
            }
        },
        deleteLog: (state, action) => {
            state.logs = state.logs.filter(log => log.id !== action.payload);
        },
    },
});

export const { addLog, updateLog, deleteLog } = healthLogsSlice.actions;
export default healthLogsSlice.reducer;

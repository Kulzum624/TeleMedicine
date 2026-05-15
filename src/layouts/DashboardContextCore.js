import { createContext, useContext } from 'react';



export const DashboardStateContext = createContext();
export const DashboardDispatchContext = createContext();

export const useDashboardState = () => {
    const context = useContext(DashboardStateContext);
    if (context === undefined) {
        throw new Error('useDashboardState must be used within a DashboardProvider');
    }
    return context;
};

export const useDashboardDispatch = () => {
    const context = useContext(DashboardDispatchContext);
    if (context === undefined) {
        throw new Error('useDashboardDispatch must be used within a DashboardProvider');
    }
    return context;
};

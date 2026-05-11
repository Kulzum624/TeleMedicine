import { createContext, useContext } from 'react';

/**
 * Split context pattern:
 * State and Dispatch are separated to prevent unnecessary re-renders.
 * Components that only need to update the header won't re-render 
 * when the header content itself changes.
 */

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

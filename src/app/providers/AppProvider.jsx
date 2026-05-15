import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { store } from '../store/store';

export const AppProvider = ({ children }) => {
  return (
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Toaster position="bottom" />
          {children}
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
};

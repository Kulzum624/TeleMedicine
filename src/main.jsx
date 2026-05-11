import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './app/providers/AppProvider.jsx'
import { AppRouter } from './app/router/AppRouter.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <AppRouter />
  </AppProvider>
)

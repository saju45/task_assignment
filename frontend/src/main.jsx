import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { TaskProvider } from './context/TaskProvider.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
  
  <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
    <AuthProvider>

   <TaskProvider>
        <App />
    </TaskProvider>
    </AuthProvider>
 
  </BrowserRouter>
  
  </StrictMode>,
)

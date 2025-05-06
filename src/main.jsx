import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import { BrowserRouter } from 'react-router-dom';

import { App } from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

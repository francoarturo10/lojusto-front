import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { router } from './router/router'
import { AuthProvider } from './context/AuthContext'
import { RouterProvider } from 'react-router-dom';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <AuthProvider> {/* Crea un estado global para sus hijos */}
      <RouterProvider router={router}/>
    </AuthProvider>

  </StrictMode>,
)

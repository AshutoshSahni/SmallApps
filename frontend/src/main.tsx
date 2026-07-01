import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from "./components/ui/ThemeContext"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotesApp from './apps/notes/NotesApp.tsx'
import Calculator from './apps/calculator/Calculator.tsx'
import Login from './apps/auth/Login.tsx'
import App from './App.tsx'
import Register from './apps/auth/Register.tsx'
import ProtectedRoute from './apps/auth/ProtectedRoute.tsx'

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/notes", element: (<ProtectedRoute><NotesApp /></ProtectedRoute>) },
  { path: "/calculator", element:(<ProtectedRoute><Calculator /></ProtectedRoute>) },
  { path: "/register", element: <Register /> },
  { path: "/app", element: <App /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
  </StrictMode>,
)

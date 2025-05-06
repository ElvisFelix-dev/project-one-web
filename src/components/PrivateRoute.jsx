// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  const token = localStorage.getItem('token')

  if (loading) return <div>Carregando...</div>

  return user || token ? children : <Navigate to="/sign-in" />
}


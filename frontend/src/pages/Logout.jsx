import { useAuthContext } from '../features/authentication/context/'
import { Navigate } from 'react-router-dom'

export default function Logout(){
  const { setIsAuthenticated } = useAuthContext()
  localStorage.clear()
  setIsAuthenticated(false)
  return <Navigate to='/login' />
}
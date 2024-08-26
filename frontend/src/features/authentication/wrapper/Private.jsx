import { useAuthContext } from '../context/'
import { Navigate } from 'react-router-dom'

export default function Private({children}){
  const {isAuthenticated} = useAuthContext()
  
  return isAuthenticated? children: <Navigate to='/login' />
}
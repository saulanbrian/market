import { useAuthContext } from '../features/authentication/context/'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Logout(){
  const { setIsAuthenticated } = useAuthContext()
  localStorage.clear()
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setIsAuthenticated(false)
    setLoading(false)
  },[])
  
  return loading? (
    <p>loading... </p>
  ): <Navigate to='/login' />
}
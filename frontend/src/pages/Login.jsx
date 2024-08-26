import AuthForm from '../components/AuthForm/'

import api from '../api.jsx'

import { useActionData,Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthContext } from '../features/authentication/context/'

export default function Login(){
  
  const data = useActionData()
  const { login, isAuthenticated } = useAuthContext()
  
  useEffect(() => {
    data && login(data.access,data.refresh)
  },[data])
  
  return isAuthenticated? <Navigate to='/' /> : <AuthForm userAction='login'/>
}


export const LoginAction = async({request}) =>{
  
  const data = await request.formData()
  
  const username = data.get('username')
  const password = data.get('password')
  
  try{
    const res = await api.post('auth/token',{
      username,
      password,
    })
    return res.data
  }catch(e){
    console.log(e)
  }
  
  return null
  
}
import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export default function AuthContextProvider({children}){
  
  const refreshToken = localStorage.getItem('REFRESH_TOKEN')
  
  const [isAuthenticated,setIsAuthenticated] = useState(Boolean(refreshToken))
  
  function login(access,refresh){
    localStorage.setItem('ACCESS_TOKEN',access)
    localStorage.setItem('REFRESH_TOKEN',refresh)
    setIsAuthenticated(true)
  }
  
  return (
    <AuthContext.Provider value={{isAuthenticated,login,setIsAuthenticated}}>
      { children }
    </AuthContext.Provider>
  )
}
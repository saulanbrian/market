import { useAuthContext } from '../features/authentication/context/'

export default function LandingPage(){
  
  const { isAuthenticated } = useAuthContext()
  
  return (
    <p>isAuthenticated { `${isAuthenticated}` }</p>
  )
}
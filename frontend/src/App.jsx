import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import AuthContextProvider from './features/authentication/context'
import Private from './features/authentication/wrapper/Private.jsx'

import Login, { LoginAction } from './pages/Login'
import Logout from './pages/Logout'
import LandingPage from './pages/LandingPage.jsx'

const router = createBrowserRouter([
  {
    path:'',
    element:<Private><LandingPage /></Private>
  },
  {
    path:'login',
    element:<Login />,
    action:LoginAction
  },
  {
    path:'logout',
    element:<Logout />
  }
])

function App() {
  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  )
}

export default App

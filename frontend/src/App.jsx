import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import AuthContextProvider from './features/authentication/context'
import Private from './features/authentication/wrapper/Private.jsx'

import Login, { LoginAction } from './pages/Login'
import Logout from './pages/Logout'
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About'

const router = createBrowserRouter([
  {
    path:'',
    element:<LandingPage />,
    children:[
      {
        path:'about',
        element:<About />
      }
    ]
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

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
     </ThemeProvider>
  )
}

export default App

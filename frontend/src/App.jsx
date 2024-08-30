import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import { createTheme, ThemeProvider } from '@mui/material/styles'

import AuthContextProvider from './features/authentication/context'
import Private from './features/authentication/wrapper/Private.jsx'

import Login, { LoginAction } from './pages/Login'
import Logout from './pages/Logout'
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About'
import Marketplace from './pages/Marketplace.jsx'

import Navigation from './components/Navigation'

const router = createBrowserRouter([
  {
   path:'/',
   element:<Navigation />,
   children:[
    {
      path:'',
      element:<LandingPage />
    },
    {
      path:'about',
      element:<About />
    },
    {
      path:'marketplace',
      element:<Marketplace />
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
const client = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={client}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthContextProvider>
     </ThemeProvider>
  )
}

export default App

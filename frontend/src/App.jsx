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
import CartContextProvider from './features/cart/context'
import Private from './features/authentication/wrapper/Private.jsx'

import Login, { LoginAction } from './pages/Login'
import Logout from './pages/Logout'
import LandingPage from './pages/LandingPage.jsx'
import About from './pages/About'
import Marketplace from './pages/Marketplace.jsx'
import ProductDetail from './pages/ProductDetail'
import Orders from './pages/Orders'
import Cart from './pages/Cart'
import OrderSummary from './pages/OrderSummary'
import MyProducts from './pages/MyProducts'
import Dashboard from './pages/Dashboard'

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
      element:<Marketplace />,
      children:[
        {
          path:'product/:id',
          element:<ProductDetail />
        },
      ]
    },
    {
      path:'dashboard',
      element:<Private><Dashboard /></Private>,
      children:[
        {
          path:'orders',
          element:<Private><Orders /></Private>
        },
        {
          path:'cart',
          element:(
            <Private>
              <CartContextProvider>
                <Cart />
              </CartContextProvider>
            </Private>
          ),
          children:[
            {
              path:'order-summary',
              element:<Private><OrderSummary /></Private>
            },
          ]
        },
        {
          path:'my-products',
          element:<Private><MyProducts/></Private>
        }
      ]
    },
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

const theme = createTheme({
  palette:{
    primary:{
      main:'#06D6A0',
      light:'#38a88a'
    },
    secondary:{
      main:'#FFFCF9'
    }
  }
})

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

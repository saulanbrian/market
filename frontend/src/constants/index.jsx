import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import InfoSharpIcon from '@mui/icons-material/InfoSharp';
import StorefrontSharpIcon from '@mui/icons-material/StorefrontSharp';
import DashboardCustomizeSharpIcon from '@mui/icons-material/DashboardCustomizeSharp';

export const mainRoutes = [
  { name:'home', route:'',icon:<HomeSharpIcon />},
  { name:'about', route:'/about',icon:<InfoSharpIcon />},
  { name:'marketplace', route:'/marketplace',icon:<StorefrontSharpIcon />},
  { name:'dashboard',route:'/dashboard',icon:<DashboardCustomizeSharpIcon />}
]

export const dashboardRoutes = [
  { name:'my orders', route:'orders' },
  { name:'cart', route:'cart'},
  { name:'my products',route:'my-products' }
] 
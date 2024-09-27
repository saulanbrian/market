import  {
  ButtonBase,
  Box,
  Paper,
  Typography,
  Slide
} from '@mui/material'

import Breadcrumbs from '../components/Breadcrumbs'

import { styled } from '@mui/system'

import {
  useNavigate, 
  useLocation,
  Outlet
} from 'react-router-dom'

import { dashboardRoutes  } from '../constants/index'


const DashBoardCard = styled(Paper)(({theme}) => ({
  height:150,
  width:360,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}))


const MainBox = styled(Box)(({theme}) => ({
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  maxidth:'100vw',
  flexWrap:'wrap',
  gap:8,
  overflow:'hidden',
  height:'100%',
  padding:4
}))


const StyledBreadcrumbs = styled(Breadcrumbs)(({theme}) => ({
  width:'100%',
}))



export default function Dashboard(){
  
  const navigate = useNavigate()
  const location = useLocation()
  
  const path = [...location.pathname.split('/').filter(str => !!str)]
  
  function handleClick(route){
    navigate(route)
  }
  
  return (
    <MainBox>
      <StyledBreadcrumbs/>
      { path?.length === 1? (
        dashboardRoutes.map((route,index) => (
          <ButtonBase key={index}>
            <DashBoardCard onClick={() => handleClick(route.route)}>
              <Typography>{route.name}</Typography>
            </DashBoardCard>
          </ButtonBase>
        ))
      ): (
        <Slide direction='left' in>
          <Box sx={{width:'100%',}}>
            <Outlet />
          </Box>
        </Slide>
      )
      }
    </MainBox>
  )
}
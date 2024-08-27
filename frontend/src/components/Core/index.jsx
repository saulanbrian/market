import {
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
  Button
} from '@mui/material'

import { styled } from '@mui/system'

import MenuButton from './MenuButton'

import { useNavigate } from 'react-router-dom'


const StyledAppBar = styled(AppBar)(({theme}) => ({
  paddig:4,
}))


const DynamicButton = styled(Button)(({theme}) => ({
  [theme.breakpoints.down('sm')]:{
    display:'none'
  }
}))


export default function(){
  
  const navigate = useNavigate()
  
  const routes = [
    {name:'about',callBack:() => navigate('/about')},
    {name:'home',callBack:() => navigate('/')}
  ]
  
  
  return (
  <StyledAppBar color='primary'>
    <Toolbar>
      <MenuButton 
        sx={{marginRight:'auto'}}
        routes={routes}/>
      {
        routes.map((route,i) => (
          <DynamicButton 
            key={i}
            color='inherit'
            onClick={() => route.callBack()}>
            { route.name }
          </DynamicButton>
        ))
      }
    </Toolbar>
  </StyledAppBar>
  )
}


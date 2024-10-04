import { 
  Drawer,
  List,
  ListItemText,
  ListItem,
  ListItemButton,
  Icon
 } from '@mui/material' 
import { padding, styled } from '@mui/system'

import NavigationButton from '../../ui/NavigationButton'
import NavigationLink from '../../ui/NavigationLink'

import { mainRoutes } from '../../../constants'

import { useLocation, useNavigate } from 'react-router-dom'
import { useCallback } from 'react'


const StyledDrawer = styled(Drawer)(({theme}) => ({
  '& .MuiDrawer-paper':{
    background:theme.palette.primary.main,
    padding:16
  }
}))


const StyledNavigationLink = styled(NavigationLink)(({theme}) => ({
  width:'100%',
  color:theme.palette.secondary.main,
  display:'flex',
  justifyContent:'flex-start',
  padding:12
}))



export default function NavigationDrawer({open,onClose}){
  
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = useCallback((route) => {
    navigate(route)
    onClose()
  },[])

  function selected(name){
    let currentLocation = location.pathname.split('/').filter(str => !!str).length >= 1? location.pathname.split('/').filter(str => !!str) :['home']
    return currentLocation[0] == name
  }

  
  return (
    <StyledDrawer open={open} onClose={onClose}>
      <List disablePadding>
      { mainRoutes.map(({name,route,icon},index) => (
        <ListItem disableGutters disablePadding>
          <StyledNavigationLink 
            startIcon={icon} 
            name={name} 
            onClick={() => handleClick(route)}
            selected={selected(name)} />
        </ListItem>
      )) }
      </List>
    </StyledDrawer>
  )
}
import {
  AppBar, 
  Toolbar, 
  IconButton,
  Box
} from '@mui/material'
import NavigationLink from '../ui/NavigationLink'
import { styled } from '@mui/system'

import { mainRoutes } from '../../constants'

import { Route, useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import React,{ useCallback, useState } from 'react'

import DynamicMenu from './DynamicMenu'


const StyledNavigationLink = styled(NavigationLink)(({theme}) => ({
  [theme.breakpoints.down('md')]:{
    display:'none'
  },
  color:theme.palette.secondary.main,
  padding:12
}))


const StyledAppBar = styled(AppBar)(({theme}) => ({
  zIndex:2,
  position:'sticky',
  boxShadow:'none',
  width:'100vw'
}))


const MainPageBox = styled(Box)(({theme}) => ({
  maxWidth:'100vw',
  background:theme.palette.secondary.main
}))


export default function Navigation(){
  
  const navigate = useNavigate()
  const location = useLocation()

  function selected(name){
    let currentLocation = location.pathname.split('/').filter(str => !!str).length >= 1? location.pathname.split('/').filter(str => !!str) :['home']
    return currentLocation[0] == name
  }
  
  return (
    <React.Fragment>
      <StyledAppBar>
        <Toolbar sx={{'& :nth-child(3)':{marginRight:'auto'},padding:'4px'}}>
          <DynamicMenu />
          {mainRoutes.map(({name,route,icon},index) => (
              <StyledNavigationLink
                startIcon={icon}
                key={index}
                name={name} 
                onClick={() => navigate(route)}
                selected={ selected(name) } />
          ))}
        </Toolbar>
      </StyledAppBar>
      <MainPageBox>
        <Outlet />  
      </MainPageBox>
    </React.Fragment>
  )
}
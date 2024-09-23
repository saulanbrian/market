import {
  AppBar, 
  Toolbar, 
  IconButton
} from '@mui/material'
import NavigationLink from '../ui/NavigationLink'
import { styled } from '@mui/system'

import { mainRoutes } from '../../constants'

import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'

import React,{ useState } from 'react'

import DynamicMenu from './DynamicMenu'


const StyledNavigationLink = styled(NavigationLink)(({theme}) => ({
  [theme.breakpoints.down('md')]:{
    display:'none'
  }
}))

const StyledAppBar = styled(AppBar)(({theme}) => ({
  zIndex:0,
  position:'sticky',
  boxShadow:'none'
}))

export default function Navigation(){
  
  const navigate = useNavigate()
  
  return (
    <React.Fragment>
      <StyledAppBar>
        <Toolbar>
          <DynamicMenu />
          {mainRoutes.map(({name,route},index) => (
              <StyledNavigationLink 
                key={index}
                name={name} 
                onClick={() => navigate(route)} />
          ))}
        </Toolbar>
      </StyledAppBar>
      <Outlet />
    </React.Fragment>
  )
}
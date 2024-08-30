import {
  IconButton,
} from '@mui/material'
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import NavigationButton from '../../../components/ui/NavigationButton'
import NavigationDrawer from './NavigationDrawer'

import { styled } from '@mui/system'
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { routes } from '../../../constants'


const StyledIconButton = styled(IconButton)(({theme}) => ({
  [theme.breakpoints.up('md')]:{
    display:'none'
  }
}))


//this button should only be available in small screen;
export default function DynamicMenu(){
  
  const [open,setOpen] = useState(false)
  
  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose= () => {
    setOpen(false)
  }
  
  return (
    <>
    <StyledIconButton color='inherit' onClick={handleOpen}>
      <MenuSharpIcon />
    </StyledIconButton>
    <NavigationDrawer 
          onClose={handleClose}
          open={open}/>
    </>
  )
}
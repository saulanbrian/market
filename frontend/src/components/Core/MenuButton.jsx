import {
  IconButton,
  Drawer,
  Button,
  List,
  ListItemButton,
  ListItem
} from '@mui/material' 
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import { styled } from '@mui/system'

import { useState } from 'react'

const StyledIconButton = styled(IconButton)(({theme}) => ({
  [theme.breakpoints.up('sm')]:{
    display:'none'
  }
}))

export default function MenuButton({sx,routes}){
  
  const [showDrawer,setShowDrawer] = useState(false)
  
  function handleClose(){
    setShowDrawer(false)
  }
  
  return (
  <>
    <Drawer open={showDrawer} onClose={handleClose}>
      <List>
        { routes.map(({callBack,name},i) => (
          <ListItem key={i}>
            <ListItemButton onClick={() => callBack()}>
              { name }
            </ListItemButton>
          </ListItem>
        )) }
      </List>
    </Drawer>
    <StyledIconButton 
      color='inherit' 
      onClick={() => setShowDrawer(true)}
      sx={{...sx}}>
      <MenuSharpIcon />
    </StyledIconButton>
  </>
  )
}


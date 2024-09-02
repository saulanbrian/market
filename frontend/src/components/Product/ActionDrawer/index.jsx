import {
  Drawer, 
  List, 
  ListItem, 
  ListItemButton
} from '@mui/material'

import { useNavigate } from 'react-router-dom'


export default function ActionDrawer({open,onClose,productId}){
  
  const navigate = useNavigate()
  
  function viewProduct(){
    navigate(`/product/${productId}`)
  }
  
  return (
    <Drawer open={open} onClose={onClose} anchor='bottom'>
      <List>
        <ListItemButton>
          Add to Cart
        </ListItemButton>
        <ListItemButton>
          Buy now
        </ListItemButton>
        <ListItemButton onClick={viewProduct}>
          View
        </ListItemButton>
      </List>
    </Drawer>
  )
}
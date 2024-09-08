import {
  Drawer, 
  List, 
  ListItem, 
  ListItemButton
} from '@mui/material'


import { useNavigate } from 'react-router-dom'
import { useAddProductToCart } from '../../../queries/products'


export default function ActionDrawer({open,onClose,productId}){
  
  const {
    mutate, 
    success, 
    error, 
    isPending
  } = useAddProductToCart()
  
  
  return (
    <Drawer open={open} onClose={onClose} anchor='bottom'>
      <List>
        <ListItemButton onClick={() => mutate(productId)}>
          Add to Cart
        </ListItemButton>
        <ListItemButton>
          Buy now
        </ListItemButton>
      </List>
    </Drawer>
  )
}
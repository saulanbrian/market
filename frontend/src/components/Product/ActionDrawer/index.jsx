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
  
  function handleAddToCartClick(){
    onClose()
    mutate(productId)
  }
  
  function handleBuyClick(){
    onClose()
  }
  
  
  return (
    <Drawer open={open} onClose={onClose} anchor='bottom'>
      <List>
        <ListItemButton onClick={handleAddToCartClick}>
          Add to Cart
        </ListItemButton>
        <ListItemButton onClick={handleBuyClick}>
          Buy now
        </ListItemButton>
      </List>
    </Drawer>
  )
}
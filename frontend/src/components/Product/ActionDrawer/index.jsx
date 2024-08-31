import {
  Drawer, 
  List, 
  ListItem, 
  ListItemButton
} from '@mui/material'


export default function ActionDrawer({open,onClose,productId}){
  return (
    <Drawer open={open} onClose={onClose} anchor='bottom'>
      <List>
        <ListItemButton>
          Add to Cart
        </ListItemButton>
        <ListItemButton>
          Buy now
        </ListItemButton>
        <ListItemButton>
          View
        </ListItemButton>
      </List>
    </Drawer>
  )
}
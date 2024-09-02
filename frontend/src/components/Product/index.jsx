import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useMediaQuery
} from '@mui/material'
import ActionDrawer from './ActionDrawer'

import { styled } from '@mui/material'

import React, { useState } from 'react'



const StyledCardMedia = styled(CardMedia)(({theme}) => ({
  objectFit:'contain',
  width:'100%',
}))


const StyledCard = styled(Card)(({theme}) => ({
  border:'1px solid black',
}))


export default function Product({
  id,
  name,
  description, 
  image, 
  isAvailable, 
  price
}){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const [open,setOpen] = useState(false)
  
  function handleClick(){
    onSmallScreen && setOpen(true)
  }

  return (
    <React.Fragment>
      <StyledCard onClick={handleClick}>
        <StyledCardMedia src={image} component='img'/>
        <CardContent>
        <Typography variant='h6'>{ name }</Typography>
        <p>${price}</p>
        </CardContent>
      </StyledCard>
      { open && (
        <ActionDrawer 
          open={open} 
          onClose={() => setOpen(false)}
          productId={id}/> 
      ) }
    </React.Fragment>
  )
}

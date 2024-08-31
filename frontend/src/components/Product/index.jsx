import {
  Card,
  CardMedia,
  CardContent,
  Typography
} from '@mui/material'
import ActionDrawer from './ActionDrawer'

import { styled } from '@mui/material'

import React, { useState } from 'react'



const StyledCardMedia = styled(CardMedia)(({theme}) => ({
  objectFit:'contain',
  maxWidth:'100%',
}))


const StyledCard = styled(Card)(({theme}) => ({
  border:'1px solid black',
}))


export default function Product({
  id,
  name,
  description, 
  image, 
  isSold, 
  price
}){
  
  const [open,setOpen] = useState(false)

  return (
    <React.Fragment>
      <StyledCard onClick={() => setOpen(true)}>
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

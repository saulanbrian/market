import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonBase,
  useMediaQuery,
} from '@mui/material'

import ActionDrawer from './ActionDrawer'
import HoldableComponent from '../HoldableComponent'

import { styled } from '@mui/material'

import React, { useState,useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'



const StyledCardMedia = styled(CardMedia)(({theme}) => ({
  objectFit:'contain',
  width:'100%',
}))


const StyledCard = styled(Card)(({theme}) => ({
  border:'1px solid black',
}))


export default function Product(props){
  
  const {
    id,
    name,
    description, 
    image, 
    isAvailable, 
    price,
    className,
    disableInteractiviy
  } = props;
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [imageLoaded,setImageLoaded] = useState(false)
  
  const handleClick = useCallback(() => {
    navigate('/marketplace/product/' + id)
  },[id])

  return (
    <React.Fragment>
      <ButtonBase> 
        <HoldableComponent 
          holdSec={8}
          holdCallback={() => setOpen(true)}
          component={React.Fragment}>
          <StyledCard 
            onClick={handleClick}
            className={className}>
            <StyledCardMedia 
              loading='lazy'
              src={image} 
              component='img'
              onLoad={() => setImageLoaded(true)} 
              sx={{ display: imageLoaded ? 'block' : 'none' }}/>
            <CardContent>
            <Typography variant='h6'>{ name }</Typography>
            <p>${price}</p>
            </CardContent>
          </StyledCard>
        </HoldableComponent>
      </ButtonBase>
      { open && (
        <ActionDrawer 
          open={open} 
          onClose={() => setOpen(false)}
          productId={id}/> 
      ) }
    </React.Fragment>
  )
}

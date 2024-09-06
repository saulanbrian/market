import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  useMediaQuery,
} from '@mui/material'
import ActionDrawer from './ActionDrawer'

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


export default function Product({
  id,
  name,
  description, 
  image, 
  isAvailable, 
  price
}){
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [timerStarted,setTimerStarted] = useState(false)
  const [holdDuration,setHoldDuration] = useState(0)
  
  const handleClick = useCallback(() => {
    navigate('/product/' + id)
  },[id])
  
  const handleTouchStart = useCallback((e) => {
    setTimerStarted(true)
  },[id])
  
  const handleTouchEnd = useCallback((e) => {
    setTimerStarted(false)
  },[id])

  useEffect(() => {
    let intervalId;
    
    if(timerStarted){
      intervalId = setInterval(() => {
        setHoldDuration(prev => {
          return prev + 1
        })
      },100)
    }else{
      setHoldDuration(0)
      clearInterval(intervalId)
    }
    
    return () => clearInterval(intervalId)
    
  },[timerStarted])
  
  
  useEffect(() => {
    if(holdDuration >= 8) setOpen(true)
  },[holdDuration])

  useEffect(() => {
    if(open) setTimerStarted(false)
  },[open])

  return (
    <React.Fragment>
      <StyledCard 
        onClick={handleClick}
        onTouchStart={handleTouchStart} 
        onTouchEnd={handleTouchEnd}>
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

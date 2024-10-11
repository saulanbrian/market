import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  ButtonBase,
  useMediaQuery,
  Skeleton,
  Box,
  ListItemText,
  Paper
} from '@mui/material'

import ActionDrawer from './ActionDrawer'
import HoldableComponent from '../HoldableComponent'

import { styled } from '@mui/material'

import React, { useState,useEffect, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { display, height, maxHeight, textAlign, width } from '@mui/system'

const StyledPaper = styled(Paper)(({theme}) => ({
  background:theme.palette.secondary.main,
  height:260,
  width:180,
  overflow:'hidden',
  '& img':{
    height:'75%',
    width:'100%',
    objectFit:'contained'
  },
  '& #product-info-container':{
    height:'25%',
    flexGrow:1,
    background:theme.palette.secondary.dark,
    padding:4,
    textAlign:'start',
    '& > *':{
      color:'inherit',
      whiteSpace:'nowrap',
      overflow:'hidden',
      textOverflow:'ellipsis',
      padding:2
    }
  }
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

  const imageIsShown = useMemo(() => { return imageLoaded },[imageLoaded])
  
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
          <StyledPaper onClick={handleClick} elevation={3}>
            { !imageIsShown && <Skeleton height={'75%'} variant='rectangular' animation='wave'/>}
            <img src={image} onLoad={() => { setImageLoaded(true) }} style={{display: imageIsShown? 'block': 'none'}} />
            <div id='product-info-container'>
              <Typography sx={{padding:0}} variant='subtitle1'>{name}</Typography>
              <Typography sx={{padding:0}} variant='caption'>${price}</Typography>
            </div>
          </StyledPaper>
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

import {
  Box,
  Checkbox,
  Paper,
  Typography, 
  ListItemText
} from '@mui/material'

import { styled } from '@mui/system'
import { useState, useEffect } from 'react'


const ProductImage = styled('img')(({theme}) => ({
  objectFit:'contain',
  width:'45%',
  height:'95%',
  border:`1px solid ${theme.palette.primary.main}`
}))


const StyledPaper = styled(Paper)(({theme,selected}) => ({
  height:100,
  display:'flex',
  alignItems:'center',
  padding:4,
  backgroundColor:selected? theme.palette.primary.main: 'inherit',
  '& > *':{
  },
  [theme.breakpoints.up('md')]:{
    width:400
  },
}))


const ProductDetail = styled(Box)(({theme}) => ({
  display:'flex',
  width:70,
  padding:4,
  flexDirection:'column',
  height:'95%'
}))

const Header = styled(ListItemText)(({theme}) => ({
  '& .MuiListItemText-secondary':{
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
  }
}))

export default function ProductOnCart(props){
  
  const {
    id,
    name: productName,
    description,
    image,
    price,
    onClick,
    selected,
    selectFn
  } = props;
  
  
  function handleSelect(){
    selectFn(id)
  }
  
  
  return (
    <StyledPaper selected={selected} onClick={handleSelect}> 
      <ProductImage src={image} onClick={onClick}/>
      <ProductDetail>
        <Header 
          primary={productName} 
          secondary={description}/>
      </ProductDetail>
    </StyledPaper>
  )
}
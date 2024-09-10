import {
  Box,
  Slide,
  Button,
  IconButton,
  useMediaQuery
} from '@mui/material'
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp'


import { styled } from '@mui/system'

import { useGetProductsOnCart } from '../queries/products'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../features/cart/context'
import { useState, useEffect } from 'react'

import ProductOnCart from '../components/ProductOnCart' 
import PaymentSharpIcon from '@mui/icons-material/PaymentSharp';

const ProductContainer = styled(Box)(({theme}) => ({
  display:'flex',
  flexDirection:'column',
  padding:8,
  gap:4,
  width:'100%',
  [theme.breakpoints.up('md')]:{
    width:400
  }
}))


const ActionButtonContainer = styled(Box)(({theme}) => ({
  position:'fixed',
  bottom:16,
  right:16,
  display:'flex',
  padding:4,
  backgroundColor:'white',
  [theme.breakpoints.up('md')]:{
    display:'none'
  }
}))


const StyledBox = styled(Box)(({theme}) => ({
  flexGrow:1,
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
}))


const StyledButton = styled(Button)(({theme,color}) => ({
  width:200,
  margin:2,
  border:`1px solid black`
}))


const FloatingAction = ({in:isIn}) => {
  return (
    <Slide in={isIn} direction='left'>
      <ActionButtonContainer>
        <IconButton color='inherit'>
            <DeleteForeverSharpIcon color='secondary'/>
        </IconButton>          
        <Button startIcon={<PaymentSharpIcon/>}>
            buy now
        </Button>
      </ActionButtonContainer>
    </Slide>       
  )
}

const ActionBox = ({disabled}) => {
  return (
    <StyledBox>
      <StyledButton 
        startIcon={<DeleteForeverSharpIcon />} 
        color='secondary'
        disabled={disabled}>
        remove
      </StyledButton>
      <StyledButton 
        startIcon={<PaymentSharpIcon />}
        disabled={disabled}>
        buy now
      </StyledButton>
    </StyledBox>
  )
}

export default function Cart(){
  
  const { data, isLoading, error } = useGetProductsOnCart()
  const {
    selectedProducts, 
    setSelectedProducts
  } = useCartContext()
  const navigate = useNavigate()
  const [toggleButton,setToggleButton] = useState(false)
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  
  useEffect(() => {
    selectedProducts.length >= 1? setToggleButton(true): setToggleButton(false)
  },[selectedProducts])
  
  function handleSelect(id){
    setSelectedProducts((prev) => {
      return prev.some(productId => productId === id)? (
        [...prev.filter(productId => productId !== id)]
      ): [...prev,id]
    })
  }
  
  return (
    <Box sx={{display:'flex'}}>
      <ProductContainer>
        { !!data? (
          data.map(product => (
            <ProductOnCart 
              {...product} 
              key={product.id}
              onClick={() => navigate('/product/' + product.id)} 
              selectFn={handleSelect}
              selected={selectedProducts.some(id => id === product.id)}/>
          ))
        ): isLoading? (
          <p>loading...</p>
        ): error && (
          <p>an errror has occured</p>
        ) }
      </ProductContainer>
      {  onSmallScreen? (
          <FloatingAction in={toggleButton} />
        ):(
          <ActionBox disabled={selectedProducts.length < 1} />
        ) }
    </Box>
  )
}
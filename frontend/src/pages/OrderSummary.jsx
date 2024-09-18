import {
  Box,
  Typography,
  Button
} from '@mui/material' 

import { styled } from '@mui/system'

import ProductList from '../components/ProductList'

import { useCartContext } from '../features/cart/context'
import { usePlaceOrder } from '../queries/order'
import { useNavigate, Navigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'


const StyledProductList = styled(ProductList)(({theme}) => ({
  display:'flex',
  paddingLeft:4,
  paddingRight:4,
  alignItems:'center',
  flexDirection:'column',
  '& > *':{
    boxShadow:'none',
    borderRadius:0
  }
}))


export default function OrderSummary(){
  
  const { selectedProducts } = useCartContext()
  const navigate = useNavigate()
  const client = useQueryClient()
  const { mutate, status } = usePlaceOrder()
  
  const productsOnCart = client.getQueryData(['my-cart']) || []
  
  useEffect(() => {
    status === 'success' && navigate('/orders')
  },[status])
  
  const products = [
    ...productsOnCart?.filter(product => (
      selectedProducts.some(id => id === product.id)
    ))
  ]
  
  function getTotalPrice(){
    const products = productsOnCart? [
      ...productsOnCart?.filter(product => (
        selectedProducts.some(id => product.id === id)
      ))
    ]: []
    let total = 0
    for(let product of products){
      total += product.price
    }
    return total;
  }
  
  
  return selectedProducts &&selectedProducts?.length >= 1? (
    <Box>
      <Typography>total: { getTotalPrice()}</Typography>
      <StyledProductList products={products} />
      <Button onClick={() => mutate(selectedProducts)}>
        place order
      </Button>
    </Box>
  ): <Navigate to='/cart' />
}
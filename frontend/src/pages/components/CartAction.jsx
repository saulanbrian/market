import {
  Box,
  Slide,
  Button,
  useMediaQuery,
  Typography
} from '@mui/material'

import { styled } from '@mui/system'
import { useRemoveProductsFromCart } from '../../queries/products'
import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'


const SlidingActionContainer = styled(Box)(({theme}) => ({
  position:'fixed',
  bottom:16,
  right:16
}))


const ActionBoxContainer = styled(Box)(({theme}) => ({
  display:'flex',
  flexGrow:1,
  height:'100%',
  padding:32,
}))


const FloatingActions = (props) => {
  
  const {
    isIn,
    removeFn,
    buyFn
  } = props;
  
  return (
    <Slide direction='left' in={isIn}>
      <SlidingActionContainer>
        <Button onClick={removeFn}>remove</Button>
        <Button onClick={() => buyFn()}>buy</Button>
      </SlidingActionContainer>
    </Slide>
  )

}


const ActionBox = (props) => {
  
  const {
    removeFn,
    buyFn,
    total
  } = props;
  
  return (
    <ActionBoxContainer>
      <Box>
        <Typography variant='h4'>
          ${total}
        </Typography>
        <Button onClick={removeFn}>remove</Button>
        <Button onClick={buyFn}>buy now</Button>
      </Box>
    </ActionBoxContainer>
  )
}



export default function CartActions(props){
  
  const {
    selectedProducts, 
  } = props;
  
  const {
    mutate
  } = useRemoveProductsFromCart()
  
  const client = useQueryClient()
  
  const navigate = useNavigate()
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  
  const handleRemove = useCallback(() => {
    mutate(selectedProducts)
  },[selectedProducts])
  
  const caculatePrice = useCallback(() => {
    const products = client.getQueryData(['my-cart'])
    const selectedProductsWithPrice = products? [
      ...products.filter(product => (
        selectedProducts.some(id => id === product.id)
      ))
    ]: []
    let total = 0
    selectedProductsWithPrice?.map((product) => {
      total += product.price
    })
    return total;
  },[selectedProducts])
  
  
  function buyFn(){
    navigate('/order-summary')
  }
  
  
  return onSmallScreen? (
    <FloatingActions 
      buyFn={buyFn}
      removeFn={handleRemove}
      isIn={selectedProducts.length >= 1} />
  ): <ActionBox 
      removeFn={handleRemove} 
      buyFn={buyFn}
      total={caculatePrice()}/>
  
  
}
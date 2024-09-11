import {
  Box,
  Slide,
  Button,
  useMediaQuery
} from '@mui/material'

import { styled } from '@mui/system'
import { useRemoveProductsFromCart } from '../../queries/products'
import { useCallback } from 'react'


const SlidingActionContainer = styled(Box)(({theme}) => ({
  position:'fixed',
  bottom:16,
  right:16
}))


const FloatingActions = (props) => {
  
  const {
    isIn,
    removeFn
  } = props;
  
  
  
  return (
    <Slide direction='left' in={isIn}>
      <SlidingActionContainer>
        <Button onClick={removeFn}>remove</Button>
        <Button>buy</Button>
      </SlidingActionContainer>
    </Slide>
  )

}


const ActionBox = (props) => {
  
  const {
    removeFn
  } = props;
  
  return (
    <Box>
      <Button onClick={removeFn}>remove</Button>
      <Button>delete</Button>
    </Box>
  )
}



export default function CartActions(props){
  
  const {
    selectedProducts, 
  } = props;
  
  const {
    mutate
  } = useRemoveProductsFromCart()
  
  const onSmallScreen = useMediaQuery(theme => theme.breakpoints.down('sm'))
  
  const handleRemove = useCallback(() => {
    mutate(selectedProducts)
  },[selectedProducts])
  
  
  
  return onSmallScreen? (
    <FloatingActions 
      removeFn={handleRemove}
      isIn={selectedProducts.length >= 1} />
  ): <ActionBox removeFn={handleRemove}/>
  
  
}
import {
  Box
} from '@mui/material'
import { styled } from '@mui/system'

import { useGetProductsOnCart } from '../queries/products'
import { useNavigate } from 'react-router-dom'
import { useCartContext } from '../features/cart/context'

import ProductOnCart from '../components/ProductOnCart' 


const StyledBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexDirection:'column',
  padding:8,
  gap:4
}))

export default function Cart(){
  
  const { data, isLoading, error } = useGetProductsOnCart()
  const {
    selectedProducts, 
    setSelectedProducts
  } = useCartContext()
  const navigate = useNavigate()
  
  function handleSelect(id){
    setSelectedProducts((prev) => {
      return prev.some(productId => productId === id)? (
        [...prev.filter(productId => productId !== id)]
      ): [...prev,id]
    })
  }
  
  return (
    <StyledBox>
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
    ): errror && (
      <p>an errror has occured</p>
    ) }
    </StyledBox>
  )
}
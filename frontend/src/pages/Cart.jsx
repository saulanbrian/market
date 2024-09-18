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
import CartActions from './components/CartAction'
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
  
  useEffect(() => {
    data && setSelectedProducts([])
  },[data])
  
  function handleSelect(id){
    setSelectedProducts((prev) => {
      return prev.some(productId => productId === id)? (
        [...prev.filter(productId => productId !== id)]
      ): [...prev,id]
    })
  }
  
  return (
    <Box sx={{display:'flex',justifyContent:'center'}}>
      <ProductContainer>
        { !!data? (
          data?.length >= 1?(
            data.map(product => (
              <ProductOnCart 
                {...product} 
                key={product.id}
                onClick={() => navigate('/product/' + product.id)} 
                selectFn={handleSelect}
                selected={selectedProducts.some(id => id === product.id)}/>
            ))
          ): <p>no products on cart</p>
        ): isLoading? (
          <p>loading...</p>
        ): error && (
          <p>an errror has occured</p>
        ) }
      </ProductContainer>
      <CartActions selectedProducts={selectedProducts}/>
    </Box>
  )
}
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
import { FloatingActions, CartDetailAndActionBox } from './components/Cart'


const ProductListContainer = styled(Box)(({theme}) => ({
  display:'flex',
  flexDirection:'column',
  padding:8,
  gap:4,
  width:'100%',
  [theme.breakpoints.up('md')]:{
    width:400
  }
}))


const MainBox = styled(Box)(({theme}) => ({
  maxWidth:'100vw',
  display:'flex',
  '& > *':{
    flex:1
  }
}))



export default function Cart(){
  
  const {
    selectedProducts, 
    setSelectedProducts,
    selectedProductsTotalPrice,
    fetchingProducts,
    products
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
    <MainBox sx={{display:'flex',justifyContent:'center'}}>
      <ProductListContainer>
        { fetchingProducts? (
            <p>loading...</p>
          ): products? (

            products?.length >= 1?(
              products.map(product => (
                <ProductOnCart 
                  {...product} 
                  key={product.id}
                  onClick={() => navigate('/product/' + product.id)} 
                  selectFn={handleSelect}
                  selected={selectedProducts.some(id => id === product.id)}/>
              ))
            ): <p>no products on cart</p>
          
        
        ): error && (
          <p>an errror has occured</p>
        ) }
      </ProductListContainer>

      { onSmallScreen? (
        <FloatingActions />
      ): (
        <CartDetailAndActionBox />
      )}
      
    </MainBox>
  )
}
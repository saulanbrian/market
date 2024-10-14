import {
  Box
} from '@mui/system'
import Product from '../Product'

import { styled } from '@mui/system' 

import { useGetSellerProducts } from '../../queries/products'
import { useEffect, useState } from 'react'

const ApiURL = import.meta.env.VITE_API_URL

const MainContainer = styled(Box)(({theme}) => ({
  background:theme.palette.secondary.dark,
  display:'flex',
  gap:8,
  padding:12,
  '& > *':{
    flex:1
  }
}))

export default function ProductsFromTheSameSeller({seller,className}) {
  
  const {
    isLoading, 
    data:products,
    error,
  } = useGetSellerProducts(seller)

  const [updatedProducts,seUpdatedProducts] = useState(null)
  
  useEffect(() => {
    if(products){
      let updatedProducts = []
      for(let product of products){
        const imageUrl = ((ApiURL.slice(0,-1)) + product.image)
        product.image = imageUrl
        updatedProducts.push(product)
      }
      seUpdatedProducts(updatedProducts)
    }
  },[products])
  
  return (
    <MainContainer className={className}>
      { updatedProducts?(
        products.map(product => (
          <Product key={product.id} {...product} />
        ))
      ): isLoading? (
        <p>loading</p>
      ): (
        <p>an error has occured</p>
      )}
    </MainContainer>
  )
}
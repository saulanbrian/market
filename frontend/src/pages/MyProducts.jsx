import {
  Box,
  Button
} from '@mui/material'

import { positions, styled } from '@mui/system'

import ProductList from '../components/ProductList'
import ProductCreationForm from '../components/ProductCreationForm'

import { useGetMyProducts } from '../queries/products'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const StyledProductList = styled(ProductList)(({theme}) => ({
  maxWidth:'100%',
  padding:8
}))


const ActionContainer = styled(Box)(({theme}) => ({
  display:'flex',
  flexDirection:'row-reverse',
  padding:8
}))


export default function MyProducts() {
  
  const {
    isLoading, 
    data, 
    success,
    error
  } = useGetMyProducts()
  const [showForm,setShowForm] = useState(false)
  
  const navigate = useNavigate()
  
  function handleClick(product){
    product && navigate('/marketplace/product/' + product.id)
  }
  
  return (
    <Box sx={{maxWidth:'100vw'}}>
    { showForm && <ProductCreationForm onClick={() => setShowForm(false)}/> }
    <ActionContainer>
      <Button variant='outlined' onClick={() => setShowForm(true)}>
        new
      </Button>
    </ActionContainer>
    { isLoading? <p>loading...</p> : data? (
      <StyledProductList products={data} productOnClick={handleClick} />
      ): error && <p>an error had occured</p>
    }
    </Box>
  )
}


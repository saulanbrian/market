import {
  Box,
  Button
} from '@mui/material'

import { styled } from '@mui/system'

import ProductList from '../components/ProductList'
import ProductCreationForm from '../components/ProductCreationForm'

import { useGetMyProducts } from '../queries/products'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


const StyledProductList = styled(ProductList)(({theme}) => ({
  padding:'4px 8px',
  display:'flex',
  alignItems:'center',
  flexDirection:'column',
  gap:4,
  width:'100%',
  '& > *':{
    padding:8
  },
  [theme.breakpoints.up('md')]:{
    maxWidth:400
  }
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
    product && navigate('/product/' + product.id)
  }
  
  return (
    <Box>
      { showForm && (
        <ProductCreationForm onClick={() => setShowForm(false)}/>
      )}
      <Box sx={{width:'100%',display:'flex',}}>
        <Button 
          onClick={() => setShowForm(true)}
          sx={{marginLeft:'auto',marginRight:4}}>
          new
        </Button>
      </Box>
      { isLoading? <p>loading...</p>
        : data? (
          <StyledProductList 
            products={data}
            productOnClick={handleClick}/>
        ): error && <p>an error had occured</p>
      }
    </Box>
  )
}
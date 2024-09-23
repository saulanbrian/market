import {
  Box
} from '@mui/material'

import { styled } from '@mui/system'

import ProductList from '../components/ProductList'

import { useGetMyProducts } from '../queries/products'
import { useNavigate } from 'react-router-dom'


const StyledProductList = styled(ProductList)(({theme}) => ({
  padding:'4px 8px',
  display:'flex',
  alignItems:'center',
  flexDirection:'column',
  gap:4,
  '& > *':{
    padding:8
  }
}))

export default function MyProducts() {
  
  const {
    isLoading, 
    data, 
    success,
    error
  } = useGetMyProducts()
  
  const navigate = useNavigate()
  
  function handleClick(e){
    navigate('/product/' + e.target.id)
  }
  
  return (
    <Box>
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
import {
  Box
} from '@mui/material'

import { styled } from '@mui/system'

import DetailedProduct from '../components/DetailedProduct'
import ProductsFromTheSameSeller  from '../components/ProductsFromTheSameSeller'

import { useGetProductDetail } from '../queries/products'
import { useParams } from 'react-router-dom'



const StyledDetailedProduct = styled(DetailedProduct)({
  borderBottom:'1px solid black'
})


export default function ProductDetail() {
  
  const { id } = useParams()
  const {
    isLoading,
    data,
    error
  } = useGetProductDetail(id)
  
  
  return isLoading? (
    <p>loading...</p>
  ): error? (
    <p>an error has occured</p>
  ): data && (
    <Box> 
      <StyledDetailedProduct {...data} />
      <ProductsFromTheSameSeller seller={data?.seller}/>
    </Box>
  )
}
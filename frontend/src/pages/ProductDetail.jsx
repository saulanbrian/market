import DetailedProduct from '../components/DetailedProduct'

import { useGetProductDetail } from '../queries/products'
import { useParams } from 'react-router-dom'

export default function ProductDetail() {
  
  const { id } = useParams()
  const {
    isLoading,
    data,
    error
  } = useGetProductDetail(id)
  
  
  return !!data? (
      <DetailedProduct {...data} />
    ): isLoading? (
      <p>retrieving product information</p>
    ): error && (
      <p>an error has occured</p>
    )
}
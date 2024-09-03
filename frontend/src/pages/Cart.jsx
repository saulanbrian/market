import { useGetProductsOnCart } from '../queries/products'

export default function Cart(){
  
  const { data, isLoading, error } = useGetProductsOnCart()
  
  return isLoading? (
    <p>laoding...</p>
  ): data? (
    data?.map(product => (
      <p>{product.name}</p>
    ))
  ): error && (
    <p>an error has occcured</p>
  )
}
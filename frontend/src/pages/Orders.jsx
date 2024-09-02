import { useGetOrders } from '../queries/order'

export default function Orders(){
  
  const {
    isLoading, 
    data,
    error
  } = useGetOrders()
  
  return isLoading? ( 
    <p>retrieving orders</p>
  ): data? (
    data?.map(order => (
      <p key={order.id}>{order.id}</p>
    )) 
  ): (
    <p>an error has occured</p>
  )
  
}
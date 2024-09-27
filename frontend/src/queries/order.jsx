import { 
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query' 
import api from '../api'

export const useGetOrders = () => {
  return useQuery({
    queryKey:['my-orders'],
    queryFn:async() => {
      const res = await api.get('orders/my-orders') 
      return res.data
    }
  })
}

export const usePlaceOrder = () => {
  
  const client = useQueryClient()
  
  return useMutation({
    mutationKey:['my-orders'],
    mutationFn:async(products) => {
      const res = await api.post('orders/place',{
        products:products})
      return res.data
    },
    onSuccess:(placedOrders) => {
      client.setQueryData(['my-cart'], prev => {
        return [
        ...prev.filter(orderOnCart => (
            placedOrders.some(order => order.id === orderOnCart.id?
              false: true
            )
          ))
        ]
      })
    }
  })
}


export const useCancelOrder = () => {
  
  const client = useQueryClient()
  
  return useMutation({
    mutationKey:['my-orders'],
    mutationFn:async(orderId) => {
      const res = await api.post('orders/cancel',{
        order:orderId
      })
      return res.data
    },
    onSuccess:() => {
      client.invalidateQueries(['my-orders'])
    }
  })
}


export const useMarkOrderAsReceived = () => {
  
  const client = useQueryClient()
  
  return useMutation({
    mutationKey:['my-orders'],
    mutationFn:async(orderId) => { 
      const res = await api.post('orders/receive',{
        order:orderId})
      return res.data
    },
    onSuccess:() => {
      client.invalidateQueries()
    }
  })
}
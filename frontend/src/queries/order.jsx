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
  return useMutation({
    mutationFn:['my-orders'],
    mutationFn:async(products) => {
      const res = await api.post('orders/place',{
        products:products})
      return res.data
    },
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
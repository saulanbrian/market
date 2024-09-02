import { useQuery } from '@tanstack/react-query' 
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
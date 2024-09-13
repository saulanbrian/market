import { useQuery, useMutation } from '@tanstack/react-query' 
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
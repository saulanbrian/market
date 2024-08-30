import {
  useInfiniteQuery,
} from '@tanstack/react-query' 

import api from '../api'

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey:['products'],
    queryFn:async({pageParam = 1}) => {
      const res = await api.get(`products/?${pageParam}`)
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {
      return lastPage?.next? pages.length + 1: undefined
    }
  })
}
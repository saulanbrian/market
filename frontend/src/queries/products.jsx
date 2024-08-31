import {
  useInfiniteQuery,
} from '@tanstack/react-query' 

import api from '../api'

export const useGetProducts = () => {
  return useInfiniteQuery({
    queryKey:['products'],
    queryFn:async({pageParam = 1}) => {
      const res = await api.get(`products/?page=${pageParam}`)
      return res.data
    },
    getNextPageParam:(lastPage,pages) => {
      return lastPage?.next && lastPage.next !== null? pages.length + 1: undefined
    }
  })
}
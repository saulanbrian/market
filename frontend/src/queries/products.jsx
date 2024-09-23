import {
  useInfiniteQuery,
  useQuery,
  useMutation,
  useQueryClient
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

export const useGetProductDetail = (id) => {
  return useQuery({
    queryKey:['product',id],
    queryFn:async() => {
      const res = await api.get(`products/${id}`)
      return res.data
    }
  })
}


export const useGetProductsOnCart = () =>{
  return useQuery({
    queryKey:['my-cart'],
    queryFn:async() => {
      const res = await api.get('user_cart/')
      return res.data
    }
  })
}


export const useAddProductToCart = () => {
  
  const client = useQueryClient()
  
  return useMutation({
    mutationKey:['my-cart'],
    mutationFn:async(id) => {
      const res = await api.post('user_cart/add',{
        product:id
      })
      return res.data
    },
    onSuccess:(product) => {
      client.setQueryData(products => {
        [...products,product]
      })
    }
  })
}


export const useRemoveProductsFromCart = () => {
  
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationKey:['my-cart'],
    mutationFn:async(productIds) => {
      const res = await api.post('user_cart/remove',{
        products:productIds
        })
      return res.data
    },
    onSuccess:(products) => {
      queryClient.setQueryData(['my-cart'],prev => {
        const finalProducts = [
        ...prev.filter(productFromPrev => {
            return products.some(product => product.id === productFromPrev.id)? false: true
          })
        ]
        return finalProducts
      })
    }
  })
}


export const useCreateProduct = () => {
  return useMutation({
    mutationKey:['my-products'],
    mutationFn:async(formData) => {
      const res = await api.post('products/sell',
        formData, 
        {
          headers:{
            'Content-Type':'multipart/form-data'
          }
        }
      )
      return res.data
    }
  })
}


export const useGetMyProducts = () => {
  return useQuery({
    queryKey:['my-products'],
    queryFn:async() => {
      const res = await api.get('user/products')
      return res.data
    }
  })
}
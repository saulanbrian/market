import { useQueryClient } from '@tanstack/react-query'
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useGetProductsOnCart, useRemoveProductsFromCart } from '../../../queries/products'
import { usePlaceOrder } from '../../../queries/order'

const CartContext = createContext()

export const useCartContext = () => {
  return useContext(CartContext)
}

export default function CartContextProvider({children}){
  
  const {isLoading:fetchingProducts, data:products, error} = useGetProductsOnCart()
  const { 
    isPending:removingSelectedProductsFromCart,
    mutate:removeProducts,
    status:productRemoveStatus
  } = useRemoveProductsFromCart()
  const {
    isPending:placingOrder,
    mutate:buyProducts,
    status:placeOrderStatus
  } = usePlaceOrder()

  const [selectedProducts, setSelectedProducts] = useState([])
  const [selectedProductsTotalPrice,setSelectedProductsTotalPrice] = useState(0)

  //compute total of selected products
  useEffect(() => {
    if(products && selectedProducts) {
      let total = 0
      products.forEach(product => {
        if(selectedProducts.some(id => id === product.id)) total += product.price
      });
      setSelectedProductsTotalPrice(total)
    }
  },[selectedProducts])

  const removeSelectedProductsFromCart = useCallback(() => {
    removeProducts(selectedProducts)
    setSelectedProducts([])
  },[selectedProducts])

  const buySelectedProductsFromCart = useCallback(() => {
    buyProducts(selectedProducts)
  },[selectedProducts])
  
  return (
    <CartContext.Provider 
      value={{
        setSelectedProducts,
        selectedProducts,
        fetchingProducts,
        selectedProductsTotalPrice,
        products,
        removeSelectedProductsFromCart,
        removingSelectedProductsFromCart,
        productRemoveStatus,
        buySelectedProductsFromCart,
        placeOrderStatus
      }}>
      { children }
    </CartContext.Provider>
  )
}
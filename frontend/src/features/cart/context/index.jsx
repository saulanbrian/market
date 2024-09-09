import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const useCartContext = () => {
  return useContext(CartContext)
}

export default function CartContextProvider({children}){
  
  const [selectedProducts, setSelectedProducts] = useState([])
  
  return (
    <CartContext.Provider 
      value={{setSelectedProducts,selectedProducts}}>
      { children }
    </CartContext.Provider>
  )
}
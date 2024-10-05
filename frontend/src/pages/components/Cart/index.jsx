import { 
	Box,
	Button,
	Slide,
} from "@mui/material"

import { styled, width } from '@mui/system'

import { useCartContext } from "../../../features/cart/context"
import { useCallback, useMemo } from "react"



const FloatingActionBox = styled(Box)(({theme}) => ({
	position:'fixed',
	zIndex:3,
	bottom:16,
	right:16,
	display:'flex',
	gap:4,
	'& > *':{
		padding:16,
		width:'120px'
	}
}))


export const FloatingActions = (props) => {

	const { selectedProducts, removeSelectedProductsFromCart, buySelectedProductsFromCart } = useCartContext()	

	return (
		<Slide in={selectedProducts?.length >=1} direction="left">
			<FloatingActionBox>
				<Button variant="contained" color='secondary' onClick={removeSelectedProductsFromCart}>
					remove
				</Button>
				<Button variant="contained" onClick={buySelectedProductsFromCart}>buy</Button>
			</FloatingActionBox> 
		</Slide>
	)
}




export const CartDetailAndActionBox = () => {

	const { 
		selectedProductsTotalPrice, 
		removeSelectedProductsFromCart, 
		buySelectedProductsFromCart,
	} = useCartContext()	

	return (
		<Box>
			<p>{ selectedProductsTotalPrice } </p>
			<Button variant="contained" color='secondary' onClick={removeSelectedProductsFromCart}>remove</Button>
			<Button variant="contained" onClick={buySelectedProductsFromCart}>buy</Button>
		</Box>
	)
}
import {
  Box
} from '@mui/system'
import Product from '../Product'

import { styled } from '@mui/system' 

import { useGetSellerProducts } from '../../queries/products'

const StyledProduct = styled(Product)(({theme}) => ({
  height:'100%',
  display:'flex',
  flexDirection:'column',
  width:150,
  '& > *':{
    flex:1
  },
  '& > img':{
    height:100,
    objectFit:'cover'
  }
}))

const Container = styled(Box)(({theme}) => ({
  display:'flex',
  overflowX:'auto',
  padding:8,
  gap:4,
  [theme.breakpoints.down('sm')]:{
    width:'100%',
    height:300
  },
  '& > *':{
    flex:1,
    height:'100%',
  },
}))


const ApiURL = import.meta.env.VITE_API_URL

export default function ProductsFromTheSameSeller({seller}) {
  
  const {
    isLoading, 
    data:products,
    error,
  } = useGetSellerProducts(seller)
  
  
  return (
    <Container>
      { isLoading? (
          <p>loading...</p>
        ): error? (
          <p>an error has occured</p>
        ): !!products && (
            products?.map(product => (
              <StyledProduct 
                {...product} 
                image={ApiURL + product.image} 
                key={product.id}
                disableInteractiviy />
            )
          )
        )
      }
    </Container>
  )
}
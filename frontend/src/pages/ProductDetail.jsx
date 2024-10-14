import {
  Avatar,
  Box,
  Typography,
} from '@mui/material'

import { display, height, maxHeight, styled, useMediaQuery } from '@mui/system'

import DetailedProduct from '../components/DetailedProduct'
import ProductsFromTheSameSeller  from '../components/ProductsFromTheSameSeller'

import { useGetProductDetail } from '../queries/products'
import { useParams } from 'react-router-dom'


const ImageContainer = styled(Box)(({theme}) => ({
  height:'100%',
  minWidth:'44%',
  maxWidth:'32%',
  borderRadius:16,
  flexGrow:0,
  overflow:'hidden',
  display:'flex',
  border:`2px solid ${theme.palette.secondary.dark}`,
  background:theme.palette.secondary.dark,
  '& > img':{
    height:'100%',
    width:'100%',
    objectFit:'scale-down',
    [theme.breakpoints.down('sm')]:{
      objectFit:'cover'
    }
  }
}))

const DetailContainer = styled(Box)(({theme}) => ({
  borderRadius:16,
  padding:8,
  flexGrow:1,
  display:'flex',
  flexDirection:'column',
  position:'relative',
  background:theme.palette.secondary.dark,
  gap:'4px',
  '& > *':{
    maxHeight:'40% !important',
    overflow:'hidden',
    textOverflow:'ellipsis',
  } 
}))



const ProductDetailSection = styled(Box)(({theme}) => (({
  padding:16,
  display:'flex',
  gap:8,
  height:320,
  maxHeight:320,
  // background:theme.palette.secondary.dark,
})))



const SellerDetailSection = styled(Box)(({theme}) => ({
  padding:16
}))


const StyledProductsFromTheSameSeller = styled(ProductsFromTheSameSeller)(({theme}) => ({
  borderRadius:16,
  overflowX:'auto',
  marginTop:8
}))


export default function ProductDetail() {
  
  const { id } = useParams()
  const { isLoading,data:product,  status } = useGetProductDetail(id)
  // const onSmallScreen = useMediaQuery(theme => theme.breakpoints.dowm('md'))

 

  return product? (
    <Box>
      <ProductDetailSection>
        <ImageContainer>
          <img src={product.image} alt='image-of-the-product'/>
        </ImageContainer>
        <DetailContainer>
          <Typography variant='title' sx={{fontSize:32}}> 
            { product.name }
          </Typography>
          <Typography variant='caption'> 
            { product?.description }
          </Typography>
        </DetailContainer>
      </ProductDetailSection>
      <SellerDetailSection>
        <Typography sx={{margin:1}} variant='overline'>seller of this product</Typography>
        <Box sx={{display:'flex',gap:1}}>
          <Avatar />
          <Typography >{product.seller_name}</Typography>
        </Box>
        <StyledProductsFromTheSameSeller seller={product.seller}/>
      </SellerDetailSection>
    </Box>
  ): isLoading? (
    <p>loading...</p>
  ): (
    <p>error</p>
  )
}


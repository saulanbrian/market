import {
  Box,
  Checkbox,
  Paper,
  Typography, 
  ListItemText,
  Skeleton
} from '@mui/material'

import { display, styled, width } from '@mui/system'
import { useCallback, useState } from 'react'


const ProductImage = styled('img')(({theme}) => ({
  objectFit:'contain',
  width:'45%',
  height:'95%',
  border:`1px solid ${theme.palette.primary.main}`
}))


const MainBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexWrap:'wrap',
  padding:16,
  gap:12
}))


const StyledPaper = styled(Paper)(({theme}) => ({
  height:100,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  padding:20,
  gap:8,
  width:280,
  cursor:'pointer',
  background:theme.palette.secondary.dark,
  [theme.breakpoints.down('md')]:{
    width:'45%',
    flexGrow:1
  }
}))


const ProductDetail = styled(Box)(({theme}) => ({
  display:'flex',
  flexGrow:1,
  overflow:'hidden',
  flexDirection:'column',
  height:'100%',
}))



const ImageContainer = styled(Box)(({theme}) => ({
  '& > *':{
    height:'100%'
  },
  height:'100%'
}))


const StyledTypography = styled(Typography)(({theme}) => ({
  whiteSpace:'nowrap',
  textOverflow:'ellipsis',
  overflow:'hidden',
  color:theme.palette.primary.dark
}))


export default function ProductList(props){
  
  const {
    products,
    productOnClick,
    className,
    sx
  } = props;

  const [imageLoaded,setImageLoaded] = useState(false)
  const [elevatedProduct,setElevatedProduct] = useState(null)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  
  const handleMouseEnter = useCallback((id) => setElevatedProduct(id),[])
  const handleMouseLeave = useCallback(() => setElevatedProduct(null),[])
  
  return (
    <MainBox sx={{...sx}} className={className}>
    { products.map((product,index) => (
      <StyledPaper 
        onMouseEnter={() => handleMouseEnter(product.id)}
        onMouseLeave={handleMouseLeave}
        elevation={elevatedProduct == product.id? 20: 4}
        id={product.id} 
        onClick={() => productOnClick(product)} 
        key={index}> 
        <ImageContainer>
          {!imageLoaded && <Skeleton variant='rectangular' height={'100%'}/>}
          <img src={product.image} width={100} onLoad={handleImageLoad}/>
        </ImageContainer>
        <ProductDetail>
          <StyledTypography variant='h6' sx={{textAlign:'right'}} color='textSecondary'>{product.name}</StyledTypography>
          <StyledTypography 
            color='primary'
            sx={{marginTop:'auto',textAlign:'right'}} 
            variant='subtitle1' >${product.price}</StyledTypography>
        </ProductDetail>
      </StyledPaper>
    ) )}
    </MainBox>
  )
}
import {
  Box,
  Checkbox,
  Paper,
  Typography, 
  ListItemText
} from '@mui/material'

import { styled } from '@mui/system'


const ProductImage = styled('img')(({theme}) => ({
  objectFit:'contain',
  width:'45%',
  height:'95%',
  border:`1px solid ${theme.palette.primary.main}`
}))


const StyledPaper = styled(Paper)(({theme}) => ({
  height:100,
  display:'flex',
  alignItems:'center',
  padding:4,
  width:'100%',
  '& > *':{
  },
}))


const ProductDetail = styled(Box)(({theme}) => ({
  display:'flex',
  width:70,
  padding:4,
  flexDirection:'column',
  height:'95%'
}))


const Header = styled(ListItemText)(({theme}) => ({
  '& .MuiListItemText-secondary':{
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap',
  }
}))


export default function ProductList(props){
  
  const {
    products,
    productOnClick,
    className,
    sx
  } = props;
  
  
  return (
    <Box sx={sx} className={className}>
    { products.map((product,index) => (
      <StyledPaper onClick={productOnClick} key={index}> 
        <ProductImage src={product.image}/>
        <ProductDetail>
          <Header 
            primary={product.name} 
            secondary={product.description}/>
          <Typography variant='caption'>
            ${ product.price }
          </Typography>
        </ProductDetail>
      </StyledPaper>
    ) )}
    </Box>
  )
}
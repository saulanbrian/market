import {
  Paper, 
  Box,
  Typography,
  List,
  ListItemText,
  ListItem
} from '@mui/material'

import { styled } from '@mui/system'  


const StyledPaper = styled(Paper)(({theme}) => ({
  padding:4,
  display:'flex',
  height:100,
  flexWrap:'nowrap',
  gap:4,
  alignItems:'center',
  border:'1px solid black',
  borderRadius:4,
  [theme.breakpoints.up('md')]:{
  }
}))

const StyledImage = styled('img')(({theme}) => ({
  objectFit:'contain',
  height:100
}))


const ImageContainer = styled(Box)(({theme}) => ({
  width:'40%',
  border:'1px solid black',
  flexShrink:0,
  maxHeight:'100%',
  overflow:'hidden',
  display:'flex',
  justifyContent:'center'
}))


const StyledList = styled(List)(({theme}) => ({
  all:'unset'
}))


const secondaryTypographyProps = {
  overflow:'hidden',
  textOverflow:'ellipsis',
  whiteSpace:'nowrap'
}


const apiUrl = import.meta.env.VITE_API_URL


export default function Order(props){
  const {
    id,
    status,
    product_id:productId, 
    product_name:productName,
    product_image:productImage,
    product_description:description,
    date_placed:datePlaced
  } = props
  
  return (  
    <StyledPaper>
      <ImageContainer>
        <StyledImage src={apiUrl + productImage} />
      </ImageContainer>
      <StyledList>
        <ListItem disableGutters>
          <ListItemText 
            primary={productName} 
            secondary={description}
            secondaryTypographyProps={secondaryTypographyProps}/>
        </ListItem>
        <Typography paragraph sx={{marginTop:'auto'}}>
          {datePlaced.split('T')[0]}
        </Typography>
      </StyledList>
    </StyledPaper>
  )
}

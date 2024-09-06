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


const StyledListItemText = styled(ListItemText)(({theme}) => ({
  '& .MuiListItemText-secondary':{
    overflow:'hidden',
    textOverflow:'ellipsis',
    whiteSpace:'nowrap'
  }
}))


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
      <Box sx={{maxWidth:'60%',display:'flex',flexDirection:'column'}}>
        <List disablePadding sx={{height:85}}>
          <ListItem disablePadding>
            <StyledListItemText 
              primary={productName} 
              secondary={description} />
          </ListItem>
        </List>
        <Typography variant='caption'>
          {datePlaced.split('T')[0]}
        </Typography>
      </Box>
    </StyledPaper>
  )
}

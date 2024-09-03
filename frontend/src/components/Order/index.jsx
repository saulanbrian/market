import {
  Paper, 
  Box
} from '@mui/material'

import { styled } from '@mui/system'  


const StyledPaper = styled(Paper)(({theme}) => ({
  borderRadius:16,
  display:'flex',
  maxHeight:200,
  flexWrap:'nowrap',
  gap:2
}))

const StyledImage = styled('img')(({theme}) => ({
  objectFit:'contain',
  maxHeight:'100%',
  width:'100%'
}))

const apiUrl = import.meta.env.VITE_API_URL

export default function Order(props){
  const {
    id,
    status,
    product_id:productId, 
    product_name:productName,
    product_image:productImage,
    date_placed:datePlaced
  } = props
  
  return (  
    <StyledPaper>
      <Box 
        sx={{
          width:'40%',
          border:'1px solid black',
          maxHeight:'90%',
          borderRadius:4,
          overflow:'hidden',
          margin:1
        }}>
        <StyledImage src={apiUrl + productImage} />
      </Box>
      <Box sx={{minWidth:'60%'}}>
        <h1>{productName}</h1>
        <p>{datePlaced.split('T')[0]}</p>
      </Box>
    </StyledPaper>
  )
}

import {
  Box
} from '@mui/material'

export default function DetailedProduct({id,name,image,price,description,isAvailable,seller}){
  
  return (
    <Box>
      <p>{name}</p>
      <p>{description}</p>
      <p>available: {isAvailable? 'yes': 'no'}</p>
    </Box>
  )
}
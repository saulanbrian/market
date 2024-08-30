import {
  Card,
  CardMedia,
  CardContent
} from '@mui/material'

import { styled } from '@mui/material'

import './index.css'

export default function Product({
  id,
  name,
  description, 
  image, 
  isSold, 
  price
}){
  console.log(image)
  return (
    <Card>
      <CardMedia image={image} sx={{height:'fit-content'}} />
    </Card>
  )
}
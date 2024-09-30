import {
  Box,
  Button,
  Drawer,
  useMediaQuery
} from '@mui/material'

import { styled } from '@mui/system'


const ImageBox = styled(Box)(({theme}) => ({
  width:'40%',
  '& > img':{
    objectFit:'contain',
    height:'100%',
    width:'100%'
  },
  [theme.breakpoints.down('sm')]:{
    width:'100%',
  }
}))


const MainBox = styled(Box)(({theme}) => ({
  display:'flex',
  [theme.breakpoints.down('sm')]:{
    flexWrap:'wrap'
  }
}))


const DetailContainer = styled(Box)(({theme}) => ({
  
}))




function ActionButtons(){
  
  return (
    <Box>
      <Button>add to cart</Button>
      <Button variant='contained'>buy now</Button>
    </Box>
  )
}


function ActionDrawer(){
  
  return (
    <Box sx={{
      zIndex:2,
      position:'fixed',
      bottom:0,
      width:'100vw',
      border:'1px solid black',
      '& > *':{
        width:'100%',
        borderRadius:0,
        height:50
      }
    }}>
      <Button>add to cart</Button>
      <Button variant='contained'>buy now</Button>
    </Box>
  )
}



export default function DetailedProduct(props){
  
  const { 
    id,
    name,
    image,
    price,
    description,
    isAvailable,
    seller,
    className
  } = props;
  
  const onSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  
  return (
    <MainBox className={className}>
      <ImageBox>
        <img src={image}/>
      </ImageBox>
      <DetailContainer>
        <p>{name}</p>
        <p>{description}</p>
        <p>available: {isAvailable? 'yes': 'no'}</p>
        { onSmallScreen? (
          <ActionDrawer />
        ): <ActionButtons />
        }
      </DetailContainer>
    </MainBox>
  )
1}
import {
  Box,
  Paper,
  Backdrop,
  Button,
  TextareaAutosize,
  IconButton
} from '@mui/material'

import AddPhotoAlternateSharpIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

import { styled } from '@mui/system'

import { useCreateProduct } from '../../queries/products'
import { useQueryClient } from '@tanstack/react-query'
import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  forwardRef,
} from 'react'



const StyledPaper = styled(Paper)(({theme}) => ({
  display:'flex',
  padding:8,
  flexDirection:'column',
  alignItems:'center',
  gap:4,
  marginTop:8,
  '& > input':{
    height:50,
  },
  '& > textarea':{
    height:50
  },
  '& > *':{
    width:'100%',
  },
  [theme.breakpoints.down('sm')]:{
    width:'100%',
    height:'100%',
  }
}))


const ImageContainer = styled(Box)(({theme}) => ({
  border:'1px solid black',
  maxHeight:200, 
  maxWidth:200,
  height:200,
  width:200,
  position:'relative'
}))


const StyledImg = styled('img')(({theme}) => ({
  objecfFit:'contain',
  height:'100%',
  width:'100%',
}))


const HiddenInput = forwardRef((props,ref) => (
  <input 
    type='file' 
    ref={ref} 
    name='image'
    accept='image/*' 
    style={{display:'none'}}
    onChange={props.onChange}/>
))



function RemoveImageButton({onClick}){
  return (
    <IconButton 
      onClick={onClick}
      sx={{position:'absolute',top:2,right:2}}>
      <CancelSharpIcon/>
    </IconButton>
  )
}



export default function ProductCreationForm({onClick:closeFn}){
  
  const {
    mutate,
    status
  } = useCreateProduct()
  
  const client = useQueryClient()
  
  const imageRef = useRef(null)
  const [imageSrc,setImageSrc] = useState(null)
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    console.log(data.get('image'))
    mutate(data)
  },[])
  
  function clickImageInput() {
    imageRef.current.click()
  }
  
  useEffect(() => {
    if(status === 'success') {
      client.invalidateQueries(['my-products'])
      closeFn()
    }
  },[status])
  
  
  function handleImageChange(e){
    const image = e.target?.files[0] || null
    const imageUrl = image? URL.createObjectURL(image): null
    setImageSrc(imageUrl)
  }
  
  
  return (
    <Backdrop open={true} onClick={closeFn} sx={{zIndex:3}}>
      <StyledPaper
        component='form'
        onSubmit={handleSubmit} 
        onClick={e => e.stopPropagation()}>
        <HiddenInput ref={imageRef} onChange={handleImageChange}/>
        
        <ImageContainer>
          { imageSrc?  (
            <React.Fragment>
              <StyledImg src={imageSrc} />
              <RemoveImageButton onClick={() => setImageSrc(null)}/>
            </React.Fragment>
          ): (
            <Box onClick={clickImageInput}
              sx={{
              height:'100%',
              width:'100%',
              display:'flex',
              justifyContent:'center',
              alignItems:'center'}} >
              <AddPhotoAlternateSharpIcon sx={{height:50,width:50}}/>
            </Box>
            )
          }
        </ImageContainer>
    
        <TextareaAutosize name='name'  placeholder='product name' />
        <TextareaAutosize name='description' placeholder='description' />
        <input name='price' placeholder='price' type='number' />
        
        <Button 
          type='submit' 
          sx={{marginTop:'auto',height:50}}
          variant='contained'
          color='primary'>
          post
        </Button>
          
        <Button sx={{height:50,marginBottom:2}}>
          cancel
        </Button>
        
      </StyledPaper>
    </Backdrop>
  )
}
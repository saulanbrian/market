import {
  Box,
  Paper,
  Backdrop,
  Button,
  TextareaAutosize
} from '@mui/material'

import { useCreateProduct } from '../../queries/products'
import { useNavigate } from 'react'


export default function ProductCreationForm({onClick}){
  
  const {
    mutate,
    status
  } = useCreateProduct()
  
  const navigate = useNavigate()
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    mutate(data)
  },[])
  
  
  useEffect(() => {
    status === 'success' && navigate('/dashboard/my-products')
  },[status])
  
  return (
    <Backdrop open={true} onClick={onClick}>
      <form onSubmit={handleSubmit} onClick={e => e.stopPropagation()}>
        <input type='file' name='image' accept='image/*' />
        <TextareaAutosize 
          name='name'
          placeholder='product name' />
        <TextareaAutosize 
          name='description'
          placeholder='description' />
        <input 
          name='price'
          placeholder='price' 
          type='number' />
        <Button type='submit'>post</Button>
      </form>
    </Backdrop>
  )
}
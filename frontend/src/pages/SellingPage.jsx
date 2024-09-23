import {
  TextareaAutosize,
  Button
} from '@mui/material'

import { Form, useNavigate } from 'react-router-dom'

import { useCreateProduct } from '../queries/products'
import { useCallback, useEffect } from 'react'

import api from '../api'


export default function SellingPage() {
  
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
    status === 'success' && navigate('/marketplace')
  },[status])
  
  return (
    <form onSubmit={handleSubmit}>
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
  )
}

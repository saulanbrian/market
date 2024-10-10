import InfiniteScrollComponent from 'react-infinite-scroll-component'
import { useGetProducts } from '../queries/products'
import { getDataLength } from '../utils'
import { useEffect } from 'react'

import { Box, useMediaQuery } from '@mui/material'
import { display, height, margin, maxWidth, padding, styled, width } from '@mui/system'
import Masonry from '@mui/lab/Masonry'

import Product from '../components/Product'
import { Outlet, useLocation } from 'react-router-dom'


const StyleInfiniteScroll = styled(InfiniteScrollComponent)(({theme}) => ({
  display:'flex',
  flexWrap:'wrap',
  backgroundColor:theme.palette.secondary.main,
  justifyContent:'center',
  padding:16,
  gap:8,
  alignItems:'center',
  [theme.breakpoints.up('md')]:{
    height:'100vh'
  },
  [theme.breakpoints.down('sm')]:{
    '& > *':{

    }
  }
})) 


export default function Marketplace() {
  
  const {
    isFetching,
    isFetchingNextPage, 
    hasNextPage, 
    fetchNextPage, 
    error, 
    status,
    data
  } = useGetProducts()
  
  const onMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const location = useLocation()
  
  useEffect(() => {
    
  },[data])
  
  return location.pathname.split('/').filter(str => !!str).length <=1? (
    <StyleInfiniteScroll
      dataLength={data? getDataLength(data): 0}
      hasMore={hasNextPage}
      next={fetchNextPage}
      loader={<p>loading...</p>}
      endMessage={<p>no more products</p>}
      scrollableTarget={onMobile && 'scrollableDiv'}>
      { data? data?.pages?.map(page => {
        return page.results.map(product => (
          <Product key={product.id} {...product} />
        ))
      }): isFetching? (
        <p>loading....</p>
      ): errror && (
        <p>an error has occured</p>
      )}
    </StyleInfiniteScroll>
  ): <Outlet />
}


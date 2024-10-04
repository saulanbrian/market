import InfiniteScrollComponent from 'react-infinite-scroll-component'
import { useGetProducts } from '../queries/products'
import { getDataLength } from '../utils'
import { useEffect } from 'react'

import { Box, useMediaQuery } from '@mui/material'
import { styled } from '@mui/system'
import Masonry from '@mui/lab/Masonry'

import Product from '../components/Product'
import { Outlet, useLocation } from 'react-router-dom'


const StyledBox = styled(Box)(({theme}) => ({
  maxHeight:'100vh',
  overflow:'auto',
  display:'flex',
  flexDirection:'column',
  gap:4,
  padding:8
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
    <StyledBox id='scrollableDiv'>
      <InfiniteScrollComponent
        dataLength={data? getDataLength(data): 0}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<p>loading...</p>}
        endMessage={<p>no more products</p>}
        scrollableTarget='scrollableDiv'>
        <Masonry columns={onMobile? 2: 4} spacing={1}>
        { data? data?.pages?.map(page => {
          return page.results.map(product => (
            <Product key={product.id} {...product} />
          ))
        }): isFetching? (
          <p>loading....</p>
        ): errror && (
          <p>an error has occured</p>
        )}
        </Masonry>
      </InfiniteScrollComponent>
    </StyledBox>
  ): <Outlet />
}
import InfiniteScrollComponent from 'react-infinite-scroll-component'
import { useGetProducts } from '../queries/products'
import { getDataLength } from '../utils'
import { useEffect } from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/system'

import Product from '../components/Product'


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
  
  useEffect(() => {
    data && console.log(data)
  },[data])
  
  return !!data? (
    <StyledBox id='scrollableDiv'>
      <InfiniteScrollComponent
        dataLength={getDataLength(data)}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<p>loading...</p>}
        endMessage={<p>no more products</p>}
        scrollableTarget='scrollableDiv'>
        { data?.pages?.map(page => {
          return page.results.map(product => (
            <Product key={product.id} {...product} />
          ))
        }) }
      </InfiniteScrollComponent>
    </StyledBox>
  ): error? (
    <p>an error has ocurred</p>
  ): isFetching && (
    <p>loading...</p>
  )
}
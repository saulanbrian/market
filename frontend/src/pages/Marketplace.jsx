import InfiniteScrollComponent from 'react-infinite-scroll-component'
import { useGetProducts } from '../queries/products'
import { getDataLength } from '../utils'
import { useEffect } from 'react'

import Product from '../components/Product'

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
  
  if (isFetching) return <p>loading...</p>
  
  return data? (
    <div id='scrollableDiv'>
      <InfiniteScrollComponent
        dataLength={getDataLength(data)}
        hasMore={hasNextPage}
        next={fetchNextPage}
        loader={<p>loading...</p>}
        endMessage={<p>no more products</p>}>
        { data?.pages?.map(page => {
          return page.results.map(product => (
            <Product key={product.id} {...product} />
          ))
        }) }
      </InfiniteScrollComponent>
    </div>
  ): error && <p>an error has occured</p>
}
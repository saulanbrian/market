import {
  Tabs, 
  Tab,
  Box,
  Typography
} from '@mui/material'
import Order from '../components/Order'

import { styled } from '@mui/material'

import { useGetOrders } from '../queries/order'
import { useState } from 'react'

import PropTypes from 'prop-types'


const StyledBox = styled(Box)(({theme}) => ({
  display:'flex',
  flexDirection:'column',
  gap:2,
  padding:'2 4'
}))


function TabPanel(props){
  const { index, value, data, filter} = props
  
  return (
    <StyledBox hidden={index !== value}>
      { index === value && (
        data?.filter(order => filter? order.status === filter: order).map((order,index) => (
          <Order key={index} {...order} />
        ))
      )}
    </StyledBox>
  )
  
}


TabPanel.propTypes = {
  index:PropTypes.number.isRequired, 
  value:PropTypes.number.isRequired,
  data:PropTypes.object.isRequired, 
  filter:PropTypes.string
}


export default function Orders(){
  
  const {
    isLoading, 
    data,
    error
  } = useGetOrders()
  
  const [value,setValue] = useState(0)
  
  const filters = ['to_receive','received','cancelled','all']
  
  function handleChange(e,val){
    setValue(val)
  }
  
  return isLoading? ( 
    <p>retrieving orders</p>
  ): data? (
    <Box>
      <Tabs value={value }onChange={handleChange}>
        { filters.map(filter => <Tab label={filter}/>)}
      </Tabs>
      { filters.map((filter,index) => (
        <TabPanel 
          value={value} 
          index={index}
          data={data}
          key={index} 
          filter={filter !== 'all' && filter } />
      )) }
    </Box>
  ): (
    <p>an error has occured</p>
  )
  
}
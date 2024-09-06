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
  gap:4,
  padding:8,
  alingItems:'center',
  justifyContent:'flex-start',
  [theme.breakpoints.up('md')]:{
    maxWidth:'35vw',
  }
}))


function TabPanel(props){
  const { index, value, data, filter} = props
  
  return index === value && (
    <StyledBox>
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
  data:PropTypes.array.isRequired, 
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
  
  return ( 
    <Box sx={{maxWidth:'100vw'}}>
      <Tabs value={value }onChange={handleChange}>
        { filters.map((filter,i) => <Tab label={filter} key={i}/>)}
      </Tabs>
        { !!data? filters.map((filter,index) => (
          <TabPanel 
            value={value} 
            index={index}
            data={data}
            key={index} 
            filter={filter !== 'all'? filter: '' } />
        )): isLoading? (
          <p>loading...</p>
        ): error && (
          <p>an error has occured</p>
        ) }
    </Box>
  )
}
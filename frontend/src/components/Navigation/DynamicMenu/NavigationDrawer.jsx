import { Drawer } from '@mui/material' 
import { styled } from '@mui/system'
import NavigationButton from '../../ui/NavigationButton'

import { mainRoutes } from '../../../constants'

import { useNavigate } from 'react-router-dom'


const StyledDrawer = styled(Drawer)(({theme}) => ({
  
}))

export default function NavigationDrawer({open,onClose}){
  
  const navigate = useNavigate()

  return (
    <StyledDrawer open={open} onClose={onClose}>
      { mainRoutes.map(({name,route},index) => (
        <NavigationButton 
          key={index}
          onClick={() => {
              navigate(route)
              onClose()
          }}
          label={name} />
      )) }
    </StyledDrawer>
  )
}
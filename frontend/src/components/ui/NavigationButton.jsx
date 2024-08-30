import {
  Button
} from '@mui/material' 
import { styled } from '@mui/system' 

const StyledButton = styled(Button)(({theme}) => ({
}))

export default function NavigationButton({label,onClick}){
  return (
    <StyledButton color='inherit' onClick={onClick}>
      { label }
    </StyledButton>
  )
}
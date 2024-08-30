import { Button } from '@mui/material' 
import { styled } from '@mui/system'

const StyledButton = styled(Button)(({theme}) => ({
  color:'inherit'
}))

export default function NavigationLink({name,onClick,className}){
  return (
    <StyledButton onClick={onClick} className={className}>
      { name } 
    </StyledButton>
  )
}
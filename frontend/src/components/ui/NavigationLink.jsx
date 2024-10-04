import { Button } from '@mui/material' 
import { styled } from '@mui/system'

const StyledButton = styled(Button)(({theme,selected}) => ({
  background:selected && theme.palette.primary.light
}))

export default function NavigationLink({name,onClick,className,startIcon,selected}){
  return (
    <StyledButton 
      name={name} 
      onClick={onClick} 
      className={className} 
      startIcon={startIcon} 
      selected={selected}>
      { name } 
    </StyledButton>
  )
}
import { styled } from '@mui/system'

const StyledDiv =  styled('div')(({theme}) => ({
  padding:8,
  display:'flex',
  flexWrap:'nowrap',
  '& > *':{
    color:theme.palette.primary.main,
  }
}))

export default function Breadcrumbs({path,className}){
  
  return (
    <StyledDiv className={className}>
      { path.map((route,index) => (<h4 key={index}>{route}/ </h4>
      )) }
    </StyledDiv>
  )
}
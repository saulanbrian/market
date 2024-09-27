import { useLocation, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { useCallback } from 'react'

const StyledDiv =  styled('div')(({theme}) => ({
  padding:8,
  display:'flex',
  flexWrap:'nowrap',
  '& > *':{
    color:theme.palette.primary.main,
  }
}))

export default function Breadcrumbs({className}){
  
  const location = useLocation()
  const navigate = useNavigate()
  
  const path = [...location.pathname.split('/').filter(path => !!path)]
  
  const handleClick = useCallback((locationName) => {
    const locationIndex = path.indexOf(locationName)
    const filteredPath = [...path.filter((path,i) => i <= locationIndex)]
    let redirectPath = ''
    for (let path of filteredPath){
      redirectPath += (path + '/')
    }
    navigate(`/${redirectPath}`)
  },[path]) 
  
  return (
    <StyledDiv className={className}>
      { path.map((route,index) => (
        <h4 key={index} onClick={() => handleClick(route)}>{route}/ </h4>
      )) }
    </StyledDiv>
  )
}
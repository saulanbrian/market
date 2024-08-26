import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

const apiURL = import.meta.env.VITE_API_URL

const api = axios.create({
  baseURL:apiURL
})



async function refreshToken(){
  const refresh = localStorage.getItem('REFRESH_TOKEN')
  try{
    const res = await axios.post(`${apiURL}auth/token/refresh`)
    localStorage.setItem('ACCESS_TOKEN',res.data.access)
    localStorage.setItem('REFRESH_TOKEN',res.data.refresh)
    return res.data.access
  } catch(e){
    console.log(e)
    return null
  }
}


api.interceptors.request.use( async(config) => {
  const access = localStorage.getItem('ACCESS_TOKEN')
  
  let token;
  
  if(access){
    const decoded = jwtDecode(access)
    if (decoded.exp > Date.now() / 1000){
      token = access
    }else{
      token = await refreshToken()
    }
  }
  
  if(token){ 
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
  
})

export default api
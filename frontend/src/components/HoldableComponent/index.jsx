import { Box } from "@mui/material"
import { useEffect, useState } from "react"


export default function HoldableComponent({children,holdCallback,holdSec}){

    const [touchStarted,setTouchStarted] = useState(false)
    const [touchDuration,setTouchDuration] = useState(0)

    
    useEffect(() => {
        let intervalId; 

        if(touchStarted) {
            intervalId = setInterval(() => {
                setTouchDuration(prev => prev + 1)
            }, 100)
        }else{
            clearInterval(intervalId)
            setTouchDuration(0)
        }

        return () => clearInterval(intervalId)

    },[touchStarted])

    
    useEffect(() => {
        if(touchDuration >= holdSec) {
            holdCallback()
            setTouchStarted(false)
        }
    },[touchDuration])

    return (
        <Box 
            onTouchStart={() => setTouchStarted(true)} 
            onTouchEnd={() => setTouchStarted(false)}> 
            {children} 
        </Box>
    )
}
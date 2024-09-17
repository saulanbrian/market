import {
  Collapse,
  Box,
  IconButton,
  Button
} from '@mui/material'


export default function ActionDrawer(props){
  
  const {
    open,
    onCancel
  } = props;
  
  return (
    <Collapse in={open}>
      <Box sx={{padding:2,paddingLeft:0}}>
        <Button onClick={onCancel}>cancel</Button>
        <Button>mark as recieved</Button>
      </Box>
    </Collapse>
  )
  
}

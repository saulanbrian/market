export const getDataLength = (data) => {
  let total = 0 
  
  for (let page of data.pages){
    total += page.results.length
  }
  
  return total
  
}
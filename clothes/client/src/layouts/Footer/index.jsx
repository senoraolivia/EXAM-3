import React from 'react'
import Grid from '@mui/material/Grid2';
const Footer = () => {
  return (
   <Grid style={{backgroundColor:"#F2F2F2", display:"flex",marginTop:"100px",justifyContent:"center",padding:"4%"}}container spacing={2}>
    <Grid style={{display:"flex",gap:"3rem"}}>
        <div>
            <h2>Newsletter</h2>
            <p>Subscribe to our newsletter and get 20% off your first purchase</p>
        </div>
        <div>
            <input style={{padding:"10%"}} type="text" />
        </div>
    </Grid>
   </Grid>
  )
}

export default Footer
import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'

const LayoutPage = () => {
  return (
    <Box sx={{display: "flex", height: "100vh", bgcolor: "grey.1100"}}>
        {/* <Navbar /> */}
        <Outlet />
    </Box>
  )
}

export default LayoutPage
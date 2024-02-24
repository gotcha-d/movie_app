import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import SideBar from '../SideBar'
import { SearchBar } from '../SearchBar'

const Layout = ({children, sideBar}) => {
  return (
    <Container>
      <SearchBar />
      <Grid container spacing={3} py={4}> 
        <Grid item xs={12} md={3}>
          <Box bgcolor={"white"} boxShadow={1}>
            {/* サイドバー */}
            {sideBar}
          </Box>
        </Grid>

        <Grid item xs={12} md={9} >
          {/* Children */}
          {children}
        </Grid>
      </Grid>
    </Container>
  )
}

export default Layout
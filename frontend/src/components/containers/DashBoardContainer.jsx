import React from 'react'
import ToDoContent from "../presentational/dashboard/ToDoContent";
import Box from "@mui/material/Box";
import Header from "../presentational/Header";

export default function DashBoardContainer() {
  const mainTitle = "대시보드";

  return <>
    <Header
      mainTitle={mainTitle}
    />
    <Box component="main" sx={{flex: 1, py: 6, px: 4, bgcolor: '#eaeff1'}}>
      <ToDoContent/>
    </Box>
  </>
}
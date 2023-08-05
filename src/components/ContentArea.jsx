import { Box } from "@mui/material";
import React from "react";
import MyListings from "./MyListings";


export default function ContentArea() {
  return (
    <Box sx={{padding: 2}}>
      <MyListings/>
    </Box>
  );
}

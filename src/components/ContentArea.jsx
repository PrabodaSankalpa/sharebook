import { Box } from "@mui/material";
import React from "react";
import AddNewListings from "./AddNewListings";

export default function ContentArea() {
  return (
    <Box sx={{padding: 2}}>
      <AddNewListings />
    </Box>
  );
}
